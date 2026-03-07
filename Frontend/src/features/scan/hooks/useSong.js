import { useContext } from 'react'
import { getSong } from '../services/song.api'
import { SongContext } from '../song.context'


export function useSong() {
    const context = useContext(SongContext)
    const { loading, setLoading, songs, setSongs,playingId,setPlayingId } = context

    async function handleGetSong({mood}) {
        setLoading(true)
        const response = await getSong({ mood })
        setSongs(response.song)
        setLoading(false)
    }

    return ({loading,songs,handleGetSong,playingId,setPlayingId})

}