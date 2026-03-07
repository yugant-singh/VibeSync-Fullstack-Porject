import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useSong } from '../../scan/hooks/useSong'
import SongCard from '../components/SongCard'
import '../style/result.scss'

const moodEmoji = {
  happy: '😊',
  sad: '😢',
  surprised: '😲',
  neutral: '😐',
  angry: '😠',
}

const Results = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const mood = searchParams.get('mood')
  const { songs, loading, handleGetSong } = useSong()

  useEffect(() => {
    if (mood) handleGetSong({ mood })
  }, [mood])

  if (loading) {
    return (
      <div className="results-loading">
        <div className="results-loading__dots">
          <span /><span /><span />
        </div>
        <p>Finding your vibe...</p>
      </div>
    )
  }

  return (
    <div className="results">

      {/* Header */}
      <div className="results__header">
        <span className="results__emoji">{moodEmoji[mood] || '🎵'}</span>
        <h2 className="results__title">
          <span>{mood}</span> Playlist
        </h2>
        <p className="results__count">{songs.length} songs found</p>
      </div>

      {/* Songs Grid */}
      <div className="results__grid">
        {songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>

      {/* Scan Again */}
      <button className="results__btn" onClick={() => navigate('/scan')}>
        🔄 Scan Again
      </button>

    </div>
  )
}

export default Results
