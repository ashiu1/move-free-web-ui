import Header from './components/Header';
import UploaderBox from './components/UploaderBox';
import HowItWorks from './components/HowItWorks';
import EffortlessConversion from './components/EffortlessConversion';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <UploaderBox />
      <HowItWorks />
      <EffortlessConversion />
      <Footer />
    </div>
  );
}
