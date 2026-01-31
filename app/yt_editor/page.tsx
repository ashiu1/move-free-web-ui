import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoUploader from '../components/VideoUploader/VideoUploader';

export default function YtEditorPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <VideoUploader />
      <Footer />
    </div>
  );
}
