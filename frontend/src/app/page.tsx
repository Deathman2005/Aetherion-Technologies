import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import TechStack from "@/components/TechStack";
import Workflow from "@/components/Workflow";
import WhyChooseUs from "@/components/WhyChooseUs";
// import Testimonials from "@/components/Testimonials";
import Commitments from "@/components/Commitments";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Premium Floating Header Navigation */}
      <Header />

      {/* Structured Semantic Layout for corporate indexing */}
      <main className="flex-grow">
        {/* 1. Hero and Developer Console Console */}
        <Hero />

        {/* 2. Systems Capabilities Simulator Grid */}
        <Services />

        {/* 3. Authentic Philosophy and Stats narrative */}
        <About />

        {/* 4. Realistic Project blueprints and metrics */}
        <Portfolio />

        {/* 5. Technical Stack utility selector */}
        <TechStack />

        {/* 6. How We Work pipeline timeline */}
        <Workflow />

        {/* 7. Why Choose Us SLA benchmarks grid */}
        <WhyChooseUs />

        {/* 8. Elite Architectural Convergence & Commitments */}
        <Commitments />

        {/* 9. Secure Consultation API contact request form */}
        <Contact />
      </main>

      {/* 10. Minimalist Social & Newsletter Footer */}
      <Footer />
    </>
  );
}
