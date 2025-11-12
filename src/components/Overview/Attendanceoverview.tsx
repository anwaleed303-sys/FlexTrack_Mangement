// // // // import React, { useState, useMemo, useEffect } from "react";
// // // // import { Card, Table, Select, Button, Tag, DatePicker, Row, Col } from "antd";
// // // // import { CalendarOutlined } from "@ant-design/icons";
// // // // import type { Dayjs } from "dayjs";
// // // // import dayjs from "dayjs";

// // // // const { RangePicker } = DatePicker;

// // // // interface AttendanceRecord {
// // // //   key: string;
// // // //   employeeName: string;
// // // //   department: string;
// // // //   chiefShift: string;
// // // //   workDuration: string;
// // // //   status: "Present" | "Absent";
// // // // }

// // // // interface DashboardAttendanceProps {
// // // //   dateRange: [Dayjs | null, Dayjs | null] | null;
// // // //   setDateRange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
// // // // }

// // // // const DashboardAttendance: React.FC<DashboardAttendanceProps> = ({
// // // //   dateRange,
// // // //   setDateRange,
// // // // }) => {
// // // //   const [department, setDepartment] = useState<string>("All");
// // // //   const [statusFilter, setStatusFilter] = useState<string>("All");
// // // //   const [shiftFilter, setShiftFilter] = useState<string>("All");

// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [departments, setDepartments] = useState<string[]>([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const pageSize = 5;

// // // //   useEffect(() => {
// // // //     const fetchDepartments = async () => {
// // // //       setLoading(true);
// // // //       try {
// // // //         // const response = await fetch("YOUR_API_ENDPOINT/departments");
// // // //         // const data = await response.json();
// // // //         // Assuming API returns array like: ["IT", "HR", "Sales"]
// // // //         // Or if it returns objects like: [{id: 1, name: "IT"}, ...]
// // // //         // then use: data.map(dept => dept.name)
// // // //         // setDepartments(data);
// // // //       } catch (error) {
// // // //         console.error("Error fetching departments:", error);
// // // //         // Optionally set fallback departments
// // // //         setDepartments(["IT", "HR", "Sales"]);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchDepartments();
// // // //   }, []);

// // // //   // Mock data - Replace with API call later
// // // //   const allData: AttendanceRecord[] = [
// // // //     {
// // // //       key: "1",
// // // //       employeeName: "Ali Khan",
// // // //       department: "IT",
// // // //       chiefShift: "Morning",
// // // //       workDuration: "8h 02m",
// // // //       status: "Present",
// // // //     },
// // // //     {
// // // //       key: "2",
// // // //       employeeName: "Sara Ahmed",
// // // //       department: "HR",
// // // //       chiefShift: "Morning",
// // // //       workDuration: "8h 00m",
// // // //       status: "Present",
// // // //     },
// // // //     {
// // // //       key: "3",
// // // //       employeeName: "Hamza Malik",
// // // //       department: "IT",
// // // //       chiefShift: "Evening",
// // // //       workDuration: "-",
// // // //       status: "Absent",
// // // //     },
// // // //     {
// // // //       key: "4",
// // // //       employeeName: "Ayesha Tariq",
// // // //       department: "Sales",
// // // //       chiefShift: "Morning",
// // // //       workDuration: "8h 32m",
// // // //       status: "Present",
// // // //     },
// // // //     {
// // // //       key: "5",
// // // //       employeeName: "Usman Ali",
// // // //       department: "HR",
// // // //       chiefShift: "-",
// // // //       workDuration: "-",
// // // //       status: "Absent",
// // // //     },
// // // //     {
// // // //       key: "6",
// // // //       employeeName: "Fatima Noor",
// // // //       department: "IT",
// // // //       chiefShift: "Morning",
// // // //       workDuration: "8h 15m",
// // // //       status: "Present",
// // // //     },
// // // //     {
// // // //       key: "7",
// // // //       employeeName: "Ahmed Hassan",
// // // //       department: "Sales",
// // // //       chiefShift: "Evening",
// // // //       workDuration: "7h 45m",
// // // //       status: "Present",
// // // //     },
// // // //     {
// // // //       key: "8",
// // // //       employeeName: "Zainab Khan",
// // // //       department: "HR",
// // // //       chiefShift: "-",
// // // //       workDuration: "-",
// // // //       status: "Absent",
// // // //     },
// // // //     {
// // // //       key: "9",
// // // //       employeeName: "Bilal Ahmed",
// // // //       department: "IT",
// // // //       chiefShift: "Morning",
// // // //       workDuration: "8h 20m",
// // // //       status: "Present",
// // // //     },
// // // //   ];

// // // //   // Filter data based on selections
// // // //   const filteredData = useMemo(() => {
// // // //     return allData.filter((record) => {
// // // //       const matchDepartment =
// // // //         department === "All" || record.department === department;
// // // //       const matchStatus =
// // // //         statusFilter === "All" || record.status === statusFilter;
// // // //       const matchShift =
// // // //         shiftFilter === "All" || record.chiefShift === shiftFilter;

// // // //       return matchDepartment && matchStatus && matchShift;
// // // //     });
// // // //   }, [department, statusFilter, shiftFilter]);

// // // //   // Calculate summary statistics
// // // //   const summary = useMemo(() => {
// // // //     const totalPresent = filteredData.filter(
// // // //       (r) => r.status === "Present"
// // // //     ).length;
// // // //     const totalAbsent = filteredData.filter(
// // // //       (r) => r.status === "Absent"
// // // //     ).length;

// // // //     // Calculate average work hours
// // // //     const presentRecords = filteredData.filter((r) => r.status === "Present");
// // // //     const totalMinutes = presentRecords.reduce((acc, record) => {
// // // //       const match = record.workDuration.match(/(\d+)h\s*(\d+)m/);
// // // //       if (match) {
// // // //         return acc + parseInt(match[1]) * 60 + parseInt(match[2]);
// // // //       }
// // // //       return acc;
// // // //     }, 0);

// // // //     const avgMinutes = presentRecords.length
// // // //       ? Math.round(totalMinutes / presentRecords.length)
// // // //       : 0;
// // // //     const avgHours = Math.floor(avgMinutes / 60);
// // // //     const avgMins = avgMinutes % 60;

// // // //     return {
// // // //       totalPresent,
// // // //       totalAbsent,
// // // //       avgWorkHours: `${avgHours}h ${avgMins}m`,
// // // //     };
// // // //   }, [filteredData]);

// // // //   const columns = [
// // // //     {
// // // //       title: "Employee Name",
// // // //       dataIndex: "employeeName",
// // // //       key: "employeeName",
// // // //       width: "25%",
// // // //     },
// // // //     {
// // // //       title: "Department",
// // // //       dataIndex: "department",
// // // //       key: "department",
// // // //       width: "20%",
// // // //     },
// // // //     {
// // // //       title: "Chief Shift",
// // // //       dataIndex: "chiefShift",
// // // //       key: "chiefShift",
// // // //       width: "20%",
// // // //     },
// // // //     {
// // // //       title: "Work Duration",
// // // //       dataIndex: "workDuration",
// // // //       key: "workDuration",
// // // //       width: "20%",
// // // //     },
// // // //     {
// // // //       title: "Status",
// // // //       dataIndex: "status",
// // // //       key: "status",
// // // //       width: "15%",
// // // //       render: (status: "Present" | "Absent") => (
// // // //         <Tag
// // // //           color={status === "Present" ? "#10b981" : "#ef4444"}
// // // //           style={{
// // // //             borderRadius: "12px",
// // // //             padding: "2px 10px",
// // // //             fontSize: "12px",
// // // //             border: "none",
// // // //             fontWeight: 500,
// // // //           }}
// // // //         >
// // // //           {status}
// // // //         </Tag>
// // // //       ),
// // // //     },
// // // //   ];

// // // //   const formatDateRange = () => {
// // // //     if (dateRange && dateRange[0] && dateRange[1]) {
// // // //       return `${dateRange[0].format("MMMM D")} - ${dateRange[1].format("MMMM D, YYYY")}`;
// // // //     }
// // // //     return "Select Date Range";
// // // //   };

// // // //   // CSV Export Function
// // // //   const handleExportCSV = () => {
// // // //     try {
// // // //       // Convert filtered data to CSV format
// // // //       const csvHeaders = [
// // // //         "Employee Name",
// // // //         "Department",
// // // //         "Chief Shift",
// // // //         "Work Duration",
// // // //         "Status",
// // // //       ];

// // // //       // Create CSV content
// // // //       const csvRows = [
// // // //         csvHeaders.join(","), // Header row
// // // //         ...filteredData.map((record) =>
// // // //           [
// // // //             `"${record.employeeName}"`,
// // // //             `"${record.department}"`,
// // // //             `"${record.chiefShift}"`,
// // // //             `"${record.workDuration}"`,
// // // //             `"${record.status}"`,
// // // //           ].join(",")
// // // //         ),
// // // //       ];

// // // //       const csvContent = csvRows.join("\n");

// // // //       // Create a Blob from the CSV content
// // // //       const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

// // // //       // Create download link
// // // //       const link = document.createElement("a");
// // // //       const url = URL.createObjectURL(blob);

// // // //       // Generate filename with current date and filters
// // // //       const today = dayjs().format("YYYY-MM-DD");
// // // //       const filterInfo = [];
// // // //       if (department !== "All") filterInfo.push(department);
// // // //       if (statusFilter !== "All") filterInfo.push(statusFilter);
// // // //       if (shiftFilter !== "All") filterInfo.push(shiftFilter);

// // // //       const filename = `attendance_${today}${
// // // //         filterInfo.length > 0 ? "_" + filterInfo.join("_") : ""
// // // //       }.csv`;

// // // //       link.setAttribute("href", url);
// // // //       link.setAttribute("download", filename);
// // // //       link.style.visibility = "hidden";

// // // //       // Trigger download
// // // //       document.body.appendChild(link);
// // // //       link.click();
// // // //       document.body.removeChild(link);

// // // //       // Clean up
// // // //       URL.revokeObjectURL(url);

// // // //       console.log(`Exported ${filteredData.length} records to ${filename}`);
// // // //     } catch (error) {
// // // //       console.error("Error exporting CSV:", error);
// // // //       alert("Failed to export CSV. Please try again.");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         padding: "16px",
// // // //         minHeight: "100vh",
// // // //         fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
// // // //         width: "100%",
// // // //         overflowX: "hidden",
// // // //       }}
// // // //     >
// // // //       {/* Filters Row */}
// // // //       <Row gutter={[8, 8]} style={{ marginBottom: "20px" }}>
// // // //         <Col xs={24} sm={12} md={12} lg={6}>
// // // //           <Select
// // // //             style={{ width: "100%" }}
// // // //             value={department}
// // // //             onChange={setDepartment}
// // // //             size="large"
// // // //             loading={loading}
// // // //           >
// // // //             <Select.Option value="All">All Departments</Select.Option>
// // // //             {departments.map((dept) => (
// // // //               <Select.Option key={dept} value={dept}>
// // // //                 {dept}
// // // //               </Select.Option>
// // // //             ))}
// // // //           </Select>
// // // //         </Col>
// // // //         <Col xs={12} sm={6} md={6} lg={5}>
// // // //           <Select
// // // //             style={{ width: "100%" }}
// // // //             value={statusFilter}
// // // //             onChange={setStatusFilter}
// // // //             size="large"
// // // //           >
// // // //             <Select.Option value="All">All</Select.Option>
// // // //             <Select.Option value="Present">Present</Select.Option>
// // // //             <Select.Option value="Absent">Absent</Select.Option>
// // // //           </Select>
// // // //         </Col>
// // // //         <Col xs={12} sm={6} md={6} lg={6}>
// // // //           <Select
// // // //             style={{ width: "100%" }}
// // // //             value={shiftFilter}
// // // //             onChange={setShiftFilter}
// // // //             size="large"
// // // //           >
// // // //             <Select.Option value="All">All Shifts</Select.Option>
// // // //             <Select.Option value="Morning">Morning</Select.Option>
// // // //             <Select.Option value="Evening">Evening</Select.Option>
// // // //           </Select>
// // // //         </Col>
// // // //         <Col xs={12} sm={6} md={6} lg={5}>
// // // //           <Button
// // // //             type="primary"
// // // //             size="large"
// // // //             onClick={handleExportCSV}
// // // //             style={{
// // // //               width: "100%",
// // // //               backgroundColor: "#10b981",
// // // //               borderColor: "#10b981",
// // // //               fontWeight: 600,
// // // //               height: "40px",
// // // //               borderRadius: "20px",
// // // //             }}
// // // //           >
// // // //             Export CSV
// // // //           </Button>
// // // //         </Col>
// // // //       </Row>
// // // //       {/* Date Picker and Summary Row */}
// // // //       <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
// // // //         <Col xs={24} sm={12} md={10} lg={16}>
// // // //           <RangePicker
// // // //             style={{ width: "100%", marginBottom: "16px" }}
// // // //             size="large"
// // // //             format="MMMM D, YYYY"
// // // //             placeholder={["Start Date", "End Date"]}
// // // //             suffixIcon={<CalendarOutlined style={{ color: "#6b7280" }} />}
// // // //             value={dateRange}
// // // //             onChange={(dates) =>
// // // //               setDateRange(dates as [Dayjs | null, Dayjs | null] | null)
// // // //             }
// // // //             popupStyle={{
// // // //               maxWidth: "calc(100vw - 32px)",
// // // //             }}
// // // //             getPopupContainer={(trigger) =>
// // // //               trigger.parentElement || document.body
// // // //             }
// // // //             panelRender={(panelNode) => (
// // // //               <div style={{ maxWidth: "100%", overflow: "auto" }}>
// // // //                 {panelNode}
// // // //               </div>
// // // //             )}
// // // //           />

// // // //           {/* Table directly below DatePicker */}
// // // //           <Card
// // // //             bordered={false}
// // // //             style={{
// // // //               borderRadius: "12px",
// // // //               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// // // //               marginTop: "8px",
// // // //             }}
// // // //             bodyStyle={{ padding: "16px" }}
// // // //           >
// // // //             <div style={{ overflowX: "auto" }}>
// // // //               <Table
// // // //                 columns={columns}
// // // //                 dataSource={filteredData}
// // // //                 pagination={{
// // // //                   current: currentPage,
// // // //                   pageSize: pageSize,
// // // //                   total: filteredData.length,
// // // //                   showSizeChanger: false,
// // // //                   position: ["bottomCenter"],
// // // //                   onChange: (page) => setCurrentPage(page),
// // // //                 }}
// // // //                 size="middle"
// // // //                 bordered={false}
// // // //                 scroll={{ x: "max-content" }}
// // // //                 style={{
// // // //                   backgroundColor: "#fff",
// // // //                 }}
// // // //               />
// // // //             </div>
// // // //             <div
// // // //               style={{
// // // //                 marginBottom: "12px",
// // // //                 color: "#6b7280",
// // // //                 fontSize: "14px",
// // // //               }}
// // // //             >
// // // //               Showing {filteredData.length} of {allData.length} records
// // // //             </div>
// // // //           </Card>
// // // //         </Col>

// // // //         <Col xs={24} sm={12} md={14} lg={8}>
// // // //           <Card
// // // //             title={
// // // //               <span
// // // //                 style={{
// // // //                   fontSize: "16px",
// // // //                   fontWeight: 700,
// // // //                   color: "#111827",
// // // //                 }}
// // // //               >
// // // //                 Weekly Summary
// // // //               </span>
// // // //             }
// // // //             bordered={false}
// // // //             style={{
// // // //               borderRadius: "12px",
// // // //               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// // // //             }}
// // // //             bodyStyle={{ padding: "16px" }}
// // // //           >
// // // //             <Row gutter={[8, 8]}>
// // // //               <Col span={24}>
// // // //                 <div
// // // //                   style={{
// // // //                     display: "flex",
// // // //                     justifyContent: "space-between",
// // // //                     alignItems: "center",
// // // //                     fontSize: "14px",
// // // //                   }}
// // // //                 >
// // // //                   <span style={{ color: "#111827" }}>Total Present:</span>
// // // //                   <span style={{ fontWeight: 600, color: "#6b7280" }}>
// // // //                     {summary.totalPresent}
// // // //                   </span>
// // // //                 </div>
// // // //               </Col>

// // // //               <Col span={24}>
// // // //                 <div
// // // //                   style={{
// // // //                     display: "flex",
// // // //                     justifyContent: "space-between",
// // // //                     alignItems: "center",
// // // //                     fontSize: "14px",
// // // //                   }}
// // // //                 >
// // // //                   <span style={{ color: "#111827" }}>Total Absentees:</span>
// // // //                   <span style={{ fontWeight: 600, color: "#6b7280" }}>
// // // //                     {summary.totalAbsent}
// // // //                   </span>
// // // //                 </div>
// // // //               </Col>

// // // //               <Col span={24}>
// // // //                 <div
// // // //                   style={{
// // // //                     display: "flex",
// // // //                     justifyContent: "space-between",
// // // //                     alignItems: "center",
// // // //                     fontSize: "14px",
// // // //                   }}
// // // //                 >
// // // //                   <span style={{ color: "#111827" }}>Avg. Work Hours:</span>
// // // //                   <span style={{ fontWeight: 600, color: "#6b7280" }}>
// // // //                     {summary.avgWorkHours}
// // // //                   </span>
// // // //                 </div>
// // // //               </Col>
// // // //             </Row>
// // // //           </Card>
// // // //         </Col>
// // // //       </Row>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DashboardAttendance;

// // // import React, { useState, useMemo, useEffect } from "react";
// // // import {
// // //   Card,
// // //   Table,
// // //   Select,
// // //   Button,
// // //   Tag,
// // //   DatePicker,
// // //   Row,
// // //   Col,
// // //   message,
// // // } from "antd";
// // // import { CalendarOutlined } from "@ant-design/icons";
// // // import type { Dayjs } from "dayjs";
// // // import dayjs from "dayjs";
// // // import axios from "axios";

// // // const { RangePicker } = DatePicker;

// // // const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// // // interface AttendanceRecord {
// // //   key: string;
// // //   _id: string;
// // //   employeeName: string;
// // //   department: string;
// // //   chiefShift: string;
// // //   workDuration: string;
// // //   status: "Present" | "Absent" | "Late" | "Half-Day";
// // //   date: string;
// // //   checkIn: string | null;
// // //   checkOut: string | null;
// // // }

// // // interface DashboardAttendanceProps {
// // //   dateRange: [Dayjs | null, Dayjs | null] | null;
// // //   setDateRange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
// // // }

// // // const DashboardAttendance: React.FC<DashboardAttendanceProps> = ({
// // //   dateRange,
// // //   setDateRange,
// // // }) => {
// // //   const [department, setDepartment] = useState<string>("All");
// // //   const [statusFilter, setStatusFilter] = useState<string>("All");
// // //   const [shiftFilter, setShiftFilter] = useState<string>("All");
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [departments, setDepartments] = useState<string[]>([]);
// // //   const [allData, setAllData] = useState<AttendanceRecord[]>([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const pageSize = 5;

// // //   // Get auth token
// // //   const getAuthConfig = () => {
// // //     const token = localStorage.getItem("token");
// // //     return {
// // //       headers: {
// // //         Authorization: `Bearer ${token}`,
// // //       },
// // //     };
// // //   };

// // //   // Fetch departments
// // //   useEffect(() => {
// // //     const fetchDepartments = async () => {
// // //       try {
// // //         const response = await axios.get(
// // //           `${API_URL}/attendance/departments`,
// // //           getAuthConfig()
// // //         );
// // //         if (response.data.success) {
// // //           setDepartments(response.data.data.departments);
// // //         }
// // //       } catch (error: any) {
// // //         console.error("Error fetching departments:", error);
// // //         message.error("Failed to fetch departments");
// // //       }
// // //     };

// // //     fetchDepartments();
// // //   }, []);

// // //   // Fetch attendance data
// // //   useEffect(() => {
// // //     const fetchAttendance = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const params: any = {};

// // //         if (dateRange && dateRange[0] && dateRange[1]) {
// // //           params.startDate = dateRange[0].format("YYYY-MM-DD");
// // //           params.endDate = dateRange[1].format("YYYY-MM-DD");
// // //         }

// // //         const response = await axios.get(`${API_URL}/attendance/list`, {
// // //           ...getAuthConfig(),
// // //           params,
// // //         });

// // //         if (response.data.success) {
// // //           setAllData(response.data.data.attendance);
// // //         }
// // //       } catch (error: any) {
// // //         console.error("Error fetching attendance:", error);
// // //         message.error("Failed to fetch attendance records");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchAttendance();
// // //   }, [dateRange]);

// // //   // Filter data based on selections
// // //   const filteredData = useMemo(() => {
// // //     return allData.filter((record) => {
// // //       const matchDepartment =
// // //         department === "All" || record.department === department;
// // //       const matchStatus =
// // //         statusFilter === "All" || record.status === statusFilter;
// // //       const matchShift =
// // //         shiftFilter === "All" || record.chiefShift === shiftFilter;

// // //       return matchDepartment && matchStatus && matchShift;
// // //     });
// // //   }, [allData, department, statusFilter, shiftFilter]);

// // //   // Calculate summary statistics
// // //   const summary = useMemo(() => {
// // //     const totalPresent = filteredData.filter(
// // //       (r) => r.status === "Present"
// // //     ).length;
// // //     const totalAbsent = filteredData.filter(
// // //       (r) => r.status === "Absent"
// // //     ).length;

// // //     // Calculate average work hours
// // //     const presentRecords = filteredData.filter((r) => r.status === "Present");
// // //     const totalMinutes = presentRecords.reduce((acc, record) => {
// // //       const match = record.workDuration.match(/(\d+)h\s*(\d+)m/);
// // //       if (match) {
// // //         return acc + parseInt(match[1]) * 60 + parseInt(match[2]);
// // //       }
// // //       return acc;
// // //     }, 0);

// // //     const avgMinutes = presentRecords.length
// // //       ? Math.round(totalMinutes / presentRecords.length)
// // //       : 0;
// // //     const avgHours = Math.floor(avgMinutes / 60);
// // //     const avgMins = avgMinutes % 60;

// // //     return {
// // //       totalPresent,
// // //       totalAbsent,
// // //       avgWorkHours: `${avgHours}h ${avgMins}m`,
// // //     };
// // //   }, [filteredData]);

// // //   const columns = [
// // //     {
// // //       title: "Employee Name",
// // //       dataIndex: "employeeName",
// // //       key: "employeeName",
// // //       width: "25%",
// // //     },
// // //     {
// // //       title: "Department",
// // //       dataIndex: "department",
// // //       key: "department",
// // //       width: "20%",
// // //     },
// // //     {
// // //       title: "Chief Shift",
// // //       dataIndex: "chiefShift",
// // //       key: "chiefShift",
// // //       width: "20%",
// // //     },
// // //     {
// // //       title: "Work Duration",
// // //       dataIndex: "workDuration",
// // //       key: "workDuration",
// // //       width: "20%",
// // //     },
// // //     {
// // //       title: "Status",
// // //       dataIndex: "status",
// // //       key: "status",
// // //       width: "15%",
// // //       render: (status: "Present" | "Absent" | "Late" | "Half-Day") => (
// // //         <Tag
// // //           color={status === "Present" ? "#10b981" : "#ef4444"}
// // //           style={{
// // //             borderRadius: "12px",
// // //             padding: "2px 10px",
// // //             fontSize: "12px",
// // //             border: "none",
// // //             fontWeight: 500,
// // //           }}
// // //         >
// // //           {status}
// // //         </Tag>
// // //       ),
// // //     },
// // //   ];

// // //   const formatDateRange = () => {
// // //     if (dateRange && dateRange[0] && dateRange[1]) {
// // //       return `${dateRange[0].format("MMMM D")} - ${dateRange[1].format("MMMM D, YYYY")}`;
// // //     }
// // //     return "Select Date Range";
// // //   };

// // //   // CSV Export Function
// // //   const handleExportCSV = () => {
// // //     try {
// // //       const csvHeaders = [
// // //         "Employee Name",
// // //         "Department",
// // //         "Chief Shift",
// // //         "Work Duration",
// // //         "Status",
// // //       ];

// // //       const csvRows = [
// // //         csvHeaders.join(","),
// // //         ...filteredData.map((record) =>
// // //           [
// // //             `"${record.employeeName}"`,
// // //             `"${record.department}"`,
// // //             `"${record.chiefShift}"`,
// // //             `"${record.workDuration}"`,
// // //             `"${record.status}"`,
// // //           ].join(",")
// // //         ),
// // //       ];

// // //       const csvContent = csvRows.join("\n");
// // //       const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
// // //       const link = document.createElement("a");
// // //       const url = URL.createObjectURL(blob);

// // //       const today = dayjs().format("YYYY-MM-DD");
// // //       const filterInfo = [];
// // //       if (department !== "All") filterInfo.push(department);
// // //       if (statusFilter !== "All") filterInfo.push(statusFilter);
// // //       if (shiftFilter !== "All") filterInfo.push(shiftFilter);

// // //       const filename = `attendance_${today}${
// // //         filterInfo.length > 0 ? "_" + filterInfo.join("_") : ""
// // //       }.csv`;

// // //       link.setAttribute("href", url);
// // //       link.setAttribute("download", filename);
// // //       link.style.visibility = "hidden";

// // //       document.body.appendChild(link);
// // //       link.click();
// // //       document.body.removeChild(link);

// // //       URL.revokeObjectURL(url);
// // //       message.success(`Exported ${filteredData.length} records successfully`);
// // //     } catch (error) {
// // //       console.error("Error exporting CSV:", error);
// // //       message.error("Failed to export CSV. Please try again.");
// // //     }
// // //   };

// // //   return (
// // //     <div
// // //       style={{
// // //         padding: "16px",
// // //         minHeight: "100vh",
// // //         fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
// // //         width: "100%",
// // //         overflowX: "hidden",
// // //       }}
// // //     >
// // //       {/* Filters Row */}
// // //       <Row gutter={[8, 8]} style={{ marginBottom: "20px" }}>
// // //         <Col xs={24} sm={12} md={12} lg={6}>
// // //           <Select
// // //             style={{ width: "100%" }}
// // //             value={department}
// // //             onChange={setDepartment}
// // //             size="large"
// // //             loading={loading}
// // //           >
// // //             <Select.Option value="All">All Departments</Select.Option>
// // //             {departments.map((dept) => (
// // //               <Select.Option key={dept} value={dept}>
// // //                 {dept}
// // //               </Select.Option>
// // //             ))}
// // //           </Select>
// // //         </Col>
// // //         <Col xs={12} sm={6} md={6} lg={5}>
// // //           <Select
// // //             style={{ width: "100%" }}
// // //             value={statusFilter}
// // //             onChange={setStatusFilter}
// // //             size="large"
// // //           >
// // //             <Select.Option value="All">All</Select.Option>
// // //             <Select.Option value="Present">Present</Select.Option>
// // //             <Select.Option value="Absent">Absent</Select.Option>
// // //             <Select.Option value="Late">Late</Select.Option>
// // //             <Select.Option value="Half-Day">Half-Day</Select.Option>
// // //           </Select>
// // //         </Col>
// // //         <Col xs={12} sm={6} md={6} lg={6}>
// // //           <Select
// // //             style={{ width: "100%" }}
// // //             value={shiftFilter}
// // //             onChange={setShiftFilter}
// // //             size="large"
// // //           >
// // //             <Select.Option value="All">All Shifts</Select.Option>
// // //             <Select.Option value="Morning">Morning</Select.Option>
// // //             <Select.Option value="Evening">Evening</Select.Option>
// // //           </Select>
// // //         </Col>
// // //         <Col xs={12} sm={6} md={6} lg={5}>
// // //           <Button
// // //             type="primary"
// // //             size="large"
// // //             onClick={handleExportCSV}
// // //             disabled={filteredData.length === 0}
// // //             style={{
// // //               width: "100%",
// // //               backgroundColor: "#10b981",
// // //               borderColor: "#10b981",
// // //               fontWeight: 600,
// // //               height: "40px",
// // //               borderRadius: "20px",
// // //             }}
// // //           >
// // //             Export CSV
// // //           </Button>
// // //         </Col>
// // //       </Row>

// // //       {/* Date Picker and Summary Row */}
// // //       <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
// // //         <Col xs={24} sm={12} md={10} lg={16}>
// // //           <RangePicker
// // //             style={{ width: "100%", marginBottom: "16px" }}
// // //             size="large"
// // //             format="MMMM D, YYYY"
// // //             placeholder={["Start Date", "End Date"]}
// // //             suffixIcon={<CalendarOutlined style={{ color: "#6b7280" }} />}
// // //             value={dateRange}
// // //             onChange={(dates) =>
// // //               setDateRange(dates as [Dayjs | null, Dayjs | null] | null)
// // //             }
// // //             popupStyle={{
// // //               maxWidth: "calc(100vw - 32px)",
// // //             }}
// // //             getPopupContainer={(trigger) =>
// // //               trigger.parentElement || document.body
// // //             }
// // //             panelRender={(panelNode) => (
// // //               <div style={{ maxWidth: "100%", overflow: "auto" }}>
// // //                 {panelNode}
// // //               </div>
// // //             )}
// // //           />

// // //           {/* Table */}
// // //           <Card
// // //             bordered={false}
// // //             style={{
// // //               borderRadius: "12px",
// // //               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// // //               marginTop: "8px",
// // //             }}
// // //             bodyStyle={{ padding: "16px" }}
// // //           >
// // //             <div style={{ overflowX: "auto" }}>
// // //               <Table
// // //                 columns={columns}
// // //                 dataSource={filteredData}
// // //                 loading={loading}
// // //                 pagination={{
// // //                   current: currentPage,
// // //                   pageSize: pageSize,
// // //                   total: filteredData.length,
// // //                   showSizeChanger: false,
// // //                   position: ["bottomCenter"],
// // //                   onChange: (page) => setCurrentPage(page),
// // //                 }}
// // //                 size="middle"
// // //                 bordered={false}
// // //                 scroll={{ x: "max-content" }}
// // //                 style={{
// // //                   backgroundColor: "#fff",
// // //                 }}
// // //               />
// // //             </div>
// // //             <div
// // //               style={{
// // //                 marginBottom: "12px",
// // //                 color: "#6b7280",
// // //                 fontSize: "14px",
// // //               }}
// // //             >
// // //               Showing {filteredData.length} of {allData.length} records
// // //             </div>
// // //           </Card>
// // //         </Col>

// // //         <Col xs={24} sm={12} md={14} lg={8}>
// // //           <Card
// // //             title={
// // //               <span
// // //                 style={{
// // //                   fontSize: "16px",
// // //                   fontWeight: 700,
// // //                   color: "#111827",
// // //                 }}
// // //               >
// // //                 Weekly Summary
// // //               </span>
// // //             }
// // //             bordered={false}
// // //             style={{
// // //               borderRadius: "12px",
// // //               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// // //             }}
// // //             bodyStyle={{ padding: "16px" }}
// // //           >
// // //             <Row gutter={[8, 8]}>
// // //               <Col span={24}>
// // //                 <div
// // //                   style={{
// // //                     display: "flex",
// // //                     justifyContent: "space-between",
// // //                     alignItems: "center",
// // //                     fontSize: "14px",
// // //                   }}
// // //                 >
// // //                   <span style={{ color: "#111827" }}>Total Present:</span>
// // //                   <span style={{ fontWeight: 600, color: "#6b7280" }}>
// // //                     {summary.totalPresent}
// // //                   </span>
// // //                 </div>
// // //               </Col>

// // //               <Col span={24}>
// // //                 <div
// // //                   style={{
// // //                     display: "flex",
// // //                     justifyContent: "space-between",
// // //                     alignItems: "center",
// // //                     fontSize: "14px",
// // //                   }}
// // //                 >
// // //                   <span style={{ color: "#111827" }}>Total Absentees:</span>
// // //                   <span style={{ fontWeight: 600, color: "#6b7280" }}>
// // //                     {summary.totalAbsent}
// // //                   </span>
// // //                 </div>
// // //               </Col>

// // //               <Col span={24}>
// // //                 <div
// // //                   style={{
// // //                     display: "flex",
// // //                     justifyContent: "space-between",
// // //                     alignItems: "center",
// // //                     fontSize: "14px",
// // //                   }}
// // //                 >
// // //                   <span style={{ color: "#111827" }}>Avg. Work Hours:</span>
// // //                   <span style={{ fontWeight: 600, color: "#6b7280" }}>
// // //                     {summary.avgWorkHours}
// // //                   </span>
// // //                 </div>
// // //               </Col>
// // //             </Row>
// // //           </Card>
// // //         </Col>
// // //       </Row>
// // //     </div>
// // //   );
// // // };

// // // export default DashboardAttendance;

// // import React, { useState, useMemo, useEffect } from "react";
// // import {
// //   Card,
// //   Table,
// //   Select,
// //   Button,
// //   Tag,
// //   DatePicker,
// //   Row,
// //   Col,
// //   Spin,
// //   message,
// // } from "antd";
// // import { CalendarOutlined } from "@ant-design/icons";
// // import type { Dayjs } from "dayjs";
// // import dayjs from "dayjs";
// // import axios from "axios";

// // const { RangePicker } = DatePicker;

// // interface EmployeeData {
// //   _id: string;
// //   name: string;
// //   email: string;
// //   specificRole: string;
// //   profileImage?: string;
// // }

// // interface AttendanceRecord {
// //   _id: string;
// //   key: string;
// //   employeeId: EmployeeData;
// //   employeeName: string;
// //   department: string;
// //   chiefShift: string;
// //   workDuration: string;
// //   status: "Present" | "Absent" | "Late" | "Half-Day";
// //   date: string;
// //   checkIn: string | null;
// //   checkOut: string | null;
// // }

// // interface DashboardAttendanceProps {
// //   dateRange: [Dayjs | null, Dayjs | null] | null;
// //   setDateRange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
// // }

// // const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// // const DashboardAttendance: React.FC<DashboardAttendanceProps> = ({
// //   dateRange,
// //   setDateRange,
// // }) => {
// //   const [department, setDepartment] = useState<string>("All");
// //   const [statusFilter, setStatusFilter] = useState<string>("All");
// //   const [shiftFilter, setShiftFilter] = useState<string>("All");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [departments, setDepartments] = useState<string[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [allData, setAllData] = useState<AttendanceRecord[]>([]);
// //   const [userRole, setUserRole] = useState<string>("");
// //   const pageSize = 5;

// //   // Get auth token
// //   const getAuthConfig = () => {
// //     const token = localStorage.getItem("token");
// //     return {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     };
// //   };

// //   // Fetch attendance data
// //   const fetchAttendanceData = async () => {
// //     setLoading(true);
// //     try {
// //       const params: any = {};

// //       if (dateRange && dateRange[0] && dateRange[1]) {
// //         params.startDate = dateRange[0].format("YYYY-MM-DD");
// //         params.endDate = dateRange[1].format("YYYY-MM-DD");
// //       }

// //       const response = await axios.get(`${API_URL}/attendance/list`, {
// //         ...getAuthConfig(),
// //         params,
// //       });

// //       if (response.data.success) {
// //         const records = response.data.data.attendance.map((record: any) => ({
// //           _id: record._id,
// //           key: record._id,
// //           employeeId: record.employeeId,
// //           employeeName: record.employeeId?.name || "Unknown",
// //           department: record.employeeId?.specificRole || "Unassigned",
// //           chiefShift: record.shift || "-",
// //           workDuration: record.workDuration || "-",
// //           status: record.status,
// //           date: record.date,
// //           checkIn: record.checkIn,
// //           checkOut: record.checkOut,
// //         }));

// //         setAllData(records);
// //         setUserRole(response.data.data.userRole);

// //         // Extract unique departments (only for admin)
// //         if (response.data.data.userRole === "admin") {
// //           const uniqueDepts = Array.from(
// //             new Set(records.map((r: AttendanceRecord) => r.department))
// //           ).filter((d) => d !== "Unassigned");
// //           setDepartments(uniqueDepts as string[]);
// //         }
// //       }
// //     } catch (error: any) {
// //       console.error("Error fetching attendance:", error);
// //       message.error(
// //         error.response?.data?.message || "Failed to fetch attendance data"
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Fetch data on mount and when date range changes
// //   useEffect(() => {
// //     fetchAttendanceData();
// //   }, [dateRange]);

// //   // Filter data based on selections
// //   const filteredData = useMemo(() => {
// //     return allData.filter((record) => {
// //       const matchDepartment =
// //         department === "All" || record.department === department;
// //       const matchStatus =
// //         statusFilter === "All" || record.status === statusFilter;
// //       const matchShift =
// //         shiftFilter === "All" || record.chiefShift === shiftFilter;

// //       return matchDepartment && matchStatus && matchShift;
// //     });
// //   }, [allData, department, statusFilter, shiftFilter]);

// //   // Calculate summary statistics
// //   const summary = useMemo(() => {
// //     const totalPresent = filteredData.filter(
// //       (r) => r.status === "Present" || r.status === "Late"
// //     ).length;
// //     const totalAbsent = filteredData.filter(
// //       (r) => r.status === "Absent"
// //     ).length;

// //     // Calculate average work hours
// //     const presentRecords = filteredData.filter(
// //       (r) => r.status === "Present" || r.status === "Late"
// //     );
// //     const totalMinutes = presentRecords.reduce((acc, record) => {
// //       const match = record.workDuration.match(/(\d+)h\s*(\d+)m/);
// //       if (match) {
// //         return acc + parseInt(match[1]) * 60 + parseInt(match[2]);
// //       }
// //       return acc;
// //     }, 0);

// //     const avgMinutes = presentRecords.length
// //       ? Math.round(totalMinutes / presentRecords.length)
// //       : 0;
// //     const avgHours = Math.floor(avgMinutes / 60);
// //     const avgMins = avgMinutes % 60;

// //     return {
// //       totalPresent,
// //       totalAbsent,
// //       avgWorkHours: `${avgHours}h ${avgMins}m`,
// //     };
// //   }, [filteredData]);

// //   const columns = [
// //     {
// //       title: "Employee Name",
// //       dataIndex: "employeeName",
// //       key: "employeeName",
// //       width: "25%",
// //     },
// //     {
// //       title: "Department",
// //       dataIndex: "department",
// //       key: "department",
// //       width: "20%",
// //     },
// //     {
// //       title: "Chief Shift",
// //       dataIndex: "chiefShift",
// //       key: "chiefShift",
// //       width: "20%",
// //     },
// //     {
// //       title: "Work Duration",
// //       dataIndex: "workDuration",
// //       key: "workDuration",
// //       width: "20%",
// //     },
// //     {
// //       title: "Status",
// //       dataIndex: "status",
// //       key: "status",
// //       width: "15%",
// //       render: (status: "Present" | "Absent" | "Late" | "Half-Day") => {
// //         const colorMap = {
// //           Present: "#10b981",
// //           Absent: "#ef4444",
// //           Late: "#f59e0b",
// //           "Half-Day": "#3b82f6",
// //         };
// //         return (
// //           <Tag
// //             color={colorMap[status]}
// //             style={{
// //               borderRadius: "12px",
// //               padding: "2px 10px",
// //               fontSize: "12px",
// //               border: "none",
// //               fontWeight: 500,
// //             }}
// //           >
// //             {status}
// //           </Tag>
// //         );
// //       },
// //     },
// //   ];

// //   const formatDateRange = () => {
// //     if (dateRange && dateRange[0] && dateRange[1]) {
// //       return `${dateRange[0].format("MMMM D")} - ${dateRange[1].format("MMMM D, YYYY")}`;
// //     }
// //     return "Select Date Range";
// //   };

// //   // CSV Export Function
// //   const handleExportCSV = () => {
// //     try {
// //       const csvHeaders = [
// //         "Employee Name",
// //         "Department",
// //         "Chief Shift",
// //         "Work Duration",
// //         "Status",
// //         "Date",
// //       ];

// //       const csvRows = [
// //         csvHeaders.join(","),
// //         ...filteredData.map((record) =>
// //           [
// //             `"${record.employeeName}"`,
// //             `"${record.department}"`,
// //             `"${record.chiefShift}"`,
// //             `"${record.workDuration}"`,
// //             `"${record.status}"`,
// //             `"${dayjs(record.date).format("YYYY-MM-DD")}"`,
// //           ].join(",")
// //         ),
// //       ];

// //       const csvContent = csvRows.join("\n");
// //       const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
// //       const link = document.createElement("a");
// //       const url = URL.createObjectURL(blob);

// //       const today = dayjs().format("YYYY-MM-DD");
// //       const filterInfo = [];
// //       if (department !== "All") filterInfo.push(department);
// //       if (statusFilter !== "All") filterInfo.push(statusFilter);
// //       if (shiftFilter !== "All") filterInfo.push(shiftFilter);

// //       const filename = `attendance_${today}${
// //         filterInfo.length > 0 ? "_" + filterInfo.join("_") : ""
// //       }.csv`;

// //       link.setAttribute("href", url);
// //       link.setAttribute("download", filename);
// //       link.style.visibility = "hidden";

// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //       URL.revokeObjectURL(url);

// //       message.success(`Exported ${filteredData.length} records successfully`);
// //     } catch (error) {
// //       console.error("Error exporting CSV:", error);
// //       message.error("Failed to export CSV. Please try again.");
// //     }
// //   };

// //   return (
// //     <div
// //       style={{
// //         padding: "16px",
// //         minHeight: "100vh",
// //         fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
// //         width: "100%",
// //         overflowX: "hidden",
// //       }}
// //     >
// //       {/* Filters Row - Only show for admin */}
// //       {userRole === "admin" && (
// //         <Row gutter={[8, 8]} style={{ marginBottom: "20px" }}>
// //           <Col xs={24} sm={12} md={12} lg={6}>
// //             <Select
// //               style={{ width: "100%" }}
// //               value={department}
// //               onChange={setDepartment}
// //               size="large"
// //               loading={loading}
// //             >
// //               <Select.Option value="All">All Departments</Select.Option>
// //               {departments.map((dept) => (
// //                 <Select.Option key={dept} value={dept}>
// //                   {dept}
// //                 </Select.Option>
// //               ))}
// //             </Select>
// //           </Col>
// //           <Col xs={12} sm={6} md={6} lg={5}>
// //             <Select
// //               style={{ width: "100%" }}
// //               value={statusFilter}
// //               onChange={setStatusFilter}
// //               size="large"
// //             >
// //               <Select.Option value="All">All Status</Select.Option>
// //               <Select.Option value="Present">Present</Select.Option>
// //               <Select.Option value="Absent">Absent</Select.Option>
// //               <Select.Option value="Late">Late</Select.Option>
// //               <Select.Option value="Half-Day">Half-Day</Select.Option>
// //             </Select>
// //           </Col>
// //           <Col xs={12} sm={6} md={6} lg={6}>
// //             <Select
// //               style={{ width: "100%" }}
// //               value={shiftFilter}
// //               onChange={setShiftFilter}
// //               size="large"
// //             >
// //               <Select.Option value="All">All Shifts</Select.Option>
// //               <Select.Option value="Morning">Morning</Select.Option>
// //               <Select.Option value="Evening">Evening</Select.Option>
// //               <Select.Option value="Night">Night</Select.Option>
// //             </Select>
// //           </Col>
// //           <Col xs={12} sm={6} md={6} lg={5}>
// //             <Button
// //               type="primary"
// //               size="large"
// //               onClick={handleExportCSV}
// //               disabled={loading || filteredData.length === 0}
// //               style={{
// //                 width: "100%",
// //                 backgroundColor: "#10b981",
// //                 borderColor: "#10b981",
// //                 fontWeight: 600,
// //                 height: "40px",
// //                 borderRadius: "20px",
// //               }}
// //             >
// //               Export CSV
// //             </Button>
// //           </Col>
// //         </Row>
// //       )}

// //       {/* Date Picker and Summary Row */}
// //       <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
// //         <Col xs={24} sm={12} md={10} lg={16}>
// //           <RangePicker
// //             style={{ width: "100%", marginBottom: "16px" }}
// //             size="large"
// //             format="MMMM D, YYYY"
// //             placeholder={["Start Date", "End Date"]}
// //             suffixIcon={<CalendarOutlined style={{ color: "#6b7280" }} />}
// //             value={dateRange}
// //             onChange={(dates) =>
// //               setDateRange(dates as [Dayjs | null, Dayjs | null] | null)
// //             }
// //             popupStyle={{
// //               maxWidth: "calc(100vw - 32px)",
// //             }}
// //             getPopupContainer={(trigger) =>
// //               trigger.parentElement || document.body
// //             }
// //           />

// //           {/* Table */}
// //           <Card
// //             bordered={false}
// //             style={{
// //               borderRadius: "12px",
// //               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //               marginTop: "8px",
// //             }}
// //             bodyStyle={{ padding: "16px" }}
// //           >
// //             <Spin spinning={loading}>
// //               <div style={{ overflowX: "auto" }}>
// //                 <Table
// //                   columns={columns}
// //                   dataSource={filteredData}
// //                   pagination={{
// //                     current: currentPage,
// //                     pageSize: pageSize,
// //                     total: filteredData.length,
// //                     showSizeChanger: false,
// //                     position: ["bottomCenter"],
// //                     onChange: (page) => setCurrentPage(page),
// //                   }}
// //                   size="middle"
// //                   bordered={false}
// //                   scroll={{ x: "max-content" }}
// //                   style={{
// //                     backgroundColor: "#fff",
// //                   }}
// //                 />
// //               </div>
// //               <div
// //                 style={{
// //                   marginTop: "12px",
// //                   color: "#6b7280",
// //                   fontSize: "14px",
// //                 }}
// //               >
// //                 Showing {filteredData.length} of {allData.length} records
// //               </div>
// //             </Spin>
// //           </Card>
// //         </Col>

// //         <Col xs={24} sm={12} md={14} lg={8}>
// //           <Card
// //             title={
// //               <span
// //                 style={{
// //                   fontSize: "16px",
// //                   fontWeight: 700,
// //                   color: "#111827",
// //                 }}
// //               >
// //                 {dateRange && dateRange[0] && dateRange[1]
// //                   ? "Period Summary"
// //                   : "Summary"}
// //               </span>
// //             }
// //             bordered={false}
// //             style={{
// //               borderRadius: "12px",
// //               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //             }}
// //             bodyStyle={{ padding: "16px" }}
// //           >
// //             <Row gutter={[8, 8]}>
// //               <Col span={24}>
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     justifyContent: "space-between",
// //                     alignItems: "center",
// //                     fontSize: "14px",
// //                   }}
// //                 >
// //                   <span style={{ color: "#111827" }}>Total Present:</span>
// //                   <span style={{ fontWeight: 600, color: "#6b7280" }}>
// //                     {summary.totalPresent}
// //                   </span>
// //                 </div>
// //               </Col>

// //               <Col span={24}>
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     justifyContent: "space-between",
// //                     alignItems: "center",
// //                     fontSize: "14px",
// //                   }}
// //                 >
// //                   <span style={{ color: "#111827" }}>Total Absentees:</span>
// //                   <span style={{ fontWeight: 600, color: "#6b7280" }}>
// //                     {summary.totalAbsent}
// //                   </span>
// //                 </div>
// //               </Col>

// //               <Col span={24}>
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     justifyContent: "space-between",
// //                     alignItems: "center",
// //                     fontSize: "14px",
// //                   }}
// //                 >
// //                   <span style={{ color: "#111827" }}>Avg. Work Hours:</span>
// //                   <span style={{ fontWeight: 600, color: "#6b7280" }}>
// //                     {summary.avgWorkHours}
// //                   </span>
// //                 </div>
// //               </Col>
// //             </Row>
// //           </Card>
// //         </Col>
// //       </Row>
// //     </div>
// //   );
// // };

// // export default DashboardAttendance;

// // import React, { useState, useMemo, useEffect } from "react";
// // import {
// //   Card,
// //   Table,
// //   Select,
// //   Button,
// //   Tag,
// //   DatePicker,
// //   Row,
// //   Col,
// //   Spin,
// //   message,
// // } from "antd";
// // import { CalendarOutlined } from "@ant-design/icons";
// // import type { Dayjs } from "dayjs";
// // import dayjs from "dayjs";
// // import axios from "axios";

// // const { RangePicker } = DatePicker;

// // interface EmployeeData {
// //   _id: string;
// //   name: string;
// //   email: string;
// //   specificRole: string;
// //   profileImage?: string;
// // }

// // interface AttendanceRecord {
// //   _id: string;
// //   key: string;
// //   employeeId: EmployeeData;
// //   employeeName: string;
// //   department: string;
// //   chiefShift: string;
// //   workDuration: string;
// //   status: "Present" | "Absent" | "Late" | "Half-Day";
// //   date: string;
// //   checkIn: string | null;
// //   checkOut: string | null;
// // }

// // interface DashboardAttendanceProps {
// //   dateRange: [Dayjs | null, Dayjs | null] | null;
// //   setDateRange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
// // }

// // const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// // const DashboardAttendance: React.FC<DashboardAttendanceProps> = ({
// //   dateRange,
// //   setDateRange,
// // }) => {
// //   const [department, setDepartment] = useState<string>("All");
// //   const [statusFilter, setStatusFilter] = useState<string>("All");
// //   const [shiftFilter, setShiftFilter] = useState<string>("All");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [departments, setDepartments] = useState<string[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [allEmployees, setAllEmployees] = useState<EmployeeData[]>([]);
// //   const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
// //   const [userRole, setUserRole] = useState<string>("");
// //   const [currentUserId, setCurrentUserId] = useState<string>("");
// //   const pageSize = 5;

// //   // Get auth token
// //   const getAuthConfig = () => {
// //     const token = localStorage.getItem("token");
// //     return {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     };
// //   };

// //   // Fetch all employees
// //   const fetchAllEmployees = async () => {
// //     try {
// //       const response = await axios.get(
// //         `${API_URL}/employees/list`,
// //         getAuthConfig()
// //       );

// //       if (response.data.success) {
// //         setAllEmployees(response.data.data.employees || []);

// //         // Extract unique departments
// //         const uniqueDepts = Array.from(
// //           new Set(
// //             response.data.data.employees
// //               .map((emp: EmployeeData) => emp.specificRole)
// //               .filter((role: string) => role && role !== "Unassigned")
// //           )
// //         );
// //         setDepartments(uniqueDepts as string[]);
// //       }
// //     } catch (error: any) {
// //       console.error("Error fetching employees:", error);
// //       message.error("Failed to fetch employees list");
// //     }
// //   };

// //   // Fetch attendance records
// //   const fetchAttendanceRecords = async () => {
// //     setLoading(true);
// //     try {
// //       const params: any = {};

// //       if (dateRange && dateRange[0] && dateRange[1]) {
// //         params.startDate = dateRange[0].format("YYYY-MM-DD");
// //         params.endDate = dateRange[1].format("YYYY-MM-DD");
// //       }

// //       const response = await axios.get(`${API_URL}/attendance/list`, {
// //         ...getAuthConfig(),
// //         params,
// //       });

// //       if (response.data.success) {
// //         setAttendanceRecords(response.data.data.attendance || []);
// //         setUserRole(response.data.data.userRole || "");
// //         setCurrentUserId(response.data.data.userId || "");
// //       }
// //     } catch (error: any) {
// //       console.error("Error fetching attendance:", error);
// //       message.error("Failed to fetch attendance records");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Fetch data on mount and when date range changes
// //   useEffect(() => {
// //     fetchAllEmployees();
// //     fetchAttendanceRecords();
// //   }, [dateRange]);

// //   // Merge employees with attendance data
// //   const mergedData = useMemo(() => {
// //     return allEmployees.map((employee) => {
// //       // Find attendance record for this employee
// //       const attendanceRecord = attendanceRecords.find(
// //         (record: any) => record.employeeId?._id === employee._id
// //       );

// //       return {
// //         _id: employee._id,
// //         key: employee._id,
// //         employeeId: employee,
// //         employeeName: employee.name || "Unknown",
// //         department: employee.specificRole || "Unassigned",
// //         chiefShift: attendanceRecord?.shift || "-",
// //         workDuration: attendanceRecord?.workDuration || "-",
// //         status: attendanceRecord?.status || "Absent",
// //         date: attendanceRecord?.date || null,
// //         checkIn: attendanceRecord?.checkIn || null,
// //         checkOut: attendanceRecord?.checkOut || null,
// //       };
// //     });
// //   }, [allEmployees, attendanceRecords]);

// //   // Filter data based on user role and selections
// //   const filteredData = useMemo(() => {
// //     let data = mergedData;

// //     // If employee, show only their data
// //     if (userRole === "employee") {
// //       data = data.filter((record) => record._id === currentUserId);
// //     }

// //     // Apply filters
// //     return data.filter((record) => {
// //       const matchDepartment =
// //         department === "All" || record.department === department;
// //       const matchStatus =
// //         statusFilter === "All" || record.status === statusFilter;
// //       const matchShift =
// //         shiftFilter === "All" || record.chiefShift === shiftFilter;

// //       return matchDepartment && matchStatus && matchShift;
// //     });
// //   }, [
// //     mergedData,
// //     department,
// //     statusFilter,
// //     shiftFilter,
// //     userRole,
// //     currentUserId,
// //   ]);

// //   // Calculate summary statistics
// //   const summary = useMemo(() => {
// //     const totalPresent = filteredData.filter(
// //       (r) => r.status === "Present" || r.status === "Late"
// //     ).length;
// //     const totalAbsent = filteredData.filter(
// //       (r) => r.status === "Absent"
// //     ).length;

// //     // Calculate average work hours
// //     const presentRecords = filteredData.filter(
// //       (r) =>
// //         (r.status === "Present" || r.status === "Late") &&
// //         r.workDuration !== "-"
// //     );
// //     const totalMinutes = presentRecords.reduce((acc, record) => {
// //       const match = record.workDuration.match(/(\d+)h\s*(\d+)m/);
// //       if (match) {
// //         return acc + parseInt(match[1]) * 60 + parseInt(match[2]);
// //       }
// //       return acc;
// //     }, 0);

// //     const avgMinutes = presentRecords.length
// //       ? Math.round(totalMinutes / presentRecords.length)
// //       : 0;
// //     const avgHours = Math.floor(avgMinutes / 60);
// //     const avgMins = avgMinutes % 60;

// //     return {
// //       totalPresent,
// //       totalAbsent,
// //       avgWorkHours:
// //         presentRecords.length > 0 ? `${avgHours}h ${avgMins}m` : "0h 0m",
// //     };
// //   }, [filteredData]);

// //   const columns = [
// //     {
// //       title: "Employee Name",
// //       dataIndex: "employeeName",
// //       key: "employeeName",
// //       width: "25%",
// //     },
// //     {
// //       title: "Department",
// //       dataIndex: "department",
// //       key: "department",
// //       width: "20%",
// //     },
// //     {
// //       title: "Chief Shift",
// //       dataIndex: "chiefShift",
// //       key: "chiefShift",
// //       width: "20%",
// //     },
// //     {
// //       title: "Work Duration",
// //       dataIndex: "workDuration",
// //       key: "workDuration",
// //       width: "20%",
// //     },
// //     {
// //       title: "Status",
// //       dataIndex: "status",
// //       key: "status",
// //       width: "15%",
// //       render: (status: "Present" | "Absent" | "Late" | "Half-Day") => {
// //         const colorMap = {
// //           Present: "#10b981",
// //           Absent: "#ef4444",
// //           Late: "#f59e0b",
// //           "Half-Day": "#3b82f6",
// //         };
// //         return (
// //           <Tag
// //             color={colorMap[status] || "#6b7280"}
// //             style={{
// //               borderRadius: "12px",
// //               padding: "2px 10px",
// //               fontSize: "12px",
// //               border: "none",
// //               fontWeight: 500,
// //             }}
// //           >
// //             {status}
// //           </Tag>
// //         );
// //       },
// //     },
// //   ];

// //   // CSV Export Function
// //   const handleExportCSV = () => {
// //     try {
// //       const csvHeaders = [
// //         "Employee Name",
// //         "Department",
// //         "Chief Shift",
// //         "Work Duration",
// //         "Status",
// //         "Date",
// //       ];

// //       const csvRows = [
// //         csvHeaders.join(","),
// //         ...filteredData.map((record) =>
// //           [
// //             `"${record.employeeName}"`,
// //             `"${record.department}"`,
// //             `"${record.chiefShift}"`,
// //             `"${record.workDuration}"`,
// //             `"${record.status}"`,
// //             `"${record.date ? dayjs(record.date).format("YYYY-MM-DD") : "N/A"}"`,
// //           ].join(",")
// //         ),
// //       ];

// //       const csvContent = csvRows.join("\n");
// //       const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
// //       const link = document.createElement("a");
// //       const url = URL.createObjectURL(blob);

// //       const today = dayjs().format("YYYY-MM-DD");
// //       const filterInfo = [];
// //       if (department !== "All") filterInfo.push(department);
// //       if (statusFilter !== "All") filterInfo.push(statusFilter);
// //       if (shiftFilter !== "All") filterInfo.push(shiftFilter);

// //       const filename = `attendance_${today}${
// //         filterInfo.length > 0 ? "_" + filterInfo.join("_") : ""
// //       }.csv`;

// //       link.setAttribute("href", url);
// //       link.setAttribute("download", filename);
// //       link.style.visibility = "hidden";

// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //       URL.revokeObjectURL(url);

// //       message.success(`Exported ${filteredData.length} records successfully`);
// //     } catch (error) {
// //       console.error("Error exporting CSV:", error);
// //       message.error("Failed to export CSV. Please try again.");
// //     }
// //   };

// //   return (
// //     <div
// //       style={{
// //         padding: "16px",
// //         minHeight: "100vh",
// //         fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
// //         width: "100%",
// //         overflowX: "hidden",
// //       }}
// //     >
// //       {/* Filters Row - Only show for admin */}
// //       {userRole === "admin" && (
// //         <Row gutter={[8, 8]} style={{ marginBottom: "20px" }}>
// //           <Col xs={24} sm={12} md={12} lg={6}>
// //             <Select
// //               style={{ width: "100%" }}
// //               value={department}
// //               onChange={setDepartment}
// //               size="large"
// //               loading={loading}
// //             >
// //               <Select.Option value="All">All Departments</Select.Option>
// //               {departments.map((dept) => (
// //                 <Select.Option key={dept} value={dept}>
// //                   {dept}
// //                 </Select.Option>
// //               ))}
// //             </Select>
// //           </Col>
// //           <Col xs={12} sm={6} md={6} lg={5}>
// //             <Select
// //               style={{ width: "100%" }}
// //               value={statusFilter}
// //               onChange={setStatusFilter}
// //               size="large"
// //             >
// //               <Select.Option value="All">All Status</Select.Option>
// //               <Select.Option value="Present">Present</Select.Option>
// //               <Select.Option value="Absent">Absent</Select.Option>
// //               <Select.Option value="Late">Late</Select.Option>
// //               <Select.Option value="Half-Day">Half-Day</Select.Option>
// //             </Select>
// //           </Col>
// //           <Col xs={12} sm={6} md={6} lg={6}>
// //             <Select
// //               style={{ width: "100%" }}
// //               value={shiftFilter}
// //               onChange={setShiftFilter}
// //               size="large"
// //             >
// //               <Select.Option value="All">All Shifts</Select.Option>
// //               <Select.Option value="Morning">Morning</Select.Option>
// //               <Select.Option value="Evening">Evening</Select.Option>
// //               <Select.Option value="Night">Night</Select.Option>
// //             </Select>
// //           </Col>
// //           <Col xs={12} sm={6} md={6} lg={5}>
// //             <Button
// //               type="primary"
// //               size="large"
// //               onClick={handleExportCSV}
// //               disabled={loading || filteredData.length === 0}
// //               style={{
// //                 width: "100%",
// //                 backgroundColor: "#10b981",
// //                 borderColor: "#10b981",
// //                 fontWeight: 600,
// //                 height: "40px",
// //                 borderRadius: "20px",
// //               }}
// //             >
// //               Export CSV
// //             </Button>
// //           </Col>
// //         </Row>
// //       )}

// //       {/* Date Picker and Summary Row */}
// //       <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
// //         <Col xs={24} sm={12} md={10} lg={16}>
// //           <RangePicker
// //             style={{ width: "100%", marginBottom: "16px" }}
// //             size="large"
// //             format="MMMM D, YYYY"
// //             placeholder={["Start Date", "End Date"]}
// //             suffixIcon={<CalendarOutlined style={{ color: "#6b7280" }} />}
// //             value={dateRange}
// //             onChange={(dates) =>
// //               setDateRange(dates as [Dayjs | null, Dayjs | null] | null)
// //             }
// //             popupStyle={{
// //               maxWidth: "calc(100vw - 32px)",
// //             }}
// //             getPopupContainer={(trigger) =>
// //               trigger.parentElement || document.body
// //             }
// //           />

// //           {/* Table */}
// //           <Card
// //             bordered={false}
// //             style={{
// //               borderRadius: "12px",
// //               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //               marginTop: "8px",
// //             }}
// //             bodyStyle={{ padding: "16px" }}
// //           >
// //             <Spin spinning={loading}>
// //               <div style={{ overflowX: "auto" }}>
// //                 <Table
// //                   columns={columns}
// //                   dataSource={filteredData}
// //                   pagination={{
// //                     current: currentPage,
// //                     pageSize: pageSize,
// //                     total: filteredData.length,
// //                     showSizeChanger: false,
// //                     position: ["bottomCenter"],
// //                     onChange: (page) => setCurrentPage(page),
// //                   }}
// //                   size="middle"
// //                   bordered={false}
// //                   scroll={{ x: "max-content" }}
// //                   style={{
// //                     backgroundColor: "#fff",
// //                   }}
// //                 />
// //               </div>
// //               <div
// //                 style={{
// //                   marginTop: "12px",
// //                   color: "#6b7280",
// //                   fontSize: "14px",
// //                 }}
// //               >
// //                 Showing {filteredData.length} of {mergedData.length} records
// //               </div>
// //             </Spin>
// //           </Card>
// //         </Col>

// //         <Col xs={24} sm={12} md={14} lg={8}>
// //           <Card
// //             title={
// //               <span
// //                 style={{
// //                   fontSize: "16px",
// //                   fontWeight: 700,
// //                   color: "#111827",
// //                 }}
// //               >
// //                 {dateRange && dateRange[0] && dateRange[1]
// //                   ? "Period Summary"
// //                   : "Summary"}
// //               </span>
// //             }
// //             bordered={false}
// //             style={{
// //               borderRadius: "12px",
// //               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //             }}
// //             bodyStyle={{ padding: "16px" }}
// //           >
// //             <Row gutter={[8, 8]}>
// //               <Col span={24}>
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     justifyContent: "space-between",
// //                     alignItems: "center",
// //                     fontSize: "14px",
// //                   }}
// //                 >
// //                   <span style={{ color: "#111827" }}>Total Present:</span>
// //                   <span style={{ fontWeight: 600, color: "#6b7280" }}>
// //                     {summary.totalPresent}
// //                   </span>
// //                 </div>
// //               </Col>

// //               <Col span={24}>
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     justifyContent: "space-between",
// //                     alignItems: "center",
// //                     fontSize: "14px",
// //                   }}
// //                 >
// //                   <span style={{ color: "#111827" }}>Total Absentees:</span>
// //                   <span style={{ fontWeight: 600, color: "#6b7280" }}>
// //                     {summary.totalAbsent}
// //                   </span>
// //                 </div>
// //               </Col>

// //               <Col span={24}>
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     justifyContent: "space-between",
// //                     alignItems: "center",
// //                     fontSize: "14px",
// //                   }}
// //                 >
// //                   <span style={{ color: "#111827" }}>Avg. Work Hours:</span>
// //                   <span style={{ fontWeight: 600, color: "#6b7280" }}>
// //                     {summary.avgWorkHours}
// //                   </span>
// //                 </div>
// //               </Col>
// //             </Row>
// //           </Card>
// //         </Col>
// //       </Row>
// //     </div>
// //   );
// // };

// // export default DashboardAttendance;

// import React, { useState, useMemo, useEffect } from "react";
// import {
//   Card,
//   Table,
//   Select,
//   Button,
//   Tag,
//   DatePicker,
//   Row,
//   Col,
//   Spin,
//   message,
// } from "antd";
// import { CalendarOutlined } from "@ant-design/icons";
// import type { Dayjs } from "dayjs";
// import dayjs from "dayjs";
// import axios from "axios";

// const { RangePicker } = DatePicker;

// interface EmployeeData {
//   _id: string;
//   name: string;
//   email: string;
//   specificRole: string;
//   profileImage?: string;
//   shift?: string;
// }

// interface AttendanceRecord {
//   _id: string;
//   key: string;
//   employeeId: EmployeeData;
//   employeeName: string;
//   department: string;
//   chiefShift: string;
//   workDuration: string;
//   status: "Present" | "Absent" | "Late" | "Half-Day";
//   date: string;
//   checkIn: string | null;
//   checkOut: string | null;
// }

// interface DashboardAttendanceProps {
//   dateRange: [Dayjs | null, Dayjs | null] | null;
//   setDateRange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
// }

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// const DashboardAttendance: React.FC<DashboardAttendanceProps> = ({
//   dateRange,
//   setDateRange,
// }) => {
//   const [department, setDepartment] = useState<string>("All");
//   const [statusFilter, setStatusFilter] = useState<string>("All");
//   const [shiftFilter, setShiftFilter] = useState<string>("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [departments, setDepartments] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [allEmployees, setAllEmployees] = useState<EmployeeData[]>([]);
//   const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
//   const [userRole, setUserRole] = useState<string>("");
//   const [currentUserId, setCurrentUserId] = useState<string>("");
//   const pageSize = 5;

//   // Get auth token
//   const getAuthConfig = () => {
//     const token = localStorage.getItem("token");
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   };

//   // Fetch all employees
//   // In DashboardAttendance component, update these functions:

//   // Fetch all employees
//   const fetchAllEmployees = async () => {
//     try {
//       console.log("Fetching employees...");
//       const response = await axios.get(
//         `${API_URL}/employees/list`,
//         getAuthConfig()
//       );

//       console.log("Employees response:", response.data);

//       if (response.data.success) {
//         const employees = response.data.data.employees || [];
//         console.log("Employees data:", employees);
//         setAllEmployees(employees);

//         // Extract unique departments from all employees
//         const uniqueDepts = Array.from(
//           new Set(
//             employees
//               .map((emp: EmployeeData) => emp.specificRole)
//               .filter(
//                 (role: string) =>
//                   role && role !== "Unassigned" && role.trim() !== ""
//               )
//           )
//         );
//         console.log("Departments:", uniqueDepts);
//         setDepartments(uniqueDepts as string[]);
//       }
//     } catch (error: any) {
//       console.error("Error fetching employees:", error);
//       console.error("Error response:", error.response?.data);
//       message.error("Failed to fetch employees list");
//     }
//   };

//   // Fetch attendance records
//   const fetchAttendanceRecords = async () => {
//     setLoading(true);
//     try {
//       console.log("Fetching attendance...");
//       const params: any = {};

//       if (dateRange && dateRange[0] && dateRange[1]) {
//         params.startDate = dateRange[0].format("YYYY-MM-DD");
//         params.endDate = dateRange[1].format("YYYY-MM-DD");
//       }

//       console.log("Attendance params:", params);

//       const response = await axios.get(`${API_URL}/attendance/list`, {
//         ...getAuthConfig(),
//         params,
//       });

//       console.log("Attendance response:", response.data);

//       if (response.data.success) {
//         setAttendanceRecords(response.data.data.attendance || []);
//         setUserRole(response.data.data.userRole || "");
//         setCurrentUserId(response.data.data.userId || "");
//         console.log("User role:", response.data.data.userRole);
//         console.log("User ID:", response.data.data.userId);
//       }
//     } catch (error: any) {
//       console.error("Error fetching attendance:", error);
//       console.error("Error response:", error.response?.data);
//       message.error("Failed to fetch attendance records");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data on mount and when date range changes
//   useEffect(() => {
//     fetchAllEmployees();
//   }, []);

//   useEffect(() => {
//     fetchAttendanceRecords();
//   }, [dateRange]);

//   // Merge employees with attendance data
//   const mergedData = useMemo(() => {
//     return allEmployees.map((employee) => {
//       // Find attendance record for this employee
//       const attendanceRecord = attendanceRecords.find(
//         (record: any) => record.employeeId?._id === employee._id
//       );

//       return {
//         _id: employee._id,
//         key: employee._id,
//         employeeId: employee,
//         employeeName: employee.name || "Unknown",
//         department: employee.specificRole || "Unassigned",
//         chiefShift: attendanceRecord?.shift || employee.shift || "-",
//         workDuration: attendanceRecord?.workDuration || "-",
//         status: attendanceRecord?.status || "Absent",
//         date: attendanceRecord?.date || null,
//         checkIn: attendanceRecord?.checkIn || null,
//         checkOut: attendanceRecord?.checkOut || null,
//       };
//     });
//   }, [allEmployees, attendanceRecords]);

//   // Filter data based on user role and selections
//   const filteredData = useMemo(() => {
//     let data = mergedData;

//     // If employee, show only their data
//     if (userRole === "employee") {
//       data = data.filter((record) => record._id === currentUserId);
//     }

//     // Apply filters
//     return data.filter((record) => {
//       const matchDepartment =
//         department === "All" || record.department === department;
//       const matchStatus =
//         statusFilter === "All" || record.status === statusFilter;
//       const matchShift =
//         shiftFilter === "All" || record.chiefShift === shiftFilter;

//       return matchDepartment && matchStatus && matchShift;
//     });
//   }, [
//     mergedData,
//     department,
//     statusFilter,
//     shiftFilter,
//     userRole,
//     currentUserId,
//   ]);

//   // Calculate summary statistics
//   const summary = useMemo(() => {
//     const totalPresent = filteredData.filter(
//       (r) => r.status === "Present" || r.status === "Late"
//     ).length;
//     const totalAbsent = filteredData.filter(
//       (r) => r.status === "Absent"
//     ).length;

//     // Calculate average work hours
//     const presentRecords = filteredData.filter(
//       (r) =>
//         (r.status === "Present" || r.status === "Late") &&
//         r.workDuration !== "-"
//     );
//     const totalMinutes = presentRecords.reduce((acc, record) => {
//       const match = record.workDuration.match(/(\d+)h\s*(\d+)m/);
//       if (match) {
//         return acc + parseInt(match[1]) * 60 + parseInt(match[2]);
//       }
//       return acc;
//     }, 0);

//     const avgMinutes = presentRecords.length
//       ? Math.round(totalMinutes / presentRecords.length)
//       : 0;
//     const avgHours = Math.floor(avgMinutes / 60);
//     const avgMins = avgMinutes % 60;

//     return {
//       totalPresent,
//       totalAbsent,
//       avgWorkHours:
//         presentRecords.length > 0 ? `${avgHours}h ${avgMins}m` : "0h 0m",
//     };
//   }, [filteredData]);

//   const columns = [
//     {
//       title: "Employee Name",
//       dataIndex: "employeeName",
//       key: "employeeName",
//       width: "25%",
//     },
//     {
//       title: "Department",
//       dataIndex: "department",
//       key: "department",
//       width: "20%",
//     },
//     {
//       title: "Chief Shift",
//       dataIndex: "chiefShift",
//       key: "chiefShift",
//       width: "20%",
//     },
//     {
//       title: "Work Duration",
//       dataIndex: "workDuration",
//       key: "workDuration",
//       width: "20%",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       width: "15%",
//       render: (status: "Present" | "Absent" | "Late" | "Half-Day") => {
//         const colorMap = {
//           Present: "#10b981",
//           Absent: "#ef4444",
//           Late: "#f59e0b",
//           "Half-Day": "#3b82f6",
//         };
//         return (
//           <Tag
//             color={colorMap[status] || "#6b7280"}
//             style={{
//               borderRadius: "12px",
//               padding: "2px 10px",
//               fontSize: "12px",
//               border: "none",
//               fontWeight: 500,
//             }}
//           >
//             {status}
//           </Tag>
//         );
//       },
//     },
//   ];

//   // CSV Export Function
//   const handleExportCSV = async () => {
//     try {
//       const params = new URLSearchParams();

//       if (dateRange && dateRange[0] && dateRange[1]) {
//         params.append("startDate", dateRange[0].format("YYYY-MM-DD"));
//         params.append("endDate", dateRange[1].format("YYYY-MM-DD"));
//       }

//       // Only add filters if user is admin
//       if (userRole === "admin") {
//         if (department !== "All") params.append("department", department);
//         if (statusFilter !== "All") params.append("status", statusFilter);
//         if (shiftFilter !== "All") params.append("shift", shiftFilter);
//       }

//       const response = await axios.get(
//         `${API_URL}/attendance/export-csv?${params.toString()}`,
//         {
//           ...getAuthConfig(),
//           responseType: "blob",
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;

//       const contentDisposition = response.headers["content-disposition"];
//       let filename = "attendance.csv";
//       if (contentDisposition) {
//         const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
//         if (filenameMatch) {
//           filename = filenameMatch[1];
//         }
//       }

//       link.setAttribute("download", filename);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       message.success(`Exported ${filteredData.length} records successfully`);
//     } catch (error) {
//       console.error("Error exporting CSV:", error);
//       message.error("Failed to export CSV. Please try again.");
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "16px",
//         minHeight: "100vh",
//         fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//         width: "100%",
//         overflowX: "hidden",
//       }}
//     >
//       {/* Filters Row */}
//       <Row gutter={[8, 8]} style={{ marginBottom: "20px" }}>
//         {userRole === "admin" && (
//           <>
//             <Col xs={24} sm={12} md={12} lg={6}>
//               <Select
//                 style={{ width: "100%" }}
//                 value={department}
//                 onChange={setDepartment}
//                 size="large"
//                 loading={loading}
//               >
//                 <Select.Option value="All">All Departments</Select.Option>
//                 {departments.map((dept) => (
//                   <Select.Option key={dept} value={dept}>
//                     {dept}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Col>
//             <Col xs={12} sm={6} md={6} lg={5}>
//               <Select
//                 style={{ width: "100%" }}
//                 value={statusFilter}
//                 onChange={setStatusFilter}
//                 size="large"
//               >
//                 <Select.Option value="All">All Status</Select.Option>
//                 <Select.Option value="Present">Present</Select.Option>
//                 <Select.Option value="Absent">Absent</Select.Option>
//                 <Select.Option value="Late">Late</Select.Option>
//                 <Select.Option value="Half-Day">Half-Day</Select.Option>
//               </Select>
//             </Col>
//             <Col xs={12} sm={6} md={6} lg={6}>
//               <Select
//                 style={{ width: "100%" }}
//                 value={shiftFilter}
//                 onChange={setShiftFilter}
//                 size="large"
//               >
//                 <Select.Option value="All">All Shifts</Select.Option>
//                 <Select.Option value="Morning">Morning</Select.Option>
//                 <Select.Option value="Evening">Evening</Select.Option>
//                 <Select.Option value="Night">Night</Select.Option>
//               </Select>
//             </Col>
//           </>
//         )}

//         <Col xs={24} sm={12} md={12} lg={userRole === "admin" ? 5 : 24}>
//           <Button
//             type="primary"
//             size="large"
//             onClick={handleExportCSV}
//             disabled={loading || filteredData.length === 0}
//             style={{
//               width: "100%",
//               backgroundColor: "#10b981",
//               borderColor: "#10b981",
//               fontWeight: 600,
//               height: "40px",
//               borderRadius: "20px",
//             }}
//           >
//             Export CSV
//           </Button>
//         </Col>
//       </Row>

//       {/* Date Picker and Summary Row */}
//       <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
//         <Col xs={24} sm={12} md={10} lg={16}>
//           <RangePicker
//             style={{ width: "100%", marginBottom: "16px" }}
//             size="large"
//             format="MMMM D, YYYY"
//             placeholder={["Start Date", "End Date"]}
//             suffixIcon={<CalendarOutlined style={{ color: "#6b7280" }} />}
//             value={dateRange}
//             onChange={(dates) =>
//               setDateRange(dates as [Dayjs | null, Dayjs | null] | null)
//             }
//             popupStyle={{
//               maxWidth: "calc(100vw - 32px)",
//             }}
//             getPopupContainer={(trigger) =>
//               trigger.parentElement || document.body
//             }
//           />

//           {/* Table */}
//           <Card
//             bordered={false}
//             style={{
//               borderRadius: "12px",
//               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//               marginTop: "8px",
//             }}
//             bodyStyle={{ padding: "16px" }}
//           >
//             <Spin spinning={loading}>
//               <div style={{ overflowX: "auto" }}>
//                 <Table
//                   columns={columns}
//                   dataSource={filteredData}
//                   pagination={{
//                     current: currentPage,
//                     pageSize: pageSize,
//                     total: filteredData.length,
//                     showSizeChanger: false,
//                     position: ["bottomCenter"],
//                     onChange: (page) => setCurrentPage(page),
//                   }}
//                   size="middle"
//                   bordered={false}
//                   scroll={{ x: "max-content" }}
//                   style={{
//                     backgroundColor: "#fff",
//                   }}
//                 />
//               </div>
//               <div
//                 style={{
//                   marginTop: "12px",
//                   color: "#6b7280",
//                   fontSize: "14px",
//                 }}
//               >
//                 Showing {filteredData.length} of {mergedData.length} records
//               </div>
//             </Spin>
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} md={14} lg={8}>
//           <Card
//             title={
//               <span
//                 style={{
//                   fontSize: "16px",
//                   fontWeight: 700,
//                   color: "#111827",
//                 }}
//               >
//                 {dateRange && dateRange[0] && dateRange[1]
//                   ? "Period Summary"
//                   : "Summary"}
//               </span>
//             }
//             bordered={false}
//             style={{
//               borderRadius: "12px",
//               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//             }}
//             bodyStyle={{ padding: "16px" }}
//           >
//             <Row gutter={[8, 8]}>
//               <Col span={24}>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     fontSize: "14px",
//                   }}
//                 >
//                   <span style={{ color: "#111827" }}>Total Present:</span>
//                   <span style={{ fontWeight: 600, color: "#6b7280" }}>
//                     {summary.totalPresent}
//                   </span>
//                 </div>
//               </Col>

//               <Col span={24}>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     fontSize: "14px",
//                   }}
//                 >
//                   <span style={{ color: "#111827" }}>Total Absentees:</span>
//                   <span style={{ fontWeight: 600, color: "#6b7280" }}>
//                     {summary.totalAbsent}
//                   </span>
//                 </div>
//               </Col>

//               <Col span={24}>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     fontSize: "14px",
//                   }}
//                 >
//                   <span style={{ color: "#111827" }}>Avg. Work Hours:</span>
//                   <span style={{ fontWeight: 600, color: "#6b7280" }}>
//                     {summary.avgWorkHours}
//                   </span>
//                 </div>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default DashboardAttendance;

import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  Table,
  Select,
  Button,
  Tag,
  DatePicker,
  Row,
  Col,
  Spin,
  message,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import axios from "axios";

const { RangePicker } = DatePicker;

interface EmployeeData {
  _id: string;
  name: string;
  email: string;
  specificRole: string;
  profileImage?: string;
  shift?: string;
}

interface AttendanceRecord {
  _id: string;
  key: string;
  employeeId: EmployeeData;
  employeeName: string;
  department: string;
  chiefShift: string;
  workDuration: string;
  status: "Present" | "Absent" | "Late" | "Half-Day";
  date: string;
  checkIn: string | null;
  checkOut: string | null;
}

interface DashboardAttendanceProps {
  dateRange: [Dayjs | null, Dayjs | null] | null;
  setDateRange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const DashboardAttendance: React.FC<DashboardAttendanceProps> = ({
  dateRange,
  setDateRange,
}) => {
  const [department, setDepartment] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [shiftFilter, setShiftFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [departments, setDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [allEmployees, setAllEmployees] = useState<EmployeeData[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [userRole, setUserRole] = useState<string>("");
  const pageSize = 5;

  // Get auth token
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Fetch all employees
  const fetchAllEmployees = async () => {
    try {
      console.log("Fetching employees...");
      const response = await axios.get(
        `${API_URL}/employees/list`,
        getAuthConfig()
      );

      console.log("Employees response:", response.data);

      if (response.data.success) {
        const employees = response.data.data.employees || [];
        const role = response.data.data.userRole || "";

        console.log("Employees data:", employees);
        console.log("User role from employees:", role);

        setAllEmployees(employees);
        setUserRole(role);

        // Extract unique departments (only for admin)
        if (role === "admin") {
          const uniqueDepts = Array.from(
            new Set(
              employees
                .map((emp: EmployeeData) => emp.specificRole)
                .filter(
                  (role: string) =>
                    role && role !== "Unassigned" && role.trim() !== ""
                )
            )
          );
          console.log("Departments:", uniqueDepts);
          setDepartments(uniqueDepts as string[]);
        }
      }
    } catch (error: any) {
      console.error("Error fetching employees:", error);
      console.error("Error response:", error.response?.data);
      message.error("Failed to fetch employees list");
    }
  };

  // Fetch attendance records
  const fetchAttendanceRecords = async () => {
    setLoading(true);
    try {
      console.log("Fetching attendance...");
      const params: any = {};

      if (dateRange && dateRange[0] && dateRange[1]) {
        params.startDate = dateRange[0].format("YYYY-MM-DD");
        params.endDate = dateRange[1].format("YYYY-MM-DD");
      }

      console.log("Attendance params:", params);

      const response = await axios.get(`${API_URL}/attendance/list`, {
        ...getAuthConfig(),
        params,
      });

      console.log("Attendance response:", response.data);

      if (response.data.success) {
        const records = response.data.data.attendance || [];
        const role = response.data.data.userRole || "";

        console.log("Attendance records:", records);
        console.log("User role from attendance:", role);

        setAttendanceRecords(records);

        // Set user role if not already set
        if (!userRole) {
          setUserRole(role);
        }
      }
    } catch (error: any) {
      console.error("Error fetching attendance:", error);
      console.error("Error response:", error.response?.data);
      message.error("Failed to fetch attendance records");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount and when date range changes
  useEffect(() => {
    fetchAllEmployees();
  }, []);

  useEffect(() => {
    if (allEmployees.length > 0) {
      fetchAttendanceRecords();
    }
  }, [dateRange, allEmployees.length]);

  // Merge employees with attendance data
  const mergedData = useMemo(() => {
    console.log("=== MERGING DATA ===");
    console.log("All employees count:", allEmployees.length);
    console.log("Attendance records count:", attendanceRecords.length);
    console.log("Current user role:", userRole);

    // For employees, the backend already returns only their data
    // So we don't need to filter by employee ID here
    const merged = allEmployees.map((employee) => {
      // Find attendance record for this employee
      const attendanceRecord = attendanceRecords.find((record: any) => {
        const recordEmployeeId = record.employeeId?._id || record.employeeId;
        return recordEmployeeId === employee._id;
      });

      console.log(
        `Employee: ${employee.name}, Has attendance:`,
        !!attendanceRecord
      );

      return {
        _id: employee._id,
        key: employee._id,
        employeeId: employee,
        employeeName: employee.name || "Unknown",
        department: employee.specificRole || "Unassigned",
        chiefShift: attendanceRecord?.shift || employee.shift || "-",
        workDuration: attendanceRecord?.workDuration || "-",
        status: attendanceRecord?.status || "Absent",
        date: attendanceRecord?.date || null,
        checkIn: attendanceRecord?.checkIn || null,
        checkOut: attendanceRecord?.checkOut || null,
      };
    });

    console.log("Merged data count:", merged.length);
    return merged;
  }, [allEmployees, attendanceRecords, userRole]);

  // Filter data based on selections (only for admin)
  const filteredData = useMemo(() => {
    console.log("=== FILTERING DATA ===");
    console.log("Merged data before filter:", mergedData.length);
    console.log("User role:", userRole);

    // For employees, backend already returns only their data
    // No need to filter further by user ID
    let data = mergedData;

    // Apply department/status/shift filters (only for admin)
    if (userRole === "admin") {
      data = data.filter((record) => {
        const matchDepartment =
          department === "All" || record.department === department;
        const matchStatus =
          statusFilter === "All" || record.status === statusFilter;
        const matchShift =
          shiftFilter === "All" || record.chiefShift === shiftFilter;

        return matchDepartment && matchStatus && matchShift;
      });
    }

    console.log("Filtered data count:", data.length);
    return data;
  }, [mergedData, department, statusFilter, shiftFilter, userRole]);

  // Calculate summary statistics
  const summary = useMemo(() => {
    const totalPresent = filteredData.filter(
      (r) => r.status === "Present" || r.status === "Late"
    ).length;
    const totalAbsent = filteredData.filter(
      (r) => r.status === "Absent"
    ).length;

    // Calculate average work hours
    const presentRecords = filteredData.filter(
      (r) =>
        (r.status === "Present" || r.status === "Late") &&
        r.workDuration !== "-"
    );
    const totalMinutes = presentRecords.reduce((acc, record) => {
      const match = record.workDuration.match(/(\d+)h\s*(\d+)m/);
      if (match) {
        return acc + parseInt(match[1]) * 60 + parseInt(match[2]);
      }
      return acc;
    }, 0);

    const avgMinutes = presentRecords.length
      ? Math.round(totalMinutes / presentRecords.length)
      : 0;
    const avgHours = Math.floor(avgMinutes / 60);
    const avgMins = avgMinutes % 60;

    return {
      totalPresent,
      totalAbsent,
      avgWorkHours:
        presentRecords.length > 0 ? `${avgHours}h ${avgMins}m` : "0h 0m",
    };
  }, [filteredData]);

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      width: "25%",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: "20%",
    },
    {
      title: "Chief Shift",
      dataIndex: "chiefShift",
      key: "chiefShift",
      width: "20%",
    },
    {
      title: "Work Duration",
      dataIndex: "workDuration",
      key: "workDuration",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status: "Present" | "Absent" | "Late" | "Half-Day") => {
        const colorMap = {
          Present: "#10b981",
          Absent: "#ef4444",
          Late: "#f59e0b",
          "Half-Day": "#3b82f6",
        };
        return (
          <Tag
            color={colorMap[status] || "#6b7280"}
            style={{
              borderRadius: "12px",
              padding: "2px 10px",
              fontSize: "12px",
              border: "none",
              fontWeight: 500,
            }}
          >
            {status}
          </Tag>
        );
      },
    },
  ];

  // CSV Export Function
  const handleExportCSV = async () => {
    try {
      const params = new URLSearchParams();

      if (dateRange && dateRange[0] && dateRange[1]) {
        params.append("startDate", dateRange[0].format("YYYY-MM-DD"));
        params.append("endDate", dateRange[1].format("YYYY-MM-DD"));
      }

      // Only add filters if user is admin
      if (userRole === "admin") {
        if (department !== "All") params.append("department", department);
        if (statusFilter !== "All") params.append("status", statusFilter);
        if (shiftFilter !== "All") params.append("shift", shiftFilter);
      }

      const response = await axios.get(
        `${API_URL}/attendance/export-csv?${params.toString()}`,
        {
          ...getAuthConfig(),
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = response.headers["content-disposition"];
      let filename = "attendance.csv";
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      message.success(`Exported ${filteredData.length} records successfully`);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      message.error("Failed to export CSV. Please try again.");
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        minHeight: "100vh",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* Filters Row - Only show for admin */}
      {userRole === "admin" && (
        <Row gutter={[8, 8]} style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Select
              style={{ width: "100%" }}
              value={department}
              onChange={setDepartment}
              size="large"
              loading={loading}
            >
              <Select.Option value="All">All Departments</Select.Option>
              {departments.map((dept) => (
                <Select.Option key={dept} value={dept}>
                  {dept}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} sm={6} md={6} lg={5}>
            <Select
              style={{ width: "100%" }}
              value={statusFilter}
              onChange={setStatusFilter}
              size="large"
            >
              <Select.Option value="All">All Status</Select.Option>
              <Select.Option value="Present">Present</Select.Option>
              <Select.Option value="Absent">Absent</Select.Option>
              <Select.Option value="Late">Late</Select.Option>
              <Select.Option value="Half-Day">Half-Day</Select.Option>
            </Select>
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <Select
              style={{ width: "100%" }}
              value={shiftFilter}
              onChange={setShiftFilter}
              size="large"
            >
              <Select.Option value="All">All Shifts</Select.Option>
              <Select.Option value="Morning">Morning</Select.Option>
              <Select.Option value="Evening">Evening</Select.Option>
              <Select.Option value="Night">Night</Select.Option>
            </Select>
          </Col>
          <Col xs={12} sm={6} md={6} lg={5}>
            <Button
              type="primary"
              size="large"
              onClick={handleExportCSV}
              disabled={loading || filteredData.length === 0}
              style={{
                width: "100%",
                backgroundColor: "#10b981",
                borderColor: "#10b981",
                fontWeight: 600,
                height: "40px",
                borderRadius: "20px",
              }}
            >
              Export CSV
            </Button>
          </Col>
        </Row>
      )}

      {/* Export button for employees */}
      {(userRole === "admin" || userRole === "employee") && (
        <Row justify="end" gutter={[8, 8]} style={{ marginBottom: "20px" }}>
          <Col xs={12} sm={6} md={6} lg={5}>
            <Button
              type="primary"
              size="large"
              onClick={handleExportCSV}
              disabled={loading || filteredData.length === 0}
              style={{
                width: "100%",
                backgroundColor: "#10b981",
                borderColor: "#10b981",
                fontWeight: 600,
                height: "40px",
                borderRadius: "20px",
              }}
            >
              Export CSV
            </Button>
          </Col>
        </Row>
      )}

      {/* Date Picker and Summary Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={10} lg={16}>
          <RangePicker
            style={{ width: "100%", marginBottom: "16px" }}
            size="large"
            format="MMMM D, YYYY"
            placeholder={["Start Date", "End Date"]}
            suffixIcon={<CalendarOutlined style={{ color: "#6b7280" }} />}
            value={dateRange}
            onChange={(dates) =>
              setDateRange(dates as [Dayjs | null, Dayjs | null] | null)
            }
            popupStyle={{
              maxWidth: "calc(100vw - 32px)",
            }}
            getPopupContainer={(trigger) =>
              trigger.parentElement || document.body
            }
          />

          {/* Table */}
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              marginTop: "8px",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <Spin spinning={loading}>
              <div style={{ overflowX: "auto" }}>
                <Table
                  columns={columns}
                  dataSource={filteredData}
                  pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: filteredData.length,
                    showSizeChanger: false,
                    position: ["bottomCenter"],
                    onChange: (page) => setCurrentPage(page),
                  }}
                  size="middle"
                  bordered={false}
                  scroll={{ x: "max-content" }}
                  style={{
                    backgroundColor: "#fff",
                  }}
                  locale={{
                    emptyText: loading
                      ? "Loading..."
                      : userRole === "employee"
                        ? "No attendance records found for you"
                        : "No attendance records found",
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: "12px",
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                Showing {filteredData.length} of {mergedData.length} records
                {userRole === "employee" && ""}
              </div>
            </Spin>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={14} lg={8}>
          <Card
            title={
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {dateRange && dateRange[0] && dateRange[1]
                  ? "Period Summary"
                  : userRole === "employee"
                    ? "My Summary"
                    : "Summary"}
              </span>
            }
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "#111827" }}>Total Present:</span>
                  <span style={{ fontWeight: 600, color: "#6b7280" }}>
                    {summary.totalPresent}
                  </span>
                </div>
              </Col>

              <Col span={24}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "#111827" }}>Total Absentees:</span>
                  <span style={{ fontWeight: 600, color: "#6b7280" }}>
                    {summary.totalAbsent}
                  </span>
                </div>
              </Col>

              <Col span={24}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "#111827" }}>Avg. Work Hours:</span>
                  <span style={{ fontWeight: 600, color: "#6b7280" }}>
                    {summary.avgWorkHours}
                  </span>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardAttendance;
