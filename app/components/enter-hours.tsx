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
import EnterHoursForm from "./enter-hours-form"

export default function EnterHours() {

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Enter the time you worked per day</CardTitle>
                </CardHeader>
                <CardContent>
                    <EnterHoursForm />
                    <EnterHoursForm />
                </CardContent >
            </Card >
        </>
    )
}