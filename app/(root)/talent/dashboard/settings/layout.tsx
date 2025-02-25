"use client";
import RoleSwitch from "@/components/overview/RoleSwitch";
import { usePathname } from "next/navigation";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const SettingsRoles = [
    { value: "profile", label: "Profile" },
    { value: "security", label: "Security" },
    // { value: "verification", label: "Verification" },
    { value: "notifications", label: "Notifications" },
    { value: "help", label: "Help & Support" },
    { value: "delete-account", label: "Delete Account" },
  ];
  const pathname = usePathname();

  const handleRoleChange = (role: string) => {
    console.log("Selected role:", role);
  };

  // Check if the pathname includes specific paths where RoleSwitch should be hidden
  const shouldHideRoleSwitch = pathname.includes(
    "/talent/dashboard/settings/profile/address"
  );

  return (
    <div className="px-4 sm:px-0 space-y-10">
      {!shouldHideRoleSwitch && (
        <div className="w-full space-y-6">
          <RoleSwitch
            type="link"
            roles={SettingsRoles}
            initialRole="profile"
            onRoleChange={handleRoleChange}
            talent={true}
          />
        </div>
      )}
      {children}
    </div>
  );
}
