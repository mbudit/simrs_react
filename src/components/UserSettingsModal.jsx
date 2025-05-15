import React from "react";

const UserSettingsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-xl w-[90%] max-w-md shadow-xl relative">
                <button
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4">Pengaturan Pengguna</h2>
                <p className="text-gray-700">Here you can manage your account settings.</p>
            </div>
        </div>
    );
};

export default UserSettingsModal;
