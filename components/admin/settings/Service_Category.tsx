import React, { useState } from "react";
import { MoreVertical, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeCategory, RootStateCategoryState } from "@/store/admin/settings/categorySlice";
import AddServiceDialog from "./AddService";

interface ServiceCategory {
  id: string;
  name: string;
}

const Category_Initial_State = [ 
    { id: "1", name: "Indoor Cleaning Service" },
    { id: "2", name: "Driving" },
    { id: "3", name: "Solar Panel Installation" },
    { id: "4", name: "Electrical Services" },
  
]

export default function ServiceCategory() {
     const dispatch = useDispatch();
     const { categories, isLoading, error } = useSelector(
       (state: RootStateCategoryState) => state.categories
     );
//   const [categories, setCategories] = useState<ServiceCategory[]>(Category_Initial_State);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleAddCategory = () => {
    const newCategory = {
      id: String(categories.length + 1),
      name: "New Category",
    };
    // setCategories([...categories, newCategory]);
  };
  
  const handleRemoveCategory = (id: string) => {
    // setCategories(categories.filter((category) => category.id !== id));
    dispatch(removeCategory(id))
    setActiveMenu(null);
  };

  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <div className="max-w- mx-auto p-8 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-blue-900">
          Service Category Management
        </h1>
        {/* <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        > */}
         <AddServiceDialog />
        {/* </button> */}
      </div>

      <div className="space-y-2">
        {categories.map((category: any) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100"
          >
            <span className="text-gray-700">{category.name}</span>
            <div className="relative">
              <button
                onClick={() => toggleMenu(category.id)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <MoreVertical size={20} className="text-gray-600" />
              </button>

              {activeMenu === category.id && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100">
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveCategory(category.id)}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Remove Category
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update
        </button>
      </div>
    </div>
  );
};


