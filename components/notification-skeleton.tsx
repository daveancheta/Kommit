function NotificationSkeleton() {
    return (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <div className="h-4 w-28 rounded-md bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                <div className="h-4 w-4 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
            </div>

            <div className="flex flex-col gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-3 items-start">
                        <div className="mt-1 flex w-2 shrink-0 justify-center">
                            <div className={`rounded-full animate-pulse bg-zinc-200 dark:bg-zinc-700 ${i === 1 ? "w-2 h-2" : "w-1.5 h-1.5"}`} />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <div
                                className="h-3 rounded-md bg-zinc-200 dark:bg-zinc-700 animate-pulse"
                                style={{ width: `${[85, 70, 90, 65][i - 1]}%` }}
                            />
                            <div className="h-2.5 w-16 rounded-md bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-2 flex items-center gap-1">
                <div className="h-3 w-14 rounded-md bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                <div className="h-3 w-3 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
            </div>
        </div>
    )
}

export default NotificationSkeleton