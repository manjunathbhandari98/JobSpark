import { motion } from "framer-motion";

const ConfirmationPopup = ({
  question= '',
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm = () =>{},
  onCancel = () =>{},
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md">
      {/* Popup Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center"
      >
        {/* Question Text */}
        <h2 className="text-lg font-semibold text-gray-800">
          {question}
        </h2>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-5">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400"
            onClick={onCancel}
          >
            {cancelText}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationPopup;
