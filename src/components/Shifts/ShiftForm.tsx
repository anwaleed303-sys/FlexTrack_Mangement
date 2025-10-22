import React from "react";
import { Card, Form, Input, TimePicker, Button } from "antd";

const ShiftForm: React.FC = () => (
  <Card title="Create Shift">
    <Form layout="vertical">
      <Form.Item label="Shift Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Start Time"
        name="startTime"
        rules={[{ required: true }]}
      >
        <TimePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="End Time" name="endTime" rules={[{ required: true }]}>
        <TimePicker style={{ width: "100%" }} />
      </Form.Item>
      <Button type="primary">Create Shift</Button>
    </Form>
  </Card>
);
export default ShiftForm;
