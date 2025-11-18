import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Modal,
  DatePicker,
  Select,
  Input,
  message,
  Tag,
  Table,
  Popconfirm,
} from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { Dayjs } from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// API Base URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

interface UserData {
  name: string;
  userRole: string;
  specificRole: string;
  shift?: string;
  customShift?: string;
}

interface LeaveRequest {
  _id: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: string;
  createdAt: string;
}

interface Announcement {
  _id: string;
  title: string;
  message: string;
  priority: string;
  createdAt: string;
}

const COLORS = {
  Approved: "#00D4B1",
  Pending: "#FFB020",
  Rejected: "#FF4D4F",
};

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: "User",
    userRole: "employee",
    specificRole: "Employee",
  });

  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [isLeaveModalVisible, setIsLeaveModalVisible] = useState(false);
  const [isLeaveDetailsModalVisible, setIsLeaveDetailsModalVisible] =
    useState(false);

  // Leave form state
  const [leaveDates, setLeaveDates] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const [leaveType, setLeaveType] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  // Data state
  const [weeklyAttendance, setWeeklyAttendance] = useState<any[]>([]);
  const [myAttendance, setMyAttendance] = useState<any[]>([]);
  const [attendanceView, setAttendanceView] = useState<
    "week" | "month" | "custom"
  >("week");
  const [selectedDays, setSelectedDays] = useState<number>(7);
  const [recentLeaves, setRecentLeaves] = useState<LeaveRequest[]>([]);
  const [leaveChartData, setLeaveChartData] = useState<any[]>([]);
  const [upcomingShifts, setUpcomingShifts] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);

  // Axios instance
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    setMounted(true);
    loadData();
  }, []);

  useEffect(() => {
    if (mounted && userData.name) {
      loadMyAttendance();
    }
  }, [attendanceView, selectedDays, userData.name, mounted]);

  const loadData = async () => {
    try {
      // Load user from localStorage
      const loggedInUserStr = localStorage.getItem("loggedInUser");
      if (loggedInUserStr) {
        const currentUser = JSON.parse(loggedInUserStr);
        setUserData({
          name: currentUser.name || "User",
          userRole: currentUser.userRole || "employee",
          specificRole: currentUser.specificRole || "Employee",
          shift: currentUser.shift,
          customShift: currentUser.customShift,
        });

        // Load backend data
        await loadWeeklyAttendance();
        await loadAnnouncements();

        if (currentUser.userRole === "employee") {
          await loadCheckInStatus();
          await loadMyLeaveRequests();
        } else if (currentUser.userRole === "admin") {
          await loadUpcomingLeaves();
        }
      }
    } catch (error) {
      console.error("Load data error:", error);
    }
  };

  const loadWeeklyAttendance = async () => {
    try {
      const response = await axiosInstance.get("/attendance/weekly-stats");
      if (response.data.success) {
        setWeeklyAttendance(response.data.data.weekData);
      }
    } catch (error: any) {
      console.error("Load weekly attendance error:", error);
      setWeeklyAttendance([]); // ADD THIS
    }
  };

  const loadCheckInStatus = async () => {
    try {
      const response = await axiosInstance.get("/attendance/check-in-status");
      if (response.data.success) {
        const { checkInTime } = response.data.data;
        if (checkInTime) {
          setCheckInTime(checkInTime);
        }
      }
    } catch (error: any) {
      console.error("Load check-in status error:", error);
    }
  };

  const loadMyAttendance = async () => {
    try {
      let days = selectedDays;
      if (attendanceView === "week") days = 7;
      else if (attendanceView === "month") days = 30;

      const response = await axiosInstance.get(
        `/attendance/my-history?days=${days}`
      );
      if (response.data.success) {
        setMyAttendance(response.data.data.attendance);
      }
    } catch (error: any) {
      console.error("Load my attendance error:", error);
      setMyAttendance([]); // ADD THIS
    }
  };
  // In loadMyLeaveRequests function (around line 220-240)
  const loadMyLeaveRequests = async () => {
    try {
      const response = await axiosInstance.get("/leaves/list");
      if (response.data.success) {
        // ✅ SAFE: Use optional chaining and default empty array
        const leaves = response.data.data?.leaves || [];
        setRecentLeaves(leaves);

        // Calculate chart data
        const statusCounts = {
          Approved: 0,
          Pending: 0,
          Rejected: 0,
        };

        // ✅ SAFE: Now leaves is guaranteed to be an array
        leaves.forEach((leave: LeaveRequest) => {
          if (leave.status in statusCounts) {
            statusCounts[leave.status as keyof typeof statusCounts]++;
          }
        });

        const chartData = Object.entries(statusCounts)
          .filter(([_, count]) => count > 0)
          .map(([status, count]) => ({
            name: status,
            value: count,
            // ✅ SAFE: Check if leaves has items before dividing
            percentage:
              leaves.length > 0 ? Math.round((count / leaves.length) * 100) : 0,
          }));

        setLeaveChartData(chartData);
      }
    } catch (error: any) {
      console.error("Load leave requests error:", error);
      // ✅ IMPORTANT: Set empty arrays on error
      setRecentLeaves([]);
      setLeaveChartData([]);
    }
  };

  const loadUpcomingLeaves = async () => {
    try {
      const response = await axiosInstance.get("/leaves/upcoming");
      if (response.data.success) {
        // ✅ SAFE: Use optional chaining and default empty array
        const leaves = response.data.data?.leaves || [];
        const shifts = leaves.map((leave: any) => ({
          id: leave._id,
          type: leave.leaveType,
          time: `${new Date(leave.startDate).toLocaleDateString()} - ${new Date(leave.endDate).toLocaleDateString()}`,
          approved: true,
          employeeName: leave.employeeName,
        }));
        setUpcomingShifts(shifts);
      }
    } catch (error: any) {
      console.error("Load upcoming leaves error:", error);
      setUpcomingShifts([]);
    }
  };

  const loadAnnouncements = async () => {
    try {
      const response = await axiosInstance.get("/announcements/list");
      if (response.data.success) {
        // ✅ SAFE: Use optional chaining and default empty array
        const announcements = response.data.data?.announcements || [];
        setAnnouncements(announcements);
      }
    } catch (error: any) {
      console.error("Load announcements error:", error);
      setAnnouncements([]);
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
      setLoading(true);
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

        if (userData.userRole === "employee") {
          await loadMyLeaveRequests();
        }
      }
    } catch (error: any) {
      console.error("Submit leave error:", error);
      message.error(
        error.response?.data?.message || "Failed to submit leave request"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLeave = async (leaveId: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`/leaves/${leaveId}`);

      if (response.data.success) {
        message.success("Leave deleted successfully!");

        if (userData.userRole === "admin") {
          await loadUpcomingLeaves();
        } else {
          await loadMyLeaveRequests();
        }
      }
    } catch (error: any) {
      console.error("Delete leave error:", error);
      message.error(error.response?.data?.message || "Failed to delete leave");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnnouncement = async (announcementId: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(
        `/announcements/${announcementId}`
      );

      if (response.data.success) {
        message.success("Announcement deleted successfully!");
        await loadAnnouncements();
      }
    } catch (error: any) {
      console.error("Delete announcement error:", error);
      message.error(
        error.response?.data?.message || "Failed to delete announcement"
      );
    } finally {
      setLoading(false);
    }
  };

  const getShiftDisplay = () => {
    if (userData.customShift) return userData.customShift;
    if (userData.shift) {
      const shiftMap: any = {
        morning: "Morning Shift (09:00 - 17:00)",
        afternoon: "Afternoon Shift (14:00 - 22:00)",
        evening: "Evening Shift (22:00 - 06:00)",
      };
      return shiftMap[userData.shift] || "Not Set";
    }
    return "Not Set";
  };

  const leaveColumns = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
      render: (type: string) => {
        const typeMap: any = {
          annual: "Annual Leave",
          sick: "Sick Leave",
          casual: "Casual Leave",
          emergency: "Emergency Leave",
        };
        return typeMap[type] || type;
      },
    },
    {
      title: "Duration",
      key: "duration",
      render: (record: LeaveRequest) =>
        `${new Date(record.startDate).toLocaleDateString()} - ${new Date(record.endDate).toLocaleDateString()} (${record.totalDays} ${record.totalDays === 1 ? "day" : "days"})`,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colorMap: any = {
          Approved: "green",
          Pending: "orange",
          Rejected: "red",
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: "Submitted On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: LeaveRequest) => (
        <Popconfirm
          title="Delete Leave"
          description="Are you sure you want to delete this leave permanently?"
          onConfirm={() => handleDeleteLeave(record._id)}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ danger: true }}
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
            loading={loading}
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const employeeLeaveColumns = leaveColumns.filter(
    (col) => col.key !== "employeeName"
  );

  const CustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "14px", fontWeight: "bold" }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "white",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", fontSize: "12px" }}>
            {payload[0].payload.fullDate}
          </p>
          <p
            style={{ margin: "4px 0 0 0", color: "#00D4B1", fontSize: "12px" }}
          >
            Actual: {payload[0].value}h
          </p>
          <p
            style={{ margin: "4px 0 0 0", color: "#FF4D4F", fontSize: "12px" }}
          >
            Target: {payload[1].value}h
          </p>
        </div>
      );
    }
    return null;
  };

  if (!mounted) return null;

  return (
    <div style={{ padding: "20px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={userData.userRole === "admin" ? 12 : 12}>
          <Card title="This Week's Attendance" style={{ borderRadius: "12px" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
              <span
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    background: "#00D4B1",
                    borderRadius: "2px",
                  }}
                ></div>
                <Text style={{ fontSize: "12px" }}>present</Text>
              </span>
              <span
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    background: "#ff7875",
                    borderRadius: "2px",
                  }}
                ></div>
                <Text style={{ fontSize: "12px" }}>absent</Text>
              </span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyAttendance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" style={{ fontSize: "12px" }} />
                <YAxis style={{ fontSize: "12px" }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="#00D4B1"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="absent"
                  stroke="#ff7875"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* {(userData.userRole === "admin" ||
          userData.userRole === "employee") && (
          <Col xs={24} lg={12}>
            <Card title="Upcoming Shifts" style={{ borderRadius: "12px" }}>
              {upcomingShifts.length > 0 ? (
                <div style={{ maxHeight: "240px", overflowY: "auto" }}>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    {upcomingShifts.map((shift) => (
                      <div
                        key={shift.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px",
                          background: "#fafafa",
                          borderRadius: "8px",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <Text strong>
                            {shift.employeeName} - {shift.type}
                          </Text>
                          <Text
                            type="secondary"
                            style={{ display: "block", fontSize: "12px" }}
                          >
                            {shift.time} -{" "}
                            {shift.approved ? "Approved" : "Pending"}
                          </Text>
                        </div>
                        <Popconfirm
                          title="Delete Leave"
                          description="Are you sure you want to delete this leave permanently?"
                          onConfirm={() => handleDeleteLeave(shift.id)}
                          okText="Yes"
                          cancelText="No"
                          okButtonProps={{ danger: true }}
                        >
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                            loading={loading}
                          >
                            Delete
                          </Button>
                        </Popconfirm>
                      </div>
                    ))}
                  </Space>
                </div>
              ) : (
                <Text type="secondary">
                  No approved leave requests at this time
                </Text>
              )}
            </Card>
          </Col>
        )} */}
        {userData.userRole === "employee" && (
          <Col xs={24} lg={12}>
            <Card title="Upcoming Shifts" style={{ borderRadius: "12px" }}>
              {upcomingShifts.length > 0 ? (
                <div style={{ maxHeight: "240px", overflowY: "auto" }}>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    {upcomingShifts.map((shift) => (
                      <div
                        key={shift.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px",
                          background: "#fafafa",
                          borderRadius: "8px",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <Text strong>
                            {shift.employeeName} - {shift.type}
                          </Text>
                          <Text
                            type="secondary"
                            style={{ display: "block", fontSize: "12px" }}
                          >
                            {shift.time} -{" "}
                            {shift.approved ? "Approved" : "Pending"}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </Space>
                </div>
              ) : (
                <Text type="secondary">No upcoming shifts</Text>
              )}
            </Card>
          </Col>
        )}

        {userData.userRole === "employee" && (
          <>
            <Col xs={24} lg={12}>
              <Card
                title="Recent Leave Requests"
                style={{ borderRadius: "12px", height: "380px" }}
              >
                {leaveChartData.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                    }}
                  >
                    <ResponsiveContainer width={140} height={140}>
                      <PieChart>
                        <Pie
                          data={leaveChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                          label={CustomLabel}
                          labelLine={false}
                        >
                          {leaveChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[entry.name as keyof typeof COLORS]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ flex: 1 }}>
                      {leaveChartData.map((entry, index) => {
                        const totalDays = recentLeaves
                          .filter((leave) => leave.status === entry.name)
                          .reduce((sum, leave) => sum + leave.totalDays, 0);

                        return (
                          <div key={index} style={{ marginBottom: "12px" }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "4px",
                              }}
                            >
                              <div
                                style={{
                                  width: "12px",
                                  height: "12px",
                                  background:
                                    COLORS[entry.name as keyof typeof COLORS],
                                  borderRadius: "2px",
                                }}
                              ></div>
                              <Text strong style={{ fontSize: "14px" }}>
                                {totalDays} day{totalDays !== 1 ? "s" : ""} -{" "}
                                {entry.name}
                              </Text>
                            </div>
                            <Text
                              type="secondary"
                              style={{ fontSize: "12px", marginLeft: "20px" }}
                            >
                              {entry.percentage}%
                            </Text>
                          </div>
                        );
                      })}
                      <Text
                        type="secondary"
                        style={{
                          fontSize: "11px",
                          display: "block",
                          marginTop: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => setIsLeaveDetailsModalVisible(true)}
                      >
                        Click to view all leave requests
                      </Text>
                    </div>
                  </div>
                ) : (
                  <Text type="secondary">No leave requests yet</Text>
                )}
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <span>My Attendance Snapshot</span>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Select
                        value={attendanceView}
                        onChange={(value) => {
                          setAttendanceView(value);
                          if (value === "week") setSelectedDays(7);
                          else if (value === "month") setSelectedDays(30);
                        }}
                        style={{ width: 100 }}
                        size="small"
                      >
                        <Option value="week">Week</Option>
                        <Option value="month">Month</Option>
                        <Option value="custom">Custom</Option>
                      </Select>
                      {attendanceView === "custom" && (
                        <Select
                          value={selectedDays}
                          onChange={(value) => setSelectedDays(value)}
                          style={{ width: 90 }}
                          size="small"
                          placeholder="Days"
                        >
                          <Option value={2}>2 Days</Option>
                          <Option value={3}>3 Days</Option>
                          <Option value={5}>5 Days</Option>
                          <Option value={10}>10 Days</Option>
                          <Option value={15}>15 Days</Option>
                          <Option value={20}>20 Days</Option>
                        </Select>
                      )}
                    </div>
                  </div>
                }
                style={{ borderRadius: "12px" }}
                bodyStyle={{ padding: "16px" }}
              >
                <Row gutter={[16, 16]} align="middle">
                  <Col xs={24} md={16} lg={14}>
                    <div style={{ width: "100%", height: "220px" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={myAttendance}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            dataKey="day"
                            style={{
                              fontSize:
                                attendanceView === "month" ? "9px" : "11px",
                            }}
                            interval={attendanceView === "month" ? 2 : 0}
                          />
                          <YAxis
                            domain={[0, 10]}
                            ticks={[0, 2, 4, 6, 8, 10]}
                            style={{ fontSize: "11px" }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Line
                            type="monotone"
                            dataKey="actualHours"
                            stroke="#00D4B1"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            name="Actual Hours"
                          />
                          <Line
                            type="monotone"
                            dataKey="targetHours"
                            stroke="#FF4D4F"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            name="Target Hours"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Col>
                  <Col xs={24} md={8} lg={10}>
                    <div style={{ textAlign: "center", borderRadius: "8px" }}>
                      <Text strong style={{ fontSize: "16px" }}>
                        Tomorrow
                      </Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: "14px" }}>
                        {getShiftDisplay()}
                      </Text>
                    </div>
                  </Col>
                </Row>
                <div
                  style={{
                    marginTop: "20px",
                    padding: "16px",
                    background: "#f5f5f5",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <Text strong style={{ fontSize: "15px", color: "#333" }}>
                    Last Check-in:
                  </Text>
                  <Text type="secondary" style={{ fontSize: "14px" }}>
                    {checkInTime
                      ? `Today, ${new Date(checkInTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}`
                      : "Not checked in yet"}
                  </Text>
                </div>
              </Card>
            </Col>
          </>
        )}

        {/* {userData.userRole === "employee" && (
          <Col xs={24} lg={12}>
            <Card title="Upcoming Shifts" style={{ borderRadius: "12px" }}>
              {upcomingShifts.length > 0 ? (
                <div style={{ maxHeight: "240px", overflowY: "auto" }}>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    {upcomingShifts.map((shift) => (
                      <div
                        key={shift.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px",
                          background: "#fafafa",
                          borderRadius: "8px",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <Text strong>
                            {shift.employeeName} - {shift.type}
                          </Text>
                          <Text
                            type="secondary"
                            style={{ display: "block", fontSize: "12px" }}
                          >
                            {shift.time} -{" "}
                            {shift.approved ? "Approved" : "Pending"}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </Space>
                </div>
              ) : (
                <Text type="secondary">No upcoming shifts</Text>
              )}
            </Card>
          </Col>
        )} */}

        {userData.userRole === "employee" && (
          <Col xs={24}>
            <Card
              title="Important Announcements"
              style={{ borderRadius: "12px" }}
            >
              {announcements.length === 0 ? (
                <>
                  <Text strong>No announcements at this time</Text>
                  <Text
                    type="secondary"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    Check back later for updates
                  </Text>
                </>
              ) : (
                announcements.slice(0, 3).map((announcement) => (
                  <div
                    key={announcement._id}
                    style={{
                      marginBottom: "12px",
                      paddingBottom: "12px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <Text strong style={{ color: "#0066FF", display: "block" }}>
                      {announcement.title}
                    </Text>
                    <Text
                      type="secondary"
                      style={{
                        display: "block",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {announcement.message}
                    </Text>
                    <Text
                      type="secondary"
                      style={{
                        display: "block",
                        fontSize: "11px",
                        marginTop: "4px",
                        color: "#8c8c8c",
                      }}
                    >
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                ))
              )}
            </Card>
          </Col>
        )}
      </Row>

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
        confirmLoading={loading}
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
              onChange={(dates) => setLeaveDates(dates)}
            />
          </div>
          <div>
            <Text strong>Leave Type</Text>
            <Select
              placeholder="Select leave type"
              style={{ width: "100%", marginTop: "8px" }}
              value={leaveType}
              onChange={(value) => setLeaveType(value)}
            >
              <Option value="annual">Annual Leave</Option>
              <Option value="sick">Sick Leave</Option>
              <Option value="casual">Casual Leave</Option>
              <Option value="emergency">Emergency Leave</Option>
            </Select>
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

      <Modal
        title="My Leave Requests"
        open={isLeaveDetailsModalVisible}
        onCancel={() => setIsLeaveDetailsModalVisible(false)}
        footer={[
          <Button
            key="close"
            onClick={() => setIsLeaveDetailsModalVisible(false)}
          >
            Close
          </Button>,
        ]}
        width={900}
      >
        <Table
          columns={employeeLeaveColumns}
          dataSource={recentLeaves}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 700 }}
        />
      </Modal>
    </div>
  );
}
