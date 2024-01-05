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
import { validateNewRuleset } from "../utils/utils"

// Import this dynamically to avoid hydration issues.
// https://github.com/react-hook-form/devtools/issues/187
const DevT: React.ElementType = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false }
)

interface RulesetsProps {
  rulesets: Ruleset[];
  setRulesets: React.Dispatch<React.SetStateAction<Ruleset[]>>;
}
export default function Rulesets({rulesets, setRulesets}: RulesetsProps) {
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [isSampleDataAdded, setIsSampleDataAdded] = useState(false)

  // https://github.com/shadcn/ui/issues/549
  // We are using the release candidate of Radix which let's us pass "" to reset the placeholder text.
  const form = useForm<Ruleset>({
    resolver: zodResolver(RulesetSchema),
    defaultValues: {
      name: "",
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      multiplier: 1,
    },
  })

  function onSubmit(newRuleset: Ruleset) {
    const { isValid, errorMessage } = validateNewRuleset(newRuleset, rulesets)

    if (!isValid) {
      setSubmissionError(
        errorMessage ?? "An unknown error occurred while adding the ruleset."
      )
      return
    }

    setSubmissionError(null)
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
    if (form.formState.isSubmitSuccessful && submissionError === null) {
      form.reset()
    }
  }, [form, form.formState, submissionError])

  return (
    <>
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Ruleset Name</TableHead>
            <TableHead>Applicable Day</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>multiplier</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rulesets.map((ruleset) => (
            <TableRow
              key={`${ruleset.name}-${ruleset.dayOfWeek}-${ruleset.multiplier}`}
            >
              <TableCell>{ruleset.name}</TableCell>
              <TableCell>{ruleset.dayOfWeek}</TableCell>
              <TableCell>{ruleset.startTime}</TableCell>
              <TableCell>{ruleset.endTime}</TableCell>
              <TableCell>{ruleset.multiplier}</TableCell>
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
                              placeholder="Select applicable day"
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
                name="multiplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Multiplier</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                        className="grid"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {submissionError && (
                <p className="col-span-full text-sm font-medium text-destructive">
                  {submissionError}
                </p>
              )}
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
