"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { zodResolver } from "@hookform/resolvers/zod"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Ruleset, RulesetSchema } from "../interfaces/Ruleset"
import {
  DAYS_OF_WEEK,
  SAMPLE_RULESETS,
  TIME_OF_DAY_INCREMENTS,
} from "../utils/constants"

// Import this dynamically to avoid hydration issues.
// https://github.com/react-hook-form/devtools/issues/187
const DevT: React.ElementType = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false }
)

export default function Rulesets() {
  const [rulesets, setRulesets] = useState<Ruleset[]>([])
  const [isSampleDataAdded, setIsSampleDataAdded] = useState(false)

  // https://github.com/shadcn/ui/issues/549
  const form = useForm<Ruleset>({
    resolver: zodResolver(RulesetSchema),
    defaultValues: {
      name: "",
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      multipler: 1,
    },
  })

  function onSubmit(newRuleset: Ruleset) {
    setRulesets((rulesets) => [...rulesets, newRuleset])
  }

  function addSampleRuleset() {
    setIsSampleDataAdded(true)
    setRulesets((rulesets) => [...rulesets, ...SAMPLE_RULESETS])
  }

  function resetRulesets() {
    setIsSampleDataAdded(false)
    setRulesets([])
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset()
    }
  }, [form, form.formState])

  return (
    <>
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Ruleset Name</TableHead>
            <TableHead>Applicable Day</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Multipler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rulesets.map((ruleset) => (
            <TableRow
              key={`${ruleset.name}-${ruleset.dayOfWeek}-${ruleset.multipler}`}
            >
              <TableCell>{ruleset.name}</TableCell>
              <TableCell>{ruleset.dayOfWeek}</TableCell>
              <TableCell>{ruleset.startTime}</TableCell>
              <TableCell>{ruleset.endTime}</TableCell>
              <TableCell>{ruleset.multipler}</TableCell>
            </TableRow>
          ))}
          {rulesets.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No rulesets added yet, you can add them below.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Button
        onClick={addSampleRuleset}
        variant="secondary"
        className="col-span-full mt-2 w-full"
        disabled={isSampleDataAdded}
      >
        Add Sample Data
      </Button>
      <Button
        onClick={resetRulesets}
        variant="outline"
        className="col-span-full mb-8 mt-2 w-full"
      >
        Remove Rulesets
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Add a new ruleset</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 sm:grid-cols-2 md:grid-cols-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ruleset Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Normal Hours"
                        {...field}
                        className="grid"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dayOfWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Applicable Day</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        {...field}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Select a day of the week"
                              className="grid"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DAYS_OF_WEEK.map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        {...field}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Select a start time"
                              className="grid"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <ScrollArea className="h-[300px]">
                            {TIME_OF_DAY_INCREMENTS.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        {...field}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Select an end time"
                              className="grid"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <ScrollArea className="h-[300px]">
                            {TIME_OF_DAY_INCREMENTS.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="multipler"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Multiplier</FormLabel>
                    <FormControl>
                      <Input placeholder="1" {...field} className="grid" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="col-span-full mt-4">
                Add Ruleset
              </Button>
            </form>
            <DevT control={form.control} />
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
