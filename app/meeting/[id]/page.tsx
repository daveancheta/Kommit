"use client"
import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import '@livekit/components-styles'
import React, { use } from 'react'

function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    return (
        <LiveKitRoom
            serverUrl="wss://practice-objwahy1.livekit.cloud"
            token={id as string}
            connect
            video
            audio
            style={{ height: "100vh" }}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}

export default page