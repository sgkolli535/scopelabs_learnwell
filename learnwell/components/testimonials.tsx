import { subtitle } from "@/components/primitives";
import {User} from "@nextui-org/react";

// User component
// This component displays a user avatar, name, and description
// It is used on the homepage to display user testimonials
export const Testimonials: React.FC = () => {
    return (
        <section className="testimonial-section">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-custom-green bg-clip-text text-transparent">
                    What Our Users Say
                </h1>
                <div className="testimonials-grid">
                <div className="testimonial-item">
                <User   
                    name="John Doe"
                    description="Teacher"
                    avatarProps={{
                    src: "https://randomuser.me/api/portraits/men/32.jpg"
                    }}
                    />
                    <h2 className={subtitle()}>
                    "Learnwell has completely changed the way I learn. The video content is top-notch and the community is incredibly supportive."
                    </h2>
                </div>
                <div className="testimonial-item">
                <User   
                    name="Jane Smith"
                    description="Student"
                    avatarProps={{
                    src: "https://randomuser.me/api/portraits/women/44.jpg"
                    }}
                    />
                    <h2 className={subtitle()}>
                    "As a teacher, Learnwell has given me the tools I need to create engaging content for my students. It's a game-changer!"
                    </h2>
                </div>
                <div className="testimonial-item">
                <User   
                    name="Sajan Patel"
                    description="Content Creator"
                    avatarProps={{
                    src: "https://randomuser.me/api/portraits/men/45.jpg"
                    }}
                    />
                    <h2 className={subtitle()}>
                    "I love using Learnwell for my professional development. The variety of videos available helps me stay on top of my field."
                    </h2>
                </div>
                </div>
        </section>
    );
}