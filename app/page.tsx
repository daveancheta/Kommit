import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import LandingNav from "@/components/landing-nav";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/chat");

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex size-8 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-border">
              <Sparkles className="size-4 text-primary" />
            </span>
            <span className="text-sm font-semibold tracking-wide">Kommit</span>
          </Link>

         <LandingNav />

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login" target="_blank">Log in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/signup" target="_blank">
                Get started <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-20%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-linear-to-r from-primary/18 via-purple-500/10 to-cyan-400/10 blur-3xl" />
          <div className="absolute bottom-[-28%] left-[-10%] h-[420px] w-[520px] rounded-full bg-linear-to-r from-emerald-400/10 to-primary/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-primary" />
              Built for teams who ship weekly
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              Plan, chat, and execute—without losing context.
            </h1>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Kommit keeps tasks, team chat, and meetings connected so your work stays
              organized from kickoff to delivery.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/signup">
                  Create your workspace <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/login">I already have an account</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" /> Fast setup
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" /> Real-time chat
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" /> Team-ready
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border/60 bg-card/40 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Today</p>
                  <p className="text-xs text-muted-foreground">
                    One place for tasks, chat, and meetings
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary ring-1 ring-border">
                  Live
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-border">
                      <Users className="size-4 text-primary" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">Sprint planning</p>
                      <p className="truncate text-xs text-muted-foreground">
                        Assign owners and set deadlines
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarClock className="size-3.5" />
                    Due Fri · 6 tasks
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-border">
                      <MessagesSquare className="size-4 text-primary" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">Team chat</p>
                      <p className="truncate text-xs text-muted-foreground">
                        Decisions stay attached to the work
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Spec locked", "Blocked?", "Ship today"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-6 -right-6 -z-10 size-40 rounded-full bg-primary/10 blur-2xl" />
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-14 scroll-mt-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Everything your team needs to stay aligned
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
              Keep planning, communication, and execution in one system—so you spend less time
              switching tabs and more time shipping.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Teams & workspaces",
              desc: "Organize projects by team so permissions and context stay clean.",
            },
            {
              icon: MessagesSquare,
              title: "Chat tied to work",
              desc: "Conversations live next to tasks, not buried in random channels.",
            },
            {
              icon: CalendarClock,
              title: "Meetings that convert",
              desc: "Jump from discussion to action items without losing momentum.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-3xl border border-border/60 bg-card/40 p-6 shadow-sm"
            >
              <div className="inline-flex size-10 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-border">
                <Icon className="size-5 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="border-y border-border/60 bg-muted/10 scroll-mt-5">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            A simple workflow that scales
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Start lightweight, then add structure only where you need it.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create a team",
                desc: "Invite teammates and set up your workspace in minutes.",
              },
              {
                step: "02",
                title: "Plan the work",
                desc: "Group tasks, define owners, and agree on the definition of done.",
              },
              {
                step: "03",
                title: "Ship with clarity",
                desc: "Chat, meet, and execute—with decisions captured where the work lives.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-3xl border border-border/60 bg-background/40 p-6"
              >
                <p className="text-xs font-semibold text-muted-foreground">STEP {s.step}</p>
                <h3 className="mt-2 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-border/60 bg-background/40 p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold">Ready to try Kommit?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Create an account and start organizing your system today.
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline">
                  <Link href="/login" target="_blank">Log in</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup" target="_blank">
                    Get started <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-border/60 scroll-mt-5">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">FAQ</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Can I use it solo?",
                a: "Yes. Start with a single workspace and invite teammates later.",
              },
              {
                q: "Do I need to set up everything up front?",
                a: "No. Kommit works with minimal structure and grows with your process.",
              },
              {
                q: "Where do I log in?",
                a: "Use the Log in button at the top, or go directly to /login.",
              },
              {
                q: "Is it dark-mode friendly?",
                a: "Yep—your app is already configured for a dark UI by default.",
              },
            ].map((f) => (
              <div
                key={f.q}
                className="rounded-3xl border border-border/60 bg-background/40 p-6"
              >
                <p className="text-sm font-semibold">{f.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>

          <footer className="mt-12 flex flex-col gap-4 border-t border-border/60 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Kommit. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login" target="_blank">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup" target="_blank">
                  Get started <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
