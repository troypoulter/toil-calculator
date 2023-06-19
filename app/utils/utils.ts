import { Ruleset } from "../interfaces/Ruleset";

export function validateNewRuleset(newRuleset: Ruleset, rulesets: Ruleset[]) : {isValid: boolean, errorMessage?: string} {
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
        return {isValid: false, errorMessage: 'The new ruleset overlaps with an existing ruleset.'};
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
        return {isValid: false, errorMessage: 'The new ruleset exactly matches an existing ruleset.'};
    }

    return {isValid: true};
  }