// METHOD 2
"use client";
import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FormFieldError } from "@/components/ui/form/FormFieldError";

type FileConfig = {
  allowedTypes: string[];
  maxFileSizeMB: number;
  uploadLabel: string;
  dragDropLabel: string;
  errorMessage: string;
};

type FileHandlers = {
  onFileSelect?: (file: File | null, url: string | null) => void;
  onFileUpload?: (file: File, url: string) => void;
  onFileRemove?: (file: File | null, url: string | null) => void;
  onError?: (error: string) => void;
};

type FileUploadProps = Partial<FileConfig> &
  Partial<FileHandlers> & {
    className?: string;
    uploadIcon?: string;
  };

const defaultConfig: FileConfig = {
  allowedTypes: ["image/jpeg", "image/png", "image/gif", "application/pdf"],
  maxFileSizeMB: 5,
  uploadLabel: "Click to upload",
  dragDropLabel: "or drag and drop",
  errorMessage: "Select a file to continue",
};

const FileUpload: React.FC<FileUploadProps> = ({
  // Config props with defaults
  allowedTypes = defaultConfig.allowedTypes,
  maxFileSizeMB = defaultConfig.maxFileSizeMB,
  uploadLabel = defaultConfig.uploadLabel,
  dragDropLabel = defaultConfig.dragDropLabel,
  errorMessage = defaultConfig.errorMessage,
  // Handler props
  onFileSelect,
  onFileUpload,
  onFileRemove,
  onError,
  // Style props
  className,
  uploadIcon,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>(errorMessage);

  const handleError = useCallback(
    (errorMsg: string) => {
      setError(errorMsg);
      onError?.(errorMsg);
    },
    [onError]
  );

  const validateFile = useCallback(
    (file: File) => {
      if (!allowedTypes.includes(file.type)) {
        handleError(
          `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`
        );
        return false;
      }
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        handleError(`File size too large. Max size: ${maxFileSizeMB}MB`);
        return false;
      }
      return true;
    },
    [allowedTypes, maxFileSizeMB, handleError]
  );

  const handleFileUpload = useCallback(
    (selectedFile: File) => {
      if (validateFile(selectedFile)) {
        const url = URL.createObjectURL(selectedFile);

        setFileUrl(url);
        setFile(selectedFile);
        setError("");

        onFileSelect?.(selectedFile, url);
        onFileUpload?.(selectedFile, url);
      }
    },
    [validateFile, onFileSelect, onFileUpload]
  );

  const handleRemove = useCallback(() => {
    if (file && fileUrl) {
      onFileRemove?.(file, fileUrl);
      URL.revokeObjectURL(fileUrl);

      setFileUrl(null);
      setFile(null);
      setError(errorMessage);

      onFileSelect?.(null, null);
    }
  }, [file, fileUrl, errorMessage, onFileRemove, onFileSelect]);

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFileUpload(droppedFile);
      }
    },
    [handleFileUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        handleFileUpload(selectedFile);
      }
    },
    [handleFileUpload]
  );

  return (
    <div className={cn("w-full mx-auto", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg text-center",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
          "transition-all duration-200"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileSelect}
          accept={allowedTypes.join(",")}
        />

        {!file ? (
          <div className="bg-white text-[#3377FF] rounded px-4 py-4 flex items-center flex-col">
            {uploadIcon && (
              <Image src={uploadIcon} alt="File Upload" className="w-10 h-10" />
            )}
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              {uploadLabel}
              <span className="text-gray-500">{dragDropLabel}</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm font-medium">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={handleRemove}
              >
                Remove
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)}MB
            </p>
          </div>
        )}
      </div>

      {error && <FormFieldError error={{ message: error }} />}
    </div>
  );
};

export default FileUpload;
