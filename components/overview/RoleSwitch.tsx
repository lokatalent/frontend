"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

// Define more flexible props
interface RoleSwitchProps {
  roles: Array<{
    value: string;
    label: string;
  }>;
  initialRole?: string;
  // Callback function when role changes
  onRoleChange: any;
  // Optional custom styling
  className?: string;
  type?: string;
  talent?: boolean;
}

type Role = string;

const RoleSwitch: React.FC<RoleSwitchProps> = ({
  roles,
  initialRole = "",
  onRoleChange,
  className,
  type,
  talent,
}) => {
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Automatically set selected role based on pathname if it matches
    const matchedRole = roles.find((role) => pathname.includes(role.value));
    if (matchedRole) {
      setSelectedRole(matchedRole.value);
    }
  }, [pathname, roles]);

  // Default active and disabled styles
  const defaultActiveClass =
    "rounded-md bg-primaryBlue text-white hover:bg-primaryBlue hover:text-white";
  const defaultDisabledClass =
    "bg-transparent text-black hover:text-primaryBlue";

  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
    onRoleChange(role);
    if (type === "link") {
      router.push(
        talent
          ? `/talent/dashboard/settings/${role}`
          : `/dashboard/settings/${role}` 
      );
    }
  };

  return (
    <div
      className={`flex w-full sm:w-max overflow-x-auto bg-[#E5E7EB4A] px-1 md:px-3 rounded-xl py-1 md:py-2 ${className}`}
    >
      <div className="flex space-x-2 sm:space-x-4 md:justify-center">
        {roles.map((role) => (
          <div key={role.value} className="flex-shrink-0">
            <Button
              onClick={() => handleRoleChange(role.value)}
              variant="ghost"
              className={`${
                selectedRole === role.value || pathname.includes(role.value)
                  ? defaultActiveClass
                  : defaultDisabledClass
              } px-3 py-2`}
            >
              {role.label}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSwitch;
