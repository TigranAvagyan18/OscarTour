import Hero from '@/components/Hero';
import TourCategories from '@/components/TourCategories';
import AboutSection from '@/components/AboutSection';
import DestinationGrid from '@/components/DestinationGrid';
import TourPackages from '@/components/TourPackages';
import Testimonials from '@/components/Testimonials';
import BlogPreview from '@/components/BlogPreview';
import ContactSection from '@/components/ContactSection';
import SEOHead from '@/components/Layout/SEOHead';

export default function HomePage() {
  return (
		<>
      <SEOHead page="home" />
			<Hero />
      <TourCategories />
      <AboutSection />
      <DestinationGrid />
      <TourPackages />
      <Testimonials />
      <BlogPreview />
      <ContactSection />
		</>
	)
}