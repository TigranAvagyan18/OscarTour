import Hero from '@/components/Hero';
import TourCategories from '@/components/TourCategories';
import AboutSection from '@/components/AboutSection';
import DestinationGrid from '@/components/DestinationGrid';
import TourPackages from '@/components/TourPackages';
import Testimonials from '@/components/Testimonials';
import BlogPreview from '@/components/BlogPreview';
import ContactSection from '@/components/ContactSection';

export default function HomePage() {
  return (
		<>
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