"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchAttendanceReport,
  fetchOvertimeReport,
  fetchPayrollReport,
  fetchProductivityReport,
  exportReport,
  clearError,
  clearReports,
} from "../../redux/slices/exportSlice";
import {
  fetchDepartments,
  fetchEmployeesAsync,
} from "../../redux/slices/shiftsSlice";
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Select,
  Divider,
  Modal,
  Table,
  Tag,
  DatePicker,
  App,
  message,
  Space,
  Input,
  Spin,
} from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  FileTextOutlined,
  RiseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface Employee {
  name: string;
  email: string;
  profileImage?: string;
  specificRole: string;
  shift?: string;
  weeklyHours?: number;
  payAmount?: number;
  payType?: string;
  currency?: string;
}

interface ReportFile {
  id: string;
  name: string;
  date: string;
  type: string;
}

export default function ExportModal() {
  const { message } = App.useApp();
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const {
    attendanceRecords,
    overtimeRecords,
    payrollRecords,
    productivityRecords,
    loading,
    error,
    exportLoading,
  } = useSelector((state: RootState) => state.export);

  const [loggedInUser, setLoggedInUser] = useState<any>({});
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [recentReports, setRecentReports] = useState<ReportFile[]>([]);

  // Modal states
  const [attendanceModal, setAttendanceModal] = useState(false);
  const [overtimeModal, setOvertimeModal] = useState(false);
  const [payrollModal, setPayrollModal] = useState(false);
  const [productivityModal, setProductivityModal] = useState(false);

  // Filter states
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  const [searchText, setSearchText] = useState("");

  // Report Builder states
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedReportType, setSelectedReportType] = useState<string | null>(
    null
  );
  const [selectedReportEmployee, setSelectedReportEmployee] =
    useState<string>("all");
  const [reportEmployeeSearch, setReportEmployeeSearch] = useState("");
  const [dateRange, setDateRange] = useState<any>(null);
  const [selectedShift, setSelectedShift] = useState<string | null>(null);
  const [reportFormat, setReportFormat] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  // ✅ LOAD RECENT REPORTS AFTER COMPONENT MOUNTS
  useEffect(() => {
    const savedReports: ReportFile[] = JSON.parse(
      localStorage.getItem("recentReports") || "[]"
    );
    setRecentReports(savedReports);
  }, []);

  const { employees: reduxEmployees, departments: reduxDepartments } =
    useSelector((state: RootState) => state.shifts);

  useEffect(() => {
    if (loggedInUser.userRole === "admin") {
      dispatch(fetchEmployeesAsync());
      dispatch(fetchDepartments());
    }
  }, [loggedInUser.userRole, dispatch]);
  useEffect(() => {
    if (loggedInUser.userRole === "admin") {
      if (reduxEmployees.length > 0) {
        setEmployees(reduxEmployees);
      }
      if (reduxDepartments.length > 0) {
        setDepartments(reduxDepartments);
      }
    }
  }, [reduxEmployees, reduxDepartments, loggedInUser.userRole]);

  const loadData = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    setLoggedInUser(user);
  };

  const saveRecentReport = (name: string, type: string) => {
    const newReport: ReportFile = {
      id: `report_${Date.now()}`,
      name: name,
      date: new Date().toLocaleDateString(),
      type: type,
    };

    const reports = [newReport, ...recentReports.slice(0, 3)];
    setRecentReports(reports);
    localStorage.setItem("recentReports", JSON.stringify(reports));
  };

  // Fetch reports from API
  const handleViewReport = async (reportType: string) => {
    const params = {
      employeeEmail:
        loggedInUser.userRole === "employee"
          ? loggedInUser.email
          : selectedEmployee !== "all"
            ? selectedEmployee
            : undefined,
      department: selectedDepartment || undefined,
      startDate: dateRange?.[0]
        ? dayjs(dateRange[0]).format("YYYY-MM-DD")
        : undefined,
      endDate: dateRange?.[1]
        ? dayjs(dateRange[1]).format("YYYY-MM-DD")
        : undefined,
    };

    try {
      switch (reportType) {
        case "attendance":
          await dispatch(fetchAttendanceReport(params)).unwrap();
          setAttendanceModal(true);
          break;
        case "overtime":
          await dispatch(fetchOvertimeReport(params)).unwrap();
          setOvertimeModal(true);
          break;
        case "payroll":
          await dispatch(fetchPayrollReport(params)).unwrap();
          setPayrollModal(true);
          break;
        case "productivity":
          await dispatch(fetchProductivityReport(params)).unwrap();
          setProductivityModal(true);
          break;
      }
    } catch (err) {
      console.error("Error fetching report:", err);
    }
  };

  // Get filtered data for modals
  const getFilteredAttendance = () => {
    let data = attendanceRecords.map((record) => ({
      id: record._id,
      name: record.employeeId?.name || "N/A",
      email: record.employeeId?.email || "N/A",
      date: record.date,
      checkIn: record.checkIn,
      checkOut: record.checkOut,
      workingTime: record.workingTime,
      status: record.status,
      workingHours: record.workingHours || 0,
    }));

    if (searchText) {
      data = data.filter((r) =>
        r.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return data;
  };

  const getFilteredOvertime = () => {
    let data = overtimeRecords.map((record) => ({
      id: record._id || record.email,
      name: record.name,
      date: record.date,
      workingHours: record.workingHours || 0,
      expectedHours: record.expectedHours || 8,
      overtime: record.overtime || 0,
    }));

    if (searchText) {
      data = data.filter((r) =>
        r.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return data;
  };

  const getFilteredPayroll = () => {
    let data = payrollRecords.map((record) => ({
      name: record.name,
      role: record.role || record.specificRole || "N/A",
      payType: record.payType || "N/A",
      currency: record.currency || "$",
      basePay: record.basePay || record.payAmount || 0,
      hoursWorked: record.workedHours || record.hoursWorked || 0,
      totalPay: record.totalPay || 0,
    }));

    if (searchText) {
      data = data.filter((r) =>
        r.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return data;
  };

  const getFilteredProductivity = () => {
    let data = productivityRecords.map((record) => ({
      name: record.name,
      role: record.role || record.specificRole || "N/A",
      totalDays: record.totalDays || 0,
      presentDays: record.presentDays || 0,
      absentDays: record.absentDays || 0,
      attendanceRate: record.attendanceRate || 0,
      avgHoursPerDay: record.avgHoursPerDay || "0",
    }));

    if (searchText) {
      data = data.filter((r) =>
        r.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return data;
  };

  // Get filtered employees for report builder
  const getFilteredReportEmployees = () => {
    let filteredEmps = employees;

    // ✅ Only filter by department if one is selected
    if (selectedDepartment && selectedDepartment !== null) {
      filteredEmps = filteredEmps.filter(
        (e) => e.specificRole === selectedDepartment
      );
    }

    // ✅ Apply search filter
    if (reportEmployeeSearch) {
      filteredEmps = filteredEmps.filter((e) =>
        e.name.toLowerCase().includes(reportEmployeeSearch.toLowerCase())
      );
    }

    return filteredEmps;
  };

  // Generate Report using Redux
  const handleGenerateReport = async () => {
    if (!selectedReportType || !reportFormat) {
      message.error("Please select report type and format!");
      return;
    }

    const params = {
      reportType: selectedReportType,
      format: reportFormat,
      employeeEmail:
        loggedInUser.userRole === "employee"
          ? loggedInUser.email
          : selectedReportEmployee !== "all"
            ? selectedReportEmployee
            : undefined,
      department: selectedDepartment || undefined,
      startDate: dateRange?.[0]
        ? dayjs(dateRange[0]).format("YYYY-MM-DD")
        : undefined,
      endDate: dateRange?.[1]
        ? dayjs(dateRange[1]).format("YYYY-MM-DD")
        : undefined,
    };

    try {
      await dispatch(exportReport(params)).unwrap();
      saveRecentReport(
        `${selectedReportType.replace(/ /g, "_")}_${Date.now()}.${reportFormat}`,
        selectedReportType
      );
      message.success("Report generated and downloaded successfully!");
    } catch (err) {
      console.error("Error generating report:", err);
    }
  };

  const attendanceColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (time: string) => (time ? dayjs(time).format("hh:mm A") : "N/A"),
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (time: string) =>
        time ? dayjs(time).format("hh:mm A") : "In Progress",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status?.toLowerCase() === "present" ? "green" : "red"}>
          {status ? status.toUpperCase() : "N/A"}
        </Tag>
      ),
    },
  ];

  const overtimeColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Working Hours",
      dataIndex: "workingHours",
      key: "workingHours",
      render: (hours: any) => {
        const num = parseFloat(hours);
        return `${isNaN(num) ? 0 : num.toFixed(2)} hrs`;
      },
    },
    {
      title: "Expected Hours",
      dataIndex: "expectedHours",
      key: "expectedHours",
      render: (hours: any) => {
        const num = parseFloat(hours);
        return `${isNaN(num) ? 0 : num.toFixed(2)} hrs`;
      },
    },
    {
      title: "Overtime",
      dataIndex: "overtime",
      key: "overtime",
      render: (hours: number) => (
        <Tag color="orange">{hours?.toFixed(2) || 0} hrs</Tag>
      ),
    },
  ];

  const payrollColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Pay Type",
      dataIndex: "payType",
      key: "payType",
    },
    {
      title: "Base Pay",
      dataIndex: "basePay",
      key: "basePay",
      render: (pay: number, record: any) =>
        `${record.currency}${pay?.toLocaleString() || 0}`,
    },
    {
      title: "Worked Hours ",
      dataIndex: "hoursWorked",
      key: "hoursWorked",
      render: (hours: number) => `${hours?.toFixed(2) || 0} hrs`,
    },
    {
      title: "Total Pay",
      dataIndex: "totalPay",
      key: "totalPay",
      render: (pay: number, record: any) => (
        <Tag color="green">
          {record.currency}
          {pay?.toLocaleString() || 0}
        </Tag>
      ),
    },
  ];

  const productivityColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Total Days",
      dataIndex: "totalDays",
      key: "totalDays",
    },
    {
      title: "Present",
      dataIndex: "presentDays",
      key: "presentDays",
      render: (days: number) => <Tag color="green">{days}</Tag>,
    },
    {
      title: "Absent",
      dataIndex: "absentDays",
      key: "absentDays",
      render: (days: number) => <Tag color="red">{days}</Tag>,
    },
    {
      title: "Attendance Rate",
      dataIndex: "attendanceRate",
      key: "attendanceRate",
      render: (rate: number) => `${rate}%`,
    },
    {
      title: "Avg Hours/Day",
      dataIndex: "avgHoursPerDay",
      key: "avgHoursPerDay",
      render: (hours: string) => `${hours} hrs`,
    },
  ];

  const cards = [
    {
      icon: <CalendarOutlined style={{ fontSize: 32, color: "#10b981" }} />,
      title: "Attendance Report",
      buttonText: "View",
      onClick: () => handleViewReport("attendance"),
      showForEmployee: true,
    },
    {
      icon: <ClockCircleOutlined style={{ fontSize: 32, color: "#10b981" }} />,
      title: "Overtime Report",
      buttonText: "View",
      onClick: () => handleViewReport("overtime"),
      showForEmployee: true,
    },
    {
      icon: <FileTextOutlined style={{ fontSize: 32, color: "#10b981" }} />,
      title: "Pay Roll Report",
      buttonText: "View",
      onClick: () => handleViewReport("payroll"),
      showForEmployee: true,
    },
    {
      icon: <RiseOutlined style={{ fontSize: 32, color: "#10b981" }} />,
      title: "Productivity Report",
      buttonText: "View",
      onClick: () => handleViewReport("productivity"),
      showForEmployee: loggedInUser.userRole === "employee",
    },
  ];

  return (
    <Spin spinning={loading || exportLoading}>
      {/* Cards */}
      <Row gutter={[16, 16]} justify="start">
        {cards
          .filter(
            (card) => loggedInUser.userRole === "admin" || card.showForEmployee
          )
          .map((card, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={6}>
              <Card
                variant="outlined"
                style={{ textAlign: "center" }}
                styles={{ body: { padding: 24 } }}
              >
                {card.icon}
                <Text strong style={{ display: "block", marginTop: 12 }}>
                  {card.title}
                </Text>

                <Button
                  onClick={card.onClick}
                  style={{
                    marginTop: 16,
                    backgroundColor: "#10b981",
                    borderRadius: "20px",
                    borderColor: "#10b981",
                    color: "white",
                    width: "150px",
                  }}
                >
                  {card.buttonText}
                </Button>
              </Card>
            </Col>
          ))}
      </Row>

      {/* Select Report Section + Recent Reports Side by Side */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {/* Left Card — Select Report Type */}
        <Col xs={24} md={14}>
          <Card
            style={{
              borderRadius: "12px",
              width: "100%",
              marginBottom: "16px",
            }}
          >
            <Row align="middle" style={{ marginBottom: 12 }}>
              <CalendarOutlined style={{ fontSize: 20, color: "#10b981" }} />
              <Text strong style={{ marginLeft: 8 }}>
                Select Report Type
              </Text>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Select
                  placeholder="Department"
                  style={{ width: "100%", borderRadius: 8 }}
                  value={selectedDepartment}
                  onChange={setSelectedDepartment}
                  disabled={loggedInUser.userRole === "employee"}
                >
                  <Option value={null}>All Departments</Option>{" "}
                  {/* Add this for "All" option */}
                  {departments.map((dept) => (
                    <Option key={dept} value={dept}>
                      {dept}
                    </Option>
                  ))}
                </Select>
              </Col>

              <Col xs={24} sm={12}>
                <Select
                  placeholder="Report Rules"
                  style={{ width: "100%", borderRadius: 8 }}
                  value={selectedReportType}
                  onChange={setSelectedReportType}
                >
                  <Option value="Attendance Report">Attendance Report</Option>
                  <Option value="Overtime Report">Overtime Report</Option>
                  <Option value="Pay Roll Report">Pay Roll Report</Option>
                  {loggedInUser.userRole === "admin" && (
                    <Option value="Productivity Report">
                      Productivity Report
                    </Option>
                  )}
                </Select>
              </Col>
            </Row>
          </Card>

          {/* Report Builder Card */}
          <Card
            style={{
              borderRadius: "12px",
              width: "100%",
            }}
          >
            <Row align="middle" style={{ marginBottom: 12 }}>
              <FileTextOutlined style={{ fontSize: 20, color: "#10b981" }} />
              <Text strong style={{ marginLeft: 8 }}>
                Report Builder
              </Text>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              {loggedInUser.userRole === "admin" && (
                <Col xs={24}>
                  <Text style={{ display: "block", marginBottom: 8 }}>
                    Select Employee
                  </Text>
                  <Select
                    placeholder="All Employees"
                    style={{ width: "100%", borderRadius: 8 }}
                    value={selectedReportEmployee}
                    onChange={setSelectedReportEmployee}
                    showSearch
                    filterOption={(input, option) => {
                      const label = option?.label || option?.children;
                      const labelStr = Array.isArray(label)
                        ? label.join(" ")
                        : String(label || "");
                      return labelStr
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                  >
                    <Option value="all">All Employees</Option>
                    {getFilteredReportEmployees().map((emp) => (
                      <Option key={emp.email} value={emp.email}>
                        {emp.name} - {emp.specificRole}
                      </Option>
                    ))}
                  </Select>
                </Col>
              )}

              <Col xs={24}>
                <Text style={{ display: "block", marginBottom: 8 }}>
                  Date Range
                </Text>
                <RangePicker
                  style={{ width: "100%" }}
                  value={dateRange}
                  onChange={setDateRange}
                />
              </Col>

              {loggedInUser.userRole === "admin" && (
                <Col xs={24} sm={12}>
                  <Select
                    placeholder="Shift"
                    style={{ width: "100%", borderRadius: 8 }}
                    value={selectedShift}
                    onChange={setSelectedShift}
                  >
                    <Option value="morning">Morning (6 AM - 2 PM)</Option>
                    <Option value="afternoon">Afternoon (2 PM - 10 PM)</Option>
                    <Option value="evening">Evening (10 PM - 6 AM)</Option>
                  </Select>
                </Col>
              )}

              <Col xs={24} sm={loggedInUser.userRole === "admin" ? 12 : 24}>
                <Select
                  placeholder="Report Format"
                  style={{ width: "100%", borderRadius: 8 }}
                  value={reportFormat}
                  onChange={setReportFormat}
                >
                  <Option value="pdf">PDF</Option>
                  <Option value="csv">CSV</Option>
                </Select>
              </Col>
            </Row>

            <Row justify="center" style={{ marginTop: 24 }}>
              <Button
                onClick={handleGenerateReport}
                loading={exportLoading}
                style={{
                  backgroundColor: "#10b981",
                  borderColor: "#10b981",
                  borderRadius: "20px",
                  color: "white",
                  width: "180px",
                }}
              >
                Generate Report
              </Button>
            </Row>
          </Card>
        </Col>

        {/* Right Card — Recent Reports */}
        <Col xs={24} md={10}>
          <Card style={{ borderRadius: "12px", width: "100%" }}>
            <Text strong style={{ fontSize: 16 }}>
              Recent Reports
            </Text>

            <div style={{ marginTop: 16 }}>
              {recentReports.length > 0 ? (
                recentReports.map((file, i) => (
                  <Row
                    key={i}
                    justify="space-between"
                    align="middle"
                    style={{
                      padding: "10px 0",
                      borderBottom:
                        i < recentReports.length - 1 ? "1px solid #f0f0f0" : "",
                    }}
                  >
                    <Row align="middle">
                      <FileTextOutlined
                        style={{
                          fontSize: 20,
                          marginRight: 8,
                          color: "#10b981",
                        }}
                      />
                      <div>
                        <Text>{file.name}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {file.date} - {file.type}
                        </Text>
                      </div>
                    </Row>

                    <Button
                      type="text"
                      icon={
                        <DownloadOutlined
                          style={{ fontSize: 18, color: "#10b981" }}
                        />
                      }
                      style={{ padding: 0 }}
                    />
                  </Row>
                ))
              ) : (
                <Text type="secondary">No recent reports</Text>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Attendance Modal */}
      <Modal
        title="Attendance Report"
        open={attendanceModal}
        onCancel={() => {
          setAttendanceModal(false);
          setSearchText("");
          dispatch(clearReports());
        }}
        footer={null}
        width={1000}
      >
        {loggedInUser.userRole === "admin" && (
          <Space style={{ marginBottom: 16, width: "100%" }}>
            <Input
              placeholder="Search by name..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </Space>
        )}
        <Table
          columns={attendanceColumns}
          dataSource={getFilteredAttendance()}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Modal>

      {/* Overtime Modal */}
      <Modal
        title="Overtime Report"
        open={overtimeModal}
        onCancel={() => {
          setOvertimeModal(false);
          setSearchText("");
          dispatch(clearReports());
        }}
        footer={null}
        width={1000}
      >
        {loggedInUser.userRole === "admin" && (
          <Space style={{ marginBottom: 16, width: "100%" }}>
            <Input
              placeholder="Search by name..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </Space>
        )}
        <Table
          columns={overtimeColumns}
          dataSource={getFilteredOvertime()}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Modal>

      {/* Payroll Modal */}
      <Modal
        title="Pay Roll Report"
        open={payrollModal}
        onCancel={() => {
          setPayrollModal(false);
          setSearchText("");
          dispatch(clearReports());
        }}
        footer={null}
        width={1000}
      >
        {loggedInUser.userRole === "admin" && (
          <Space style={{ marginBottom: 16, width: "100%" }}>
            <Input
              placeholder="Search by name..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </Space>
        )}
        <Table
          columns={payrollColumns}
          dataSource={getFilteredPayroll()}
          rowKey="name"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Modal>

      {/* Productivity Modal */}
      <Modal
        title="Productivity Report"
        open={productivityModal}
        onCancel={() => {
          setProductivityModal(false);
          setSearchText("");
          dispatch(clearReports());
        }}
        footer={null}
        width={1100}
      >
        {loggedInUser.userRole === "admin" && (
          <Space style={{ marginBottom: 16, width: "100%" }}>
            <Input
              placeholder="Search by name..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </Space>
        )}
        <Table
          columns={productivityColumns}
          dataSource={getFilteredProductivity()}
          rowKey="name"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 900 }}
        />
      </Modal>
    </Spin>
  );
}
