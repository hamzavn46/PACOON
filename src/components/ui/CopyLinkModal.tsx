import React from 'react';

interface CopyLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CopyLinkModal: React.FC<CopyLinkModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded">
                <h2>Copy Link Modal</h2>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default CopyLinkModal;