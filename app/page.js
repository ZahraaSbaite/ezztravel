import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Specialties from "@/components/Specialties";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import PlaneIntro from "@/components/PlaneIntro";

export default function Home() {
  return (
    <main>
      <PlaneIntro />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Specialties />
      <Reviews />
      <Footer />
    </main>
  );
}
