import React from 'react'
import { CalendarX2 } from 'lucide-react'

function MeetingEmptystate() {
  return (
    <div className="flex flex-col items-center justify-center py-12 w-full text-center animate-in fade-in-50 duration-700">
      <CalendarX2 className="h-8 w-8 text-zinc-400 dark:text-zinc-500 mb-4" />
      <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        No upcoming meetings
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
        Take a breather or schedule a new one.
      </p>
    </div>
  )
}

export default MeetingEmptystate