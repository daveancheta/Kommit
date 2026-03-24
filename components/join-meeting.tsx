import React, { useState } from 'react'
import { Button } from './ui/button'
import { LiveKitRoom, VideoConference } from "@livekit/components-react"
import { UseMeetingStore } from '@/app/state/use-meeting-store'
import { UseChatStore } from '@/app/state/use-chat-store'
import { redirect } from 'next/navigation'
import { time } from 'console'

function JoinMeeting(
  {
    date,
    time,
    created_by
  }
    :
    {
      date: string,
      time: string,
      created_by: string
    }) {
  const { handleJoinMeeting, token } = UseMeetingStore()
  const { selectedTeam } = UseChatStore()

  if (!token) {
    return (
      <div>
        <Button className='w-full' variant='outline' onClick={() => {
          handleJoinMeeting(selectedTeam as string, date, time, created_by)
        }}>Join</Button>
      </div>
    )
  }

  if (token) {
    redirect(`/meeting/${token}`)
  }
}

export default JoinMeeting