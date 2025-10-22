import { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

const { Title, Text } = Typography;

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // const onFinish = async (values: any) => {
  //   setLoading(true);
  //   try {
  //     if (isForgotPassword) {
  //       console.log("Forgot Password - Send OTP to:", values.email);
  //       message.success("OTP sent to your email!");
  //     } else {
  //       console.log("Login:", values);

  //       // Retrieve stored user data (temporary - replace with API call)
  //       const storedUserData = localStorage.getItem("userData");
  //       if (storedUserData) {
  //         const userData = JSON.parse(storedUserData);
  //         // Verify email matches
  //         if (userData.email === values.email) {
  //           // Store logged in user data
  //           localStorage.setItem("loggedInUser", JSON.stringify(userData));
  //         }
  //       }

  //       message.success("Login successful!");
  //       setTimeout(() => {
  //         router.push("/dashboard");
  //       }, 1000);
  //     }
  //   } catch (error) {
  //     message.error(
  //       isForgotPassword
  //         ? "Failed to send OTP."
  //         : "Login failed. Please try again."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      if (isForgotPassword) {
        console.log("Forgot Password - Send OTP to:", values.email);
        message.success("OTP sent to your email!");
      } else {
        console.log("Login:", values);

        // Retrieve stored user data (temporary - replace with API call)
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          // Verify email and password match
          if (
            userData.email === values.email &&
            userData.password === values.password
          ) {
            // Store logged in user data
            localStorage.setItem("loggedInUser", JSON.stringify(userData));
            message.success("Login successful!");
            setTimeout(() => {
              router.push("/dashboard");
            }, 1000);
          } else {
            message.error("Invalid email or password!");
            setLoading(false);
            return;
          }
        } else {
          message.error("User not found! Please register first.");
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      message.error(
        isForgotPassword
          ? "Failed to send OTP."
          : "Login failed. Please try again."
      );
    } finally {
      if (!isForgotPassword) {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <Head>
        <title>
          {isForgotPassword ? "Forgot Password" : "Login"} | FlexTrack
        </title>{" "}
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
                {isForgotPassword ? "Forgot Password" : "Login"}{" "}
              </Title>

              {/* Empty div to balance right side (optional) */}
              <div style={{ width: 40 }}></div>
            </div>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            autoComplete="off"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Enter your email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: !isForgotPassword,
                  message: "Please input your password!",
                },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
              style={{ display: isForgotPassword ? "none" : "block" }}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Enter your password"
              />
            </Form.Item>
            {!isForgotPassword && (
              <div style={{ textAlign: "left", marginBottom: 16 }}>
                <a
                  onClick={() => setIsForgotPassword(true)}
                  style={{ fontSize: "14px" }}
                >
                  Forgot Password?
                </a>
              </div>
            )}

            {isForgotPassword && (
              <div style={{ textAlign: "left", marginBottom: 16 }}>
                <a
                  onClick={() => setIsForgotPassword(false)}
                  style={{ fontSize: "14px" }}
                >
                  Back to Login
                </a>
              </div>
            )}

            <Form.Item>
              <Button
                htmlType="submit"
                loading={loading}
                block
                style={{
                  height: 45,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "white",
                  background: "linear-gradient(135deg, #00D4B1, #0066FF)",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                {isForgotPassword ? "Send OTP" : "Log in"}
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Text type="secondary">
                Don't have an account?{" "}
                <Link href="/register" style={{ fontWeight: 500 }}>
                  Register here
                </Link>
              </Text>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}
