import React, { useState } from 'react'

const AddProjectModal = ({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (name: string) => void }) => {
    const [projectName, setProjectName] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md p-6 bg-[#0a0a0a] rounded-lg shadow-lg">
                {/* Modal Header */}
                <h2 className="mb-4 text-xl font-semibold text-white">Create a new project</h2>

                {/* Input Field */}
                <div className="mb-6">
                    <label htmlFor="project-name" className="block mb-2 text-sm font-medium text-gray-300">
                        Name<span className="text-red-500">*</span>
                    </label>
                    <input
                        id="project-name"
                        type="text"
                        placeholder="My Project"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full px-4 py-2 text-gray-300 bg-[#0F0F0F] border border-gray-700 rounded-lg"
                    />
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-300 bg-[#1F1F22] rounded-lg hover:bg-[#2F2F32]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onSubmit(projectName);
                            onClose();
                        }}
                        className="px-4 py-2 text-sm font-medium text-black bg-white rounded-lg "
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProjectModal
