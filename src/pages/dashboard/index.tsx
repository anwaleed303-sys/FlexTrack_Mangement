// import Head from "next/head";
// import { Space } from "antd";
// import MainLayout from "../../components/Layout/MainLayout";
// // import CardStats from "../../components/Dashboard/CardStats";
// import AttendanceTrendChart from "../../components/Dashboard/AttendanceTrendChart";

// export default function Dashboard() {
//   return (
//     <>
//       <Head>
//         <title>Dashboard | FlexTrack</title>
//       </Head>
//       <MainLayout>
//         <h1>dfff</h1>

//         <Space direction="vertical" size="large" style={{ width: "100%" }}>
//           {/* <h1>Dashboard</h1> */}
//           {/* <CardStats /> */}
//           <AttendanceTrendChart />
//         </Space>
//       </MainLayout>
//     </>
//   );
// }
import Head from "next/head";
import { Space } from "antd";
import MainLayout from "../../components/Layout/MainLayout";
import AttendanceTrendChart from "../../components/Dashboard/AttendanceTrendChart";
// import DashboardAttendance from "../../components/Dashboard/AttendanceTrendChart";
import dayjs from "dayjs";

export default function Dashboard() {
  const formatDateRange = () => {
    const startDate = dayjs().subtract(7, "days");
    const endDate = dayjs();
    return `${startDate.format("MMMM D")} - ${endDate.format("MMMM D, YYYY")}`;
  };

  return (
    <>
      <Head>
        <title>Dashboard | FlexTrack</title>
      </Head>
      <MainLayout>
        {/* Header Section */}
        <div style={{ marginBottom: "24px", paddingLeft: "8px" }}>
          <h1
            style={{
              margin: "0 0 4px 0",
              fontSize: "28px",
              fontWeight: 700,
              color: "#111827",
              letterSpacing: "-0.02em",
            }}
          >
            Daily Attendance Overview
          </h1>
          <p
            style={{
              margin: 0,
              color: "#9ca3af",
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {formatDateRange()}
          </p>
        </div>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* <DashboardAttendance /> */}
          <AttendanceTrendChart />
        </Space>
      </MainLayout>
    </>
  );
}
