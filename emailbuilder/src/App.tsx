import React from 'react';
import { Toaster } from 'react-hot-toast';
import EmailEditor from './components/EmailEditor';

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <EmailEditor />
    </>
  );
}