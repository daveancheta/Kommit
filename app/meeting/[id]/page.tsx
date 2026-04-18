"use client"
import {
    LiveKitRoom, DisconnectButton, GridLayout, ParticipantTile,
    useTracks, RoomAudioRenderer, useLocalParticipant
} from '@livekit/components-react'
import '@livekit/components-styles'
import { Track } from 'livekit-client'
import { Camera, CameraOff, Mic, MicOff, PhoneOff, ScreenShare, ScreenShareOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { use, useState } from 'react'

function VideoGrid() {
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
            { source: Track.Source.ScreenShareAudio, withPlaceholder: false },
        ],
        { onlySubscribed: false }
    )

    return (
        <div className="h-[calc(100vh-72px)] w-full bg-neutral-950">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500&display=swap');

                * { font-family: 'Instrument Sans', sans-serif; }

                .lk-grid-layout {
                    gap: 2px !important;
                    background: #0a0a0a !important;
                    padding: 2px !important;
                    height: 100% !important;
                }

                .lk-participant-tile {
                    border-radius: 0 !important;
                    overflow: hidden !important;
                    position: relative !important;
                    background: #111 !important;
                    transition: all 0.2s ease !important;
                }

                /* Camera = cover (fill the tile) */
                .lk-participant-tile video {
                    object-fit: cover !important;
                    width: 100% !important;
                    height: 100% !important;
                }

                /* Screen share = contain (show full screen, no crop) */
                .lk-participant-tile[data-lk-source="screen_share"] video {
                    object-fit: contain !important;
                    background: #000 !important;
                }

                /* speaking ring */
                .lk-participant-tile[data-lk-speaking="true"]::after {
                    content: '' !important;
                    position: absolute !important;
                    inset: 0 !important;
                    border: 1.5px solid rgba(255,255,255,0.5) !important;
                    pointer-events: none !important;
                    z-index: 10 !important;
                }

                /* name tag */
                .lk-participant-metadata {
                    background: transparent !important;
                    padding: 8px 10px !important;
                }

                .lk-participant-name {
                    font-family: 'Instrument Sans', sans-serif !important;
                    font-size: 0.65rem !important;
                    font-weight: 500 !important;
                    letter-spacing: 0.12em !important;
                    text-transform: uppercase !important;
                    color: rgba(255,255,255,0.5) !important;
                    background: none !important;
                    padding: 0 !important;
                }

                /* muted icon */
                .lk-participant-media-icon {
                    background: rgba(20,20,20,0.85) !important;
                    border-radius: 2px !important;
                    padding: 3px !important;
                }

                /* camera placeholder */
                .lk-camera-off-note,
                .lk-participant-placeholder {
                    background: #111111 !important;
                }
            `}</style>

            <GridLayout tracks={tracks} style={{ height: "100%" }}>
                <ParticipantTile style={{ height: "100%", width: "100%" }} />
            </GridLayout>
        </div>
    )
}

function Controls() {
    const { localParticipant, isMicrophoneEnabled, isCameraEnabled } = useLocalParticipant()
    const [screen, setScreen] = useState(false)

    const toggleMic = async () => {
        await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled)
    }

    const toggleCam = async () => {
        await localParticipant.setCameraEnabled(!isCameraEnabled)
    }

    const toggleScreen = async () => {
        await localParticipant.setScreenShareEnabled(!screen, {
            audio: true,
            selfBrowserSurface: "include"
        })
        setScreen(!screen)
    }

    const iconClass = "w-4 h-4"

    return (
        <div
            className="w-full flex items-center justify-center py-4"
            style={{ background: '#0a0a0a', borderTop: '1px solid #1f1f1f' }}
        >
            <div className="flex flex-row items-center gap-2">
                <button
                    onClick={toggleMic}
                    className="group flex items-center justify-center w-10 h-10 rounded-sm transition-all duration-150"
                    style={{
                        background: isMicrophoneEnabled ? '#1a1a1a' : '#fff',
                        border: '1px solid',
                        borderColor: isMicrophoneEnabled ? '#2a2a2a' : '#fff',
                    }}
                    title={isMicrophoneEnabled ? 'Mute' : 'Unmute'}
                >
                    {isMicrophoneEnabled
                        ? <Mic className={iconClass} style={{ color: 'rgba(255,255,255,0.7)' }} />
                        : <MicOff className={iconClass} style={{ color: '#000' }} />
                    }
                </button>

                <button
                    onClick={toggleCam}
                    className="flex items-center justify-center w-10 h-10 rounded-sm transition-all duration-150"
                    style={{
                        background: isCameraEnabled ? '#1a1a1a' : '#fff',
                        border: '1px solid',
                        borderColor: isCameraEnabled ? '#2a2a2a' : '#fff',
                    }}
                    title={isCameraEnabled ? 'Stop Video' : 'Start Video'}
                >
                    {isCameraEnabled
                        ? <Camera className={iconClass} style={{ color: 'rgba(255,255,255,0.7)' }} />
                        : <CameraOff className={iconClass} style={{ color: '#000' }} />
                    }
                </button>

                <button
                    onClick={toggleScreen}
                    className="flex items-center justify-center w-10 h-10 rounded-sm transition-all duration-150"
                    style={{
                        background: screen ? '#fff' : '#1a1a1a',
                        border: '1px solid',
                        borderColor: screen ? '#fff' : '#2a2a2a',
                    }}
                    title={screen ? 'Stop Sharing' : 'Share Screen'}
                >
                    {screen
                        ? <ScreenShareOff className={iconClass} style={{ color: '#000' }} />
                        : <ScreenShare className={iconClass} style={{ color: 'rgba(255,255,255,0.7)' }} />
                    }
                </button>

                <div className="w-px h-5 mx-1" style={{ background: '#2a2a2a' }} />

                <DisconnectButton
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '0 14px',
                        height: '40px',
                        borderRadius: '2px',
                        background: 'transparent',
                        border: '1px solid #3a3a3a',
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '0.65rem',
                        fontFamily: 'Instrument Sans, sans-serif',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => {
                        (e.target as HTMLElement).style.background = '#fff'
                            ; (e.target as HTMLElement).style.color = '#000'
                            ; (e.target as HTMLElement).style.borderColor = '#fff'
                    }}
                    onMouseLeave={e => {
                        (e.target as HTMLElement).style.background = 'transparent'
                            ; (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)'
                            ; (e.target as HTMLElement).style.borderColor = '#3a3a3a'
                    }}
                >
                    <PhoneOff style={{ width: '14px', height: '14px' }} />
                    Leave
                </DisconnectButton>
            </div>
        </div>
    )
}

function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()

    return (
        <LiveKitRoom
            serverUrl="wss://practice-objwahy1.livekit.cloud"
            token={id as string}
            connect video audio
            onDisconnected={() => {
                router.push('/chat')
            }}
            onError={() => {
                router.push('/chat')
            }}
            style={{ height: '100vh', background: '#0a0a0a' }}
        >
            <RoomAudioRenderer />
            <div className="flex flex-col h-screen">
                <VideoGrid />
                <Controls />
            </div>
        </LiveKitRoom>
    )
}

export default page