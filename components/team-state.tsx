import { Loader2 } from 'lucide-react'
import React from 'react'
import { Skeleton } from './ui/skeleton'

function TeamState() {
  return (
    <div className='flex flex-col gap-4'>
      {Array.from({ length: 10 }).map((_, index) =>
        <div key={index}>
          <Skeleton className='w-full h-14' />
        </div>
      )
      }
    </div>
  )
}

export default TeamState