"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Rulesets from "./components/rulesets"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 py-6 md:pt-10">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          A simple TOIL calculator
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          Define rulesets for how your TOIL is calculated, calculate your TOIL
          and share it with anyone all through the URL
        </p>
      </div>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>1. Add your rulesets</CardTitle>
          <CardDescription>
            Create rulesets which define what multiplier you get based on the
            day and time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Rulesets />
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>2. Enter your hours</CardTitle>
          <CardDescription>
            Add in your hours worked for a given week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Add time here</p>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>3. Summary</CardTitle>
          <CardDescription>
            Review the total hours applicable after combining your rulesets and
            hours worked
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold">Your total TOIL: 10 hours</div>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Here&apos;s the math:
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
