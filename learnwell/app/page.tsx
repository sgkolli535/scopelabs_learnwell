import { Link } from "@nextui-org/link";

import { title, subtitle } from "@/components/primitives";
import { Button} from "@nextui-org/react";
import { Testimonials } from "@/components/testimonials";
import {
  TwitterIcon,
  GithubIcon,
  InstagramIcon,
} from "@/components/icons";

import { siteConfig } from "@/config/site";

// Home page component
// This component is the landing page for the application
// It includes a hero section with a video background and a call to action button
// It also includes a section with information about how the application works
// The Testimonials component is also included to display user testimonials
// The footer contains links to social media and other resources
export default function Home() {
  return (
    <>
    <section className="w-full flex flex-col items-center justify-center">
      <div className="hero-container">
        <video className="video-background" autoPlay loop muted playsInline>
          <source src="/ai.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="w-full h-full justify-center absolute bg-white/10">
            <div className="w-full h-full flex justify-center">
              <img src="/FULL_LOGO_COLOR_enhanced.png" alt="Learnwell" className="h-40 rounded-md shadow-md shadow-slate-400 px-5 w-auto my-auto bg-white" />
            </div>
        </div>
      </div>
      <section className="text-center mt-28">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-custom-green via-slate-100 to-custom-green bg-clip-text text-transparent mb-14">
            Learn, Create, Engage
          </h1>
        <div className="flex flex-col items-center justify-center mb-20">
        <video className="mb-14" autoPlay loop muted playsInline>
          <source src="/scribble.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h2 className={title({ size: "md" })}>Get Started Today for Free</h2>
        <div className="h-10"></div>
          <Link href="/videos">
            <Button size="lg" className="bg-custom-green text-white">
              Go to Videos
            </Button>
          </Link>
        </div>
      </section>
      <section className="features-section">
        <div className="features-grid">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-custom-green bg-clip-text text-transparent">
            How it Works
          </h1>
        <div className="flex mt-14 mb-14 items-center space-x-4 text-left">
          <video className="w-auto h-25" autoPlay loop muted playsInline>
            <source src="/create.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div>
            <h2 className={title({ size: "sm" })}>Create Videos</h2>
            <h3 className={subtitle()}>Easily create educational videos to share with the world.</h3>
          </div>
        </div>
        <div className="flex mt-14 mb-14 items-center justify-end space-x-4 text-right">
          <div>
            <h2 className={title({ size: "sm" })}>Watch & Learn</h2>
            <h3 className={subtitle()}>Access a wide variety of educational videos.</h3>
          </div>
          <video className="w-auto h-25" autoPlay loop muted playsInline>
            <source src="/watch.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex mt-14 mb-28 items-center space-x-4 text-left">
          <video className="w-auto h-25" autoPlay loop muted playsInline>
            <source src="/comments.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div>
            <h2 className={title({ size: "sm" })}>Comment & Engage</h2>
            <h3 className={subtitle()}>Interact with other learners and educators through comments.</h3>
          </div>
        </div>
        </div>
      </section>
      <Testimonials />
    </section>
    <footer className="w-full justify-center flex items-center py-5 hidden sm:flex gap-2">
              &copy;Learnwell Co. 2024
              <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
                <TwitterIcon className="text-default-500" />
              </Link>
              <Link isExternal aria-label="Instagram" href={siteConfig.links.instagram}>
                <InstagramIcon className="text-default-500" />
              </Link>
              <Link isExternal aria-label="Github" href={siteConfig.links.github}>
                <GithubIcon className="text-default-500" />
              </Link>
            </footer>
    </>
  );
}
