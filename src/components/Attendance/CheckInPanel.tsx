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
} from "antd";
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

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
  date: string;
  checkIn: string;
  checkOut: string;
  workingTime: string;
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

  useEffect(() => {
    loadData();

    // Update current time every second
    const timer = setInterval(() => {
      updateWorkingHours();
    }, 1000);
    return () => clearInterval(timer);
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

    // Calculate weekly hours from all records
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    let totalSeconds = 0;
    records.forEach((record: AttendanceRecord) => {
      const recordDate = new Date(record.date);
      if (recordDate >= oneWeekAgo && record.workingTime) {
        const [hours, minutes, seconds] = record.workingTime
          .split(/[hms]/)
          .map((s: string) => parseInt(s.trim()) || 0);
        totalSeconds += hours * 3600 + minutes * 60 + seconds;
      }
    });

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
    const now = new Date();
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
    message.success("Checked in successfully!");
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

      // Save attendance record
      const records: AttendanceRecord[] = JSON.parse(
        localStorage.getItem("attendanceRecords") || "[]"
      );
      const newRecord: AttendanceRecord = {
        id: Date.now(),
        date: new Date().toLocaleDateString("en-US"),
        checkIn: new Date(checkInTime).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        checkOut: now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        workingTime: workingTime,
      };
      records.push(newRecord);
      localStorage.setItem("attendanceRecords", JSON.stringify(records));
      setAttendanceRecords(records);

      // Update weekly hours
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      let totalSeconds = 0;
      records.forEach((record: AttendanceRecord) => {
        const recordDate = new Date(record.date);
        if (recordDate >= oneWeekAgo && record.workingTime) {
          const [h, m, s] = record.workingTime
            .split(/[hms]/)
            .map((str: string) => parseInt(str.trim()) || 0);
          totalSeconds += h * 3600 + m * 60 + s;
        }
      });

      const weekHours = Math.floor(totalSeconds / 3600);
      const weekMinutes = Math.floor((totalSeconds % 3600) / 60);
      const weekSeconds = totalSeconds % 60;
      const newWeeklyHours = `${weekHours}h ${weekMinutes}m ${weekSeconds}s`;
      setWeeklyHours(newWeeklyHours);
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
    setIsAttendanceModalVisible(true);
  };

  const exportToCSV = () => {
    if (attendanceRecords.length === 0) {
      message.warning("No attendance records to export!");
      return;
    }

    const headers = ["Date", "Check In", "Check Out", "Working Hours"];
    const csvContent = [
      headers.join(","),
      ...attendanceRecords.map((record: AttendanceRecord) =>
        [record.date, record.checkIn, record.checkOut, record.workingTime].join(
          ","
        )
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
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
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
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
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Space wrap>
                <Button
                  type="primary"
                  icon={isCheckedIn ? <LogoutOutlined /> : <LoginOutlined />}
                  onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
                  style={{
                    background: "linear-gradient(135deg, #00D4B1, #0066FF)",
                    border: "none",
                  }}
                >
                  {isCheckedIn ? "Check-Out" : "Check-In"}
                </Button>
              </Space>
              <Space wrap>
                <Button onClick={handleViewAttendance}>
                  View My Attendance
                </Button>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>

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
        title="My Attendance Records"
        open={isAttendanceModalVisible}
        onCancel={() => setIsAttendanceModalVisible(false)}
        footer={[
          <Button key="export" onClick={exportToCSV} type="primary">
            Export to CSV
          </Button>,
          <Button
            key="close"
            onClick={() => setIsAttendanceModalVisible(false)}
          >
            Close
          </Button>,
        ]}
        width={800}
      >
        <Table
          columns={attendanceColumns}
          dataSource={attendanceRecords}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 600 }}
        />
      </Modal>
    </>
  );
};

export default QuickStatsCards;
