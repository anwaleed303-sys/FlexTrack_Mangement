import Head from "next/head";
import MainLayout from "../../components/Layout/MainLayout";
import ShiftManagement from "../../components/Shifts/ShiftList";
import ShiftTypes from "@/src/components/Shifts/ShiftForm";

export default function Shifts() {
  return (
    <>
      <Head>
        <title>Shift Management & Schedule | FlexTrack</title>
      </Head>
      <MainLayout>
        <ShiftManagement />
        <ShiftTypes />
      </MainLayout>
    </>
  );
}
