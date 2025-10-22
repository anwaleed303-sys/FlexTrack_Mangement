import React from "react";
import { Table } from "antd";

const ShiftList: React.FC = () => {
  const data = [
    {
      key: "1",
      name: "Morning Shift",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      employees: 45,
    },
    {
      key: "2",
      name: "Night Shift",
      startTime: "09:00 PM",
      endTime: "05:00 AM",
      employees: 23,
    },
  ];
  const columns = [
    { title: "Shift Name", dataIndex: "name", key: "name" },
    { title: "Start Time", dataIndex: "startTime", key: "startTime" },
    { title: "End Time", dataIndex: "endTime", key: "endTime" },
    { title: "Employees", dataIndex: "employees", key: "employees" },
  ];
  return <Table columns={columns} dataSource={data} />;
};
export default ShiftList;
