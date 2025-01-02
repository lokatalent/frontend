"use client";
import React, { useState } from "react";

const Notifications = () => {
  const [settings, setSettings] = useState([
    {
      title: "Promotions and Offers",
      text: "Alerts about discounts, referral bonuses, or special campaigns.",
      enabled: true,
    },
    {
      title: "Survey and Feedback Requests",
      text: "Invitations to share feedback or participate in surveys for improving services.",
      enabled: false,
    },
    {
      title: "General Updates",
      text: "Updates on new services or platform features.",
      enabled: true,
    },
    {
      title: "System Updates and Configuration",
      text: "Get notification when there is a system update or configuration on the platform",
      enabled: true,
    },
  ]);

  const toggleSetting = (index: any) => {
    const updatedSettings = [...settings];
    updatedSettings[index].enabled = !updatedSettings[index].enabled;
    setSettings(updatedSettings);
  };
  const [notificationSettings, setNotificationSettings] = useState([
    { type: "Email", enabled: true },
    { type: "SMS", enabled: false },
    { type: "In-App", enabled: false },
  ]);

  const toggleNotificationSetting = (index) => {
    const updatedSettings = [...notificationSettings];
    updatedSettings[index].enabled = !updatedSettings[index].enabled;
    setNotificationSettings(updatedSettings);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-5">
        <p>How will you like to receive notifications?</p>
        <div className="flex gap-2">
          {notificationSettings.map((setting, index) => (
            <div
              key={index}
              className="space-x-3 flex items-center ustify-between"
            >
              <div className="relative inline-block  align-middle select-none">
                <input
                  type="radio"
                  checked={setting.enabled}
                  onClick={() => toggleNotificationSetting(index)}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <span className="text-gray-900 text-sm">{setting.type}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card space-y-6">
        {settings.map((setting, index) => (
          <div key={index} className="flex items-start sm:items-center justify-between">
            <div className="w-3/4 sm:w-full">
              <span className="text-gray-900">{setting.title}</span>
              <p className="text-sm text-gray-500 mt-2">{setting.text}</p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <div
                className={`w-[2rem] sm:w-12 h-[1.1rem] sm:h-6 flex items-center rounded-full p-1 cursor-pointer ${
                  setting.enabled ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={() => toggleSetting(index)}
              >
                <div
                  className={`bg-white w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-md transform ${
                    setting.enabled ? "translate-x-[0.9rem] sm:translate-x-6" : "translate-x-0"
                  } transition-transform duration-200`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
