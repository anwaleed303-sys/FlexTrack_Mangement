// // "use client";
// // import React from "react";
// // import { Card, Row, Col, Button, Typography, Select, Divider } from "antd";
// // import {
// //   CalendarOutlined,
// //   ClockCircleOutlined,
// //   DownloadOutlined,
// //   FileTextOutlined,
// //   RiseOutlined,
// // } from "@ant-design/icons";

// // const { Text } = Typography;

// // const ExportModal: React.FC = () => {
// //   const cards = [
// //     {
// //       icon: <CalendarOutlined style={{ fontSize: 32, color: "#10b981" }} />,
// //       title: "Attendance Report",
// //       buttonText: "View",
// //     },
// //     {
// //       icon: <ClockCircleOutlined style={{ fontSize: 32, color: "#10b981" }} />,
// //       title: "Overtime Report",
// //       buttonText: "View",
// //     },
// //     {
// //       icon: <FileTextOutlined style={{ fontSize: 32, color: "#10b981" }} />,
// //       title: "Pay Roll Report",
// //       buttonText: "View",
// //     },
// //     {
// //       icon: <RiseOutlined style={{ fontSize: 32, color: "#10b981" }} />,
// //       title: "Productivity Report",
// //       buttonText: "View",
// //     },
// //   ];

// //   return (
// //     <>
// //       {/* Cards */}
// //       <Row gutter={[16, 16]} justify="start">
// //         {cards.map((card, index) => (
// //           <Col key={index} xs={24} sm={12} md={12} lg={6}>
// //             <Card
// //               variant="outlined"
// //               style={{ textAlign: "center" }}
// //               styles={{ body: { padding: 24 } }}
// //             >
// //               {card.icon}
// //               <Text strong style={{ display: "block", marginTop: 12 }}>
// //                 {card.title}
// //               </Text>

// //               <Button
// //                 style={{
// //                   marginTop: 16,
// //                   backgroundColor: "#10b981",
// //                   borderRadius: "20px",
// //                   borderColor: "#10b981",
// //                   color: "white",
// //                   width: "150px",
// //                 }}
// //               >
// //                 {card.buttonText}
// //               </Button>
// //             </Card>
// //           </Col>
// //         ))}
// //       </Row>

// //       {/* ✅ Select Report Section + Recent Reports Side by Side */}
// //       <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
// //         {/* ✅ Left Card — Select Report Type */}
// //         <Col xs={24} md={14}>
// //           <Card
// //             style={{
// //               borderRadius: "12px",
// //               width: "100%",
// //             }}
// //           >
// //             {/* Title Row */}
// //             <Row align="middle" style={{ marginBottom: 12 }}>
// //               <CalendarOutlined style={{ fontSize: 20, color: "#10b981" }} />
// //               <Text strong style={{ marginLeft: 8 }}>
// //                 Select Report Type
// //               </Text>
// //             </Row>

// //             <Divider />

// //             {/* Dropdown Fields */}
// //             <Row gutter={[16, 16]}>
// //               <Col xs={24} sm={12}>
// //                 <Select
// //                   placeholder="Department"
// //                   style={{ width: "100%", borderRadius: 8 }}
// //                   options={[
// //                     { label: "HR", value: "hr" },
// //                     { label: "Finance", value: "finance" },
// //                     { label: "IT", value: "it" },
// //                   ]}
// //                 />
// //               </Col>

// //               <Col xs={24} sm={12}>
// //                 <Select
// //                   placeholder="Report Rules"
// //                   style={{ width: "100%", borderRadius: 8 }}
// //                   options={[
// //                     { label: "Attendance Report", value: "Attendance Report" },
// //                     { label: "Overtime Report", value: "Overtime Report" },
// //                     { label: "Pay Roll Report", value: "Pay Roll Report" },
// //                     {
// //                       label: "Productivity Report",
// //                       value: "Productivity Report",
// //                     },
// //                   ]}
// //                 />
// //               </Col>
// //             </Row>
// //           </Card>
// //         </Col>

// //         {/* ✅ Right Card — Recent Reports */}
// //         <Col xs={24} md={10}>
// //           <Card style={{ borderRadius: "12px", width: "100%" }}>
// //             <Text strong style={{ fontSize: 16 }}>
// //               Recent Reports
// //             </Text>

// //             {/* Report Item */}
// //             <div style={{ marginTop: 16 }}>
// //               {[
// //                 {
// //                   name: "Attendance_Summary.pdf",
// //                   date: "2012-07 - 265",
// //                 },
// //                 {
// //                   name: "Attsdnance_Summary_June.pdf",
// //                   date: "207 - 2043",
// //                 },
// //                 {
// //                   name: "Overdanve_Summary_Q2.csv",
// //                   date: "2012 - 187",
// //                 },
// //                 {
// //                   name: "Attandance_Summary_Q2.csv",
// //                   date: "2012 - 184",
// //                 },
// //               ].map((file, i) => (
// //                 <Row
// //                   key={i}
// //                   justify="space-between"
// //                   align="middle"
// //                   style={{
// //                     padding: "10px 0",
// //                     borderBottom: i < 3 ? "1px solid #f0f0f0" : "",
// //                   }}
// //                 >
// //                   <Row align="middle">
// //                     <FileTextOutlined
// //                       style={{ fontSize: 20, marginRight: 8, color: "#10b981" }}
// //                     />
// //                     <div>
// //                       <Text>{file.name}</Text>
// //                       <br />
// //                       <Text type="secondary" style={{ fontSize: 12 }}>
// //                         {file.date}
// //                       </Text>
// //                     </div>
// //                   </Row>

// //                   <Button
// //                     type="text"
// //                     className="download-btn"
// //                     icon={
// //                       <DownloadOutlined
// //                         style={{ fontSize: 18, color: "#10b981" }}
// //                       />
// //                     }
// //                     style={{ padding: 0 }}
// //                   />
// //                 </Row>
// //               ))}
// //             </div>
// //           </Card>
// //         </Col>
// //         {/* ✅ Report Builder Card (Below Select Report Type) */}
// //         <Col xs={24} md={14} style={{ marginTop: -178 }}>
// //           <Card
// //             style={{
// //               borderRadius: "12px",
// //               width: "100%",
// //             }}
// //           >
// //             {/* Header */}
// //             <Row align="middle" style={{ marginBottom: 12 }}>
// //               <FileTextOutlined style={{ fontSize: 20, color: "#10b981" }} />
// //               <Text strong style={{ marginLeft: 8 }}>
// //                 Report Builder
// //               </Text>
// //             </Row>

// //             <Divider />

// //             {/* Fields */}
// //             <Row gutter={[16, 16]}>
// //               <Col xs={24} sm={12}>
// //                 <Select
// //                   placeholder="From: 2021"
// //                   style={{ width: "100%", borderRadius: 8 }}
// //                   options={[
// //                     { label: "2021", value: "2021" },
// //                     { label: "2022", value: "2022" },
// //                     { label: "2023", value: "2023" },
// //                   ]}
// //                 />
// //               </Col>

// //               <Col xs={24} sm={12}>
// //                 <Select
// //                   placeholder="To: 2022"
// //                   style={{ width: "100%", borderRadius: 8 }}
// //                   options={[
// //                     { label: "2021", value: "2021" },
// //                     { label: "2022", value: "2022" },
// //                     { label: "2023", value: "2023" },
// //                   ]}
// //                 />
// //               </Col>

// //               <Col xs={24} sm={12}>
// //                 <Select
// //                   placeholder="Morning"
// //                   style={{ width: "100%", borderRadius: 8 }}
// //                   options={[
// //                     { label: "Morning", value: "morning" },
// //                     { label: "Evening", value: "evening" },
// //                   ]}
// //                 />
// //               </Col>

// //               <Col xs={24} sm={12}>
// //                 <Select
// //                   placeholder="Tide"
// //                   style={{ width: "100%", borderRadius: 8 }}
// //                   options={[
// //                     { label: "Tide", value: "tide" },
// //                     { label: "Night", value: "night" },
// //                   ]}
// //                 />
// //               </Col>

// //               <Col xs={24} sm={12}>
// //                 <Select
// //                   placeholder="Report Format"
// //                   style={{ width: "100%", borderRadius: 8 }}
// //                   options={[
// //                     { label: "PDF", value: "pdf" },
// //                     { label: "CSV", value: "csv" },
// //                     { label: "Excel", value: "excel" },
// //                   ]}
// //                 />
// //               </Col>
// //             </Row>

// //             {/* Button */}
// //             <Row justify="center" style={{ marginTop: 24 }}>
// //               <Button
// //                 style={{
// //                   backgroundColor: "#10b981",
// //                   borderColor: "#10b981",
// //                   borderRadius: "20px",
// //                   color: "white",
// //                   width: "180px",
// //                 }}
// //               >
// //                 Generate Report
// //               </Button>
// //             </Row>
// //           </Card>
// //         </Col>
// //       </Row>
// //     </>
// //   );
// // };

// // export default ExportModal;

// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Row,
//   Col,
//   Button,
//   Typography,
//   Select,
//   Divider,
//   Modal,
//   Table,
//   Tag,
//   DatePicker,
//   message,
//   Space,
//   Avatar,
//   Input,
// } from "antd";
// import {
//   CalendarOutlined,
//   ClockCircleOutlined,
//   DownloadOutlined,
//   FileTextOutlined,
//   RiseOutlined,
//   UserOutlined,
//   SearchOutlined,
// } from "@ant-design/icons";
// import dayjs from "dayjs";

// const { Text, Title } = Typography;
// const { RangePicker } = DatePicker;
// const { Option } = Select;

// interface Employee {
//   name: string;
//   email: string;
//   profileImage?: string;
//   specificRole: string;
//   shift?: string;
//   weeklyHours?: number;
//   payAmount?: number;
//   payType?: string;
//   currency?: string;
// }

// interface AttendanceRecord {
//   id: number;
//   name: string;
//   date: string;
//   checkIn: string;
//   checkOut: string;
//   workingTime: string;
//   status: "present" | "absent";
//   workingHours?: number;
// }

// interface ReportFile {
//   id: string;
//   name: string;
//   date: string;
//   type: string;
// }

// export default function ExportModal() {
//   const [loggedInUser, setLoggedInUser] = useState<any>({});
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [attendanceRecords, setAttendanceRecords] = useState<
//     AttendanceRecord[]
//   >([]);
//   const [departments, setDepartments] = useState<string[]>([]);
//   const [recentReports, setRecentReports] = useState<ReportFile[]>([]);

//   // Modal states
//   const [attendanceModal, setAttendanceModal] = useState(false);
//   const [overtimeModal, setOvertimeModal] = useState(false);
//   const [payrollModal, setPayrollModal] = useState(false);
//   const [productivityModal, setProductivityModal] = useState(false);

//   // Filter states
//   const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
//   const [searchText, setSearchText] = useState("");

//   // Report Builder states
//   const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
//     null
//   );
//   const [selectedReportType, setSelectedReportType] = useState<string | null>(
//     null
//   );

//   const [dateRange, setDateRange] = useState<any>(null);
//   const [selectedShift, setSelectedShift] = useState<string | null>(null);
//   const [reportFormat, setReportFormat] = useState<string | null>(null);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = () => {
//     const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
//     setLoggedInUser(user);

//     const empData: Employee[] = JSON.parse(
//       localStorage.getItem("employees") || "[]"
//     );
//     setEmployees(empData);

//     const attRecords: AttendanceRecord[] = JSON.parse(
//       localStorage.getItem("attendanceRecords") || "[]"
//     );
//     setAttendanceRecords(attRecords);

//     // Get unique departments
//     const depts = [...new Set(empData.map((e) => e.specificRole))];
//     setDepartments(depts);

//     // Load recent reports
//     const reports: ReportFile[] = JSON.parse(
//       localStorage.getItem("recentReports") || "[]"
//     );
//     setRecentReports(reports);
//   };

//   const saveRecentReport = (name: string, type: string) => {
//     const newReport: ReportFile = {
//       id: `report_${Date.now()}`,
//       name: name,
//       date: new Date().toLocaleDateString(),
//       type: type,
//     };

//     const reports = [newReport, ...recentReports.slice(0, 3)];
//     setRecentReports(reports);
//     localStorage.setItem("recentReports", JSON.stringify(reports));
//   };

//   // Get filtered attendance data
//   const getFilteredAttendance = () => {
//     let data = attendanceRecords;

//     if (loggedInUser.userRole === "employee") {
//       data = data.filter((r) => r.name === loggedInUser.name);
//     } else if (selectedEmployee !== "all") {
//       data = data.filter((r) => r.name === selectedEmployee);
//     }

//     if (searchText) {
//       data = data.filter(
//         (r) => r.name && r.name.toLowerCase().includes(searchText.toLowerCase())
//       );
//     }

//     return data;
//   };

//   // Calculate overtime data
//   const getOvertimeData = () => {
//     const data = getFilteredAttendance();
//     return data
//       .map((record) => {
//         const employee = employees.find((e) => e.name === record.name);
//         const dailyHours = employee?.weeklyHours ? employee.weeklyHours / 5 : 8;
//         const workingHours = record.workingHours || 0;
//         const overtime = Math.max(0, workingHours - dailyHours);

//         return {
//           ...record,
//           expectedHours: dailyHours,
//           overtime: overtime,
//         };
//       })
//       .filter((r) => r.overtime > 0);
//   };

//   // Calculate payroll data
//   const getPayrollData = () => {
//     const uniqueEmployees =
//       selectedEmployee === "all"
//         ? employees
//         : employees.filter((e) => e.name === selectedEmployee);

//     return uniqueEmployees.map((emp) => {
//       const empRecords = attendanceRecords.filter(
//         (r) => r.name === emp.name && r.status === "present"
//       );
//       const totalHours = empRecords.reduce(
//         (sum, r) => sum + (r.workingHours || 0),
//         0
//       );
//       const basePay = emp.payAmount || 0;
//       const totalPay =
//         emp.payType === "Hourly" ? basePay * totalHours : basePay;

//       return {
//         name: emp.name,
//         role: emp.specificRole,
//         payType: emp.payType,
//         currency: emp.currency || "$",
//         basePay: basePay,
//         hoursWorked: totalHours,
//         totalPay: totalPay,
//       };
//     });
//   };

//   // Calculate productivity data
//   const getProductivityData = () => {
//     const data = getFilteredAttendance();
//     const grouped: any = {};

//     data.forEach((record) => {
//       if (!grouped[record.name]) {
//         const emp = employees.find((e) => e.name === record.name);
//         grouped[record.name] = {
//           name: record.name,
//           role: emp?.specificRole || "N/A",
//           totalDays: 0,
//           presentDays: 0,
//           absentDays: 0,
//           totalHours: 0,
//         };
//       }

//       grouped[record.name].totalDays++;
//       if (record.status === "present") {
//         grouped[record.name].presentDays++;
//         grouped[record.name].totalHours += record.workingHours || 0;
//       } else {
//         grouped[record.name].absentDays++;
//       }
//     });

//     return Object.values(grouped).map((item: any) => ({
//       ...item,
//       attendanceRate: item.totalDays
//         ? Math.round((item.presentDays / item.totalDays) * 100)
//         : 0,
//       avgHoursPerDay: item.presentDays
//         ? (item.totalHours / item.presentDays).toFixed(1)
//         : 0,
//     }));
//   };

//   // Generate Report
//   const handleGenerateReport = () => {
//     if (!selectedReportType || !reportFormat) {
//       message.error("Please select report type and format!");
//       return;
//     }

//     let data: any[] = [];
//     let fileName = "";
//     let headers: string[] = [];

//     switch (selectedReportType) {
//       case "Attendance Report":
//         data = getFilteredAttendance();
//         fileName = `Attendance_Report_${Date.now()}`;
//         headers = [
//           "Name",
//           "Date",
//           "Check In",
//           "Check Out",
//           "Working Time",
//           "Status",
//         ];
//         break;
//       case "Overtime Report":
//         data = getOvertimeData();
//         fileName = `Overtime_Report_${Date.now()}`;
//         headers = [
//           "Name",
//           "Date",
//           "Working Hours",
//           "Expected Hours",
//           "Overtime",
//         ];
//         break;
//       case "Pay Roll Report":
//         data = getPayrollData();
//         fileName = `Payroll_Report_${Date.now()}`;
//         headers = [
//           "Name",
//           "Role",
//           "Pay Type",
//           "Base Pay",
//           "Hours Worked",
//           "Total Pay",
//         ];
//         break;
//       case "Productivity Report":
//         data = getProductivityData();
//         fileName = `Productivity_Report_${Date.now()}`;
//         headers = [
//           "Name",
//           "Role",
//           "Total Days",
//           "Present",
//           "Absent",
//           "Attendance Rate",
//         ];
//         break;
//     }

//     if (data.length === 0) {
//       message.warning("No data available for selected criteria!");
//       return;
//     }

//     if (reportFormat === "csv") {
//       downloadCSV(data, headers, fileName);
//     } else if (reportFormat === "pdf") {
//       downloadPDF(data, headers, fileName, selectedReportType);
//     } else if (reportFormat === "excel") {
//       message.info("Excel export coming soon!");
//     }

//     saveRecentReport(`${fileName}.${reportFormat}`, selectedReportType);
//     message.success("Report generated successfully!");
//   };

//   const downloadCSV = (data: any[], headers: string[], fileName: string) => {
//     let csvContent = headers.join(",") + "\n";

//     data.forEach((item) => {
//       const row = headers.map((header) => {
//         const key = header.toLowerCase().replace(/ /g, "");
//         return item[key] || "N/A";
//       });
//       csvContent += row.join(",") + "\n";
//     });

//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `${fileName}.csv`;
//     link.click();
//   };

//   const downloadPDF = (
//     data: any[],
//     headers: string[],
//     fileName: string,
//     reportType: string
//   ) => {
//     const textContent = `${reportType.toUpperCase()}\n\nGenerated: ${new Date().toLocaleString()}\nTotal Records: ${data.length}\n\n${headers.join(" | ")}\n${"=".repeat(80)}\n${data.map((item) => Object.values(item).join(" | ")).join("\n")}`;

//     const blob = new Blob([textContent], { type: "text/plain" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `${fileName}.txt`;
//     link.click();
//   };

//   const attendanceColumns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
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
//       render: (time: string) =>
//         time ? new Date(time).toLocaleTimeString() : "N/A",
//     },
//     {
//       title: "Check Out",
//       dataIndex: "checkOut",
//       key: "checkOut",
//       render: (time: string) => time || "In Progress",
//     },
//     {
//       title: "Working Time",
//       dataIndex: "workingTime",
//       key: "workingTime",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status: string) => (
//         <Tag color={status === "present" ? "green" : "red"}>
//           {status ? status.toUpperCase() : "N/A"}
//         </Tag>
//       ),
//     },
//   ];

//   const overtimeColumns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//     },
//     {
//       title: "Working Hours",
//       dataIndex: "workingHours",
//       key: "workingHours",
//       render: (hours: number) => `${hours?.toFixed(2) || 0} hrs`,
//     },
//     {
//       title: "Expected Hours",
//       dataIndex: "expectedHours",
//       key: "expectedHours",
//       render: (hours: number) => `${hours?.toFixed(2) || 0} hrs`,
//     },
//     {
//       title: "Overtime",
//       dataIndex: "overtime",
//       key: "overtime",
//       render: (hours: number) => (
//         <Tag color="orange">{hours?.toFixed(2) || 0} hrs</Tag>
//       ),
//     },
//   ];

//   const payrollColumns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Role",
//       dataIndex: "role",
//       key: "role",
//     },
//     {
//       title: "Pay Type",
//       dataIndex: "payType",
//       key: "payType",
//     },
//     {
//       title: "Base Pay",
//       dataIndex: "basePay",
//       key: "basePay",
//       render: (pay: number, record: any) =>
//         `${record.currency}${pay?.toLocaleString() || 0}`,
//     },
//     {
//       title: "Hours Worked",
//       dataIndex: "hoursWorked",
//       key: "hoursWorked",
//       render: (hours: number) => `${hours?.toFixed(2) || 0} hrs`,
//     },
//     {
//       title: "Total Pay",
//       dataIndex: "totalPay",
//       key: "totalPay",
//       render: (pay: number, record: any) => (
//         <Tag color="green">
//           {record.currency}
//           {pay?.toLocaleString() || 0}
//         </Tag>
//       ),
//     },
//   ];

//   const productivityColumns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Role",
//       dataIndex: "role",
//       key: "role",
//     },
//     {
//       title: "Total Days",
//       dataIndex: "totalDays",
//       key: "totalDays",
//     },
//     {
//       title: "Present",
//       dataIndex: "presentDays",
//       key: "presentDays",
//       render: (days: number) => <Tag color="green">{days}</Tag>,
//     },
//     {
//       title: "Absent",
//       dataIndex: "absentDays",
//       key: "absentDays",
//       render: (days: number) => <Tag color="red">{days}</Tag>,
//     },
//     {
//       title: "Attendance Rate",
//       dataIndex: "attendanceRate",
//       key: "attendanceRate",
//       render: (rate: number) => `${rate}%`,
//     },
//     {
//       title: "Avg Hours/Day",
//       dataIndex: "avgHoursPerDay",
//       key: "avgHoursPerDay",
//       render: (hours: string) => `${hours} hrs`,
//     },
//   ];

//   const cards = [
//     {
//       icon: <CalendarOutlined style={{ fontSize: 32, color: "#10b981" }} />,
//       title: "Attendance Report",
//       buttonText: "View",
//       onClick: () => setAttendanceModal(true),
//     },
//     {
//       icon: <ClockCircleOutlined style={{ fontSize: 32, color: "#10b981" }} />,
//       title: "Overtime Report",
//       buttonText: "View",
//       onClick: () => setOvertimeModal(true),
//     },
//     {
//       icon: <FileTextOutlined style={{ fontSize: 32, color: "#10b981" }} />,
//       title: "Pay Roll Report",
//       buttonText: "View",
//       onClick: () => setPayrollModal(true),
//     },
//     {
//       icon: <RiseOutlined style={{ fontSize: 32, color: "#10b981" }} />,
//       title: "Productivity Report",
//       buttonText: "View",
//       onClick: () => setProductivityModal(true),
//     },
//   ];

//   return (
//     <>
//       {/* Cards */}
//       <Row gutter={[16, 16]} justify="start">
//         {cards.map((card, index) => (
//           <Col key={index} xs={24} sm={12} md={12} lg={6}>
//             <Card
//               variant="outlined"
//               style={{ textAlign: "center" }}
//               styles={{ body: { padding: 24 } }}
//             >
//               {card.icon}
//               <Text strong style={{ display: "block", marginTop: 12 }}>
//                 {card.title}
//               </Text>

//               <Button
//                 onClick={card.onClick}
//                 style={{
//                   marginTop: 16,
//                   backgroundColor: "#10b981",
//                   borderRadius: "20px",
//                   borderColor: "#10b981",
//                   color: "white",
//                   width: "150px",
//                 }}
//               >
//                 {card.buttonText}
//               </Button>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Select Report Section + Recent Reports Side by Side */}
//       <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
//         {/* Left Card — Select Report Type (Admin Only) */}
//         {loggedInUser.userRole === "admin" && (
//           <Col xs={24} md={14}>
//             <Card
//               style={{
//                 borderRadius: "12px",
//                 width: "100%",
//                 marginBottom: "16px",
//               }}
//             >
//               <Row align="middle" style={{ marginBottom: 12 }}>
//                 <CalendarOutlined style={{ fontSize: 20, color: "#10b981" }} />
//                 <Text strong style={{ marginLeft: 8 }}>
//                   Select Report Type
//                 </Text>
//               </Row>

//               <Divider />

//               <Row gutter={[16, 16]}>
//                 <Col xs={24} sm={12}>
//                   <Select
//                     placeholder="Department"
//                     style={{ width: "100%", borderRadius: 8 }}
//                     value={selectedDepartment}
//                     onChange={setSelectedDepartment}
//                   >
//                     {departments.map((dept) => (
//                       <Option key={dept} value={dept}>
//                         {dept}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Col>

//                 <Col xs={24} sm={12}>
//                   <Select
//                     placeholder="Report Rules"
//                     style={{ width: "100%", borderRadius: 8 }}
//                     value={selectedReportType}
//                     onChange={setSelectedReportType}
//                   >
//                     <Option value="Attendance Report">Attendance Report</Option>
//                     <Option value="Overtime Report">Overtime Report</Option>
//                     <Option value="Pay Roll Report">Pay Roll Report</Option>
//                     <Option value="Productivity Report">
//                       Productivity Report
//                     </Option>
//                   </Select>
//                 </Col>
//               </Row>
//             </Card>

//             {/* Report Builder Card */}
//             <Card
//               style={{
//                 borderRadius: "12px",
//                 width: "100%",
//               }}
//             >
//               <Row align="middle" style={{ marginBottom: 12 }}>
//                 <FileTextOutlined style={{ fontSize: 20, color: "#10b981" }} />
//                 <Text strong style={{ marginLeft: 8 }}>
//                   Report Builder
//                 </Text>
//               </Row>

//               <Divider />

//               <Row gutter={[16, 16]}>
//                 <Col xs={24}>
//                   <Text style={{ display: "block", marginBottom: 8 }}>
//                     Date Range
//                   </Text>
//                   <RangePicker
//                     style={{ width: "100%" }}
//                     value={dateRange}
//                     onChange={setDateRange}
//                   />
//                 </Col>

//                 <Col xs={24} sm={12}>
//                   <Select
//                     placeholder="Shift"
//                     style={{ width: "100%", borderRadius: 8 }}
//                     value={selectedShift}
//                     onChange={setSelectedShift}
//                   >
//                     <Option value="morning">Morning (6 AM - 2 PM)</Option>
//                     <Option value="afternoon">Afternoon (2 PM - 10 PM)</Option>
//                     <Option value="evening">Evening (10 PM - 6 AM)</Option>
//                   </Select>
//                 </Col>

//                 <Col xs={24} sm={12}>
//                   <Select
//                     placeholder="Report Format"
//                     style={{ width: "100%", borderRadius: 8 }}
//                     value={reportFormat}
//                     onChange={setReportFormat}
//                   >
//                     <Option value="pdf">PDF</Option>
//                     <Option value="csv">CSV</Option>
//                   </Select>
//                 </Col>
//               </Row>

//               <Row justify="center" style={{ marginTop: 24 }}>
//                 <Button
//                   onClick={handleGenerateReport}
//                   style={{
//                     backgroundColor: "#10b981",
//                     borderColor: "#10b981",
//                     borderRadius: "20px",
//                     color: "white",
//                     width: "180px",
//                   }}
//                 >
//                   Generate Report
//                 </Button>
//               </Row>
//             </Card>
//           </Col>
//         )}

//         {/* Right Card — Recent Reports */}
//         <Col xs={24} md={loggedInUser.userRole === "admin" ? 10 : 24}>
//           <Card style={{ borderRadius: "12px", width: "100%" }}>
//             <Text strong style={{ fontSize: 16 }}>
//               Recent Reports
//             </Text>

//             <div style={{ marginTop: 16 }}>
//               {recentReports.length > 0 ? (
//                 recentReports.map((file, i) => (
//                   <Row
//                     key={i}
//                     justify="space-between"
//                     align="middle"
//                     style={{
//                       padding: "10px 0",
//                       borderBottom:
//                         i < recentReports.length - 1 ? "1px solid #f0f0f0" : "",
//                     }}
//                   >
//                     <Row align="middle">
//                       <FileTextOutlined
//                         style={{
//                           fontSize: 20,
//                           marginRight: 8,
//                           color: "#10b981",
//                         }}
//                       />
//                       <div>
//                         <Text>{file.name}</Text>
//                         <br />
//                         <Text type="secondary" style={{ fontSize: 12 }}>
//                           {file.date} - {file.type}
//                         </Text>
//                       </div>
//                     </Row>

//                     <Button
//                       type="text"
//                       icon={
//                         <DownloadOutlined
//                           style={{ fontSize: 18, color: "#10b981" }}
//                         />
//                       }
//                       style={{ padding: 0 }}
//                     />
//                   </Row>
//                 ))
//               ) : (
//                 <Text type="secondary">No recent reports</Text>
//               )}
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       {/* Attendance Modal */}
//       <Modal
//         title="Attendance Report"
//         open={attendanceModal}
//         onCancel={() => {
//           setAttendanceModal(false);
//           setSelectedEmployee("all");
//           setSearchText("");
//         }}
//         footer={null}
//         width={1000}
//       >
//         {loggedInUser.userRole === "admin" && (
//           <Space style={{ marginBottom: 16, width: "100%" }}>
//             <Select
//               style={{ width: 200 }}
//               placeholder="Select Employee"
//               value={selectedEmployee}
//               onChange={setSelectedEmployee}
//             >
//               <Option value="all">All Employees</Option>
//               {employees.map((emp) => (
//                 <Option key={emp.email} value={emp.name}>
//                   {emp.name}
//                 </Option>
//               ))}
//             </Select>
//             <Input
//               placeholder="Search by name..."
//               prefix={<SearchOutlined />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               style={{ width: 300 }}
//             />
//           </Space>
//         )}
//         <Table
//           columns={attendanceColumns}
//           dataSource={getFilteredAttendance()}
//           rowKey="id"
//           pagination={{ pageSize: 10 }}
//           scroll={{ x: 800 }}
//         />
//       </Modal>

//       {/* Overtime Modal */}
//       <Modal
//         title="Overtime Report"
//         open={overtimeModal}
//         onCancel={() => {
//           setOvertimeModal(false);
//           setSelectedEmployee("all");
//           setSearchText("");
//         }}
//         footer={null}
//         width={1000}
//       >
//         {loggedInUser.userRole === "admin" && (
//           <Space style={{ marginBottom: 16, width: "100%" }}>
//             <Select
//               style={{ width: 200 }}
//               placeholder="Select Employee"
//               value={selectedEmployee}
//               onChange={setSelectedEmployee}
//             >
//               <Option value="all">All Employees</Option>
//               {employees.map((emp) => (
//                 <Option key={emp.email} value={emp.name}>
//                   {emp.name}
//                 </Option>
//               ))}
//             </Select>
//             <Input
//               placeholder="Search by name..."
//               prefix={<SearchOutlined />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               style={{ width: 300 }}
//             />
//           </Space>
//         )}
//         <Table
//           columns={overtimeColumns}
//           dataSource={getOvertimeData()}
//           rowKey="id"
//           pagination={{ pageSize: 10 }}
//           scroll={{ x: 800 }}
//         />
//       </Modal>

//       {/* Payroll Modal */}
//       <Modal
//         title="Pay Roll Report"
//         open={payrollModal}
//         onCancel={() => {
//           setPayrollModal(false);
//           setSelectedEmployee("all");
//           setSearchText("");
//         }}
//         footer={null}
//         width={1000}
//       >
//         {loggedInUser.userRole === "admin" && (
//           <Space style={{ marginBottom: 16, width: "100%" }}>
//             <Select
//               style={{ width: 200 }}
//               placeholder="Select Employee"
//               value={selectedEmployee}
//               onChange={setSelectedEmployee}
//             >
//               <Option value="all">All Employees</Option>
//               {employees.map((emp) => (
//                 <Option key={emp.email} value={emp.name}>
//                   {emp.name}
//                 </Option>
//               ))}
//             </Select>
//             <Input
//               placeholder="Search by name..."
//               prefix={<SearchOutlined />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               style={{ width: 300 }}
//             />
//           </Space>
//         )}
//         <Table
//           columns={payrollColumns}
//           dataSource={getPayrollData()}
//           rowKey="name"
//           pagination={{ pageSize: 10 }}
//           scroll={{ x: 800 }}
//         />
//       </Modal>

//       {/* Productivity Modal */}
//       <Modal
//         title="Productivity Report"
//         open={productivityModal}
//         onCancel={() => {
//           setProductivityModal(false);
//           setSelectedEmployee("all");
//           setSearchText("");
//         }}
//         footer={null}
//         width={1100}
//       >
//         {loggedInUser.userRole === "admin" && (
//           <Space style={{ marginBottom: 16, width: "100%" }}>
//             <Select
//               style={{ width: 200 }}
//               placeholder="Select Employee"
//               value={selectedEmployee}
//               onChange={setSelectedEmployee}
//             >
//               <Option value="all">All Employees</Option>
//               {employees.map((emp) => (
//                 <Option key={emp.email} value={emp.name}>
//                   {emp.name}
//                 </Option>
//               ))}
//             </Select>
//             <Input
//               placeholder="Search by name..."
//               prefix={<SearchOutlined />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               style={{ width: 300 }}
//             />
//           </Space>
//         )}
//         <Table
//           columns={productivityColumns}
//           dataSource={getProductivityData()}
//           rowKey="name"
//           pagination={{ pageSize: 10 }}
//           scroll={{ x: 900 }}
//         />
//       </Modal>
//     </>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Select,
  Divider,
  Modal,
  Table,
  Tag,
  DatePicker,
  message,
  Space,
  Input,
} from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  FileTextOutlined,
  RiseOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface Employee {
  name: string;
  email: string;
  profileImage?: string;
  specificRole: string;
  shift?: string;
  weeklyHours?: number;
  payAmount?: number;
  payType?: string;
  currency?: string;
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

interface ReportFile {
  id: string;
  name: string;
  date: string;
  type: string;
}

export default function ExportModal() {
  const [loggedInUser, setLoggedInUser] = useState<any>({});
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [recentReports, setRecentReports] = useState<ReportFile[]>([]);

  // Modal states
  const [attendanceModal, setAttendanceModal] = useState(false);
  const [overtimeModal, setOvertimeModal] = useState(false);
  const [payrollModal, setPayrollModal] = useState(false);
  const [productivityModal, setProductivityModal] = useState(false);

  // Filter states
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  const [searchText, setSearchText] = useState("");

  // Report Builder states
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedReportType, setSelectedReportType] = useState<string | null>(
    null
  );
  const [selectedReportEmployee, setSelectedReportEmployee] =
    useState<string>("all");
  const [reportEmployeeSearch, setReportEmployeeSearch] = useState("");

  const [dateRange, setDateRange] = useState<any>(null);
  const [selectedShift, setSelectedShift] = useState<string | null>(null);
  const [reportFormat, setReportFormat] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    setLoggedInUser(user);

    const empData: Employee[] = JSON.parse(
      localStorage.getItem("employees") || "[]"
    );
    setEmployees(empData);

    const attRecords: AttendanceRecord[] = JSON.parse(
      localStorage.getItem("attendanceRecords") || "[]"
    );

    // Parse working hours and ensure it's a number
    const processedRecords = attRecords.map((record) => {
      let workingHours = 0;

      if (record.workingHours) {
        workingHours =
          typeof record.workingHours === "number"
            ? record.workingHours
            : parseFloat(String(record.workingHours));
      } else if (record.workingTime) {
        // Parse from workingTime string (e.g., "8h 30m" or "8:30")
        const timeStr = String(record.workingTime);
        const hoursMatch = timeStr.match(/(\d+)h/);
        const minutesMatch = timeStr.match(/(\d+)m/);
        const colonMatch = timeStr.match(/(\d+):(\d+)/);

        if (hoursMatch || minutesMatch) {
          const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
          const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
          workingHours = hours + minutes / 60;
        } else if (colonMatch) {
          const hours = parseInt(colonMatch[1]);
          const minutes = parseInt(colonMatch[2]);
          workingHours = hours + minutes / 60;
        }
      }

      return {
        ...record,
        workingHours: workingHours || 0,
      };
    });

    setAttendanceRecords(processedRecords);

    // Get unique departments
    const depts = [...new Set(empData.map((e) => e.specificRole))];
    setDepartments(depts);

    // Load recent reports
    const reports: ReportFile[] = JSON.parse(
      localStorage.getItem("recentReports") || "[]"
    );
    setRecentReports(reports);

    // Auto-select employee's department if employee role
    if (user.userRole === "employee") {
      const currentEmp = empData.find((e) => e.email === user.email);
      if (currentEmp) {
        setSelectedDepartment(currentEmp.specificRole);
      }
    }
  };

  const saveRecentReport = (name: string, type: string) => {
    const newReport: ReportFile = {
      id: `report_${Date.now()}`,
      name: name,
      date: new Date().toLocaleDateString(),
      type: type,
    };

    const reports = [newReport, ...recentReports.slice(0, 3)];
    setRecentReports(reports);
    localStorage.setItem("recentReports", JSON.stringify(reports));
  };

  // Get filtered attendance data
  const getFilteredAttendance = () => {
    let data = attendanceRecords;

    if (loggedInUser.userRole === "employee") {
      data = data.filter((r) => r.name === loggedInUser.name);
    } else if (selectedEmployee !== "all") {
      data = data.filter((r) => r.name === selectedEmployee);
    }

    if (searchText) {
      data = data.filter(
        (r) => r.name && r.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return data;
  };

  // Calculate overtime data
  const getOvertimeData = () => {
    const data = getFilteredAttendance();

    // Filter data to show all records with working hours for employees
    if (loggedInUser.userRole === "employee") {
      return data.map((record) => {
        const employee = employees.find((e) => e.name === record.name);
        const dailyHours = employee?.weeklyHours ? employee.weeklyHours / 5 : 8;
        const workingHours = record.workingHours || 0;
        const overtime = Math.max(0, workingHours - dailyHours);

        return {
          ...record,
          expectedHours: dailyHours,
          overtime: overtime,
          workingHours: workingHours,
        };
      });
    }

    // For admin, show only records with overtime
    return data
      .map((record) => {
        const employee = employees.find((e) => e.name === record.name);
        const dailyHours = employee?.weeklyHours ? employee.weeklyHours / 5 : 8;
        const workingHours = record.workingHours || 0;
        const overtime = Math.max(0, workingHours - dailyHours);

        return {
          ...record,
          expectedHours: dailyHours,
          overtime: overtime,
          workingHours: workingHours,
        };
      })
      .filter((r) => r.overtime > 0);
  };

  // Calculate payroll data
  const getPayrollData = () => {
    let uniqueEmployees: Employee[] = [];

    if (loggedInUser.userRole === "employee") {
      uniqueEmployees = employees.filter((e) => e.name === loggedInUser.name);
    } else if (selectedEmployee === "all") {
      uniqueEmployees = employees;
    } else {
      uniqueEmployees = employees.filter((e) => e.name === selectedEmployee);
    }

    // Apply search filter
    if (searchText) {
      uniqueEmployees = uniqueEmployees.filter((e) =>
        e.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return uniqueEmployees.map((emp) => {
      const empRecords = attendanceRecords.filter(
        (r) => r.name === emp.name && r.status === "present"
      );
      const totalHours = empRecords.reduce(
        (sum, r) => sum + (r.workingHours || 0),
        0
      );
      const basePay = emp.payAmount || 0;
      const totalPay =
        emp.payType === "Hourly" ? basePay * totalHours : basePay;

      return {
        name: emp.name,
        role: emp.specificRole,
        payType: emp.payType,
        currency: emp.currency || "$",
        basePay: basePay,
        hoursWorked: totalHours,
        totalPay: totalPay,
      };
    });
  };

  // Calculate productivity data
  const getProductivityData = () => {
    const data = getFilteredAttendance();
    const grouped: any = {};

    data.forEach((record) => {
      if (!grouped[record.name]) {
        const emp = employees.find((e) => e.name === record.name);
        grouped[record.name] = {
          name: record.name,
          role: emp?.specificRole || "N/A",
          totalDays: 0,
          presentDays: 0,
          absentDays: 0,
          totalHours: 0,
        };
      }

      grouped[record.name].totalDays++;
      if (record.status === "present") {
        grouped[record.name].presentDays++;
        grouped[record.name].totalHours += record.workingHours || 0;
      } else {
        grouped[record.name].absentDays++;
      }
    });

    return Object.values(grouped).map((item: any) => ({
      ...item,
      attendanceRate: item.totalDays
        ? Math.round((item.presentDays / item.totalDays) * 100)
        : 0,
      avgHoursPerDay: item.presentDays
        ? (item.totalHours / item.presentDays).toFixed(1)
        : 0,
    }));
  };

  // Get filtered employees for report builder
  const getFilteredReportEmployees = () => {
    let filteredEmps = employees;

    // Filter by department
    if (selectedDepartment) {
      filteredEmps = filteredEmps.filter(
        (e) => e.specificRole === selectedDepartment
      );
    }

    // Filter by search text
    if (reportEmployeeSearch) {
      filteredEmps = filteredEmps.filter((e) =>
        e.name.toLowerCase().includes(reportEmployeeSearch.toLowerCase())
      );
    }

    return filteredEmps;
  };

  // Generate Report
  const handleGenerateReport = () => {
    if (!selectedReportType || !reportFormat) {
      message.error("Please select report type and format!");
      return;
    }

    let data: any[] = [];
    let fileName = "";
    let headers: string[] = [];

    // Get filtered data based on selected employee/department
    let reportData = attendanceRecords;

    if (loggedInUser.userRole === "employee") {
      reportData = reportData.filter((r) => r.name === loggedInUser.name);
    } else if (selectedReportEmployee !== "all") {
      reportData = reportData.filter((r) => r.name === selectedReportEmployee);
    } else if (selectedDepartment) {
      const deptEmployees = employees
        .filter((e) => e.specificRole === selectedDepartment)
        .map((e) => e.name);
      reportData = reportData.filter((r) => deptEmployees.includes(r.name));
    }

    switch (selectedReportType) {
      case "Attendance Report":
        data = reportData;
        fileName = `Attendance_Report_${Date.now()}`;
        headers = [
          "Name",
          "Date",
          "Check In",
          "Check Out",
          "Working Time",
          "Status",
        ];
        break;
      case "Overtime Report":
        data = reportData
          .map((record) => {
            const employee = employees.find((e) => e.name === record.name);
            const dailyHours = employee?.weeklyHours
              ? employee.weeklyHours / 5
              : 8;
            const workingHours = record.workingHours || 0;
            const overtime = Math.max(0, workingHours - dailyHours);

            return {
              name: record.name,
              date: record.date,
              workingHours: workingHours,
              expectedHours: dailyHours,
              overtime: overtime,
            };
          })
          .filter((r) => r.overtime > 0);
        fileName = `Overtime_Report_${Date.now()}`;
        headers = [
          "Name",
          "Date",
          "Working Hours",
          "Expected Hours",
          "Overtime",
        ];
        break;
      case "Pay Roll Report":
        const payrollEmps =
          loggedInUser.userRole === "employee"
            ? employees.filter((e) => e.name === loggedInUser.name)
            : selectedReportEmployee !== "all"
              ? employees.filter((e) => e.name === selectedReportEmployee)
              : selectedDepartment
                ? employees.filter((e) => e.specificRole === selectedDepartment)
                : employees;

        data = payrollEmps.map((emp) => {
          const empRecords = reportData.filter(
            (r) => r.name === emp.name && r.status === "present"
          );
          const totalHours = empRecords.reduce(
            (sum, r) => sum + (r.workingHours || 0),
            0
          );
          const basePay = emp.payAmount || 0;
          const totalPay =
            emp.payType === "Hourly" ? basePay * totalHours : basePay;

          return {
            name: emp.name,
            role: emp.specificRole,
            payType: emp.payType,
            basePay: basePay,
            hoursWorked: totalHours,
            totalPay: totalPay,
          };
        });
        fileName = `Payroll_Report_${Date.now()}`;
        headers = [
          "Name",
          "Role",
          "Pay Type",
          "Base Pay",
          "Hours Worked",
          "Total Pay",
        ];
        break;
      case "Productivity Report":
        const grouped: any = {};
        reportData.forEach((record) => {
          if (!grouped[record.name]) {
            const emp = employees.find((e) => e.name === record.name);
            grouped[record.name] = {
              name: record.name,
              role: emp?.specificRole || "N/A",
              totalDays: 0,
              presentDays: 0,
              absentDays: 0,
              totalHours: 0,
            };
          }

          grouped[record.name].totalDays++;
          if (record.status === "present") {
            grouped[record.name].presentDays++;
            grouped[record.name].totalHours += record.workingHours || 0;
          } else {
            grouped[record.name].absentDays++;
          }
        });

        data = Object.values(grouped).map((item: any) => ({
          name: item.name,
          role: item.role,
          totalDays: item.totalDays,
          presentDays: item.presentDays,
          absentDays: item.absentDays,
          attendanceRate: item.totalDays
            ? Math.round((item.presentDays / item.totalDays) * 100)
            : 0,
        }));
        fileName = `Productivity_Report_${Date.now()}`;
        headers = [
          "Name",
          "Role",
          "Total Days",
          "Present",
          "Absent",
          "Attendance Rate",
        ];
        break;
    }

    if (data.length === 0) {
      message.warning("No data available for selected criteria!");
      return;
    }

    if (reportFormat === "csv") {
      downloadCSV(data, headers, fileName);
    } else if (reportFormat === "pdf") {
      downloadPDF(data, headers, fileName, selectedReportType);
    } else if (reportFormat === "excel") {
      message.info("Excel export coming soon!");
    }

    saveRecentReport(`${fileName}.${reportFormat}`, selectedReportType);
    message.success("Report generated successfully!");
  };

  const downloadCSV = (data: any[], headers: string[], fileName: string) => {
    let csvContent = headers.join(",") + "\n";

    data.forEach((item) => {
      const row = headers.map((header) => {
        const key = header.toLowerCase().replace(/ /g, "");
        return item[key] || "N/A";
      });
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.csv`;
    link.click();
  };

  const downloadPDF = (
    data: any[],
    headers: string[],
    fileName: string,
    reportType: string
  ) => {
    const textContent = `${reportType.toUpperCase()}\n\nGenerated: ${new Date().toLocaleString()}\nTotal Records: ${data.length}\n\n${headers.join(" | ")}\n${"=".repeat(80)}\n${data.map((item) => Object.values(item).join(" | ")).join("\n")}`;

    const blob = new Blob([textContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.txt`;
    link.click();
  };

  const attendanceColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      render: (time: string) =>
        time ? new Date(time).toLocaleTimeString() : "N/A",
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (time: string) => time || "In Progress",
    },
    {
      title: "Working Time",
      dataIndex: "workingTime",
      key: "workingTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "present" ? "green" : "red"}>
          {status ? status.toUpperCase() : "N/A"}
        </Tag>
      ),
    },
  ];

  const overtimeColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Working Hours",
      dataIndex: "workingHours",
      key: "workingHours",
      render: (hours: number) => `${hours?.toFixed(2) || 0} hrs`,
    },
    {
      title: "Expected Hours",
      dataIndex: "expectedHours",
      key: "expectedHours",
      render: (hours: number) => `${hours?.toFixed(2) || 0} hrs`,
    },
    {
      title: "Overtime",
      dataIndex: "overtime",
      key: "overtime",
      render: (hours: number) => (
        <Tag color="orange">{hours?.toFixed(2) || 0} hrs</Tag>
      ),
    },
  ];

  const payrollColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Pay Type",
      dataIndex: "payType",
      key: "payType",
    },
    {
      title: "Base Pay",
      dataIndex: "basePay",
      key: "basePay",
      render: (pay: number, record: any) =>
        `${record.currency}${pay?.toLocaleString() || 0}`,
    },
    {
      title: "Hours Worked",
      dataIndex: "hoursWorked",
      key: "hoursWorked",
      render: (hours: number) => `${hours?.toFixed(2) || 0} hrs`,
    },
    {
      title: "Total Pay",
      dataIndex: "totalPay",
      key: "totalPay",
      render: (pay: number, record: any) => (
        <Tag color="green">
          {record.currency}
          {pay?.toLocaleString() || 0}
        </Tag>
      ),
    },
  ];

  const productivityColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Total Days",
      dataIndex: "totalDays",
      key: "totalDays",
    },
    {
      title: "Present",
      dataIndex: "presentDays",
      key: "presentDays",
      render: (days: number) => <Tag color="green">{days}</Tag>,
    },
    {
      title: "Absent",
      dataIndex: "absentDays",
      key: "absentDays",
      render: (days: number) => <Tag color="red">{days}</Tag>,
    },
    {
      title: "Attendance Rate",
      dataIndex: "attendanceRate",
      key: "attendanceRate",
      render: (rate: number) => `${rate}%`,
    },
    {
      title: "Avg Hours/Day",
      dataIndex: "avgHoursPerDay",
      key: "avgHoursPerDay",
      render: (hours: string) => `${hours} hrs`,
    },
  ];

  const cards = [
    {
      icon: <CalendarOutlined style={{ fontSize: 32, color: "#10b981" }} />,
      title: "Attendance Report",
      buttonText: "View",
      onClick: () => setAttendanceModal(true),
      showForEmployee: true,
    },
    {
      icon: <ClockCircleOutlined style={{ fontSize: 32, color: "#10b981" }} />,
      title: "Overtime Report",
      buttonText: "View",
      onClick: () => setOvertimeModal(true),
      showForEmployee: true,
    },
    {
      icon: <FileTextOutlined style={{ fontSize: 32, color: "#10b981" }} />,
      title: "Pay Roll Report",
      buttonText: "View",
      onClick: () => setPayrollModal(true),
      showForEmployee: true,
    },
    {
      icon: <RiseOutlined style={{ fontSize: 32, color: "#10b981" }} />,
      title: "Productivity Report",
      buttonText: "View",
      onClick: () => setProductivityModal(true),
      showForEmployee: true,
    },
  ];

  return (
    <>
      {/* Cards */}
      <Row gutter={[16, 16]} justify="start">
        {cards
          .filter(
            (card) => loggedInUser.userRole === "admin" || card.showForEmployee
          )
          .map((card, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={6}>
              <Card
                variant="outlined"
                style={{ textAlign: "center" }}
                styles={{ body: { padding: 24 } }}
              >
                {card.icon}
                <Text strong style={{ display: "block", marginTop: 12 }}>
                  {card.title}
                </Text>

                <Button
                  onClick={card.onClick}
                  style={{
                    marginTop: 16,
                    backgroundColor: "#10b981",
                    borderRadius: "20px",
                    borderColor: "#10b981",
                    color: "white",
                    width: "150px",
                  }}
                >
                  {card.buttonText}
                </Button>
              </Card>
            </Col>
          ))}
      </Row>

      {/* Select Report Section + Recent Reports Side by Side */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {/* Left Card — Select Report Type */}
        <Col xs={24} md={14}>
          <Card
            style={{
              borderRadius: "12px",
              width: "100%",
              marginBottom: "16px",
            }}
          >
            <Row align="middle" style={{ marginBottom: 12 }}>
              <CalendarOutlined style={{ fontSize: 20, color: "#10b981" }} />
              <Text strong style={{ marginLeft: 8 }}>
                Select Report Type
              </Text>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Select
                  placeholder="Department"
                  style={{ width: "100%", borderRadius: 8 }}
                  value={selectedDepartment}
                  onChange={setSelectedDepartment}
                  disabled={loggedInUser.userRole === "employee"}
                >
                  {departments.map((dept) => (
                    <Option key={dept} value={dept}>
                      {dept}
                    </Option>
                  ))}
                </Select>
              </Col>

              <Col xs={24} sm={12}>
                <Select
                  placeholder="Report Rules"
                  style={{ width: "100%", borderRadius: 8 }}
                  value={selectedReportType}
                  onChange={setSelectedReportType}
                >
                  <Option value="Attendance Report">Attendance Report</Option>
                  <Option value="Overtime Report">Overtime Report</Option>
                  <Option value="Pay Roll Report">Pay Roll Report</Option>
                  {loggedInUser.userRole === "admin" && (
                    <Option value="Productivity Report">
                      Productivity Report
                    </Option>
                  )}
                </Select>
              </Col>
            </Row>
          </Card>

          {/* Report Builder Card */}
          <Card
            style={{
              borderRadius: "12px",
              width: "100%",
            }}
          >
            <Row align="middle" style={{ marginBottom: 12 }}>
              <FileTextOutlined style={{ fontSize: 20, color: "#10b981" }} />
              <Text strong style={{ marginLeft: 8 }}>
                Report Builder
              </Text>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              {loggedInUser.userRole === "admin" && (
                <Col xs={24}>
                  <Text style={{ display: "block", marginBottom: 8 }}>
                    Select Employee
                  </Text>
                  <Space.Compact style={{ width: "100%" }}>
                    <Select
                      placeholder="All Employees"
                      style={{ width: "100%", borderRadius: 8 }}
                      value={selectedReportEmployee}
                      onChange={setSelectedReportEmployee}
                      showSearch
                      filterOption={(input, option) => {
                        const label = option?.label || option?.children;
                        const labelStr = Array.isArray(label)
                          ? label.join(" ")
                          : String(label || "");
                        return labelStr
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      }}
                    >
                      <Option value="all">All Employees</Option>
                      {getFilteredReportEmployees().map((emp) => (
                        <Option key={emp.email} value={emp.name}>
                          {emp.name} - {emp.specificRole}
                        </Option>
                      ))}
                    </Select>
                  </Space.Compact>
                </Col>
              )}

              <Col xs={24}>
                <Text style={{ display: "block", marginBottom: 8 }}>
                  Date Range
                </Text>
                <RangePicker
                  style={{ width: "100%" }}
                  value={dateRange}
                  onChange={setDateRange}
                />
              </Col>

              <Col xs={24} sm={12}>
                <Select
                  placeholder="Shift"
                  style={{ width: "100%", borderRadius: 8 }}
                  value={selectedShift}
                  onChange={setSelectedShift}
                >
                  <Option value="morning">Morning (6 AM - 2 PM)</Option>
                  <Option value="afternoon">Afternoon (2 PM - 10 PM)</Option>
                  <Option value="evening">Evening (10 PM - 6 AM)</Option>
                </Select>
              </Col>

              <Col xs={24} sm={12}>
                <Select
                  placeholder="Report Format"
                  style={{ width: "100%", borderRadius: 8 }}
                  value={reportFormat}
                  onChange={setReportFormat}
                >
                  <Option value="pdf">PDF</Option>
                  <Option value="csv">CSV</Option>
                </Select>
              </Col>
            </Row>

            <Row justify="center" style={{ marginTop: 24 }}>
              <Button
                onClick={handleGenerateReport}
                style={{
                  backgroundColor: "#10b981",
                  borderColor: "#10b981",
                  borderRadius: "20px",
                  color: "white",
                  width: "180px",
                }}
              >
                Generate Report
              </Button>
            </Row>
          </Card>
        </Col>

        {/* Right Card — Recent Reports */}
        <Col xs={24} md={10}>
          <Card style={{ borderRadius: "12px", width: "100%" }}>
            <Text strong style={{ fontSize: 16 }}>
              Recent Reports
            </Text>

            <div style={{ marginTop: 16 }}>
              {recentReports.length > 0 ? (
                recentReports.map((file, i) => (
                  <Row
                    key={i}
                    justify="space-between"
                    align="middle"
                    style={{
                      padding: "10px 0",
                      borderBottom:
                        i < recentReports.length - 1 ? "1px solid #f0f0f0" : "",
                    }}
                  >
                    <Row align="middle">
                      <FileTextOutlined
                        style={{
                          fontSize: 20,
                          marginRight: 8,
                          color: "#10b981",
                        }}
                      />
                      <div>
                        <Text>{file.name}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {file.date} - {file.type}
                        </Text>
                      </div>
                    </Row>

                    <Button
                      type="text"
                      icon={
                        <DownloadOutlined
                          style={{ fontSize: 18, color: "#10b981" }}
                        />
                      }
                      style={{ padding: 0 }}
                    />
                  </Row>
                ))
              ) : (
                <Text type="secondary">No recent reports</Text>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Attendance Modal */}
      <Modal
        title="Attendance Report"
        open={attendanceModal}
        onCancel={() => {
          setAttendanceModal(false);
          setSelectedEmployee("all");
          setSearchText("");
        }}
        footer={null}
        width={1000}
      >
        {loggedInUser.userRole === "admin" && (
          <Space style={{ marginBottom: 16, width: "100%" }}>
            <Select
              style={{ width: 200 }}
              placeholder="Select Employee"
              value={selectedEmployee}
              onChange={setSelectedEmployee}
            >
              <Option value="all">All Employees</Option>
              {employees.map((emp) => (
                <Option key={emp.email} value={emp.name}>
                  {emp.name}
                </Option>
              ))}
            </Select>
            <Input
              placeholder="Search by name..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </Space>
        )}
        <Table
          columns={attendanceColumns}
          dataSource={getFilteredAttendance()}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Modal>

      {/* Overtime Modal */}
      <Modal
        title="Overtime Report"
        open={overtimeModal}
        onCancel={() => {
          setOvertimeModal(false);
          setSelectedEmployee("all");
          setSearchText("");
        }}
        footer={null}
        width={1000}
      >
        {loggedInUser.userRole === "admin" && (
          <Space style={{ marginBottom: 16, width: "100%" }}>
            <Select
              style={{ width: 200 }}
              placeholder="Select Employee"
              value={selectedEmployee}
              onChange={setSelectedEmployee}
            >
              <Option value="all">All Employees</Option>
              {employees.map((emp) => (
                <Option key={emp.email} value={emp.name}>
                  {emp.name}
                </Option>
              ))}
            </Select>
            <Input
              placeholder="Search by name..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </Space>
        )}
        <Table
          columns={overtimeColumns}
          dataSource={getOvertimeData()}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Modal>

      {/* Payroll Modal */}
      <Modal
        title="Pay Roll Report"
        open={payrollModal}
        onCancel={() => {
          setPayrollModal(false);
          setSelectedEmployee("all");
          setSearchText("");
        }}
        footer={null}
        width={1000}
      >
        {loggedInUser.userRole === "admin" && (
          <Space style={{ marginBottom: 16, width: "100%" }}>
            <Select
              style={{ width: 200 }}
              placeholder="Select Employee"
              value={selectedEmployee}
              onChange={setSelectedEmployee}
            >
              <Option value="all">All Employees</Option>
              {employees.map((emp) => (
                <Option key={emp.email} value={emp.name}>
                  {emp.name}
                </Option>
              ))}
            </Select>
            <Input
              placeholder="Search by name..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </Space>
        )}
        <Table
          columns={payrollColumns}
          dataSource={getPayrollData()}
          rowKey="name"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Modal>

      {/* Productivity Modal */}
      <Modal
        title="Productivity Report"
        open={productivityModal}
        onCancel={() => {
          setProductivityModal(false);
          setSelectedEmployee("all");
          setSearchText("");
        }}
        footer={null}
        width={1100}
      >
        {loggedInUser.userRole === "admin" && (
          <Space style={{ marginBottom: 16, width: "100%" }}>
            <Select
              style={{ width: 200 }}
              placeholder="Select Employee"
              value={selectedEmployee}
              onChange={setSelectedEmployee}
            >
              <Option value="all">All Employees</Option>
              {employees.map((emp) => (
                <Option key={emp.email} value={emp.name}>
                  {emp.name}
                </Option>
              ))}
            </Select>
            <Input
              placeholder="Search by name..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </Space>
        )}
        <Table
          columns={productivityColumns}
          dataSource={getProductivityData()}
          rowKey="name"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 900 }}
        />
      </Modal>
    </>
  );
}
