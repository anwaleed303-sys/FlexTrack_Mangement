import React from "react";
import { Table, Tag } from "antd";

const AttendanceTable: React.FC = () => {
  const data = [
    {
      key: "1",
      name: "John Doe",
      date: "2025-10-21",
      checkIn: "09:00 AM",
      checkOut: "05:30 PM",
      status: "Present",
    },
    {
      key: "2",
      name: "Jane Smith",
      date: "2025-10-21",
      checkIn: "09:15 AM",
      checkOut: "05:45 PM",
      status: "Late",
    },
  ];
  const columns = [
    { title: "Employee", dataIndex: "name", key: "name" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Check In", dataIndex: "checkIn", key: "checkIn" },
    { title: "Check Out", dataIndex: "checkOut", key: "checkOut" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Present" ? "green" : "orange"}>{status}</Tag>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
export default AttendanceTable;
