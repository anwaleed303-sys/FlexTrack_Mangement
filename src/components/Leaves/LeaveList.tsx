import React from "react";
import { Table, Tag } from "antd";

const LeaveList: React.FC = () => {
  const data = [
    {
      key: "1",
      employee: "John Doe",
      type: "Sick Leave",
      startDate: "2025-10-25",
      endDate: "2025-10-26",
      status: "Pending",
    },
    {
      key: "2",
      employee: "Jane Smith",
      type: "Annual Leave",
      startDate: "2025-11-01",
      endDate: "2025-11-05",
      status: "Approved",
    },
  ];
  const columns = [
    { title: "Employee", dataIndex: "employee", key: "employee" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    { title: "End Date", dataIndex: "endDate", key: "endDate" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Approved" ? "green" : "gold"}>{status}</Tag>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
export default LeaveList;
