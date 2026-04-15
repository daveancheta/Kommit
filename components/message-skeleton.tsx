import React from 'react'
import { Skeleton } from './ui/skeleton'

function MessageSkeleton() {
  return (
    <div className='flex-1 flex flex-col gap-4'>
      {Array.from({ length: 4 }).map((_, index) =>
        <div className='flex flex-col gap-4' key={index}>
          <div className='flex justify-start'>
            <div className='flex flex-col gap-1'>
              <div className='flex flex-row gap-2 items-end'>
                <Skeleton className='rounded-full w-8 h-8' />
                <div className='flex flex-col gap-1'>
                  <Skeleton className='w-16 h-3 ml-1' />
                  <Skeleton className="w-60 h-10 rounded-tl-sm rounded-bl-2xl rounded-br-2xl rounded-tr-2xl" />
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-end'>
            <div className='gap-1'>
              <div className='flex flex-row gap-2 items-end'>
                <div className='flex flex-col gap-1 items-end'>
                  <Skeleton className='w-8 h-3 mr-1' />
                  <Skeleton className="w-60 h-10 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl rounded-tr-sm" />
                </div>
                <Skeleton className='rounded-full w-8 h-8' />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageSkeleton