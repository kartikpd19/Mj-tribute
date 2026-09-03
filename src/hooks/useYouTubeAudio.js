import { useEffect, useRef, useState, useCallback } from "react"

let apiPromise = null

function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
  if (apiPromise) return apiPromise

  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === "function") previous()
      resolve(window.YT)
    }
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    document.head.appendChild(tag)
  })
  return apiPromise
}

// Drives a hidden YouTube player as an audio engine: play/pause/next/prev + progress,
// with no visible video chrome — just the track list defined in songs.js.
export function useYouTubeAudio(songs) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0) // 0..1
  const wantsPlayRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    let poll = null

    loadYouTubeApi().then((YT) => {
      if (cancelled || !containerRef.current) return

      playerRef.current = new YT.Player(containerRef.current, {
        height: "1",
        width: "1",
        videoId: songs[0].youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            setIsReady(true)
          },
          onStateChange: (event) => {
            const YTState = window.YT.PlayerState
            if (event.data === YTState.PLAYING) setIsPlaying(true)
            if (event.data === YTState.PAUSED) setIsPlaying(false)
            if (event.data === YTState.ENDED) {
              setIndex((i) => (i + 1) % songs.length)
              wantsPlayRef.current = true
            }
          },
        },
      })

      poll = setInterval(() => {
        const p = playerRef.current
        if (!p || typeof p.getDuration !== "function") return
        const duration = p.getDuration()
        const current = p.getCurrentTime()
        if (duration > 0) setProgress(current / duration)
      }, 400)
    })

    return () => {
      cancelled = true
      if (poll) clearInterval(poll)
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Load whichever track is selected; auto-play if we were already playing (e.g. skip / auto-advance).
  useEffect(() => {
    const p = playerRef.current
    if (!isReady || !p) return
    setProgress(0)
    if (wantsPlayRef.current || isPlaying) {
      p.loadVideoById(songs[index].youtubeId)
    } else {
      p.cueVideoById(songs[index].youtubeId)
    }
    wantsPlayRef.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isReady])

  const play = useCallback(() => {
    playerRef.current?.playVideo()
  }, [])

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo()
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, play, pause])

  const next = useCallback(() => {
    wantsPlayRef.current = true
    setIndex((i) => (i + 1) % songs.length)
  }, [songs.length])

  const prev = useCallback(() => {
    wantsPlayRef.current = true
    setIndex((i) => (i - 1 + songs.length) % songs.length)
  }, [songs.length])

  return {
    containerRef,
    currentSong: songs[index],
    isReady,
    isPlaying,
    progress,
    togglePlay,
    next,
    prev,
  }
}
