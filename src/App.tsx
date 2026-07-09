import OceanBackdrop from "./components/OceanBackdrop";
import SwimmerCursor from "./components/SwimmerCursor";
import Nav from "./components/Nav";
import DepthGauge from "./components/DepthGauge";
import MobileDepthBar from "./components/MobileDepthBar";
import Hero from "./components/Hero";
import Reality from "./components/Reality";
import Method from "./components/Method";
import Programs from "./components/Programs";
import Involved from "./components/Involved";
import Story from "./components/Story";
import Videos from "./components/Videos";
import Vision from "./components/Vision";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <OceanBackdrop />
      <SwimmerCursor />
      <MobileDepthBar />
      <DepthGauge />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Reality />
        <Method />
        <Programs />
        <Involved />
        <Story />
        <Videos />
        <Vision />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
