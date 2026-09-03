import { useEffect, useRef } from "react"
import cassetteVideo from "../assets/videos/cassette.mp4"
import skipBack from "../assets/icons/skip-back.svg"
import playCircle from "../assets/icons/play-circle.svg"
import pauseCircle from "../assets/icons/pause-circle.svg"
import skipForward from "../assets/icons/skip-forward.svg"
import "./Player.css"

export default function Player({
  song,
  isPlaying,
  isReady,
  progress,
  onTogglePlay,
  onNext,
  onPrev,
}) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isPlaying])

  return (
    <main className="player">
      <div className="player__stack">
        <div className="player__cassette-wrap">
          <div className="player__cassette">
            <video
              ref={videoRef}
              className="player__cassette-video"
              src={cassetteVideo}
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="player__meta">
          <p className="player__title">{song.title}</p>
          <p className="player__album">{song.album}</p>
        </div>

        <div className="player__controls">
          <button
            type="button"
            className="player__control player__control--back"
            onClick={onPrev}
            aria-label="Previous song"
          >
            <img src={skipBack} alt="" />
          </button>
          <button
            type="button"
            className="player__control player__control--play"
            onClick={onTogglePlay}
            disabled={!isReady}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <img src={isPlaying ? pauseCircle : playCircle} alt="" />
          </button>
          <button
            type="button"
            className="player__control"
            onClick={onNext}
            aria-label="Next song"
          >
            <img src={skipForward} alt="" />
          </button>
        </div>
      </div>

      <div className="player__progress" aria-hidden="true">
        <div
          className="player__progress-fill"
          style={{ width: `${Math.min(progress, 1) * 100}%` }}
        />
      </div>
    </main>
  )
}
