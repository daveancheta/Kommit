"use client"

import { MessageSquare, Users, ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'

function ConversationEmptyState() {
  return (
    <div className='flex-1 flex flex-col items-center justify-center gap-6 p-8 select-none'>
      <div className='relative'>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className='relative z-10'
        >
          <div className='w-24 h-24 rounded-3xl bg-linear-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center shadow-lg'>
            <MessageSquare className='w-10 h-10 text-neutral-500 dark:text-neutral-400' />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className='absolute -top-3 -right-4 z-20'
        >
          <div className='w-10 h-10 rounded-xl bg-linear-to-br from-blue-400/80 to-blue-500/80 dark:from-blue-500/60 dark:to-blue-600/60 flex items-center justify-center shadow-md'>
            <Users className='w-4 h-4 text-white' />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          className='absolute -bottom-2 -left-4 z-20'
        >
          <div className='w-8 h-8 rounded-lg bbg-linear-to-br from-violet-400/70 to-violet-500/70 dark:from-violet-500/50 dark:to-violet-600/50 flex items-center justify-center shadow-md'>
            <ArrowLeft className='w-3.5 h-3.5 text-white' />
          </div>
        </motion.div>

        <div className='absolute inset-0 -z-10 blur-3xl opacity-20 dark:opacity-10 bg-linear-to-r from-blue-400 to-violet-400 rounded-full scale-150' />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className='flex flex-col items-center gap-2 text-center max-w-xs'
      >
        <h2 className='text-xl font-bold tracking-tight text-foreground'>
          No conversation selected
        </h2>
        <p className='text-sm text-muted-foreground leading-relaxed'>
          Pick a group from the sidebar to start chatting with your team.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className='flex gap-1.5 mt-2'
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            className='w-1.5 h-1.5 rounded-full bg-muted-foreground/50'
          />
        ))}
      </motion.div>
    </div>
  )
}

export default ConversationEmptyState