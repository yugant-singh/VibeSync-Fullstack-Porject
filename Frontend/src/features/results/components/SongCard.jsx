import React, { useRef, useState,useEffect } from 'react'
import '../style/songcard.scss'
import {useSong} from '../../scan/hooks/useSong'

const SongCard = ({ song }) => {
  const {playingId,setPlayingId}= useSong() 
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [timeLeft, setTimeLeft] = useState('0:00')

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  function handlePlayPause() {
    if (isPlaying) {
      audioRef.current.pause()
       setPlayingId(null)  
    } else {
      audioRef.current.play()
      setPlayingId(song._id) 
    }
    setIsPlaying(!isPlaying)
  }

  function handleTimeUpdate() {
    const current = audioRef.current.currentTime
    const total = audioRef.current.duration
    setProgress((current / total) * 100)
    setCurrentTime(formatTime(current))
    setTimeLeft('-' + formatTime(total - current))
  }

  function handleLoadedMetadata() {
    setTimeLeft('-' + formatTime(audioRef.current.duration))
  }

  function handleProgressClick(e) {
    const bar = e.currentTarget
    const clickX = e.nativeEvent.offsetX
    const width = bar.offsetWidth
    audioRef.current.currentTime = (clickX / width) * audioRef.current.duration
  }

  function handleSkipBack() {
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10)
  }

  function handleSkipForward() {
    audioRef.current.currentTime = Math.min(
      audioRef.current.duration,
      audioRef.current.currentTime + 10
    )
  }

  function handleEnded() {
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime('0:00')
  }
  useEffect(() => {
  if (playingId !== song._id && isPlaying) {
    audioRef.current.pause()
    setIsPlaying(false)
  }
}, [playingId])

  return (
    <div className="song-card">

      {/* Left — Poster */}
      <div className="song-card__poster-wrapper">
        <img
          src={song.posterUrl}
          alt={song.title}
          className="song-card__poster"
        />
      </div>

      {/* Right — Info + Controls */}
      <div className="song-card__content">

        {/* Title + Mood */}
        <div className="song-card__info">
          <h3 className="song-card__title">{song.title}</h3>
          <span className="song-card__mood">#{song.mood}</span>
        </div>

        {/* Progress Bar */}
        <div className="song-card__progress-wrapper" onClick={handleProgressClick}>
          <div className="song-card__progress-bar">
            <div
              className="song-card__progress-fill"
              style={{ width: `${progress}%` }}
            />
            <div
              className="song-card__progress-thumb"
              style={{ left: `${progress}%` }}
            />
          </div>
          <div className="song-card__time">
            <span>{currentTime}</span>
            <span>{timeLeft}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="song-card__controls">

          {/* Skip Back */}
          <button className="song-card__ctrl-btn" onClick={handleSkipBack}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
            </svg>
          </button>

          {/* Play/Pause */}
          <button className="song-card__play-btn" onClick={handlePlayPause}>
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* Skip Forward */}
          <button className="song-card__ctrl-btn" onClick={handleSkipForward}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zm2-8.14 4.96 2.14L8 14.14V9.86zM16 6h2v12h-2z"/>
            </svg>
          </button>

        </div>
      </div>

      {/* Hidden Audio */}
      <audio
        ref={audioRef}
        src={song.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

    </div>
  )
}

export default SongCard
