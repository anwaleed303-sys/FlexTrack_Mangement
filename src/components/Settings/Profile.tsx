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
  Spin,
  App,
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
import { useAppDispatch, useAppSelector } from "../../hooks/useAuth";
import {
  getProfile,
  updateProfileImage,
  updateCompanyInfo,
  changePassword,
  getNotificationPreferences,
  updateNotificationPreferences,
  getEmploymentDetails,
} from "../../redux/slices/settingsSlice";

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

const Profile: React.FC = () => {
  const { message } = App.useApp();
  const dispatch = useAppDispatch();

  const { user, notificationPrefs, loading, error } = useAppSelector(
    (state) => state.settings
  );

  const [form] = Form.useForm();
  const [companyForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [profileImage, setProfileImage] = useState<string>("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    // Fetch profile data on mount
    dispatch(getProfile());
    dispatch(getNotificationPreferences());

    // If employee, fetch employment details
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      if (userData.userRole === "employee") {
        dispatch(getEmploymentDetails());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
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
    }
  }, [user, form, companyForm]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setProfileImage(result);
    };
    reader.readAsDataURL(file);
    return false;
  };

  //   try {
  //     await dispatch(updateProfileImage(profileImage)).unwrap();
  //     message.success("Profile image updated successfully!");

  //     // Update localStorage
  //     const loggedInUser = localStorage.getItem("loggedInUser");
  //     if (loggedInUser) {
  //       const userData = JSON.parse(loggedInUser);
  //       userData.profileImage = profileImage;
  //       localStorage.setItem("loggedInUser", JSON.stringify(userData));
  //     }
  //   } catch (err: any) {
  //     message.error(err || "Failed to update profile image");
  //   }
  // };

  const handleProfileUpdate = async () => {
    try {
      window.dispatchEvent(
        new CustomEvent("profileImageUploading", {
          detail: { uploading: true },
        })
      );

      // THIS IS THE ACTUAL API CALL TO SAVE IMAGE IN DB
      await dispatch(updateProfileImage(profileImage)).unwrap();

      message.success("Profile image updated successfully!");

      // Update localStorage after successful DB save
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        userData.profileImage = profileImage;
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
      }

      window.dispatchEvent(
        new CustomEvent("profileUpdated", {
          detail: { profileImage: profileImage, uploading: false },
        })
      );
    } catch (err: any) {
      message.error(err || "Failed to update profile image");

      window.dispatchEvent(
        new CustomEvent("profileImageUploading", {
          detail: { uploading: false },
        })
      );
    }
  };
  const handleCompanyUpdate = async (values: any) => {
    try {
      await dispatch(updateCompanyInfo(values)).unwrap();
      message.success("Company information updated successfully!");

      // Update localStorage
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        Object.assign(userData, values);
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
      }
    } catch (err: any) {
      message.error(err || "Failed to update company information");
    }
  };

  const handlePasswordChange = async (values: any) => {
    try {
      await dispatch(
        changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        })
      ).unwrap();
      message.success("Password changed successfully!");
      setShowPasswordModal(false);
      passwordForm.resetFields();
    } catch (err: any) {
      message.error(err || "Failed to change password");
    }
  };
  const handleNotificationChange = async (
    key: keyof typeof notificationPrefs
  ) => {
    const newPrefs = {
      ...notificationPrefs,
      [key]: !notificationPrefs[key],
    };

    try {
      await dispatch(updateNotificationPreferences(newPrefs)).unwrap();

      // UPDATE LOCALSTORAGE
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        userData[key] = newPrefs[key];
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
      }

      // DISPATCH CUSTOM EVENT TO UPDATE HEADER
      window.dispatchEvent(
        new CustomEvent("profileUpdated", {
          detail: { [key]: newPrefs[key] },
        })
      );

      if (key === "emailNotifications" && newPrefs[key] === true) {
        message.success(
          "Email notifications enabled! You will receive alerts at your registered email.",
          5
        );
      } else if (key === "alerts" && newPrefs[key] === true) {
        message.success(
          "Alerts enabled! You will receive in-app notifications.",
          5
        );
      } else {
        message.success("Notification preferences updated");
      }
    } catch (err: any) {
      message.error(err || "Failed to update notification preferences");
    }
  };

  if (!user) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          minHeight: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" tip="Loading profile..." />
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
        <Form form={form} layout="vertical" size="large">
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
                label={user.userRole === "admin" ? "Admin Role" : "Department"}
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
                onClick={handleProfileUpdate}
                // loading={loading}
                disabled={!profileImage || profileImage === user.profileImage}
                style={{
                  background: "linear-gradient(135deg, #00D4B1, #0066FF)",
                  border: "none",
                  borderRadius: "8px",
                  height: "45px",
                  width: "30%",
                  // fontWeight: 500,
                }}
              >
                Update Image
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Employee Details Card - Only for Employees */}
      {user.userRole === "employee" && (
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
                    {user.employmentType || "N/A"}
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
                    {user.shift || "N/A"}
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
                    {user.weeklyHours
                      ? `${user.weeklyHours} hours/week`
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
                    {user.payType || "N/A"}
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
                    {user.currency && user.payAmount
                      ? `${user.currency}${user.payAmount.toLocaleString()}`
                      : "N/A"}
                  </Text>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      )}

      {/* Company Information Card - Only for Admin */}
      {user.userRole === "admin" && (
        <Card
          title={
            <Title level={5} style={{ margin: 0 }}>
              Company Information
            </Title>
          }
          style={{
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            marginBottom: "16px",
            padding: "16px", // reduced height
          }}
        >
          <Form
            form={companyForm}
            layout="vertical"
            onFinish={handleCompanyUpdate}
            size="large"
          >
            {/* Row 1: Company Name + Company Email */}
            <Row gutter={[16, 8]}>
              <Col xs={24} md={12}>
                <Title level={5} style={{ marginBottom: "6px" }}>
                  Company Name
                </Title>
                <Form.Item
                  name="companyName"
                  rules={[
                    { required: true, message: "Please enter company name" },
                  ]}
                >
                  <Input
                    prefix={<BankOutlined style={{ color: "#bfbfbf" }} />}
                    placeholder="Enter company name"
                    style={{ borderRadius: "8px" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Title level={5} style={{ marginBottom: "6px" }}>
                  Company Email
                </Title>
                <Form.Item
                  name="companyEmail"
                  rules={[
                    { required: true, message: "Please enter company email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
                    placeholder="Enter company email"
                    style={{ borderRadius: "8px" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Row 2: Address + Timezone */}
            <Row gutter={[16, 8]}>
              <Col xs={24} md={12}>
                <Title level={5} style={{ marginBottom: "6px" }}>
                  Address
                </Title>
                <Form.Item
                  name="companyAddress"
                  rules={[
                    { required: true, message: "Please enter company address" },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Enter company address"
                    rows={1}
                    style={{ borderRadius: "8px" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Title level={5} style={{ marginBottom: "6px" }}>
                  Timezone
                </Title>
                <Form.Item
                  name="timezone"
                  rules={[
                    { required: true, message: "Please select timezone" },
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
            </Row>

            <Divider style={{ margin: "12px 0" }} />

            {/* Centered Button */}
            <Row justify="center">
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{
                    background: "linear-gradient(135deg, #00D4B1, #0066FF)",
                    border: "none",
                    borderRadius: "8px",
                    height: "42px",
                    width: "180px",
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
