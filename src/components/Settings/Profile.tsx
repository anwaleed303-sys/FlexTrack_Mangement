// src/components/Settings/Profile.tsx
import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  Select,
  Switch,
  Row,
  Col,
  message,
  Modal,
  Typography,
  Divider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  CameraOutlined,
  BankOutlined,
  GlobalOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

// Timezones
const timezones = [
  "UTC-12:00",
  "UTC-11:00",
  "UTC-10:00",
  "UTC-09:00",
  "UTC-08:00 (PST)",
  "UTC-07:00 (MST)",
  "UTC-06:00 (CST)",
  "UTC-05:00 (EST)",
  "UTC-04:00",
  "UTC-03:00",
  "UTC-02:00",
  "UTC-01:00",
  "UTC+00:00 (GMT)",
  "UTC+01:00",
  "UTC+02:00",
  "UTC+03:00",
  "UTC+04:00",
  "UTC+05:00 (PKT)",
  "UTC+05:30 (IST)",
  "UTC+06:00",
  "UTC+07:00",
  "UTC+08:00",
  "UTC+09:00",
  "UTC+10:00",
  "UTC+11:00",
  "UTC+12:00",
];

interface UserData {
  name: string;
  email: string;
  password: string;
  userRole: string;
  specificRole?: string;
  profileImage?: string;
  companyName?: string;
  companyEmail?: string;
  companyAddress?: string;
  timezone?: string;
  employmentType?: string;
  shift?: string;
  weeklyHours?: number;
  payType?: string;
  currency?: string;
  payAmount?: number;
}

interface NotificationPreferences {
  emailNotifications: boolean;
  demoNotifications: boolean;
  smsNotifications: boolean;
  alerts: boolean;
}

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const [companyForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [notificationPrefs, setNotificationPrefs] =
    useState<NotificationPreferences>({
      emailNotifications: true,
      demoNotifications: true,
      smsNotifications: true,
      alerts: true,
    });

  useEffect(() => {
    loadUserData();
    loadNotificationPreferences();
  }, []);

  const loadUserData = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      try {
        const user = JSON.parse(loggedInUser);
        setUserData(user);
        setProfileImage(user.profileImage || "");

        // Set form values for personal info
        form.setFieldsValue({
          name: user.name,
          email: user.email,
          userRole: user.userRole,
          specificRole: user.specificRole,
        });

        // Set company form values if admin
        if (user.userRole === "admin") {
          companyForm.setFieldsValue({
            companyName: user.companyName,
            companyEmail: user.companyEmail,
            companyAddress: user.companyAddress,
            timezone: user.timezone,
          });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        message.error("Failed to load user data");
      }
    }
  };

  const loadNotificationPreferences = () => {
    const prefs = localStorage.getItem("notificationPreferences");
    if (prefs) {
      setNotificationPrefs(JSON.parse(prefs));
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setProfileImage(result);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleProfileUpdate = async (values: any) => {
    setLoading(true);
    try {
      const updatedUser: UserData = {
        ...userData!,
        profileImage: profileImage,
      };

      // Update in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      // Update in the respective storage (admin or employee)
      if (userData?.userRole === "admin") {
        const adminData = localStorage.getItem("adminData");
        if (adminData) {
          const admin = JSON.parse(adminData);
          localStorage.setItem(
            "adminData",
            JSON.stringify({ ...admin, profileImage: profileImage })
          );
        }
      } else {
        const employees = JSON.parse(localStorage.getItem("employees") || "[]");
        const updatedEmployees = employees.map((emp: any) =>
          emp.email === userData?.email
            ? { ...emp, profileImage: profileImage }
            : emp
        );
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      }

      setUserData(updatedUser);
      message.success("Profile updated successfully!");
    } catch (error) {
      message.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyUpdate = async (values: any) => {
    setLoading(true);
    try {
      const updatedUser: UserData = {
        ...userData!,
        ...values,
      };

      // Update in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      // Update admin data
      const adminData = localStorage.getItem("adminData");
      if (adminData) {
        const admin = JSON.parse(adminData);
        localStorage.setItem(
          "adminData",
          JSON.stringify({ ...admin, ...values })
        );
      }

      setUserData(updatedUser);
      message.success("Company information updated successfully!");
    } catch (error) {
      message.error("Failed to update company information");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (values: any) => {
    setLoading(true);
    try {
      // Verify current password
      if (values.currentPassword !== userData?.password) {
        message.error("Current password is incorrect!");
        setLoading(false);
        return;
      }

      const updatedUser: UserData = {
        ...userData!,
        password: values.newPassword,
      };

      // Update in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      // Update in the respective storage
      if (userData?.userRole === "admin") {
        const adminData = localStorage.getItem("adminData");
        if (adminData) {
          const admin = JSON.parse(adminData);
          localStorage.setItem(
            "adminData",
            JSON.stringify({ ...admin, password: values.newPassword })
          );
        }
      } else {
        const employees = JSON.parse(localStorage.getItem("employees") || "[]");
        const updatedEmployees = employees.map((emp: any) =>
          emp.email === userData?.email
            ? { ...emp, password: values.newPassword }
            : emp
        );
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      }

      setUserData(updatedUser);
      message.success("Password changed successfully!");
      setShowPasswordModal(false);
      passwordForm.resetFields();
    } catch (error) {
      message.error("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationChange = (key: keyof NotificationPreferences) => {
    const newPrefs = {
      ...notificationPrefs,
      [key]: !notificationPrefs[key],
    };
    setNotificationPrefs(newPrefs);
    localStorage.setItem("notificationPreferences", JSON.stringify(newPrefs));
    message.success("Notification preferences updated");
  };

  const handleCancel = () => {
    loadUserData();
    loadNotificationPreferences();
    message.info("Changes cancelled");
  };

  if (!userData) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Text>Loading...</Text>
      </div>
    );
  }

  return (
    <div style={{ padding: "0" }}>
      {/* Personal Information Card */}
      <Card
        style={{
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          marginBottom: "24px",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleProfileUpdate}
          size="large"
        >
          {/* Profile Image Section */}
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <Upload
              beforeUpload={handleImageUpload}
              accept="image/*"
              showUploadList={false}
              maxCount={1}
            >
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  size={120}
                  src={profileImage}
                  icon={!profileImage && <UserOutlined />}
                  style={{
                    backgroundColor: !profileImage ? "#bfbfbf" : "transparent",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #00D4B1, #0066FF)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "4px solid white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  <CameraOutlined style={{ color: "white", fontSize: 18 }} />
                </div>
              </div>
            </Upload>
          </div>

          <Title level={5} style={{ marginBottom: "16px" }}>
            Personal Information
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item name="name" label="Full Name">
                <Input
                  prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                  placeholder="Enter your name"
                  disabled
                  style={{ borderRadius: "8px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="email" label="Email">
                <Input
                  prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
                  placeholder="Enter your email"
                  disabled
                  style={{ borderRadius: "8px" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item name="userRole" label="User Role">
                <Input
                  prefix={<TeamOutlined style={{ color: "#bfbfbf" }} />}
                  placeholder="Role"
                  disabled
                  style={{ borderRadius: "8px", textTransform: "capitalize" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="specificRole"
                label={
                  userData.userRole === "admin" ? "Admin Role" : "Department"
                }
              >
                <Input
                  prefix={<TeamOutlined style={{ color: "#bfbfbf" }} />}
                  placeholder="Specific role"
                  disabled
                  style={{ borderRadius: "8px" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Title level={5} style={{ marginBottom: "16px" }}>
            Password
          </Title>
          <Button
            onClick={() => setShowPasswordModal(true)}
            style={{
              borderRadius: "8px",
              height: "45px",
              width: "100%",
              maxWidth: "200px",
            }}
          >
            Change Password
          </Button>

          <Divider />

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  background: "linear-gradient(135deg, #00D4B1, #0066FF)",
                  border: "none",
                  borderRadius: "8px",
                  height: "45px",
                  width: "50%",
                  fontWeight: 500,
                }}
              >
                Update Profile Image
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Employee Details Card - Only for Employees */}
      {userData.userRole === "employee" && (
        <Card
          title={
            <Title level={5} style={{ margin: 0 }}>
              Employment Details
            </Title>
          }
          style={{
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            marginBottom: "24px",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div>
                <Text type="secondary" style={{ fontSize: "14px" }}>
                  Employment Type
                </Text>
                <div style={{ marginTop: "8px" }}>
                  <Text
                    strong
                    style={{ fontSize: "16px", textTransform: "capitalize" }}
                  >
                    {userData.employmentType || "N/A"}
                  </Text>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div>
                <Text type="secondary" style={{ fontSize: "14px" }}>
                  Shift
                </Text>
                <div style={{ marginTop: "8px" }}>
                  <Text strong style={{ fontSize: "16px" }}>
                    {userData.shift || "N/A"}
                  </Text>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div>
                <Text type="secondary" style={{ fontSize: "14px" }}>
                  Weekly Working Hours
                </Text>
                <div style={{ marginTop: "8px" }}>
                  <Text strong style={{ fontSize: "16px" }}>
                    {userData.weeklyHours
                      ? `${userData.weeklyHours} hours/week`
                      : "N/A"}
                  </Text>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div>
                <Text type="secondary" style={{ fontSize: "14px" }}>
                  Pay Type
                </Text>
                <div style={{ marginTop: "8px" }}>
                  <Text strong style={{ fontSize: "16px" }}>
                    {userData.payType || "N/A"}
                  </Text>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div>
                <Text type="secondary" style={{ fontSize: "14px" }}>
                  Compensation
                </Text>
                <div style={{ marginTop: "8px" }}>
                  <Text strong style={{ fontSize: "16px" }}>
                    {userData.currency && userData.payAmount
                      ? `${userData.currency}${userData.payAmount.toLocaleString()}`
                      : "N/A"}
                  </Text>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      )}

      {/* Company Information Card - Only for Admin */}
      {userData.userRole === "admin" && (
        <Card
          title={
            <Title level={5} style={{ margin: 0 }}>
              Company Information
            </Title>
          }
          style={{
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            marginBottom: "24px",
          }}
        >
          <Form
            form={companyForm}
            layout="vertical"
            onFinish={handleCompanyUpdate}
            size="large"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Title level={5} style={{ marginBottom: "8px" }}>
                  Company Name
                </Title>
                <Form.Item
                  name="companyName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter company name",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select or enter company name"
                    style={{ borderRadius: "8px" }}
                    suffixIcon={<BankOutlined style={{ color: "#bfbfbf" }} />}
                  >
                    <Option value={userData.companyName}>
                      {userData.companyName}
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Title level={5} style={{ marginBottom: 0 }}>
                    Email Notifications
                  </Title>

                  <Switch
                    checked={notificationPrefs.emailNotifications}
                    onChange={() =>
                      handleNotificationChange("emailNotifications")
                    }
                    style={{
                      background: notificationPrefs.emailNotifications
                        ? "#00D4B1"
                        : undefined,
                    }}
                  />
                </div>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Title level={5} style={{ marginBottom: "8px" }}>
                  Address
                </Title>
                <Form.Item
                  name="companyAddress"
                  rules={[
                    {
                      required: true,
                      message: "Please enter company address",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select or enter address"
                    style={{ borderRadius: "8px" }}
                  >
                    <Option value={userData.companyAddress}>
                      {userData.companyAddress}
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Title level={5} style={{ marginBottom: "8px" }}>
                  Timezone
                </Title>
                <Form.Item
                  name="timezone"
                  rules={[
                    {
                      required: true,
                      message: "Please select timezone",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select timezone"
                    style={{ borderRadius: "8px" }}
                    showSearch
                    suffixIcon={<GlobalOutlined style={{ color: "#bfbfbf" }} />}
                  >
                    {timezones.map((tz) => (
                      <Option key={tz} value={tz}>
                        {tz}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "16px",
                  }}
                >
                  <Title level={5} style={{ marginBottom: 0 }}>
                    Alerts
                  </Title>

                  <Switch
                    checked={notificationPrefs.alerts}
                    onChange={() => handleNotificationChange("alerts")}
                    style={{
                      background: notificationPrefs.alerts
                        ? "#00D4B1"
                        : undefined,
                    }}
                  />
                </div>
              </Col>
            </Row>

            <Divider />

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{
                    background: "linear-gradient(135deg, #00D4B1, #0066FF)",
                    border: "none",
                    borderRadius: "8px",
                    height: "45px",
                    width: "50%",
                    fontWeight: 500,
                  }}
                >
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      )}

      {/* Notification Preferences for Employees */}
      {userData.userRole !== "admin" && (
        <Card
          title={
            <Title level={5} style={{ margin: 0 }}>
              Notification Preferences
            </Title>
          }
          style={{
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            marginBottom: "24px",
          }}
        >
          <Row gutter={[16, 24]}>
            <Col xs={24} sm={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Text strong>Email Notifications</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    Receive updates via email
                  </Text>
                </div>
                <Switch
                  checked={notificationPrefs.emailNotifications}
                  onChange={() =>
                    handleNotificationChange("emailNotifications")
                  }
                  style={{
                    background: notificationPrefs.emailNotifications
                      ? "#00D4B1"
                      : undefined,
                  }}
                />
              </div>
            </Col>

            <Col xs={24} sm={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Text strong>Alerts</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    Receive important alerts
                  </Text>
                </div>
                <Switch
                  checked={notificationPrefs.alerts}
                  onChange={() => handleNotificationChange("alerts")}
                  style={{
                    background: notificationPrefs.alerts
                      ? "#00D4B1"
                      : undefined,
                  }}
                />
              </div>
            </Col>
          </Row>
        </Card>
      )}

      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        open={showPasswordModal}
        onCancel={() => {
          setShowPasswordModal(false);
          passwordForm.resetFields();
        }}
        footer={null}
        centered
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordChange}
          size="large"
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              { required: true, message: "Please enter current password" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Enter current password"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter new password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Enter new password"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Confirm new password"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                background: "linear-gradient(135deg, #00D4B1, #0066FF)",
                border: "none",
                borderRadius: "8px",
                height: "45px",
                fontWeight: 500,
              }}
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
