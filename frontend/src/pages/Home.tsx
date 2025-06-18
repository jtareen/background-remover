import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { Hero } from "@/components/Hero"
import ImageDivider from "@/components/ImageDivider"
import { ImageSection } from "@/components/ImageSection"

function HomePage() {
    return (
        <div className="font-karla text-base min-w-[350px] px-0">
            <Header />
            <div className="px-3 md:px-5 lg:px-10">
                <Hero
                    title="Remove Background Instantly"
                    subtitle="Just upload your image and let BGone's AI handle the rest. No subscriptions, no hassle. Effortless, Precise, Free."
                    titleClassName="text-5xl md:text-6xl font-extrabold"
                    subtitleClassName="text-lg md:text-xl max-w-[600px]"
                    actionsClassName="mt-8"
                />
            </div>
            <ImageSection />
            <ImageDivider
                before="/samples/demo-apple.jpg"
                after="/samples/no-bg-apple.png"
                className="aspect-16/9 rounded-xl mx-auto my-10 sm:w-100 lg:w-150 border-input border-2"
            />
            <Footer />
        </div>
    )
}

export default HomePage