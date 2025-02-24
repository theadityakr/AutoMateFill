import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> & {
  Header: React.FC<{ children: ReactNode }>;
  Body: React.FC<{ children: ReactNode }>;
  Footer: React.FC<{ children: ReactNode }>;
} = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay flex-row">
      <div className="popup flex-column">
          {children}
      <div className="" onClick={onClose}></div>
      </div>
    </div>
  );
};

Modal.Header = ({ children }) => (
  <div className="flex-column modal_header">
    {children}
  </div>
);

Modal.Body = ({ children }) => (
  <div className="flex-column modal_body">
    {children}
  </div>
);

Modal.Footer = ({ children }) => (
  <div className="flex-row modal_footer">
    {children}
  </div>
);

export default Modal;
