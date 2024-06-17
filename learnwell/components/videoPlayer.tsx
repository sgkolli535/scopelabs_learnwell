import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import { Card, Button, Select, SelectItem, Slider } from "@nextui-org/react";

// takes in videoUrl as a prop
interface CustomVideoPlayerProps {
  videoUrl: string;
}

// CustomVideoPlayer component
// This component renders a custom video player with controls
// It includes play/pause, volume, playback speed, forward, rewind, progress, and fullscreen controls
// The user can play/pause the video, adjust the volume, forward/rewind 10 seconds, playback speed, and progress through the video
const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ videoUrl }) => {
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // toggle fullscreen
  const handleFullScreen = () => {
    if (screenfull.isEnabled && containerRef.current) {
      screenfull.toggle(containerRef.current);
      setIsFullscreen(!isFullscreen);
    }
  };

  // handle playback rate change
  const handlePlaybackRateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const rate = parseFloat(event.target.value);
    setPlaybackRate(rate);
  };

  // handle volume change
  const handleVolumeChange = (value: number | number[]) => {
    const newVolume = Array.isArray(value) ? value[0] : value;
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.getInternalPlayer().volume = newVolume;
    }
  };

  // handle progress
  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played);
  };

  // handle seek change
  const handleSeekChange = (value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    setPlayed(newValue);
    if (playerRef.current) {
      playerRef.current.seekTo(newValue);
    }
  };

  // skip forward 10 seconds
  const skipForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    }
  };

  // rewind 10 seconds
  const rewind = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    }
  };

  return (
    <div className="video-player-container" ref={containerRef}>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={isPlaying}
        playbackRate={playbackRate}
        volume={volume}
        onProgress={handleProgress}
        controls={false}
        width="100%"
        height="100%"
      />
      <Card className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4">
        <div className="controls">
        <div className="flex items-center justify-between">
          <Button
            onClick={togglePlayPause}
            className="rounded-full bg-transparent hover:bg-custom-green"
          >
            {isPlaying ? <img className="h-7 w-7" src="/icons8-pause-30.png" /> : <img className="h-7 w-7" src="/icons8-play-30.png" />}
          </Button>
          <Button
            onClick={rewind}
            className="rounded-full bg-transparent hover:bg-custom-green"
          >
            <img className="h-7 w-7" src="/icons8-replay-10-30.png" />
          </Button>
          <Button
            onClick={skipForward}
            className="rounded-full bg-transparent hover:bg-custom-green"
          >
            <img className="h-7 w-7" src="/icons8-forward-10-30.png" />
          </Button>
          <div className="relative flex items-center group">
            <img className="h-7 w-7 cursor-pointer" src="/icons8-volume-30.png" />
              <Slider
                className="min-w-32 max-w-40"
                classNames={{
                    filler: "bg-custom-green",
                  }}
                aria-label="Volume"
                color="foreground"
                size="sm"
                step={0.01}
                maxValue={1}
                minValue={0}
                value={volume}
                onChange={handleVolumeChange}
              />
          </div>
          <div className="flex items-center">
            <Select
              placeholder="Set Playback Speed"
              onChange={handlePlaybackRateChange}
              value={playbackRate.toString()}
              className="min-w-48"
              popoverProps={{
                placement: "top"
              }}
            >
              <SelectItem key="0.5" value="0.5">0.5x</SelectItem>
              <SelectItem key="1" value="1">1x</SelectItem>
              <SelectItem key="1.5" value="1.5">1.5x</SelectItem>
              <SelectItem key="2" value="2">2x</SelectItem>
            </Select>
          </div>
          <Button
            onClick={handleFullScreen}
            className="rounded-full bg-transparent hover:bg-custom-green"
          >
            {isFullscreen ? <img className="h-7 w-7" src="/icons8-minimize-50.png" /> : <img className="h-7 w-7" src="/icons8-maximize-50.png" />}
          </Button>
        </div>
        </div>
        <div className="flex items-center gap-2 py-2">
          <Slider
            size="sm"
            step={0.01}
            maxValue={1}
            minValue={0}
            aria-label="Progress"
            color="foreground"
            value={played}
            classNames={{
              filler: "bg-custom-green",
            }}
            renderThumb={(props) => (
              <div
                {...props}
                className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
              >
                <span className="transition-transform bg-gradient-to-r from-custom-green to-slate-200 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
              </div>
            )}
            className="w-full"
            onChange={handleSeekChange}
          />
        </div>
      </Card>
    </div>
  );
};

export default CustomVideoPlayer;



