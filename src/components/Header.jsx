import spotifyLogo from "../assets/icons/spotify.svg"
import "./Header.css"

const MJ_SPOTIFY_URL = "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm"

export default function Header() {
  return (
    <header className="header">
      <p className="header__title">
        A Tribute to
        <br />
        Michael Jackson
      </p>
      <a
        className="header__spotify"
        href={MJ_SPOTIFY_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Michael Jackson on Spotify"
      >
        <img src={spotifyLogo} alt="" />
      </a>
    </header>
  )
}
