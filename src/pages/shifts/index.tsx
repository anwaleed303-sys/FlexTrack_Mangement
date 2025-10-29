// src/pages/shifts/index.tsx
import { useState, useEffect } from "react";
import Head from "next/head";
import MainLayout from "../../components/Layout/MainLayout";
import ShiftManagement from "../../components/Shifts/ShiftList";
import ShiftTypes from "@/src/components/Shifts/ShiftForm";

interface UserData {
  email: string;
  userRole: string;
  specificRole?: string;
  name: string;
}

export default function Shifts() {
  // Your departments data
  const departments = ["Engineering", "Sales", "Marketing", "HR", "Finance"];

  const handleAddShift = () => {
    // Handle add shift logic here
    console.log("Add new shift");
  };

  return (
    <>
      <Head>
        <title>Shift Management & Schedule | FlexTrack</title>
      </Head>
      <MainLayout>
        <ShiftManagement
          departments={departments}
          onAddShift={handleAddShift}
        />
        {/* Add your shift content here */}
        <ShiftTypes />
      </MainLayout>
    </>
  );
}
