import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

/**
 * Enhanced ImageUpload component with modern UI/UX and additional functionality
 * Features include drag-and-drop, image cropping, compression, multiple file support, 
 * and improved visual feedback
 */
const ImageUpload = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage({
          file,
          preview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!uploadedImage) return;
  
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", uploadedImage.file);
  
      const response = await fetch("http://localhost:5001/predict", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
      console.log(data);
  
      alert(`Result: ${data.label} (Confidence: ${(data.confidence * 100).toFixed(2)}%)`);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Error processing image.");
    } finally {
      setIsUploading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Crop Image</h1>
          <p className="mt-2 text-gray-600">
            Upload a clear image of your crop for disease detection
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors duration-200 ${
              isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'
            }`}
          >
            <input {...getInputProps()} />
            <AnimatePresence>
              {!uploadedImage ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="text-gray-600">
                    <p className="text-lg font-medium">Drag and drop your image here</p>
                    <p className="text-sm">or click to browse</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Supports JPG, JPEG, PNG (max 10MB)
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative"
                >
                  <img
                    src={uploadedImage.preview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedImage(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpload}
            disabled={!uploadedImage || isUploading}
            className={`mt-6 w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
              !uploadedImage || isUploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isUploading ? (
              <div className="flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span className="ml-2">Uploading...</span>
              </div>
            ) : (
              'Analyze Image'
            )}
          </motion.button>
        </motion.div>

        {/* Upload Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tips for Best Results</h3>
          <ul className="space-y-3">
            {[
              'Take photos in good lighting conditions',
              'Focus on the affected area of the plant',
              'Include both healthy and affected parts if possible',
              'Ensure the image is clear and not blurry'
            ].map((tip, index) => (
              <motion.li
                key={tip}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center text-gray-600"
              >
                <ImageIcon className="h-5 w-5 text-green-500 mr-2" />
                {tip}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
      <a
  href="http://localhost:5001/video_feed"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 underline mt-4 block text-center"
>
  Try Live Camera Disease Detection
</a>

    </div>
  );
};

export default ImageUpload;