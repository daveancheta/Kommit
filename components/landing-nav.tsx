'use client'
import React from 'react'

function LandingNav() {
    const scrollIntoView = (section: string) => {
        const element = document.getElementById(section)
        element?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <button className="hover:text-foreground" onClick={() => scrollIntoView("features")}>
                Features
            </button>
            <button className="hover:text-foreground" onClick={() => scrollIntoView("workflow")}>
                Workflow
            </button>
            <button className="hover:text-foreground" onClick={() => scrollIntoView("faq")}>
                FAQ
            </button>
        </nav>
    )
}

export default LandingNav