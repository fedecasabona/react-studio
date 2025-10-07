'use client'

import { useState, useRef, useEffect } from 'react'

interface MusicPlayerProps {
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  position: { x: number; y: number }
  onDragStart: (e: React.MouseEvent) => void
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  onClose,
  onMinimize,
  onMaximize,
  isMinimized,
  isMaximized,
  zIndex,
  position,
  onDragStart
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // Music tracks - using local public/audio directory
  const tracks = [
    '/audio/track1.mp3',
    '/audio/track2.mp3',
    '/audio/track3.mp3',
    '/audio/track4.mp3',
    '/audio/track5.mp3'
  ]

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      if (isRepeating) {
        audio.currentTime = 0
        audio.play()
      } else {
        handleNext()
      }
    }

    const handleError = (e: Event) => {
      console.error('Audio error:', e)
      setAudioError(`Failed to load: ${tracks[currentTrack]}`)
    }

    const handleCanPlay = () => {
      setAudioError(null)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    audio.addEventListener('canplay', handleCanPlay)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('canplay', handleCanPlay)
    }
  }, [isRepeating])

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    setAudioError(null)
    console.log('Loading track:', tracks[currentTrack])
    
    // Set the source and load
    audio.src = tracks[currentTrack]
    audio.load()
    setCurrentTime(0)
    
    // Try to preload the audio
    audio.preload = 'metadata'
    
    // Add error handling for loading
    const handleLoadError = () => {
      console.error('Failed to load audio:', tracks[currentTrack])
      setAudioError(`Failed to load track ${currentTrack + 1}`)
    }
    
    audio.addEventListener('error', handleLoadError)
    
    return () => {
      audio.removeEventListener('error', handleLoadError)
    }
  }, [currentTrack, tracks])

  const handlePlayPause = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Playback error:', error)
      setAudioError('Playback failed. Check if audio files exist.')
    }
  }

  const handlePrevious = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.currentTime > 3) {
      audio.currentTime = 0
    } else {
      const newTrack = currentTrack > 0 ? currentTrack - 1 : tracks.length - 1
      setCurrentTrack(newTrack)
    }
  }

  const handleNext = () => {
    const newTrack = isShuffled 
      ? Math.floor(Math.random() * tracks.length)
      : (currentTrack + 1) % tracks.length
    setCurrentTrack(newTrack)
  }

  const handleShuffle = () => {
    setIsShuffled(!isShuffled)
  }

  const handleRepeat = () => {
    setIsRepeating(!isRepeating)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !progressRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const newTime = (clickX / width) * duration
    
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('terminal-header')) {
      setIsDragging(true)
      onDragStart(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseUp)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseUp)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  if (isMinimized) {
    return (
      <div
        className="fixed bg-black border border-gray-500 cursor-pointer hover:bg-gray-900 transition-colors"
        style={{
          left: position.x,
          top: position.y,
          zIndex: zIndex,
          minWidth: '200px',
          height: '32px',
          borderWidth: '0.5px'
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="terminal-header flex items-center justify-between px-3 py-1 h-full">
          <div className="flex items-center space-x-2">
            <span className="text-white font-roboto font-normal uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>sounds</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            className="text-gray-400 hover:text-white transition-colors"
            style={{ fontSize: '0.65rem' }}
          >
            −
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`fixed bg-black border border-gray-500 shadow-2xl ${isMaximized ? 'w-full h-full top-0 left-0' : ''}`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100vw' : '400px',
        height: isMaximized ? '100vh' : '200px',
        zIndex: zIndex,
        minWidth: '300px',
        minHeight: '150px',
        borderWidth: '0.5px',
        overflow: 'hidden'
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Terminal Header */}
      <div className="terminal-header flex items-center justify-between px-4 py-2 border-b border-gray-500 bg-black" style={{ borderWidth: '0.5px' }}>
        <div className="flex items-center space-x-2">
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={onClose}
            title="Close"
            style={{ fontSize: '0.65rem' }}
          >
            ✕
          </button>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={onMinimize}
            title="Minimize"
            style={{ fontSize: '0.65rem' }}
          >
            −
          </button>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={onMaximize}
            title="Maximize"
            style={{ fontSize: '0.65rem' }}
          >
            □
          </button>
        </div>
        <span className="text-white font-roboto font-normal uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>sounds</span>
      </div>

      {/* Music Player Content */}
      <div className="flex flex-col items-center justify-center h-full bg-black p-6" style={{ paddingBottom: '50px' }}>
        {/* Progress Bar */}
        <div 
          ref={progressRef}
          className="w-full bg-white cursor-pointer mb-8 hover:bg-gray-200 transition-colors"
          style={{ height: '2px' }}
          onClick={handleProgressClick}
        >
          <div 
            className="bg-black h-full transition-all duration-100"
            style={{ 
              width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' 
            }}
          />
        </div>

        {/* Seconds Counter */}
        <div className="text-white text-center mb-4" style={{ fontSize: '0.65rem', fontFamily: 'monospace' }}>
          <div className="mt-1">
            {Math.floor(currentTime)}s / {Math.floor(duration)}s
            {isPlaying && <span className="ml-2 text-green-400">●</span>}
          </div>
          {audioError && (
            <div className="text-red-400 mt-1" style={{ fontSize: '0.5rem' }}>
              {audioError}
            </div>
          )}
          <div className="mt-2">
            <button
              onClick={() => {
                const audio = audioRef.current
                if (audio) {
                  console.log('Testing audio load:', tracks[currentTrack])
                  audio.src = tracks[currentTrack]
                  audio.load()
                }
              }}
              className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
            >
              Test Load
            </button>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center space-x-6">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="text-white hover:text-gray-300 transition-colors p-2"
            title="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="text-black hover:text-gray-600 transition-colors p-3 bg-white rounded-full hover:bg-gray-200"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="text-white hover:text-gray-300 transition-colors p-2"
            title="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>

          {/* Shuffle Button */}
          <button
            onClick={handleShuffle}
            className={`transition-colors p-2 ${isShuffled ? 'text-white' : 'text-white hover:text-gray-300'}`}
            title="Shuffle"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
            </svg>
          </button>

          {/* Repeat Button */}
          <button
            onClick={handleRepeat}
            className={`transition-colors p-2 ${isRepeating ? 'text-white' : 'text-white hover:text-gray-300'}`}
            title="Repeat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
            </svg>
          </button>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          preload="metadata"
          crossOrigin="anonymous"
          controls={false}
        />
      </div>
    </div>
  )
}

export default MusicPlayer
