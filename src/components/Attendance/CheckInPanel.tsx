// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Button,
//   Space,
//   Typography,
//   Row,
//   Col,
//   Modal,
//   Table,
//   message,
//   Tag,
//   Select,
//   DatePicker,
// } from "antd";
// import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
// import TextArea from "antd/es/input/TextArea";
// import type { Dayjs } from "dayjs";

// const { Title, Text } = Typography;
// const { RangePicker } = DatePicker;
// const { Option } = Select;

// interface UserData {
//   name: string;
//   userRole: string;
//   specificRole: string;
//   shift?: string;
//   customShift?: string;
//   weeklyHours?: number;
// }

// interface AttendanceRecord {
//   id: number;
//   name: string;
//   date: string;
//   checkIn: string;
//   checkOut: string;
//   workingTime: string;
//   status: "present" | "absent";
// }

// interface LeaveRecord {
//   id: number;
//   days: number;
//   status: string;
//   percentage: number;
// }

// const QuickStatsCards: React.FC = () => {
//   const [userData, setUserData] = useState<UserData>({
//     name: "User",
//     userRole: "employee",
//     specificRole: "Employee",
//   });

//   const [isCheckedIn, setIsCheckedIn] = useState(false);
//   const [checkInTime, setCheckInTime] = useState<string | null>(null);
//   const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
//   const [weeklyHours, setWeeklyHours] = useState("0h 0m 0s");
//   const [currentShift, setCurrentShift] = useState("Not Set");
//   const [totalEmployees, setTotalEmployees] = useState(0);
//   const [allEmployees, setAllEmployees] = useState<any[]>([]);
//   const [isEmployeesModalVisible, setIsEmployeesModalVisible] = useState(false);
//   const [isAttendanceModalVisible, setIsAttendanceModalVisible] =
//     useState(false);
//   const [workingHours, setWorkingHours] = useState("0h 0m 0s");

//   const [attendanceRecords, setAttendanceRecords] = useState<
//     AttendanceRecord[]
//   >([]);
//   const [hasMarkedToday, setHasMarkedToday] = useState(false);

//   // Leave-related state variables
//   const [isLeaveModalVisible, setIsLeaveModalVisible] = useState(false);
//   const [leaveDates, setLeaveDates] = useState<
//     [Dayjs | null, Dayjs | null] | null
//   >(null);
//   const [leaveType, setLeaveType] = useState("");
//   const [leaveReason, setLeaveReason] = useState("");
//   const [recentLeaves, setRecentLeaves] = useState<LeaveRecord[]>([]);

//   useEffect(() => {
//     loadData();
//     checkAndMarkAbsent();

//     // Update current time every second
//     const timer = setInterval(() => {
//       updateWorkingHours();
//     }, 1000);

//     // Check for absent marking at midnight
//     const midnightCheck = setInterval(() => {
//       checkAndMarkAbsent();
//     }, 60000); // Check every minute

//     return () => {
//       clearInterval(timer);
//       clearInterval(midnightCheck);
//     };
//   }, []);

//   // Update working hours in real-time while checked in
//   useEffect(() => {
//     if (isCheckedIn && checkInTime && !checkOutTime) {
//       const interval = setInterval(() => {
//         const now = new Date();
//         const checkIn = new Date(checkInTime);
//         const diff = now.getTime() - checkIn.getTime();

//         const hours = Math.floor(diff / (1000 * 60 * 60));
//         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//         setWorkingHours(`${hours}h ${minutes}m ${seconds}s`);
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [isCheckedIn, checkInTime, checkOutTime]);

//   const getTodayDateString = () => {
//     const today = new Date();
//     return today.toLocaleDateString("en-US");
//   };

//   const checkAndMarkAbsent = () => {
//     const loggedInUserStr = localStorage.getItem("loggedInUser");
//     if (!loggedInUserStr) return;

//     const currentUser = JSON.parse(loggedInUserStr);
//     const todayDate = getTodayDateString();

//     const records: AttendanceRecord[] = JSON.parse(
//       localStorage.getItem("attendanceRecords") || "[]"
//     );

//     // Check if user has any record for today
//     const hasTodayRecord = records.some(
//       (record) => record.date === todayDate && record.name === currentUser.name
//     );

//     // If it's past midnight and no record exists, mark as absent for previous day
//     const now = new Date();
//     const currentHour = now.getHours();

//     if (!hasTodayRecord && currentHour === 0) {
//       const yesterday = new Date();
//       yesterday.setDate(yesterday.getDate() - 1);
//       const yesterdayDate = yesterday.toLocaleDateString("en-US");

//       const hasYesterdayRecord = records.some(
//         (record) =>
//           record.date === yesterdayDate && record.name === currentUser.name
//       );

//       if (!hasYesterdayRecord) {
//         const absentRecord: AttendanceRecord = {
//           id: Date.now(),
//           name: currentUser.name,
//           date: yesterdayDate,
//           checkIn: "-",
//           checkOut: "-",
//           workingTime: "-",
//           status: "absent",
//         };
//         records.push(absentRecord);
//         localStorage.setItem("attendanceRecords", JSON.stringify(records));
//       }
//     }
//   };

//   const loadData = () => {
//     // Load all registered employees
//     const employeesData = JSON.parse(localStorage.getItem("employees") || "[]");
//     setAllEmployees(employeesData);
//     setTotalEmployees(employeesData.length);

//     // Load logged in user
//     const loggedInUserStr = localStorage.getItem("loggedInUser");
//     let currentUser = null;

//     if (loggedInUserStr) {
//       currentUser = JSON.parse(loggedInUserStr);
//       setUserData({
//         name: currentUser.name || "User",
//         userRole: currentUser.userRole || "employee",
//         specificRole: currentUser.specificRole || "Employee",
//         shift: currentUser.shift,
//         customShift: currentUser.customShift,
//         weeklyHours: currentUser.weeklyHours,
//       });

//       // Set registered shift only for employees
//       if (currentUser.userRole === "employee") {
//         let shiftDisplay = "Not Set";
//         if (currentUser.shift) {
//           const shiftMap: any = {
//             morning: "Morning (6 AM - 2 PM)",
//             afternoon: "Afternoon (2 PM - 10 PM)",
//             evening: "Evening (10 PM - 6 AM)",
//           };
//           shiftDisplay =
//             currentUser.customShift ||
//             shiftMap[currentUser.shift] ||
//             currentUser.shift;
//         }
//         setCurrentShift(shiftDisplay);
//       }
//     }

//     // Load today's check-in data
//     const savedCheckIn = localStorage.getItem("checkInData");
//     if (savedCheckIn) {
//       const checkInData = JSON.parse(savedCheckIn);
//       const checkInDate = new Date(checkInData.checkInTime);
//       const today = new Date();
//       if (checkInDate.toDateString() === today.toDateString()) {
//         setIsCheckedIn(checkInData.isCheckedIn);
//         setCheckInTime(checkInData.checkInTime);
//         if (checkInData.checkOutTime) {
//           setCheckOutTime(checkInData.checkOutTime);
//         }
//       }
//     }

//     // Load all attendance records
//     const records: AttendanceRecord[] = JSON.parse(
//       localStorage.getItem("attendanceRecords") || "[]"
//     );
//     setAttendanceRecords(records);

//     // Check if user has marked attendance today
//     if (currentUser && currentUser.userRole === "employee") {
//       const todayDate = getTodayDateString();
//       const todayRecord = records.find(
//         (record) =>
//           record.date === todayDate &&
//           record.name === currentUser.name &&
//           record.status === "present"
//       );
//       setHasMarkedToday(!!todayRecord);
//     }

//     // Calculate weekly hours from all records (only for employees)
//     if (currentUser && currentUser.userRole === "employee") {
//       const oneWeekAgo = new Date();
//       oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//       let totalSeconds = 0;

//       records.forEach((record: AttendanceRecord) => {
//         const recordDate = new Date(record.date);
//         if (
//           recordDate >= oneWeekAgo &&
//           record.workingTime &&
//           record.workingTime !== "-" &&
//           record.name === currentUser.name &&
//           record.status === "present"
//         ) {
//           const [hours, minutes, seconds] = record.workingTime
//             .split(/[hms]/)
//             .map((s: string) => parseInt(s.trim()) || 0);
//           totalSeconds += hours * 3600 + minutes * 60 + seconds;
//         }
//       });

//       const hours = Math.floor(totalSeconds / 3600);
//       const minutes = Math.floor((totalSeconds % 3600) / 60);
//       const seconds = totalSeconds % 60;

//       // Show registered weekly hours target with actual worked hours
//       if (currentUser.weeklyHours) {
//         setWeeklyHours(
//           `${hours}h ${minutes}m / ${currentUser.weeklyHours}h target`
//         );
//       } else {
//         setWeeklyHours(`${hours}h ${minutes}m ${seconds}s`);
//       }
//     }
//   };

//   const updateWorkingHours = () => {
//     if (isCheckedIn && checkInTime && !checkOutTime) {
//       const now = new Date();
//       const checkIn = new Date(checkInTime);
//       const diff = now.getTime() - checkIn.getTime();

//       const hours = Math.floor(diff / (1000 * 60 * 60));
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//       setWorkingHours(`${hours}h ${minutes}m ${seconds}s`);
//     }
//   };

//   const handleCheckIn = () => {
//     if (userData.userRole !== "employee") {
//       message.error("Only employees can mark attendance!");
//       return;
//     }

//     // Check if user has already marked attendance today
//     if (hasMarkedToday) {
//       message.warning("You have already marked attendance for today!");
//       return;
//     }

//     const now = new Date();
//     const todayDate = getTodayDateString();

//     // Double check in localStorage
//     const records: AttendanceRecord[] = JSON.parse(
//       localStorage.getItem("attendanceRecords") || "[]"
//     );

//     const existingTodayRecord = records.find(
//       (record) =>
//         record.date === todayDate &&
//         record.name === userData.name &&
//         record.status === "present"
//     );

//     if (existingTodayRecord) {
//       message.warning("You have already marked attendance for today!");
//       setHasMarkedToday(true);
//       return;
//     }

//     setIsCheckedIn(true);
//     setCheckInTime(now.toISOString());
//     setCheckOutTime(null);
//     setWorkingHours("0h 0m 0s");

//     const checkInData = {
//       isCheckedIn: true,
//       checkInTime: now.toISOString(),
//       checkOutTime: null,
//     };

//     localStorage.setItem("checkInData", JSON.stringify(checkInData));

//     // Create attendance record immediately as "present"
//     const newRecord: AttendanceRecord = {
//       id: Date.now(),
//       name: userData.name,
//       date: todayDate,
//       checkIn: now.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       }),
//       checkOut: "In Progress",
//       workingTime: "0h 0m 0s",
//       status: "present",
//     };

//     records.push(newRecord);
//     localStorage.setItem("attendanceRecords", JSON.stringify(records));
//     setAttendanceRecords(records);
//     setHasMarkedToday(true);

//     message.success("Checked in successfully! Attendance marked as Present.");
//   };

//   const handleCheckOut = () => {
//     const now = new Date();
//     setCheckOutTime(now.toISOString());

//     if (checkInTime) {
//       const checkIn = new Date(checkInTime);
//       const diff = now.getTime() - checkIn.getTime();
//       const hours = Math.floor(diff / (1000 * 60 * 60));
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//       const workingTime = `${hours}h ${minutes}m ${seconds}s`;
//       const todayDate = getTodayDateString();

//       // Update existing attendance record
//       const records: AttendanceRecord[] = JSON.parse(
//         localStorage.getItem("attendanceRecords") || "[]"
//       );

//       const recordIndex = records.findIndex(
//         (record) =>
//           record.date === todayDate &&
//           record.name === userData.name &&
//           record.status === "present"
//       );

//       if (recordIndex !== -1) {
//         records[recordIndex].checkOut = now.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         });
//         records[recordIndex].workingTime = workingTime;
//         localStorage.setItem("attendanceRecords", JSON.stringify(records));
//         setAttendanceRecords(records);
//       }

//       // Update weekly hours
//       const oneWeekAgo = new Date();
//       oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

//       let totalSeconds = 0;
//       records.forEach((record: AttendanceRecord) => {
//         const recordDate = new Date(record.date);
//         if (
//           recordDate >= oneWeekAgo &&
//           record.workingTime &&
//           record.workingTime !== "-" &&
//           record.name === userData.name &&
//           record.status === "present"
//         ) {
//           const [h, m, s] = record.workingTime
//             .split(/[hms]/)
//             .map((str: string) => parseInt(str.trim()) || 0);
//           totalSeconds += h * 3600 + m * 60 + s;
//         }
//       });

//       const weekHours = Math.floor(totalSeconds / 3600);
//       const weekMinutes = Math.floor((totalSeconds % 3600) / 60);
//       const weekSeconds = totalSeconds % 60;

//       if (userData.weeklyHours) {
//         setWeeklyHours(
//           `${weekHours}h ${weekMinutes}m / ${userData.weeklyHours}h target`
//         );
//       } else {
//         setWeeklyHours(`${weekHours}h ${weekMinutes}m ${weekSeconds}s`);
//       }
//     }

//     const checkInData = {
//       isCheckedIn: false,
//       checkInTime: checkInTime,
//       checkOutTime: now.toISOString(),
//     };

//     localStorage.setItem("checkInData", JSON.stringify(checkInData));
//     setIsCheckedIn(false);
//     message.success("Checked out successfully!");
//   };

//   const handleViewEmployees = () => {
//     setIsEmployeesModalVisible(true);
//   };

//   const handleViewAttendance = () => {
//     // Load fresh attendance records
//     const records: AttendanceRecord[] = JSON.parse(
//       localStorage.getItem("attendanceRecords") || "[]"
//     );

//     if (userData.userRole === "admin") {
//       // For admin: show only employees who marked present
//       const presentRecords = records.filter(
//         (record) => record.status === "present"
//       );
//       setAttendanceRecords(presentRecords);
//     } else {
//       // For employee: show only their records
//       const userRecords = records.filter(
//         (record) => record.name === userData.name
//       );
//       setAttendanceRecords(userRecords);
//     }

//     setIsAttendanceModalVisible(true);
//   };

//   const exportToCSV = () => {
//     let recordsToExport: AttendanceRecord[] = [];

//     if (userData.userRole === "admin") {
//       recordsToExport = attendanceRecords.filter(
//         (record) => record.status === "present"
//       );
//     } else {
//       recordsToExport = attendanceRecords.filter(
//         (record) => record.name === userData.name
//       );
//     }

//     if (recordsToExport.length === 0) {
//       message.warning("No attendance records to export!");
//       return;
//     }

//     const headers = [
//       "Name",
//       "Date",
//       "Check In",
//       "Check Out",
//       "Working Hours",
//       "Status",
//     ];
//     const csvContent = [
//       headers.join(","),
//       ...recordsToExport.map((record: AttendanceRecord) =>
//         [
//           record.name,
//           record.date,
//           record.checkIn,
//           record.checkOut,
//           record.workingTime,
//           record.status.toUpperCase(),
//         ].join(",")
//       ),
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     link.setAttribute("href", url);
//     link.setAttribute(
//       "download",
//       `attendance_${userData.userRole === "admin" ? "all_present" : userData.name}_${new Date().toISOString().split("T")[0]}.csv`
//     );
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     message.success("Attendance exported successfully!");
//   };

//   const handleLeaveRequest = () => {
//     setIsLeaveModalVisible(true);
//   };

//   const handleLeaveSubmit = () => {
//     if (!leaveDates || !leaveType || !leaveReason) {
//       message.error("Please fill all fields!");
//       return;
//     }

//     const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
//     const newLeave = {
//       id: Date.now(),
//       name: userData.name,
//       dates: leaveDates,
//       leaveType,
//       reason: leaveReason,
//       status: "Pending",
//       date: new Date().toISOString(),
//     };
//     leaves.push(newLeave);
//     localStorage.setItem("leaveRequests", JSON.stringify(leaves));

//     message.success("Leave request submitted successfully!");
//     setIsLeaveModalVisible(false);
//     setLeaveDates(null);
//     setLeaveType("");
//     setLeaveReason("");

//     const daysDiff =
//       leaveDates && leaveDates[1]
//         ? Math.ceil(
//             (leaveDates[1].toDate().getTime() -
//               leaveDates[0]!.toDate().getTime()) /
//               (1000 * 60 * 60 * 24)
//           ) + 1
//         : 1;
//     setRecentLeaves([
//       ...recentLeaves,
//       {
//         id: newLeave.id,
//         days: daysDiff,
//         status: "Pending",
//         percentage: 0,
//       },
//     ]);
//   };

//   const employeeColumns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Department",
//       dataIndex: "specificRole",
//       key: "specificRole",
//     },
//     {
//       title: "Employment Type",
//       dataIndex: "employmentType",
//       key: "employmentType",
//       render: (type: string) => (
//         <span style={{ textTransform: "capitalize" }}>
//           {type === "fulltime" ? "Full Time" : "Part Time"}
//         </span>
//       ),
//     },
//     {
//       title: "Shift",
//       dataIndex: "shift",
//       key: "shift",
//       render: (shift: string) => {
//         const shiftNames: any = {
//           morning: "Morning (6 AM - 2 PM)",
//           afternoon: "Afternoon (2 PM - 10 PM)",
//           evening: "Evening (10 PM - 6 AM)",
//         };
//         return shiftNames[shift] || shift;
//       },
//     },
//     {
//       title: "Weekly Hours",
//       dataIndex: "weeklyHours",
//       key: "weeklyHours",
//       render: (hours: number) => `${hours} hours/week`,
//     },
//   ];

//   const attendanceColumns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       fixed: "left" as const,
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//     },
//     {
//       title: "Check In",
//       dataIndex: "checkIn",
//       key: "checkIn",
//     },
//     {
//       title: "Check Out",
//       dataIndex: "checkOut",
//       key: "checkOut",
//     },
//     {
//       title: "Working Hours",
//       dataIndex: "workingTime",
//       key: "workingTime",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status: string) => (
//         <Tag color={status === "present" ? "green" : "red"}>
//           {status.toUpperCase()}
//         </Tag>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Row gutter={[24, 16]}>
//         {(userData.userRole === "admin" ||
//           userData.userRole === "employee") && (
//           <Col xs={24} sm={12} lg={8}>
//             <Card style={{ borderRadius: "12px", height: "100%" }}>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <div>
//                   <Text type="secondary" style={{ fontSize: "14px" }}>
//                     Total Employees
//                   </Text>
//                   <Title
//                     level={2}
//                     style={{
//                       margin: "8px 0",
//                       fontSize: "36px",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {totalEmployees}
//                   </Title>
//                   <Text type="secondary" style={{ fontSize: "12px" }}>
//                     All departments
//                   </Text>
//                 </div>

//                 <div
//                   style={{
//                     width: "48px",
//                     height: "48px",
//                     background: "#e6f7ff",
//                     borderRadius: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <UserOutlined
//                     style={{ fontSize: "24px", color: "#1890ff" }}
//                   />
//                 </div>
//               </div>
//             </Card>
//           </Col>
//         )}

//         <Col xs={24} sm={12} lg={8}>
//           <Card style={{ borderRadius: "12px", height: "100%" }}>
//             <Title level={4} style={{ margin: "0 0 12px 0" }}>
//               Welcome back,
//               <br />
//               {userData.name}!
//             </Title>

//             {userData.userRole === "employee" && (
//               <>
//                 <Text
//                   type="secondary"
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     marginBottom: "4px",
//                   }}
//                 >
//                   Current Shift: {currentShift}
//                 </Text>
//                 <Text
//                   type="secondary"
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     marginBottom: "4px",
//                   }}
//                 >
//                   Weekly Hours: <strong>{weeklyHours}</strong>
//                 </Text>
//                 {hasMarkedToday && (
//                   <Tag color="green" style={{ marginTop: "8px" }}>
//                     Attendance Marked Today ✓
//                   </Tag>
//                 )}
//                 {isCheckedIn && (
//                   <Text
//                     style={{
//                       display: "block",
//                       fontSize: "14px",
//                       marginTop: "8px",
//                       color: "#52c41a",
//                       fontWeight: "600",
//                     }}
//                   >
//                     Current Session: <strong>{workingHours}</strong>
//                   </Text>
//                 )}
//               </>
//             )}

//             <Text
//               type="secondary"
//               style={{
//                 display: "block",
//                 fontSize: "13px",
//                 marginTop: "8px",
//               }}
//             >
//               Role:{" "}
//               {userData.userRole === "admin" ? "Administrator" : "Employee"}
//             </Text>
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} lg={8}>
//           <Card
//             title="Quick Actions"
//             style={{ borderRadius: "12px", height: "100%" }}
//           >
//             <Space
//               direction="vertical"
//               size="small"
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <Space
//                 direction="horizontal"
//                 size="small"
//                 style={{
//                   width: "100%",
//                   display: "flex",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 {userData.userRole === "employee" && (
//                   <>
//                     <Button
//                       type="primary"
//                       icon={
//                         isCheckedIn ? <LogoutOutlined /> : <LoginOutlined />
//                       }
//                       onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
//                       disabled={!isCheckedIn && hasMarkedToday}
//                       style={{
//                         flex: 1,
//                         border: "none",
//                         borderRadius: "20px",
//                         backgroundColor: "#10b981",
//                         borderColor: "#10b981",
//                         height: "45px",
//                         fontSize: "15px",
//                         color: "white",
//                       }}
//                     >
//                       {isCheckedIn
//                         ? "Check-Out"
//                         : hasMarkedToday
//                           ? "Checked In"
//                           : "Check-In"}
//                     </Button>

//                     <Button
//                       onClick={handleLeaveRequest}
//                       style={{
//                         flex: 1,
//                         height: "45px",
//                         fontSize: "15px",
//                         borderRadius: "20px",
//                         backgroundColor: "#E9ECEF",
//                         border: "none",
//                       }}
//                       onMouseEnter={(e) =>
//                         (e.currentTarget.style.color = "#333")
//                       }
//                       onMouseLeave={(e) =>
//                         (e.currentTarget.style.color = "#333")
//                       }
//                     >
//                       Request Leave
//                     </Button>
//                   </>
//                 )}
//               </Space>

//               <Button
//                 block
//                 onClick={handleViewAttendance}
//                 style={{
//                   width: "100%",
//                   background: "transparent",
//                   backgroundColor: "#D8EEFF",
//                   borderRadius: "20px",
//                   height: "45px",
//                   fontSize: "15px",
//                   border: "none",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#333")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
//               >
//                 View Attendance
//               </Button>
//             </Space>
//           </Card>
//         </Col>
//       </Row>

//       {/* Leave Modal */}
//       <Modal
//         title="Request Leave"
//         open={isLeaveModalVisible}
//         onCancel={() => {
//           setIsLeaveModalVisible(false);
//           setLeaveDates(null);
//           setLeaveType("");
//           setLeaveReason("");
//         }}
//         onOk={handleLeaveSubmit}
//         okText="Submit Request"
//         okButtonProps={{
//           style: {
//             background: "linear-gradient(135deg, #00D4B1, #0066FF)",
//             border: "none",
//           },
//         }}
//       >
//         <Space
//           direction="vertical"
//           size="middle"
//           style={{ width: "100%", marginTop: "20px" }}
//         >
//           {userData.userRole !== "employee" && (
//             <Text
//               type="secondary"
//               style={{
//                 textAlign: "center",
//                 display: "block",
//                 marginBottom: "12px",
//               }}
//             >
//               Attendance marking is only available for employees
//             </Text>
//           )}
//           <div>
//             <Text strong>Leave Duration</Text>
//             <RangePicker
//               style={{ width: "100%", marginTop: "8px" }}
//               onChange={(dates) =>
//                 setLeaveDates(dates as [Dayjs | null, Dayjs | null] | null)
//               }
//             />
//           </div>

//           <div>
//             <Text strong>Leave Type</Text>
//             <Select
//               placeholder="Select leave type"
//               style={{ width: "100%", marginTop: "8px" }}
//               value={leaveType}
//               onChange={(value) => setLeaveType(value)}
//             >
//               <Option value="annual">Annual Leave</Option>
//               <Option value="sick">Sick Leave</Option>
//               <Option value="casual">Casual Leave</Option>
//               <Option value="emergency">Emergency Leave</Option>
//             </Select>
//           </div>

//           <div>
//             <Text strong>Reason</Text>
//             <TextArea
//               rows={4}
//               placeholder="Enter reason for leave"
//               style={{ marginTop: "8px" }}
//               value={leaveReason}
//               onChange={(e) => setLeaveReason(e.target.value)}
//             />
//           </div>
//         </Space>
//       </Modal>

//       {/* Employees Modal */}
//       <Modal
//         title="All Registered Employees"
//         open={isEmployeesModalVisible}
//         onCancel={() => setIsEmployeesModalVisible(false)}
//         footer={[
//           <Button key="close" onClick={() => setIsEmployeesModalVisible(false)}>
//             Close
//           </Button>,
//         ]}
//         width={1000}
//       >
//         <Table
//           columns={employeeColumns}
//           dataSource={allEmployees}
//           rowKey={(record) => record.email}
//           pagination={{ pageSize: 10 }}
//           scroll={{ x: 800 }}
//         />
//       </Modal>

//       {/* Attendance Modal */}
//       <Modal
//         title={
//           userData.userRole === "admin"
//             ? "Attendance Records - All Present Employees"
//             : `Attendance Records - ${userData.name}`
//         }
//         open={isAttendanceModalVisible}
//         onCancel={() => setIsAttendanceModalVisible(false)}
//         footer={[
//           <Button
//             key="export"
//             onClick={exportToCSV}
//             style={{
//               background: "linear-gradient(135deg, #00D4B1, #0066FF)",
//               color: "white",
//               border: "none",
//             }}
//           >
//             Export to CSV
//           </Button>,
//           <Button
//             key="close"
//             onClick={() => setIsAttendanceModalVisible(false)}
//           >
//             Close
//           </Button>,
//         ]}
//         width={900}
//       >
//         <Table
//           columns={attendanceColumns}
//           dataSource={attendanceRecords}
//           rowKey="id"
//           pagination={{ pageSize: 10 }}
//           scroll={{ x: 700 }}
//         />
//       </Modal>
//     </>
//   );
// };

// export default QuickStatsCards;

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
  const [loading, setLoading] = useState(false);

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
      const response = await axiosInstance.get("/employees/list");
      if (response.data.success) {
        setAllEmployees(response.data.data.employees);
        setTotalEmployees(response.data.data.count);
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
      setLoading(true);
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
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  const handleViewAttendance = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
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
                      loading={loading}
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
                loading={loading}
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
