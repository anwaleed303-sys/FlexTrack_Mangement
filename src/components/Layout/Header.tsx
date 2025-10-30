import React, { useState, useEffect } from "react";
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

interface HeaderProps {
  onMenuClick?: () => void;
  isMobile?: boolean;
}

interface Notification {
  id: string;
  type: "leave_status" | "company_announcement" | "company_leave";
  title: string;
  message: string;
  date: string;
  read: boolean;
  leaveId?: number;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isMobile = false }) => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string>("");
  const [userData, setUserData] = useState<UserData>({
    name: "User",
    email: "",
    role: "Admin",
    specificRole: "HR Manager",
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
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

        // Load notifications for this user
        loadNotifications(user.name, user.userRole);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Refresh notifications every 10 seconds
    const interval = setInterval(() => {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        loadNotifications(user.name, user.userRole);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const loadNotifications = (userName: string, userRole: string) => {
    const userNotifications: Notification[] = JSON.parse(
      localStorage.getItem(`notifications_${userName}`) || "[]"
    );

    // Filter unread notifications
    const unreadCount = userNotifications.filter((n) => !n.read).length;
    setNotificationCount(unreadCount);
    setNotifications(userNotifications);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userData");

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

  const markAsRead = (notificationId: string) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    const userNotifications: Notification[] = JSON.parse(
      localStorage.getItem(`notifications_${user.name}`) || "[]"
    );

    const updated = userNotifications.map((n) =>
      n.id === notificationId ? { ...n, read: true } : n
    );

    localStorage.setItem(`notifications_${user.name}`, JSON.stringify(updated));
    loadNotifications(user.name, user.userRole);
  };

  const deleteNotification = (notificationId: string) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    const userNotifications: Notification[] = JSON.parse(
      localStorage.getItem(`notifications_${user.name}`) || "[]"
    );

    const notificationToDelete = userNotifications.find(
      (n) => n.id === notificationId
    );

    // If it's a company announcement, delete it from announcements too
    if (
      notificationToDelete &&
      (notificationToDelete.type === "company_leave" ||
        notificationToDelete.type === "company_announcement")
    ) {
      const announcements = JSON.parse(
        localStorage.getItem("companyAnnouncements") || "[]"
      );

      // Find and remove matching announcement
      const updatedAnnouncements = announcements.filter((a: any) => {
        const notifDate = new Date(notificationToDelete.date).toDateString();
        const announceDate = new Date(a.date).toDateString();
        return notifDate !== announceDate;
      });

      localStorage.setItem(
        "companyAnnouncements",
        JSON.stringify(updatedAnnouncements)
      );
    }

    // Delete the notification
    const updated = userNotifications.filter((n) => n.id !== notificationId);
    localStorage.setItem(`notifications_${user.name}`, JSON.stringify(updated));
    loadNotifications(user.name, user.userRole);
    message.success("Notification deleted");
  };

  const markAllAsRead = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    const userNotifications: Notification[] = JSON.parse(
      localStorage.getItem(`notifications_${user.name}`) || "[]"
    );

    const updated = userNotifications.map((n) => ({ ...n, read: true }));
    localStorage.setItem(`notifications_${user.name}`, JSON.stringify(updated));
    loadNotifications(user.name, user.userRole);
    message.success("All notifications marked as read");
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
          <Badge count={notificationCount} offset={[-5, 5]}>
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
            <Avatar
              src={profileImage}
              icon={!profileImage && <UserOutlined />}
              style={{
                backgroundColor: profileImage ? "transparent" : "#bfbfbf",
                cursor: "pointer",
              }}
              size={isMobile ? 36 : 40}
            />
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
            {notificationCount > 0 && (
              <Button type="link" onClick={markAllAsRead} size="small">
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
              onClick={() => !item.read && markAsRead(item.id)}
              actions={[
                <Button
                  type="text"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(item.id);
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
                      {new Date(item.date).toLocaleString()}
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
