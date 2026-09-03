import mjDanceVideo from "../assets/videos/mj-dance.mp4"
import "./MjDance.css"

// Stylized silhouette footage (not real MJ footage) — an animated
// continuation of the same shadow-figure art the design used before,
// sitting between the gradient background and the foreground content.
export default function MjDance() {
  return (
    <div className="mj-dance" aria-hidden="true">
      <video
        className="mj-dance__video"
        src={mjDanceVideo}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  )
}
