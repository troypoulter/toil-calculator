import * as z from "zod"
import { DAYS_OF_WEEK, TIME_OF_DAY_REGEX } from "../utils/constants"

// To perform validations on startTime and endTime, we need to create a separate schema.
// This is because zod does not support cross-field validations.
// See https://github.com/colinhacks/zod/issues/479#issuecomment-1536233005.
const rulesetDateSchema = z
  .object({
    startTime: z
      .string({
        required_error: "Start time is required.",
      })
      .regex(
        TIME_OF_DAY_REGEX,
        "Start time must be in the format of HH:MM AM/PM"
      ),
    endTime: z
      .string({
        required_error: "End time is required.",
      })
      .regex(
        TIME_OF_DAY_REGEX,
        "End time must be in the format of HH:MM AM/PM"
      ),
  })
  .refine(
    (data) => {
      const startTimeDate = new Date(`2000/01/01 ${data.startTime}`)
      const endTimeDate = new Date(`2000/01/01 ${data.endTime}`)

      return endTimeDate > startTimeDate
    },
    {
      message: "End time must be after start time.",
      path: ["endTime"],
    }
  )

const baseRulesetSchema = z.object({
  name: z
    .string({
      required_error: "Ruleset name is required.",
    })
    .min(2, { message: "Ruleset name must be at least 2 characters." }),
  // TODO: Support multi-select. Not supported yet by shadcn, checkout https://github.com/shadcn/ui/issues/66.
  // IDEA: Make it a checkbox?
  dayOfWeek: z
  .string({
    required_error: "Day of the week is required.",
  })
  .refine((value) => DAYS_OF_WEEK.includes(value), {
    message: "Day of the week must be a valid day.",
    }),
  multiplier: z
  .union([z.number(), z.string()])
  .transform((value) => (typeof value === "string" ? Number(value) : value))
})

export const RulesetSchema = baseRulesetSchema.and(rulesetDateSchema)

export type Ruleset = z.infer<typeof RulesetSchema>