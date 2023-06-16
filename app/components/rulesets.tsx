"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  name: z
    .string({
      required_error: "Ruleset name is required.",
    })
    .min(2, { message: "Ruleset name must be at least 2 characters." }),
  // TODO: Add validation for days of the week to be just Monday-Sunday.
  // TODO: Support multi-select. Not supported yet by shadcn, checkout https://github.com/shadcn/ui/issues/66.
  dayOfWeek: z.string({
    required_error: "Day of the week is required.",
  }),
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
  multipler: z
    .number({
      required_error: "Multiplier is required.",
    })
    .gt(0, { message: "Multiplier must be greater than 0." }),
})

export default function Rulesets() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a new ruleset</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ruleset Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Normal Hours" {...field} />
                  </FormControl>
                  <FormDescription>The name of your ruleset</FormDescription>
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
                          <SelectValue placeholder="Select a day of the week" />
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
                  <FormDescription>
                    The day of the week it is applicable (you can only select
                    one day right now)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add Ruleset</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
