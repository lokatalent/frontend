"use client";
import RoleSwitch from "@/components/admin/RoleSwitch";
import React, { useState } from "react";
import Pricing_Commission from "../../../components/admin/settings/Pricing_Commission";
import ServiceCategory from "../../../components/admin/settings/Service_Category";

const Settings = () => {
    const [role, setRole] = useState("service_category");
  const SettingsRoles = [
    { value: "service_category", label: "Service Category" },
    { value: "pricing_commission", label: "Pricing & Commission" },
  ];

  const handleRoleChange = (role: string) => {
    console.log("Selected role:", role);
    setRole(role);
  };
  return (
    <div>
      <RoleSwitch
        roles={SettingsRoles}
        initialRole={role}
        onRoleChange={handleRoleChange}
      />

      <div className="tab-content mt-4">
        {role === "service_category" ? <ServiceCategory /> : null}
        {role === "pricing_commission" ? <Pricing_Commission /> : null}
      </div>
    </div>
  );
};

export default Settings;
