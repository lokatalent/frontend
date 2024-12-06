"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

// Define more flexible props
interface RoleSwitchProps {
  // Array of role options to make the component more dynamic
  roles: Array<{
    value: string;
    label: string;
  }>;
  // Optional initial selected role
  initialRole?: string;
  // Callback function when role changes
  onRoleChange: (role: string) => void;
  // Optional custom styling
  className?: string;
  type?: string;
}

type Role = string;

const RoleSwitch: React.FC<RoleSwitchProps> = ({
  roles,
  initialRole = "",
  onRoleChange,
  className,
  type
}) => {
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const router = useRouter();

  // Default active and disabled styles, can be overridden
  const defaultActiveClass =
    "rounded-md bg-primaryBlue text-white hover:bg-primaryBlue hover:text-white";
  const defaultDisabledClass =
    "bg-transparent text-black hover:text-primaryBlue";

  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
    onRoleChange(role);
    if (type === 'link') {
      router.push(`/dashboard/settings/${role}`);
    }
  };

  return (
    <div
      className={`flex w-max bg-[#E5E7EB4A] px-1 md:px-3 rounded-xl py-1 md:py-2 ${className}`}
    >
      {roles.map((role) => (
        <div key={role.value} className="mx-1">
          <Button
            onClick={() => handleRoleChange(role.value)}
            variant="ghost"
            className={`
              ${
                selectedRole === role.value
                  ? defaultActiveClass
                  : defaultDisabledClass
              } 
              px-3 py-2
            `}
          >
            {role.label}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default RoleSwitch;