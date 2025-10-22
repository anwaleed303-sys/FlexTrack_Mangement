import React from "react";
import { Modal, Form, Input, Select } from "antd";

const EmployeeFormModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Add Employee"
      open={visible}
      onCancel={onClose}
      onOk={() => {
        form.submit();
        onClose();
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Department" name="department">
          <Select
            options={[
              { value: "IT", label: "IT" },
              { value: "HR", label: "HR" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default EmployeeFormModal;
