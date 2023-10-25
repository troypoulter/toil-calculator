import { EnterHours } from "../interfaces/EnterHours";
import { Ruleset } from "../interfaces/Ruleset";

export function validateNewRuleset(newRuleset: Ruleset, rulesets: Ruleset[]): { isValid: boolean, errorMessage?: string } {
  const overlaps = rulesets.some((existingRuleset) => {
    return (
      newRuleset.dayOfWeek === existingRuleset.dayOfWeek &&
      hasTimeOverlap(newRuleset.startTime, newRuleset.endTime, existingRuleset.startTime, existingRuleset.endTime)
    );
  });

  if (overlaps) {
    return { isValid: false, errorMessage: 'The new ruleset overlaps with an existing ruleset.' };
  }

  const exactMatch = rulesets.some((existingRuleset) => {
    return (
      newRuleset.dayOfWeek === existingRuleset.dayOfWeek &&
      hasExactMatch(newRuleset.startTime, newRuleset.endTime, existingRuleset.startTime, existingRuleset.endTime)
    );
  });

  if (exactMatch) {
    return { isValid: false, errorMessage: 'The new ruleset exactly matches an existing ruleset.' };
  }

  return { isValid: true };
}

export function validateHours(newHoursWorked: EnterHours, hoursWorked: EnterHours[]): { isValid: boolean, errorMessage?: string } {

  if (getTimeValue(newHoursWorked.startTime) == getTimeValue(newHoursWorked.endTime)) {
    return { isValid: false, errorMessage: 'Start time and end time cannot be the same.' };
  }

  if (getTimeValue(newHoursWorked.startTime) < getTimeValue(newHoursWorked.endTime)) {
    return { isValid: false, errorMessage: 'End time cannot be before start time.' };
  }

  const overlappingHours = hoursWorked.some((existingHours) => {
    return (
      newHoursWorked.date === existingHours.date &&
      hasTimeOverlap(newHoursWorked.startTime, newHoursWorked.endTime, existingHours.startTime, existingHours.endTime)
    );
  });

  if (overlappingHours) {
    return { isValid: false, errorMessage: 'The new TOIL that you entered overlaps with hours that you have already added.' };
  }

  const exactMatch = hoursWorked.some((existingHours) => {
    return (
      newHoursWorked.date === existingHours.date &&
      hasExactMatch(newHoursWorked.startTime, newHoursWorked.endTime, existingHours.startTime, existingHours.endTime)
    );
  });

  if (exactMatch) {
    return { isValid: false, errorMessage: 'The inputted hours exactly match hours you have already added.' };
  }

  return { isValid: true };

}

// Function to convert time value to a comparable format (e.g., "HH:mm" to minutes)
function getTimeValue(time: string) {
  const [hours, minutes] = time.split(':');
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
}

export function calculateHours(startTime: string, endTime: string): number {
  const startDate = new Date(`2000-01-01 ${startTime}`);
  const endDate = new Date(`2000-01-01 ${endTime}`);

  const timeDifference = endDate.getTime() - startDate.getTime()
  const hoursWorked = timeDifference / (1000 * 60 * 60)

  return hoursWorked;
}

// Helper function to check if two time periods are exactly the same
export function hasExactMatch(newStart: string, newEnd: string, existingStart: string, existingEnd: string): boolean {
  return newStart === existingStart && newEnd === existingEnd;
}

// Helper function to check if there is an overlap between two time periods
export function hasTimeOverlap(newStart: string, newEnd: string, existingStart: string, existingEnd: string): boolean {
  const newStartObj = new Date(`2000/01/01 ${newStart}`);
  const newEndObj = new Date(`2000/01/01 ${newEnd}`);
  const existingStartObj = new Date(`2000/01/01 ${existingStart}`);
  const existingEndObj = new Date(`2000/01/01 ${existingEnd}`);

  return newStartObj < existingEndObj && newEndObj > existingStartObj;
}