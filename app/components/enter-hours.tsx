"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarDays } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { validateHours } from "../utils/utils"
import { TIME_OF_DAY_INCREMENTS } from "../utils/constants"


const enterHoursSchema = z.object({
    date: z
        .date({
            required_error: "A date is required.",
        }),
    startTime: z
        .string({
            required_error: "We need to know when you started work to calculate your TOIL",
        })
        .regex(
            /^([1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
            "Start time must be in the format of HH:MM AM/PM"
        ),
    endTime: z
        .string({
            required_error: "We need to know when you ended work to calculate your TOIL",
        })
        .regex(
            /^([1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
            "End time must be in the format of HH:MM AM/PM"
        )
})

export type EnterHours = z.infer<typeof enterHoursSchema>

export default function EnterHours() {

    const [hoursWorked, setHoursWorked] = useState<EnterHours[]>([])
    const [submissionError, setSubmissionError] = useState<string | null>(null)

    function removeHoursWorked() {
        setHoursWorked([])
    }

    const form = useForm<z.infer<typeof enterHoursSchema>>({
        resolver: zodResolver(enterHoursSchema),
        defaultValues: {
            date: undefined,
            startTime: "",
            endTime: "",
        },
    })

    function onSubmit(newHoursWorked: EnterHours) {
        const { isValid, errorMessage } = validateHours(newHoursWorked, hoursWorked)

        if (!isValid) {
            setSubmissionError(
                errorMessage ?? "An unknown error occurred validating your hours."
            )
            return
        }

        setSubmissionError(null)
        setHoursWorked((hoursWorked) => [...hoursWorked, newHoursWorked])
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
                        <TableHead>Date Worked</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>End Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {hoursWorked.map((hoursWorked) => (
                        <TableRow
                            key={`${hoursWorked.date}-${hoursWorked.startTime}`}
                        >
                            <TableCell>{hoursWorked.date.toLocaleDateString("en-GB", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}</TableCell>
                            <TableCell>{hoursWorked.startTime}</TableCell>
                            <TableCell>{hoursWorked.endTime}</TableCell>
                        </TableRow>
                    ))}
                    {hoursWorked.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                Enter your TOIL hours
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Button
                onClick={removeHoursWorked}
                variant="outline"
                className="col-span-full mb-8 mt-2 w-full"
            >
                Remove Your TOIL Hours
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle>Enter the time you worked per day</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid gap-4 sm:grid-cols-3 md:grid-cols-3"
                        >
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col space-y-4">
                                        <FormLabel>Date worked</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
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
                                                            placeholder="Select a start time when you began work"
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
                                                            placeholder="Select an end time when you finished work"
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
                            {submissionError && (
                                <p className="col-span-full text-sm font-medium text-destructive">
                                    {submissionError}
                                </p>
                            )}
                            <Button type="submit" className="col-span-full mt-4">
                                Add Work Day
                            </Button>
                        </form>
                    </Form>
                </CardContent >
            </Card >
        </>
    )
}