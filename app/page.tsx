import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 py-6 md:pt-10">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          A simple TOIL calculator
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          Define rulesets for how your TOIL is calculated, calculate your TOIL
          and share it with anyone all through the URL.
        </p>
      </div>
    </section>
  )
}
