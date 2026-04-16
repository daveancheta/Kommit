"use client"

import React, { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Image as ImageIcon,
  Code,
  Paperclip,
  MessageSquare,
  Sparkles,
  Share,
  MoreVertical,
  Trash2,
  Edit2,
  Link2,
  Flag,
  Loader2
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UseAuthStore } from "@/app/state/use-auth-store"
import { useInitials } from "@/hooks/use-initials"
import { UsePostStore } from "@/app/state/use-post-store"
import { formatDistance } from "date-fns"
import { supabase } from "@/lib/supbase/cient"

export function TimelineFeed() {
  const { handleGetSession, auth } = UseAuthStore()
  const getInitials = useInitials()
  const { handleCreatePostValidation, isSubmitting, handleGetAllPost, posts, isLoading, handleDeletePost } = UsePostStore()
  const [content, setContent] = useState<string>("")
  const [image, setImage] = useState<any>()
  const fileRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null) 

  useEffect(() => {
    handleGetAllPost(true)
  }, [handleGetAllPost])

  useEffect(() => {
    handleGetSession()
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('user:post')
      .on('postgres_changes',
        {
          event: "*",
          schema: "public",
          table: "post"
        },
        async (payload) => {
          handleGetAllPost(false)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const handleCreatePost = (e: any) => {
    e.preventDefault()

    handleCreatePostValidation(content, image)
  }

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto font-sans">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm mb-8">
        <div className="flex gap-4 items-start">
          <Avatar className="w-10 h-10 ring-2 ring-zinc-50 dark:ring-zinc-900">
            {auth?.image && auth.image.length > 0
              ? <AvatarImage src={auth?.image} />
              : <AvatarFallback>{getInitials(auth?.name)}</AvatarFallback>
            }
          </Avatar>
          <form className="flex-1 space-y-3" onSubmit={handleCreatePost}>
            <textarea
              placeholder="Share an update, snippet, or idea..."
              className="w-full bg-transparent resize-none outline-none text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 mt-2 min-h-[60px] scrollable-div"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            {imagePreview && (
              <div className="relative mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-60 object-cover rounded-xl border border-zinc-200 dark:border-zinc-800"
                />

                <button
                  type="button"
                  onClick={() => {
                    setImage(null)
                    setImagePreview(null)
                  }}
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full px-2 py-1 text-xs hover:bg-black"
                >
                  ✕
                </button>
              </div>
            )}
            <input ref={fileRef} className="hidden" type="file" accept="image/*" onChange={(e) => {
              const selected = e.target.files?.[0]
              if (selected) {
                setImage(selected)
                setImagePreview(URL.createObjectURL(selected))
              }
            }}
            />
            <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60 pt-3">
              <div className="flex gap-1">
                <Button type="button" variant="ghost" size="sm" className="text-zinc-500 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-full"
                  onClick={() => fileRef.current?.click()}>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Image
                </Button>
              </div>
              <Button disabled={!content.trim() || isSubmitting} className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 rounded-full px-6">
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="relative pl-6 sm:pl-10 ml-4 sm:ml-6 space-y-8 pb-10">
        <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-linear-to-b from-zinc-200 via-zinc-200 to-transparent dark:from-zinc-800 dark:via-zinc-800 dark:to-transparent" />

        {posts.map((post) => (
          <div key={post.id} className="relative group">
            <div className="absolute -left-[2.1rem] sm:-left-13 top-0 bg-white dark:bg-zinc-950 p-1 rounded-full z-10 border-2 border-zinc-100 dark:border-zinc-900 shadow-sm transition-transform group-hover:scale-110">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                {post.user.image
                  ? <AvatarImage src={post.user.image} />
                  : <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                }
              </Avatar>
            </div>

            <div className="bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{post.user.name}</span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">•
                      {formatDistance(new Date(post.created_at), new Date(), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Software Engineer</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 bg-transparent rounded-full -mt-2 -mr-2 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-1"
                  >
                    <DropdownMenuLabel className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-2 pb-1">
                      Post Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="flex items-center gap-2.5 px-2 py-2 text-sm text-zinc-700 dark:text-zinc-300 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800">
                      <Edit2 className="w-3.5 h-3.5 text-zinc-500" />
                      Edit post
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2.5 px-2 py-2 text-sm text-zinc-700 dark:text-zinc-300 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800">
                      <Link2 className="w-3.5 h-3.5 text-zinc-500" />
                      Copy link
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2.5 px-2 py-2 text-sm text-zinc-700 dark:text-zinc-300 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800">
                      <Flag className="w-3.5 h-3.5 text-zinc-500" />
                      Report
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1 border-zinc-100 dark:border-zinc-800" />
                    {auth?.id === post.user_id &&
                      <DropdownMenuItem className="flex items-center gap-2.5 px-2 py-2 text-sm text-red-500 rounded-lg cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30 focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-500"
                        onClick={() => handleDeletePost(post.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete post
                      </DropdownMenuItem>
                    }
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 whitespace-pre-wrap">
                {post.content}
              </p>

              {post.image && (
                <div className="mb-4 overflow-hidden rounded-xl border border-zinc-100 dark:border-zinc-800/80">
                  <img
                    src={post.image}
                    alt="attachment"
                    className="w-full h-auto max-h-[350px] object-cover hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
