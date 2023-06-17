"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function EnterHoursForm() {

    const enterHoursSchema = z.object({
        // should we just give the DOW to them? maybe in a cute disabled button or something? 
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

    const form = useForm<z.infer<typeof enterHoursSchema>>({
        resolver: zodResolver(enterHoursSchema),
        defaultValues: {
            startTime: "",
            endTime: "",
        },
    })

    return (
        <>
            <Button className="col-span-full mt-4">
                Monday
            </Button>
            <Form {...form}>
                <form
                    className="grid grid-flow-row auto-rows-max gap-4"
                >
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
                </form>
            </Form>
        </>
    )
}