import React from "react";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-gray-700 p-6 px-8 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-white">{message}</p>
        <div className="mt-4 flex justify-center">
          <button
            className="px-4 py-2 text-white font-medium bg-red-700 rounded-lg mr-2 shadow-md"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 font-medium text-white bg-green-700 rounded-lg shadow-md"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
