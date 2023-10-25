import React, { useState } from 'react';
import { Ruleset } from "../interfaces/Ruleset";
import { EnterHours } from "../interfaces/EnterHours";
import { calculateHours } from '../utils/utils';

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
      ruleset.dayOfWeek === hoursDayOfWeek &&
      ruleset.startTime <= hours.startTime &&
      ruleset.endTime >= hours.endTime
    );

    if (matchingRuleset) {
      const hoursWorked = calculateHours(hours.startTime, hours.endTime);
      totalTOIL += hoursWorked * matchingRuleset.multiplier;
    }
  });

  return totalTOIL;
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