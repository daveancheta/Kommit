import React, { useState } from 'react'
import { Button } from './ui/button'
import { LiveKitRoom, VideoConference } from "@livekit/components-react"
import { UseMeetingStore } from '@/app/state/use-meeting-store'
import { UseChatStore } from '@/app/state/use-chat-store'
import { redirect } from 'next/navigation'

function JoinMeeting() {
  const [joined, setJoined] = useState<boolean>(false)
  const { handleJoinMeeting, token } = UseMeetingStore()
  const { selectedTeam } = UseChatStore()

  if (!joined) {
    return (
      <div>
        <Button className='w-full' variant='outline' onClick={() => {
          setJoined(true)
          handleJoinMeeting(selectedTeam as string)
        }}>Join</Button>
      </div>
    )
  }

  if (token) {
    redirect(`/meeting/${token}`)
  }
}

export default JoinMeeting