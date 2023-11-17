"use client"

import { XIcon } from "lucide-react";
import React from "react";

const Modal = ({ onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 top-0 flex items-center px-4 md:px-0 justify-center bg-slate-900/80 z-50  `}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-2 p-1 md:top-6 md:right-10 bg-white rounded-md md:p-2"
      >
        <XIcon className="w-4 h-4 md:w-6 md:h-6 text-gray-900" />
      </button>
      {children}
    </div>
  );
};

export default Modal;
