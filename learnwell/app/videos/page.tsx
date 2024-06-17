"use client";

import { title } from "@/components/primitives";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Button} from "@nextui-org/react";
import { useRouter, useSearchParams} from "next/navigation";
import { format } from "date-fns";
import {
  TwitterIcon,
  GithubIcon,
  InstagramIcon,
} from "@/components/icons";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";


interface Video {
  created_at: string;
  video_url: string;
  user_id: string;
  description: string;
  title: string;
  num_comments: number;
  id: string;
}

// FetchVideos component fetches videos from the API and displays them in a grid
// Each video is displayed in a card with the video title, description, and number of comments
// The user can click on a video to view the video detail page via Next's dynamic routing
// The footer contains links to social media and other resources
// The user can also search for videos using the search input
const FetchVideos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  // fetch videos from the API
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=sumi_kolli',
          {
            headers: {
              accept: 'application/json',
            },
          }
        );
        setVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // filter videos based on the search query
  useEffect(() => {
    if (query) {
      const filtered = videos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(videos);
    }
  }, [query, videos]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // handle card click event to navigate to the video detail page via Next's dynamic routing
  const handleCardClick = (id: string) => {
    console.log("Clicked on video with id:", id);
    router.push(`/videos/${id}`);
  };

  return (
    <><h1 className={title()}>All Videos</h1>
    <div className="grid grid-cols-1 text-left md:grid-cols-2 lg:grid-cols-3 gap-10 p-4 px-28 mt-4">
      {filteredVideos.map((video) => (
        <Card 
        key={video.id} 
        className="shadow-lg shadow-custom-green">
          <CardHeader className="flex gap-3">
            <Image
              alt="logo"
              height={40}
              radius="sm"
              src="/LOGO_ICON.png"
              width={40} />
            <div className="flex flex-col">
              <p className="text-md">{video.title}</p>
              <p className="text-small text-default-500"> {video.user_id} • Uploaded {format(new Date(video.created_at), "Pp")}</p>
            </div>
          </CardHeader>
          <CardBody>
            <Image
            alt="Card background"
            className="w-full object-cover rounded-xl m-auto"
            src="/blue.png"
          />
            <p className="mt-2 truncate">{video.description}</p>
          </CardBody>
          <Divider />
          <CardFooter className="flex">
            Comments: {video.num_comments}
            <Button
              className="ml-auto bg-custom-green text-white"
              onClick={() => handleCardClick(video.id)}
              size="md"><img src="/icons8-play-30.png" alt="play"/></Button>

          </CardFooter>
        </Card>
      ))}
    </div>
    <footer className="w-full justify-center flex items-center py-5 mt-4 hidden sm:flex gap-2">
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
};

export default FetchVideos;
