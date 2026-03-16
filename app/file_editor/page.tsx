import { Suspense } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FileUploader from '../components/FileUploader/FileUploader';

export default function FileEditorPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Suspense>
        <FileUploader />
      </Suspense>
      <Footer />
    </div>
  );
}
