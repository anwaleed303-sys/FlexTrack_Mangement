// // import React from "react";
// // import { Card } from "antd";
// // // import { Line } from "@ant-design/charts";

// // const AttendanceTrendChart: React.FC = () => {
// //   const data = [
// //     { date: "Mon", value: 95 },
// //     { date: "Tue", value: 98 },
// //     { date: "Wed", value: 92 },
// //     { date: "Thu", value: 97 },
// //     { date: "Fri", value: 89 },
// //   ];
// //   const config = {
// //     data,
// //     xField: "date",
// //     yField: "value",
// //     point: { size: 5, shape: "diamond" },
// //   };
// //   return <Card title="Attendance Trend">{/* <Line {...config} /> */}</Card>;
// // };
// // export default AttendanceTrendChart;

// import React, { useState } from "react";
// import {
//   Card,
//   Table,
//   Select,
//   Button,
//   Tag,
//   DatePicker,
//   Row,
//   Col,
//   Space,
// } from "antd";
// import { CalendarOutlined } from "@ant-design/icons";
// import type { Dayjs } from "dayjs";

// const { RangePicker } = DatePicker;

// interface AttendanceRecord {
//   key: string;
//   employeeName: string;
//   chiefShift: string;
//   workDuration: string;
//   status: "Present" | "Absent";
// }

// const AttendanceOverview: React.FC = () => {
//   const [department, setDepartment] = useState<string>("Department");
//   const [filter1, setFilter1] = useState<string>("All");
//   const [filter2, setFilter2] = useState<string>("All");
//   const [dateRange, setDateRange] = useState<
//     [Dayjs | null, Dayjs | null] | null
//   >(null);

//   const data: AttendanceRecord[] = [
//     {
//       key: "1",
//       employeeName: "Ali Khan",
//       chiefShift: "FT-001",
//       workDuration: "05:02 PM",
//       status: "Present",
//     },
//     {
//       key: "2",
//       employeeName: "FT-005",
//       chiefShift: "Mon, Jun 10",
//       workDuration: "05:00 PM",
//       status: "Present",
//     },
//     {
//       key: "3",
//       employeeName: "For 1005",
//       chiefShift: "Morning",
//       workDuration: "05:00 PM",
//       status: "Present",
//     },
//     {
//       key: "4",
//       employeeName: "Sara Ahmed",
//       chiefShift: "Morning",
//       workDuration: "8h 00M",
//       status: "Present",
//     },
//     {
//       key: "5",
//       employeeName: "Sara Ahmed",
//       chiefShift: "Morning",
//       workDuration: "-",
//       status: "Present",
//     },
//     {
//       key: "6",
//       employeeName: "Hamza Malik",
//       chiefShift: "-",
//       workDuration: "-",
//       status: "Absent",
//     },
//     {
//       key: "7",
//       employeeName: "Hamza Malik",
//       chiefShift: "Evening",
//       workDuration: "10:32 PM",
//       status: "Absent",
//     },
//     {
//       key: "8",
//       employeeName: "Ayesha Tariq",
//       chiefShift: "-",
//       workDuration: "8h 32 M",
//       status: "Absent",
//     },
//     {
//       key: "9",
//       employeeName: "Ayesha Tariq",
//       chiefShift: "-",
//       workDuration: "-",
//       status: "Absent",
//     },
//   ];

//   const columns = [
//     {
//       title: "Employee Name",
//       dataIndex: "employeeName",
//       key: "employeeName",
//     },
//     {
//       title: "Chief Shift",
//       dataIndex: "chiefShift",
//       key: "chiefShift",
//     },
//     {
//       title: "Work Duration",
//       dataIndex: "workDuration",
//       key: "workDuration",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status: "Present" | "Absent") => (
//         <Tag
//           color={status === "Present" ? "#10b981" : "#ef4444"}
//           style={{
//             borderRadius: "12px",
//             padding: "2px 10px",
//             fontSize: "12px",
//             border: "none",
//             fontWeight: 500,
//           }}
//         >
//           {status}
//         </Tag>
//       ),
//     },
//   ];

//   const formatDateRange = () => {
//     if (dateRange && dateRange[0] && dateRange[1]) {
//       return `${dateRange[0].format("MMMM D")} - ${dateRange[1].format("MMMM D, YYYY")}`;
//     }
//     return "June 10 - June 16, 2024";
//   };

//   return (
//     <div
//       style={{
//         padding: "24px",
//         // backgroundColor: "#e5e7eb",
//         minHeight: "100vh",
//         fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//       }}
//     >
//       {/* Header Section */}
//       <div style={{ marginBottom: "24px" }}>
//         <h1
//           style={{
//             margin: "0 0 4px 0",
//             fontSize: "28px",
//             fontWeight: 700,
//             color: "#111827",
//             letterSpacing: "-0.02em",
//           }}
//         >
//           Daily Attendance Overview
//         </h1>
//         <p
//           style={{
//             margin: 0,
//             color: "#9ca3af",
//             fontSize: "14px",
//             fontWeight: 400,
//           }}
//         >
//           {formatDateRange()}
//         </p>
//       </div>

//       <Row gutter={16}>
//         <Col xs={24} xl={16}>
//           <Card
//             bordered={false}
//             style={{
//               borderRadius: "12px",
//               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//             }}
//             bodyStyle={{ padding: "24px" }}
//           >
//             {/* Filters Row */}
//             <Row gutter={8} style={{ marginBottom: "20px" }}>
//               <Col span={6}>
//                 <Select
//                   style={{ width: "100%" }}
//                   value={department}
//                   onChange={setDepartment}
//                   suffixIcon={<CalendarOutlined style={{ color: "#9ca3af" }} />}
//                   bordered={true}
//                   size="large"
//                 >
//                   <Select.Option value="Department">Department</Select.Option>
//                   <Select.Option value="IT">IT</Select.Option>
//                   <Select.Option value="HR">HR</Select.Option>
//                 </Select>
//               </Col>
//               <Col span={4}>
//                 <Select
//                   style={{ width: "100%" }}
//                   value={filter1}
//                   onChange={setFilter1}
//                   bordered={true}
//                   size="large"
//                 >
//                   <Select.Option value="All">All</Select.Option>
//                   <Select.Option value="Present">Present</Select.Option>
//                   <Select.Option value="Absent">Absent</Select.Option>
//                 </Select>
//               </Col>
//               <Col span={4}>
//                 <Select
//                   style={{ width: "100%" }}
//                   value={filter2}
//                   onChange={setFilter2}
//                   bordered={true}
//                   size="large"
//                 >
//                   <Select.Option value="All">All</Select.Option>
//                   <Select.Option value="Morning">Morning</Select.Option>
//                   <Select.Option value="Evening">Evening</Select.Option>
//                 </Select>
//               </Col>
//               <Col span={10}>
//                 <Button
//                   type="primary"
//                   size="large"
//                   style={{
//                     width: "100%",
//                     backgroundColor: "#10b981",
//                     borderColor: "#10b981",
//                     fontWeight: 600,
//                     height: "40px",
//                     borderRadius: "6px",
//                   }}
//                 >
//                   Export to CSV
//                 </Button>
//               </Col>
//             </Row>

//             {/* Date Range Picker */}
//             <div style={{ marginBottom: "16px" }}>
//               <RangePicker
//                 style={{ width: "280px" }}
//                 size="large"
//                 format="MMMM D - MMMM D, YYYY"
//                 placeholder={["Start Date", "End Date"]}
//                 suffixIcon={<CalendarOutlined style={{ color: "#6b7280" }} />}
//                 onChange={(dates) =>
//                   setDateRange(dates as [Dayjs | null, Dayjs | null] | null)
//                 }
//               />
//             </div>

//             {/* Table */}
//             <Table
//               columns={columns}
//               dataSource={data}
//               pagination={{
//                 current: 1,
//                 pageSize: 9,
//                 total: 15,
//                 showSizeChanger: false,
//                 position: ["bottomCenter"],
//                 style: { marginTop: "20px" },
//                 itemRender: (page, type, originalElement) => {
//                   if (type === "prev") {
//                     return (
//                       <span style={{ color: "#d1d5db", cursor: "not-allowed" }}>
//                         Previous
//                       </span>
//                     );
//                   }
//                   if (type === "next") {
//                     return (
//                       <span style={{ color: "#6b7280", cursor: "pointer" }}>
//                         Next
//                       </span>
//                     );
//                   }
//                   return originalElement;
//                 },
//               }}
//               size="middle"
//               bordered={false}
//               style={{
//                 backgroundColor: "#fff",
//               }}
//             />

//             <div
//               style={{
//                 textAlign: "left",
//                 color: "#9ca3af",
//                 fontSize: "13px",
//                 marginTop: "16px",
//               }}
//             >
//               Page 1 of 15
//             </div>
//           </Card>
//         </Col>

//         {/* Weekly Summary - Right Side */}
//         <Col xs={24} xl={8}>
//           <Card
//             title={
//               <span
//                 style={{
//                   fontSize: "18px",
//                   fontWeight: 700,
//                   color: "#111827",
//                 }}
//               >
//                 Weekly Summary
//               </span>
//             }
//             bordered={false}
//             style={{
//               borderRadius: "12px",
//               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//             }}
//             bodyStyle={{ padding: "24px" }}
//           >
//             <div style={{ marginBottom: "28px" }}>
//               <div
//                 style={{
//                   fontSize: "13px",
//                   color: "#6b7280",
//                   marginBottom: "6px",
//                   fontWeight: 400,
//                 }}
//               >
//                 Total Present:
//               </div>
//               <div
//                 style={{
//                   fontSize: "28px",
//                   fontWeight: 700,
//                   color: "#111827",
//                   lineHeight: 1.2,
//                 }}
//               >
//                 1247
//               </div>
//             </div>

//             <div style={{ marginBottom: "28px" }}>
//               <div
//                 style={{
//                   fontSize: "13px",
//                   color: "#6b7280",
//                   marginBottom: "6px",
//                   fontWeight: 400,
//                 }}
//               >
//                 Total Absentees
//               </div>
//               <div
//                 style={{
//                   fontSize: "28px",
//                   fontWeight: 700,
//                   color: "#111827",
//                   lineHeight: 1.2,
//                 }}
//               >
//                 85
//               </div>
//             </div>

//             <div>
//               <div
//                 style={{
//                   fontSize: "13px",
//                   color: "#6b7280",
//                   marginBottom: "6px",
//                   fontWeight: 400,
//                 }}
//               >
//                 Avg. Work Hours
//               </div>
//               <div
//                 style={{
//                   fontSize: "28px",
//                   fontWeight: 700,
//                   color: "#111827",
//                   lineHeight: 1.2,
//                 }}
//               >
//                 8h 10m
//               </div>
//             </div>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default AttendanceOverview;
import React, { useState, useMemo } from "react";
import { Card, Table, Select, Button, Tag, DatePicker, Row, Col } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface AttendanceRecord {
  key: string;
  employeeName: string;
  department: string;
  chiefShift: string;
  workDuration: string;
  status: "Present" | "Absent";
}

const DashboardAttendance: React.FC = () => {
  const [department, setDepartment] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [shiftFilter, setShiftFilter] = useState<string>("All");
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >([dayjs().subtract(7, "days"), dayjs()]);

  // Mock data - Replace with API call later
  const allData: AttendanceRecord[] = [
    {
      key: "1",
      employeeName: "Ali Khan",
      department: "IT",
      chiefShift: "Morning",
      workDuration: "8h 02m",
      status: "Present",
    },
    {
      key: "2",
      employeeName: "Sara Ahmed",
      department: "HR",
      chiefShift: "Morning",
      workDuration: "8h 00m",
      status: "Present",
    },
    {
      key: "3",
      employeeName: "Hamza Malik",
      department: "IT",
      chiefShift: "Evening",
      workDuration: "-",
      status: "Absent",
    },
    {
      key: "4",
      employeeName: "Ayesha Tariq",
      department: "Sales",
      chiefShift: "Morning",
      workDuration: "8h 32m",
      status: "Present",
    },
    {
      key: "5",
      employeeName: "Usman Ali",
      department: "HR",
      chiefShift: "-",
      workDuration: "-",
      status: "Absent",
    },
    {
      key: "6",
      employeeName: "Fatima Noor",
      department: "IT",
      chiefShift: "Morning",
      workDuration: "8h 15m",
      status: "Present",
    },
    {
      key: "7",
      employeeName: "Ahmed Hassan",
      department: "Sales",
      chiefShift: "Evening",
      workDuration: "7h 45m",
      status: "Present",
    },
    {
      key: "8",
      employeeName: "Zainab Khan",
      department: "HR",
      chiefShift: "-",
      workDuration: "-",
      status: "Absent",
    },
    {
      key: "9",
      employeeName: "Bilal Ahmed",
      department: "IT",
      chiefShift: "Morning",
      workDuration: "8h 20m",
      status: "Present",
    },
  ];

  // Filter data based on selections
  const filteredData = useMemo(() => {
    return allData.filter((record) => {
      const matchDepartment =
        department === "All" || record.department === department;
      const matchStatus =
        statusFilter === "All" || record.status === statusFilter;
      const matchShift =
        shiftFilter === "All" || record.chiefShift === shiftFilter;

      return matchDepartment && matchStatus && matchShift;
    });
  }, [department, statusFilter, shiftFilter]);

  // Calculate summary statistics
  const summary = useMemo(() => {
    const totalPresent = filteredData.filter(
      (r) => r.status === "Present"
    ).length;
    const totalAbsent = filteredData.filter(
      (r) => r.status === "Absent"
    ).length;

    // Calculate average work hours
    const presentRecords = filteredData.filter((r) => r.status === "Present");
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
      avgWorkHours: `${avgHours}h ${avgMins}m`,
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
      render: (status: "Present" | "Absent") => (
        <Tag
          color={status === "Present" ? "#10b981" : "#ef4444"}
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
      ),
    },
  ];

  const formatDateRange = () => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      return `${dateRange[0].format("MMMM D")} - ${dateRange[1].format("MMMM D, YYYY")}`;
    }
    return "Select Date Range";
  };

  const handleExportCSV = () => {
    // TODO: Implement CSV export functionality
    console.log("Exporting data:", filteredData);
    alert("CSV Export functionality - Connect to your API");
  };

  const handleReset = () => {
    setDepartment("All");
    setStatusFilter("All");
    setShiftFilter("All");
    setDateRange([dayjs().subtract(7, "days"), dayjs()]);
  };

  return (
    <div
      style={{
        padding: "16px",
        // backgroundColor: "#e5e7eb",
        minHeight: "100vh",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={16}>
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            {/* Filters Row */}
            <Row gutter={[8, 8]} style={{ marginBottom: "20px" }}>
              <Col xs={24} sm={12} md={12} lg={6}>
                <Select
                  style={{ width: "100%" }}
                  value={department}
                  onChange={setDepartment}
                  size="large"
                >
                  <Select.Option value="All">All Departments</Select.Option>
                  <Select.Option value="IT">IT</Select.Option>
                  <Select.Option value="HR">HR</Select.Option>
                  <Select.Option value="Sales">Sales</Select.Option>
                </Select>
              </Col>
              <Col xs={12} sm={6} md={6} lg={4}>
                <Select
                  style={{ width: "100%" }}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  size="large"
                >
                  <Select.Option value="All">All</Select.Option>
                  <Select.Option value="Present">Present</Select.Option>
                  <Select.Option value="Absent">Absent</Select.Option>
                </Select>
              </Col>
              <Col xs={12} sm={6} md={6} lg={4}>
                <Select
                  style={{ width: "100%" }}
                  value={shiftFilter}
                  onChange={setShiftFilter}
                  size="large"
                >
                  <Select.Option value="All">All Shifts</Select.Option>
                  <Select.Option value="Morning">Morning</Select.Option>
                  <Select.Option value="Evening">Evening</Select.Option>
                </Select>
              </Col>
              <Col xs={12} sm={6} md={6} lg={5}>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleExportCSV}
                  style={{
                    width: "100%",
                    backgroundColor: "#10b981",
                    borderColor: "#10b981",
                    fontWeight: 600,
                    height: "40px",
                    borderRadius: "6px",
                  }}
                >
                  Export CSV
                </Button>
              </Col>
              <Col xs={12} sm={6} md={6} lg={5}>
                <Button
                  size="large"
                  onClick={handleReset}
                  style={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "6px",
                  }}
                >
                  Reset
                </Button>
              </Col>
            </Row>

            {/* Date Range Picker */}
            <div style={{ marginBottom: "16px" }}>
              <RangePicker
                style={{ width: "100%", maxWidth: "280px" }}
                size="large"
                format="MMMM D, YYYY"
                placeholder={["Start Date", "End Date"]}
                suffixIcon={<CalendarOutlined style={{ color: "#6b7280" }} />}
                value={dateRange}
                onChange={(dates) =>
                  setDateRange(dates as [Dayjs | null, Dayjs | null] | null)
                }
              />
            </div>

            {/* Results Count */}
            <div
              style={{
                marginBottom: "12px",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              Showing {filteredData.length} of {allData.length} records
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{
                  current: 1,
                  pageSize: 9,
                  total: filteredData.length,
                  showSizeChanger: false,
                  position: ["bottomCenter"],
                  style: { marginTop: "20px" },
                  itemRender: (page, type, originalElement) => {
                    if (type === "prev") {
                      return (
                        <span
                          style={{ color: "#d1d5db", cursor: "not-allowed" }}
                        >
                          Previous
                        </span>
                      );
                    }
                    if (type === "next") {
                      return (
                        <span style={{ color: "#6b7280", cursor: "pointer" }}>
                          Next
                        </span>
                      );
                    }
                    return originalElement;
                  },
                }}
                size="middle"
                bordered={false}
                scroll={{ x: "max-content" }}
                style={{
                  backgroundColor: "#fff",
                }}
              />
            </div>
          </Card>
        </Col>

        {/* Weekly Summary - Right Side */}
        <Col xs={24} xl={8}>
          <Card
            title={
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                Weekly Summary
              </span>
            }
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
            bodyStyle={{ padding: "24px" }}
          >
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  marginBottom: "6px",
                  fontWeight: 400,
                }}
              >
                Total Present:
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#10b981",
                  lineHeight: 1.2,
                }}
              >
                {summary.totalPresent}
              </div>
            </div>

            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  marginBottom: "6px",
                  fontWeight: 400,
                }}
              >
                Total Absentees
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#ef4444",
                  lineHeight: 1.2,
                }}
              >
                {summary.totalAbsent}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  marginBottom: "6px",
                  fontWeight: 400,
                }}
              >
                Avg. Work Hours
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.2,
                }}
              >
                {summary.avgWorkHours}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardAttendance;
