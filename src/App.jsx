import { useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Loading from "./components/Loading";
import History from "./components/History";
import BeforeAfter from "./components/BeforeAfter";
import Specialties from "./components/Specialties";
// 1. Import do novo componente
import InteractiveTriage from "./components/InteractiveTriage"; 
import Team from "./components/Team";
import Clinic from "./components/Clinic";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Appointment from "./components/Appointment";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loading finish={() => setLoading(false)} />}

      <Header />
      <Hero />
      <History />
      <BeforeAfter />
      <Specialties />

      {/* 2. Triagem por IA inserida aqui com um fundo de destaque */}
      <section className="py-16 bg-slate-50">
        <InteractiveTriage />
      </section>

      <Team />
      <Clinic />
      <Testimonials />
      <Appointment />
      <FinalCTA />
      <Footer />
      <CookieBanner />
    </>
  );
}

export default App;