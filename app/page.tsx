"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Rulesets from "./components/rulesets"
import EnterHoursWorked from "./components/enter-hours"
import CalculateTime from "./components/calculate-time"
import CalculateLeave from "./components/calculate-leave"
import { EnterHours } from "./interfaces/EnterHours"
import { Ruleset } from "./interfaces/Ruleset"
import { useState } from "react"
import TypeIt from "typeit-react"

export default function IndexPage() {
  const [rulesets, setRulesets] = useState<Ruleset[]>([]);
  const [hoursWorked, setHoursWorked] = useState<EnterHours[]>([]);
  const [totalTOILHours, setTotalTOILHours] = useState(0);

  return (
    <section className="container grid items-center gap-6 py-6 md:pt-10">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          A simple TOIL calculator
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl"><TypeIt options={{
          speed: 40,
          lifeLike: true,
          waitUntilVisible: true,
        }}>
          Define rulesets for how your TOIL is calculated, calculate your TOIL and share it with anyone all through the URL
        </TypeIt></p>


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
          <Rulesets rulesets={rulesets} setRulesets={setRulesets}/>
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
          <EnterHoursWorked hoursWorked={hoursWorked} setHoursWorked={setHoursWorked}/>
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
          <div className="grid grid-cols-2 gap-4">
            <div>          
              <CalculateTime rulesets={rulesets} hoursWorked={hoursWorked} setTotalTOILHours={setTotalTOILHours} />
            </div>
            <div><CalculateLeave totalToilHours={totalTOILHours} /></div>
          </div>
        </CardContent>
      </Card>
    </section >
  )
}
