import * as z from "zod"

const baseEnterHoursSchema = z.object({
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

export const EnterHoursSchema = baseEnterHoursSchema
export type EnterHours = z.infer<typeof baseEnterHoursSchema>