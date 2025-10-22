import React from "react";
import { Table, Tag } from "antd";

const AuditLogTable: React.FC = () => {
  const data = [
    {
      key: "1",
      user: "admin@example.com",
      action: "Employee Created",
      resource: "John Doe",
      timestamp: "2025-10-21 10:30 AM",
      status: "Success",
    },
    {
      key: "2",
      user: "hr@example.com",
      action: "Leave Approved",
      resource: "Jane Smith",
      timestamp: "2025-10-21 11:15 AM",
      status: "Success",
    },
  ];
  const columns = [
    { title: "User", dataIndex: "user", key: "user" },
    { title: "Action", dataIndex: "action", key: "action" },
    { title: "Resource", dataIndex: "resource", key: "resource" },
    { title: "Timestamp", dataIndex: "timestamp", key: "timestamp" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag color="green">{status}</Tag>,
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
export default AuditLogTable;
