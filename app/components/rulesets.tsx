"use client"

import { useEffect, useState } from "react"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useForm } from "react-hook-form"
import * as z from "zod"

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

const rulesetSchema = z.object({
  name: z
    .string({
      required_error: "Ruleset name is required.",
    })
    .min(2, { message: "Ruleset name must be at least 2 characters." }),
  // TODO: Add validation for days of the week to be just Monday-Sunday.
  // TODO: Support multi-select. Not supported yet by shadcn, checkout https://github.com/shadcn/ui/issues/66.
  // IDEA: Make it a checkbox?
  dayOfWeek: z
    .string({
      required_error: "Day of the week is required.",
    })
    .min(1, { message: "Day of the week is required." }),
  startTime: z
    .string({
      required_error: "Start time is required.",
    })
    .regex(
      /^([1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
      "Start time must be in the format of HH:MM AM/PM"
    ),
  endTime: z
    .string({
      required_error: "End time is required.",
    })
    .regex(
      /^([1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
      "End time must be in the format of HH:MM AM/PM"
    ),
  // TODO: Add better support for converting string to number.
  multipler: z
    .string()
    .transform((value) => parseFloat(value))
    .pipe(
      z.number().gte(0, {
        message: "Multiplier must be a positive number.",
      })
    ),
})

export type Ruleset = z.infer<typeof rulesetSchema>

export default function Rulesets() {
  const [rulesets, setRulesets] = useState<Ruleset[]>([])

  // https://github.com/shadcn/ui/issues/549
  const form = useForm<z.infer<typeof rulesetSchema>>({
    resolver: zodResolver(rulesetSchema),
    defaultValues: {
      name: "",
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      multipler: 0,
    },
  })

  function onSubmit(newRuleset: Ruleset) {
    console.log(newRuleset)
    setRulesets((rulesets) => [...rulesets, newRuleset])
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      console.log("hello!")
      form.reset()
    }
  }, [form, form.formState])

  // TODO: Make the form items appear side-by-side.
  return (
    <>
      <pre>{JSON.stringify(rulesets, null, 2)}</pre>
      <DevTool control={form.control} />
      <Card>
        <CardHeader>
          <CardTitle>Add a new ruleset</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-flow-row auto-rows-max gap-4"
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
                    <FormLabel>Applicable Days</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                          <SelectItem value="Monday">Monday</SelectItem>
                          <SelectItem value="Tuesday">Tuesday</SelectItem>
                          <SelectItem value="Wednesday">Wednesday</SelectItem>
                          <SelectItem value="Thursday">Thursday</SelectItem>
                          <SelectItem value="Friday">Friday</SelectItem>
                          <SelectItem value="Saturday">Saturday</SelectItem>
                          <SelectItem value="Sunday">Sunday</SelectItem>
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
                            <SelectItem value="12:00 AM">12:00 AM</SelectItem>
                            <SelectItem value="12:30 AM">12:30 AM</SelectItem>
                            <SelectItem value="1:00 AM">1:00 AM</SelectItem>
                            <SelectItem value="1:30 AM">1:30 AM</SelectItem>
                            <SelectItem value="2:00 AM">2:00 AM</SelectItem>
                            <SelectItem value="2:30 AM">2:30 AM</SelectItem>
                            <SelectItem value="3:00 AM">3:00 AM</SelectItem>
                            <SelectItem value="3:30 AM">3:30 AM</SelectItem>
                            <SelectItem value="4:00 AM">4:00 AM</SelectItem>
                            <SelectItem value="4:30 AM">4:30 AM</SelectItem>
                            <SelectItem value="5:00 AM">5:00 AM</SelectItem>
                            <SelectItem value="5:30 AM">5:30 AM</SelectItem>
                            <SelectItem value="6:00 AM">6:00 AM</SelectItem>
                            <SelectItem value="6:30 AM">6:30 AM</SelectItem>
                            <SelectItem value="7:00 AM">7:00 AM</SelectItem>
                            <SelectItem value="7:30 AM">7:30 AM</SelectItem>
                            <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                            <SelectItem value="8:30 AM">8:30 AM</SelectItem>
                            <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                            <SelectItem value="9:30 AM">9:30 AM</SelectItem>
                            <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                            <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                            <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                            <SelectItem value="11:30 AM">11:30 AM</SelectItem>
                            <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                            <SelectItem value="12:30 PM">12:30 PM</SelectItem>
                            <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                            <SelectItem value="1:30 PM">1:30 PM</SelectItem>
                            <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                            <SelectItem value="2:30 PM">2:30 PM</SelectItem>
                            <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                            <SelectItem value="3:30 PM">3:30 PM</SelectItem>
                            <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                            <SelectItem value="4:30 PM">4:30 PM</SelectItem>
                            <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                            <SelectItem value="5:30 PM">5:30 PM</SelectItem>
                            <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                            <SelectItem value="6:30 PM">6:30 PM</SelectItem>
                            <SelectItem value="7:00 PM">7:00 PM</SelectItem>
                            <SelectItem value="7:30 PM">7:30 PM</SelectItem>
                            <SelectItem value="8:00 PM">8:00 PM</SelectItem>
                            <SelectItem value="8:30 PM">8:30 PM</SelectItem>
                            <SelectItem value="9:00 PM">9:00 PM</SelectItem>
                            <SelectItem value="9:30 PM">9:30 PM</SelectItem>
                            <SelectItem value="10:00 PM">10:00 PM</SelectItem>
                            <SelectItem value="10:30 PM">10:30 PM</SelectItem>
                            <SelectItem value="11:00 PM">11:00 PM</SelectItem>
                            <SelectItem value="11:30 PM">11:30 PM</SelectItem>
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
                            <SelectItem value="12:00 AM">12:00 AM</SelectItem>
                            <SelectItem value="12:30 AM">12:30 AM</SelectItem>
                            <SelectItem value="1:00 AM">1:00 AM</SelectItem>
                            <SelectItem value="1:30 AM">1:30 AM</SelectItem>
                            <SelectItem value="2:00 AM">2:00 AM</SelectItem>
                            <SelectItem value="2:30 AM">2:30 AM</SelectItem>
                            <SelectItem value="3:00 AM">3:00 AM</SelectItem>
                            <SelectItem value="3:30 AM">3:30 AM</SelectItem>
                            <SelectItem value="4:00 AM">4:00 AM</SelectItem>
                            <SelectItem value="4:30 AM">4:30 AM</SelectItem>
                            <SelectItem value="5:00 AM">5:00 AM</SelectItem>
                            <SelectItem value="5:30 AM">5:30 AM</SelectItem>
                            <SelectItem value="6:00 AM">6:00 AM</SelectItem>
                            <SelectItem value="6:30 AM">6:30 AM</SelectItem>
                            <SelectItem value="7:00 AM">7:00 AM</SelectItem>
                            <SelectItem value="7:30 AM">7:30 AM</SelectItem>
                            <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                            <SelectItem value="8:30 AM">8:30 AM</SelectItem>
                            <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                            <SelectItem value="9:30 AM">9:30 AM</SelectItem>
                            <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                            <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                            <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                            <SelectItem value="11:30 AM">11:30 AM</SelectItem>
                            <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                            <SelectItem value="12:30 PM">12:30 PM</SelectItem>
                            <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                            <SelectItem value="1:30 PM">1:30 PM</SelectItem>
                            <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                            <SelectItem value="2:30 PM">2:30 PM</SelectItem>
                            <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                            <SelectItem value="3:30 PM">3:30 PM</SelectItem>
                            <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                            <SelectItem value="4:30 PM">4:30 PM</SelectItem>
                            <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                            <SelectItem value="5:30 PM">5:30 PM</SelectItem>
                            <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                            <SelectItem value="6:30 PM">6:30 PM</SelectItem>
                            <SelectItem value="7:00 PM">7:00 PM</SelectItem>
                            <SelectItem value="7:30 PM">7:30 PM</SelectItem>
                            <SelectItem value="8:00 PM">8:00 PM</SelectItem>
                            <SelectItem value="8:30 PM">8:30 PM</SelectItem>
                            <SelectItem value="9:00 PM">9:00 PM</SelectItem>
                            <SelectItem value="9:30 PM">9:30 PM</SelectItem>
                            <SelectItem value="10:00 PM">10:00 PM</SelectItem>
                            <SelectItem value="10:30 PM">10:30 PM</SelectItem>
                            <SelectItem value="11:00 PM">11:00 PM</SelectItem>
                            <SelectItem value="11:30 PM">11:30 PM</SelectItem>
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
                      <Input placeholder="1.0" {...field} className="grid" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="col-span-full mt-4">
                Add Ruleset
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
