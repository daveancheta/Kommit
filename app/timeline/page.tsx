import Sidebar from '@/components/sidebar-provider'
import { TimelineFeed } from '@/components/timeline-feed'
import { Bell } from "lucide-react"
import Profile from '@/components/profile'
import Notification from '@/components/notification'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Timeline",
};

export default function TimelinePage() {
  return (
    <Sidebar>
      <div className="flex justify-center max-w-7xl mx-auto w-full gap-6 px-4 md:px-8 py-6 pb-20">
        <aside className="hidden lg:flex flex-col gap-4 w-[240px] shrink-0 sticky top-6 h-fit">
         <Profile />
        </aside>

        <div className="flex-1 max-w-[600px] w-full min-w-0">
          <TimelineFeed />
        </div>

        <aside className="hidden xl:flex flex-col gap-4 w-[300px] shrink-0 sticky top-6 h-fit">
          <Notification />
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
