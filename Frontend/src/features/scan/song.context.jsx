import {createContext,useState} from 'react'

export const SongContext = createContext()

export const SongContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [songs, setSongs] = useState([])
    const [playingId, setPlayingId] = useState(null)

    return <SongContext.Provider value={{ loading, setLoading, songs, setSongs,playingId,setPlayingId }}>
        {children}
    </SongContext.Provider>

}