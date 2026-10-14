import Contact from "@/components/Contact";
import Dock from "@/components/Dock";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Reveal from "@/components/Reveal";
import Skills from "@/components/Skills";
import { site } from "@/data/site";

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.roleLong,
  description: site.description,
  url: site.url,
  email: `mailto:${site.contact.email}`,
  telephone: site.contact.phone,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: site.country },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Habib University" },
  knowsAbout: [...site.ticker, ...site.tags],
  sameAs: [site.contact.github.href, site.contact.linkedin.href, site.contact.x.href],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }} />
      <main id="main">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Dock />
      <Reveal />
    </>
  );
}
