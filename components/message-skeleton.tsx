import React from 'react'
import { Skeleton } from './ui/skeleton'

function MessageSkeleton() {
  return (
    <div>
      {Array.from({ length: 4 }).map((_, index) =>
        <div className='flex flex-col gap-4' key={index}>
          <div className='flex justify-start'>
            <Skeleton className="w-60 h-12" />
          </div>
          <div className='flex justify-end'>
            <Skeleton className="w-60 h-12" />
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageSkeleton