import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Modal,
  Table,
  App,
  message,
  Tag,
  DatePicker,
} from "antd";
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import type { Dayjs } from "dayjs";
import axios from "axios";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

// API Base URL - Update this to your backend URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

interface UserData {
  name: string;
  userRole: string;
  specificRole: string;
  shift?: string;
  customShift?: string;
  weeklyHours?: number;
}

interface AttendanceRecord {
  _id: string;
  employeeId: {
    _id: string;
    name: string;
    email: string;
    specificRole: string;
  };
  date: string;
  checkIn: string;
  checkOut: string;
  workDuration: string;
  status: string;
}

interface Employee {
  _id: string;
  name: string;
  email: string;
  specificRole: string;
  shift: string;
  weeklyHours: number;
  employmentType: string;
  employmentDuration: string;
}

const QuickStatsCards: React.FC = () => {
  const { message } = App.useApp();
  const [userData, setUserData] = useState<UserData>({
    name: "User",
    userRole: "employee",
    specificRole: "Employee",
  });

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [weeklyHours, setWeeklyHours] = useState("0h 0m");
  const [currentShift, setCurrentShift] = useState("Not Set");
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [isEmployeesModalVisible, setIsEmployeesModalVisible] = useState(false);
  const [isAttendanceModalVisible, setIsAttendanceModalVisible] =
    useState(false);
  const [workingHours, setWorkingHours] = useState("0h 0m 0s");
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [hasMarkedToday, setHasMarkedToday] = useState(false);

  // Leave-related state variables
  const [isLeaveModalVisible, setIsLeaveModalVisible] = useState(false);
  const [leaveDates, setLeaveDates] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const [leaveType, setLeaveType] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [leaveLoading, setLeaveLoading] = useState(false);

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Axios instance with auth header
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    loadData();

    // Update working hours every second
    const timer = setInterval(() => {
      updateWorkingHours();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update working hours in real-time
  useEffect(() => {
    if (isCheckedIn && checkInTime && !checkOutTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const checkIn = new Date(checkInTime);
        const diff = now.getTime() - checkIn.getTime();

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setWorkingHours(`${hours}h ${minutes}m ${seconds}s`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isCheckedIn, checkInTime, checkOutTime]);

  const loadData = async () => {
    try {
      // Load user data from localStorage
      const loggedInUserStr = localStorage.getItem("loggedInUser");
      if (loggedInUserStr) {
        const currentUser = JSON.parse(loggedInUserStr);
        setUserData({
          name: currentUser.name || "User",
          userRole: currentUser.userRole || "employee",
          specificRole: currentUser.specificRole || "Employee",
          shift: currentUser.shift,
          customShift: currentUser.customShift,
          weeklyHours: currentUser.weeklyHours,
        });

        // Set shift display
        if (currentUser.userRole === "employee" && currentUser.shift) {
          const shiftMap: any = {
            morning: "Morning (6 AM - 2 PM)",
            afternoon: "Afternoon (2 PM - 10 PM)",
            evening: "Evening (10 PM - 6 AM)",
          };
          setCurrentShift(
            currentUser.customShift ||
              shiftMap[currentUser.shift] ||
              currentUser.shift
          );
        }

        // Load employees from backend
        await loadEmployees();

        // Load check-in status for employee
        if (currentUser.userRole === "employee") {
          await loadCheckInStatus();
        }

        // Load weekly stats
        await loadWeeklyStats();
      }
    } catch (error) {
      console.error("Load data error:", error);
      message.error("Failed to load data");
    }
  };

  const loadEmployees = async () => {
    try {
      // For employee: Only get count, not full employee list
      if (userData.userRole === "employee") {
        const response = await axiosInstance.get("/employees/count");
        if (response.data.success) {
          setTotalEmployees(response.data.data.count);
        }
      } else {
        // For admin: Get full list
        const response = await axiosInstance.get("/employees/list");
        if (response.data.success) {
          setAllEmployees(response.data.data.employees);
          setTotalEmployees(response.data.data.count);
        }
      }
    } catch (error: any) {
      console.error("Load employees error:", error);
      message.error(
        error.response?.data?.message || "Failed to load employees"
      );
    }
  };

  const loadCheckInStatus = async () => {
    try {
      const response = await axiosInstance.get("/attendance/check-in-status");
      if (response.data.success) {
        const {
          isCheckedIn,
          hasMarkedToday,
          attendance,
          checkInTime,
          checkOutTime,
        } = response.data.data;

        setIsCheckedIn(isCheckedIn);
        setHasMarkedToday(hasMarkedToday);

        if (checkInTime) {
          setCheckInTime(checkInTime);
        }
        if (checkOutTime) {
          setCheckOutTime(checkOutTime);
        }
      }
    } catch (error: any) {
      console.error("Load check-in status error:", error);
    }
  };

  const loadWeeklyStats = async () => {
    try {
      const response = await axiosInstance.get("/attendance/weekly-stats");
      if (response.data.success) {
        // Calculate total hours from weekly data
        const weekData = response.data.data.weekData;
        // You can process and display this data as needed
      }
    } catch (error: any) {
      console.error("Load weekly stats error:", error);
    }
  };

  const updateWorkingHours = () => {
    if (isCheckedIn && checkInTime && !checkOutTime) {
      const now = new Date();
      const checkIn = new Date(checkInTime);
      const diff = now.getTime() - checkIn.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setWorkingHours(`${hours}h ${minutes}m ${seconds}s`);
    }
  };

  const handleCheckIn = async () => {
    if (userData.userRole !== "employee") {
      message.error("Only employees can mark attendance!");
      return;
    }

    if (hasMarkedToday) {
      message.warning("You have already marked attendance for today!");
      return;
    }

    try {
      setCheckInLoading(true);
      const response = await axiosInstance.post("/attendance/check-in");

      if (response.data.success) {
        const { attendance, checkInTime } = response.data.data;

        setIsCheckedIn(true);
        setCheckInTime(checkInTime);
        setCheckOutTime(null);
        setWorkingHours("0h 0m 0s");
        setHasMarkedToday(true);

        message.success(
          "Checked in successfully! Attendance marked as Present."
        );
      }
    } catch (error: any) {
      console.error("Check-in error:", error);
      message.error(error.response?.data?.message || "Failed to check in");
    } finally {
      setCheckInLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setCheckInLoading(true);
      const response = await axiosInstance.put("/attendance/check-out");

      if (response.data.success) {
        const { attendance, checkOutTime, workDuration } = response.data.data;

        setCheckOutTime(checkOutTime);
        setIsCheckedIn(false);
        setWorkingHours(workDuration);

        message.success("Checked out successfully!");

        // Reload weekly stats
        await loadWeeklyStats();
      }
    } catch (error: any) {
      console.error("Check-out error:", error);
      message.error(error.response?.data?.message || "Failed to check out");
    } finally {
      setCheckInLoading(false);
    }
  };

  const handleViewAttendance = async () => {
    try {
      setAttendanceLoading(true);
      const response = await axiosInstance.get("/attendance/list");

      if (response.data.success) {
        setAttendanceRecords(response.data.data.attendance);
        setIsAttendanceModalVisible(true);
      }
    } catch (error: any) {
      console.error("Load attendance error:", error);
      message.error(
        error.response?.data?.message || "Failed to load attendance"
      );
    } finally {
      setAttendanceLoading(false);
    }
  };

  const handleLeaveRequest = () => {
    setIsLeaveModalVisible(true);
  };

  const handleLeaveSubmit = async () => {
    if (!leaveDates || !leaveType || !leaveReason) {
      message.error("Please fill all fields!");
      return;
    }

    try {
      setLeaveLoading(true);
      const response = await axiosInstance.post("/leaves/submit", {
        startDate: leaveDates[0]?.toISOString(),
        endDate: leaveDates[1]?.toISOString(),
        leaveType,
        reason: leaveReason,
      });

      if (response.data.success) {
        message.success("Leave request submitted successfully!");
        setIsLeaveModalVisible(false);
        setLeaveDates(null);
        setLeaveType("");
        setLeaveReason("");
      }
    } catch (error: any) {
      console.error("Submit leave error:", error);
      message.error(
        error.response?.data?.message || "Failed to submit leave request"
      );
    } finally {
      setLeaveLoading(false);
    }
  };

  const exportToCSV = async () => {
    try {
      const response = await axiosInstance.get("/attendance/export-csv", {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "text/csv;charset=utf-8;",
      });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `attendance_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      message.success("Attendance exported successfully!");
    } catch (error: any) {
      console.error("Export error:", error);
      message.error("Failed to export attendance");
    }
  };

  const employeeColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Department",
      dataIndex: "specificRole",
      key: "specificRole",
    },
    {
      title: "Employment Type",
      dataIndex: "employmentType",
      key: "employmentType",
      render: (type: string) => (
        <span style={{ textTransform: "capitalize" }}>
          {type === "fulltime" ? "Full Time" : "Part Time"}
        </span>
      ),
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
    },
    {
      title: "Weekly Hours",
      dataIndex: "weeklyHours",
      key: "weeklyHours",
      render: (hours: number) => `${hours} hours/week`,
    },
  ];

  const attendanceColumns = [
    {
      title: "Name",
      dataIndex: ["employeeId", "name"],
      key: "name",
      fixed: "left" as const,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (time: string) =>
        time ? new Date(time).toLocaleTimeString() : "-",
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (time: string) =>
        time ? new Date(time).toLocaleTimeString() : "In Progress",
    },
    {
      title: "Working Hours",
      dataIndex: "workDuration",
      key: "workDuration",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Present" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[24, 16]}>
        {(userData.userRole === "admin" ||
          userData.userRole === "employee") && (
          <Col xs={24} sm={12} lg={8}>
            <Card style={{ borderRadius: "12px", height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <Text type="secondary" style={{ fontSize: "14px" }}>
                    Total Employees
                  </Text>
                  <Title
                    level={2}
                    style={{
                      margin: "8px 0",
                      fontSize: "36px",
                      fontWeight: "bold",
                    }}
                  >
                    {totalEmployees}
                  </Title>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    All departments
                  </Text>
                </div>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "#e6f7ff",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UserOutlined
                    style={{ fontSize: "24px", color: "#1890ff" }}
                  />
                </div>
              </div>
            </Card>
          </Col>
        )}

        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderRadius: "12px", height: "100%" }}>
            <Title level={4} style={{ margin: "0 0 12px 0" }}>
              Welcome back,
              <br />
              {userData.name}!
            </Title>
            {userData.userRole === "employee" && (
              <>
                <Text
                  type="secondary"
                  style={{
                    display: "block",
                    fontSize: "13px",
                    marginBottom: "4px",
                  }}
                >
                  Current Shift: {currentShift}
                </Text>
                <Text
                  type="secondary"
                  style={{
                    display: "block",
                    fontSize: "13px",
                    marginBottom: "4px",
                  }}
                >
                  Weekly Hours: <strong>{weeklyHours}</strong>
                </Text>
                {hasMarkedToday && (
                  <Tag color="green" style={{ marginTop: "8px" }}>
                    Attendance Marked Today ✓
                  </Tag>
                )}
                {isCheckedIn && (
                  <Text
                    style={{
                      display: "block",
                      fontSize: "14px",
                      marginTop: "8px",
                      color: "#52c41a",
                      fontWeight: "600",
                    }}
                  >
                    Current Session: <strong>{workingHours}</strong>
                  </Text>
                )}
              </>
            )}
            <Text
              type="secondary"
              style={{ display: "block", fontSize: "13px", marginTop: "8px" }}
            >
              Role:{" "}
              {userData.userRole === "admin" ? "Administrator" : "Employee"}
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            title="Quick Actions"
            style={{ borderRadius: "12px", height: "100%" }}
          >
            <Space
              direction="vertical"
              size="small"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Space
                direction="horizontal"
                size="small"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {userData.userRole === "employee" && (
                  <>
                    <Button
                      type="primary"
                      icon={
                        isCheckedIn ? <LogoutOutlined /> : <LoginOutlined />
                      }
                      onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
                      disabled={!isCheckedIn && hasMarkedToday}
                      loading={checkInLoading}
                      style={{
                        flex: 1,
                        border: "none",
                        borderRadius: "20px",
                        backgroundColor: "#10b981",
                        borderColor: "#10b981",
                        height: "45px",
                        fontSize: "15px",
                        color: "white",
                      }}
                    >
                      {isCheckedIn
                        ? "Check-Out"
                        : hasMarkedToday
                          ? "Checked In"
                          : "Check-In"}
                    </Button>
                    <Button
                      onClick={handleLeaveRequest}
                      style={{
                        flex: 1,
                        height: "45px",
                        fontSize: "15px",
                        borderRadius: "20px",
                        backgroundColor: "#E9ECEF",
                        border: "none",
                      }}
                    >
                      Request Leave
                    </Button>
                  </>
                )}
              </Space>
              <Button
                block
                onClick={handleViewAttendance}
                loading={attendanceLoading}
                style={{
                  width: "100%",
                  background: "transparent",
                  backgroundColor: "#D8EEFF",
                  borderRadius: "20px",
                  height: "45px",
                  fontSize: "15px",
                  border: "none",
                }}
              >
                View Attendance
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Leave Modal */}
      <Modal
        title="Request Leave"
        open={isLeaveModalVisible}
        onCancel={() => {
          setIsLeaveModalVisible(false);
          setLeaveDates(null);
          setLeaveType("");
          setLeaveReason("");
        }}
        onOk={handleLeaveSubmit}
        confirmLoading={leaveLoading}
        okText="Submit Request"
        okButtonProps={{
          style: {
            background: "linear-gradient(135deg, #00D4B1, #0066FF)",
            border: "none",
          },
        }}
      >
        <Space
          direction="vertical"
          size="middle"
          style={{ width: "100%", marginTop: "20px" }}
        >
          <div>
            <Text strong>Leave Duration</Text>
            <RangePicker
              style={{ width: "100%", marginTop: "8px" }}
              onChange={(dates) =>
                setLeaveDates(dates as [Dayjs | null, Dayjs | null] | null)
              }
            />
          </div>
          <div>
            <Text strong>Leave Type</Text>
            <select
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #d9d9d9",
              }}
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="">Select leave type</option>
              <option value="annual">Annual Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="emergency">Emergency Leave</option>
            </select>
          </div>
          <div>
            <Text strong>Reason</Text>
            <TextArea
              rows={4}
              placeholder="Enter reason for leave"
              style={{ marginTop: "8px" }}
              value={leaveReason}
              onChange={(e) => setLeaveReason(e.target.value)}
            />
          </div>
        </Space>
      </Modal>

      {/* Employees Modal */}
      <Modal
        title="All Registered Employees"
        open={isEmployeesModalVisible}
        onCancel={() => setIsEmployeesModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsEmployeesModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={1000}
      >
        <Table
          columns={employeeColumns}
          dataSource={allEmployees}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Modal>

      {/* Attendance Modal */}
      <Modal
        title={
          userData.userRole === "admin"
            ? "Attendance Records - All Employees"
            : `Attendance Records - ${userData.name}`
        }
        open={isAttendanceModalVisible}
        onCancel={() => setIsAttendanceModalVisible(false)}
        footer={[
          <Button
            key="export"
            onClick={exportToCSV}
            style={{
              background: "linear-gradient(135deg, #00D4B1, #0066FF)",
              color: "white",
              border: "none",
            }}
          >
            Export to CSV
          </Button>,
          <Button
            key="close"
            onClick={() => setIsAttendanceModalVisible(false)}
          >
            Close
          </Button>,
        ]}
        width={900}
      >
        <Table
          columns={attendanceColumns}
          dataSource={attendanceRecords}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 700 }}
        />
      </Modal>
    </>
  );
};

export default QuickStatsCards;
