import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  Table,
  Select,
  Button,
  Tag,
  DatePicker,
  Row,
  Col,
  Spin,
  App,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";

import axios from "axios";

const { RangePicker } = DatePicker;

interface EmployeeData {
  _id: string;
  name: string;
  email: string;
  specificRole: string;
  profileImage?: string;
  shift?: string;
}

interface DashboardAttendanceProps {
  dateRange: [Dayjs | null, Dayjs | null] | null;
  setDateRange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL ||
//   "https://flextrack-be-production.up.railway.app/api";

const DashboardAttendance: React.FC<DashboardAttendanceProps> = ({
  dateRange,
  setDateRange,
}) => {
  const { message } = App.useApp();
  const [department, setDepartment] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [shiftFilter, setShiftFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [departments, setDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [allEmployees, setAllEmployees] = useState<EmployeeData[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [userRole, setUserRole] = useState<string>("");
  const pageSize = 5;

  // Get auth token
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Fetch all employees
  const fetchAllEmployees = async () => {
    try {
      console.log("Fetching employees...");
      const response = await axios.get(
        `${API_URL}/employees/list`,
        getAuthConfig()
      );

      console.log("Employees response:", response.data);

      if (response.data.success) {
        const employees = response.data.data.employees || [];
        const role = response.data.data.userRole || "";

        console.log("Employees data:", employees);
        console.log("User role from employees:", role);

        setAllEmployees(employees);
        setUserRole(role);

        // Extract unique departments (only for admin)
        if (role === "admin") {
          const uniqueDepts = Array.from(
            new Set(
              employees
                .map((emp: EmployeeData) => emp.specificRole)
                .filter(
                  (role: string) =>
                    role && role !== "Unassigned" && role.trim() !== ""
                )
            )
          );
          console.log("Departments:", uniqueDepts);
          setDepartments(uniqueDepts as string[]);
        }
      }
    } catch (error: any) {
      console.error("Error fetching employees:", error);
      console.error("Error response:", error.response?.data);
      message.error("Failed to fetch employees list");
    }
  };

  // Fetch attendance records
  const fetchAttendanceRecords = async () => {
    setLoading(true);
    try {
      console.log("Fetching attendance...");
      const params: any = {};

      if (dateRange && dateRange[0] && dateRange[1]) {
        params.startDate = dateRange[0].format("YYYY-MM-DD");
        params.endDate = dateRange[1].format("YYYY-MM-DD");
      }

      console.log("Attendance params:", params);

      const response = await axios.get(`${API_URL}/attendance/list`, {
        ...getAuthConfig(),
        params,
      });

      console.log("Attendance response:", response.data);

      if (response.data.success) {
        const records = response.data.data.attendance || [];
        const role = response.data.data.userRole || "";

        console.log("Attendance records:", records);
        console.log("User role from attendance:", role);

        setAttendanceRecords(records);

        // Set user role if not already set
        if (!userRole) {
          setUserRole(role);
        }
      }
    } catch (error: any) {
      console.error("Error fetching attendance:", error);
      console.error("Error response:", error.response?.data);
      message.error("Failed to fetch attendance records");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount and when date range changes
  useEffect(() => {
    fetchAllEmployees();
  }, []);

  useEffect(() => {
    if (allEmployees.length > 0) {
      fetchAttendanceRecords();
    }
  }, [dateRange, allEmployees.length]);

  // Merge employees with attendance data
  const mergedData = useMemo(() => {
    console.log("=== MERGING DATA ===");
    console.log("All employees count:", allEmployees.length);
    console.log("Attendance records count:", attendanceRecords.length);
    console.log("Current user role:", userRole);

    // For employees, the backend already returns only their data
    // So we don't need to filter by employee ID here
    const merged = allEmployees.map((employee) => {
      // Find attendance record for this employee
      const attendanceRecord = attendanceRecords.find((record: any) => {
        const recordEmployeeId = record.employeeId?._id || record.employeeId;
        return recordEmployeeId === employee._id;
      });

      console.log(
        `Employee: ${employee.name}, Has attendance:`,
        !!attendanceRecord
      );

      return {
        _id: employee._id,
        key: employee._id,
        employeeId: employee,
        employeeName: employee.name || "Unknown",
        department: employee.specificRole || "Unassigned",
        chiefShift: attendanceRecord?.shift || employee.shift || "-",
        workDuration: attendanceRecord?.workDuration || "-",
        status: attendanceRecord?.status || "Absent",
        date: attendanceRecord?.date || null,
        checkIn: attendanceRecord?.checkIn || null,
        checkOut: attendanceRecord?.checkOut || null,
      };
    });

    console.log("Merged data count:", merged.length);
    return merged;
  }, [allEmployees, attendanceRecords, userRole]);

  // Filter data based on selections (only for admin)
  const filteredData = useMemo(() => {
    console.log("=== FILTERING DATA ===");
    console.log("Merged data before filter:", mergedData.length);
    console.log("User role:", userRole);

    // For employees, backend already returns only their data
    // No need to filter further by user ID
    let data = mergedData;

    // Apply department/status/shift filters (only for admin)
    if (userRole === "admin") {
      data = data.filter((record) => {
        const matchDepartment =
          department === "All" || record.department === department;
        const matchStatus =
          statusFilter === "All" || record.status === statusFilter;
        const matchShift =
          shiftFilter === "All" || record.chiefShift === shiftFilter;

        return matchDepartment && matchStatus && matchShift;
      });
    }

    console.log("Filtered data count:", data.length);
    return data;
  }, [mergedData, department, statusFilter, shiftFilter, userRole]);

  // Calculate summary statistics
  const summary = useMemo(() => {
    const totalPresent = filteredData.filter(
      (r) => r.status === "Present" || r.status === "Late"
    ).length;
    const totalAbsent = filteredData.filter(
      (r) => r.status === "Absent"
    ).length;

    // Calculate average work hours
    const presentRecords = filteredData.filter(
      (r) =>
        (r.status === "Present" || r.status === "Late") &&
        r.workDuration !== "-"
    );
    const totalMinutes = presentRecords.reduce((acc, record) => {
      const match = record.workDuration.match(/(\d+)h\s*(\d+)m/);
      if (match) {
        return acc + parseInt(match[1]) * 60 + parseInt(match[2]);
      }
      return acc;
    }, 0);

    const avgMinutes = presentRecords.length
      ? Math.round(totalMinutes / presentRecords.length)
      : 0;
    const avgHours = Math.floor(avgMinutes / 60);
    const avgMins = avgMinutes % 60;

    return {
      totalPresent,
      totalAbsent,
      avgWorkHours:
        presentRecords.length > 0 ? `${avgHours}h ${avgMins}m` : "0h 0m",
    };
  }, [filteredData]);

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      width: "25%",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: "20%",
    },
    {
      title: "Chief Shift",
      dataIndex: "chiefShift",
      key: "chiefShift",
      width: "20%",
    },
    {
      title: "Work Duration",
      dataIndex: "workDuration",
      key: "workDuration",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status: "Present" | "Absent" | "Late" | "Half-Day") => {
        const colorMap = {
          Present: "#10b981",
          Absent: "#ef4444",
          Late: "#f59e0b",
          "Half-Day": "#3b82f6",
        };
        return (
          <Tag
            color={colorMap[status] || "#6b7280"}
            style={{
              borderRadius: "12px",
              padding: "2px 10px",
              fontSize: "12px",
              border: "none",
              fontWeight: 500,
            }}
          >
            {status}
          </Tag>
        );
      },
    },
  ];

  // CSV Export Function
  const handleExportCSV = async () => {
    try {
      const params = new URLSearchParams();

      if (dateRange && dateRange[0] && dateRange[1]) {
        params.append("startDate", dateRange[0].format("YYYY-MM-DD"));
        params.append("endDate", dateRange[1].format("YYYY-MM-DD"));
      }

      // Only add filters if user is admin
      if (userRole === "admin") {
        if (department !== "All") params.append("department", department);
        if (statusFilter !== "All") params.append("status", statusFilter);
        if (shiftFilter !== "All") params.append("shift", shiftFilter);
      }

      const response = await axios.get(
        `${API_URL}/attendance/export-csv?${params.toString()}`,
        {
          ...getAuthConfig(),
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = response.headers["content-disposition"];
      let filename = "attendance.csv";
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      message.success(`Exported ${filteredData.length} records successfully`);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      message.error("Failed to export CSV. Please try again.");
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        minHeight: "100vh",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* Filters Row - Only show for admin */}
      {/* Filters Row - Admin sees filters + export, Employee sees only export */}
      <Row gutter={[8, 8]} style={{ marginBottom: "20px" }}>
        {userRole === "admin" && (
          <>
            <Col xs={24} sm={12} md={12} lg={6}>
              <Select
                style={{ width: "100%" }}
                value={department}
                onChange={setDepartment}
                size="large"
                loading={loading}
              >
                <Select.Option value="All">All Departments</Select.Option>
                {departments.map((dept) => (
                  <Select.Option key={dept} value={dept}>
                    {dept}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col xs={12} sm={6} md={6} lg={5}>
              <Select
                style={{ width: "100%" }}
                value={statusFilter}
                onChange={setStatusFilter}
                size="large"
              >
                <Select.Option value="All">All Status</Select.Option>
                <Select.Option value="Present">Present</Select.Option>
                <Select.Option value="Absent">Absent</Select.Option>
                <Select.Option value="Late">Late</Select.Option>
                <Select.Option value="Half-Day">Half-Day</Select.Option>
              </Select>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <Select
                style={{ width: "100%" }}
                value={shiftFilter}
                onChange={setShiftFilter}
                size="large"
              >
                <Select.Option value="All">All Shifts</Select.Option>
                <Select.Option value="Morning">Morning</Select.Option>
                <Select.Option value="Evening">Evening</Select.Option>
                <Select.Option value="Night">Night</Select.Option>
              </Select>
            </Col>
          </>
        )}

        {/* Export button - shown for both admin and employee */}
        {(userRole === "admin" || userRole === "employee") && (
          <Col
            xs={24}
            sm={userRole === "admin" ? 6 : 24}
            md={userRole === "admin" ? 6 : 12}
            lg={userRole === "admin" ? 5 : 6}
            style={userRole === "employee" ? { marginLeft: "auto" } : {}}
          >
            <Button
              type="primary"
              size="large"
              onClick={handleExportCSV}
              disabled={loading || filteredData.length === 0}
              style={{
                width: "100%",
                backgroundColor: "#10b981",
                borderColor: "#10b981",
                fontWeight: 600,
                height: "40px",
                borderRadius: "20px",
              }}
            >
              Export CSV
            </Button>
          </Col>
        )}
      </Row>

      {/* Date Picker and Summary Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={10} lg={16}>
          <RangePicker
            style={{ width: "100%", marginBottom: "16px" }}
            size="large"
            format="MMMM D, YYYY"
            placeholder={["Start Date", "End Date"]}
            suffixIcon={<CalendarOutlined style={{ color: "#6b7280" }} />}
            value={dateRange}
            onChange={(dates) =>
              setDateRange(dates as [Dayjs | null, Dayjs | null] | null)
            }
            popupStyle={{
              maxWidth: "calc(100vw - 32px)",
            }}
            getPopupContainer={(trigger) =>
              trigger.parentElement || document.body
            }
          />

          {/* Table */}
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              marginTop: "8px",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <Spin spinning={loading}>
              <div style={{ overflowX: "auto" }}>
                <Table
                  columns={columns}
                  dataSource={filteredData}
                  pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: filteredData.length,
                    showSizeChanger: false,
                    position: ["bottomCenter"],
                    onChange: (page) => setCurrentPage(page),
                  }}
                  size="middle"
                  bordered={false}
                  scroll={{ x: "max-content" }}
                  style={{
                    backgroundColor: "#fff",
                  }}
                  locale={{
                    emptyText: loading
                      ? "Loading..."
                      : userRole === "employee"
                        ? "No attendance records found for you"
                        : "No attendance records found",
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: "12px",
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                Showing {filteredData.length} of {mergedData.length} records
                {userRole === "employee" && ""}
              </div>
            </Spin>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={14} lg={8}>
          <Card
            title={
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {dateRange && dateRange[0] && dateRange[1]
                  ? "Period Summary"
                  : userRole === "employee"
                    ? "My Summary"
                    : "Summary"}
              </span>
            }
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "#111827" }}>Total Present:</span>
                  <span style={{ fontWeight: 600, color: "#6b7280" }}>
                    {summary.totalPresent}
                  </span>
                </div>
              </Col>

              <Col span={24}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "#111827" }}>Total Absentees:</span>
                  <span style={{ fontWeight: 600, color: "#6b7280" }}>
                    {summary.totalAbsent}
                  </span>
                </div>
              </Col>

              <Col span={24}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "#111827" }}>Avg. Work Hours:</span>
                  <span style={{ fontWeight: 600, color: "#6b7280" }}>
                    {summary.avgWorkHours}
                  </span>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardAttendance;
