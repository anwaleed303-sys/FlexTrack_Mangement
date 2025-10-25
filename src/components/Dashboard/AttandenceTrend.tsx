// // import React, { useState, useMemo } from "react";
// // import { Card, Row, Col, Button, Typography, Tag } from "antd";
// // import {
// //   UserOutlined,
// //   CheckCircleOutlined,
// //   CloseCircleOutlined,
// // } from "@ant-design/icons";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Legend,
// // } from "recharts";

// // const { Title, Text } = Typography;

// // interface TrendData {
// //   day: string;
// //   present: number;
// //   absent: number;
// // }

// // interface ActivityItem {
// //   id: string;
// //   employee: string;
// //   action: string;
// //   time: string;
// //   department?: string;
// // }

// // interface ProductivityData {
// //   name: string;
// //   value: number;
// //   color: string;
// //   [key: string]: string | number;
// // }

// // const AttendanceTrend: React.FC = () => {
// //   // Dynamic data - can be fetched from API
// //   const [statsData] = useState({
// //     totalEmployees: 388,
// //     presentToday: 247,
// //     absentees: 21,
// //     checkedIn: 247,
// //     unreported: 21,
// //   });

// //   // Attendance trends data (week view)
// //   const [trendsData] = useState<TrendData[]>([
// //     { day: "Mon", present: 95, absent: 8 },
// //     { day: "125", present: 110, absent: 12 },
// //     { day: "118", present: 115, absent: 15 },
// //     { day: "120", present: 125, absent: 18 },
// //     { day: "6", present: 115, absent: 12 },
// //     { day: "20", present: 120, absent: 10 },
// //     { day: "20", present: 122, absent: 10 },
// //     { day: "Sun", present: 118, absent: 8 },
// //   ]);

// //   // Recent activity data
// //   const [recentActivity] = useState<ActivityItem[]>([
// //     {
// //       id: "1",
// //       employee: "Ali Khan",
// //       action: "checked in",
// //       time: "09:02 AM",
// //       department: "in Waistroom",
// //     },
// //     {
// //       id: "2",
// //       employee: "Sara",
// //       action: "Leave request from",
// //       time: "08:45 AM",
// //       department: "",
// //     },
// //     {
// //       id: "3",
// //       employee: "Hamza",
// //       action: "Shift swap approved",
// //       time: "Yesterday",
// //       department: "",
// //     },
// //   ]);

// //   // Productivity breakdown data
// //   const [productivityData] = useState<ProductivityData[]>([
// //     { name: "Sales (60M)", value: 29, color: "#10b981" },
// //     { name: "Dev (9R 15%)", value: 15, color: "#3b82f6" },
// //     { name: "HR", value: 20, color: "#8b5cf6" },
// //     { name: "Other", value: 36, color: "#f59e0b" },
// //   ]);

// //   // Work hours summary
// //   const [workHours] = useState({
// //     average: "8h 12m",
// //     note: "This week - Overtime highlighted.",
// //   });

// //   const handleCheckIn = () => {
// //     console.log("Check-in button clicked");
// //     // Implement check-in logic here
// //   };

// //   return (
// //     <div
// //       style={{
// //         padding: "20px",
// //         backgroundColor: "#f3f4f6",
// //         minHeight: "100vh",
// //         fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
// //       }}
// //     >
// //       {/* Top Stats Cards */}
// //       <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
// //         <Col xs={24} sm={12} lg={6}>
// //           <Card
// //             bordered={false}
// //             style={{
// //               borderRadius: "16px",
// //               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //             }}
// //           >
// //             <Text
// //               style={{ color: "#6b7280", fontSize: "14px", fontWeight: 500 }}
// //             >
// //               Total Employees
// //             </Text>
// //             <Title level={2} style={{ margin: "8px 0", color: "#111827" }}>
// //               {statsData.totalEmployees}
// //             </Title>
// //             <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
// //               <UserOutlined style={{ color: "#3b82f6", fontSize: "16px" }} />
// //               <Text style={{ color: "#6b7280", fontSize: "13px" }}>
// //                 All departments
// //               </Text>
// //             </div>
// //           </Card>
// //         </Col>

// //         <Col xs={24} sm={12} lg={6}>
// //           <Card
// //             bordered={false}
// //             style={{
// //               borderRadius: "16px",
// //               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //             }}
// //           >
// //             <Text
// //               style={{ color: "#6b7280", fontSize: "14px", fontWeight: 500 }}
// //             >
// //               Present Today
// //             </Text>
// //             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// //               <Title level={2} style={{ margin: "8px 0", color: "#111827" }}>
// //                 {statsData.presentToday}
// //               </Title>
// //               <CheckCircleOutlined
// //                 style={{ color: "#10b981", fontSize: "24px" }}
// //               />
// //             </div>
// //             <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
// //               <CheckCircleOutlined
// //                 style={{ color: "#10b981", fontSize: "16px" }}
// //               />
// //               <Text style={{ color: "#6b7280", fontSize: "13px" }}>
// //                 Checked in
// //               </Text>
// //             </div>
// //           </Card>
// //         </Col>

// //         <Col xs={24} sm={12} lg={6}>
// //           <Card
// //             bordered={false}
// //             style={{
// //               borderRadius: "16px",
// //               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //             }}
// //           >
// //             <Text
// //               style={{ color: "#6b7280", fontSize: "14px", fontWeight: 500 }}
// //             >
// //               Absentees
// //             </Text>
// //             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// //               <Title level={2} style={{ margin: "8px 0", color: "#111827" }}>
// //                 {statsData.absentees}
// //               </Title>
// //               <CloseCircleOutlined
// //                 style={{ color: "#ef4444", fontSize: "24px" }}
// //               />
// //             </div>
// //             <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
// //               <CloseCircleOutlined
// //                 style={{ color: "#ef4444", fontSize: "16px" }}
// //               />
// //               <Text style={{ color: "#6b7280", fontSize: "13px" }}>
// //                 Unreported
// //               </Text>
// //             </div>
// //           </Card>
// //         </Col>

// //         <Col xs={24} sm={12} lg={6}>
// //           <Card
// //             bordered={false}
// //             style={{
// //               borderRadius: "16px",
// //               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //             }}
// //           >
// //             <Text
// //               style={{ color: "#6b7280", fontSize: "14px", fontWeight: 500 }}
// //             >
// //               Quick Check-in
// //             </Text>
// //             <Text
// //               style={{
// //                 display: "block",
// //                 color: "#9ca3af",
// //                 fontSize: "12px",
// //                 margin: "8px 0 12px 0",
// //               }}
// //             >
// //               Start easy check-in
// //             </Text>
// //             <Button
// //               type="primary"
// //               size="large"
// //               onClick={handleCheckIn}
// //               style={{
// //                 width: "100%",
// //                 backgroundColor: "#10b981",
// //                 borderColor: "#10b981",
// //                 borderRadius: "8px",
// //                 fontWeight: 600,
// //               }}
// //             >
// //               Check in
// //             </Button>
// //           </Card>
// //         </Col>
// //       </Row>

// //       {/* Charts and Activity Row */}
// //       <Row gutter={[16, 16]}>
// //         {/* Left Column - Charts */}
// //         <Col xs={24} lg={14}>
// //           {/* Attendance Trends Chart */}
// //           <Card
// //             title={
// //               <Text
// //                 style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}
// //               >
// //                 Attendance Trends
// //               </Text>
// //             }
// //             bordered={false}
// //             style={{
// //               borderRadius: "16px",
// //               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //               marginBottom: "16px",
// //             }}
// //           >
// //             <ResponsiveContainer width="100%" height={250}>
// //               <LineChart data={trendsData}>
// //                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
// //                 <XAxis
// //                   dataKey="day"
// //                   stroke="#6b7280"
// //                   style={{ fontSize: "12px" }}
// //                 />
// //                 <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
// //                 <Tooltip
// //                   contentStyle={{
// //                     backgroundColor: "#fff",
// //                     border: "1px solid #e5e7eb",
// //                     borderRadius: "8px",
// //                   }}
// //                 />
// //                 <Line
// //                   type="monotone"
// //                   dataKey="present"
// //                   stroke="#10b981"
// //                   strokeWidth={2}
// //                   dot={{ fill: "#10b981", r: 4 }}
// //                   activeDot={{ r: 6 }}
// //                 />
// //                 <Line
// //                   type="monotone"
// //                   dataKey="absent"
// //                   stroke="#ef4444"
// //                   strokeWidth={2}
// //                   dot={{ fill: "#ef4444", r: 4 }}
// //                   activeDot={{ r: 6 }}
// //                 />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </Card>

// //           {/* Bottom Row - Productivity and Work Hours */}
// //           <Row gutter={[16, 16]}>
// //             <Col xs={24} md={12}>
// //               <Card
// //                 title={
// //                   <Text
// //                     style={{
// //                       fontSize: "16px",
// //                       fontWeight: 600,
// //                       color: "#111827",
// //                     }}
// //                   >
// //                     Productivity Breakdown
// //                   </Text>
// //                 }
// //                 bordered={false}
// //                 style={{
// //                   borderRadius: "16px",
// //                   boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //                 }}
// //               >
// //                 <ResponsiveContainer width="100%" height={200}>
// //                   <PieChart>
// //                     <Pie
// //                       data={productivityData}
// //                       cx="50%"
// //                       cy="50%"
// //                       innerRadius={50}
// //                       outerRadius={80}
// //                       paddingAngle={2}
// //                       dataKey="value"
// //                     >
// //                       {productivityData.map((entry, index) => (
// //                         <Cell key={`cell-${index}`} fill={entry.color} />
// //                       ))}
// //                     </Pie>
// //                     <Tooltip />
// //                   </PieChart>
// //                 </ResponsiveContainer>
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     flexWrap: "wrap",
// //                     gap: "8px",
// //                     marginTop: "12px",
// //                     justifyContent: "center",
// //                   }}
// //                 >
// //                   {productivityData.map((item, index) => (
// //                     <div
// //                       key={index}
// //                       style={{
// //                         display: "flex",
// //                         alignItems: "center",
// //                         gap: "4px",
// //                       }}
// //                     >
// //                       <div
// //                         style={{
// //                           width: "12px",
// //                           height: "12px",
// //                           backgroundColor: item.color,
// //                           borderRadius: "2px",
// //                         }}
// //                       />
// //                       <Text style={{ fontSize: "12px", color: "#6b7280" }}>
// //                         {item.name}
// //                       </Text>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </Card>
// //             </Col>

// //             <Col xs={24} md={12}>
// //               <Card
// //                 title={
// //                   <Text
// //                     style={{
// //                       fontSize: "16px",
// //                       fontWeight: 600,
// //                       color: "#111827",
// //                     }}
// //                   >
// //                     Work Hours Summary
// //                   </Text>
// //                 }
// //                 bordered={false}
// //                 style={{
// //                   borderRadius: "16px",
// //                   boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     flexDirection: "column",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     height: "200px",
// //                   }}
// //                 >
// //                   <Text
// //                     style={{
// //                       fontSize: "14px",
// //                       color: "#6b7280",
// //                       marginBottom: "8px",
// //                     }}
// //                   >
// //                     Avg:
// //                   </Text>
// //                   <Title level={1} style={{ margin: "0", color: "#111827" }}>
// //                     {workHours.average}
// //                   </Title>
// //                   <Text
// //                     style={{
// //                       fontSize: "13px",
// //                       color: "#9ca3af",
// //                       marginTop: "12px",
// //                       textAlign: "center",
// //                     }}
// //                   >
// //                     {workHours.note}
// //                   </Text>
// //                 </div>
// //               </Card>
// //             </Col>
// //           </Row>
// //         </Col>

// //         {/* Right Column - Recent Activity */}
// //         <Col xs={24} lg={10}>
// //           <Card
// //             title={
// //               <Text
// //                 style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}
// //               >
// //                 Recent Activity
// //               </Text>
// //             }
// //             bordered={false}
// //             style={{
// //               borderRadius: "16px",
// //               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //             }}
// //             bodyStyle={{ padding: "16px" }}
// //           >
// //             <div style={{ marginBottom: "16px" }}>
// //               {recentActivity.map((activity) => (
// //                 <div
// //                   key={activity.id}
// //                   style={{
// //                     padding: "16px",
// //                     backgroundColor: "#f9fafb",
// //                     borderRadius: "12px",
// //                     marginBottom: "12px",
// //                     position: "relative",
// //                   }}
// //                 >
// //                   <div
// //                     style={{
// //                       position: "absolute",
// //                       right: "16px",
// //                       top: "16px",
// //                       width: "8px",
// //                       height: "8px",
// //                       backgroundColor: "#9ca3af",
// //                       borderRadius: "50%",
// //                     }}
// //                   />
// //                   <Text
// //                     style={{
// //                       display: "block",
// //                       color: "#111827",
// //                       fontSize: "14px",
// //                       fontWeight: 500,
// //                       marginBottom: "4px",
// //                     }}
// //                   >
// //                     {activity.employee} {activity.action}
// //                   </Text>
// //                   <Text
// //                     style={{
// //                       color: "#6b7280",
// //                       fontSize: "13px",
// //                       display: "block",
// //                     }}
// //                   >
// //                     {activity.time}
// //                   </Text>
// //                   {activity.department && (
// //                     <Text
// //                       style={{
// //                         color: "#9ca3af",
// //                         fontSize: "12px",
// //                         display: "block",
// //                         marginTop: "4px",
// //                       }}
// //                     >
// //                       {activity.department}
// //                     </Text>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //             <Button
// //               type="default"
// //               size="large"
// //               style={{
// //                 width: "100%",
// //                 borderRadius: "8px",
// //                 borderColor: "#e5e7eb",
// //                 fontWeight: 500,
// //               }}
// //             >
// //               View all
// //             </Button>
// //           </Card>
// //         </Col>
// //       </Row>
// //     </div>
// //   );
// // };

// // export default AttendanceTrend;

// import React, { useState } from "react";
// import { Card, Row, Col, Button, Typography } from "antd";
// import {
//   UserOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   DownloadOutlined,
//   FileTextOutlined,
//   SwapOutlined,
//   ThunderboltOutlined,
// } from "@ant-design/icons";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// const { Title, Text } = Typography;

// const AttendanceDashboard = () => {
//   const [statsData] = useState({
//     totalEmployees: 388,
//     presentToday: 247,
//     absentees: 21,
//     checkedIn: 247,
//     unreported: 21,
//   });

//   const [trendsData] = useState([
//     { day: "Mon", present: 95, absent: 8 },
//     { day: "Tue", present: 110, absent: 12 },
//     { day: "Wed", present: 115, absent: 15 },
//     { day: "Thu", present: 125, absent: 18 },
//     { day: "Fri", present: 115, absent: 12 },
//     { day: "Sat", present: 120, absent: 10 },
//     { day: "Sun", present: 118, absent: 8 },
//   ]);

//   const [recentActivity] = useState([
//     {
//       id: "1",
//       employee: "Ali Khan",
//       action: "checked in",
//       time: "09:02 AM",
//       department: "in Washroom",
//     },
//     {
//       id: "2",
//       employee: "Sara",
//       action: "Leave request from",
//       time: "08:45 AM",
//       department: "",
//     },
//     {
//       id: "3",
//       employee: "Hamza",
//       action: "Shift swap approved",
//       time: "Yesterday",
//       department: "",
//     },
//   ]);

//   const [productivityData] = useState([
//     { name: "Sales (40M)", value: 29, color: "#10b981", percentage: "29%" },
//     { name: "Dev (9R 15%)", value: 15, color: "#3b82f6", percentage: "15%" },
//     { name: "HR", value: 20, color: "#8b5cf6", percentage: "20%" },
//     { name: "Other", value: 36, color: "#f59e0b", percentage: "36%" },
//   ]);

//   const [workHours] = useState({
//     average: "8h 12m",
//     note: "This week - Overtime highlighted.",
//   });

//   // Generate CSV data
//   const generateCSV = () => {
//     const headers = ["Day", "Present", "Absent"];
//     const rows = trendsData.map((d) => [d.day, d.present, d.absent]);

//     let csvContent = headers.join(",") + "\n";
//     rows.forEach((row) => {
//       csvContent += row.join(",") + "\n";
//     });

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     link.setAttribute("href", url);
//     link.setAttribute("download", "attendance_report.csv");
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Generate PDF data (simplified version)
//   const generatePDF = () => {
//     const content = `
// ATTENDANCE REPORT
// =================

// Summary:
// - Total Employees: ${statsData.totalEmployees}
// - Present Today: ${statsData.presentToday}
// - Absentees: ${statsData.absentees}

// Weekly Trends:
// ${trendsData.map((d) => `${d.day}: Present ${d.present}, Absent ${d.absent}`).join("\n")}

// Productivity Breakdown:
// ${productivityData.map((d) => `${d.name}: ${d.percentage}`).join("\n")}

// Average Work Hours: ${workHours.average}
// ${workHours.note}
//     `;

//     const blob = new Blob([content], { type: "application/pdf" });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     link.setAttribute("href", url);
//     link.setAttribute("download", "attendance_report.pdf");
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleCheckIn = () => {
//     console.log("Check-in button clicked");
//   };

//   const handleNewLeave = () => {
//     console.log("New leave request");
//   };

//   const handleApprove = () => {
//     console.log("Approve action");
//   };

//   const handleExport = () => {
//     console.log("Export action");
//   };

//   return (
//     <div
//       style={{
//         padding: "20px",
//         backgroundColor: "#f3f4f6",
//         minHeight: "100vh",
//         fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
//       }}
//     >
//       {/* Top Stats Cards */}
//       <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
//         <Col xs={24} sm={12} lg={6}>
//           <Card
//             bordered={false}
//             style={{
//               borderRadius: "16px",
//               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//             }}
//           >
//             <Text
//               style={{ color: "#6b7280", fontSize: "14px", fontWeight: 500 }}
//             >
//               Total Employees
//             </Text>
//             <Title level={2} style={{ margin: "8px 0", color: "#111827" }}>
//               {statsData.totalEmployees}
//             </Title>
//             <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//               <UserOutlined style={{ color: "#3b82f6", fontSize: "16px" }} />
//               <Text style={{ color: "#6b7280", fontSize: "13px" }}>
//                 All departments
//               </Text>
//             </div>
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} lg={6}>
//           <Card
//             bordered={false}
//             style={{
//               borderRadius: "16px",
//               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//             }}
//           >
//             <Text
//               style={{ color: "#6b7280", fontSize: "14px", fontWeight: 500 }}
//             >
//               Present Today
//             </Text>
//             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//               <Title level={2} style={{ margin: "8px 0", color: "#111827" }}>
//                 {statsData.presentToday}
//               </Title>
//               <CheckCircleOutlined
//                 style={{ color: "#10b981", fontSize: "24px" }}
//               />
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//               <CheckCircleOutlined
//                 style={{ color: "#10b981", fontSize: "16px" }}
//               />
//               <Text style={{ color: "#6b7280", fontSize: "13px" }}>
//                 Checked in
//               </Text>
//             </div>
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} lg={6}>
//           <Card
//             bordered={false}
//             style={{
//               borderRadius: "16px",
//               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//             }}
//           >
//             <Text
//               style={{ color: "#6b7280", fontSize: "14px", fontWeight: 500 }}
//             >
//               Absentees
//             </Text>
//             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//               <Title level={2} style={{ margin: "8px 0", color: "#111827" }}>
//                 {statsData.absentees}
//               </Title>
//               <CloseCircleOutlined
//                 style={{ color: "#ef4444", fontSize: "24px" }}
//               />
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//               <CloseCircleOutlined
//                 style={{ color: "#ef4444", fontSize: "16px" }}
//               />
//               <Text style={{ color: "#6b7280", fontSize: "13px" }}>
//                 Unreported
//               </Text>
//             </div>
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} lg={6}>
//           <Card
//             bordered={false}
//             style={{
//               borderRadius: "16px",
//               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//             }}
//           >
//             <Text
//               style={{ color: "#6b7280", fontSize: "14px", fontWeight: 500 }}
//             >
//               Quick Check-in
//             </Text>
//             <Text
//               style={{
//                 display: "block",
//                 color: "#9ca3af",
//                 fontSize: "12px",
//                 margin: "8px 0 12px 0",
//               }}
//             >
//               Start easy check-in
//             </Text>
//             <Button
//               type="primary"
//               size="large"
//               onClick={handleCheckIn}
//               style={{
//                 width: "100%",
//                 backgroundColor: "#10b981",
//                 borderColor: "#10b981",
//                 borderRadius: "8px",
//                 fontWeight: 600,
//               }}
//             >
//               Check in
//             </Button>
//           </Card>
//         </Col>
//       </Row>

//       {/* Charts and Activity Row */}
//       <Row gutter={[16, 16]}>
//         {/* Left Column - Charts */}
//         <Col xs={24} lg={14}>
//           {/* Attendance Trends Chart */}
//           <Card
//             title={
//               <Text
//                 style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}
//               >
//                 Attendance Trends
//               </Text>
//             }
//             bordered={false}
//             style={{
//               borderRadius: "16px",
//               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//               marginBottom: "16px",
//             }}
//           >
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={trendsData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis
//                   dataKey="day"
//                   stroke="#6b7280"
//                   style={{ fontSize: "12px" }}
//                 />
//                 <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#fff",
//                     border: "1px solid #e5e7eb",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="present"
//                   stroke="#10b981"
//                   strokeWidth={2}
//                   dot={{ fill: "#10b981", r: 4 }}
//                   activeDot={{ r: 6 }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="absent"
//                   stroke="#ef4444"
//                   strokeWidth={2}
//                   dot={{ fill: "#ef4444", r: 4 }}
//                   activeDot={{ r: 6 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </Card>

//           {/* Productivity and Work Hours */}
//           <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
//             <Col xs={24} md={12}>
//               <Card
//                 title={
//                   <Text
//                     style={{
//                       fontSize: "16px",
//                       fontWeight: 600,
//                       color: "#111827",
//                     }}
//                   >
//                     Productivity Breakdown
//                   </Text>
//                 }
//                 bordered={false}
//                 style={{
//                   borderRadius: "16px",
//                   boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     position: "relative",
//                     height: "200px",
//                   }}
//                 >
//                   <ResponsiveContainer width="100%" height={200}>
//                     <PieChart>
//                       <Pie
//                         data={productivityData}
//                         cx="50%"
//                         cy="50%"
//                         innerRadius={50}
//                         outerRadius={80}
//                         paddingAngle={2}
//                         dataKey="value"
//                       >
//                         {productivityData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     gap: "12px",
//                     marginTop: "12px",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   {productivityData.map((item, index) => (
//                     <div
//                       key={index}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "6px",
//                         flex: "0 0 45%",
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: "12px",
//                           height: "12px",
//                           backgroundColor: item.color,
//                           borderRadius: "2px",
//                         }}
//                       />
//                       <Text style={{ fontSize: "12px", color: "#6b7280" }}>
//                         {item.name}
//                       </Text>
//                     </div>
//                   ))}
//                 </div>
//               </Card>
//             </Col>

//             <Col xs={24} md={12}>
//               <Card
//                 title={
//                   <Text
//                     style={{
//                       fontSize: "16px",
//                       fontWeight: 600,
//                       color: "#111827",
//                     }}
//                   >
//                     Work Hours Summary
//                   </Text>
//                 }
//                 bordered={false}
//                 style={{
//                   borderRadius: "16px",
//                   boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     height: "200px",
//                   }}
//                 >
//                   <Title level={1} style={{ margin: "0", color: "#111827" }}>
//                     {workHours.average}
//                   </Title>
//                   <Text
//                     style={{
//                       fontSize: "13px",
//                       color: "#9ca3af",
//                       marginTop: "12px",
//                       textAlign: "center",
//                     }}
//                   >
//                     {workHours.note}
//                   </Text>
//                 </div>
//               </Card>
//             </Col>
//           </Row>

//           {/* New Action Cards - Reports, Shifts, Quick Actions */}
//           <Row gutter={[16, 16]}>
//             <Col xs={24} md={8}>
//               <Card
//                 bordered={false}
//                 style={{
//                   borderRadius: "16px",
//                   boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <div style={{ marginBottom: "16px" }}>
//                   <Text
//                     style={{
//                       fontSize: "18px",
//                       fontWeight: 600,
//                       color: "#111827",
//                       display: "block",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     Reports
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: "13px",
//                       color: "#6b7280",
//                       display: "block",
//                       marginBottom: "16px",
//                     }}
//                   >
//                     Download daily or weekly attendance reports.
//                   </Text>
//                 </div>
//                 <div style={{ display: "flex", gap: "8px" }}>
//                   <Button
//                     type="primary"
//                     onClick={generateCSV}
//                     icon={<DownloadOutlined />}
//                     style={{
//                       backgroundColor: "#10b981",
//                       borderColor: "#10b981",
//                       borderRadius: "8px",
//                       fontWeight: 500,
//                     }}
//                   >
//                     CSV
//                   </Button>
//                   <Button
//                     onClick={generatePDF}
//                     icon={<FileTextOutlined />}
//                     style={{
//                       borderRadius: "8px",
//                       borderColor: "#d1d5db",
//                       color: "#6b7280",
//                       fontWeight: 500,
//                     }}
//                   >
//                     PDF
//                   </Button>
//                 </div>
//               </Card>
//             </Col>

//             <Col xs={24} md={8}>
//               <Card
//                 bordered={false}
//                 style={{
//                   borderRadius: "16px",
//                   boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <div style={{ marginBottom: "16px" }}>
//                   <Text
//                     style={{
//                       fontSize: "18px",
//                       fontWeight: 600,
//                       color: "#111827",
//                       display: "block",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     Shifts
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: "13px",
//                       color: "#6b7280",
//                       display: "block",
//                       marginBottom: "16px",
//                     }}
//                   >
//                     Open shift assignments and swap requests.
//                   </Text>
//                 </div>
//                 <Button
//                   type="default"
//                   icon={<SwapOutlined />}
//                   style={{
//                     width: "100%",
//                     borderRadius: "8px",
//                     borderColor: "#d1d5db",
//                     color: "#111827",
//                     fontWeight: 500,
//                   }}
//                 >
//                   View Shifts
//                 </Button>
//               </Card>
//             </Col>

//             <Col xs={24} md={8}>
//               <Card
//                 bordered={false}
//                 style={{
//                   borderRadius: "16px",
//                   boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <div style={{ marginBottom: "16px" }}>
//                   <Text
//                     style={{
//                       fontSize: "18px",
//                       fontWeight: 600,
//                       color: "#111827",
//                       display: "block",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     Quick Actions
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: "13px",
//                       color: "#6b7280",
//                       display: "block",
//                       marginBottom: "16px",
//                     }}
//                   >
//                     Fast access to common tasks.
//                   </Text>
//                 </div>
//                 <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
//                   <Button
//                     type="primary"
//                     onClick={handleNewLeave}
//                     style={{
//                       backgroundColor: "#10b981",
//                       borderColor: "#10b981",
//                       borderRadius: "8px",
//                       fontWeight: 500,
//                     }}
//                   >
//                     New Leave
//                   </Button>
//                   <Button
//                     onClick={handleApprove}
//                     style={{
//                       borderRadius: "8px",
//                       borderColor: "#d1d5db",
//                       color: "#6b7280",
//                       fontWeight: 500,
//                     }}
//                   >
//                     Approve
//                   </Button>
//                   <Button
//                     onClick={handleExport}
//                     style={{
//                       borderRadius: "8px",
//                       borderColor: "#d1d5db",
//                       color: "#6b7280",
//                       fontWeight: 500,
//                     }}
//                   >
//                     Export
//                   </Button>
//                 </div>
//               </Card>
//             </Col>
//           </Row>
//         </Col>

//         {/* Right Column - Recent Activity */}
//         <Col xs={24} lg={10}>
//           <Card
//             title={
//               <Text
//                 style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}
//               >
//                 Recent Activity
//               </Text>
//             }
//             bordered={false}
//             style={{
//               borderRadius: "16px",
//               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//             }}
//             bodyStyle={{ padding: "16px" }}
//           >
//             <div style={{ marginBottom: "16px" }}>
//               {recentActivity.map((activity) => (
//                 <div
//                   key={activity.id}
//                   style={{
//                     padding: "16px",
//                     backgroundColor: "#f9fafb",
//                     borderRadius: "12px",
//                     marginBottom: "12px",
//                     position: "relative",
//                   }}
//                 >
//                   <div
//                     style={{
//                       position: "absolute",
//                       right: "16px",
//                       top: "16px",
//                       width: "8px",
//                       height: "8px",
//                       backgroundColor: "#9ca3af",
//                       borderRadius: "50%",
//                     }}
//                   />
//                   <Text
//                     style={{
//                       display: "block",
//                       color: "#111827",
//                       fontSize: "14px",
//                       fontWeight: 500,
//                       marginBottom: "4px",
//                     }}
//                   >
//                     {activity.employee} {activity.action}
//                   </Text>
//                   <Text
//                     style={{
//                       color: "#6b7280",
//                       fontSize: "13px",
//                       display: "block",
//                     }}
//                   >
//                     {activity.time}
//                   </Text>
//                   {activity.department && (
//                     <Text
//                       style={{
//                         color: "#9ca3af",
//                         fontSize: "12px",
//                         display: "block",
//                         marginTop: "4px",
//                       }}
//                     >
//                       {activity.department}
//                     </Text>
//                   )}
//                 </div>
//               ))}
//             </div>
//             <Button
//               type="default"
//               size="large"
//               style={{
//                 width: "100%",
//                 borderRadius: "8px",
//                 borderColor: "#e5e7eb",
//                 fontWeight: 500,
//               }}
//             >
//               View all
//             </Button>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default AttendanceDashboard;

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

interface Activity {
  id: string;
  employee: string;
  action: string;
  time: string;
  type: "checkin" | "leave";
}

const COLORS = {
  Approved: "#00D4B1",
  Pending: "#FFB020",
  Rejected: "#FF4D4F",
};

export default function AttendanceDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showAllActivities, setShowAllActivities] = useState(false);

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

  const [leaveForm] = Form.useForm();
  const [adminForm] = Form.useForm();

  useEffect(() => {
    loadData();
  }, []);

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
    const acts: Activity[] = [];

    attRecords
      .filter((r) => r.status === "present")
      .slice(-10)
      .forEach((r) => {
        acts.push({
          id: `att-${r.id}`,
          employee: r.name,
          action: "checked in",
          time: new Date(r.checkIn).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "checkin",
        });
      });

    leaves.slice(-10).forEach((l) => {
      acts.push({
        id: `leave-${l.id}`,
        employee: l.name,
        action: "submitted leave request",
        time: new Date(l.date).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "leave",
      });
    });

    acts.sort((a, b) => {
      const timeA = new Date(`1970-01-01 ${a.time}`).getTime();
      const timeB = new Date(`1970-01-01 ${b.time}`).getTime();
      return timeB - timeA;
    });

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

  const handleCheckIn = () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    if (!loggedUser.name) {
      message.error("Please login first!");
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
      JSON.stringify({ checkInTime: now.toISOString() })
    );

    message.success("Checked in successfully!");
    loadData();
  };

  const verifyAdmin = async (values: { email: string; password: string }) => {
    const adminData = JSON.parse(localStorage.getItem("adminData") || "{}");

    if (
      adminData.email === values.email &&
      adminData.password === values.password
    ) {
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

    message.success("Leave granted successfully!");
    setLeaveModal(false);
    leaveForm.resetFields();
    loadData();
  };

  const handleApproveReject = (leaveId: number, status: string) => {
    const leaves = JSON.parse(localStorage.getItem("leaveRequests") || "[]");
    const updated = leaves.map((l: LeaveRequest) =>
      l.id === leaveId ? { ...l, status } : l
    );
    localStorage.setItem("leaveRequests", JSON.stringify(updated));
    message.success(`Leave ${status.toLowerCase()} successfully!`);
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
    const data =
      selectedEmployee === "all"
        ? attendanceRecords
        : attendanceRecords.filter((r) => r.name === selectedEmployee);

    let content = `ATTENDANCE REPORT\n===================\n\n`;
    content += `Employee: ${selectedEmployee === "all" ? "All Employees" : selectedEmployee}\n\n`;

    data.forEach((r) => {
      content += `Name: ${r.name}\n`;
      content += `Date: ${r.date}\n`;
      content += `Check In: ${r.checkIn ? new Date(r.checkIn).toLocaleTimeString() : "-"}\n`;
      content += `Check Out: ${r.checkOut ? new Date(r.checkOut).toLocaleTimeString() : "-"}\n`;
      content += `Working Time: ${r.workingTime}\n`;
      content += `Status: ${r.status}\n\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `attendance_report_${selectedEmployee}.pdf`;
    link.click();
    message.success("PDF downloaded!");
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
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
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
                Checked in
              </Text>
            </div>
          </Card>
        </Col>

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
              Quick Check-in
            </Text>
            <Text
              style={{
                display: "block",
                color: "#9ca3af",
                fontSize: "12px",
                margin: "8px 0 12px 0",
              }}
            >
              Start your session
            </Text>
            <Button
              type="primary"
              size="large"
              onClick={handleCheckIn}
              style={{
                width: "100%",
                backgroundColor: "#10b981",
                borderColor: "#10b981",
                borderRadius: "8px",
                fontWeight: 600,
              }}
            >
              Check in
            </Button>
          </Card>
        </Col>
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

          <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
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
                    Productivity Breakdown
                  </Text>
                }
                bordered={false}
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={productivityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {productivityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "12px",
                    justifyContent: "center",
                  }}
                >
                  {productivityData.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          backgroundColor: item.color,
                          borderRadius: "2px",
                        }}
                      />
                      <Text style={{ fontSize: "12px", color: "#6b7280" }}>
                        {item.name}
                      </Text>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

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
                    height: "200px",
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

          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
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
                  Generate attendance reports
                </Text>
                <Button
                  type="primary"
                  onClick={() => setReportModal(true)}
                  icon={<FileTextOutlined />}
                  style={{
                    width: "100%",
                    backgroundColor: "#10b981",
                    borderColor: "#10b981",
                    borderRadius: "8px",
                    fontWeight: 500,
                  }}
                >
                  Generate Report
                </Button>
              </Card>
            </Col>

            <Col xs={24} md={8}>
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

            <Col xs={24} md={8}>
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
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button
                    type="primary"
                    onClick={() => {
                      setCurrentAction("leave");
                      setAdminAccessModal(true);
                    }}
                    style={{
                      width: "100%",
                      backgroundColor: "#10b981",
                      borderColor: "#10b981",
                      borderRadius: "8px",
                      fontWeight: 500,
                    }}
                  >
                    New Leave
                  </Button>
                  <Space style={{ width: "100%", display: "flex", gap: "8px" }}>
                    <Button
                      onClick={() => {
                        setCurrentAction("approve");
                        setAdminAccessModal(true);
                      }}
                      style={{
                        flex: 1,
                        borderRadius: "8px",
                        borderColor: "#d1d5db",
                        color: "#6b7280",
                        fontWeight: 500,
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => {
                        setCurrentAction("export");
                        setAdminAccessModal(true);
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
                </Space>
              </Card>
            </Col>
          </Row>
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
                        activity.type === "checkin" ? "#10b981" : "#3b82f6",
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
              pagination={{ pageSize: 5 }}
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
            name="email"
            label="Admin Email"
            rules={[{ required: true, message: "Please enter admin email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter admin email" />
          </Form.Item>
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
        }}
        footer={null}
        width={600}
      >
        <Form form={leaveForm} onFinish={handleLeaveSubmit} layout="vertical">
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
          <Form.Item
            name="dates"
            label="Leave Duration"
            rules={[{ required: true, message: "Please select dates!" }]}
          >
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="leaveType"
            label="Leave Type"
            rules={[{ required: true, message: "Please select leave type!" }]}
          >
            <Select placeholder="Select leave type">
              <Option value="annual">Annual Leave</Option>
              <Option value="sick">Sick Leave</Option>
              <Option value="casual">Casual Leave</Option>
              <Option value="emergency">Emergency Leave</Option>
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
                background: "linear-gradient(135deg, #00D4B1, #0066FF)",
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
      >
        <Table
          columns={leaveColumns}
          dataSource={leaveRequests}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 900 }}
        />
      </Modal>

      <Modal
        title="Export Employee Data"
        open={exportModal}
        onCancel={() => setExportModal(false)}
        footer={null}
        width={800}
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
              let content = "EMPLOYEE DATA\n===================\n\n";
              employees.forEach((e) => {
                content += `Name: ${e.name}\n`;
                content += `Email: ${e.email}\n`;
                content += `Role: ${e.specificRole}\n`;
                content += `Shift: ${e.shift || "N/A"}\n`;
                content += `Weekly Hours: ${e.weeklyHours || 0} hrs\n\n`;
              });
              const blob = new Blob([content], { type: "text/plain" });
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = "employees_data.pdf";
              link.click();
              message.success("Employee data exported!");
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
        title="All Activities"
        open={showAllActivities}
        onCancel={() => setShowAllActivities(false)}
        footer={null}
        width={700}
      >
        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
          {activities.map((activity) => (
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
                    activity.type === "checkin" ? "#10b981" : "#3b82f6",
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
                style={{ color: "#6b7280", fontSize: "13px", display: "block" }}
              >
                {activity.time}
              </Text>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
