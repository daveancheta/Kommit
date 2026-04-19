import arcjet, { detectBot } from "@arcjet/next";
import { isSpoofedBot } from "@arcjet/inspect";
import { NextRequest, NextResponse } from "next/server";

export const aj = arcjet({
    key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
    rules: [
        detectBot({
            mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
            // Block all bots except the following
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                // Uncomment to allow these other common bot categories
                // See the full list at https://arcjet.com/bot-list
                //"CATEGORY:MONITOR", // Uptime monitoring services
                //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
            ],
        }),
    ],
});

export async function middleware(req: NextRequest) {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
        if (decision.reason.isBot()) {
            return NextResponse.json(
                { error: "No bots allowed", reason: decision.reason },
                { status: 403 },
            );
        } else {
            return NextResponse.json(
                { error: "Forbidden", reason: decision.reason },
                { status: 403 },
            );
        }
    }
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
