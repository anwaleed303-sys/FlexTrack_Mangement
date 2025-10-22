// src/pages/leaves/index.tsx
import Head from "next/head";
import MainLayout from "../../components/Layout/MainLayout";
import LeaveRequestForm from "../../components/Leaves/LeaveRequestForm";
import LeaveList from "../../components/Leaves/LeaveList";

export default function Leaves() {
  return (
    <>
      <Head>
        <title>Leave Management | FlexTrack</title>
        <meta name="description" content="Manage leave requests" />
      </Head>

      <MainLayout>
        <LeaveRequestForm />
        <LeaveList />
      </MainLayout>
    </>
  );
}
