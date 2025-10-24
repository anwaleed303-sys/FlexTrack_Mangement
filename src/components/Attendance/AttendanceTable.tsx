// // import React from "react";
// // import { Table, Tag } from "antd";

// // const AttendanceTable: React.FC = () => {
// //   const data = [
// //     {
// //       key: "1",
// //       name: "John Doe",
// //       date: "2025-10-21",
// //       checkIn: "09:00 AM",
// //       checkOut: "05:30 PM",
// //       status: "Present",
// //     },
// //     {
// //       key: "2",
// //       name: "Jane Smith",
// //       date: "2025-10-21",
// //       checkIn: "09:15 AM",
// //       checkOut: "05:45 PM",
// //       status: "Late",
// //     },
// //   ];
// //   const columns = [
// //     { title: "Employee", dataIndex: "name", key: "name" },
// //     { title: "Date", dataIndex: "date", key: "date" },
// //     { title: "Check In", dataIndex: "checkIn", key: "checkIn" },
// //     { title: "Check Out", dataIndex: "checkOut", key: "checkOut" },
// //     {
// //       title: "Status",
// //       dataIndex: "status",
// //       key: "status",
// //       render: (status: string) => (
// //         <Tag color={status === "Present" ? "green" : "orange"}>{status}</Tag>
// //       ),
// //     },
// //   ];
// //   return <Table columns={columns} dataSource={data} />;
// // };
// // export default AttendanceTable;

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Button,
//   Space,
//   Typography,
//   Row,
//   Col,
//   Modal,
//   DatePicker,
//   Select,
//   Input,
//   message,
//   Progress,
// } from "antd";
// import {
//   ClockCircleOutlined,
//   LoginOutlined,
//   LogoutOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;

// export default function Dashboard() {
//   const [userData, setUserData] = useState({
//     name: "User",
//     userRole: "employee",
//     specificRole: "Employee",
//   });
//   const [isCheckedIn, setIsCheckedIn] = useState(false);
//   const [checkInTime, setCheckInTime] = useState(null);
//   const [checkOutTime, setCheckOutTime] = useState(null);
//   const [weeklyHours, setWeeklyHours] = useState("0h 0m");
//   const [currentShift, setCurrentShift] = useState("Morning (09:00)");
//   const [totalEmployees, setTotalEmployees] = useState(326);
//   const [isLeaveModalVisible, setIsLeaveModalVisible] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   // Leave form state
//   const [leaveDates, setLeaveDates] = useState(null);
//   const [leaveType, setLeaveType] = useState("");
//   const [leaveReason, setLeaveReason] = useState("");

//   // Weekly attendance data
//   const weeklyAttendance = [
//     { day: "Mon", present: 120, absent: 90 },
//     { day: "Tue", present: 125, absent: 95 },
//     { day: "Wed", present: 135, absent: 100 },
//     { day: "Fri", present: 125, absent: 105 },
//     { day: "Sat", present: 130, absent: 110 },
//     { day: "Sat", present: 140, absent: 120 },
//     { day: "Sun", present: 145, absent: 125 },
//   ];

//   // My attendance snapshot data
//   const myAttendance = [
//     { day: "Mon", hours: 8 },
//     { day: "Wed", hours: 7.5 },
//     { day: "Tue", hours: 9 },
//   ];

//   const [recentLeaves, setRecentLeaves] = useState([
//     { id: 1, days: 3, status: "Approved", percentage: 12 },
//   ]);

//   const upcomingShifts = [
//     { type: "Annual Leave", time: "09:00 - 17:AM", approved: true },
//     { type: "Sick Leave", time: "3 days: 7 day", approved: true },
//   ];

//   useEffect(() => {
//     const loggedInUser = localStorage.getItem("loggedInUser");
//     if (loggedInUser) {
//       const user = JSON.parse(loggedInUser);
//       setUserData({
//         name: user.name || "User",
//         userRole: user.userRole || "employee",
//         specificRole: user.specificRole || "Employee",
//       });
//     }

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

//     const savedWeeklyHours = localStorage.getItem("weeklyHours");
//     if (savedWeeklyHours) {
//       setWeeklyHours(savedWeeklyHours);
//     }

//     const hour = new Date().getHours();
//     if (hour >= 9 && hour < 17) {
//       setCurrentShift("Morning (09:00)");
//     } else if (hour >= 17 && hour < 22) {
//       setCurrentShift("Evening (17:00)");
//     } else {
//       setCurrentShift("Night (22:00)");
//     }

//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleCheckIn = () => {
//     const now = new Date();
//     setIsCheckedIn(true);
//     setCheckInTime(now.toISOString());

//     const checkInData = {
//       isCheckedIn: true,
//       checkInTime: now.toISOString(),
//       checkOutTime: null,
//     };

//     localStorage.setItem("checkInData", JSON.stringify(checkInData));
//     message.success("Checked in successfully!");
//   };

//   const handleCheckOut = () => {
//     const now = new Date();
//     setCheckOutTime(now.toISOString());

//     if (checkInTime) {
//       const checkIn = new Date(checkInTime);
//       const diff = now - checkIn;
//       const hours = Math.floor(diff / (1000 * 60 * 60));
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

//       const currentWeeklyHours = localStorage.getItem("weeklyHours") || "0h 0m";
//       const matches = currentWeeklyHours.match(/\d+/g);
//       const currentH = matches ? parseInt(matches[0]) : 0;
//       const currentM = matches && matches[1] ? parseInt(matches[1]) : 0;
//       const totalMinutes = currentH * 60 + currentM + (hours * 60 + minutes);
//       const newHours = Math.floor(totalMinutes / 60);
//       const newMinutes = totalMinutes % 60;
//       const newWeeklyHours = `${newHours}h ${newMinutes}m`;

//       setWeeklyHours(newWeeklyHours);
//       localStorage.setItem("weeklyHours", newWeeklyHours);
//     }

//     const checkInData = {
//       isCheckedIn: false,
//       checkInTime: checkInTime,
//       checkOutTime: now.toISOString(),
//     };

//     localStorage.setItem("checkInData", JSON.stringify(checkInData));
//     setIsCheckedIn(false);
//     message.success(`Checked out successfully!`);
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
//         ? Math.ceil((leaveDates[1] - leaveDates[0]) / (1000 * 60 * 60 * 24)) + 1
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

//   return (
//     <div style={{ padding: "20px", background: "#f0f2f5", minHeight: "100vh" }}>
//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12} lg={8}>
//           <Card style={{ borderRadius: "12px", height: "100%" }}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "flex-start",
//               }}
//             >
//               <div>
//                 <Text type="secondary" style={{ fontSize: "14px" }}>
//                   Total Employees
//                 </Text>
//                 <Title
//                   level={2}
//                   style={{
//                     margin: "8px 0",
//                     fontSize: "36px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {totalEmployees}
//                 </Title>
//                 <Text type="secondary" style={{ fontSize: "12px" }}>
//                   All departments
//                 </Text>
//               </div>
//               <div
//                 style={{
//                   width: "48px",
//                   height: "48px",
//                   background: "#e6f7ff",
//                   borderRadius: "12px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <UserOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
//               </div>
//             </div>
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} lg={8}>
//           <Card style={{ borderRadius: "12px", height: "100%" }}>
//             <Title level={4} style={{ margin: "0 0 12px 0" }}>
//               Welcome back,
//               <br />
//               {userData.name}!
//             </Title>
//             <Text
//               type="secondary"
//               style={{ display: "block", fontSize: "13px" }}
//             >
//               Current Shift: {currentShift}
//             </Text>
//             <Text
//               type="secondary"
//               style={{ display: "block", fontSize: "13px" }}
//             >
//               Weekly Hours: <strong>{weeklyHours}</strong>
//             </Text>
//           </Card>
//         </Col>

//         <Col xs={24} lg={8}>
//           <Card
//             title="Quick Actions"
//             style={{ borderRadius: "12px", height: "100%" }}
//           >
//             <Space direction="vertical" size="middle" style={{ width: "100%" }}>
//               <Space wrap>
//                 <Button
//                   type="primary"
//                   icon={isCheckedIn ? <LogoutOutlined /> : <LoginOutlined />}
//                   onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
//                   style={{
//                     background: "linear-gradient(135deg, #00D4B1, #0066FF)",
//                     border: "none",
//                   }}
//                 >
//                   {isCheckedIn ? "Check-Out" : "Check-in / Cout"}
//                 </Button>
//                 <Button onClick={handleLeaveRequest}>Request Leave</Button>
//               </Space>
//               <Space wrap>
//                 <Button>View My Attendance</Button>
//               </Space>
//             </Space>
//           </Card>
//         </Col>

//         <Col xs={24} lg={12}>
//           <Card title="This Week's Attendance" style={{ borderRadius: "12px" }}>
//             <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
//               <span
//                 style={{ display: "flex", alignItems: "center", gap: "4px" }}
//               >
//                 <div
//                   style={{
//                     width: "12px",
//                     height: "12px",
//                     background: "#00D4B1",
//                     borderRadius: "2px",
//                   }}
//                 ></div>
//                 <Text style={{ fontSize: "12px" }}>present</Text>
//               </span>
//               <span
//                 style={{ display: "flex", alignItems: "center", gap: "4px" }}
//               >
//                 <div
//                   style={{
//                     width: "12px",
//                     height: "12px",
//                     background: "#ff7875",
//                     borderRadius: "2px",
//                   }}
//                 ></div>
//                 <Text style={{ fontSize: "12px" }}>absent</Text>
//               </span>
//             </div>
//             <ResponsiveContainer width="100%" height={200}>
//               <LineChart data={weeklyAttendance}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis dataKey="day" style={{ fontSize: "12px" }} />
//                 <YAxis style={{ fontSize: "12px" }} />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="present"
//                   stroke="#00D4B1"
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="absent"
//                   stroke="#ff7875"
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </Card>
//         </Col>

//         <Col xs={24} lg={12}>
//           <Card title="My Attendance Snapshot" style={{ borderRadius: "12px" }}>
//             <ResponsiveContainer width="100%" height={120}>
//               <LineChart data={myAttendance}>
//                 <Line
//                   type="monotone"
//                   dataKey="hours"
//                   stroke="#00D4B1"
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                 />
//                 <XAxis dataKey="day" style={{ fontSize: "10px" }} />
//               </LineChart>
//             </ResponsiveContainer>
//             <div style={{ marginTop: "16px" }}>
//               <Text strong>Tomorrow: </Text>
//               <Text type="secondary">Morning Shift (09:00 - 17:00)</Text>
//             </div>
//             <div
//               style={{
//                 marginTop: "12px",
//                 padding: "12px",
//                 background: "#f5f5f5",
//                 borderRadius: "8px",
//               }}
//             >
//               <Text
//                 type="secondary"
//                 style={{ fontSize: "12px", display: "block" }}
//               >
//                 Last Check-in:{" "}
//                 {checkInTime
//                   ? new Date(checkInTime).toLocaleString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       hour12: true,
//                     })
//                   : "Not checked in yet"}
//               </Text>
//               <Text
//                 strong
//                 style={{ fontSize: "14px", marginTop: "4px", display: "block" }}
//               >
//                 Last Check-in:
//                 <br />
//                 Today{" "}
//                 {checkInTime
//                   ? new Date(checkInTime).toLocaleTimeString("en-US", {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       hour12: true,
//                     })
//                   : "09:02 AM"}
//               </Text>
//             </div>
//           </Card>
//         </Col>

//         <Col xs={24} lg={12}>
//           <Card title="Upcoming Shifts" style={{ borderRadius: "12px" }}>
//             <Space direction="vertical" size="middle" style={{ width: "100%" }}>
//               {upcomingShifts.map((shift, index) => (
//                 <div key={index}>
//                   <Text strong>{shift.type}</Text>
//                   <Text
//                     type="secondary"
//                     style={{ display: "block", fontSize: "12px" }}
//                   >
//                     {shift.time} - {shift.approved ? "Approved" : "Pending"}
//                   </Text>
//                 </div>
//               ))}
//             </Space>
//           </Card>
//         </Col>

//         <Col xs={24} lg={12}>
//           <Card title="Recent Leave Requests" style={{ borderRadius: "12px" }}>
//             {recentLeaves.map((leave) => (
//               <div
//                 key={leave.id}
//                 style={{ display: "flex", alignItems: "center", gap: "16px" }}
//               >
//                 <Progress
//                   type="circle"
//                   percent={leave.percentage}
//                   width={60}
//                   strokeColor={{
//                     "0%": "#0066FF",
//                     "100%": "#00D4B1",
//                   }}
//                 />
//                 <div>
//                   <Text strong>
//                     {leave.days} days: {leave.status}
//                   </Text>
//                   <Text
//                     type="secondary"
//                     style={{ display: "block", fontSize: "12px" }}
//                   >
//                     {leave.percentage}%
//                   </Text>
//                 </div>
//               </div>
//             ))}
//           </Card>
//         </Col>

//         <Col xs={24}>
//           <Card
//             title="Important Announcements"
//             style={{ borderRadius: "12px" }}
//           >
//             <Text strong>Holiday Schedule Update:</Text>
//             <Text
//               type="secondary"
//               style={{ display: "block", fontSize: "12px" }}
//             >
//               December 25th - 1st
//             </Text>
//           </Card>
//         </Col>
//       </Row>

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
//           <div>
//             <Text strong>Leave Duration</Text>
//             <RangePicker
//               style={{ width: "100%", marginTop: "8px" }}
//               onChange={(dates) => setLeaveDates(dates)}
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
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Button,
//   Space,
//   Typography,
//   Row,
//   Col,
//   Modal,
//   DatePicker,
//   Select,
//   Input,
//   message,
//   Progress,
//   Table,
// } from "antd";
// import {
//   ClockCircleOutlined,
//   LoginOutlined,
//   LogoutOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import type { Dayjs } from "dayjs";

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;

// interface AttendanceRecord {
//   id: number;
//   date: string;
//   checkIn: string;
//   checkOut: string;
//   workingTime: string;
// }

// interface UserData {
//   name: string;
//   userRole: string;
//   specificRole: string;
// }

// export default function Dashboard() {
//   const [userData, setUserData] = useState<UserData>({
//     name: "User",
//     userRole: "employee",
//     specificRole: "Employee",
//   });

//   const [isCheckedIn, setIsCheckedIn] = useState(false);
//   const [checkInTime, setCheckInTime] = useState<string | null>(null);
//   const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
//   const [weeklyHours, setWeeklyHours] = useState("0h 0m 0s");
//   const [currentShift, setCurrentShift] = useState("Morning (09:00)");
//   const [totalEmployees, setTotalEmployees] = useState(0);
//   const [isLeaveModalVisible, setIsLeaveModalVisible] = useState(false);
//   const [isAttendanceModalVisible, setIsAttendanceModalVisible] =
//     useState(false);
//   const [allEmployees, setAllEmployees] = useState<any[]>([]);
//   const [isEmployeesModalVisible, setIsEmployeesModalVisible] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [workingHours, setWorkingHours] = useState("0h 0m 0s");
//   const [attendanceRecords, setAttendanceRecords] = useState<
//     AttendanceRecord[]
//   >([]);

//   // Leave form state
//   const [leaveDates, setLeaveDates] = useState<
//     [Dayjs | null, Dayjs | null] | null
//   >(null);
//   const [leaveType, setLeaveType] = useState("");
//   const [leaveReason, setLeaveReason] = useState("");

//   // Static weekly attendance data
//   const weeklyAttendance = [
//     { day: "Mon", present: 285, absent: 41 },
//     { day: "Tue", present: 298, absent: 28 },
//     { day: "Wed", present: 310, absent: 16 },
//     { day: "Thu", present: 302, absent: 24 },
//     { day: "Fri", present: 295, absent: 31 },
//     { day: "Sat", present: 268, absent: 58 },
//     { day: "Sun", present: 245, absent: 81 },
//   ];

//   // Static my attendance data
//   const myAttendance = [
//     { day: "Mon", hours: 8.5 },
//     { day: "Tue", hours: 7.5 },
//     { day: "Wed", hours: 9 },
//   ];

//   const [recentLeaves, setRecentLeaves] = useState([
//     { id: 1, days: 3, status: "Approved", percentage: 12 },
//   ]);

//   const upcomingShifts = [
//     { type: "Annual Leave", time: "09:00 - 17:AM", approved: true },
//     { type: "Sick Leave", time: "3 days: 7 day", approved: true },
//   ];

//   useEffect(() => {
//     // Load all registered employees
//     const employeesData = JSON.parse(localStorage.getItem("employees") || "[]");
//     setAllEmployees(employeesData);
//     setTotalEmployees(employeesData.length);

//     // Load logged in user
//     const loggedInUserStr = localStorage.getItem("loggedInUser");
//     let currentUser = null; // Store user for reuse

//     if (loggedInUserStr) {
//       currentUser = JSON.parse(loggedInUserStr);
//       setUserData({
//         name: currentUser.name || "User",
//         userRole: currentUser.userRole || "employee",
//         specificRole: currentUser.specificRole || "Employee",
//       });

//       // Set registered shift
//       let shiftDisplay = "Not Set";
//       if (currentUser.shift) {
//         const shiftMap: any = {
//           morning: "Morning (6 AM - 2 PM)",
//           afternoon: "Afternoon (2 PM - 10 PM)",
//           evening: "Evening (10 PM - 6 AM)",
//         };
//         shiftDisplay =
//           currentUser.customShift ||
//           shiftMap[currentUser.shift] ||
//           currentUser.shift;
//       }
//       setCurrentShift(shiftDisplay);
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

//     // Calculate weekly hours from all records
//     const oneWeekAgo = new Date();
//     oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//     let totalSeconds = 0;
//     records.forEach((record: AttendanceRecord) => {
//       const recordDate = new Date(record.date);
//       if (recordDate >= oneWeekAgo && record.workingTime) {
//         const [hours, minutes, seconds] = record.workingTime
//           .split(/[hms]/)
//           .map((s: string) => parseInt(s.trim()) || 0);
//         totalSeconds += hours * 3600 + minutes * 60 + seconds;
//       }
//     });

//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;

//     // Show registered weekly hours target with actual worked hours
//     if (currentUser && currentUser.weeklyHours) {
//       setWeeklyHours(
//         `${hours}h ${minutes}m / ${currentUser.weeklyHours}h target`
//       );
//     } else {
//       setWeeklyHours(`${hours}h ${minutes}m ${seconds}s`);
//     }

//     // Update current time every second
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
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

//   const handleCheckIn = () => {
//     const now = new Date();
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
//     message.success("Checked in successfully!");
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

//       // Save attendance record
//       const records: AttendanceRecord[] = JSON.parse(
//         localStorage.getItem("attendanceRecords") || "[]"
//       );
//       const newRecord: AttendanceRecord = {
//         id: Date.now(),
//         date: new Date().toLocaleDateString("en-US"),
//         checkIn: new Date(checkInTime).toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         }),
//         checkOut: now.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         }),
//         workingTime: workingTime,
//       };
//       records.push(newRecord);
//       localStorage.setItem("attendanceRecords", JSON.stringify(records));
//       setAttendanceRecords(records);

//       // Update weekly hours
//       const oneWeekAgo = new Date();
//       oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

//       let totalSeconds = 0;
//       records.forEach((record: AttendanceRecord) => {
//         const recordDate = new Date(record.date);
//         if (recordDate >= oneWeekAgo && record.workingTime) {
//           const [h, m, s] = record.workingTime
//             .split(/[hms]/)
//             .map((str: string) => parseInt(str.trim()) || 0);
//           totalSeconds += h * 3600 + m * 60 + s;
//         }
//       });

//       const weekHours = Math.floor(totalSeconds / 3600);
//       const weekMinutes = Math.floor((totalSeconds % 3600) / 60);
//       const weekSeconds = totalSeconds % 60;
//       const newWeeklyHours = `${weekHours}h ${weekMinutes}m ${weekSeconds}s`;
//       setWeeklyHours(newWeeklyHours);
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

//   const handleViewAttendance = () => {
//     setIsAttendanceModalVisible(true);
//   };

//   const exportToCSV = () => {
//     if (attendanceRecords.length === 0) {
//       message.warning("No attendance records to export!");
//       return;
//     }

//     const headers = ["Date", "Check In", "Check Out", "Working Hours"];
//     const csvContent = [
//       headers.join(","),
//       ...attendanceRecords.map((record: AttendanceRecord) =>
//         [record.date, record.checkIn, record.checkOut, record.workingTime].join(
//           ","
//         )
//       ),
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     link.setAttribute("href", url);
//     link.setAttribute(
//       "download",
//       `attendance_${new Date().toISOString().split("T")[0]}.csv`
//     );
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     message.success("Attendance exported successfully!");
//   };

//   const attendanceColumns = [
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
//   ];

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

//   // Add function to handle view employees
//   const handleViewEmployees = () => {
//     setIsEmployeesModalVisible(true);
//   };
//   return (
//     <div style={{ padding: "20px", background: "#f0f2f5", minHeight: "100vh" }}>
//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12} lg={8}>
//           <Card style={{ borderRadius: "12px", height: "100%" }}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "flex-start",
//               }}
//             >
//               <div>
//                 <Text type="secondary" style={{ fontSize: "14px" }}>
//                   Total Employees
//                 </Text>
//                 <Title
//                   level={2}
//                   style={{
//                     margin: "8px 0",
//                     fontSize: "36px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {totalEmployees}
//                 </Title>
//                 <Text type="secondary" style={{ fontSize: "12px" }}>
//                   All departments
//                 </Text>
//                 <br /> <br />
//                 <Button onClick={handleViewEmployees}>
//                   View All Employees
//                 </Button>
//               </div>

//               <div
//                 style={{
//                   width: "48px",
//                   height: "48px",
//                   background: "#e6f7ff",
//                   borderRadius: "12px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <UserOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
//               </div>
//             </div>
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} lg={8}>
//           <Card style={{ borderRadius: "12px", height: "100%" }}>
//             <Title level={4} style={{ margin: "0 0 12px 0" }}>
//               Welcome back,
//               <br />
//               {userData.name}!
//             </Title>
//             <Text
//               type="secondary"
//               style={{
//                 display: "block",
//                 fontSize: "13px",
//                 marginBottom: "4px",
//               }}
//             >
//               Current Shift: {currentShift}
//             </Text>
//             <Text
//               type="secondary"
//               style={{
//                 display: "block",
//                 fontSize: "13px",
//                 marginBottom: "4px",
//               }}
//             >
//               Weekly Hours: <strong>{weeklyHours}</strong>
//             </Text>
//             {isCheckedIn && (
//               <Text
//                 style={{
//                   display: "block",
//                   fontSize: "14px",
//                   marginTop: "8px",
//                   color: "#52c41a",
//                   fontWeight: "600",
//                 }}
//               >
//                 Current Session: <strong>{workingHours}</strong>
//               </Text>
//             )}
//           </Card>
//         </Col>

//         <Col xs={24} lg={8}>
//           <Card
//             title="Quick Actions"
//             style={{ borderRadius: "12px", height: "100%" }}
//           >
//             <Space direction="vertical" size="middle" style={{ width: "100%" }}>
//               <Space wrap>
//                 <Button
//                   type="primary"
//                   icon={isCheckedIn ? <LogoutOutlined /> : <LoginOutlined />}
//                   onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
//                   style={{
//                     background: "linear-gradient(135deg, #00D4B1, #0066FF)",
//                     border: "none",
//                   }}
//                 >
//                   {isCheckedIn ? "Check-Out" : "Check-In"}
//                 </Button>
//                 <Button onClick={handleLeaveRequest}>Request Leave</Button>
//               </Space>
//               <Space wrap>
//                 <Button onClick={handleViewAttendance}>
//                   View My Attendance
//                 </Button>
//               </Space>
//             </Space>
//           </Card>
//         </Col>

//         <Col xs={24} lg={12}>
//           <Card title="This Week's Attendance" style={{ borderRadius: "12px" }}>
//             <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
//               <span
//                 style={{ display: "flex", alignItems: "center", gap: "4px" }}
//               >
//                 <div
//                   style={{
//                     width: "12px",
//                     height: "12px",
//                     background: "#00D4B1",
//                     borderRadius: "2px",
//                   }}
//                 ></div>
//                 <Text style={{ fontSize: "12px" }}>present</Text>
//               </span>
//               <span
//                 style={{ display: "flex", alignItems: "center", gap: "4px" }}
//               >
//                 <div
//                   style={{
//                     width: "12px",
//                     height: "12px",
//                     background: "#ff7875",
//                     borderRadius: "2px",
//                   }}
//                 ></div>
//                 <Text style={{ fontSize: "12px" }}>absent</Text>
//               </span>
//             </div>
//             <ResponsiveContainer width="100%" height={200}>
//               <LineChart data={weeklyAttendance}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis dataKey="day" style={{ fontSize: "12px" }} />
//                 <YAxis style={{ fontSize: "12px" }} />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="present"
//                   stroke="#00D4B1"
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="absent"
//                   stroke="#ff7875"
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </Card>
//         </Col>

//         <Col xs={24} lg={12}>
//           <Card title="My Attendance Snapshot" style={{ borderRadius: "12px" }}>
//             <ResponsiveContainer width="100%" height={120}>
//               <LineChart data={myAttendance}>
//                 <Line
//                   type="monotone"
//                   dataKey="hours"
//                   stroke="#00D4B1"
//                   strokeWidth={3}
//                   dot={{ r: 5, fill: "#00D4B1" }}
//                 />
//                 <XAxis
//                   dataKey="day"
//                   style={{ fontSize: "11px" }}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <YAxis hide />
//               </LineChart>
//             </ResponsiveContainer>
//             <div style={{ marginTop: "16px" }}>
//               <Text strong>Tomorrow: </Text>
//               <Text type="secondary">Morning Shift (09:00 - 17:00)</Text>
//             </div>
//             <div
//               style={{
//                 marginTop: "12px",
//                 padding: "12px",
//                 background: "#f5f5f5",
//                 borderRadius: "8px",
//               }}
//             >
//               <Text
//                 strong
//                 style={{
//                   fontSize: "14px",
//                   display: "block",
//                   marginBottom: "4px",
//                 }}
//               >
//                 Last Check-in:
//               </Text>
//               <Text
//                 type="secondary"
//                 style={{ fontSize: "13px", display: "block" }}
//               >
//                 {checkInTime
//                   ? `Today ${new Date(checkInTime).toLocaleTimeString("en-US", {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       hour12: true,
//                     })}`
//                   : "Not checked in yet"}
//               </Text>
//             </div>
//           </Card>
//         </Col>

//         <Col xs={24} lg={12}>
//           <Card title="Upcoming Shifts" style={{ borderRadius: "12px" }}>
//             <Space direction="vertical" size="middle" style={{ width: "100%" }}>
//               {upcomingShifts.map((shift, index) => (
//                 <div key={index}>
//                   <Text strong>{shift.type}</Text>
//                   <Text
//                     type="secondary"
//                     style={{ display: "block", fontSize: "12px" }}
//                   >
//                     {shift.time} - {shift.approved ? "Approved" : "Pending"}
//                   </Text>
//                 </div>
//               ))}
//             </Space>
//           </Card>
//         </Col>

//         <Col xs={24} lg={12}>
//           <Card title="Recent Leave Requests" style={{ borderRadius: "12px" }}>
//             {recentLeaves.map((leave) => (
//               <div
//                 key={leave.id}
//                 style={{ display: "flex", alignItems: "center", gap: "16px" }}
//               >
//                 <Progress
//                   type="circle"
//                   percent={leave.percentage}
//                   width={60}
//                   strokeColor={{
//                     "0%": "#0066FF",
//                     "100%": "#00D4B1",
//                   }}
//                 />
//                 <div>
//                   <Text strong>
//                     {leave.days} days: {leave.status}
//                   </Text>
//                   <Text
//                     type="secondary"
//                     style={{ display: "block", fontSize: "12px" }}
//                   >
//                     {leave.percentage}%
//                   </Text>
//                 </div>
//               </div>
//             ))}
//           </Card>
//         </Col>

//         <Col xs={24}>
//           <Card
//             title="Important Announcements"
//             style={{ borderRadius: "12px" }}
//           >
//             <Text strong>Holiday Schedule Update:</Text>
//             <Text
//               type="secondary"
//               style={{ display: "block", fontSize: "12px" }}
//             >
//               December 25th - 1st
//             </Text>
//           </Card>
//         </Col>
//       </Row>

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
//           <div>
//             <Text strong>Leave Duration</Text>
//             <RangePicker
//               style={{ width: "100%", marginTop: "8px" }}
//               onChange={(dates) => setLeaveDates(dates)}
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

//       <Modal
//         title="My Attendance Records"
//         open={isAttendanceModalVisible}
//         onCancel={() => setIsAttendanceModalVisible(false)}
//         footer={[
//           <Button key="export" onClick={exportToCSV} type="primary">
//             Export to CSV
//           </Button>,
//           <Button
//             key="close"
//             onClick={() => setIsAttendanceModalVisible(false)}
//           >
//             Close
//           </Button>,
//         ]}
//         width={800}
//       >
//         <Table
//           columns={attendanceColumns}
//           dataSource={attendanceRecords}
//           rowKey="id"
//           pagination={{ pageSize: 10 }}
//           scroll={{ x: 600 }}
//         />
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
//     </div>
//   );
// }

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
  Progress,
} from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData>({
    name: "User",
    userRole: "employee",
    specificRole: "Employee",
  });

  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [isLeaveModalVisible, setIsLeaveModalVisible] = useState(false);

  // Leave form state
  const [leaveDates, setLeaveDates] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const [leaveType, setLeaveType] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  // Static weekly attendance data
  const weeklyAttendance = [
    { day: "Mon", present: 285, absent: 41 },
    { day: "Tue", present: 298, absent: 28 },
    { day: "Wed", present: 310, absent: 16 },
    { day: "Thu", present: 302, absent: 24 },
    { day: "Fri", present: 295, absent: 31 },
    { day: "Sat", present: 268, absent: 58 },
    { day: "Sun", present: 245, absent: 81 },
  ];

  // Static my attendance data
  const myAttendance = [
    { day: "Mon", hours: 8.5 },
    { day: "Tue", hours: 7.5 },
    { day: "Wed", hours: 9 },
  ];

  const [recentLeaves, setRecentLeaves] = useState([
    { id: 1, days: 3, status: "Approved", percentage: 12 },
  ]);

  const upcomingShifts = [
    { type: "Annual Leave", time: "09:00 - 17:AM", approved: true },
    { type: "Sick Leave", time: "3 days: 7 day", approved: true },
  ];

  useEffect(() => {
    // Load logged in user
    const loggedInUserStr = localStorage.getItem("loggedInUser");

    if (loggedInUserStr) {
      const currentUser = JSON.parse(loggedInUserStr);
      setUserData({
        name: currentUser.name || "User",
        userRole: currentUser.userRole || "employee",
        specificRole: currentUser.specificRole || "Employee",
      });
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
  }, []);

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
          <Card title="My Attendance Snapshot" style={{ borderRadius: "12px" }}>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={myAttendance}>
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#00D4B1"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#00D4B1" }}
                />
                <XAxis
                  dataKey="day"
                  style={{ fontSize: "11px" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ marginTop: "16px" }}>
              <Text strong>Tomorrow: </Text>
              <Text type="secondary">Morning Shift (09:00 - 17:00)</Text>
            </div>
            <div
              style={{
                marginTop: "12px",
                padding: "12px",
                background: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <Text
                strong
                style={{
                  fontSize: "14px",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Last Check-in:
              </Text>
              <Text
                type="secondary"
                style={{ fontSize: "13px", display: "block" }}
              >
                {checkInTime
                  ? `Today ${new Date(checkInTime).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}`
                  : "Not checked in yet"}
              </Text>
            </div>
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
            {recentLeaves.map((leave) => (
              <div
                key={leave.id}
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <Progress
                  type="circle"
                  percent={leave.percentage}
                  width={60}
                  strokeColor={{
                    "0%": "#0066FF",
                    "100%": "#00D4B1",
                  }}
                />
                <div>
                  <Text strong>
                    {leave.days} days: {leave.status}
                  </Text>
                  <Text
                    type="secondary"
                    style={{ display: "block", fontSize: "12px" }}
                  >
                    {leave.percentage}%
                  </Text>
                </div>
              </div>
            ))}
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
    </div>
  );
}
