import { useState } from "react";
import { Form, Input, Button, Card, Typography, Select, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

const { Title, Text } = Typography;
const { Option } = Select;

// Admin roles
const adminRoles = [
  "HR Manager",
  "Operations Manager",
  "Finance Manager",
  "IT Manager",
  "General Manager",
];

// Employee categories
const employeeCategories = [
  "Software Developer",
  "Sales Executive",
  "Marketing Specialist",
  "Customer Support",
  "Accountant",
];

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userRole: string;
  specificRole?: string;
  customRole?: string;
}

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [userRole, setUserRole] = useState<string>("");
  const [showCustomRole, setShowCustomRole] = useState(false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const finalSpecificRole =
        values.specificRole === "custom"
          ? values.customRole
          : values.specificRole;

      const registrationData = {
        name: values.name,
        email: values.email,
        password: values.password,
        userRole: values.userRole,
        specificRole: finalSpecificRole,
      };

      console.log("Register:", registrationData);

      // Add your API call here
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(registrationData)
      // });

      // Store user data in localStorage (temporary - replace with API)
      localStorage.setItem("userData", JSON.stringify(registrationData));

      message.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      message.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (value: string) => {
    setUserRole(value);
    setShowCustomRole(false);
    setShowCustomCategory(false);
    form.setFieldValue("specificRole", undefined);
    form.setFieldValue("customRole", undefined);
  };

  const handleSpecificRoleChange = (value: string) => {
    if (value === "custom") {
      if (userRole === "admin") {
        setShowCustomRole(true);
        setShowCustomCategory(false);
      } else {
        setShowCustomCategory(true);
        setShowCustomRole(false);
      }
    } else {
      setShowCustomRole(false);
      setShowCustomCategory(false);
      form.setFieldValue("customRole", undefined);
    }
  };

  return (
    <>
      <Head>
        <title>Register | FlexTrack</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#f0f2f5",
          padding: "20px",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 450,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              {/* Left side - FT */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "linear-gradient(135deg, #0066FF, #00D4B1)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                FT
              </div>

              {/* Center - Register */}
              <Title
                level={2}
                style={{ margin: 0, textAlign: "center", flex: 1 }}
              >
                Register
              </Title>

              {/* Empty div to balance right side (optional) */}
              <div style={{ width: 40 }}></div>
            </div>
          </div>

          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            autoComplete="off"
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: "Please input your full name!" },
                { min: 2, message: "Name must be at least 2 characters!" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Enter your full name"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Enter your email"
              />
            </Form.Item>

            <Form.Item
              label="User Role"
              name="userRole"
              rules={[{ required: true, message: "Please select your role!" }]}
            >
              <Select
                placeholder="Select your role"
                size="large"
                style={{ borderRadius: "8px" }}
                onChange={handleRoleChange}
                suffixIcon={<TeamOutlined style={{ color: "#bfbfbf" }} />}
              >
                <Option value="admin">Admin</Option>
                <Option value="employee">Employee</Option>
              </Select>
            </Form.Item>

            {userRole === "admin" && (
              <Form.Item
                label="Admin Role"
                name="specificRole"
                rules={[
                  { required: true, message: "Please select admin role!" },
                ]}
              >
                <Select
                  placeholder="Select admin role"
                  size="large"
                  style={{ borderRadius: "8px" }}
                  onChange={handleSpecificRoleChange}
                >
                  {adminRoles.map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                  <Option value="custom">Custom Role</Option>
                </Select>
              </Form.Item>
            )}

            {userRole === "employee" && (
              <Form.Item
                label="Employee Category"
                name="specificRole"
                rules={[
                  {
                    required: true,
                    message: "Please select employee category!",
                  },
                ]}
              >
                <Select
                  placeholder="Select employee category"
                  size="large"
                  style={{ borderRadius: "8px" }}
                  onChange={handleSpecificRoleChange}
                >
                  {employeeCategories.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                  <Option value="custom">Custom Category</Option>
                </Select>
              </Form.Item>
            )}

            {(showCustomRole || showCustomCategory) && (
              <Form.Item
                label={
                  showCustomRole
                    ? "Custom Admin Role"
                    : "Custom Employee Category"
                }
                name="customRole"
                rules={[
                  {
                    required: true,
                    message: "Please enter custom role/category!",
                  },
                ]}
              >
                <Input
                  placeholder={`Enter custom ${showCustomRole ? "admin role" : "employee category"}`}
                  size="large"
                  style={{ borderRadius: "8px" }}
                />
              </Form.Item>
            )}

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Confirm your password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                // type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{
                  height: 45,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "white",
                  background: "linear-gradient(135deg, #00D4B1, #0066FF)",
                }}
              >
                Register
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Text type="secondary">
                Already have an account?{" "}
                <Link href="/login" style={{ fontWeight: 500 }}>
                  Login here
                </Link>
              </Text>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}
