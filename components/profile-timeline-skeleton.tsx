function ProfileSkeleton() {
    return (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="h-16 bg-zinc-100 dark:bg-zinc-800 animate-pulse relative">
                <div className="w-16 h-16 rounded-full absolute -bottom-8 left-1/2 -translate-x-1/2 border-4 border-white dark:border-zinc-950 bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
            </div>

            <div className="pt-10 pb-4 px-4 flex flex-col items-center gap-2">
                <div className="h-4 w-32 rounded-md bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                <div className="h-3 w-48 rounded-md bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800/50 py-3">
                {['Task', 'Team'].map((label) => (
                    <div
                        key={label}
                        className="px-4 py-1 flex justify-between items-center"
                    >
                        <div className="h-3 w-10 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                        <div className="h-3 w-5 rounded bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                    </div>
                ))}
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800/50 p-3 flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
            </div>
        </div>
    )
}

export default ProfileSkeleton