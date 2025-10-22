import React from "react";
import { Card, Form, Input, DatePicker, Select, Button } from "antd";

const LeaveRequestForm: React.FC = () => (
  <Card title="Request Leave">
    <Form layout="vertical">
      <Form.Item label="Leave Type" name="type" rules={[{ required: true }]}>
        <Select
          options={[
            { value: "sick", label: "Sick Leave" },
            { value: "casual", label: "Casual Leave" },
            { value: "annual", label: "Annual Leave" },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Start Date"
        name="startDate"
        rules={[{ required: true }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="End Date" name="endDate" rules={[{ required: true }]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Reason" name="reason">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Button type="primary">Submit Request</Button>
    </Form>
  </Card>
);
export default LeaveRequestForm;
