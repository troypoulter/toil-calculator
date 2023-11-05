import React from 'react';
import { Ruleset } from "../interfaces/Ruleset";
import { EnterHours } from "../interfaces/EnterHours";
import { getTimeValue } from '../utils/utils';

interface CalculateTimeProps {
  rulesets: Ruleset[];
  hoursWorked: EnterHours[];
}

export function calculateTotalTOIL(rulesets: Ruleset[], hoursWorked: EnterHours[]): number {
  let totalTOIL = 0;
  hoursWorked.forEach((hours) => {
    const hoursDayOfWeek = hours.date.toLocaleString('en-US', { weekday: 'long' });
    const matchingRuleset = rulesets.find((ruleset) =>
      // Compare ruleset dayOfWeek and startTime with hours date and startTime
      ruleset.dayOfWeek === hoursDayOfWeek
    );

    if (matchingRuleset) {
      let overlappingHours = 0;
      const rulesetStartTime = getTimeValue(matchingRuleset.startTime);
      const rulesetEndTime = getTimeValue(matchingRuleset.endTime);
      const hoursStartTime = getTimeValue(hours.startTime);
      const hoursEndTime = getTimeValue(hours.endTime);
    
      // Handle the scenario where the person starts work before the ruleset start time
      if (hoursStartTime < rulesetStartTime) {
        overlappingHours += calculateHoursFromValues(rulesetStartTime, hoursEndTime);
      }
      // Handle the scenario where the person finishes after the ruleset end time
      else if (hoursEndTime > rulesetEndTime) {
        overlappingHours += calculateHoursFromValues(hoursStartTime, rulesetEndTime);
      }
      // Handle the scenario where the person works within the ruleset time range
      else {
        overlappingHours += calculateHoursFromValues(hoursStartTime, hoursEndTime);
      }
    
      totalTOIL += overlappingHours * matchingRuleset.multiplier;
    }});

  return totalTOIL;
}

// New function to calculate hours from raw time values
function calculateHoursFromValues(startValue: number, endValue: number): number {
  // Convert the raw values to hours, then subtract to get the overlapping interval
  const startHours = Math.floor(startValue / 60);
  const startMinutes = startValue % 60;

  const endHours = Math.floor(endValue / 60);
  const endMinutes = endValue % 60;

  const overlappingHours = (endHours - startHours) + (endMinutes - startMinutes) / 60;

  return overlappingHours;
}

const CalculateTime: React.FC<CalculateTimeProps> = ({ rulesets, hoursWorked }) => {
  const totalTOIL = calculateTotalTOIL(rulesets, hoursWorked);

  return (
    <div>
      <div className="text-lg font-semibold">Your total TOIL: {totalTOIL} hours</div>
    </div>
  );
};

export default CalculateTime;
