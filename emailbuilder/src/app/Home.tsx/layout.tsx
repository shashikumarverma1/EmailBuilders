'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setUploadedImage(data.imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Image Upload</h1>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            <button
              onClick={handleUpload}
              disabled={!selectedFile || loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          {uploadedImage && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Uploaded Image:</h2>
              <div className="relative w-full h-64">
                <Image
                  src={uploadedImage}
                  alt="Uploaded image"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}