import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Table,
  Tag,
  message,
  Avatar,
  Space,
  Divider,
} from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LockOutlined,
  DownloadOutlined,
  FileTextOutlined,
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
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
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

declare global {
  interface Window {
    jspdf: {
      jsPDF: any;
    };
  }
}
interface Employee {
  name: string;
  email: string;
  profileImage?: string;
  specificRole: string;
  shift?: string;
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
  workingHours?: number;
}

interface LeaveRequest {
  id: number;
  name: string;
  dates: any;
  leaveType: string;
  reason: string;
  status: string;
  date: string;
  isCompanyWide?: boolean;
  holidayTitle?: string;
}
interface Activity {
  id: string;
  employee: string;
  action: string;
  time: string;
  type: "checkin" | "checkout" | "leave" | "admin";
}

const COLORS = {
  Approved: "#00D4B1",
  Pending: "#FFB020",
  Rejected: "#FF4D4F",
};

export default function AttendanceDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [jsPDFLib, setJsPDFLib] = useState<any>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>({});
  const [activitySearchText, setActivitySearchText] = useState("");
  const [isPDFLoading, setIsPDFLoading] = useState(false);

  const [statsData, setStatsData] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentees: 0,
  });

  const [weeklyAttendance, setWeeklyAttendance] = useState([
    { day: "Mon", present: 0, absent: 0 },
    { day: "Tue", present: 0, absent: 0 },
    { day: "Wed", present: 0, absent: 0 },
    { day: "Thu", present: 0, absent: 0 },
    { day: "Fri", present: 0, absent: 0 },
    { day: "Sat", present: 0, absent: 0 },
    { day: "Sun", present: 0, absent: 0 },
  ]);

  const [productivityData, setProductivityData] = useState<any[]>([]);
  const [workHoursSummary, setWorkHoursSummary] = useState({
    average: "0h 0m",
    total: 0,
  });
  const [leaveChartData, setLeaveChartData] = useState<any[]>([]);

  const [adminAccessModal, setAdminAccessModal] = useState(false);
  const [currentAction, setCurrentAction] = useState<
    "leave" | "approve" | "export" | null
  >(null);
  const [leaveModal, setLeaveModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  const [isUserCheckedIn, setIsUserCheckedIn] = useState(false);
  const [userCheckInTime, setUserCheckInTime] = useState<string | null>(null);
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [leaveMode, setLeaveMode] = useState<"individual" | "company">(
    "individual"
  );

  const [leaveForm] = Form.useForm();
  const [adminForm] = Form.useForm();

  useEffect(() => {
    // Load logged in user
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    setLoggedInUser(user);

    loadData();
    // Calculate pending leave count
    const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
    const pendingCount = leaves.filter(
      (l: LeaveRequest) => l.status === "Pending"
    ).length;
    setPendingLeaveCount(pendingCount);
    // Refresh activities every 30 seconds
    const activityInterval = setInterval(() => {
      const attRecords: AttendanceRecord[] = JSON.parse(
        localStorage.getItem("attendanceRecords") || "[]"
      );
      const leaves: LeaveRequest[] = JSON.parse(
        localStorage.getItem("leaveRequests") || "[]"
      );
      loadActivities(attRecords, leaves);
      // Update pending count
      const pendingCount = leaves.filter(
        (l: LeaveRequest) => l.status === "Pending"
      ).length;
      setPendingLeaveCount(pendingCount);
    }, 30000);

    return () => clearInterval(activityInterval);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.async = true;
    script.onload = () => {
      // ✅ Safely load jsPDF
      if (window.jspdf?.jsPDF) {
        setJsPDFLib(window.jspdf.jsPDF);
        setIsPDFLoading(false); // ✅ Set loading to false
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // ✅ CSV Download
  const handleDownloadCSV = () => {
    try {
      const today = new Date().toLocaleDateString("en-US");
      const presentToday = attendanceRecords.filter(
        (r) => r.date === today && r.status === "present"
      );

      if (presentToday.length === 0) {
        message.warning("No employees present today!");
        return;
      }

      const headers = [
        "Name",
        "Role",
        "Shift",
        "Check-In",
        "Check-Out",
        "Working Hours",
      ];

      const rows = presentToday.map((record) => {
        const emp = employees.find((e) => e.name === record.name);
        return [
          record.name,
          emp?.specificRole || "N/A",
          emp?.shift || "N/A",
          record.checkIn || "N/A",
          record.checkOut || "N/A",
          `${record.workingHours || 0} hrs`,
        ];
      });

      let csvContent = headers.join(",") + "\n";
      rows.forEach((row) => {
        csvContent += row.join(",") + "\n";
      });

      const blob = new Blob([csvContent], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "present_employees.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      message.success("CSV downloaded successfully!");
    } catch (error) {
      message.error("Failed to download CSV!");
    }
  };

  // ✅ PDF Download
  // ✅ PDF Download
  // ✅ PDF Download
  const handleDownloadPDF = () => {
    if (!jsPDFLib) {
      message.error("PDF library not loaded yet. Please wait a moment.");
      return;
    }

    try {
      const today = new Date().toLocaleDateString("en-US");
      const presentToday = attendanceRecords.filter(
        (r) => r.date === today && r.status === "present"
      );

      if (presentToday.length === 0) {
        message.warning("No employees present today!");
        return;
      }

      // ✅ FIX: jsPDFLib is already the constructor, just use 'new' with it
      const doc = new jsPDFLib();

      // Title Section
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("PRESENT EMPLOYEES REPORT", 105, 20, { align: "center" });

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 28, {
        align: "center",
      });
      doc.text(`Total Present: ${presentToday.length}`, 105, 34, {
        align: "center",
      });

      doc.setLineWidth(0.5);
      doc.line(15, 38, 195, 38);

      let yPos = 45;
      presentToday.forEach((record, index) => {
        const emp = employees.find((e) => e.name === record.name);
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }

        const checkInTime = record.checkIn
          ? new Date(record.checkIn).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A";

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(`Employee ${index + 1}`, 15, yPos);
        yPos += 6;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text(`Name: ${record.name}`, 20, yPos);
        yPos += 5;
        doc.text(`Role: ${emp?.specificRole || "N/A"}`, 20, yPos);
        yPos += 5;
        doc.text(`Shift: ${emp?.shift || "N/A"}`, 20, yPos);
        yPos += 5;
        doc.text(`Check-In: ${checkInTime}`, 20, yPos);
        yPos += 5;
        doc.text(`Check-Out: ${record.checkOut || "In Progress"}`, 20, yPos);
        yPos += 5;
        doc.text(`Working Time: ${record.workingTime || "0h 0m"}`, 20, yPos);
        yPos += 8;

        doc.setDrawColor(200, 200, 200);
        doc.line(15, yPos, 195, yPos);
        yPos += 5;
      });

      doc.save("present_employees.pdf");
      message.success("PDF downloaded successfully!");
    } catch (error: any) {
      console.error("PDF Download Error:", error);
      message.error(
        "Failed to download PDF: " + (error?.message || "Unknown error")
      );
    }
  };

  const loadData = () => {
    const empData: Employee[] = JSON.parse(
      localStorage.getItem("employees") || "[]"
    );
    const attRecords: AttendanceRecord[] = JSON.parse(
      localStorage.getItem("attendanceRecords") || "[]"
    );
    const leaves: LeaveRequest[] = JSON.parse(
      localStorage.getItem("leaveRequests") || "[]"
    );

    setEmployees(empData);
    setAttendanceRecords(attRecords);
    setLeaveRequests(leaves);
    const pendingCount = leaves.filter(
      (l: LeaveRequest) => l.status === "Pending"
    ).length;
    setPendingLeaveCount(pendingCount);

    // Load current user's check-in status
    // Load current user's check-in status
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    if (loggedUser.name) {
      const savedCheckIn = localStorage.getItem("checkInData");
      if (savedCheckIn) {
        const checkInData = JSON.parse(savedCheckIn);
        const checkInDate = new Date(checkInData.checkInTime);
        const today = new Date();
        if (
          checkInDate.toDateString() === today.toDateString() &&
          checkInData.isCheckedIn
        ) {
          setIsUserCheckedIn(true);
          setUserCheckInTime(checkInData.checkInTime);
        }
      }
    }

    calculateStats(empData, attRecords);
    calculateWeeklyAttendance(attRecords);
    calculateProductivity(empData);
    calculateWorkHours(attRecords);
    loadActivities(attRecords, leaves);
    calculateLeaveStats(leaves);
  };

  const calculateStats = (
    empData: Employee[],
    attRecords: AttendanceRecord[]
  ) => {
    const today = new Date().toLocaleDateString("en-US");
    const todayRecords = attRecords.filter((r) => r.date === today);

    const present = todayRecords.filter((r) => r.status === "present").length;
    const absent = empData.length - present;

    setStatsData({
      totalEmployees: empData.length,
      presentToday: present,
      absentees: absent,
    });
  };

  const calculateWeeklyAttendance = (attRecords: AttendanceRecord[]) => {
    const weekData = [
      { day: "Mon", present: 0, absent: 0 },
      { day: "Tue", present: 0, absent: 0 },
      { day: "Wed", present: 0, absent: 0 },
      { day: "Thu", present: 0, absent: 0 },
      { day: "Fri", present: 0, absent: 0 },
      { day: "Sat", present: 0, absent: 0 },
      { day: "Sun", present: 0, absent: 0 },
    ];

    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString("en-US");
      const dayIndex = date.getDay();
      const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;

      const dayRecords = attRecords.filter((r) => r.date === dateStr);
      weekData[adjustedIndex].present = dayRecords.filter(
        (r) => r.status === "present"
      ).length;
      weekData[adjustedIndex].absent = dayRecords.filter(
        (r) => r.status === "absent"
      ).length;
    }

    setWeeklyAttendance(weekData);
  };

  const calculateProductivity = (empData: Employee[]) => {
    const departments: any = {};
    empData.forEach((emp) => {
      const dept = emp.specificRole || "Other";
      departments[dept] = (departments[dept] || 0) + 1;
    });

    const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"];
    const data = Object.entries(departments).map(([name, count], index) => ({
      name,
      value: count as number,
      color: colors[index % colors.length],
    }));

    setProductivityData(data);
  };

  const calculateWorkHours = (attRecords: AttendanceRecord[]) => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 7);

    const weekRecords = attRecords.filter((r) => {
      const recordDate = new Date(r.date);
      return (
        recordDate >= weekStart &&
        r.status === "present" &&
        r.workingTime !== "-"
      );
    });

    let totalMinutes = 0;
    weekRecords.forEach((r) => {
      const match = r.workingTime.match(/(\d+)h\s*(\d+)m/);
      if (match) {
        totalMinutes += parseInt(match[1]) * 60 + parseInt(match[2]);
      }
    });

    const avgMinutes =
      weekRecords.length > 0
        ? Math.round(totalMinutes / weekRecords.length)
        : 0;
    const hours = Math.floor(avgMinutes / 60);
    const minutes = avgMinutes % 60;

    setWorkHoursSummary({
      average: `${hours}h ${minutes}m`,
      total: weekRecords.length,
    });
  };

  const loadActivities = (
    attRecords: AttendanceRecord[],
    leaves: LeaveRequest[]
  ) => {
    const acts: any[] = [];

    // Get activities from last 24 hours
    const last24Hours = new Date();
    last24Hours.setHours(last24Hours.getHours() - 24);

    attRecords
      .filter((r) => {
        if (!r.checkIn || r.checkIn === "-") return false;
        const recordTime = new Date(r.checkIn);
        return r.status === "present" && recordTime >= last24Hours;
      })
      .forEach((r) => {
        // Add check-in activity
        acts.push({
          id: `att-in-${r.id}`,
          employee: r.name,
          action: "checked in",
          time: new Date(r.checkIn).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          timestamp: new Date(r.checkIn).getTime(),
          type: "checkin",
        });

        // Add check-out activity if exists
        if (r.checkOut && r.checkOut !== "" && r.checkOut !== "In Progress") {
          const checkOutTime = new Date(r.date + " " + r.checkOut);
          if (checkOutTime >= last24Hours) {
            acts.push({
              id: `att-out-${r.id}`,
              employee: r.name,
              action: "checked out",
              time: r.checkOut,
              timestamp: checkOutTime.getTime(),
              type: "checkout",
            });
          }
        }
      });

    leaves
      .filter((l) => {
        const leaveTime = new Date(l.date);
        return leaveTime >= last24Hours;
      })
      .forEach((l) => {
        acts.push({
          id: `leave-${l.id}`,
          employee: l.name,
          action: "submitted leave request",
          time: new Date(l.date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          timestamp: new Date(l.date).getTime(),
          type: "leave",
        });
      });

    // Load admin activities from localStorage
    const adminActivities = JSON.parse(
      localStorage.getItem("adminActivities") || "[]"
    );

    adminActivities
      .filter((a: any) => {
        const activityTime = new Date(a.time);
        return activityTime >= last24Hours;
      })
      .forEach((a: any) => {
        acts.push({
          id: a.id,
          employee: a.employee,
          action: a.action,
          time: new Date(a.time).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          timestamp: new Date(a.time).getTime(),
          type: a.type,
        });
      });

    // Sort by timestamp (most recent first)
    acts.sort((a, b) => b.timestamp - a.timestamp);

    setActivities(acts);
  };

  const calculateLeaveStats = (leaves: LeaveRequest[]) => {
    const statusCounts: any = { Approved: 0, Pending: 0, Rejected: 0 };
    leaves.forEach((l) => {
      if (l.status in statusCounts) statusCounts[l.status]++;
    });

    const data = Object.entries(statusCounts)
      // .filter(([_, count]) => count > 0)
      .map(([status, count]) => ({
        name: status,
        value: count as number,
      }));

    setLeaveChartData(data);
  };

  const handleDeleteLeaveRequest = (leaveId: number) => {
    const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
    const updated = leaves.filter((l: LeaveRequest) => l.id !== leaveId);
    localStorage.setItem("leaveRequests", JSON.stringify(updated));

    message.success("Leave request deleted successfully!");
    loadData();
  };
  const handleCheckIn = () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    if (!loggedUser.name) {
      message.error("Please login first!");
      return;
    }

    // Only employees can check in
    if (loggedUser.userRole !== "employee") {
      message.error("Only employees can mark attendance!");
      return;
    }
    const now = new Date();
    const today = now.toLocaleDateString("en-US");
    const existingRecords = JSON.parse(
      localStorage.getItem("attendanceRecords") || "[]"
    );

    const todayRecord = existingRecords.find(
      (r: AttendanceRecord) => r.name === loggedUser.name && r.date === today
    );

    if (todayRecord && todayRecord.status === "present") {
      message.warning("You have already checked in today!");
      return;
    }

    const newRecord: AttendanceRecord = {
      id: Date.now(),
      name: loggedUser.name,
      date: today,
      checkIn: now.toISOString(),
      checkOut: "",
      workingTime: "-",
      status: "present",
    };

    existingRecords.push(newRecord);
    localStorage.setItem("attendanceRecords", JSON.stringify(existingRecords));
    localStorage.setItem(
      "checkInData",
      JSON.stringify({
        checkInTime: now.toISOString(),
        isCheckedIn: true,
      })
    );

    setIsUserCheckedIn(true);
    setUserCheckInTime(now.toISOString());
    message.success("Checked in successfully!");
    loadData();
  };

  const handleCheckOut = () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    if (!loggedUser.name) {
      message.error("Please login first!");
      return;
    }

    if (loggedUser.userRole !== "employee") {
      message.error("Only employees can check out!");
      return;
    }

    const now = new Date();
    const todayDate = new Date().toLocaleDateString("en-US");

    if (userCheckInTime) {
      const checkIn = new Date(userCheckInTime);
      const diff = now.getTime() - checkIn.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const workingTime = `${hours}h ${minutes}m ${seconds}s`;

      // Update attendance record
      const records: AttendanceRecord[] = JSON.parse(
        localStorage.getItem("attendanceRecords") || "[]"
      );

      const recordIndex = records.findIndex(
        (record) =>
          record.date === todayDate &&
          record.name === loggedUser.name &&
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
      }

      // Update check-in data
      const checkInData = {
        isCheckedIn: false,
        checkInTime: userCheckInTime,
        checkOutTime: now.toISOString(),
      };
      localStorage.setItem("checkInData", JSON.stringify(checkInData));

      setIsUserCheckedIn(false);
      setUserCheckInTime(null);
      message.success("Checked out successfully!");
      loadData();
    }
  };

  const verifyAdmin = async (values: { password: string }) => {
    const adminData = JSON.parse(localStorage.getItem("adminData") || "{}");

    if (adminData.password === values.password) {
      message.success("Access granted!");
      setAdminAccessModal(false);
      adminForm.resetFields();

      if (currentAction === "leave") setLeaveModal(true);
      else if (currentAction === "approve") setApproveModal(true);
      else if (currentAction === "export") setExportModal(true);

      setCurrentAction(null);
    } else {
      message.error("Invalid credentials!");
    }
  };

  const handleLeaveSubmit = (values: any) => {
    const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");

    if (leaveMode === "company") {
      // Grant leave to all employees
      const companyLeaves = employees.map((emp) => ({
        id: Date.now() + Math.random(), // Unique ID for each
        name: emp.name,
        dates: values.dates,
        leaveType: values.leaveType,
        reason: values.reason,
        status: "Approved", // Auto-approve company-wide leaves
        date: new Date().toISOString(),
        isCompanyWide: true,
        holidayTitle: values.holidayTitle,
      }));

      leaves.push(...companyLeaves);
      localStorage.setItem("leaveRequests", JSON.stringify(leaves));

      // Log admin activity for company-wide leave
      const adminActivities = JSON.parse(
        localStorage.getItem("adminActivities") || "[]"
      );
      adminActivities.push({
        id: `admin-company-leave-${Date.now()}`,
        employee: "All Employees",
        action: `granted ${values.holidayTitle} (company-wide)`,
        time: new Date().toISOString(),
        type: "admin",
      });
      localStorage.setItem("adminActivities", JSON.stringify(adminActivities));

      message.success(`${values.holidayTitle} granted to all employees!`);
    } else {
      // Individual employee leave
      const newLeave: LeaveRequest = {
        id: Date.now(),
        name: values.employeeName,
        dates: values.dates,
        leaveType: values.leaveType,
        reason: values.reason,
        status: "Pending",
        date: new Date().toISOString(),
      };
      leaves.push(newLeave);
      localStorage.setItem("leaveRequests", JSON.stringify(leaves));

      // Log admin activity
      const adminActivities = JSON.parse(
        localStorage.getItem("adminActivities") || "[]"
      );
      adminActivities.push({
        id: `admin-grant-${newLeave.id}`,
        employee: values.employeeName,
        action: "granted leave by admin",
        time: new Date().toISOString(),
        type: "admin",
      });
      localStorage.setItem("adminActivities", JSON.stringify(adminActivities));

      message.success("Leave granted successfully!");
    }

    setLeaveModal(false);
    leaveForm.resetFields();
    setLeaveMode("individual");
    loadData();
  };

  const handleApproveReject = (leaveId: number, status: string) => {
    const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
    const targetLeave = leaves.find((l: LeaveRequest) => l.id === leaveId);

    const updated = leaves.map((l: LeaveRequest) =>
      l.id === leaveId ? { ...l, status } : l
    );
    localStorage.setItem("leaveRequests", JSON.stringify(updated));

    // Log admin activity
    if (targetLeave) {
      const adminActivities = JSON.parse(
        localStorage.getItem("adminActivities") || "[]"
      );
      adminActivities.push({
        id: `admin-${status}-${leaveId}-${Date.now()}`,
        employee: targetLeave.name,
        action: `leave ${status.toLowerCase()} by admin`,
        time: new Date().toISOString(),
        type: "admin",
      });
      localStorage.setItem("adminActivities", JSON.stringify(adminActivities));
    }

    message.success(`Leave ${status.toLowerCase()} successfully!`);
    loadData();
  };
  const handleDeleteActivity = (activityId: string) => {
    if (activityId.startsWith("admin-")) {
      // Delete admin activity
      const adminActivities = JSON.parse(
        localStorage.getItem("adminActivities") || "[]"
      );
      const updated = adminActivities.filter((a: any) => a.id !== activityId);
      localStorage.setItem("adminActivities", JSON.stringify(updated));
      message.success("Admin activity deleted successfully!");
    } else if (activityId.startsWith("att-")) {
      // Delete attendance record
      const records = JSON.parse(
        localStorage.getItem("attendanceRecords") || "[]"
      );
      const recordId = parseInt(activityId.split("-")[2]);
      const updated = records.filter(
        (r: AttendanceRecord) => r.id !== recordId
      );
      localStorage.setItem("attendanceRecords", JSON.stringify(updated));
      message.success("Attendance record deleted successfully!");
    } else if (activityId.startsWith("leave-")) {
      // Delete leave request
      const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
      const leaveId = parseInt(activityId.split("-")[1]);
      const updated = leaves.filter((l: LeaveRequest) => l.id !== leaveId);
      localStorage.setItem("leaveRequests", JSON.stringify(updated));
      message.success("Leave request deleted successfully!");
    } else {
      message.warning("Cannot delete this activity!");
    }

    loadData();
  };

  const generateCSV = () => {
    const data =
      selectedEmployee === "all"
        ? attendanceRecords
        : attendanceRecords.filter((r) => r.name === selectedEmployee);

    const headers = [
      "Name",
      "Date",
      "Check In",
      "Check Out",
      "Working Time",
      "Status",
    ];
    const rows = data.map((r) => [
      r.name,
      r.date,
      r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : "-",
      r.checkOut ? new Date(r.checkOut).toLocaleTimeString() : "-",
      r.workingTime,
      r.status,
    ]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `attendance_report_${selectedEmployee}.csv`;
    link.click();
    message.success("CSV downloaded!");
  };

  const generatePDF = () => {
    // Check if jsPDF is available
    if (typeof window.jspdf === "undefined") {
      message.error("PDF library not available. Using text format instead.");
      // Fallback to text
      const data =
        selectedEmployee === "all"
          ? attendanceRecords
          : attendanceRecords.filter((r) => r.name === selectedEmployee);

      let content = `ATTENDANCE REPORT\n===================\n\n`;
      content += `Employee: ${selectedEmployee === "all" ? "All Employees" : selectedEmployee}\n\n`;
      data.forEach((r) => {
        content += `Name: ${r.name}\nDate: ${r.date}\nCheck In: ${r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : "-"}\nCheck Out: ${r.checkOut || "-"}\nWorking Time: ${r.workingTime}\nStatus: ${r.status}\n\n`;
      });
      const blob = new Blob([content], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `attendance_report_${selectedEmployee}.txt`;
      link.click();
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const data =
      selectedEmployee === "all"
        ? attendanceRecords
        : attendanceRecords.filter((r) => r.name === selectedEmployee);

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("ATTENDANCE REPORT", 105, 20, { align: "center" });

    // Subtitle
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Employee: ${selectedEmployee === "all" ? "All Employees" : selectedEmployee}`,
      105,
      28,
      { align: "center" }
    );
    doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 34, {
      align: "center",
    });

    // Line
    doc.setLineWidth(0.5);
    doc.line(15, 38, 195, 38);

    let yPos = 45;

    data.forEach((r, index) => {
      // New page if needed
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`Record ${index + 1}`, 15, yPos);

      yPos += 6;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);

      doc.text(`Name: ${r.name}`, 20, yPos);
      yPos += 5;
      doc.text(`Date: ${r.date}`, 20, yPos);
      yPos += 5;
      doc.text(
        `Check In: ${r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : "-"}`,
        20,
        yPos
      );
      yPos += 5;
      doc.text(`Check Out: ${r.checkOut || "In Progress"}`, 20, yPos);
      yPos += 5;
      doc.text(`Working Time: ${r.workingTime}`, 20, yPos);
      yPos += 5;
      doc.text(`Status: ${r.status.toUpperCase()}`, 20, yPos);
      yPos += 8;

      // Separator
      doc.setDrawColor(200, 200, 200);
      doc.line(15, yPos, 195, yPos);
      yPos += 5;
    });

    // Footer
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Records: ${data.length}`, 105, yPos + 5, {
      align: "center",
    });

    doc.save(`attendance_report_${selectedEmployee}.pdf`);
    message.success("PDF downloaded successfully!");
  };

  const employeeColumns = [
    {
      title: "Employee",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: Employee) => (
        <Space>
          <Avatar src={record.profileImage} icon={<UserOutlined />} />
          <div>
            <Text strong>{name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.specificRole}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: Employee) => {
        const today = new Date().toLocaleDateString("en-US");
        const todayRecord = attendanceRecords.find(
          (r) => r.name === record.name && r.date === today
        );
        const isPresent = todayRecord?.status === "present";

        return (
          <Tag color={isPresent ? "green" : "red"}>
            {isPresent ? "Present" : "Absent"}
          </Tag>
        );
      },
    },
  ];

  const leaveColumns = [
    {
      title: "Employee",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
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
          const start = new Date(dates[0]).toLocaleDateString();
          const end = new Date(dates[1]).toLocaleDateString();
          const days =
            Math.ceil(
              (new Date(dates[1]).getTime() - new Date(dates[0]).getTime()) /
                (1000 * 60 * 60 * 24)
            ) + 1;
          return `${start} - ${end} (${days} days)`;
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
      render: (status: string) => (
        <Tag
          color={
            status === "Approved"
              ? "green"
              : status === "Pending"
                ? "orange"
                : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: LeaveRequest) => (
        <Space>
          {record.status === "Pending" && (
            <>
              <Button
                size="small"
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleApproveReject(record.id, "Approved")}
              >
                Approve
              </Button>
              <Button
                size="small"
                danger
                icon={<CloseOutlined />}
                onClick={() => handleApproveReject(record.id, "Rejected")}
              >
                Reject
              </Button>
            </>
          )}
          <Button
            size="small"
            danger
            icon={<CloseOutlined />}
            onClick={() => handleDeleteLeaveRequest(record.id)}
            style={{ marginLeft: record.status === "Pending" ? "8px" : "0" }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={loggedInUser.userRole === "admin" ? 8 : 6}>
          <Card
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Text
              style={{ color: "#6b7280", fontSize: "14px", fontWeight: 500 }}
            >
              Total Employees
            </Text>
            <Title level={2} style={{ margin: "8px 0", color: "#111827" }}>
              {statsData.totalEmployees}
            </Title>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <UserOutlined style={{ color: "#3b82f6", fontSize: "16px" }} />
              <Text style={{ color: "#6b7280", fontSize: "13px" }}>
                All departments
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={loggedInUser.userRole === "admin" ? 8 : 6}>
          <Card
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Text
              style={{ color: "#6b7280", fontSize: "14px", fontWeight: 500 }}
            >
              Present Today
            </Text>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Title level={2} style={{ margin: "8px 0", color: "#111827" }}>
                {statsData.presentToday}
              </Title>
              <CheckCircleOutlined
                style={{ color: "#10b981", fontSize: "24px" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <CheckCircleOutlined
                style={{ color: "#10b981", fontSize: "16px" }}
              />
              <Text style={{ color: "#6b7280", fontSize: "13px" }}>
                Check in
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={loggedInUser.userRole === "admin" ? 8 : 6}>
          <Card
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Text
              style={{ color: "#6b7280", fontSize: "14px", fontWeight: 500 }}
            >
              Absentees
            </Text>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Title level={2} style={{ margin: "8px 0", color: "#111827" }}>
                {statsData.absentees}
              </Title>
              <CloseCircleOutlined
                style={{ color: "#ef4444", fontSize: "24px" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <CloseCircleOutlined
                style={{ color: "#ef4444", fontSize: "16px" }}
              />
              <Text style={{ color: "#6b7280", fontSize: "13px" }}>
                Unreported
              </Text>
            </div>
          </Card>
        </Col>

        {loggedInUser.userRole === "employee" && (
          <Col xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              style={{
                borderRadius: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <Text
                style={{ color: "#6b7280", fontSize: "14px", fontWeight: 500 }}
              >
                {isUserCheckedIn ? "Quick Check-out" : "Quick Check-in"}
              </Text>
              <Text
                style={{
                  display: "block",
                  color: "#9ca3af",
                  fontSize: "12px",
                  margin: "8px 0 12px 0",
                }}
              >
                {isUserCheckedIn ? "End your session" : "Start your session"}
              </Text>
              <Button
                type="primary"
                size="large"
                onClick={isUserCheckedIn ? handleCheckOut : handleCheckIn}
                style={{
                  width: "100%",
                  backgroundColor: isUserCheckedIn ? "#ef4444" : "#10b981",
                  borderColor: isUserCheckedIn ? "#ef4444" : "#10b981",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
              >
                {isUserCheckedIn ? "Check out" : "Checked in"}
              </Button>
            </Card>
          </Col>
        )}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card
            title={
              <Text
                style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}
              >
                Attendance Trends
              </Text>
            }
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              marginBottom: "16px",
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyAttendance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="day"
                  stroke="#6b7280"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="absent"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: "#ef4444", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Productivity Breakdown and Work Hours Summary Row */}
          <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
            <Col xs={24} md={loggedInUser.userRole === "admin" ? 12 : 24}>
              <Card
                title={
                  <Text
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                    }}
                  >
                    Productivity Breakdown
                  </Text>
                }
                bordered={false}
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  backgroundColor: "#ffffff",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  {/* Labels positioned around the pie chart - Top Labels */}
                  {productivityData.slice(0, 2).map((item, index) => {
                    const totalValue = productivityData.reduce(
                      (sum, d) => sum + d.value,
                      0
                    );
                    const percentage = Math.round(
                      (item.value / totalValue) * 100
                    );

                    return (
                      <div
                        key={index}
                        style={{
                          position: "absolute",
                          left: index === 0 ? "5%" : "auto",
                          right: index === 1 ? "5%" : "auto",
                          top: index === 0 ? "10px" : "10px",
                          fontSize: "12px",
                          color: "#64748b",
                          fontWeight: 500,
                          lineHeight: "1.5",
                          zIndex: 10,
                        }}
                      >
                        <div style={{ whiteSpace: "nowrap" }}>
                          {item.name} ({item.value})
                        </div>
                        <div>({percentage}%)</div>
                      </div>
                    );
                  })}

                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={productivityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={75}
                        paddingAngle={0}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {productivityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0];
                            const totalValue = productivityData.reduce(
                              (sum, d) => sum + d.value,
                              0
                            );
                            const percentage = Math.round(
                              (data.value / totalValue) * 100
                            );

                            return (
                              <div
                                style={{
                                  backgroundColor: "#fff",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: "8px",
                                  padding: "12px",
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                }}
                              >
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: 600,
                                    color: "#111827",
                                    marginBottom: "4px",
                                  }}
                                >
                                  {data.name}
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    color: "#6b7280",
                                    fontSize: "14px",
                                  }}
                                >
                                  Employees:{" "}
                                  <span
                                    style={{
                                      fontWeight: 600,
                                      color: "#111827",
                                    }}
                                  >
                                    {data.value}
                                  </span>
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    color: "#6b7280",
                                    fontSize: "14px",
                                    marginTop: "2px",
                                  }}
                                >
                                  Percentage:{" "}
                                  <span
                                    style={{
                                      fontWeight: 600,
                                      color: "#111827",
                                    }}
                                  >
                                    {percentage}%
                                  </span>
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>

            {loggedInUser.userRole === "admin" && (
              <Col xs={24} md={12}>
                <Card
                  title={
                    <Text
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      Work Hours Summary
                    </Text>
                  }
                  bordered={false}
                  style={{
                    borderRadius: "16px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "240px",
                    }}
                  >
                    <Title level={1} style={{ margin: "0", color: "#111827" }}>
                      {workHoursSummary.average}
                    </Title>
                    <Text
                      style={{
                        fontSize: "13px",
                        color: "#9ca3af",
                        marginTop: "12px",
                        textAlign: "center",
                      }}
                    >
                      Weekly average for all employees
                    </Text>
                  </div>
                </Card>
              </Col>
            )}
          </Row>

          {/* Work Hours Summary for Employee - New Row */}
          {loggedInUser.userRole === "employee" && (
            <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
              <Col xs={24}>
                <Card
                  title={
                    <Text
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      Work Hours Summary
                    </Text>
                  }
                  bordered={false}
                  style={{
                    borderRadius: "16px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "240px",
                    }}
                  >
                    <Title level={1} style={{ margin: "0", color: "#111827" }}>
                      {workHoursSummary.average}
                    </Title>
                    <Text
                      style={{
                        fontSize: "13px",
                        color: "#9ca3af",
                        marginTop: "12px",
                        textAlign: "center",
                      }}
                    >
                      Weekly average for all employees
                    </Text>
                  </div>
                </Card>
              </Col>
            </Row>
          )}

          {loggedInUser.userRole === "admin" && (
            <>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card
                    bordered={false}
                    style={{
                      borderRadius: "16px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#111827",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Reports
                    </Text>
                    <Text
                      style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        display: "block",
                        marginBottom: "16px",
                      }}
                    >
                      Downloaded Daily Attendance reports
                    </Text>
                    <Button
                      type="primary"
                      icon={<DownloadOutlined />}
                      onClick={handleDownloadCSV}
                      style={{
                        backgroundColor: "#10b981",
                        borderColor: "#10b981",
                      }}
                    >
                      CSV
                    </Button>

                    <Button
                      icon={<FileTextOutlined />}
                      style={{
                        backgroundColor: "#10b981",
                        borderColor: "#10b981",
                        color: "white",
                        marginLeft: 8,
                      }}
                      onClick={handleDownloadPDF}
                      loading={isPDFLoading} // ✅ Show loading state
                      disabled={isPDFLoading} // ✅ Disable while loading
                    >
                      PDF
                    </Button>
                  </Card>
                </Col>

                <Col xs={24} md={12}>
                  <Card
                    bordered={false}
                    style={{
                      borderRadius: "16px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#111827",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Shifts
                    </Text>
                    <Text
                      style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        display: "block",
                        marginBottom: "16px",
                      }}
                    >
                      View shift schedules
                    </Text>
                    <Button
                      type="default"
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                        borderColor: "#d1d5db",
                        color: "#111827",
                        fontWeight: 500,
                      }}
                    >
                      View Shifts
                    </Button>
                  </Card>
                </Col>
              </Row>

              <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                <Col xs={24} md={24}>
                  <Card
                    bordered={false}
                    style={{
                      borderRadius: "16px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      paddingBottom: "2px", // ↓ reduces bottom height
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#111827",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Quick Actions
                    </Text>
                    <Text
                      style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        display: "block",
                        marginBottom: "16px",
                      }}
                    >
                      Admin operations
                    </Text>
                    <Space
                      direction="horizontal" // ← changed from vertical
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        type="primary"
                        onClick={() => {
                          setCurrentAction("leave");
                          setLeaveModal(true);
                        }}
                        style={{
                          flex: 1,
                          backgroundColor: "#10b981",
                          borderColor: "#10b981",
                          borderRadius: "8px",
                          fontWeight: 500,
                        }}
                      >
                        New Leave
                      </Button>
                      <Button
                        onClick={() => {
                          setCurrentAction("approve");
                          setApproveModal(true);
                          // Mark as viewed by admin when clicked
                          if (loggedInUser.userRole === "admin") {
                            setPendingLeaveCount(0);
                          }
                        }}
                        style={{
                          flex: 1,
                          borderRadius: "8px",
                          borderColor: "#d1d5db",
                          color: "#6b7280",
                          fontWeight: 500,
                          position: "relative", // ← Make sure this is here
                        }}
                      >
                        Approve
                        {pendingLeaveCount > 0 &&
                          loggedInUser.userRole === "admin" && (
                            <span
                              style={{
                                position: "absolute",
                                top: "-8px",
                                right: "-8px",
                                backgroundColor: "#ef4444",
                                color: "white",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                fontWeight: "bold",
                                border: "2px solid white",
                                zIndex: 10, // ← Add this to ensure it's on top
                              }}
                            >
                              {pendingLeaveCount}
                            </span>
                          )}
                      </Button>
                      <Button
                        onClick={() => {
                          setCurrentAction("export");
                          setExportModal(true);
                        }}
                        style={{
                          flex: 1,
                          borderRadius: "8px",
                          borderColor: "#d1d5db",
                          color: "#6b7280",
                          fontWeight: 500,
                        }}
                      >
                        Export
                      </Button>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Col>

        <Col xs={24} lg={10}>
          <Card
            title={
              <Text
                style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}
              >
                Recent Activity
              </Text>
            }
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              marginBottom: "16px",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <div style={{ marginBottom: "16px" }}>
              {activities.slice(0, 3).map((activity) => (
                <div
                  key={activity.id}
                  style={{
                    padding: "16px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "12px",
                    marginBottom: "12px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: "16px",
                      top: "16px",
                      width: "8px",
                      height: "8px",
                      backgroundColor:
                        activity.type === "checkin"
                          ? "#10b981" // Green for check-in
                          : activity.type === "checkout"
                            ? "#ef4444" // Red for check-out
                            : activity.action.includes("approved")
                              ? "#10b981" // Green for approved
                              : activity.action.includes("rejected")
                                ? "#ef4444" // Red for rejected
                                : activity.action.includes("granted")
                                  ? "#f59e0b" // Orange for granted (pending)
                                  : activity.type === "leave"
                                    ? "#3b82f6" // Blue for leave submission
                                    : "#f59e0b", // Orange for other admin actions
                      borderRadius: "50%",
                    }}
                  />
                  <Text
                    style={{
                      display: "block",
                      color: "#111827",
                      fontSize: "14px",
                      fontWeight: 500,
                      marginBottom: "4px",
                    }}
                  >
                    {activity.employee} {activity.action}
                  </Text>
                  <Text
                    style={{
                      color: "#6b7280",
                      fontSize: "13px",
                      display: "block",
                    }}
                  >
                    {activity.time}
                  </Text>
                </div>
              ))}
            </div>
            <Button
              type="default"
              size="large"
              onClick={() => setShowAllActivities(true)}
              style={{
                width: "100%",
                borderRadius: "8px",
                borderColor: "#e5e7eb",
                fontWeight: 500,
              }}
            >
              View all
            </Button>
          </Card>

          <Card
            title={
              <Text
                style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}
              >
                All Employees
              </Text>
            }
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Table
              columns={employeeColumns}
              dataSource={employees}
              rowKey="email"
              pagination={{ pageSize: 5, showSizeChanger: false }}
              scroll={{ x: 400 }}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Admin Access Required"
        open={adminAccessModal}
        onCancel={() => {
          setAdminAccessModal(false);
          adminForm.resetFields();
        }}
        footer={null}
        centered
      >
        <Form form={adminForm} onFinish={verifyAdmin} layout="vertical">
          <Form.Item
            name="password"
            label="Admin Password"
            rules={[
              { required: true, message: "Please enter admin password!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter admin password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              block
              style={{
                background: "linear-gradient(135deg, #00D4B1, #0066FF)",
                color: "white",
                border: "none",
                fontWeight: 500,
              }}
            >
              Verify Access
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Grant Leave"
        open={leaveModal}
        onCancel={() => {
          setLeaveModal(false);
          leaveForm.resetFields();
          setLeaveMode("individual");
        }}
        footer={null}
        width={600}
      >
        <Form form={leaveForm} onFinish={handleLeaveSubmit} layout="vertical">
          {/* Leave Mode Selection */}
          <Form.Item label="Leave Type">
            <Select
              value={leaveMode}
              onChange={(value) => setLeaveMode(value)}
              style={{ width: "100%" }}
            >
              <Option value="individual">Individual Employee Leave</Option>
              <Option value="company">Company-Wide/Government Holiday</Option>
            </Select>
          </Form.Item>

          {/* Conditional Fields Based on Mode */}
          {leaveMode === "individual" ? (
            <Form.Item
              name="employeeName"
              label="Employee Name"
              rules={[{ required: true, message: "Please select employee!" }]}
            >
              <Select placeholder="Select employee">
                {employees.map((emp) => (
                  <Option key={emp.email} value={emp.name}>
                    {emp.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            <Form.Item
              name="holidayTitle"
              label="Holiday/Leave Title"
              rules={[
                { required: true, message: "Please enter holiday title!" },
              ]}
            >
              <Input placeholder="e.g., Independence Day, Eid Holiday" />
            </Form.Item>
          )}

          <Form.Item
            name="dates"
            label="Leave Duration"
            rules={[{ required: true, message: "Please select dates!" }]}
          >
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="leaveType"
            label="Leave Category"
            rules={[{ required: true, message: "Please select leave type!" }]}
          >
            <Select placeholder="Select leave type">
              <Option value="annual">Annual Leave</Option>
              <Option value="sick">Sick Leave</Option>
              <Option value="casual">Casual Leave</Option>
              <Option value="emergency">Emergency Leave</Option>
              {leaveMode === "company" && (
                <>
                  <Option value="government">Government Holiday</Option>
                  <Option value="company-event">Company Event</Option>
                  <Option value="religious">Religious Holiday</Option>
                </>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            name="reason"
            label="Description"
            rules={[{ required: true, message: "Please enter description!" }]}
          >
            <TextArea rows={4} placeholder="Enter reason for leave" />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              block
              style={{
                backgroundColor: "#10b981",
                borderColor: "#10b981",
                color: "white",
                border: "none",
                fontWeight: 500,
              }}
            >
              Grant Leave
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Approve Leave Requests"
        open={approveModal}
        onCancel={() => setApproveModal(false)}
        footer={null}
        width={1000}
        bodyStyle={{
          maxHeight: "600px",
          overflowY: "auto",
          paddingRight: "8px",
        }}
      >
        <Table
          columns={leaveColumns}
          dataSource={leaveRequests}
          rowKey="id"
          pagination={false}
          scroll={{ x: 900 }}
        />
      </Modal>

      <Modal
        title="Export Employee Data"
        open={exportModal}
        onCancel={() => setExportModal(false)}
        footer={null}
        width={800}
        bodyStyle={{
          maxHeight: "600px",
          overflowY: "auto",
          paddingRight: "8px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Text strong>All Registered Employees</Text>
          <Table
            columns={[
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
                title: "Role",
                dataIndex: "specificRole",
                key: "specificRole",
              },
              {
                title: "Shift",
                dataIndex: "shift",
                key: "shift",
                render: (shift: string) => {
                  const shiftMap: any = {
                    morning: "Morning (6 AM - 2 PM)",
                    afternoon: "Afternoon (2 PM - 10 PM)",
                    evening: "Evening (10 PM - 6 AM)",
                  };
                  return shiftMap[shift] || shift || "N/A";
                },
              },
              {
                title: "Weekly Hours",
                dataIndex: "weeklyHours",
                key: "weeklyHours",
                render: (hours: number) => `${hours || 0} hrs`,
              },
            ]}
            dataSource={employees}
            rowKey="email"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 700 }}
          />
        </div>
        <Space>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => {
              const headers = [
                "Name",
                "Email",
                "Role",
                "Shift",
                "Weekly Hours",
              ];
              const rows = employees.map((e) => [
                e.name,
                e.email,
                e.specificRole,
                e.shift || "N/A",
                `${e.weeklyHours || 0} hrs`,
              ]);
              let csvContent = headers.join(",") + "\n";
              rows.forEach((row) => {
                csvContent += row.join(",") + "\n";
              });
              const blob = new Blob([csvContent], { type: "text/csv" });
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = "employees_data.csv";
              link.click();
              message.success("Employee data exported!");
            }}
            style={{ backgroundColor: "#10b981", borderColor: "#10b981" }}
          >
            Download CSV
          </Button>
          <Button
            icon={<FileTextOutlined />}
            onClick={() => {
              if (typeof window.jspdf === "undefined") {
                message.error("PDF library not available");
                return;
              }

              const { jsPDF } = window.jspdf;
              const doc = new jsPDF();

              // Title
              doc.setFontSize(18);
              doc.setFont("helvetica", "bold");
              doc.text("EMPLOYEE DATA REPORT", 105, 20, { align: "center" });

              doc.setFontSize(11);
              doc.setFont("helvetica", "normal");
              doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 28, {
                align: "center",
              });
              doc.text(`Total Employees: ${employees.length}`, 105, 34, {
                align: "center",
              });

              doc.setLineWidth(0.5);
              doc.line(15, 38, 195, 38);

              let yPos = 45;

              employees.forEach((e, index) => {
                if (yPos > 270) {
                  doc.addPage();
                  yPos = 20;
                }

                doc.setFontSize(10);
                doc.setFont("helvetica", "bold");
                doc.text(`Employee ${index + 1}`, 15, yPos);

                yPos += 6;
                doc.setFont("helvetica", "normal");
                doc.setFontSize(9);

                doc.text(`Name: ${e.name}`, 20, yPos);
                yPos += 5;
                doc.text(`Email: ${e.email}`, 20, yPos);
                yPos += 5;
                doc.text(`Role: ${e.specificRole}`, 20, yPos);
                yPos += 5;
                doc.text(`Shift: ${e.shift || "N/A"}`, 20, yPos);
                yPos += 5;
                doc.text(`Weekly Hours: ${e.weeklyHours || 0} hrs`, 20, yPos);
                yPos += 8;

                doc.setDrawColor(200, 200, 200);
                doc.line(15, yPos, 195, yPos);
                yPos += 5;
              });

              doc.save(`employees_data.pdf`);
              message.success("PDF downloaded successfully!");
            }}
          >
            Download PDF
          </Button>
        </Space>
      </Modal>

      <Modal
        title="Generate Attendance Report"
        open={reportModal}
        onCancel={() => setReportModal(false)}
        footer={null}
        width={600}
      >
        <div style={{ marginBottom: "20px" }}>
          <Text strong>Select Employee</Text>
          <Select
            value={selectedEmployee}
            onChange={(value) => setSelectedEmployee(value)}
            style={{ width: "100%", marginTop: "8px" }}
          >
            <Option value="all">All Employees</Option>
            {employees.map((emp) => (
              <Option key={emp.email} value={emp.name}>
                {emp.name}
              </Option>
            ))}
          </Select>
        </div>
        <Space>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={generateCSV}
            style={{ backgroundColor: "#10b981", borderColor: "#10b981" }}
          >
            Download CSV
          </Button>
          <Button icon={<FileTextOutlined />} onClick={generatePDF}>
            Download PDF
          </Button>
        </Space>
      </Modal>

      <Modal
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: "16px", fontWeight: 600 }}>
              All Activities
            </Text>
            <Button
              type="text"
              danger
              // icon={<CloseOutlined />}
              onClick={() => {
                Modal.confirm({
                  title: "Delete All Activities",
                  content:
                    "Are you sure you want to delete all activities? This action cannot be undone.",
                  okText: "Clear",
                  okType: "danger",
                  cancelText: "Cancel",
                  onOk: () => {
                    // Get all activities
                    const adminActivities = JSON.parse(
                      localStorage.getItem("adminActivities") || "[]"
                    );

                    // Clear admin activities
                    localStorage.setItem("adminActivities", JSON.stringify([]));

                    message.success(
                      `Deleted ${adminActivities.length} admin activities!`
                    );
                    loadData();
                    setShowAllActivities(false);
                    setActivitySearchText("");
                  },
                });
              }}
              style={{ fontSize: "14px", fontWeight: 500 }}
            >
              Clear
            </Button>
          </div>
        }
        open={showAllActivities}
        onCancel={() => {
          setShowAllActivities(false);
          setActivitySearchText("");
        }}
        footer={null}
        width={700}
      >
        {/* Search Bar */}
        <div style={{ marginBottom: "16px" }}>
          <Input
            placeholder="Search activities by employee name or action..."
            value={activitySearchText}
            onChange={(e) => setActivitySearchText(e.target.value)}
            allowClear
            style={{
              borderRadius: "8px",
              padding: "8px 12px",
            }}
          />
        </div>

        {/* Activities List with Scroll */}
        <div
          style={{
            maxHeight: "500px",
            overflowY: "auto",
            paddingRight: "8px",
          }}
        >
          {activities
            .filter((activity) => {
              const searchLower = activitySearchText.toLowerCase();
              return (
                activity.employee.toLowerCase().includes(searchLower) ||
                activity.action.toLowerCase().includes(searchLower)
              );
            })
            .map((activity) => (
              <div
                key={activity.id}
                style={{
                  padding: "16px",
                  backgroundColor: "#f9fafb",
                  borderRadius: "12px",
                  marginBottom: "12px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "16px",
                    width: "8px",
                    height: "8px",
                    backgroundColor:
                      activity.type === "checkin"
                        ? "#10b981"
                        : activity.type === "checkout"
                          ? "#ef4444"
                          : activity.action.includes("approved")
                            ? "#10b981"
                            : activity.action.includes("rejected")
                              ? "#ef4444"
                              : activity.action.includes("granted")
                                ? "#f59e0b"
                                : activity.type === "leave"
                                  ? "#3b82f6"
                                  : "#f59e0b",
                    borderRadius: "50%",
                  }}
                />
                <Button
                  type="text"
                  danger
                  size="small"
                  icon={<CloseOutlined />}
                  onClick={() => handleDeleteActivity(activity.id)}
                  style={{
                    position: "absolute",
                    right: "36px",
                    top: "12px",
                  }}
                />
                <Text
                  style={{
                    display: "block",
                    color: "#111827",
                    fontSize: "14px",
                    fontWeight: 500,
                    marginBottom: "4px",
                    paddingRight: activity.type === "admin" ? "60px" : "24px",
                  }}
                >
                  {activity.employee} {activity.action}
                </Text>
                <Text
                  style={{
                    color: "#6b7280",
                    fontSize: "13px",
                    display: "block",
                  }}
                >
                  {activity.time}
                </Text>
              </div>
            ))}
          {activities.filter((activity) => {
            const searchLower = activitySearchText.toLowerCase();
            return (
              activity.employee.toLowerCase().includes(searchLower) ||
              activity.action.toLowerCase().includes(searchLower)
            );
          }).length === 0 && (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#9ca3af" }}
            >
              No activities found
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
