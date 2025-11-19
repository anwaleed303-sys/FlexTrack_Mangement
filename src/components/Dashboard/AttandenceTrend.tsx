import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchAllEmployees,
  fetchAttendanceRecords,
  fetchAllLeaves,
  fetchDashboardStats,
  fetchWeeklyAttendance,
  fetchDepartmentBreakdown,
  fetchLeaveStatistics,
  fetchRecentActivities,
  calculateWorkHours,
  checkIn as reduxCheckIn,
  checkOut as reduxCheckOut,
  fetchCheckInStatus,
  createLeaveRequest,
  grantLeave,
  grantCompanyLeave,
  updateLeaveStatus,
  deleteLeaveRequest as reduxDeleteLeave,
  setLeaveBalance as reduxSetLeaveBalance,
  fetchLeaveBalance,
  resetDashboardState,
  deleteAttendanceRecord,
  fetchRecentNotifications,
  fetchAnnouncements,
} from "../../redux/slices/dashboardSlice"; // Adjust path to your slice
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
  App,
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
  employeeId: string;
  name: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workDuration?: string;
  // workingTime: string;
  status: "present" | "absent";
  workingHours?: number;
}
interface ProductivityData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number; // Add index signature
}
interface LeaveRequest {
  _id: string; // ✅ Changed from 'id' to '_id'
  employeeId?: {
    _id: string;
    name: string;
    email: string;
  };
  employeeName: string; // ✅ Add this
  leaveType: string;
  startDate: string; // ✅ Changed from 'dates: any'
  endDate: string; // ✅ Changed from 'dates: any'
  totalDays?: number; // ✅ Add this
  reason: string;
  status: "Pending" | "Approved" | "Rejected"; // ✅ Use union type
  date?: string; // ✅ Make optional
  isCompanyWide?: boolean;
  holidayTitle?: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectedBy?: string;
  rejectedDate?: string;
  rejectionReason?: string;
  adminNotes?: string;
  reviewedBy?: {
    _id: string;
    name: string;
    email: string;
  };
  reviewedAt?: string;
  createdAt?: string;
}
// interface LeaveRequest {
//   _id: string;
//   id: string;
//   name: string;
//   dates: any;
//   leaveType: string;
//   reason: string;
//   status: string;
//   date: string;
//   isCompanyWide?: boolean;
//   holidayTitle?: string;
//   approvedBy?: string;
//   approvedDate?: string;
//   rejectedBy?: string;
//   rejectedDate?: string;
//   rejectionReason?: string;
// }
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
  const { message } = App.useApp();
  const dispatch = useDispatch<AppDispatch>();

  // Redux Selectors
  const {
    employees,
    attendanceRecords,
    leaveRequests,
    statsData,
    weeklyAttendance,
    productivityData,
    leaveChartData,
    activities,
    workHoursSummary,
    checkInStatus,
    pendingLeaveCount,
    loading,
    leaveBalances,
    statsLoading,
    attendanceLoading,
    leaveLoading,
    error,
  } = useSelector((state: RootState) => state.dashboard);

  const [jsPDFLib, setJsPDFLib] = useState<any>(null);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>({});
  const [activitySearchText, setActivitySearchText] = useState("");
  const [isPDFLoading, setIsPDFLoading] = useState(false);
  const [leaveBalanceModal, setLeaveBalanceModal] = useState(false);
  const [viewShiftsModal, setViewShiftsModal] = useState(false);
  const [shiftSearchText, setShiftSearchText] = useState("");
  const [shiftCurrentPage, setShiftCurrentPage] = useState(1);
  const shiftPageSize = 3;
  const [selectedEmployeeForBalance, setSelectedEmployeeForBalance] =
    useState<string>("");
  const [leaveBalanceForm] = Form.useForm();

  const [adminAccessModal, setAdminAccessModal] = useState(false);
  const [currentAction, setCurrentAction] = useState<
    "leave" | "approve" | "export" | null
  >(null);
  const [leaveModal, setLeaveModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [reportModal, setReportModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  // Remove these lines - use Redux state instead
  const isUserCheckedIn = checkInStatus.isCheckedIn;
  const userCheckInTime = checkInStatus.checkInTime;
  const [csvLoading, setCsvLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [leaveMode, setLeaveMode] = useState<"individual" | "company">(
    "individual"
  );

  const [leaveForm] = Form.useForm();
  const [adminForm] = Form.useForm();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    setLoggedInUser(user);
    dispatch(resetDashboardState());

    loadData();

    // Refresh data every 30 seconds
    const interval = setInterval(() => {
      dispatch(fetchRecentActivities());
      dispatch(fetchDashboardStats());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);
  // useEffect(() => {
  //   // Load logged in user
  //   const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  //   setLoggedInUser(user);

  //   loadData();

  //   // Calculate pending leave count
  //   const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
  //   const pendingCount = leaves.filter(
  //     (l: LeaveRequest) => l.status === "Pending" && !l.isCompanyWide // 👈 ADD THIS
  //   ).length;
  //   setPendingLeaveCount(pendingCount);
  //   // Refresh activities every 30 seconds
  //   const activityInterval = setInterval(() => {
  //     const attRecords: AttendanceRecord[] = JSON.parse(
  //       localStorage.getItem("attendanceRecords") || "[]"
  //     );
  //     const leaves: LeaveRequest[] = JSON.parse(
  //       localStorage.getItem("leaveRequests") || "[]"
  //     );
  //     loadActivities(attRecords, leaves);
  //     // Update pending count
  //     const pendingCount = leaves.filter(
  //       (l: LeaveRequest) => l.status === "Pending" && !l.isCompanyWide // 👈 ADD THIS
  //     ).length;
  //     setPendingLeaveCount(pendingCount);
  //   }, 30000);

  //   return () => clearInterval(activityInterval);
  // }, []);

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
  // ✅ CSV Download - Update handleDownloadCSV function
  // const handleDownloadCSV = () => {
  //   try {
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0);

  //     const presentToday = attendanceRecords.filter((r) => {
  //       const recordDate = new Date(r.date);
  //       recordDate.setHours(0, 0, 0, 0);
  //       return (
  //         recordDate.getTime() === today.getTime() && r.status === "Present"
  //       );
  //     });

  //     if (presentToday.length === 0) {
  //       message.warning("No employees present today!");
  //       return;
  //     }

  //     const headers = [
  //       "Name",
  //       "Role",
  //       "Shift",
  //       "Check-In",
  //       "Check-Out",
  //       "Working Hours",
  //     ];

  //     const rows = presentToday.map((record) => {
  //       const emp = employees.find((e) => e.name === record.employeeId.name);
  //       return [
  //         record.employeeId.name,
  //         emp?.specificRole || "N/A",
  //         emp?.shift || "N/A",
  //         record.checkIn || "N/A",
  //         record.checkOut || "N/A",
  //         `${record.workingHours || 0} hrs`,
  //       ];
  //     });

  //     let csvContent = headers.join(",") + "\n";
  //     rows.forEach((row) => {
  //       csvContent += row.join(",") + "\n";
  //     });

  //     const blob = new Blob([csvContent], { type: "text/csv" });
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(blob);
  //     link.download = "present_employees.csv";
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);

  //     message.success("CSV downloaded successfully!");
  //   } catch (error) {
  //     message.error("Failed to download CSV!");
  //   }
  // };
  const handleDownloadCSV = () => {
    setCsvLoading(true);
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const presentToday = attendanceRecords.filter((r) => {
        const recordDate = new Date(r.date);
        recordDate.setHours(0, 0, 0, 0);
        return (
          recordDate.getTime() === today.getTime() && r.status === "Present"
        );
      });

      if (presentToday.length === 0) {
        message.warning("No employees present today!");
        setCsvLoading(false);
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
        const emp = employees.find((e) => e.name === record.employeeId.name);

        // ✅ Format check-in time
        const checkInTime = record.checkIn
          ? new Date(record.checkIn).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A";

        // ✅ Format check-out time
        const checkOutTime = record.checkOut
          ? new Date(record.checkOut).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "In Progress";

        // ✅ Get working duration - check multiple possible field names
        const workingDuration =
          (record as any).workDuration ||
          record.workingTime ||
          (record.workingHours
            ? `${record.workingHours.toFixed(2)} hrs`
            : null) ||
          (record.checkOut ? "Completed" : "In Progress");

        return [
          record.employeeId.name,
          emp?.specificRole || "N/A",
          emp?.shift || "N/A",
          checkInTime,
          checkOutTime,
          workingDuration,
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
      console.error("CSV Download Error:", error);
      message.error("Failed to download CSV!");
    } finally {
      setCsvLoading(false); // ✅ Stop loading
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
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const presentToday = attendanceRecords.filter((r) => {
        const recordDate = new Date(r.date);
        recordDate.setHours(0, 0, 0, 0);
        return (
          recordDate.getTime() === today.getTime() && r.status === "Present"
        );
      });

      if (presentToday.length === 0) {
        message.warning("No employees present today!");
        return;
      }

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
        const emp = employees.find((e) => e.name === record.employeeId.name);
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }

        // ✅ Format check-in time
        const checkInTime = record.checkIn
          ? new Date(record.checkIn).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A";

        // ✅ Format check-out time
        const checkOutTime = record.checkOut
          ? new Date(record.checkOut).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "In Progress";

        // ✅ Get working duration - check multiple possible field names
        const workingDuration =
          (record as any).workDuration ||
          record.workingTime ||
          (record.workingHours
            ? `${record.workingHours.toFixed(2)} hrs`
            : null) ||
          (record.checkOut ? "Completed" : "In Progress");

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(`Employee ${index + 1}`, 15, yPos);
        yPos += 6;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text(`Name: ${record.employeeId.name}`, 20, yPos);
        yPos += 5;
        doc.text(`Role: ${emp?.specificRole || "N/A"}`, 20, yPos);
        yPos += 5;
        doc.text(`Shift: ${emp?.shift || "N/A"}`, 20, yPos);
        yPos += 5;
        doc.text(`Check-In: ${checkInTime}`, 20, yPos);
        yPos += 5;
        doc.text(`Check-Out: ${checkOutTime}`, 20, yPos);
        yPos += 5;
        doc.text(`Working Time: ${workingDuration}`, 20, yPos); // ✅ Use workingDuration
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

  // const loadData = () => {
  //   const empData: Employee[] = JSON.parse(
  //     localStorage.getItem("employees") || "[]"
  //   );
  //   const attRecords: AttendanceRecord[] = JSON.parse(
  //     localStorage.getItem("attendanceRecords") || "[]"
  //   );
  //   const leaves: LeaveRequest[] = JSON.parse(
  //     localStorage.getItem("leaveRequests") || "[]"
  //   );

  //   setEmployees(empData);
  //   setAttendanceRecords(attRecords);
  //   setLeaveRequests(leaves);
  //   const pendingCount = leaves.filter(
  //     (l: LeaveRequest) => l.status === "Pending"
  //   ).length;
  //   setPendingLeaveCount(pendingCount);

  //   // Load current user's check-in status
  //   // Load current user's check-in status
  //   const loggedUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  //   if (loggedUser.name) {
  //     const savedCheckIn = localStorage.getItem("checkInData");
  //     if (savedCheckIn) {
  //       const checkInData = JSON.parse(savedCheckIn);
  //       const checkInDate = new Date(checkInData.checkInTime);
  //       const today = new Date();
  //       if (
  //         checkInDate.toDateString() === today.toDateString() &&
  //         checkInData.isCheckedIn
  //       ) {
  //         setIsUserCheckedIn(true);
  //         setUserCheckInTime(checkInData.checkInTime);
  //       }
  //     }
  //   }

  //   calculateStats(empData, attRecords);
  //   calculateWeeklyAttendance(attRecords);
  //   calculateProductivity(empData);
  //   calculateWorkHours(attRecords);
  //   loadActivities(attRecords, leaves);
  //   calculateLeaveStats(leaves);
  // };

  const loadData = async () => {
    try {
      await Promise.all([
        dispatch(fetchAllEmployees()),
        dispatch(fetchAttendanceRecords({})),
        dispatch(fetchAllLeaves()),
        dispatch(fetchDashboardStats()),
        dispatch(fetchWeeklyAttendance()),
        dispatch(fetchDepartmentBreakdown()),
        dispatch(fetchLeaveStatistics()),
        dispatch(fetchRecentActivities()),
        dispatch(calculateWorkHours()),
        dispatch(fetchCheckInStatus()),
        dispatch(fetchRecentNotifications()),
        dispatch(fetchAnnouncements()),
      ]);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      message.error("Failed to load dashboard data");
    }
  };
  // const loadData = async () => {
  //   try {
  //     await Promise.all([
  //       dispatch(fetchAllEmployees()),
  //       dispatch(fetchAttendanceRecords({})),
  //       dispatch(fetchAllLeaves()),
  //       dispatch(fetchDashboardStats()),
  //       dispatch(fetchWeeklyAttendance()),
  //       dispatch(fetchDepartmentBreakdown()),
  //       dispatch(fetchLeaveStatistics()),
  //       dispatch(fetchRecentActivities()),
  //       dispatch(calculateWorkHours()),
  //       dispatch(fetchCheckInStatus()),
  //     ]);
  //   } catch (error) {
  //     console.error("Failed to load dashboard data:", error);
  //     message.error("Failed to load dashboard data");
  //   }
  // };
  const sendNotificationToEmployee = (
    employeeName: string,
    type: "leave_status" | "company_announcement" | "company_leave",
    title: string,
    message: string,
    leaveId?: number,
    announcementId?: string // 👈 ADD THIS PARAMETER
  ) => {
    const employeeNotifications: any[] = JSON.parse(
      localStorage.getItem(`notifications_${employeeName}`) || "[]"
    );

    const newNotification = {
      id: `notif_${Date.now()}_${Math.random()}`,
      type,
      title,
      message,
      date: new Date().toISOString(),
      read: false,
      leaveId,
      announcementId, // 👈 ADD THIS
    };

    employeeNotifications.unshift(newNotification);
    localStorage.setItem(
      `notifications_${employeeName}`,
      JSON.stringify(employeeNotifications)
    );
  };

  const handleDeleteLeaveRequest = async (leaveId: string) => {
    try {
      await dispatch(reduxDeleteLeave(leaveId)).unwrap();
      message.success("Leave request deleted successfully!");
      await dispatch(fetchAllLeaves());
    } catch (error: any) {
      message.error(error || "Failed to delete leave request");
    }
  };
  // const handleDeleteLeaveRequest = (leaveId: number) => {
  //   const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
  //   const updated = leaves.filter((l: LeaveRequest) => l.id !== leaveId);
  //   localStorage.setItem("leaveRequests", JSON.stringify(updated));

  //   message.success("Leave request deleted successfully!");
  //   loadData();
  // };
  const handleCheckIn = async () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    if (!loggedUser.name) {
      message.error("Please login first!");
      return;
    }

    if (loggedUser.userRole !== "employee") {
      message.error("Only employees can mark attendance!");
      return;
    }

    try {
      await dispatch(reduxCheckIn()).unwrap();
      message.success("Checked in successfully!");
      await dispatch(fetchCheckInStatus());
      await dispatch(fetchAttendanceRecords({}));
      await dispatch(fetchRecentActivities());
    } catch (error: any) {
      message.error(error || "Failed to check in");
    }
  };
  // const handleCheckIn = () => {
  //   const loggedUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  //   if (!loggedUser.name) {
  //     message.error("Please login first!");
  //     return;
  //   }

  //   // Only employees can check in
  //   if (loggedUser.userRole !== "employee") {
  //     message.error("Only employees can mark attendance!");
  //     return;
  //   }
  //   const now = new Date();
  //   const today = now.toLocaleDateString("en-US");
  //   const existingRecords = JSON.parse(
  //     localStorage.getItem("attendanceRecords") || "[]"
  //   );

  //   const todayRecord = existingRecords.find(
  //     (r: AttendanceRecord) => r.name === loggedUser.name && r.date === today
  //   );

  //   if (todayRecord && todayRecord.status === "present") {
  //     message.warning("You have already checked in today!");
  //     return;
  //   }

  //   const newRecord: AttendanceRecord = {
  //     id: Date.now(),
  //     name: loggedUser.name,
  //     date: today,
  //     checkIn: now.toISOString(),
  //     checkOut: "",
  //     workingTime: "-",
  //     status: "present",
  //   };

  //   existingRecords.push(newRecord);
  //   localStorage.setItem("attendanceRecords", JSON.stringify(existingRecords));
  //   localStorage.setItem(
  //     "checkInData",
  //     JSON.stringify({
  //       checkInTime: now.toISOString(),
  //       isCheckedIn: true,
  //     })
  //   );

  //   setIsUserCheckedIn(true);
  //   setUserCheckInTime(now.toISOString());
  //   message.success("Checked in successfully!");
  //   loadData();
  // };

  const handleCheckOut = async () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    if (!loggedUser.name) {
      message.error("Please login first!");
      return;
    }

    if (loggedUser.userRole !== "employee") {
      message.error("Only employees can check out!");
      return;
    }

    try {
      await dispatch(reduxCheckOut()).unwrap();
      message.success("Checked out successfully!");
      await dispatch(fetchCheckInStatus());
      await dispatch(fetchAttendanceRecords({}));
      await dispatch(fetchRecentActivities());
    } catch (error: any) {
      message.error(error || "Failed to check out");
    }
  };
  // const handleCheckOut = () => {
  //   const loggedUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  //   if (!loggedUser.name) {
  //     message.error("Please login first!");
  //     return;
  //   }

  //   if (loggedUser.userRole !== "employee") {
  //     message.error("Only employees can check out!");
  //     return;
  //   }

  //   const now = new Date();
  //   const todayDate = new Date().toLocaleDateString("en-US");

  //   if (userCheckInTime) {
  //     const checkIn = new Date(userCheckInTime);
  //     const diff = now.getTime() - checkIn.getTime();
  //     const hours = Math.floor(diff / (1000 * 60 * 60));
  //     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  //     const workingTime = `${hours}h ${minutes}m ${seconds}s`;

  //     // Update attendance record
  //     const records: AttendanceRecord[] = JSON.parse(
  //       localStorage.getItem("attendanceRecords") || "[]"
  //     );

  //     const recordIndex = records.findIndex(
  //       (record) =>
  //         record.date === todayDate &&
  //         record.name === loggedUser.name &&
  //         record.status === "present"
  //     );

  //     if (recordIndex !== -1) {
  //       records[recordIndex].checkOut = now.toLocaleTimeString("en-US", {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //         hour12: true,
  //       });
  //       records[recordIndex].workingTime = workingTime;
  //       localStorage.setItem("attendanceRecords", JSON.stringify(records));
  //     }

  //     // Update check-in data
  //     const checkInData = {
  //       isCheckedIn: false,
  //       checkInTime: userCheckInTime,
  //       checkOutTime: now.toISOString(),
  //     };
  //     localStorage.setItem("checkInData", JSON.stringify(checkInData));

  //     setIsUserCheckedIn(false);
  //     setUserCheckInTime(null);
  //     message.success("Checked out successfully!");
  //     loadData();
  //   }
  // };

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

  // Calculate leave days
  const calculateLeaveDays = (dates: any) => {
    if (dates && Array.isArray(dates)) {
      const startDate = new Date(dates[0]);
      const endDate = new Date(dates[1]);
      return (
        Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1
      );
    }
    return 0;
  };

  // Update employee leave balance
  const updateEmployeeLeaveBalance = (employeeName: string, dates: any) => {
    const leaveDays = calculateLeaveDays(dates);
    const leaveBalances = JSON.parse(
      localStorage.getItem("employeeLeaveBalances") || "{}"
    );

    if (!leaveBalances[employeeName]) {
      leaveBalances[employeeName] = {
        totalLeaves: 20, // Default annual leave allowance
        usedLeaves: 0,
        remainingLeaves: 20,
      };
    }

    leaveBalances[employeeName].usedLeaves += leaveDays;
    leaveBalances[employeeName].remainingLeaves =
      leaveBalances[employeeName].totalLeaves -
      leaveBalances[employeeName].usedLeaves;

    localStorage.setItem(
      "employeeLeaveBalances",
      JSON.stringify(leaveBalances)
    );
  };

  // Check if employee has enough leave balance
  const checkLeaveBalance = (employeeName: string, requestedDays: number) => {
    const leaveBalances = JSON.parse(
      localStorage.getItem("employeeLeaveBalances") || "{}"
    );

    if (!leaveBalances[employeeName]) {
      return { hasBalance: true, remainingLeaves: 20 };
    }

    const remainingLeaves = leaveBalances[employeeName].remainingLeaves;
    return {
      hasBalance: remainingLeaves >= requestedDays,
      remainingLeaves: remainingLeaves,
    };
  };

  // Get employee current balance
  // Replace the getEmployeeBalance function with:
  const getEmployeeBalance = (employeeName: string) => {
    const balance = leaveBalances[employeeName];
    return (
      balance || {
        totalLeaves: 20,
        usedLeaves: 0,
        remainingLeaves: 20,
      }
    );
  };

  // Set custom leave balance for employee
  // const handleSetLeaveBalance = (values: any) => {
  //   const leaveBalances = JSON.parse(
  //     localStorage.getItem("employeeLeaveBalances") || "{}"
  //   );

  //   const employeeName = values.employeeName;
  //   const totalLeaves = parseInt(values.totalLeaves);

  //   // Get current used leaves if exists
  //   const currentUsed = leaveBalances[employeeName]?.usedLeaves || 0;

  //   leaveBalances[employeeName] = {
  //     totalLeaves: totalLeaves,
  //     usedLeaves: currentUsed,
  //     remainingLeaves: totalLeaves - currentUsed,
  //   };

  //   localStorage.setItem(
  //     "employeeLeaveBalances",
  //     JSON.stringify(leaveBalances)
  //   );

  //   // Send notification to employee
  //   sendNotificationToEmployee(
  //     employeeName,
  //     "company_announcement",
  //     "📋 Leave Balance Updated",
  //     `Your annual leave balance has been set to ${totalLeaves} days by admin.`,
  //     undefined
  //   );

  //   message.success(
  //     `Leave balance set for ${employeeName}: ${totalLeaves} days`
  //   );
  //   setLeaveBalanceModal(false);
  //   leaveBalanceForm.resetFields();
  //   setSelectedEmployeeForBalance("");
  // };

  const handleSetLeaveBalance = async (values: any) => {
    try {
      await dispatch(
        reduxSetLeaveBalance({
          employeeName: values.employeeName,
          totalLeaves: parseInt(values.totalLeaves),
        })
      ).unwrap();

      // ✅ Fetch the updated balance to show in UI
      await dispatch(fetchLeaveBalance(values.employeeName));

      message.success(
        `Leave balance set for ${values.employeeName}: ${values.totalLeaves} days`
      );
      setLeaveBalanceModal(false);
      leaveBalanceForm.resetFields();
      setSelectedEmployeeForBalance("");
    } catch (error: any) {
      message.error(error || "Failed to set leave balance");
    }
  };
  // Get employee shift information
  const getEmployeeShiftInfo = (employee: Employee) => {
    const today = new Date();
    const assignments = JSON.parse(
      localStorage.getItem("adminShiftAssignments") || "[]"
    );

    const currentAssignment = assignments.find((assignment: any) => {
      const startDate = new Date(assignment.startDate);
      const endDate = new Date(assignment.endDate);
      return (
        assignment.employeeEmail === employee.email &&
        today >= startDate &&
        today <= endDate
      );
    });

    return {
      currentShift: currentAssignment
        ? currentAssignment.shift
        : employee.shift || "N/A",
      assignedBy: currentAssignment ? currentAssignment.assignedBy : "Default",
      startDate: currentAssignment ? currentAssignment.startDate : "N/A",
      endDate: currentAssignment ? currentAssignment.endDate : "N/A",
    };
  };

  // Filter employees based on shift search
  const getFilteredShiftEmployees = () => {
    return employees.filter((emp) => {
      const searchLower = shiftSearchText.toLowerCase();
      const shiftInfo = getEmployeeShiftInfo(emp);
      return (
        emp.name.toLowerCase().includes(searchLower) ||
        emp.email.toLowerCase().includes(searchLower) ||
        emp.specificRole.toLowerCase().includes(searchLower) ||
        shiftInfo.currentShift.toLowerCase().includes(searchLower)
      );
    });
  };

  // Get paginated shift employees
  const getPaginatedShiftEmployees = () => {
    const filtered = getFilteredShiftEmployees();
    const startIndex = (shiftCurrentPage - 1) * shiftPageSize;
    const endIndex = startIndex + shiftPageSize;
    return filtered.slice(startIndex, endIndex);
  };

  // Format shift label
  const formatShiftLabel = (shift: string) => {
    const shiftMap: any = {
      morning: "Morning (6 AM - 2 PM)",
      afternoon: "Afternoon (2 PM - 10 PM)",
      evening: "Evening (10 PM - 6 AM)",
      closed: "Closed (No Shift)",
    };
    return shiftMap[shift] || shift;
  };
  // Get shift statistics
  const getShiftStatistics = () => {
    const stats = {
      morning: 0,
      afternoon: 0,
      evening: 0,
      closed: 0,
      total: employees.length,
    };

    employees.forEach((emp) => {
      const shiftInfo = getEmployeeShiftInfo(emp);
      const shift = shiftInfo.currentShift.toLowerCase();

      if (shift.includes("morning")) {
        stats.morning++;
      } else if (shift.includes("afternoon")) {
        stats.afternoon++;
      } else if (shift.includes("evening")) {
        stats.evening++;
      } else if (shift.includes("closed") || shift === "n/a") {
        stats.closed++;
      }
    });

    return stats;
  };

  const handleLeaveSubmit = async (values: any) => {
    try {
      if (leaveMode === "company") {
        await dispatch(
          grantCompanyLeave({
            holidayTitle: values.holidayTitle,
            leaveType: values.leaveType,
            startDate: values.dates[0].toISOString(),
            endDate: values.dates[1].toISOString(),
            reason: values.reason,
          })
        ).unwrap();
        message.success(`${values.holidayTitle} granted to all employees!`);
      } else {
        await dispatch(
          grantLeave({
            employeeName: values.employeeName,
            leaveType: values.leaveType,
            startDate: values.dates[0].toISOString(),
            endDate: values.dates[1].toISOString(),
            reason: values.reason,
          })
        ).unwrap();
        message.success("Leave granted successfully!");
      }

      setLeaveModal(false);
      leaveForm.resetFields();
      setLeaveMode("individual");

      await dispatch(fetchAllLeaves());
      await dispatch(fetchRecentActivities());
    } catch (error: any) {
      message.error(error || "Failed to grant leave");
    }
  };

  // const handleLeaveSubmit = (values: any) => {
  //   const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");

  //   if (leaveMode === "company") {
  //     const announcementId = `announce_${Date.now()}`;

  //     // Company-wide leave
  //     const companyLeaves = employees.map((emp) => ({
  //       id: Date.now() + Math.random(),
  //       name: emp.name,
  //       dates: values.dates,
  //       leaveType: values.leaveType,
  //       reason: values.reason,
  //       status: "Approved",
  //       date: new Date().toISOString(),
  //       isCompanyWide: true,
  //       holidayTitle: values.holidayTitle,
  //       approvedBy: "Admin",
  //       approvedDate: new Date().toISOString(),
  //     }));

  //     leaves.push(...companyLeaves);
  //     localStorage.setItem("leaveRequests", JSON.stringify(leaves));

  //     // Update employee leave balance
  //     companyLeaves.forEach((leave) => {
  //       updateEmployeeLeaveBalance(leave.name, leave.dates);
  //     });

  //     // Save announcement
  //     const announcements = JSON.parse(
  //       localStorage.getItem("companyAnnouncements") || "[]"
  //     );
  //     announcements.unshift({
  //       id: announcementId,
  //       title: values.holidayTitle,
  //       message: values.reason,
  //       date: new Date().toISOString(),
  //       type: "holiday",
  //     });
  //     localStorage.setItem(
  //       "companyAnnouncements",
  //       JSON.stringify(announcements)
  //     );

  //     // Send notification to ALL employees
  //     employees.forEach((emp) => {
  //       sendNotificationToEmployee(
  //         emp.name,
  //         "company_leave",
  //         `Company Holiday: ${values.holidayTitle}`,
  //         `You have been granted ${values.holidayTitle}. ${values.reason}`,
  //         companyLeaves[0].id,
  //         announcementId
  //       );
  //     });

  //     // Log admin activity
  //     const adminActivities = JSON.parse(
  //       localStorage.getItem("adminActivities") || "[]"
  //     );
  //     adminActivities.push({
  //       id: `admin-company-leave-${Date.now()}`,
  //       employee: "All Employees",
  //       action: `granted ${values.holidayTitle} (company-wide)`,
  //       time: new Date().toISOString(),
  //       type: "admin",
  //     });
  //     localStorage.setItem("adminActivities", JSON.stringify(adminActivities));

  //     message.success(`${values.holidayTitle} granted to all employees!`);
  //   } else {
  //     // Individual employee leave - Check balance first
  //     const requestedDays = calculateLeaveDays(values.dates);
  //     const balanceCheck = checkLeaveBalance(
  //       values.employeeName,
  //       requestedDays
  //     );

  //     if (!balanceCheck.hasBalance) {
  //       message.error(
  //         `Cannot grant leave! ${values.employeeName} only has ${balanceCheck.remainingLeaves} days remaining. Requested: ${requestedDays} days.`
  //       );
  //       return;
  //     }

  //     // Admin grants it directly as Approved
  //     const newLeave: LeaveRequest = {
  //       id: Date.now(),
  //       name: values.employeeName,
  //       dates: values.dates,
  //       leaveType: values.leaveType,
  //       reason: values.reason,
  //       status: "Approved",
  //       date: new Date().toISOString(),
  //       approvedBy: "Admin",
  //       approvedDate: new Date().toISOString(),
  //     };
  //     leaves.push(newLeave);
  //     localStorage.setItem("leaveRequests", JSON.stringify(leaves));

  //     // Update employee leave balance
  //     updateEmployeeLeaveBalance(newLeave.name, newLeave.dates);

  //     // Send notification to employee
  //     sendNotificationToEmployee(
  //       values.employeeName,
  //       "leave_status",
  //       "✅ Leave Approved by Admin",
  //       `Your leave request has been approved by admin for ${requestedDays} days.`,
  //       newLeave.id
  //     );

  //     // Log admin activity
  //     const adminActivities = JSON.parse(
  //       localStorage.getItem("adminActivities") || "[]"
  //     );
  //     adminActivities.push({
  //       id: `admin-grant-${newLeave.id}`,
  //       employee: values.employeeName,
  //       action: "granted leave by admin",
  //       time: new Date().toISOString(),
  //       type: "admin",
  //     });
  //     localStorage.setItem("adminActivities", JSON.stringify(adminActivities));

  //     message.success("Leave granted successfully!");
  //   }

  //   setLeaveModal(false);
  //   leaveForm.resetFields();
  //   setLeaveMode("individual");
  //   loadData();
  // };

  const handleApproveReject = async (leaveId: string, status: string) => {
    console.log("handleApproveReject called with:", { leaveId, status });

    if (!leaveId || leaveId === "undefined") {
      message.error("Invalid leave ID!");
      return;
    }

    try {
      if (status === "Approved") {
        await dispatch(
          updateLeaveStatus({
            id: leaveId,
            status: "Approved",
          })
        ).unwrap();
        message.success("Leave approved successfully!");
        await dispatch(fetchAllLeaves());
        await dispatch(fetchRecentActivities());
      } else if (status === "Rejected") {
        // ✅ DIRECT REJECTION WITHOUT MODAL
        await dispatch(
          updateLeaveStatus({
            id: leaveId,
            status: "Rejected",
            adminNotes: "Rejected by admin", // Default reason
          })
        ).unwrap();

        message.success("Leave rejected successfully!");
        await dispatch(fetchAllLeaves());
        await dispatch(fetchRecentActivities());
      }
    } catch (error: any) {
      console.error("Error in handleApproveReject:", error);
      message.error(error || "Failed to update leave status");
    }
  };
  // const handleApproveReject = (leaveId: number, status: string) => {
  //   const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
  //   const targetLeave = leaves.find((l: LeaveRequest) => l.id === leaveId);

  //   if (!targetLeave) return;

  //   // If approving, check leave balance
  //   if (status === "Approved") {
  //     const requestedDays = calculateLeaveDays(targetLeave.dates);
  //     const balanceCheck = checkLeaveBalance(targetLeave.name, requestedDays);

  //     if (!balanceCheck.hasBalance) {
  //       message.error(
  //         `Cannot approve! ${targetLeave.name} only has ${balanceCheck.remainingLeaves} days remaining. Requested: ${requestedDays} days.`
  //       );
  //       return;
  //     }

  //     // Update leave balance
  //     updateEmployeeLeaveBalance(targetLeave.name, targetLeave.dates);

  //     const updated = leaves.map((l: LeaveRequest) =>
  //       l.id === leaveId
  //         ? {
  //             ...l,
  //             status: "Approved",
  //             approvedBy: "Admin",
  //             approvedDate: new Date().toISOString(),
  //           }
  //         : l
  //     );
  //     localStorage.setItem("leaveRequests", JSON.stringify(updated));

  //     sendNotificationToEmployee(
  //       targetLeave.name,
  //       "leave_status",
  //       "✅ Leave Approved",
  //       `Your leave request for ${requestedDays} days has been approved!`,
  //       leaveId
  //     );

  //     // Log admin activity
  //     const adminActivities = JSON.parse(
  //       localStorage.getItem("adminActivities") || "[]"
  //     );
  //     adminActivities.push({
  //       id: `admin-approve-${leaveId}-${Date.now()}`,
  //       employee: targetLeave.name,
  //       action: `leave approved by admin`,
  //       time: new Date().toISOString(),
  //       type: "admin",
  //     });
  //     localStorage.setItem("adminActivities", JSON.stringify(adminActivities));

  //     message.success("Leave approved successfully!");
  //     loadData();
  //     return;
  //   }

  //   // If rejecting, show rejection reason modal
  //   if (status === "Rejected") {
  //     Modal.confirm({
  //       title: "Reject Leave Request",
  //       content: (
  //         <div>
  //           <p style={{ marginBottom: "12px" }}>
  //             Please provide a reason for rejection:
  //           </p>
  //           <TextArea
  //             id="rejection-reason"
  //             rows={4}
  //             placeholder="Enter rejection reason..."
  //           />
  //         </div>
  //       ),
  //       okText: "Reject Leave",
  //       okType: "danger",
  //       cancelText: "Cancel",
  //       onOk: () => {
  //         const reasonElement = document.getElementById(
  //           "rejection-reason"
  //         ) as HTMLTextAreaElement;
  //         const rejectionReason = reasonElement?.value || "No reason provided";

  //         const updated = leaves.map((l: LeaveRequest) =>
  //           l.id === leaveId
  //             ? {
  //                 ...l,
  //                 status: "Rejected",
  //                 rejectionReason: rejectionReason,
  //                 rejectedBy: "Admin",
  //                 rejectedDate: new Date().toISOString(),
  //               }
  //             : l
  //         );
  //         localStorage.setItem("leaveRequests", JSON.stringify(updated));

  //         // Send notification
  //         sendNotificationToEmployee(
  //           targetLeave.name,
  //           "leave_status",
  //           "❌ Leave Rejected",
  //           `Your leave request has been rejected. Reason: ${rejectionReason}`,
  //           leaveId
  //         );

  //         // Log admin activity
  //         const adminActivities = JSON.parse(
  //           localStorage.getItem("adminActivities") || "[]"
  //         );
  //         adminActivities.push({
  //           id: `admin-reject-${leaveId}-${Date.now()}`,
  //           employee: targetLeave.name,
  //           action: `leave rejected by admin: ${rejectionReason}`,
  //           time: new Date().toISOString(),
  //           type: "admin",
  //         });
  //         localStorage.setItem(
  //           "adminActivities",
  //           JSON.stringify(adminActivities)
  //         );

  //         message.success("Leave rejected successfully!");
  //         loadData();
  //       },
  //     });
  //   }
  // };
  const handleDeleteActivity = async (activityId: string) => {
    try {
      if (
        activityId.startsWith("att-checkin") ||
        activityId.startsWith("att-checkout")
      ) {
        // Extract attendance record ID from activity ID
        // Format: "att-checkin-{attendanceId}" or "att-checkout-{attendanceId}"
        const attendanceId = activityId.split("-")[2];

        await dispatch(deleteAttendanceRecord(attendanceId)).unwrap();
        message.success("Attendance activity deleted successfully!");
      } else if (activityId.startsWith("leave-")) {
        // Extract leave ID from activity ID
        // Format: "leave-{leaveId}"
        const leaveId = activityId.split("-")[1];

        await dispatch(reduxDeleteLeave(leaveId)).unwrap();
        message.success("Leave activity deleted successfully!");
      } else {
        message.warning("Cannot delete this activity!");
        return;
      }

      // Re-fetch activities after deletion
      await dispatch(fetchRecentActivities());
    } catch (error: any) {
      message.error(error || "Failed to delete activity");
    }
  };

  const generateCSV = () => {
    const data =
      selectedEmployee === "all"
        ? attendanceRecords
        : attendanceRecords.filter(
            (r) => r.employeeId.name === selectedEmployee
          );

    const headers = [
      "Name",
      "Date",
      "Check In",
      "Check Out",
      "Working Time",
      "Status",
    ];
    const rows = data.map((r) => [
      r.employeeId.name,
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
          : attendanceRecords.filter(
              (r) => r.employeeId.name === selectedEmployee
            );

      let content = `ATTENDANCE REPORT\n===================\n\n`;
      content += `Employee: ${selectedEmployee === "all" ? "All Employees" : selectedEmployee}\n\n`;
      data.forEach((r) => {
        content += `Name: ${r.employeeId.name}\nDate: ${r.date}\nCheck In: ${r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : "-"}\nCheck Out: ${r.checkOut || "-"}\nWorking Time: ${r.workingTime}\nStatus: ${r.status}\n\n`;
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
        : attendanceRecords.filter(
            (r) => r.employeeId.name === selectedEmployee
          );

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

      doc.text(`Name: ${r.employeeId.name}`, 20, yPos);
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
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayRecord = attendanceRecords.find((r) => {
          const recordDate = new Date(r.date);
          recordDate.setHours(0, 0, 0, 0);
          return (
            r.employeeId.name === record.name &&
            recordDate.getTime() === today.getTime()
          );
        });

        const isPresent = todayRecord?.status === "Present";

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
      dataIndex: "employeeName",
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
      key: "duration",
      render: (_: any, record: LeaveRequest) => {
        // ✅ Use LeaveRequest type
        const start = new Date(record.startDate);
        const end = new Date(record.endDate);
        const days =
          Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) +
          1;

        return `${start.toLocaleDateString()} - ${end.toLocaleDateString()} (${days} days)`;
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
      render: (_: any, record: LeaveRequest) => {
        // ✅ Use LeaveRequest type
        console.log("Leave record:", record); // ✅ Debug log
        console.log("📋 Leave ID:", record._id);
        return (
          <Space>
            {record.status === "Pending" && (
              <>
                <Button
                  size="small"
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={() => {
                    console.log("Approving leave ID:", record._id); // ✅ Debug
                    handleApproveReject(record._id, "Approved"); // ✅ Use _id
                  }}
                >
                  Approve
                </Button>
                <Button
                  size="small"
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => {
                    console.log("Rejecting leave ID:", record._id); // ✅ Debug
                    handleApproveReject(record._id, "Rejected"); // ✅ Use _id
                  }}
                >
                  Reject
                </Button>
              </>
            )}
            <Button
              size="small"
              danger
              icon={<CloseOutlined />}
              onClick={() => handleDeleteLeaveRequest(record._id)} // ✅ Use _id
              style={{ marginLeft: record.status === "Pending" ? "8px" : "0" }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  // const leaveColumns = [
  //   {
  //     title: "Employee",
  //     dataIndex: "employeeName",
  //     key: "name",
  //   },
  //   {
  //     title: "Type",
  //     dataIndex: "leaveType",
  //     key: "leaveType",
  //     render: (type: string) => {
  //       const typeMap: any = {
  //         annual: "Annual Leave",
  //         sick: "Sick Leave",
  //         casual: "Casual Leave",
  //         emergency: "Emergency Leave",
  //       };
  //       return typeMap[type] || type;
  //     },
  //   },
  //   {
  //     title: "Duration",
  //     key: "duration",
  //     render: (_: any, record: any) => {
  //       // ✅ Fixed date calculation
  //       const start = new Date(record.startDate);
  //       const end = new Date(record.endDate);
  //       const days =
  //         Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) +
  //         1;

  //       return `${start.toLocaleDateString()} - ${end.toLocaleDateString()} (${days} days)`;
  //     },
  //   },
  //   {
  //     title: "Reason",
  //     dataIndex: "reason",
  //     key: "reason",
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //     render: (status: string) => (
  //       <Tag
  //         color={
  //           status === "Approved"
  //             ? "green"
  //             : status === "Pending"
  //               ? "orange"
  //               : "red"
  //         }
  //       >
  //         {status}
  //       </Tag>
  //     ),
  //   },
  //   {
  //     title: "Actions",
  //     key: "actions",
  //     render: (_: any, record: LeaveRequest) => (
  //       <Space>
  //         {record.status === "Pending" && (
  //           <>
  //             <Button
  //               size="small"
  //               type="primary"
  //               icon={<CheckOutlined />}
  //               onClick={() => handleApproveReject(record.id, "Approved")}
  //             >
  //               Approve
  //             </Button>
  //             <Button
  //               size="small"
  //               danger
  //               icon={<CloseOutlined />}
  //               onClick={() => handleApproveReject(record.id, "Rejected")}
  //             >
  //               Reject
  //             </Button>
  //           </>
  //         )}
  //         <Button
  //           size="small"
  //           danger
  //           icon={<CloseOutlined />}
  //           onClick={() => handleDeleteLeaveRequest(record.id)}
  //           style={{ marginLeft: record.status === "Pending" ? "8px" : "0" }}
  //         >
  //           Delete
  //         </Button>
  //       </Space>
  //     ),
  //   },
  // ];
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
                {checkInStatus.isCheckedIn
                  ? "Quick Check-out"
                  : checkInStatus.hasMarkedToday
                    ? "Attendance Marked"
                    : "Quick Check-in"}
              </Text>
              <Text
                style={{
                  display: "block",
                  color: "#9ca3af",
                  fontSize: "12px",
                  margin: "8px 0 12px 0",
                }}
              >
                {checkInStatus.isCheckedIn
                  ? "End your session"
                  : checkInStatus.hasMarkedToday
                    ? "You've marked attendance  today"
                    : "Start your session"}
              </Text>
              <Button
                type="primary"
                size="large"
                onClick={
                  checkInStatus.isCheckedIn ? handleCheckOut : handleCheckIn
                }
                disabled={
                  !checkInStatus.isCheckedIn && checkInStatus.hasMarkedToday
                }
                loading={attendanceLoading}
                style={{
                  width: "100%",
                  backgroundColor: checkInStatus.isCheckedIn
                    ? "#ef4444"
                    : checkInStatus.hasMarkedToday
                      ? "#9ca3af"
                      : "#10b981",
                  borderColor: checkInStatus.isCheckedIn
                    ? "#ef4444"
                    : checkInStatus.hasMarkedToday
                      ? "#9ca3af"
                      : "#10b981",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor:
                    !checkInStatus.isCheckedIn && checkInStatus.hasMarkedToday
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {checkInStatus.isCheckedIn
                  ? "Check Out"
                  : checkInStatus.hasMarkedToday
                    ? "Already Checked Out"
                    : "Check In"}
              </Button>

              {/* Show work duration if available */}
              {/* {checkInStatus.hasMarkedToday && checkInStatus.workDuration && (
                <Text
                  style={{
                    display: "block",
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "#10b981",
                    textAlign: "center",
                  }}
                >
                  Today's work: {checkInStatus.workDuration}
                </Text>
              )} */}
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
            <ResponsiveContainer
              width="100%"
              height={loggedInUser.userRole === "employee" ? 300 : 250}
            >
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
            {loggedInUser.userRole === "admin" && (
              <Col xs={24} md={12}>
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
                      minHeight: "200px",
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

                    {productivityData && productivityData.length > 0 ? (
                      <ResponsiveContainer
                        width="100%"
                        height={200}
                        key={loggedInUser.userRole}
                      >
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
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "40px",
                          color: "#9ca3af",
                        }}
                      >
                        No data available
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            )}

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
          {/* {loggedInUser.userRole === "employee" && (
            <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
              <Col xs={24} md={loggedInUser.userRole === "admin" ? 12 : 24}>
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
          )} */}

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
                      loading={csvLoading} // ✅ Add loading prop
                      disabled={csvLoading}
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
                      loading={pdfLoading} // ✅ Add loading prop
                      disabled={pdfLoading} // ✅ Disable while loading
                      style={{
                        backgroundColor: "#10b981",
                        borderColor: "#10b981",
                        color: "white",
                        marginLeft: 8,
                      }}
                      onClick={async () => {
                        // ✅ Make async
                        setPdfLoading(true); // ✅ Start loading

                        try {
                          if (typeof window.jspdf === "undefined") {
                            message.error(
                              "PDF library not loaded yet. Please wait a moment."
                            );
                            setPdfLoading(false);
                            return;
                          }

                          const today = new Date();
                          today.setHours(0, 0, 0, 0);

                          const presentToday = attendanceRecords.filter((r) => {
                            const recordDate = new Date(r.date);
                            recordDate.setHours(0, 0, 0, 0);
                            return (
                              recordDate.getTime() === today.getTime() &&
                              r.status === "Present"
                            );
                          });

                          if (presentToday.length === 0) {
                            message.warning("No employees present today!");
                            setPdfLoading(false);
                            return;
                          }

                          const { jsPDF } = window.jspdf;
                          const doc = new jsPDF();

                          // Title Section
                          doc.setFontSize(18);
                          doc.setFont("helvetica", "bold");
                          doc.text("PRESENT EMPLOYEES REPORT", 105, 20, {
                            align: "center",
                          });

                          doc.setFontSize(11);
                          doc.setFont("helvetica", "normal");
                          doc.text(
                            `Generated: ${new Date().toLocaleString()}`,
                            105,
                            28,
                            {
                              align: "center",
                            }
                          );
                          doc.text(
                            `Total Present: ${presentToday.length}`,
                            105,
                            34,
                            {
                              align: "center",
                            }
                          );

                          doc.setLineWidth(0.5);
                          doc.line(15, 38, 195, 38);

                          let yPos = 45;
                          presentToday.forEach((record, index) => {
                            const emp = employees.find(
                              (e) => e.name === record.employeeId.name
                            );
                            if (yPos > 270) {
                              doc.addPage();
                              yPos = 20;
                            }

                            const checkInTime = record.checkIn
                              ? new Date(record.checkIn).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )
                              : "N/A";

                            const checkOutTime = record.checkOut
                              ? new Date(record.checkOut).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )
                              : "In Progress";

                            const workingDuration =
                              (record as any).workDuration ||
                              record.workingTime ||
                              (record.workingHours
                                ? `${record.workingHours.toFixed(2)} hrs`
                                : null) ||
                              (record.checkOut ? "Completed" : "In Progress");

                            doc.setFontSize(10);
                            doc.setFont("helvetica", "bold");
                            doc.text(`Employee ${index + 1}`, 15, yPos);
                            yPos += 6;

                            doc.setFont("helvetica", "normal");
                            doc.setFontSize(9);
                            doc.text(
                              `Name: ${record.employeeId.name}`,
                              20,
                              yPos
                            );
                            yPos += 5;
                            doc.text(
                              `Role: ${emp?.specificRole || "N/A"}`,
                              20,
                              yPos
                            );
                            yPos += 5;
                            doc.text(`Shift: ${emp?.shift || "N/A"}`, 20, yPos);
                            yPos += 5;
                            doc.text(`Check-In: ${checkInTime}`, 20, yPos);
                            yPos += 5;
                            doc.text(`Check-Out: ${checkOutTime}`, 20, yPos);
                            yPos += 5;
                            doc.text(
                              `Working Time: ${workingDuration}`,
                              20,
                              yPos
                            );
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
                            "Failed to download PDF: " +
                              (error?.message || "Unknown error")
                          );
                        } finally {
                          setPdfLoading(false); // ✅ Stop loading
                        }
                      }}
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
                      onClick={() => setViewShiftsModal(true)}
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
                      direction="horizontal"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "8px",
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
                          minWidth: "120px",
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
                          if (loggedInUser.userRole === "admin") {
                            // setPendingLeaveCount(0);
                          }
                        }}
                        style={{
                          flex: 1,
                          minWidth: "120px",
                          borderRadius: "8px",
                          borderColor: "#d1d5db",
                          color: "#6b7280",
                          fontWeight: 500,
                          position: "relative",
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
                                zIndex: 10,
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
                          minWidth: "120px",
                          borderRadius: "8px",
                          borderColor: "#d1d5db",
                          color: "#6b7280",
                          fontWeight: 500,
                        }}
                      >
                        Export
                      </Button>
                      <Button
                        onClick={() => setLeaveBalanceModal(true)}
                        style={{
                          flex: 1,
                          minWidth: "120px",
                          borderRadius: "8px",
                          borderColor: "#d1d5db",
                          color: "#6b7280",
                          fontWeight: 500,
                        }}
                      >
                        Set Balance
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

          {loggedInUser.userRole === "admin" && (
            <Card
              title={
                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
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
          )}
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
      {/* Set Leave Balance Modal */}
      <Modal
        title="Set Employee Leave Balance"
        open={leaveBalanceModal}
        onCancel={() => {
          setLeaveBalanceModal(false);
          leaveBalanceForm.resetFields();
          setSelectedEmployeeForBalance("");
        }}
        footer={null}
        width={500}
      >
        <Form
          form={leaveBalanceForm}
          onFinish={handleSetLeaveBalance}
          layout="vertical"
        >
          <Form.Item
            name="employeeName"
            label="Select Employee"
            rules={[{ required: true, message: "Please select an employee!" }]}
          >
            <Select
              placeholder="Choose employee"
              onChange={(value) => setSelectedEmployeeForBalance(value)}
              showSearch
              filterOption={(input, option) =>
                (option?.label as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={employees.map((emp) => ({
                label: `${emp.name} - ${emp.specificRole}`,
                value: emp.name,
              }))}
            />
          </Form.Item>

          {selectedEmployeeForBalance && (
            <div
              style={{
                padding: "12px",
                background: "#f5f5f5",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <Text strong>Current Balance:</Text>
              <div style={{ marginTop: "8px" }}>
                <Text>
                  Total:{" "}
                  {getEmployeeBalance(selectedEmployeeForBalance).totalLeaves}{" "}
                  days
                </Text>
                <br />
                <Text>
                  Used:{" "}
                  {getEmployeeBalance(selectedEmployeeForBalance).usedLeaves}{" "}
                  days
                </Text>
                <br />
                <Text type="success">
                  Remaining:{" "}
                  {
                    getEmployeeBalance(selectedEmployeeForBalance)
                      .remainingLeaves
                  }{" "}
                  days
                </Text>
              </div>
            </div>
          )}

          <Form.Item
            name="totalLeaves"
            label="Total Annual Leave Days"
            rules={[
              { required: true, message: "Please enter total leave days!" },
              {
                validator: (_, value) => {
                  const num = Number(value);
                  if (isNaN(num) || num < 0 || num > 365) {
                    return Promise.reject(
                      new Error("Please enter a valid number (0-365)!")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
            extra="Standard: 12-20 days per year"
          >
            <Input
              type="number"
              placeholder="e.g., 12"
              suffix="days"
              min={0}
              max={365}
            />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  setLeaveBalanceModal(false);
                  leaveBalanceForm.resetFields();
                  setSelectedEmployeeForBalance("");
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#10b981",
                  borderColor: "#10b981",
                }}
              >
                Set Balance
              </Button>
            </Space>
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
          dataSource={
            leaveRequests.filter((leave) => !leave.isCompanyWide) as any[]
          }
          rowKey="_id"
          pagination={false}
          scroll={{ x: 900 }}
        />
      </Modal>

      <Modal
        title="Export Employee Data"
        open={exportModal}
        onCancel={() => {
          setExportModal(false);
          setSelectedEmployees([]); // Reset selection when closing
          setSearchText(""); // Reset search
        }}
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

          {/* Search Bar with Tags */}
          <div style={{ marginTop: "12px", marginBottom: "16px" }}>
            <Select
              mode="multiple"
              placeholder="Search and select employees by name, email, or role..."
              value={selectedEmployees}
              onChange={(values) => setSelectedEmployees(values)}
              onSearch={(value) => setSearchText(value)}
              searchValue={searchText}
              style={{ width: "100%" }}
              filterOption={(input, option) => {
                const employee = employees.find(
                  (e) => e.email === option?.value
                );
                if (!employee) return false;
                const searchLower = input.toLowerCase();
                return (
                  employee.name.toLowerCase().includes(searchLower) ||
                  employee.email.toLowerCase().includes(searchLower) ||
                  employee.specificRole.toLowerCase().includes(searchLower)
                );
              }}
              tagRender={(props) => {
                const { label, closable, onClose } = props;
                return (
                  <Tag
                    color="#10b981"
                    closable={closable}
                    onClose={onClose}
                    style={{ marginRight: 3, marginBottom: 3 }}
                  >
                    {label}
                  </Tag>
                );
              }}
            >
              {employees.map((emp) => (
                <Option key={emp.email} value={emp.email}>
                  {emp.name} - {emp.email}
                </Option>
              ))}
            </Select>
          </div>

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
            rowSelection={{
              selectedRowKeys: selectedEmployees,
              onChange: (selectedRowKeys: React.Key[]) => {
                setSelectedEmployees(selectedRowKeys as string[]);
              },
              type: "checkbox",
            }}
            pagination={{
              pageSize: 5,
              showSizeChanger: false,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} employees${selectedEmployees.length > 0 ? ` (${selectedEmployees.length} selected)` : ""}`,
            }}
            scroll={{ x: 700 }}
          />
        </div>
        <Space>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => {
              // Filter employees based on selection
              const filteredEmployees =
                selectedEmployees.length > 0
                  ? employees.filter((emp) =>
                      selectedEmployees.includes(emp.email)
                    )
                  : employees;

              if (filteredEmployees.length === 0) {
                message.warning("No employees selected to export!");
                return;
              }

              const headers = [
                "Name",
                "Email",
                "Role",
                "Shift",
                "Weekly Hours",
              ];
              const rows = filteredEmployees.map((e) => [
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
              link.download = `employees_data_${selectedEmployees.length > 0 ? "selected" : "all"}.csv`;
              link.click();
              message.success(
                `CSV downloaded! (${filteredEmployees.length} employees)`
              );
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

              // Filter employees based on selection
              const filteredEmployees =
                selectedEmployees.length > 0
                  ? employees.filter((emp) =>
                      selectedEmployees.includes(emp.email)
                    )
                  : employees;

              if (filteredEmployees.length === 0) {
                message.warning("No employees selected to export!");
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
              doc.text(
                `Total Employees: ${filteredEmployees.length}`,
                105,
                34,
                {
                  align: "center",
                }
              );

              doc.setLineWidth(0.5);
              doc.line(15, 38, 195, 38);

              let yPos = 45;
              let employeesOnPage = 0;
              const maxEmployeesPerPage = 5;

              filteredEmployees.forEach((e, index) => {
                // Add new page if 5 employees already on current page
                if (employeesOnPage >= maxEmployeesPerPage) {
                  doc.addPage();
                  yPos = 20;
                  employeesOnPage = 0;
                }

                // Check if we need a new page due to space
                if (yPos > 250 && employeesOnPage > 0) {
                  doc.addPage();
                  yPos = 20;
                  employeesOnPage = 0;
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
                yPos += 8;

                employeesOnPage++;
              });

              doc.save(
                `employees_data_${selectedEmployees.length > 0 ? "selected" : "all"}.pdf`
              );
              message.success(
                `PDF downloaded! (${filteredEmployees.length} employees)`
              );
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

      {/* View Shifts Modal */}
      <Modal
        title={
          <Text style={{ fontSize: "18px", fontWeight: 600, color: "#111827" }}>
            Employee Shift Schedule
          </Text>
        }
        open={viewShiftsModal}
        onCancel={() => {
          setViewShiftsModal(false);
          setShiftSearchText("");
          setShiftCurrentPage(1);
        }}
        footer={null}
        width={900}
        bodyStyle={{
          maxHeight: "600px",
          overflowY: "auto",
        }}
      >
        {/* Shift Statistics Summary */}
        <Row gutter={[12, 12]} style={{ marginBottom: "20px" }}>
          <Col xs={12} sm={8}>
            <Card
              size="small"
              style={{
                borderRadius: "8px",
                border: "1px solid #10b981",
                background: "#f0fdf4",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Text
                  style={{
                    fontSize: "11px",
                    color: "#065f46",
                    fontWeight: 500,
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Morning Shift
                </Text>
                <Title
                  level={3}
                  style={{ margin: 0, color: "#10b981", fontSize: "24px" }}
                >
                  {getShiftStatistics().morning}
                </Title>
                <Text style={{ fontSize: "10px", color: "#6b7280" }}>
                  employees
                </Text>
              </div>
            </Card>
          </Col>

          <Col xs={12} sm={8}>
            <Card
              size="small"
              style={{
                borderRadius: "8px",
                border: "1px solid #3b82f6",
                background: "#eff6ff",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Text
                  style={{
                    fontSize: "11px",
                    color: "#1e40af",
                    fontWeight: 500,
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Afternoon Shift
                </Text>
                <Title
                  level={3}
                  style={{ margin: 0, color: "#3b82f6", fontSize: "24px" }}
                >
                  {getShiftStatistics().afternoon}
                </Title>
                <Text style={{ fontSize: "10px", color: "#6b7280" }}>
                  employees
                </Text>
              </div>
            </Card>
          </Col>

          <Col xs={12} sm={8}>
            <Card
              size="small"
              style={{
                borderRadius: "8px",
                border: "1px solid #8b5cf6",
                background: "#f5f3ff",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Text
                  style={{
                    fontSize: "11px",
                    color: "#6b21a8",
                    fontWeight: 500,
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Evening Shift
                </Text>
                <Title
                  level={3}
                  style={{ margin: 0, color: "#8b5cf6", fontSize: "24px" }}
                >
                  {getShiftStatistics().evening}
                </Title>
                <Text style={{ fontSize: "10px", color: "#6b7280" }}>
                  employees
                </Text>
              </div>
            </Card>
          </Col>

          {/* <Col xs={12} sm={6}>
            <Card
              size="small"
              style={{
                borderRadius: "8px",
                border: "1px solid #ef4444",
                background: "#fef2f2",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Text
                  style={{
                    fontSize: "11px",
                    color: "#991b1b",
                    fontWeight: 500,
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Closed/Unassigned
                </Text>
                <Title
                  level={3}
                  style={{ margin: 0, color: "#ef4444", fontSize: "24px" }}
                >
                  {getShiftStatistics().closed}
                </Title>
                <Text style={{ fontSize: "10px", color: "#6b7280" }}>
                  employees
                </Text>
              </div>
            </Card>
          </Col> */}
        </Row>

        <Divider style={{ margin: "16px 0" }} />

        {/* Search Bar */}
        <div style={{ marginBottom: "16px" }}>
          <Input
            placeholder="Search by name, email, role, or shift..."
            value={shiftSearchText}
            onChange={(e) => {
              setShiftSearchText(e.target.value);
              setShiftCurrentPage(1); // Reset to first page on search
            }}
            allowClear
            prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
            style={{
              borderRadius: "8px",
              padding: "10px 12px",
            }}
          />
          <Text
            type="secondary"
            style={{ fontSize: "12px", display: "block", marginTop: "8px" }}
          >
            Showing{" "}
            {Math.min(
              (shiftCurrentPage - 1) * shiftPageSize + 1,
              getFilteredShiftEmployees().length
            )}{" "}
            -{" "}
            {Math.min(
              shiftCurrentPage * shiftPageSize,
              getFilteredShiftEmployees().length
            )}{" "}
            of {getFilteredShiftEmployees().length} employees
          </Text>
        </div>

        {/* Shifts Table */}
        <Table
          columns={[
            {
              title: "Employee",
              key: "employee",
              width: 200,
              render: (_: any, record: Employee) => (
                <Space>
                  <Avatar
                    src={record.profileImage}
                    icon={<UserOutlined />}
                    size={40}
                  />
                  <div>
                    <Text strong style={{ display: "block", fontSize: "14px" }}>
                      {record.name}
                    </Text>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      {record.specificRole}
                    </Text>
                  </div>
                </Space>
              ),
            },
            {
              title: "Current Shift",
              key: "shift",
              width: 180,
              render: (_: any, record: Employee) => {
                const shiftInfo = getEmployeeShiftInfo(record);
                return (
                  <Tag
                    color={
                      shiftInfo.currentShift === "morning"
                        ? "green"
                        : shiftInfo.currentShift === "afternoon"
                          ? "blue"
                          : shiftInfo.currentShift === "evening"
                            ? "purple"
                            : "red"
                    }
                    style={{ fontSize: "13px", padding: "4px 12px" }}
                  >
                    {formatShiftLabel(shiftInfo.currentShift)}
                  </Tag>
                );
              },
            },
            // {
            //   title: "Duration",
            //   key: "duration",
            //   width: 200,
            //   render: (_: any, record: Employee) => {
            //     const shiftInfo = getEmployeeShiftInfo(record);
            //     if (shiftInfo.startDate === "N/A") {
            //       return <Text type="secondary">Default Schedule</Text>;
            //     }
            //     return (
            //       <div>
            //         <Text style={{ fontSize: "12px", display: "block" }}>
            //           From: {new Date(shiftInfo.startDate).toLocaleDateString()}
            //         </Text>
            //         <Text style={{ fontSize: "12px", display: "block" }}>
            //           To: {new Date(shiftInfo.endDate).toLocaleDateString()}
            //         </Text>
            //       </div>
            //     );
            //   },
            // },
            // {
            //   title: "Assigned By",
            //   key: "assignedBy",
            //   width: 120,
            //   render: (_: any, record: Employee) => {
            //     const shiftInfo = getEmployeeShiftInfo(record);
            //     return (
            //       <Tag
            //         color={
            //           shiftInfo.assignedBy === "Default" ? "default" : "blue"
            //         }
            //       >
            //         {shiftInfo.assignedBy}
            //       </Tag>
            //     );
            //   },
            // },
          ]}
          dataSource={getPaginatedShiftEmployees()}
          rowKey="email"
          pagination={false}
          scroll={{ x: 700 }}
          locale={{
            emptyText: (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <Text type="secondary">No employees found</Text>
              </div>
            ),
          }}
        />

        {/* Pagination */}
        {getFilteredShiftEmployees().length > shiftPageSize && (
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              disabled={shiftCurrentPage === 1}
              onClick={() => setShiftCurrentPage(shiftCurrentPage - 1)}
            >
              Previous
            </Button>
            <Text>
              Page {shiftCurrentPage} of{" "}
              {Math.ceil(getFilteredShiftEmployees().length / shiftPageSize)}
            </Text>
            <Button
              disabled={
                shiftCurrentPage >=
                Math.ceil(getFilteredShiftEmployees().length / shiftPageSize)
              }
              onClick={() => setShiftCurrentPage(shiftCurrentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
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
            {/* <Button
              type="text"
              danger
              onClick={() => {
                Modal.confirm({
                  title: "Delete All Activities",
                  content:
                    "Are you sure you want to delete all activities? This action cannot be undone.",
                  okText: "Clear",
                  okType: "danger",
                  cancelText: "Cancel",
                  onOk: () => {
                    // Clear ALL activity sources
                    localStorage.setItem("adminActivities", JSON.stringify([]));
                    localStorage.setItem(
                      "attendanceRecords",
                      JSON.stringify([])
                    );
                    localStorage.setItem("leaveRequests", JSON.stringify([]));

                    // Reset state
                    setActivities([]);
                    setAttendanceRecords([]);
                    setLeaveRequests([]);

                    message.success("All activities cleared successfully!");
                    loadData(); // Reload to update stats
                    setShowAllActivities(false);
                    setActivitySearchText("");
                  },
                });
              }}
              style={{ fontSize: "14px", fontWeight: 500 }}
            >
              Clear
            </Button> */}
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
      {/* New Leave Modal - Admin Grant Leave */}
      <Modal
        title={
          <Text style={{ fontSize: "18px", fontWeight: 600, color: "#111827" }}>
            {leaveMode === "company"
              ? "Grant Company Holiday"
              : "Grant Employee Leave"}
          </Text>
        }
        open={leaveModal}
        onCancel={() => {
          setLeaveModal(false);
          leaveForm.resetFields();
          setLeaveMode("individual");
        }}
        footer={null}
        width={700}
      >
        {/* Leave Mode Selector */}
        <div style={{ marginBottom: "24px" }}>
          <Text strong style={{ marginBottom: "12px", display: "block" }}>
            Leave Type
          </Text>
          <Space size="large">
            <Button
              type={leaveMode === "individual" ? "primary" : "default"}
              onClick={() => {
                setLeaveMode("individual");
                leaveForm.resetFields();
              }}
              style={{
                borderRadius: "8px",
                padding: "8px 24px",
                height: "auto",
                backgroundColor:
                  leaveMode === "individual" ? "#10b981" : "transparent",
                borderColor: leaveMode === "individual" ? "#10b981" : "#d9d9d9",
              }}
            >
              Individual Employee
            </Button>
            <Button
              type={leaveMode === "company" ? "primary" : "default"}
              onClick={() => {
                setLeaveMode("company");
                leaveForm.resetFields();
              }}
              style={{
                borderRadius: "8px",
                padding: "8px 24px",
                height: "auto",
                backgroundColor:
                  leaveMode === "company" ? "#10b981" : "transparent",
                borderColor: leaveMode === "company" ? "#10b981" : "#d9d9d9",
              }}
            >
              Company Holiday
            </Button>
          </Space>
        </div>

        <Divider style={{ margin: "16px 0" }} />

        <Form
          form={leaveForm}
          layout="vertical"
          onFinish={handleLeaveSubmit}
          initialValues={{
            leaveType: "annual",
          }}
        >
          {/* Individual Employee Leave */}
          {leaveMode === "individual" && (
            <>
              <Form.Item
                label="Select Employee"
                name="employeeName"
                rules={[
                  { required: true, message: "Please select an employee!" },
                ]}
              >
                <Select
                  placeholder="Choose employee"
                  showSearch
                  size="large"
                  filterOption={(input, option) =>
                    (option?.label as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={employees.map((emp) => ({
                    label: `${emp.name} - ${emp.specificRole}`,
                    value: emp.name,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="Leave Type"
                name="leaveType"
                rules={[
                  { required: true, message: "Please select leave type!" },
                ]}
              >
                <Select size="large" placeholder="Select leave type">
                  <Option value="annual">Annual Leave</Option>
                  <Option value="sick">Sick Leave</Option>
                  <Option value="casual">Casual Leave</Option>
                  <Option value="emergency">Emergency Leave</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Leave Duration"
                name="dates"
                rules={[
                  { required: true, message: "Please select leave duration!" },
                ]}
              >
                <RangePicker
                  size="large"
                  style={{ width: "100%" }}
                  format="MMM D, YYYY"
                  // disabledDate={(current) => {
                  //   return current && current < new Date().setHours(0, 0, 0, 0);
                  // }}
                />
              </Form.Item>

              <Form.Item
                label="Reason"
                name="reason"
                rules={[
                  { required: true, message: "Please provide a reason!" },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Enter reason for leave..."
                  maxLength={200}
                  showCount
                />
              </Form.Item>
            </>
          )}

          {/* Company Holiday */}
          {leaveMode === "company" && (
            <>
              <Form.Item
                label="Holiday Title"
                name="holidayTitle"
                rules={[
                  { required: true, message: "Please enter holiday title!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="e.g., Independence Day, New Year, Eid..."
                  maxLength={100}
                />
              </Form.Item>

              <Form.Item
                label="Leave Type"
                name="leaveType"
                rules={[
                  { required: true, message: "Please select leave type!" },
                ]}
              >
                <Select size="large" placeholder="Select leave type">
                  <Option value="annual">Public Holiday</Option>
                  <Option value="casual">Festival Leave</Option>
                  <Option value="emergency">Emergency Closure</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Holiday Duration"
                name="dates"
                rules={[
                  {
                    required: true,
                    message: "Please select holiday duration!",
                  },
                ]}
              >
                <RangePicker
                  size="large"
                  style={{ width: "100%" }}
                  format="MMM D, YYYY"
                  // disabledDate={(current) => {
                  //   return current && current < new Date().setHours(0, 0, 0, 0);
                  // }}
                />
              </Form.Item>

              <Form.Item
                label="Description/Announcement"
                name="reason"
                rules={[
                  { required: true, message: "Please provide description!" },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Enter holiday announcement or description..."
                  maxLength={300}
                  showCount
                />
              </Form.Item>

              <div
                style={{
                  padding: "12px",
                  background: "#fff7ed",
                  borderRadius: "8px",
                  border: "1px solid #fed7aa",
                  marginBottom: "16px",
                }}
              >
                <Text style={{ fontSize: "13px", color: "#9a3412" }}>
                  ⚠️ <strong>Note:</strong> This holiday will be granted to all
                  employees in the system. All employees will receive a
                  notification about this company holiday.
                </Text>
              </div>
            </>
          )}

          <Form.Item style={{ marginBottom: 0, marginTop: "24px" }}>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  setLeaveModal(false);
                  leaveForm.resetFields();
                  setLeaveMode("individual");
                }}
                size="large"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{
                  backgroundColor: "#10b981",
                  borderColor: "#10b981",
                }}
              >
                {leaveMode === "company" ? "Grant Holiday" : "Grant Leave"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
