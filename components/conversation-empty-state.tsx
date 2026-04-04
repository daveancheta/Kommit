"use client"

import { MessageSquare } from 'lucide-react'
import { motion } from 'motion/react'

function ConversationEmptyState() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className='flex-1 flex flex-col items-center justify-center gap-3 p-8 select-none text-center'
    >
      <div className='w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-2'>
        <MessageSquare className='w-8 h-8 text-muted-foreground/50' />
      </div>

      <h2 className='text-lg font-medium text-foreground tracking-tight'>
        No conversation selected
      </h2>
      <p className='text-sm text-muted-foreground max-w-sm'>
        Pick a group from the sidebar to start chatting with your team.
      </p>
    </motion.div>
  )
}

export default ConversationEmptyState