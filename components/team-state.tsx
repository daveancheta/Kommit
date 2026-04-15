import React from 'react'
import { Skeleton } from './ui/skeleton'

function TeamState() {
  return (
    <div className='flex flex-col gap-4'>
      {Array.from({ length: 10 }).map((_, index) =>
        <div className="flex flex-col gap-2 rounded-lg border p-3" key={index}>
            <div className="flex items-center gap-3">
                <Skeleton className="rounded-full w-10 h-10 shrink-0" />
                <div className="flex flex-1 flex-col gap-1.5 py-1">
                   <div className='flex justify-between'>
                     <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-12" />
                   </div>

                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default TeamState