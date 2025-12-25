"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();              
    router.push("/login"); 
  };

  return (
    <Button danger onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
