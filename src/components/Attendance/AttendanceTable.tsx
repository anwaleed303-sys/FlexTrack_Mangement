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

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface UserData {
  name: string;
  userRole: string;
  specificRole: string;
  shift?: string;
  customShift?: string;
}

interface AttendanceRecord {
  id: number;
  name: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workingTime: string;
  status: "present" | "absent";
}

interface LeaveRequest {
  id: number;
  name: string;
  dates: any;
  leaveType: string;
  reason: string;
  status: string;
  date: string;
}

const COLORS = {
  Approved: "#00D4B1",
  Pending: "#FFB020",
  Rejected: "#FF4D4F",
};

export default function Dashboard() {
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

  // Real-time attendance data
  const [weeklyAttendance, setWeeklyAttendance] = useState([
    { day: "Mon", present: 0, absent: 0 },
    { day: "Tue", present: 0, absent: 0 },
    { day: "Wed", present: 0, absent: 0 },
    { day: "Thu", present: 0, absent: 0 },
    { day: "Fri", present: 0, absent: 0 },
    { day: "Sat", present: 0, absent: 0 },
    { day: "Sun", present: 0, absent: 0 },
  ]);

  // My attendance data with actual and target hours
  const [myAttendance, setMyAttendance] = useState<any[]>([]);
  const [attendanceView, setAttendanceView] = useState<
    "week" | "month" | "custom"
  >("week");
  const [selectedDays, setSelectedDays] = useState<number>(7);

  const [recentLeaves, setRecentLeaves] = useState<LeaveRequest[]>([]);
  const [leaveChartData, setLeaveChartData] = useState<any[]>([]);

  const upcomingShifts = [
    { type: "Annual Leave", time: "09:00 - 17:AM", approved: true },
    { type: "Sick Leave", time: "3 days: 7 day", approved: true },
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (userData.name) {
      loadMyAttendance(userData.name);
    }
  }, [attendanceView, selectedDays, userData.name]);

  const loadData = () => {
    // Load logged in user
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

      // Load attendance data
      loadWeeklyAttendance();
      loadMyAttendance(currentUser.name);
      loadMyLeaveRequests(currentUser.name);
    }

    // Load today's check-in data
    const savedCheckIn = localStorage.getItem("checkInData");
    if (savedCheckIn) {
      const checkInData = JSON.parse(savedCheckIn);
      const checkInDate = new Date(checkInData.checkInTime);
      const today = new Date();
      if (checkInDate.toDateString() === today.toDateString()) {
        setCheckInTime(checkInData.checkInTime);
      }
    }
  };

  const loadWeeklyAttendance = () => {
    const records: AttendanceRecord[] = JSON.parse(
      localStorage.getItem("attendanceRecords") || "[]"
    );

    // Get dates for the current week (last 7 days)
    const today = new Date();
    const weekData = [
      { day: "Mon", present: 0, absent: 0 },
      { day: "Tue", present: 0, absent: 0 },
      { day: "Wed", present: 0, absent: 0 },
      { day: "Thu", present: 0, absent: 0 },
      { day: "Fri", present: 0, absent: 0 },
      { day: "Sat", present: 0, absent: 0 },
      { day: "Sun", present: 0, absent: 0 },
    ];

    // Calculate for last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString("en-US");
      const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.

      // Adjust index to match our array (Monday = 0)
      const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;

      const dayRecords = records.filter((record) => record.date === dateStr);

      const presentCount = dayRecords.filter(
        (record) => record.status === "present"
      ).length;
      const absentCount = dayRecords.filter(
        (record) => record.status === "absent"
      ).length;

      weekData[adjustedIndex].present += presentCount;
      weekData[adjustedIndex].absent += absentCount;
    }

    setWeeklyAttendance(weekData);
  };

  const loadMyAttendance = (userName: string) => {
    const records: AttendanceRecord[] = JSON.parse(
      localStorage.getItem("attendanceRecords") || "[]"
    );

    const today = new Date();
    const attendanceData = [];
    const targetHours = 8;

    let daysToShow = selectedDays;
    if (attendanceView === "week") {
      daysToShow = 7;
    } else if (attendanceView === "month") {
      daysToShow = 30;
    }

    // Load data for the selected number of days
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString("en-US");
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayLabel =
        attendanceView === "month" ? date.getDate().toString() : dayName;

      const userRecord = records.find(
        (record) =>
          record.name === userName &&
          record.date === dateStr &&
          record.status === "present"
      );

      let actualHours = 0;
      if (
        userRecord &&
        userRecord.workingTime &&
        userRecord.workingTime !== "-"
      ) {
        const match = userRecord.workingTime.match(/(\d+\.?\d*)h/);
        if (match) {
          actualHours = parseFloat(match[1]);
        }
      }

      attendanceData.push({
        day: dayLabel,
        actualHours: actualHours,
        targetHours: targetHours,
        date: date,
        fullDate: dateStr,
      });
    }

    setMyAttendance(attendanceData);
  };

  const loadMyLeaveRequests = (userName: string) => {
    const leaves: LeaveRequest[] = JSON.parse(
      localStorage.getItem("leaveRequests") || "[]"
    );

    const userLeaves = leaves.filter((leave) => leave.name === userName);
    setRecentLeaves(userLeaves);

    // Prepare chart data
    const statusCounts = {
      Approved: 0,
      Pending: 0,
      Rejected: 0,
    };

    userLeaves.forEach((leave) => {
      if (leave.status in statusCounts) {
        statusCounts[leave.status as keyof typeof statusCounts]++;
      }
    });

    // Calculate total days and percentages
    let totalDays = 0;
    userLeaves.forEach((leave) => {
      if (leave.dates && Array.isArray(leave.dates)) {
        const startDate = new Date(leave.dates[0]);
        const endDate = new Date(leave.dates[1]);
        const days =
          Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
          ) + 1;
        totalDays += days;
      }
    });

    const chartData = Object.entries(statusCounts)
      .filter(([_, count]) => count > 0)
      .map(([status, count]) => ({
        name: status,
        value: count,
        percentage:
          totalDays > 0 ? Math.round((count / userLeaves.length) * 100) : 0,
      }));

    setLeaveChartData(chartData);
  };

  const handleLeaveRequest = () => {
    setIsLeaveModalVisible(true);
  };

  const handleLeaveSubmit = () => {
    if (!leaveDates || !leaveType || !leaveReason) {
      message.error("Please fill all fields!");
      return;
    }

    const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
    const newLeave: LeaveRequest = {
      id: Date.now(),
      name: userData.name,
      dates: leaveDates,
      leaveType,
      reason: leaveReason,
      status: "Pending",
      date: new Date().toISOString(),
    };
    leaves.push(newLeave);
    localStorage.setItem("leaveRequests", JSON.stringify(leaves));

    message.success("Leave request submitted successfully!");
    setIsLeaveModalVisible(false);
    setLeaveDates(null);
    setLeaveType("");
    setLeaveReason("");

    // Reload leave requests and force refresh
    setTimeout(() => {
      loadMyLeaveRequests(userData.name);
      // Force component refresh
      window.location.reload();
    }, 500);
  };

  const getShiftDisplay = () => {
    if (userData.customShift) {
      return userData.customShift;
    }

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

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString("en-US", { weekday: "long" });
  };

  const leaveColumns = [
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
      dataIndex: "dates",
      key: "dates",
      render: (dates: any) => {
        if (dates && Array.isArray(dates)) {
          const startDate = new Date(dates[0]);
          const endDate = new Date(dates[1]);
          const days =
            Math.ceil(
              (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
            ) + 1;
          return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()} (${days} ${days === 1 ? "day" : "days"})`;
        }
        return "N/A";
      },
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
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

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

  return (
    <div style={{ padding: "20px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
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

        <Col xs={24} lg={12}>
          <Card title="Upcoming Shifts" style={{ borderRadius: "12px" }}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {upcomingShifts.map((shift, index) => (
                <div key={index}>
                  <Text strong>{shift.type}</Text>
                  <Text
                    type="secondary"
                    style={{ display: "block", fontSize: "12px" }}
                  >
                    {shift.time} - {shift.approved ? "Approved" : "Pending"}
                  </Text>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Recent Leave Requests" style={{ borderRadius: "12px" }}>
            {leaveChartData.length > 0 ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "24px" }}
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
                      .reduce((sum, leave) => {
                        if (leave.dates && Array.isArray(leave.dates)) {
                          const startDate = new Date(leave.dates[0]);
                          const endDate = new Date(leave.dates[1]);
                          return (
                            sum +
                            Math.ceil(
                              (endDate.getTime() - startDate.getTime()) /
                                (1000 * 60 * 60 * 24)
                            ) +
                            1
                          );
                        }
                        return sum;
                      }, 0);

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
            {/* Responsive layout using Ant Grid */}
            <Row gutter={[16, 16]} align="middle">
              {/* Chart Section */}
              <Col xs={24} md={16} lg={14}>
                <div style={{ width: "100%", height: "220px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={myAttendance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="day"
                        style={{
                          fontSize: attendanceView === "month" ? "9px" : "11px",
                        }}
                        interval={attendanceView === "month" ? 2 : 0}
                        axisLine={true}
                        tickLine={true}
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

              {/* Tomorrow Shift Section */}
              <Col xs={24} md={8} lg={10}>
                <div
                  style={{
                    textAlign: "center",
                    // padding: "12px",
                    // background: "#fafafa",
                    borderRadius: "8px",
                  }}
                >
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

            {/* Last Check-in Section */}
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
                  ? `Today, ${new Date(checkInTime).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}`
                  : "Not checked in yet"}
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24}>
          <Card
            title="Important Announcements"
            style={{ borderRadius: "12px" }}
          >
            <Text strong>Holiday Schedule Update:</Text>
            <Text
              type="secondary"
              style={{ display: "block", fontSize: "12px" }}
            >
              December 25th - 1st
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Submit Leave Request Modal */}
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
              popupStyle={{
                maxWidth: "calc(100vw - 32px)",
              }}
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

      {/* Leave Details Modal */}
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
          columns={leaveColumns}
          dataSource={recentLeaves}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 700 }}
        />
      </Modal>
    </div>
  );
}
