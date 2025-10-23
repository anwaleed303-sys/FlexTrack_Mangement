// src/pages/Dashboard/index.tsx
import Head from "next/head";
import MainLayout from "../../components/Layout/MainLayout";
import AttandenceTrend from "../../components/Dashboard/AttandenceTrend";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | FlexTrack</title>
        <meta name="description" content="Manage leave requests" />
      </Head>

      <MainLayout>
        <AttandenceTrend />
        {/* <LeaveList /> */}
      </MainLayout>
    </>
  );
}
