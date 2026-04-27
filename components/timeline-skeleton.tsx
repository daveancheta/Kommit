function TimelineFeedSkeleton() {
    return (
        <div className="flex flex-col w-full max-w-3xl mx-auto font-sans">
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm mb-8">
                <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse shrink-0" />
                    <div className="flex-1 space-y-3">
                        <div className="h-[60px] w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse mt-2" />
                        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60 pt-3">
                            <div className="h-8 w-24 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                            <div className="h-8 w-20 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative pl-6 sm:pl-10 ml-4 sm:ml-6 space-y-8 pb-10">
                <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-linear-to-b from-zinc-200 via-zinc-200 to-transparent dark:from-zinc-800 dark:via-zinc-800 dark:to-transparent" />

                {[1, 2, 3].map((i) => (
                    <div key={i} className="relative">
                        <div className="absolute -left-[2.1rem] sm:-left-13 top-0 bg-white dark:bg-zinc-950 p-1 rounded-full z-10 border-2 border-zinc-100 dark:border-zinc-900 shadow-sm">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                        </div>

                        <div className="bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex flex-col gap-1.5">
                                    <div className="h-3.5 w-32 rounded-md bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                                    <div className="h-3 w-24 rounded-md bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                </div>
                                <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                            </div>
                            <div className="space-y-2 mb-4">
                                <div className="h-3 w-full rounded-md bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                <div className="h-3 w-5/6 rounded-md bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                <div className="h-3 w-4/6 rounded-md bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                            </div>

                            {i === 1 && (
                                <div className="h-48 w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TimelineFeedSkeleton