import Sidebar from '@/components/sidebar-provider'
import { TimelineFeed } from '@/components/timeline-feed'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark, Users, Square, Plus, TrendingUp, Info } from "lucide-react"

export default function TimelinePage() {
  return (
    <Sidebar>
      <div className="flex justify-center max-w-7xl mx-auto w-full gap-6 px-4 md:px-8 py-6 pb-20">
        
        {/* Left Column - Profile & Navigation (Hidden on small screens) */}
        <aside className="hidden lg:flex flex-col gap-4 w-[240px] shrink-0 sticky top-6 h-fit">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="h-16 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 relative">
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
                <span>Profile viewers</span>
                <span className="text-blue-600 dark:text-blue-400">42</span>
              </div>
              <div className="px-4 py-1 flex justify-between items-center hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer text-xs font-semibold text-zinc-500">
                <div className="flex items-center gap-1">
                  <span>Connections</span>
                </div>
                <span className="text-blue-600 dark:text-blue-400">120</span>
              </div>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800/50 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer text-xs">
              <div className="flex items-center gap-2 font-medium">
                <Bookmark className="w-4 h-4 text-zinc-500" />
                <span>My items</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm top-sticky text-xs">
            <div className="flex flex-col gap-3">
              <div className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer">Groups</div>
              <div className="flex items-center justify-between group cursor-pointer">
                <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">Events</span>
                <Plus className="w-4 h-4 text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300" />
              </div>
              <div className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer">Followed Hashtags</div>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/50 text-zinc-500 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 text-center cursor-pointer rounded-md">
              Discover more
            </div>
          </div>
        </aside>

        {/* Center Column - Main Feed */}
        <div className="flex-1 max-w-[600px] w-full min-w-0">
          <TimelineFeed />
        </div>

        {/* Right Column - Trending & Suggestions (Hidden on med/small screens) */}
        <aside className="hidden xl:flex flex-col gap-4 w-[300px] shrink-0 sticky top-6 h-fit">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold">Kommit News</h2>
              <Info className="w-4 h-4 text-zinc-500 cursor-pointer" />
            </div>
            
            <div className="flex flex-col gap-4">
              {[
                { title: "The future of remote work in 2026", time: "Top news • 10,234 readers" },
                { title: "React 19 adoption skyrocketing", time: "2h ago • 5,420 readers" },
                { title: "Kommit introduces Timeline feature", time: "5h ago • 8,912 readers" },
                { title: "How to master TypeScript generics", time: "1d ago • 3,211 readers" },
                { title: "UI/UX trends to watch", time: "2d ago • 6,543 readers" }
              ].map((news, i) => (
                <div key={i} className="flex gap-2 group cursor-pointer">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 group-hover:bg-blue-500 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-tight text-zinc-800 dark:text-zinc-200">{news.title}</h3>
                    <p className="text-xs text-zinc-500 mt-1">{news.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-2 group cursor-pointer inline-flex items-center gap-1">
              <span className="text-sm font-semibold text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300">Show more</span>
              <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300" />
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center">
            <div className="text-xs text-zinc-500 flex justify-end mb-2">Ad •••</div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">Dave, unlock your full potential with Kommit Premium</p>
            <div className="flex justify-center gap-3 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://i.pravatar.cc/150?u=current" />
              </Avatar>
              <div className="w-12 h-12 rounded-md bg-amber-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <p className="text-sm text-zinc-800 dark:text-zinc-200 mb-4">See who's viewed your profile in the last 90 days</p>
            <button className="border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
              Try for free
            </button>
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
