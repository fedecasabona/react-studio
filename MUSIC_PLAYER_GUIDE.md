# 🎵 Music Player Guide

## How to Add Music Files

The music player supports 6 audio files in MP3 or WAV format. Here's how to add your music:

### 📁 File Structure
```
public/
└── music/
    ├── track1.mp3
    ├── track2.mp3
    ├── track3.mp3
    ├── track4.mp3
    ├── track5.mp3
    └── track6.mp3
```

### 🎵 Adding Your Music

1. **Replace the placeholder files** in `public/music/` with your actual audio files
2. **Keep the same naming convention**: `track1.mp3`, `track2.mp3`, etc.
3. **Supported formats**: MP3, WAV, M4A, OGG
4. **File size**: Keep files under 10MB for optimal performance

### 🎛️ Music Player Features

#### **Controls:**
- **Previous Track** (⏮️) - Go to previous track or restart current track
- **Play/Pause** (▶️/⏸️) - Large centered button for main control
- **Next Track** (⏭️) - Skip to next track
- **Shuffle** (🔀) - Randomize track order
- **Repeat** (🔁) - Loop current track

#### **Progress Bar:**
- **Height**: Exactly 2px as specified
- **Click to seek**: Click anywhere on the progress bar to jump to that position
- **Visual feedback**: Smooth progress indication
- **Hover effects**: Bar highlights on hover

#### **Design:**
- **Minimalist interface**: No song names, no time display
- **White UI on black background**: Clean, modern aesthetic
- **Smooth transitions**: Hover effects and state changes
- **Responsive**: Works on different screen sizes

### 🔧 Technical Details

#### **Audio Handling:**
- Uses HTML5 Audio API
- Preloads metadata for instant seeking
- Handles track changes and playlist management
- Automatic track progression (unless repeat is enabled)

#### **Playlist Management:**
- **Normal mode**: Sequential track progression
- **Shuffle mode**: Random track selection
- **Repeat mode**: Current track loops indefinitely
- **Smart previous**: If track is >3 seconds, restart; otherwise go to previous

#### **Window Integration:**
- **Same properties** as other terminal windows
- **Draggable and resizable**
- **Minimize, maximize, close** functionality
- **Opens by default** with clock window

### 🎯 Usage Tips

1. **Upload your music files** to the `public/music/` folder
2. **Refresh the page** to load new audio files
3. **Use keyboard shortcuts** (if implemented in future)
4. **Drag the window** to position it where you want
5. **Resize the window** to make it larger or smaller

### 🚀 Future Enhancements

Potential features that could be added:
- Volume control
- Playlist display
- Keyboard shortcuts
- Audio visualization
- Equalizer
- Crossfade between tracks

---

**Enjoy your music! 🎶**
