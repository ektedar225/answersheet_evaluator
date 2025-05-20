import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface AnswerSheetUploadProps {
  onFileUpload: (file: File) => void;
  isUploading: boolean;
}

const AnswerSheetUpload: React.FC<AnswerSheetUploadProps> = ({ onFileUpload, isUploading }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Upload Answer Sheet</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-500'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-lg text-gray-600">Drop your answer sheet here...</p>
          ) : (
            <div>
              <p className="text-lg text-gray-600 mb-2">
                Drag & drop your answer sheet here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: JPG, PNG, PDF
              </p>
            </div>
          )}
        </div>

        {acceptedFiles.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Selected File:</h4>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <File className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{acceptedFiles[0].name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  acceptedFiles.splice(0, acceptedFiles.length);
                }}
                className="text-gray-400 hover:text-error-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {acceptedFiles.length > 0 && (
          <div className="mt-4">
            <Button
              onClick={() => onFileUpload(acceptedFiles[0])}
              isLoading={isUploading}
              className="w-full"
            >
              {isUploading ? 'Uploading...' : 'Submit Answer Sheet'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnswerSheetUpload;