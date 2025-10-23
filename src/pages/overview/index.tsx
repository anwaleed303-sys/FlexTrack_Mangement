import { useState } from "react";
import Head from "next/head";
import { Space } from "antd";
import MainLayout from "../../components/Layout/MainLayout";
import AttendanceTrendChart from "../../components/Overview/Attendanceoverview";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export default function Overview() {
  // CORRECTED useState syntax
  const [dateRange, setDateRange] = useState<
    // <- Add this < symbol
    [Dayjs | null, Dayjs | null] | null
  >([dayjs().subtract(7, "days"), dayjs()]);

  const formatDateRange = () => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      return `${dateRange[0].format("MMMM D")} - ${dateRange[1].format("MMMM D, YYYY")}`;
    }
    return "Select Date Range";
  };

  return (
    <>
      <Head>
        <title>Overview | FlexTrack</title>
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
          <AttendanceTrendChart
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </Space>
      </MainLayout>
    </>
  );
}
