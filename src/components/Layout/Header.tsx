import React, { useState, useEffect } from "react";
import { Layout, Avatar, Badge, Dropdown, message } from "antd";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
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

const Header: React.FC<HeaderProps> = ({ onMenuClick, isMobile = false }) => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string>("");
  const [userData, setUserData] = useState<UserData>({
    name: "User",
    email: "",
    role: "Admin",
    specificRole: "HR Manager",
  });

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
        // Add this line to get profile image
        setProfileImage(user.profileImage || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userData");

    // Show responsive success message
    message.success({
      content: "Logged out successfully! Redirecting to login...",
      duration: 2,
      style: {
        marginTop: "20vh",
        fontSize: "16px",
      },
    });

    // Redirect to login page
    setTimeout(() => {
      router.push("/login");
    }, 1000);
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
        {/* Left side - Menu button (mobile), Logo and FlexTrack */}
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

        {/* Right side - Notification, User info, Avatar */}
        <div
          style={{
            display: "flex",
            gap: isMobile ? "12px" : "20px",
            alignItems: "center",
          }}
        >
          {/* Notification Bell */}
          <Badge count={3} offset={[-5, 5]}>
            <BellOutlined
              style={{
                fontSize: isMobile ? "18px" : "20px",
                color: "#595959",
                cursor: "pointer",
              }}
            />
          </Badge>

          {/* User Role and Name */}
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

          {/* User Avatar with Dropdown */}
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Avatar
              src={profileImage} // Add this prop
              icon={!profileImage && <UserOutlined />} // Show icon only if no image
              style={{
                backgroundColor: profileImage ? "transparent" : "#bfbfbf",
                cursor: "pointer",
              }}
              size={isMobile ? 36 : 40}
            />
          </Dropdown>
        </div>

        {/* Responsive Styles */}
        <style jsx>{`
          @media (max-width: 768px) {
            .header-title {
              display: none !important;
            }
            .user-info {
              display: none !important;
            }
          }

          @media (max-width: 480px) {
            :global(.ant-layout-header) {
              padding: 0 12px !important;
            }
          }

          /* Responsive message styles */
          :global(.ant-message) {
            z-index: 9999 !important;
          }

          :global(.ant-message-notice-content) {
            padding: 12px 20px !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          }

          @media (max-width: 768px) {
            :global(.ant-message-notice-content) {
              font-size: 14px !important;
              padding: 10px 16px !important;
              max-width: 90vw !important;
            }
          }

          @media (max-width: 480px) {
            :global(.ant-message-notice-content) {
              font-size: 13px !important;
              padding: 8px 12px !important;
              max-width: 85vw !important;
            }
          }
        `}</style>
      </Layout.Header>
    </div>
  );
};

export default Header;
