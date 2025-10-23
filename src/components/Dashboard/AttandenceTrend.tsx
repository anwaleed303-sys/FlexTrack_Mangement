// import React, { useState, useMemo } from "react";
// import { Card, Row, Col, Button, Typography, Tag } from "antd";
// import {
//   UserOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
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
//   Legend,
// } from "recharts";

// const { Title, Text } = Typography;

// interface TrendData {
//   day: string;
//   present: number;
//   absent: number;
// }

// interface ActivityItem {
//   id: string;
//   employee: string;
//   action: string;
//   time: string;
//   department?: string;
// }

// interface ProductivityData {
//   name: string;
//   value: number;
//   color: string;
//   [key: string]: string | number;
// }

// const AttendanceTrend: React.FC = () => {
//   // Dynamic data - can be fetched from API
//   const [statsData] = useState({
//     totalEmployees: 388,
//     presentToday: 247,
//     absentees: 21,
//     checkedIn: 247,
//     unreported: 21,
//   });

//   // Attendance trends data (week view)
//   const [trendsData] = useState<TrendData[]>([
//     { day: "Mon", present: 95, absent: 8 },
//     { day: "125", present: 110, absent: 12 },
//     { day: "118", present: 115, absent: 15 },
//     { day: "120", present: 125, absent: 18 },
//     { day: "6", present: 115, absent: 12 },
//     { day: "20", present: 120, absent: 10 },
//     { day: "20", present: 122, absent: 10 },
//     { day: "Sun", present: 118, absent: 8 },
//   ]);

//   // Recent activity data
//   const [recentActivity] = useState<ActivityItem[]>([
//     {
//       id: "1",
//       employee: "Ali Khan",
//       action: "checked in",
//       time: "09:02 AM",
//       department: "in Waistroom",
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

//   // Productivity breakdown data
//   const [productivityData] = useState<ProductivityData[]>([
//     { name: "Sales (60M)", value: 29, color: "#10b981" },
//     { name: "Dev (9R 15%)", value: 15, color: "#3b82f6" },
//     { name: "HR", value: 20, color: "#8b5cf6" },
//     { name: "Other", value: 36, color: "#f59e0b" },
//   ]);

//   // Work hours summary
//   const [workHours] = useState({
//     average: "8h 12m",
//     note: "This week - Overtime highlighted.",
//   });

//   const handleCheckIn = () => {
//     console.log("Check-in button clicked");
//     // Implement check-in logic here
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

//           {/* Bottom Row - Productivity and Work Hours */}
//           <Row gutter={[16, 16]}>
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
//                 <ResponsiveContainer width="100%" height={200}>
//                   <PieChart>
//                     <Pie
//                       data={productivityData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={50}
//                       outerRadius={80}
//                       paddingAngle={2}
//                       dataKey="value"
//                     >
//                       {productivityData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//                 <div
//                   style={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     gap: "8px",
//                     marginTop: "12px",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {productivityData.map((item, index) => (
//                     <div
//                       key={index}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "4px",
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
//                   <Text
//                     style={{
//                       fontSize: "14px",
//                       color: "#6b7280",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     Avg:
//                   </Text>
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

// export default AttendanceTrend;

import React, { useState } from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
  FileTextOutlined,
  SwapOutlined,
  ThunderboltOutlined,
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

const { Title, Text } = Typography;

const AttendanceDashboard = () => {
  const [statsData] = useState({
    totalEmployees: 388,
    presentToday: 247,
    absentees: 21,
    checkedIn: 247,
    unreported: 21,
  });

  const [trendsData] = useState([
    { day: "Mon", present: 95, absent: 8 },
    { day: "Tue", present: 110, absent: 12 },
    { day: "Wed", present: 115, absent: 15 },
    { day: "Thu", present: 125, absent: 18 },
    { day: "Fri", present: 115, absent: 12 },
    { day: "Sat", present: 120, absent: 10 },
    { day: "Sun", present: 118, absent: 8 },
  ]);

  const [recentActivity] = useState([
    {
      id: "1",
      employee: "Ali Khan",
      action: "checked in",
      time: "09:02 AM",
      department: "in Washroom",
    },
    {
      id: "2",
      employee: "Sara",
      action: "Leave request from",
      time: "08:45 AM",
      department: "",
    },
    {
      id: "3",
      employee: "Hamza",
      action: "Shift swap approved",
      time: "Yesterday",
      department: "",
    },
  ]);

  const [productivityData] = useState([
    { name: "Sales (40M)", value: 29, color: "#10b981", percentage: "29%" },
    { name: "Dev (9R 15%)", value: 15, color: "#3b82f6", percentage: "15%" },
    { name: "HR", value: 20, color: "#8b5cf6", percentage: "20%" },
    { name: "Other", value: 36, color: "#f59e0b", percentage: "36%" },
  ]);

  const [workHours] = useState({
    average: "8h 12m",
    note: "This week - Overtime highlighted.",
  });

  // Generate CSV data
  const generateCSV = () => {
    const headers = ["Day", "Present", "Absent"];
    const rows = trendsData.map((d) => [d.day, d.present, d.absent]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "attendance_report.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate PDF data (simplified version)
  const generatePDF = () => {
    const content = `
ATTENDANCE REPORT
=================

Summary:
- Total Employees: ${statsData.totalEmployees}
- Present Today: ${statsData.presentToday}
- Absentees: ${statsData.absentees}

Weekly Trends:
${trendsData.map((d) => `${d.day}: Present ${d.present}, Absent ${d.absent}`).join("\n")}

Productivity Breakdown:
${productivityData.map((d) => `${d.name}: ${d.percentage}`).join("\n")}

Average Work Hours: ${workHours.average}
${workHours.note}
    `;

    const blob = new Blob([content], { type: "application/pdf" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "attendance_report.pdf");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCheckIn = () => {
    console.log("Check-in button clicked");
  };

  const handleNewLeave = () => {
    console.log("New leave request");
  };

  const handleApprove = () => {
    console.log("Approve action");
  };

  const handleExport = () => {
    console.log("Export action");
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Top Stats Cards */}
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
              Start easy check-in
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

      {/* Charts and Activity Row */}
      <Row gutter={[16, 16]}>
        {/* Left Column - Charts */}
        <Col xs={24} lg={14}>
          {/* Attendance Trends Chart */}
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
              <LineChart data={trendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="day"
                  stroke="#6b7280"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="absent"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: "#ef4444", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Productivity and Work Hours */}
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    height: "200px",
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
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginTop: "12px",
                    justifyContent: "space-between",
                  }}
                >
                  {productivityData.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        flex: "0 0 45%",
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
                    {workHours.average}
                  </Title>
                  <Text
                    style={{
                      fontSize: "13px",
                      color: "#9ca3af",
                      marginTop: "12px",
                      textAlign: "center",
                    }}
                  >
                    {workHours.note}
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>

          {/* New Action Cards - Reports, Shifts, Quick Actions */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card
                bordered={false}
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ marginBottom: "16px" }}>
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
                    Download daily or weekly attendance reports.
                  </Text>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Button
                    type="primary"
                    onClick={generateCSV}
                    icon={<DownloadOutlined />}
                    style={{
                      backgroundColor: "#10b981",
                      borderColor: "#10b981",
                      borderRadius: "8px",
                      fontWeight: 500,
                    }}
                  >
                    CSV
                  </Button>
                  <Button
                    onClick={generatePDF}
                    icon={<FileTextOutlined />}
                    style={{
                      borderRadius: "8px",
                      borderColor: "#d1d5db",
                      color: "#6b7280",
                      fontWeight: 500,
                    }}
                  >
                    PDF
                  </Button>
                </div>
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
                <div style={{ marginBottom: "16px" }}>
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
                    Open shift assignments and swap requests.
                  </Text>
                </div>
                <Button
                  type="default"
                  icon={<SwapOutlined />}
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
                <div style={{ marginBottom: "16px" }}>
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
                    Fast access to common tasks.
                  </Text>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <Button
                    type="primary"
                    onClick={handleNewLeave}
                    style={{
                      backgroundColor: "#10b981",
                      borderColor: "#10b981",
                      borderRadius: "8px",
                      fontWeight: 500,
                    }}
                  >
                    New Leave
                  </Button>
                  <Button
                    onClick={handleApprove}
                    style={{
                      borderRadius: "8px",
                      borderColor: "#d1d5db",
                      color: "#6b7280",
                      fontWeight: 500,
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={handleExport}
                    style={{
                      borderRadius: "8px",
                      borderColor: "#d1d5db",
                      color: "#6b7280",
                      fontWeight: 500,
                    }}
                  >
                    Export
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Right Column - Recent Activity */}
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
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <div style={{ marginBottom: "16px" }}>
              {recentActivity.map((activity) => (
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
                      backgroundColor: "#9ca3af",
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
                  {activity.department && (
                    <Text
                      style={{
                        color: "#9ca3af",
                        fontSize: "12px",
                        display: "block",
                        marginTop: "4px",
                      }}
                    >
                      {activity.department}
                    </Text>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="default"
              size="large"
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
        </Col>
      </Row>
    </div>
  );
};

export default AttendanceDashboard;
