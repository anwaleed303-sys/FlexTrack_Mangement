import React, { useState, useMemo, useEffect } from "react";
import { Card, Table, Select, Button, Tag, DatePicker, Row, Col } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface AttendanceRecord {
  key: string;
  employeeName: string;
  department: string;
  chiefShift: string;
  workDuration: string;
  status: "Present" | "Absent";
}

interface DashboardAttendanceProps {
  dateRange: [Dayjs | null, Dayjs | null] | null;
  setDateRange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
}

const DashboardAttendance: React.FC<DashboardAttendanceProps> = ({
  dateRange,
  setDateRange,
}) => {
  const [department, setDepartment] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [shiftFilter, setShiftFilter] = useState<string>("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [departments, setDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const pageSize = 5;

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        // const response = await fetch("YOUR_API_ENDPOINT/departments");
        // const data = await response.json();
        // Assuming API returns array like: ["IT", "HR", "Sales"]
        // Or if it returns objects like: [{id: 1, name: "IT"}, ...]
        // then use: data.map(dept => dept.name)
        // setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        // Optionally set fallback departments
        setDepartments(["IT", "HR", "Sales"]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Mock data - Replace with API call later
  const allData: AttendanceRecord[] = [
    {
      key: "1",
      employeeName: "Ali Khan",
      department: "IT",
      chiefShift: "Morning",
      workDuration: "8h 02m",
      status: "Present",
    },
    {
      key: "2",
      employeeName: "Sara Ahmed",
      department: "HR",
      chiefShift: "Morning",
      workDuration: "8h 00m",
      status: "Present",
    },
    {
      key: "3",
      employeeName: "Hamza Malik",
      department: "IT",
      chiefShift: "Evening",
      workDuration: "-",
      status: "Absent",
    },
    {
      key: "4",
      employeeName: "Ayesha Tariq",
      department: "Sales",
      chiefShift: "Morning",
      workDuration: "8h 32m",
      status: "Present",
    },
    {
      key: "5",
      employeeName: "Usman Ali",
      department: "HR",
      chiefShift: "-",
      workDuration: "-",
      status: "Absent",
    },
    {
      key: "6",
      employeeName: "Fatima Noor",
      department: "IT",
      chiefShift: "Morning",
      workDuration: "8h 15m",
      status: "Present",
    },
    {
      key: "7",
      employeeName: "Ahmed Hassan",
      department: "Sales",
      chiefShift: "Evening",
      workDuration: "7h 45m",
      status: "Present",
    },
    {
      key: "8",
      employeeName: "Zainab Khan",
      department: "HR",
      chiefShift: "-",
      workDuration: "-",
      status: "Absent",
    },
    {
      key: "9",
      employeeName: "Bilal Ahmed",
      department: "IT",
      chiefShift: "Morning",
      workDuration: "8h 20m",
      status: "Present",
    },
  ];

  // Filter data based on selections
  const filteredData = useMemo(() => {
    return allData.filter((record) => {
      const matchDepartment =
        department === "All" || record.department === department;
      const matchStatus =
        statusFilter === "All" || record.status === statusFilter;
      const matchShift =
        shiftFilter === "All" || record.chiefShift === shiftFilter;

      return matchDepartment && matchStatus && matchShift;
    });
  }, [department, statusFilter, shiftFilter]);

  // Calculate summary statistics
  const summary = useMemo(() => {
    const totalPresent = filteredData.filter(
      (r) => r.status === "Present"
    ).length;
    const totalAbsent = filteredData.filter(
      (r) => r.status === "Absent"
    ).length;

    // Calculate average work hours
    const presentRecords = filteredData.filter((r) => r.status === "Present");
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
      avgWorkHours: `${avgHours}h ${avgMins}m`,
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
      render: (status: "Present" | "Absent") => (
        <Tag
          color={status === "Present" ? "#10b981" : "#ef4444"}
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
      ),
    },
  ];

  const formatDateRange = () => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      return `${dateRange[0].format("MMMM D")} - ${dateRange[1].format("MMMM D, YYYY")}`;
    }
    return "Select Date Range";
  };

  // CSV Export Function
  const handleExportCSV = () => {
    try {
      // Convert filtered data to CSV format
      const csvHeaders = [
        "Employee Name",
        "Department",
        "Chief Shift",
        "Work Duration",
        "Status",
      ];

      // Create CSV content
      const csvRows = [
        csvHeaders.join(","), // Header row
        ...filteredData.map((record) =>
          [
            `"${record.employeeName}"`,
            `"${record.department}"`,
            `"${record.chiefShift}"`,
            `"${record.workDuration}"`,
            `"${record.status}"`,
          ].join(",")
        ),
      ];

      const csvContent = csvRows.join("\n");

      // Create a Blob from the CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      // Create download link
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      // Generate filename with current date and filters
      const today = dayjs().format("YYYY-MM-DD");
      const filterInfo = [];
      if (department !== "All") filterInfo.push(department);
      if (statusFilter !== "All") filterInfo.push(statusFilter);
      if (shiftFilter !== "All") filterInfo.push(shiftFilter);

      const filename = `attendance_${today}${
        filterInfo.length > 0 ? "_" + filterInfo.join("_") : ""
      }.csv`;

      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      URL.revokeObjectURL(url);

      console.log(`Exported ${filteredData.length} records to ${filename}`);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Failed to export CSV. Please try again.");
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
      {/* Filters Row */}
      <Row gutter={[8, 8]} style={{ marginBottom: "20px" }}>
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
            <Select.Option value="All">All</Select.Option>
            <Select.Option value="Present">Present</Select.Option>
            <Select.Option value="Absent">Absent</Select.Option>
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
          </Select>
        </Col>
        <Col xs={12} sm={6} md={6} lg={5}>
          <Button
            type="primary"
            size="large"
            onClick={handleExportCSV}
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
            panelRender={(panelNode) => (
              <div style={{ maxWidth: "100%", overflow: "auto" }}>
                {panelNode}
              </div>
            )}
          />

          {/* Table directly below DatePicker */}
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              marginTop: "8px",
            }}
            bodyStyle={{ padding: "16px" }}
          >
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
              />
            </div>
            <div
              style={{
                marginBottom: "12px",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              Showing {filteredData.length} of {allData.length} records
            </div>
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
                Weekly Summary
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
