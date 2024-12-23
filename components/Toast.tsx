"use client";

import { hideToast } from "@/store/auth/toastSlice";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Toast() {
    const [showToast, setShowToast] = useState(false);
    const { status, message } = useSelector((state: any) => state.toast);
    const dispatch = useDispatch();

    useEffect(() => {
        if (message && message !== "" && message !== null) {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                dispatch(hideToast());
            }, 5000);
        } else setShowToast(false);
        return () => clearTimeout(5000);
    }, [message, status, dispatch]);

    return (
        <div>
            {showToast && status ? (
                <div
                    id="toast-top-right"
                    className={`z-[1000] border border-gray-700 fixed flex items-center min-w-[250px] max-w-xs py-3 px-4 space-x-4 text-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-sm shadow top-5 right-5 ${status === "success" ? "bg-primaryBlue text-white" : "bg-red-500 text-white"
                        }`}
                    role="alert"
                >
                    <div className="flex w-full justify-between gap-3">
                        <p className="font-normal text-white">{message}</p>
                        <div
                            className="link_el cursor-pointer"
                            onClick={() => setShowToast(false)}
                        >
                            x
                            {/* <FontAwesomeIcon icon={faTimes} size="sm" /> */}
                        </div>
                    </div>
                </div>
            ) : <div></div>
            }
        </div>
    );
}
