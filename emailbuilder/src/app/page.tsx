'use client';
import React, { useEffect, useState } from 'react';
import {  Save, Download, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import type { EmailTemplate } from '@/type/emailType';
import { EmailLayout } from '@/lib/storage';
import { HexColorPicker } from 'react-colorful';
import axios from 'axios';

export default function EmailEditor() {
  const [template, setTemplate] = useState<EmailTemplate>({
    title: '',
    content: '',
    imageUrl: '',
    footer: ''
  });
  const  [emailLayout , setEmailLayout]= useState([])
  const [titleColor, setTitleColor] = useState("#000000");
  const [showColorModal , setShowColorModal] = useState(false);
   
const GetEmailLayout=async()=>{
const res= await axios.get("/api/getEmailLayout")
console.log(res.data.data , "res.data.data")
setEmailLayout(res.data.data)
}

useEffect(() => {
  GetEmailLayout()
}, []);

  const handleImageUpload = async (e:any) => {
    const file = e.target.files?.[0];
    console.log(file , "file")
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setTemplate(prev => ({ ...prev, imageUrl: data.imageUrl }));
      // setUploadedImage(data.imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      // setLoading(false);
    }
  };

  const  handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
   

    try {
      const response = await axios.post("/api/uploadEmailConfig", { ...template ,  id: crypto.randomUUID(), created_at: new Date().toISOString() });
      toast.success('Template saved successfully');
    } catch (err: any) {
      console.log(err.response?.data?.message || "Something went wrong");
      toast.error('Error saving template');
    }
  };
  const handleSubmit = async () => {
    try {
      // Save to localStorage
      const templates = JSON.parse(localStorage.getItem('emailTemplates') || '[]');
      templates.push({ ...template, id: crypto.randomUUID(), created_at: new Date().toISOString() });
      localStorage.setItem('emailTemplates', JSON.stringify(templates));
      toast.success('Template saved successfully');
    } catch (error) {
      toast.error('Error saving template');
    }
  };

  const handleDownload = async () => {
    try {
      let html = EmailLayout(`${titleColor}`);
      console.log(html , "html" , "template.title" , template.title);
     
      // Replace template variables
      html = html
        .replace('{{title}}', template.title)
        .replace('{{content}}', template.content)
        .replace('{{imageUrl}}', template.imageUrl)
        .replace('{{footer}}', template.footer);
        console.log(html , "html" , "template.title" , template.title);
     
      // Create blob and download
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${template.title || 'email-template'}.html`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Template downloaded successfully');
    } catch (error) {
      toast.error('Error downloading template');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Email Builder</h1>
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
              >
                <Save size={20} />
                Save
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm"
              >
                <Download size={20} />
                Download
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="border-2 border-gray-200 rounded-xl p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Preview</h2>
              <div
                className="prose max-w-none p-4 border border-gray-100 rounded-lg bg-gray-50"
                dangerouslySetInnerHTML={{
                  __html: EmailLayout(`${titleColor}`)
                    .replace('{{title}}', template.title)
                    .replace('{{content}}', template.content)
                    .replace('{{imageUrl}}', template.imageUrl)
                    .replace('{{footer}}', template.footer)
                }}
              />
            </div>

            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
               <div className='flex items-center justify-between'>
               <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
               <button className='text-blue-700' onClick={()=>{setShowColorModal(!showColorModal)}}>Edit color</button>
               </div>
              <div className='flex items-center gap-4'>
              {
                  showColorModal &&  <HexColorPicker  color={titleColor} onChange={setTitleColor} />
                }
              </div>
                <input
                  type="text"
                  value={template.title}
                  onChange={(e) => setTemplate(prev => ({ ...prev, title: e.target.value }))}
                  className="block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                 style={{color:titleColor}}
                  placeholder="Enter email title..."
                />
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                <textarea
                  value={template.content}
                  onChange={(e) => setTemplate(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                  placeholder="Enter email content..."
                />
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Footer</label>
                <input
                  type="text"
                  value={template.footer}
                  onChange={(e) => setTemplate(prev => ({ ...prev, footer: e.target.value }))}
                  className="block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                  placeholder="Enter email footer..."
                />
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-4">Image</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-200">
                    <ImageIcon size={20} />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {template.imageUrl && (
                    <img
                      src={template.imageUrl}
                      alt="Preview"
                      className="h-24 w-24 object-cover rounded-lg border-2 border-gray-200"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {
          emailLayout?.map((e:any,index)=>{
            console.log(e.title , "eeeeeeeeee")
            return (
              <div key={index}
              className="prose max-w-none p-4 border border-gray-100 rounded-lg bg-gray-50"
              dangerouslySetInnerHTML={{
                __html: EmailLayout(`${titleColor}`)
                  .replace('{{title}}', e.title)
                  .replace('{{content}}', e.content)
                  .replace('{{imageUrl}}', e.imageUrl)
                  .replace('{{footer}}', e.footer)
              }}
            />
            )
          })
        }
      </div>
    </div>
  );
}