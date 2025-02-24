import React, { ChangeEvent, useRef } from 'react';
import { Button } from "@shivangi_2408/effective-ui";

interface FileInputProps {
  label: string;
  accept: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ label, accept, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex-column file-input">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex-row file-input-choose">
        <Button onClick={handleClick} variant="bordered" size="sm">
          Choose File
        </Button>
        <span className="text-sm text-gray-500">
          {fileInputRef.current?.files?.[0]?.name || "No file chosen"}
        </span>
      </div>
      <input 
        type="file"
        ref={fileInputRef}
        accept={accept}
        onChange={onChange}
        className="hide"
      />
    </div>
  );
};

export default FileInput;
