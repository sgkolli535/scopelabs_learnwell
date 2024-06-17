"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Button} from "@nextui-org/react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import CustomVideoPlayer from "@/components/videoPlayer";

interface Comment {
  created_at: string;
  content: string;
  user_id: string;
  video_id: string;
  id: string;
}

interface Video {
  created_at: string;
  video_url: string;
  user_id: string;
  description: string;
  title: string;
  num_comments: number;
  id: string;
}

// renders a page for each video that displays the video, title, description, comments, and more videos
// uses the video id to fetch the video and more videos from the API
const VideoDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [video, setVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      // fetch the video, comments, and related videos for the given video id
      const fetchVideo = async () => {
        try {
          const response = await axios.get(
            `https://take-home-assessment-423502.uc.r.appspot.com/api/videos/single?video_id=${id}`,
            {
              headers: {
                accept: "application/json",
              },
            }
          );
          setVideo(response.data.video);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching video:", error);
        }
      };

      const fetchComments = async () => {
        try {
          const response = await axios.get(
            `https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id=${id}`,
            {
              headers: {
                accept: "application/json",
              },
            }
          );
          setComments(response.data.comments);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };

      const fetchRelatedVideos = async () => {
        try {
          const response = await axios.get(
            'https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=sumi_kolli',
            {
              headers: {
                accept: 'application/json',
              },
            }
          );
          let videos = response.data.videos;
          videos = videos.sort(() => Math.random() - 0.5);
          videos = videos.slice(0, 6);
          setRelatedVideos(videos);
        } catch (error) {
          console.error("Error fetching videos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchVideo();
      fetchComments();
      fetchRelatedVideos();
    }
  }, [id]);

  // adds a comment to the video with the given id
  const handleAddComment = async () => {
    if (newComment.trim() === "" || userId.trim() === "") return;

    try {
      await axios.post(
        "https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments",
        {
          video_id: id,
          content: newComment,
          user_id: userId,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setNewComment("");
      setUserId("");
      const response = await axios.get(
        `https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id=${id}`,
        {
          headers: {
            accept: "application/json",
          }
        }
      );
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // navigates to the video page for the given video id in the mode videos section
  const handleCardClick = (id: string) => {
    console.log("Clicked on video with id:", id);
    router.push(`/videos/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="flex">
    <div className="flex-grow w-screen pl-28 pt-4 text-left justify-start">
      <CustomVideoPlayer videoUrl={video.video_url} />
      <h1 className="text-4xl mt-2 w-4/5 font-bold text-custom-green">{video.title}</h1>
      <p className="text-lg mt-4">{video.user_id} • Uploaded {format(new Date(video.created_at), "Pp")}</p>
      <p className="text-xl bg-slate-200 rounded-sm p-2 mt-4 w-4/5 overflow-y-auto h-40">{video.description}</p>
      <div className="w-4/5 mt-8 text-left">
        <h2 className="text-2xl font-semibold text-custom-green">Comments</h2>
        <div className="flex h-14 align-center border-b border-gray-200 mt-4 ">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-1/4 p-2 border border-black rounded-lg mb-4"
            placeholder="Username"
          />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-2/3 ml-2 p-2 border border-black rounded-lg mb-4"
            placeholder="Add a comment..."
          />
          <Button
            size="md"
            onClick={handleAddComment}
            className="px-2 ml-2 mb-4 bg-custom-green border border-black text-white rounded-lg"
          >
            Comment
          </Button>
        </div>
        <div className="mt-4 overflow-y-auto max-h-60">
          {comments.map((comment) => (
            <div key={comment.id} className="text-left mt-4 mb-2 pl-2 border-l-2 border-custom-green">
              <p>
                <strong>{comment.user_id}</strong> • {format(new Date(comment.created_at), "Pp")}
              </p>
              <h3 className="text-xl w-fit text-left pt-2">{comment.content}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="w-1/3 pr-28 overflow-y-auto h-screen">
        <h2 className="text-xl font-semibold mb-4">More Videos</h2>
        <div className="space-y-4">
          {relatedVideos.map((relatedVideo) => (
            <Card 
            key={relatedVideo.id} 
            className="shadow-md shadow-custom-green text-left">
              <CardHeader className="flex gap-3">
              <Image
                alt="Card background"
                className="w-full object-cover rounded-xl m-auto"
                src="/blue.png"
              />
              </CardHeader>
              <CardBody>
              <div className="flex flex-col">
                  <p className="text-md">{relatedVideo.title}</p>
                  <p className="text-small text-default-500"> {relatedVideo.user_id} • Uploaded {format(new Date(relatedVideo.created_at), "Pp")}</p>
                </div>
              </CardBody>
              <Divider />
              <CardFooter className="flex">
                Comments: {video.num_comments}
                <Button
                  className="ml-auto bg-custom-green text-white"
                  onClick={() => handleCardClick(relatedVideo.id)}
                  size="md">Watch Now</Button>
    
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;