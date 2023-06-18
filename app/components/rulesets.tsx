"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  Icons 
} from "@/components/icons"

// Import this dynamically to avoid hydration issues.
// https://github.com/react-hook-form/devtools/issues/187
const DevT: React.ElementType = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false }
)

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
  multiplier: z
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
  const [isSampleDataAdded, setIsSampleDataAdded] = useState(false)
  const [selectedRuleset, setSelectedRuleset] = useState<Ruleset | null>(null);
  function handleRulesetEdit(index: number) {
    setSelectedRuleset(rulesets[index]);
  }
  // https://github.com/shadcn/ui/issues/549
  const form = useForm<z.infer<typeof rulesetSchema>>({
    resolver: zodResolver(rulesetSchema),
    defaultValues: {
      name: "",
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      multiplier: 0,
    },
  })
  const editForm = useForm<z.infer<typeof rulesetSchema>>({
    resolver: zodResolver(rulesetSchema)
  })

  function onSubmit(newRuleset: Ruleset) {
    console.log(newRuleset)
    setRulesets((rulesets) => [...rulesets, newRuleset])
  }

  function addSampleRuleset() {
    setIsSampleDataAdded(true)
    setRulesets((rulesets) => [
      ...rulesets,
      {
        name: "Normal Hours",
        dayOfWeek: "Monday",
        startTime: "9:00 AM",
        endTime: "5:00 PM",
        multiplier: 1.0,
      },
      {
        name: "Normal Hours",
        dayOfWeek: "Tuesday",
        startTime: "9:00 AM",
        endTime: "5:00 PM",
        multiplier: 1.0,
      },
      {
        name: "Normal Hours",
        dayOfWeek: "Wednesday",
        startTime: "9:00 AM",
        endTime: "5:00 PM",
        multiplier: 1.0,
      },
      {
        name: "Normal Hours",
        dayOfWeek: "Thursday",
        startTime: "9:00 AM",
        endTime: "5:00 PM",
        multiplier: 1.0,
      },
      {
        name: "Normal Hours",
        dayOfWeek: "Friday",
        startTime: "9:00 AM",
        endTime: "5:00 PM",
        multiplier: 1.0,
      },
      {
        name: "Weekend Hours",
        dayOfWeek: "Saturday",
        startTime: "9:00 AM",
        endTime: "5:00 PM",
        multiplier: 2.0,
      },
      {
        name: "Weekend Hours",
        dayOfWeek: "Sunday",
        startTime: "9:00 AM",
        endTime: "5:00 PM",
        multiplier: 2.0,
      },
    ])
  }

  function resetRulesets() {
    setIsSampleDataAdded(false)
    setRulesets([])
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      console.log("hello!")
      form.reset()
    }
  }, [form, form.formState])

  function deleteRuleset(index: number) {
    setRulesets((prevRulesets) => {
      const newRulesets = [...prevRulesets];
      newRulesets.splice(index, 1);
      return newRulesets;
    });
  }
  function editRuleset(newRuleset: Ruleset, currentRuleset: Ruleset, setRulesets: React.Dispatch<React.SetStateAction<Ruleset[]>>) {
    setRulesets((prevRulesets) => {
      const newRulesets = [...prevRulesets];
      const index = newRulesets.indexOf(currentRuleset);
      newRulesets[index] = newRuleset;
      return newRulesets;
    });
  }
// https://github.com/react-hook-form/react-hook-form/issues/2308 - Dont know how to handle default values not working
  function editRulesetForm(currentRuleset: Ruleset) {
    return <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit((values) => {
                console.log(values)
                editRuleset(values, currentRuleset, setRulesets);
              })}
              className="grid gap-4 sm:grid-cols-2 md:grid-cols-5"
            >
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ruleset Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="grid"
                        defaultValue={currentRuleset?.name}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="dayOfWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Applicable Days</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={currentRuleset?.dayOfWeek}
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
                control={editForm.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={currentRuleset?.startTime}
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
                control={editForm.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={currentRuleset?.endTime}
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
                control={editForm.control}
                name="multiplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Multiplier</FormLabel>
                    <FormControl>
                      <Input 
                      {...field}
                      className="grid"
                      defaultValue={currentRuleset?.multiplier} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="col-span-full mt-4">
                Save Changes
              </Button>
            </form>
            <DevT control={editForm.control} />
          </Form>
  }
  function blankRulesetForm() {
    return <Form {...form}>
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
                    <FormLabel>Applicable Days</FormLabel>
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
                name="multiplier"
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
            <DevT control={form.control} />
          </Form>
  }

  // TODO: Make the form items appear side-by-side.
  return (
    <>
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Ruleset Name</TableHead>
            <TableHead>Applicable Days</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Multiplier</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rulesets.map((ruleset, index) => (
            <TableRow
              key={`${ruleset.name}-${ruleset.dayOfWeek}-${ruleset.multiplier}`}
            >
              <TableCell>{ruleset.name}</TableCell>
              <TableCell>{ruleset.dayOfWeek}</TableCell>
              <TableCell>{ruleset.startTime}</TableCell>
              <TableCell>{ruleset.endTime}</TableCell>
              <TableCell>{ruleset.multiplier}</TableCell>
              <Dialog>
              <TableCell>
                  <DialogTrigger>
                    <Button variant="ghost" onClick={() => handleRulesetEdit(index)}>
                      <Icons.pencil className="h-4 w-4"/>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    {selectedRuleset && editRulesetForm(selectedRuleset)}
                  </DialogContent>
                
                <Button variant="ghost" onClick={() => deleteRuleset(index)}>
                  <Icons.xcircle className="h-4 w-4"/>
                </Button>
              </TableCell>
              </Dialog>
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
          {blankRulesetForm()}
        </CardContent>
      </Card>
    </>
  )
}
