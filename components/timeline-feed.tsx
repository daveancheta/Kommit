"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { 
  Image as ImageIcon, 
  Calendar, 
  Newspaper, 
  ThumbsUp, 
  MessageSquare, 
  Repeat2, 
  Send, 
  MoreHorizontal
} from "lucide-react"

const MOCK_POSTS = [
  {
    id: 1,
    author: {
      name: "Jane Doe",
      title: "Senior Frontend Engineer @ Kommit",
      avatar: "https://i.pravatar.cc/150?u=jane",
    },
    time: "2h",
    content: "Just finished building the new timeline feature for our platform! Super excited to see how it improves team collaboration. 🚀 #buildinpublic #react #webdev",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    likes: 124,
    comments: 18,
    reposts: 5,
  },
  {
    id: 2,
    author: {
      name: "Alex Smith",
      title: "Product Manager",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    time: "5h",
    content: "We're hiring! Looking for talented designers to join our growing team. If you're passionate about creating beautiful, intuitive interfaces, hit me up! 👇",
    likes: 45,
    comments: 12,
    reposts: 20,
  },
  {
    id: 3,
    author: {
      name: "Sarah Jenkins",
      title: "DevOps Specialist",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    time: "1d",
    content: "The recent updates to our CI/CD pipeline have reduced deployment times by 40%. Huge shoutout to the infrastructure team for making this happen.",
    likes: 210,
    comments: 34,
    reposts: 11,
  }
]

export function TimelineFeed() {
  return (
    <div className="flex flex-col gap-4">
      {/* Create Post Card */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 flex gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://i.pravatar.cc/150?u=current" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <button className="w-full text-left bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400 font-medium rounded-full py-3 px-5">
              Start a post
            </button>
          </div>
        </div>
        <div className="px-4 pb-3 flex justify-between items-center sm:px-8">
          <Button variant="ghost" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-500 rounded-md py-6 flex-1 sm:flex-none">
            <ImageIcon className="w-5 h-5 mr-2 text-blue-500" />
            <span className="hidden sm:inline">Media</span>
          </Button>
          <Button variant="ghost" className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 rounded-md py-6 flex-1 sm:flex-none">
            <Calendar className="w-5 h-5 mr-2 text-amber-500" />
            <span className="hidden sm:inline">Event</span>
          </Button>
          <Button variant="ghost" className="text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-500 rounded-md py-6 flex-1 sm:flex-none">
            <Newspaper className="w-5 h-5 mr-2 text-rose-500" />
            <span className="hidden sm:inline">Write article</span>
          </Button>
        </div>
      </div>

      <Separator className="my-2 bg-zinc-200 dark:bg-zinc-800 h-px w-full" />

      {/* Feed */}
      <div className="flex flex-col gap-4">
        {MOCK_POSTS.map((post) => (
          <div key={post.id} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            {/* Post Header */}
            <div className="p-4 flex gap-3 items-start justify-between">
              <div className="flex gap-3">
                <Avatar className="w-12 h-12 cursor-pointer">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">{post.author.name}</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{post.author.title}</span>
                  <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    <span>{post.time}</span>
                    <span className="mx-1">•</span>
                    <span className="bg-zinc-200 dark:bg-zinc-800 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">🌐</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-2 text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="w-full mt-2 bg-zinc-100 dark:bg-zinc-900">
                <img 
                  src={post.image} 
                  alt="Post attachment" 
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            )}

            {/* Post Stats */}
            <div className="px-4 py-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/50">
              <div className="flex items-center gap-1">
                <div className="bg-blue-500 rounded-full p-[2px] w-4 h-4 flex items-center justify-center">
                  <ThumbsUp className="w-2 h-2 text-white fill-current" />
                </div>
                <span>{post.likes}</span>
              </div>
              <div className="flex gap-3 hover:underline cursor-pointer">
                <span>{post.comments} comments</span>
                <span>•</span>
                <span>{post.reposts} reposts</span>
              </div>
            </div>

            {/* Post Actions */}
            <div className="px-2 py-1 flex items-center justify-between sm:justify-around text-zinc-600 dark:text-zinc-400 font-medium">
              <Button variant="ghost" className="flex-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 h-12 group transition-colors">
                <ThumbsUp className="w-5 h-5 mr-1 group-hover:-translate-y-[2px] group-hover:text-blue-500 transition-all" />
                <span className="hidden sm:inline">Like</span>
              </Button>
              <Button variant="ghost" className="flex-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 h-12">
                <MessageSquare className="w-5 h-5 mr-1" />
                <span className="hidden sm:inline">Comment</span>
              </Button>
              <Button variant="ghost" className="flex-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 h-12">
                <Repeat2 className="w-5 h-5 mr-1" />
                <span className="hidden sm:inline">Repost</span>
              </Button>
              <Button variant="ghost" className="flex-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 h-12">
                <Send className="w-5 h-5 mr-1 -rotate-45 relative top-[2px]" />
                <span className="hidden sm:inline">Send</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
