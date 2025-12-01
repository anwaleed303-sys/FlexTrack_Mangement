import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchRecentNotifications,
  markNotificationAsRead,
  deleteNotification,
  markAllNotificationsAsRead,
} from "../../redux/slices/dashboardSlice";
import {
  Layout,
  Avatar,
  Badge,
  Dropdown,
  message,
  Modal,
  List,
  Button,
  Tag,
  Spin,
} from "antd";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import type { MenuProps } from "antd";

interface UserData {
  name?: string;
  email?: string;
  role?: string;
  specificRole?: string;
}
interface Notification {
  id: string;
  type:
    | "leave_status"
    | "company_announcement"
    | "company_leave"
    | "shift_assignment"
    | "shift_approval"
    | "shift_rejection";
  title: string;
  message: string;
  date: string;
  read: boolean;
  leaveId?: number;
  shiftRequestId?: string;
  assignmentId?: string;
}
interface HeaderProps {
  onMenuClick?: () => void;
  isMobile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isMobile = false }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Redux selectors
  const { notifications, unreadNotificationCount, notificationsLoading } =
    useSelector((state: RootState) => state.dashboard);

  const [profileImage, setProfileImage] = useState<string>("");
  const [imageUploading, setImageUploading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: "User",
    email: "",
    role: "Admin",
    specificRole: "HR Manager",
  });
  const [showNotifications, setShowNotifications] = useState(false);
  useEffect(() => {
    // Get user data from localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      try {
        const user = JSON.parse(loggedInUser);
        setUserData({
          name: user.name || user.fullName || "User",
          email: user.email || "",
          role: user.userRole === "admin" ? "Admin" : "Employee",
          specificRole: user.specificRole || "",
        });
        setProfileImage(user.profileImage || "");

        // ONLY LOAD NOTIFICATIONS IF ALERTS ARE ENABLED
        if (user.alerts !== false) {
          dispatch(fetchRecentNotifications());
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Refresh notifications every 10 seconds
    const interval = setInterval(() => {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        // ONLY REFRESH IF ALERTS ARE ENABLED
        if (user.alerts !== false) {
          dispatch(fetchRecentNotifications());
        }
      }
    }, 10000);

    // Listen for profile updates
    const handleProfileUpdate = (event: CustomEvent) => {
      if (event.detail?.profileImage) {
        setProfileImage(event.detail.profileImage);
      }
      if (event.detail?.uploading !== undefined) {
        setImageUploading(false);
      }
      // REFRESH ALERTS PREFERENCE
      if (event.detail?.alerts !== undefined) {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
          const user = JSON.parse(loggedInUser);
          if (user.alerts) {
            dispatch(fetchRecentNotifications());
          }
        }
      }
    };

    const handleImageUploading = (event: CustomEvent) => {
      if (event.detail?.uploading !== undefined) {
        setImageUploading(event.detail.uploading);
      }
    };

    window.addEventListener(
      "profileUpdated",
      handleProfileUpdate as EventListener
    );

    window.addEventListener(
      "profileImageUploading",
      handleImageUploading as EventListener
    );

    return () => {
      clearInterval(interval);
      window.removeEventListener(
        "profileUpdated",
        handleProfileUpdate as EventListener
      );
      window.removeEventListener(
        "profileImageUploading",
        handleImageUploading as EventListener
      );
    };
  }, [dispatch]);

  //   // Get user data from localStorage
  //   const loggedInUser = localStorage.getItem("loggedInUser");
  //   if (loggedInUser) {
  //     try {
  //       const user = JSON.parse(loggedInUser);
  //       setUserData({
  //         name: user.name || user.fullName || "User",
  //         email: user.email || "",
  //         role: user.userRole === "admin" ? "Admin" : "Employee",
  //         specificRole: user.specificRole || "",
  //       });
  //       setProfileImage(user.profileImage || "");

  //       // Load notifications
  //       dispatch(fetchRecentNotifications());
  //     } catch (error) {
  //       console.error("Error parsing user data:", error);
  //     }
  //   }

  //   // Refresh notifications every 10 seconds
  //   const interval = setInterval(() => {
  //     dispatch(fetchRecentNotifications());
  //   }, 10000);

  //   // ADD THIS: Listen for profile updates
  //   const handleProfileUpdate = (event: CustomEvent) => {
  //     if (event.detail?.profileImage) {
  //       setProfileImage(event.detail.profileImage);
  //     }
  //   };

  //   window.addEventListener(
  //     "profileUpdated",
  //     handleProfileUpdate as EventListener
  //   );

  //   return () => {
  //     clearInterval(interval);
  //     window.removeEventListener(
  //       "profileUpdated",
  //       handleProfileUpdate as EventListener
  //     );
  //   };
  // }, [dispatch]);
  // useEffect(() => {
  //   // Get user data from localStorage
  //   const loggedInUser = localStorage.getItem("loggedInUser");
  //   if (loggedInUser) {
  //     try {
  //       const user = JSON.parse(loggedInUser);
  //       setUserData({
  //         name: user.name || user.fullName || "User",
  //         email: user.email || "",
  //         role: user.userRole === "admin" ? "Admin" : "Employee",
  //         specificRole: user.specificRole || "",
  //       });
  //       setProfileImage(user.profileImage || "");

  //       // Load notifications
  //       dispatch(fetchRecentNotifications());
  //     } catch (error) {
  //       console.error("Error parsing user data:", error);
  //     }
  //   }

  //   // Refresh notifications every 10 seconds
  //   const interval = setInterval(() => {
  //     dispatch(fetchRecentNotifications());
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userData");
    localStorage.removeItem("token");

    message.success({
      content: "Logged out successfully! Redirecting to login...",
      duration: 2,
      style: {
        marginTop: "20vh",
        fontSize: "16px",
      },
    });

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await dispatch(markNotificationAsRead(notificationId)).unwrap();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await dispatch(deleteNotification(notificationId)).unwrap();
      message.success("Notification deleted");
    } catch (error: any) {
      message.error(error || "Failed to delete notification");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await dispatch(markAllNotificationsAsRead()).unwrap();
      message.success("All notifications marked as read");
    } catch (error: any) {
      message.error(error || "Failed to mark all as read");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <div style={{ padding: "8px 0" }}>
          <div style={{ fontWeight: 600, fontSize: "14px", color: "#262626" }}>
            {userData.name}
          </div>
          <div style={{ fontSize: "12px", color: "#8c8c8c", marginTop: "4px" }}>
            {userData.email}
          </div>
          <div style={{ fontSize: "12px", color: "#0066FF", marginTop: "4px" }}>
            {userData.role} - {userData.specificRole}
          </div>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <div
      style={{
        background: "#f0f2f5",
        padding: isMobile ? "8px" : "16px 20px",
      }}
    >
      <Layout.Header
        style={{
          background: "#fff",
          padding: isMobile ? "12px 16px" : "24px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          height: isMobile ? "60px" : "70px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {isMobile && (
            <MenuOutlined
              onClick={onMenuClick}
              style={{
                fontSize: "20px",
                color: "#595959",
                cursor: "pointer",
              }}
            />
          )}
          <div
            style={{
              width: isMobile ? 36 : 40,
              height: isMobile ? 36 : 40,
              background: "linear-gradient(135deg, #0066FF, #00D4B1)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: isMobile ? "16px" : "18px",
            }}
          >
            FT
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: isMobile ? "16px" : "20px",
              fontWeight: 600,
              display: "block",
            }}
            className="header-title"
          >
            FlexTrack
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            gap: isMobile ? "12px" : "20px",
            alignItems: "center",
          }}
        >
          {/* Notification Bell */}
          <Badge count={unreadNotificationCount} offset={[-5, 5]}>
            <BellOutlined
              onClick={() => setShowNotifications(true)}
              style={{
                fontSize: isMobile ? "18px" : "20px",
                color: "#595959",
                cursor: "pointer",
              }}
            />
          </Badge>

          <div
            style={{
              textAlign: "right",
              lineHeight: "1.3",
              display: "block",
            }}
            className="user-info"
          >
            <div
              style={{ fontWeight: 600, fontSize: "14px", color: "#262626" }}
            >
              {userData.role}
            </div>
            <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
              {userData.specificRole}
            </div>
          </div>

          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Badge
              count={imageUploading ? <Spin size="small" /> : 0}
              offset={[-5, 5]}
            >
              <Avatar
                src={profileImage}
                icon={!profileImage && <UserOutlined />}
                style={{
                  backgroundColor: profileImage ? "transparent" : "#bfbfbf",
                  cursor: "pointer",
                  opacity: imageUploading ? 0.6 : 1,
                }}
                size={isMobile ? 36 : 40}
              />
            </Badge>
          </Dropdown>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .header-title {
              display: none !important;
            }
            .user-info {
              display: none !important;
            }
          }
        `}</style>
      </Layout.Header>

      {/* Notifications Modal */}
      <Modal
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Notifications</span>
            {unreadNotificationCount > 0 && (
              <Button
                type="link"
                onClick={handleMarkAllAsRead}
                size="small"
                loading={notificationsLoading}
              >
                Mark all as read
              </Button>
            )}
          </div>
        }
        open={showNotifications}
        onCancel={() => setShowNotifications(false)}
        footer={null}
        width={600}
      >
        <List
          dataSource={notifications}
          loading={notificationsLoading}
          locale={{ emptyText: "No notifications" }}
          renderItem={(item) => (
            <List.Item
              style={{
                backgroundColor: item.read ? "#fff" : "#e6f7ff",
                padding: "12px",
                marginBottom: "8px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => !item.read && handleMarkAsRead(item._id)}
              actions={[
                <Button
                  type="text"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNotification(item._id);
                  }}
                />,
              ]}
            >
              <List.Item.Meta
                title={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontWeight: item.read ? "normal" : "bold" }}>
                      {item.title}
                    </span>
                    {!item.read && (
                      <Tag
                        color="blue"
                        style={{ fontSize: "10px", padding: "0 4px" }}
                      >
                        NEW
                      </Tag>
                    )}
                  </div>
                }
                description={
                  <div>
                    <div style={{ marginBottom: "4px" }}>{item.message}</div>
                    <div style={{ fontSize: "11px", color: "#8c8c8c" }}>
                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default Header;
