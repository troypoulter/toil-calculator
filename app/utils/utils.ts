import { EnterHours } from "../components/enter-hours";
import { Ruleset } from "../interfaces/Ruleset";

export function validateNewRuleset(newRuleset: Ruleset, rulesets: Ruleset[]): { isValid: boolean, errorMessage?: string } {
  // Validate overlapping time period
  const overlaps = rulesets.some((existingRuleset) => {
    const newStart = new Date(`2000/01/01 ${newRuleset.startTime}`);
    const newEnd = new Date(`2000/01/01 ${newRuleset.endTime}`);
    const existingStart = new Date(`2000/01/01 ${existingRuleset.startTime}`);
    const existingEnd = new Date(`2000/01/01 ${existingRuleset.endTime}`);

    return (
      newRuleset.dayOfWeek === existingRuleset.dayOfWeek &&
      newStart < existingEnd &&
      newEnd > existingStart
    );
  });

  if (overlaps) {
    return { isValid: false, errorMessage: 'The new ruleset overlaps with an existing ruleset.' };
  }

  // Validate exact match
  const exactMatch = rulesets.some((existingRuleset) => {
    return (
      newRuleset.dayOfWeek === existingRuleset.dayOfWeek &&
      newRuleset.startTime === existingRuleset.startTime &&
      newRuleset.endTime === existingRuleset.endTime
    );
  });

  if (exactMatch) {
    return { isValid: false, errorMessage: 'The new ruleset exactly matches an existing ruleset.' };
  }

  return { isValid: true };
}
export function validateHours(newHoursWorked: EnterHours, hoursWorked: EnterHours[]): { isValid: boolean, errorMessage?: string } {

  if (newHoursWorked.startTime == newHoursWorked.endTime) {
    return { isValid: false, errorMessage: 'Start time and end time cannot be the same.' };
  }

  if (newHoursWorked.startTime > newHoursWorked.endTime) {
    return { isValid: false, errorMessage: 'End time cannot be before start time.' };
  }

  // Validate overlapping time period
  const overlappingHours = hoursWorked.some((existingHours) => {
    const newHoursStart = newHoursWorked.startTime;
    const newHoursEnd = newHoursWorked.endTime;
    const existingHoursStart = existingHours.startTime;
    const existingHoursEnd = existingHours.endTime;

    return (
      newHoursWorked.date === existingHours.date &&
      newHoursStart < existingHoursEnd &&
      newHoursEnd > existingHoursEnd
    );
  });

  const exactMatch = hoursWorked.some((existingHours) => {
    return (
      newHoursWorked.date === existingHours.date &&
      newHoursWorked.startTime === existingHours.startTime &&
      newHoursWorked.endTime === existingHours.endTime
    );
  })

  if (exactMatch) {
    return { isValid: false, errorMessage: 'The inputted hours exactly matches an hours you have already added.' };
  }

  return { isValid: true };

  // TODO: Should we begin to handle time zones?

}

export function calculateHours(startTime: string, endTime: string): number {
  const startDate = new Date(`2000-01-01 ${startTime}`);
  const endDate = new Date(`2000-01-01 ${endTime}`);

  const timeDifference = endDate.getTime() - startDate.getTime()
  const hoursWorked = timeDifference / (1000 * 60 * 60)

  return hoursWorked;
}