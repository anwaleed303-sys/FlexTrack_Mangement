import React from "react";
import { Table, Button, Space, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface Employee {
  key: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: string;
}

const EmployeeTable: React.FC<{ onEdit: (id: string) => void }> = ({
  onEdit,
}) => {
  const data: Employee[] = [
    {
      key: "1",
      name: "John Doe",
      email: "john@example.com",
      department: "IT",
      role: "Developer",
      status: "Active",
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      department: "HR",
      role: "Manager",
      status: "Active",
    },
  ];

  const columns: ColumnsType<Employee> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Employee) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record.key)} />
          <Button icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default EmployeeTable;
