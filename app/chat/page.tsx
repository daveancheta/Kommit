import Conversation from '@/components/conversation'
import CreateGroup from '@/components/create-group'
import Sidebar from '@/components/sidebar-provider'
import Teams from '@/components/team'

function page() {

    return (
        <Sidebar>
            <div className="flex h-[calc(100vh-2rem)] flex-col gap-4 overflow-hidden md:flex-row">
                <aside className="flex w-full flex-col overflow-hidden rounded-2xl border bg-background shadow-sm md:w-88 lg:w-96">
                    <header className="flex items-center justify-between gap-3 border-b px-4 py-3">
                        <div className="min-w-0">
                            <h1 className="truncate text-base font-semibold tracking-tight">Chats</h1>
                            <p className="truncate text-xs text-muted-foreground">Pick a group to start chatting.</p>
                        </div>
                        <CreateGroup />
                    </header>
                    <div className="scrollable-div flex-1 overflow-y-auto p-2">
                        <Teams />
                    </div>
                </aside>

                <main className="min-w-0 flex-1 overflow-hidden">
                    <Conversation />
                </main>
            </div>
        </Sidebar>
    )
}

export default page