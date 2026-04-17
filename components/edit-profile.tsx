"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, X } from 'lucide-react' 
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useInitials } from '@/hooks/use-initials'
import { UseAuthStore } from '@/app/state/use-auth-store'

function EditProfile({ isEditProfileOpen, setIsEditProfileOpen }:
    {
        isEditProfileOpen: boolean,
        setIsEditProfileOpen: React.Dispatch<React.SetStateAction<boolean>>
    }
) {
    const getInitials = useInitials()
    const { auth, handleGetSession } = UseAuthStore()

    useEffect(() => {
        handleGetSession()
    }, [handleGetSession])

    return (
        <motion.div
            initial={{ x: !isEditProfileOpen ? "100%" : "0" }}
            animate={{ x: isEditProfileOpen ? "0" : "100%" }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 flex flex-col"
        >
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Edit Profile</h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Update your personal details and avatar.</p>
                </div>
                <button
                    className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
                    onClick={() => setIsEditProfileOpen(!isEditProfileOpen)}
                >
                    <X className="w-5 h-5 text-zinc-500" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative group">
                        <Avatar className="h-24 w-24 border-2 border-zinc-100 dark:border-zinc-800 shadow-sm">
                            {auth?.image ? (
                                <AvatarImage src={auth?.image} alt={auth?.name} className="object-cover" />
                            ) : (
                                <AvatarFallback className="text-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                                    {getInitials(auth?.name)}
                                </AvatarFallback>
                            )}
                        </Avatar>
                        <label className="absolute bottom-0 right-0 p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full cursor-pointer shadow-lg hover:scale-105 transition-transform">
                            <Camera className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                            <input type="file" className="hidden" />
                        </label>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Display Name</label>
                        <input
                            type="text"
                            className="w-full bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-zinc-200"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
                        <input
                            type="email"
                            className="w-full bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-zinc-200"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Bio</label>
                        <textarea
                            rows={4}
                            className="w-full bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none transition-all dark:text-zinc-200"
                        />
                        <p className="text-[11px] text-zinc-500">Brief description for your profile.</p>
                    </div>
                </div>
            </div>

            <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 flex gap-3">
                <button
                    onClick={() => setIsEditProfileOpen(!isEditProfileOpen)}
                    className="flex-1 px-4 py-2 text-sm font-medium border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
                >
                    Cancel
                </button>
                <button className="flex-1 px-4 py-2 text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md hover:opacity-90 transition-opacity">
                    Save Changes
                </button>
            </div>
        </motion.div>
    )
}

export default EditProfile