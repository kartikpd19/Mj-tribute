import GradientBackground from "./components/GradientBackground"
import MjDance from "./components/MjDance"
import Header from "./components/Header"
import Player from "./components/Player"
import { songs } from "./data/songs"
import { useYouTubeAudio } from "./hooks/useYouTubeAudio"
import "./App.css"

function App() {
  const {
    containerRef,
    currentSong,
    isReady,
    isPlaying,
    progress,
    togglePlay,
    next,
    prev,
  } = useYouTubeAudio(songs)

  return (
    <div className="app">
      <GradientBackground />
      <MjDance />
      <div className="app__content">
        <Header />
        <Player
          song={currentSong}
          isPlaying={isPlaying}
          isReady={isReady}
          progress={progress}
          onTogglePlay={togglePlay}
          onNext={next}
          onPrev={prev}
        />
        {/* Hidden YouTube audio engine — 1x1, visually absent */}
        <div ref={containerRef} className="yt-audio-mount" />
      </div>
    </div>
  )
}

export default App
