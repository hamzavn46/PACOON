import React from 'react';

interface CodebaseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CodebaseModal: React.FC<CodebaseModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded">
                <h2>Codebase Modal</h2>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default CodebaseModal;