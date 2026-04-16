"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  Image as ImageIcon, 
  Code,
  Paperclip,
  MessageSquare,
  Sparkles,
  Share,
  MoreVertical
} from "lucide-react"

const MOCK_POSTS = [
  {
    id: 1,
    author: {
      name: "Jane Doe",
      title: "Frontend Engineer",
      avatar: "https://i.pravatar.cc/150?u=jane",
    },
    time: "2 hours ago",
    content: "Just finished building the new timeline feature for our platform! Super excited to see how it improves team collaboration. 🚀",
    tags: ["feature", "frontend"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    likes: 24,
    comments: 3,
  },
  {
    id: 2,
    author: {
      name: "Alex Smith",
      title: "Product Manager",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    time: "5 hours ago",
    content: "Design mockups for the new dashboard are ready for review. Please leave your feedback in the Figma file.",
    tags: ["design", "review"],
    likes: 12,
    comments: 8,
  },
  {
    id: 3,
    author: {
      name: "Sarah Jenkins",
      title: "DevOps",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    time: "Yesterday",
    content: "The recent updates to our CI/CD pipeline have reduced deployment times by 40%. Huge shoutout to the infrastructure team for making this happen.",
    tags: ["infrastructure", "milestone"],
    likes: 45,
    comments: 11,
  }
]

export function TimelineFeed() {
  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto font-sans">
      {/* Create Post Section */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm mb-8">
        <div className="flex gap-4 items-start">
          <Avatar className="w-10 h-10 ring-2 ring-zinc-50 dark:ring-zinc-900">
            <AvatarImage src="https://i.pravatar.cc/150?u=current" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <textarea 
              placeholder="Share an update, snippet, or idea..." 
              className="w-full bg-transparent resize-none outline-none text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 mt-2 min-h-[60px]"
            />
            <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60 pt-3">
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-full">
                  <Code className="w-4 h-4 mr-2" />
                  Snippet
                </Button>
                <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-full">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Image
                </Button>
                <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-full">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach
                </Button>
              </div>
              <Button className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 rounded-full px-6">
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Feed */}
      <div className="relative pl-6 sm:pl-10 ml-4 sm:ml-6 space-y-8 pb-10">
        {/* Continuous downward line */}
        <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-zinc-200 via-zinc-200 to-transparent dark:from-zinc-800 dark:via-zinc-800 dark:to-transparent" />

        {MOCK_POSTS.map((post) => (
          <div key={post.id} className="relative group">
            {/* Timeline Node & Avatar */}
            <div className="absolute -left-[2.1rem] sm:-left-[3.25rem] top-0 bg-white dark:bg-zinc-950 p-1 rounded-full z-10 border-2 border-zinc-100 dark:border-zinc-900 shadow-sm transition-transform group-hover:scale-110">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>

            {/* Post Card */}
            <div className="bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{post.author.name}</span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">• {post.time}</span>
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{post.author.title}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-700 bg-transparent rounded-full -mt-2 -mr-2">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              {/* Tags */}
              {post.tags && (
                <div className="flex gap-2 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-medium uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Content */}
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 whitespace-pre-wrap">
                {post.content}
              </p>

              {/* Attached Image */}
              {post.image && (
                <div className="mb-4 overflow-hidden rounded-xl border border-zinc-100 dark:border-zinc-800/80">
                  <img 
                    src={post.image} 
                    alt="attachment" 
                    className="w-full h-auto max-h-[350px] object-cover hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              )}

              {/* Footer / Actions */}
              <div className="flex items-center gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
                <button className="flex items-center gap-1.5 text-zinc-500 hover:text-blue-500 transition-colors group/btn">
                  <div className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50 group-hover/btn:bg-blue-100 dark:group-hover/btn:bg-blue-900/30">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-zinc-500 hover:text-emerald-500 transition-colors group/btn">
                  <div className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50 group-hover/btn:bg-emerald-100 dark:group-hover/btn:bg-emerald-900/30">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group/btn ml-auto">
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
