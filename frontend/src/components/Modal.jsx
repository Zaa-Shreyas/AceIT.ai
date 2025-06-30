import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative flex flex-col bg-[#faf0ca] shadow-lg rounded-lg overflow-hidden w-[90vw] md:w-[32vw]"
          >
            {!hideHeader && (
              <div className="flex items-center justify-between p-4 border-b border-[#f4d35e]">
                <h3 className="md:text-lg font-medium text-[#0d3b66]">{title}</h3>
              </div>
            )}

            <button
              type="button"
              className="text-[#0d3b66]/70 hover:bg-[#f4d35e]/40 hover:text-[#0d3b66] rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer"
              onClick={onClose}
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                className="w-4 h-4"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;