import {
  TwitterIcon,
  GithubIcon,
  InstagramIcon,
} from "@/components/icons";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";

// component for the about page -- has a simple display of a tagline, blurb, and some example statistics
// footer is included at the bottom of the page
export default function AboutPage() {
  return (
    <><div className="flex">
      <div className="text-left w-1/2 align-middle mr-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-custom-green via-slate-100 to-custom-green bg-clip-text text-transparent mb-2">
          About Us
        </h1>
        <video className="my-10" autoPlay loop muted playsInline>
          <source src="/scribble.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="text-6xl">Empowering Learners and Creators Worldwide: Transforming Education through Innovative and Engaging Experiences</p>
      </div>
      <img src="/about.jpg" alt="logo" className="rounded-xl w-1/2" />
    </div>
    <div className="flex mt-8">
      <div className="text-left w-1/2 mr-12">
      <p className="text-2xl">At Learnwell, we believe that education is the cornerstone of a brighter future. Our mission is to revolutionize the way people learn, create, and engage by providing innovative tools and resources that inspire curiosity, foster creativity, and cultivate a lifelong love for learning. Whether you're a student seeking to deepen your understanding, a teacher looking for dynamic ways to enhance your curriculum, or a lifelong learner pursuing new passions, Learnwell is here to support your journey every step of the way. Join our global community of learners and creators, and discover how we can help you achieve your educational goals and beyond.</p>
      </div>
      <div className="w-1/2">
      <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div className="p-4 rounded-lg text-center">
          <p className="text-5xl font-bold text-custom-green">2 million</p>
          <p className="text-lg">learners and educators from 150+ countries</p>
        </div>
        <div className="p-4 rounded-lg text-center">
          <p className="text-5xl font-bold text-custom-green">50,000</p>
          <p className="text-lg">video tutorials and interactive lessons</p>
        </div>
        <div className="p-4 rounded-lg text-center">
          <p className="text-5xl font-bold text-custom-green">95%</p>
          <p className="text-lg">of our users report improved understanding and increased engagement</p>
        </div>
        <div className="p-4 rounded-lg text-center">
          <p className="text-5xl font-bold text-custom-green">300%</p>
          <p className="text-lg">community growth in the past year</p>
        </div>
      </div>
    </div>
      </div>
      </div>
      <footer className="w-full justify-center flex items-center py-5 mt-14 hidden sm:flex gap-2">
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
