import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PainPoints } from "@/components/PainPoints";
import { Services } from "@/components/Services";
import { DiagnosticForm } from "@/components/DiagnosticForm";
import { Testimonials } from "@/components/Testimonials";
import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <PainPoints />
      <Services />
      <DiagnosticForm />
      <Testimonials />
      <About />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;