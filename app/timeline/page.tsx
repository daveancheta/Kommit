import Sidebar from '@/components/sidebar-provider'
import { TimelineFeed } from '@/components/timeline-feed'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark, Users, Square, Plus, TrendingUp, Bell, Puzzle } from "lucide-react"

export default function TimelinePage() {
  return (
    <Sidebar>
      <div className="flex justify-center max-w-7xl mx-auto w-full gap-6 px-4 md:px-8 py-6 pb-20">
        <aside className="hidden lg:flex flex-col gap-4 w-[240px] shrink-0 sticky top-6 h-fit">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="h-16 bg-linear-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 relative">
              <Avatar className="w-16 h-16 absolute -bottom-8 left-1/2 -translate-x-1/2 border-4 border-white dark:border-zinc-950">
                <AvatarImage src="https://i.pravatar.cc/150?u=current" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            </div>
            <div className="pt-10 pb-4 px-4 text-center">
              <h2 className="text-base font-semibold hover:underline cursor-pointer">Dave Ancheta</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Full Stack Developer | Building awesome things @ Kommit</p>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800/50 py-3">
              <div className="px-4 py-1 flex justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer text-xs font-semibold text-zinc-500">
                <span>Task</span>
                <span className="text-blue-600 dark:text-blue-400">42</span>
              </div>
              <div className="px-4 py-1 flex justify-between items-center hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer text-xs font-semibold text-zinc-500">
                <div className="flex items-center gap-1">
                  <span>Team</span>
                </div>
                <span className="text-blue-600 dark:text-blue-400">120</span>
              </div>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800/50 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer text-xs">
              <div className="flex items-center gap-2 font-medium">
                <Puzzle className="w-4 h-4 text-zinc-500" />
                <span>My Teams</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 max-w-[600px] w-full min-w-0">
          <TimelineFeed />
        </div>

        <aside className="hidden xl:flex flex-col gap-4 w-[300px] shrink-0 sticky top-6 h-fit">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold">Notifications</h2>
              <Bell className="w-4 h-4 text-zinc-500 cursor-pointer" />
            </div>

            <div className="flex flex-col gap-4">
              {[
                { message: "Dave Ancheta liked your post", time: "2 mins ago", is_read: false },
                { message: "Sarah Jenkins commented on your photo", time: "1 hour ago", is_read: true },
                { message: "Mike Ross started following you", time: "3 hours ago", is_read: true },
                { message: "Your team reported 3 new tasks", time: "1 day ago", is_read: true },
                { message: "Welcome to Kommit platform!", time: "2 days ago", is_read: true }
              ].map((n, i) => (
                <div key={i} className="flex gap-3 group cursor-pointer items-start">
                  <div className="mt-1 flex w-2 shrink-0 justify-center">
                    {!n.is_read ? (
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    )}
                  </div>
                  <div>
                    <h3 className={`text-sm leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 ${n.is_read ? "text-zinc-500 dark:text-zinc-400 font-medium" : "text-zinc-800 dark:text-zinc-200 font-semibold"}`}>
                      {n.message}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-2 group cursor-pointer inline-flex items-center gap-1">
              <span className="text-sm font-semibold text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300">View all</span>
              <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300" />
            </div>
          </div>
        </aside>

      </div>
    </Sidebar>
  )
}

function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
