// app/profile/page.js
"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditModal from "./EditModal";

interface RoleSwitchProps {
  forms: Array<{
    label: string;
    text: string;
  }>;
  title: string;

}


export default function SettingsProfileCard({ title, forms }: RoleSwitchProps) {

 
  return (
    <div className="w-[30rem]">
      <div className="bg-white shadow-md rounded-lg p-8 w-full">
        <div className="flex justify-between pb-4 border-b ">
          <h1 className="text-base">{title}</h1>
          <EditModal title={title} forms={forms} />
        </div>

        <div className="space-y-1 mt-3">
          {forms.map((form, index) => (
            <div className="flex items-center" key={index}>
              <p className="block text-sm text-gray-700 font-medium">
                {form.label}:
              </p>
              <p className="font-bold border-gray-300 rounded-md px-4 py-2">
                {form.text}
              </p>
            </div>
          ))}
        </div>  
      </div>
    </div>
  );
}
