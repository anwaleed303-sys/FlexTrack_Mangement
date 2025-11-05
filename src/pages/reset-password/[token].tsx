// import { useState } from "react";
// import { Form, Input, Button, Card, Typography, message } from "antd";
// import { LockOutlined } from "@ant-design/icons";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import Link from "next/link";

// const { Title, Text } = Typography;

// export default function ResetPassword() {
//   const router = useRouter();
//   const { token } = router.query;
//   const [loading, setLoading] = useState(false);

//   const onFinish = async (values: {
//     password: string;
//     confirmPassword: string;
//   }) => {
//     if (values.password !== values.confirmPassword) {
//       message.error("Passwords do not match!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password/${token}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ password: values.password }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         message.success("Password reset successful! Redirecting to login...");
//         setTimeout(() => {
//           router.push("/login");
//         }, 2000);
//       } else {
//         message.error(data.message || "Failed to reset password");
//       }
//     } catch (error: any) {
//       message.error("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Reset Password | FlexTrack</title>
//       </Head>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "100vh",
//           background: "#f0f2f5",
//           padding: "20px",
//         }}
//       >
//         <Card
//           style={{
//             width: "100%",
//             maxWidth: 450,
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             borderRadius: "8px",
//           }}
//         >
//           <div style={{ textAlign: "center", marginBottom: 24 }}>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 marginBottom: 24,
//               }}
//             >
//               <div
//                 style={{
//                   width: 40,
//                   height: 40,
//                   background: "linear-gradient(135deg, #0066FF, #00D4B1)",
//                   borderRadius: "8px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   color: "white",
//                   fontWeight: "bold",
//                   fontSize: "18px",
//                 }}
//               >
//                 FT
//               </div>

//               <Title
//                 level={2}
//                 style={{ margin: 0, textAlign: "center", flex: 1 }}
//               >
//                 Reset Password
//               </Title>
//               {/* <Text type="secondary">Enter your new password below</Text> */}
//             </div>
//           </div>
//           <Form
//             name="resetPassword"
//             onFinish={onFinish}
//             layout="vertical"
//             size="large"
//           >
//             <Form.Item
//               name="password"
//               label="New Password"
//               rules={[
//                 { required: true, message: "Please input your new password!" },
//                 { min: 6, message: "Password must be at least 6 characters!" },
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
//                 placeholder="Enter new password"
//               />
//             </Form.Item>

//             <Form.Item
//               name="confirmPassword"
//               label="Confirm Password"
//               rules={[
//                 { required: true, message: "Please confirm your password!" },
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
//                 placeholder="Confirm new password"
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 htmlType="submit"
//                 loading={loading}
//                 block
//                 style={{
//                   height: 45,
//                   fontSize: 16,
//                   fontWeight: 500,
//                   color: "white",
//                   background: "linear-gradient(135deg, #00D4B1, #0066FF)",
//                   border: "none",
//                 }}
//               >
//                 Reset Password
//               </Button>
//             </Form.Item>

//             <div style={{ textAlign: "center" }}>
//               <Link href="/login">Back to Login</Link>
//             </div>
//           </Form>
//         </Card>
//       </div>
//     </>
//   );
// }

import { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { authAPI } from "../../services/api"; // ✅ ADD THIS LINE

const { Title, Text } = Typography;

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(false);

  // ✅ REPLACE THE ENTIRE onFinish FUNCTION
  const onFinish = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // Use authAPI instead of fetch
      const response = await authAPI.resetPassword(
        token as string,
        values.password
      );

      message.success("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      message.error(
        error.response?.data?.message || "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password | FlexTrack</title>
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

              <Title
                level={2}
                style={{ margin: 0, textAlign: "center", flex: 1 }}
              >
                Reset Password
              </Title>
            </div>
          </div>
          <Form
            name="resetPassword"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="password"
              label="New Password"
              rules={[
                { required: true, message: "Please input your new password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Enter new password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[
                { required: true, message: "Please confirm your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Confirm new password"
              />
            </Form.Item>

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
                }}
              >
                Reset Password
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Link href="/login">Back to Login</Link>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}
