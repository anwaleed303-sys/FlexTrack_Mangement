// import { useState } from "react";
// import { Form, Input, Button, Card, Typography, message } from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../redux/slices/authSlice";
// import { AppDispatch, RootState } from "../redux/store";
// import { authAPI } from "../services/api";

// const { Title, Text } = Typography;

// interface LoginFormValues {
//   email: string;
//   password?: string;
// }

// export default function Login() {
//   // const router = useRouter();
//   // const [loading, setLoading] = useState(false);
//   // const [isForgotPassword, setIsForgotPassword] = useState(false);

//   const dispatch = useDispatch<AppDispatch>();
//   const { loading: authLoading, error } = useSelector(
//     (state: RootState) => state.auth
//   );
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [isForgotPassword, setIsForgotPassword] = useState(false);

//   const onFinish = async (values: LoginFormValues) => {
//     setLoading(true);
//     try {
//       if (isForgotPassword) {
//         // Forgot password - implement later or keep existing logic
//         message.success("Password reset link sent to your email!");
//         setTimeout(() => {
//           setIsForgotPassword(false);
//         }, 1500);
//         setLoading(false);
//       } else {
//         // Login with Redux
//         await dispatch(
//           loginUser({
//             email: values.email,
//             password: values.password!,
//           })
//         ).unwrap();

//         message.success("Login successful!");
//         setTimeout(() => {
//           router.push("/dashboard");
//         }, 1000);
//       }
//     } catch (error: any) {
//       message.error(
//         error ||
//           (isForgotPassword
//             ? "Failed to send reset link."
//             : "Invalid email or password!")
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const onFinish = async (values: LoginFormValues) => {
//   //   setLoading(true);
//   //   try {
//   //     if (isForgotPassword) {
//   //       // Forgot password logic - check if email exists
//   //       const storedAdminData = localStorage.getItem("adminData");
//   //       const additionalAdmins = JSON.parse(
//   //         localStorage.getItem("additionalAdmins") || "[]"
//   //       );
//   //       const employees = JSON.parse(localStorage.getItem("employees") || "[]");

//   //       let emailExists = false;

//   //       if (storedAdminData) {
//   //         const adminData = JSON.parse(storedAdminData);
//   //         if (adminData.email === values.email) {
//   //           emailExists = true;
//   //         }
//   //       }

//   //       if (!emailExists) {
//   //         const foundInAdditionalAdmins = additionalAdmins.find(
//   //           (admin: any) => admin.email === values.email
//   //         );
//   //         if (foundInAdditionalAdmins) emailExists = true;
//   //       }

//   //       if (!emailExists) {
//   //         const foundInEmployees = employees.find(
//   //           (emp: any) => emp.email === values.email
//   //         );
//   //         if (foundInEmployees) emailExists = true;
//   //       }

//   //       if (emailExists) {
//   //         message.success("Password reset link sent to your email!");
//   //         setTimeout(() => {
//   //           setIsForgotPassword(false);
//   //         }, 1500);
//   //       } else {
//   //         message.error("Email not found!");
//   //       }
//   //       setLoading(false);
//   //     } else {
//   //       // Login logic
//   //       const storedAdminData = localStorage.getItem("adminData");
//   //       const additionalAdmins = JSON.parse(
//   //         localStorage.getItem("additionalAdmins") || "[]"
//   //       );
//   //       const employees = JSON.parse(localStorage.getItem("employees") || "[]");

//   //       let userData = null;
//   //       let userType = "";

//   //       // Check if main admin
//   //       if (storedAdminData) {
//   //         const adminData = JSON.parse(storedAdminData);
//   //         if (
//   //           adminData.email === values.email &&
//   //           adminData.password === values.password
//   //         ) {
//   //           userData = adminData;
//   //           userType = "mainAdmin";
//   //         }
//   //       }

//   //       // Check additional admins
//   //       if (!userData) {
//   //         const foundAdmin = additionalAdmins.find(
//   //           (admin: any) =>
//   //             admin.email === values.email && admin.password === values.password
//   //         );
//   //         if (foundAdmin) {
//   //           userData = foundAdmin;
//   //           userType = "admin";
//   //         }
//   //       }

//   //       // Check employees
//   //       if (!userData) {
//   //         const foundEmployee = employees.find(
//   //           (emp: any) =>
//   //             emp.email === values.email && emp.password === values.password
//   //         );
//   //         if (foundEmployee) {
//   //           userData = foundEmployee;
//   //           userType = "employee";
//   //         }
//   //       }

//   //       if (userData) {
//   //         // Store logged in user data with user type
//   //         localStorage.setItem(
//   //           "loggedInUser",
//   //           JSON.stringify({ ...userData, userType })
//   //         );
//   //         message.success("Login successful!");
//   //         setTimeout(() => {
//   //           router.push("/dashboard");
//   //         }, 1000);
//   //       } else {
//   //         message.error("Invalid email or password!");
//   //         setLoading(false);
//   //         return;
//   //       }
//   //     }
//   //   } catch (error) {
//   //     message.error(
//   //       isForgotPassword
//   //         ? "Failed to send reset link."
//   //         : "Login failed. Please try again."
//   //     );
//   //     setLoading(false);
//   //   }
//   // };

//   return (
//     <>
//       <Head>
//         <title>
//           {isForgotPassword ? "Forgot Password" : "Login"} | FlexTrack
//         </title>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
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
//                 {isForgotPassword ? "Forgot Password" : "Login"}
//               </Title>

//               <div style={{ width: 40 }}></div>
//             </div>
//           </div>

//           <Form
//             name="login"
//             onFinish={onFinish}
//             layout="vertical"
//             size="large"
//             autoComplete="off"
//           >
//             <Form.Item
//               name="email"
//               label="Email"
//               rules={[
//                 { required: true, message: "Please input your email!" },
//                 { type: "email", message: "Please enter a valid email!" },
//               ]}
//             >
//               <Input
//                 prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
//                 placeholder="Enter your email"
//               />
//             </Form.Item>

//             {!isForgotPassword && (
//               <Form.Item
//                 name="password"
//                 label="Password"
//                 rules={[
//                   { required: true, message: "Please input your password!" },
//                   {
//                     min: 6,
//                     message: "Password must be at least 6 characters!",
//                   },
//                 ]}
//               >
//                 <Input.Password
//                   prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
//                   placeholder="Enter your password"
//                 />
//               </Form.Item>
//             )}

//             {!isForgotPassword && (
//               <div style={{ textAlign: "left", marginBottom: 16 }}>
//                 <a
//                   onClick={() => setIsForgotPassword(true)}
//                   style={{ fontSize: "14px", cursor: "pointer" }}
//                 >
//                   Forgot Password?
//                 </a>
//               </div>
//             )}

//             {isForgotPassword && (
//               <div style={{ textAlign: "left", marginBottom: 16 }}>
//                 <a
//                   onClick={() => setIsForgotPassword(false)}
//                   style={{ fontSize: "14px", cursor: "pointer" }}
//                 >
//                   Back to Login
//                 </a>
//               </div>
//             )}

//             <Form.Item>
//               <Button
//                 htmlType="submit"
//                 loading={loading || authLoading}
//                 block
//                 style={{
//                   height: 45,
//                   fontSize: 16,
//                   fontWeight: 500,
//                   color: "white",
//                   background: "linear-gradient(135deg, #00D4B1, #0066FF)",
//                   border: "none",
//                   boxShadow: "none",
//                 }}
//               >
//                 {isForgotPassword ? "Send Reset Link" : "Log in"}
//               </Button>
//             </Form.Item>

//             <div style={{ textAlign: "center" }}>
//               <Text type="secondary">
//                 Don't have an account?{" "}
//                 <Link href="/register" style={{ fontWeight: 500 }}>
//                   Register here
//                 </Link>
//               </Text>
//             </div>
//           </Form>
//         </Card>
//       </div>
//     </>
//   );
// }

import { useState } from "react";
import { Form, Input, Button, Card, Typography, message, App } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { AppDispatch, RootState } from "../redux/store";
import { authAPI } from "../services/api";

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password?: string;
}

export default function Login() {
  const { message } = App.useApp();
  const dispatch = useDispatch<AppDispatch>();
  const { loading: authLoading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      if (isForgotPassword) {
        // ✅ Use authAPI instead of fetch
        try {
          await authAPI.forgotPassword(values.email);

          message.success({
            content: "Password reset link has been sent to your email!",
            duration: 5,
          });
          setTimeout(() => {
            setIsForgotPassword(false);
          }, 2000);
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.message ||
            error.message ||
            "Failed to send reset link";

          if (
            errorMessage?.toLowerCase().includes("not found") ||
            errorMessage?.toLowerCase().includes("no user")
          ) {
            message.error({
              content: (
                <span>
                  Email not found. Please{" "}
                  <Link
                    href="/register"
                    style={{ color: "#1890ff", textDecoration: "underline" }}
                  >
                    register first
                  </Link>
                </span>
              ),
              duration: 5,
            });
          } else {
            message.error(errorMessage);
          }
        }
        setLoading(false);
      } else {
        // Login with Redux using .unwrap()
        const result = await dispatch(
          loginUser({
            email: values.email,
            password: values.password!,
          })
        ).unwrap();

        console.log("✅ Login successful, result:", result);
        message.success("Login successful! Redirecting to dashboard...");

        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (error: any) {
      console.error("❌ Login failed, error:", error);

      const errorMessage =
        typeof error === "string" ? error : error?.message || "Login failed";

      if (
        errorMessage?.toLowerCase().includes("user not found") ||
        errorMessage?.toLowerCase().includes("no user found") ||
        errorMessage?.toLowerCase().includes("user does not exist") ||
        errorMessage?.toLowerCase().includes("account not found")
      ) {
        message.error({
          content: (
            <span>
              User not found. Please{" "}
              <Link
                href="/register"
                style={{ color: "#1890ff", textDecoration: "underline" }}
              >
                register first
              </Link>
            </span>
          ),
          duration: 5,
        });
      } else if (
        errorMessage?.toLowerCase().includes("password") ||
        errorMessage?.toLowerCase().includes("invalid credentials")
      ) {
        message.error("Invalid password. Please try again.");
      } else {
        message.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          {isForgotPassword ? "Forgot Password" : "Login"} | FlexTrack
        </title>
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
                {isForgotPassword ? "Forgot Password" : "Login"}
              </Title>

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

            {!isForgotPassword && (
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                  placeholder="Enter your password"
                />
              </Form.Item>
            )}

            {!isForgotPassword && (
              <div style={{ textAlign: "left", marginBottom: 16 }}>
                <a
                  onClick={() => setIsForgotPassword(true)}
                  style={{ fontSize: "14px", cursor: "pointer" }}
                >
                  Forgot Password?
                </a>
              </div>
            )}

            {isForgotPassword && (
              <div style={{ textAlign: "left", marginBottom: 16 }}>
                <a
                  onClick={() => setIsForgotPassword(false)}
                  style={{ fontSize: "14px", cursor: "pointer" }}
                >
                  Back to Login
                </a>
              </div>
            )}

            <Form.Item>
              <Button
                htmlType="submit"
                loading={loading || authLoading}
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
                {isForgotPassword ? "Send Reset Link" : "Log in"}
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
