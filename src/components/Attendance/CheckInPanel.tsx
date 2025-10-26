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
  message,
  Tag,
  Select,
  DatePicker,
} from "antd";
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import type { Dayjs } from "dayjs";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface UserData {
  name: string;
  userRole: string;
  specificRole: string;
  shift?: string;
  customShift?: string;
  weeklyHours?: number;
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

interface LeaveRecord {
  id: number;
  days: number;
  status: string;
  percentage: number;
}

const QuickStatsCards: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "User",
    userRole: "employee",
    specificRole: "Employee",
  });

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [weeklyHours, setWeeklyHours] = useState("0h 0m 0s");
  const [currentShift, setCurrentShift] = useState("Not Set");
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [allEmployees, setAllEmployees] = useState<any[]>([]);
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
  const [recentLeaves, setRecentLeaves] = useState<LeaveRecord[]>([]);

  useEffect(() => {
    loadData();
    checkAndMarkAbsent();

    // Update current time every second
    const timer = setInterval(() => {
      updateWorkingHours();
    }, 1000);

    // Check for absent marking at midnight
    const midnightCheck = setInterval(() => {
      checkAndMarkAbsent();
    }, 60000); // Check every minute

    return () => {
      clearInterval(timer);
      clearInterval(midnightCheck);
    };
  }, []);

  // Update working hours in real-time while checked in
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

  const getTodayDateString = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US");
  };

  const checkAndMarkAbsent = () => {
    const loggedInUserStr = localStorage.getItem("loggedInUser");
    if (!loggedInUserStr) return;

    const currentUser = JSON.parse(loggedInUserStr);
    const todayDate = getTodayDateString();

    const records: AttendanceRecord[] = JSON.parse(
      localStorage.getItem("attendanceRecords") || "[]"
    );

    // Check if user has any record for today
    const hasTodayRecord = records.some(
      (record) => record.date === todayDate && record.name === currentUser.name
    );

    // If it's past midnight and no record exists, mark as absent for previous day
    const now = new Date();
    const currentHour = now.getHours();

    if (!hasTodayRecord && currentHour === 0) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayDate = yesterday.toLocaleDateString("en-US");

      const hasYesterdayRecord = records.some(
        (record) =>
          record.date === yesterdayDate && record.name === currentUser.name
      );

      if (!hasYesterdayRecord) {
        const absentRecord: AttendanceRecord = {
          id: Date.now(),
          name: currentUser.name,
          date: yesterdayDate,
          checkIn: "-",
          checkOut: "-",
          workingTime: "-",
          status: "absent",
        };
        records.push(absentRecord);
        localStorage.setItem("attendanceRecords", JSON.stringify(records));
      }
    }
  };

  const loadData = () => {
    // Load all registered employees
    const employeesData = JSON.parse(localStorage.getItem("employees") || "[]");
    setAllEmployees(employeesData);
    setTotalEmployees(employeesData.length);

    // Load logged in user
    const loggedInUserStr = localStorage.getItem("loggedInUser");
    let currentUser = null;

    if (loggedInUserStr) {
      currentUser = JSON.parse(loggedInUserStr);
      setUserData({
        name: currentUser.name || "User",
        userRole: currentUser.userRole || "employee",
        specificRole: currentUser.specificRole || "Employee",
        shift: currentUser.shift,
        customShift: currentUser.customShift,
        weeklyHours: currentUser.weeklyHours,
      });

      // Set registered shift
      let shiftDisplay = "Not Set";
      if (currentUser.shift) {
        const shiftMap: any = {
          morning: "Morning (6 AM - 2 PM)",
          afternoon: "Afternoon (2 PM - 10 PM)",
          evening: "Evening (10 PM - 6 AM)",
        };
        shiftDisplay =
          currentUser.customShift ||
          shiftMap[currentUser.shift] ||
          currentUser.shift;
      }
      setCurrentShift(shiftDisplay);
    }

    // Load today's check-in data
    const savedCheckIn = localStorage.getItem("checkInData");
    if (savedCheckIn) {
      const checkInData = JSON.parse(savedCheckIn);
      const checkInDate = new Date(checkInData.checkInTime);
      const today = new Date();
      if (checkInDate.toDateString() === today.toDateString()) {
        setIsCheckedIn(checkInData.isCheckedIn);
        setCheckInTime(checkInData.checkInTime);
        if (checkInData.checkOutTime) {
          setCheckOutTime(checkInData.checkOutTime);
        }
      }
    }

    // Load all attendance records
    const records: AttendanceRecord[] = JSON.parse(
      localStorage.getItem("attendanceRecords") || "[]"
    );
    setAttendanceRecords(records);

    // Check if user has marked attendance today
    if (currentUser) {
      const todayDate = getTodayDateString();
      const todayRecord = records.find(
        (record) =>
          record.date === todayDate &&
          record.name === currentUser.name &&
          record.status === "present"
      );
      setHasMarkedToday(!!todayRecord);
    }

    // Calculate weekly hours from all records
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    let totalSeconds = 0;

    if (currentUser) {
      records.forEach((record: AttendanceRecord) => {
        const recordDate = new Date(record.date);
        if (
          recordDate >= oneWeekAgo &&
          record.workingTime &&
          record.workingTime !== "-" &&
          record.name === currentUser.name &&
          record.status === "present"
        ) {
          const [hours, minutes, seconds] = record.workingTime
            .split(/[hms]/)
            .map((s: string) => parseInt(s.trim()) || 0);
          totalSeconds += hours * 3600 + minutes * 60 + seconds;
        }
      });
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Show registered weekly hours target with actual worked hours
    if (currentUser && currentUser.weeklyHours) {
      setWeeklyHours(
        `${hours}h ${minutes}m / ${currentUser.weeklyHours}h target`
      );
    } else {
      setWeeklyHours(`${hours}h ${minutes}m ${seconds}s`);
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

  const handleCheckIn = () => {
    // Check if user has already marked attendance today
    // if (hasMarkedToday) {
    //   message.warning("You have already marked attendance for today!");
    //   return;
    // }
    if (userData.userRole !== "employee") {
      message.error("Only employees can mark attendance!");
      return;
    }

    // Check if user has already marked attendance today
    if (hasMarkedToday) {
      message.warning("You have already marked attendance for today!");
      return;
    }

    const now = new Date();
    const todayDate = getTodayDateString();

    // Double check in localStorage
    const records: AttendanceRecord[] = JSON.parse(
      localStorage.getItem("attendanceRecords") || "[]"
    );

    const existingTodayRecord = records.find(
      (record) =>
        record.date === todayDate &&
        record.name === userData.name &&
        record.status === "present"
    );

    if (existingTodayRecord) {
      message.warning("You have already marked attendance for today!");
      setHasMarkedToday(true);
      return;
    }

    setIsCheckedIn(true);
    setCheckInTime(now.toISOString());
    setCheckOutTime(null);
    setWorkingHours("0h 0m 0s");

    const checkInData = {
      isCheckedIn: true,
      checkInTime: now.toISOString(),
      checkOutTime: null,
    };

    localStorage.setItem("checkInData", JSON.stringify(checkInData));

    // Create attendance record immediately as "present"
    const newRecord: AttendanceRecord = {
      id: Date.now(),
      name: userData.name,
      date: todayDate,
      checkIn: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      checkOut: "In Progress",
      workingTime: "0h 0m 0s",
      status: "present",
    };

    records.push(newRecord);
    localStorage.setItem("attendanceRecords", JSON.stringify(records));
    setAttendanceRecords(records);
    setHasMarkedToday(true);

    message.success("Checked in successfully! Attendance marked as Present.");
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now.toISOString());

    if (checkInTime) {
      const checkIn = new Date(checkInTime);
      const diff = now.getTime() - checkIn.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const workingTime = `${hours}h ${minutes}m ${seconds}s`;
      const todayDate = getTodayDateString();

      // Update existing attendance record
      const records: AttendanceRecord[] = JSON.parse(
        localStorage.getItem("attendanceRecords") || "[]"
      );

      const recordIndex = records.findIndex(
        (record) =>
          record.date === todayDate &&
          record.name === userData.name &&
          record.status === "present"
      );

      if (recordIndex !== -1) {
        records[recordIndex].checkOut = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        records[recordIndex].workingTime = workingTime;
        localStorage.setItem("attendanceRecords", JSON.stringify(records));
        setAttendanceRecords(records);
      }

      // Update weekly hours
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      let totalSeconds = 0;
      records.forEach((record: AttendanceRecord) => {
        const recordDate = new Date(record.date);
        if (
          recordDate >= oneWeekAgo &&
          record.workingTime &&
          record.workingTime !== "-" &&
          record.name === userData.name &&
          record.status === "present"
        ) {
          const [h, m, s] = record.workingTime
            .split(/[hms]/)
            .map((str: string) => parseInt(str.trim()) || 0);
          totalSeconds += h * 3600 + m * 60 + s;
        }
      });

      const weekHours = Math.floor(totalSeconds / 3600);
      const weekMinutes = Math.floor((totalSeconds % 3600) / 60);
      const weekSeconds = totalSeconds % 60;

      if (userData.weeklyHours) {
        setWeeklyHours(
          `${weekHours}h ${weekMinutes}m / ${userData.weeklyHours}h target`
        );
      } else {
        setWeeklyHours(`${weekHours}h ${weekMinutes}m ${weekSeconds}s`);
      }
    }

    const checkInData = {
      isCheckedIn: false,
      checkInTime: checkInTime,
      checkOutTime: now.toISOString(),
    };

    localStorage.setItem("checkInData", JSON.stringify(checkInData));
    setIsCheckedIn(false);
    message.success("Checked out successfully!");
  };

  const handleViewEmployees = () => {
    setIsEmployeesModalVisible(true);
  };

  const handleViewAttendance = () => {
    // Load fresh attendance records filtered by current user
    const records: AttendanceRecord[] = JSON.parse(
      localStorage.getItem("attendanceRecords") || "[]"
    );
    const userRecords = records.filter(
      (record) => record.name === userData.name
    );
    setAttendanceRecords(userRecords);
    setIsAttendanceModalVisible(true);
  };

  const exportToCSV = () => {
    const userRecords = attendanceRecords.filter(
      (record) => record.name === userData.name
    );

    if (userRecords.length === 0) {
      message.warning("No attendance records to export!");
      return;
    }

    const headers = [
      "Name",
      "Date",
      "Check In",
      "Check Out",
      "Working Hours",
      "Status",
    ];
    const csvContent = [
      headers.join(","),
      ...userRecords.map((record: AttendanceRecord) =>
        [
          record.name,
          record.date,
          record.checkIn,
          record.checkOut,
          record.workingTime,
          record.status.toUpperCase(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `attendance_${userData.name}_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Attendance exported successfully!");
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
    const newLeave = {
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

    const daysDiff =
      leaveDates && leaveDates[1]
        ? Math.ceil(
            (leaveDates[1].toDate().getTime() -
              leaveDates[0]!.toDate().getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1
        : 1;
    setRecentLeaves([
      ...recentLeaves,
      {
        id: newLeave.id,
        days: daysDiff,
        status: "Pending",
        percentage: 0,
      },
    ]);
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
      render: (shift: string) => {
        const shiftNames: any = {
          morning: "Morning (6 AM - 2 PM)",
          afternoon: "Afternoon (2 PM - 10 PM)",
          evening: "Evening (10 PM - 6 AM)",
        };
        return shiftNames[shift] || shift;
      },
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
      dataIndex: "name",
      key: "name",
      fixed: "left" as const,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",
    },
    {
      title: "Working Hours",
      dataIndex: "workingTime",
      key: "workingTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "present" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[24, 16]}>
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
                <br /> <br />
                <Button onClick={handleViewEmployees}>
                  View All Employees
                </Button>
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
                <UserOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderRadius: "12px", height: "100%" }}>
            <Title level={4} style={{ margin: "0 0 12px 0" }}>
              Welcome back,
              <br />
              {userData.name}!
            </Title>
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
          </Card>
        </Col>

        <Col xs={24} lg={8}>
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
                  <Button
                    type="primary"
                    icon={isCheckedIn ? <LogoutOutlined /> : <LoginOutlined />}
                    onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
                    disabled={!isCheckedIn && hasMarkedToday}
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
                )}

                {userData.userRole === "employee" && (
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
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#333")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
                  >
                    Request Leave
                  </Button>
                )}
              </Space>

              <Button
                block
                onClick={handleViewAttendance}
                style={{
                  width: "100%",
                  background: "transparent",

                  backgroundColor: "#D8EEFF",
                  borderRadius: "20px",

                  height: "45px",
                  fontSize: "15px",
                  border: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#333")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
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
          {userData.userRole !== "employee" && (
            <Text
              type="secondary"
              style={{
                textAlign: "center",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Attendance marking is only available for employees
            </Text>
          )}
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
          rowKey={(record) => record.email}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Modal>

      {/* Attendance Modal */}
      <Modal
        title={`Attendance Records - ${userData.name}`}
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
          dataSource={attendanceRecords.filter(
            (record) => record.name === userData.name
          )}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 700 }}
        />
      </Modal>
    </>
  );
};

export default QuickStatsCards;
