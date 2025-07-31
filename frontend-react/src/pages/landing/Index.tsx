import { CustomerCTASection, ProviderCTASection } from "./components/cta-section";
import { FeaturesSection } from "./components/features-section";
import { HeroSection } from "./components/hero-section";
import { HowItWorksSection } from "./components/how-it-work-section";
import { ServicesSection } from "./components/services-section";

export default function HomePage() {
    return (
        <div>
            <HeroSection />
            <ServicesSection />
            <HowItWorksSection />
            <FeaturesSection />
            <CustomerCTASection />
            <ProviderCTASection />
        </div>
    )
}
