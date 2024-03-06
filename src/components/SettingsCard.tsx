import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import { useState } from 'react';
import { frequencyOptions, getStoredFrequency, storeFrequency } from '../utils/frequency';

export const SettingsCard = () => {
  const [localFrequency, setLocalFrequency] = useState<string>(`${getStoredFrequency()}`);

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Notifications frequency</CardTitle>
        <CardDescription>Change your notifications frequency here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 p-5">
        <Select value={`${localFrequency}`} onValueChange={(value) => setLocalFrequency(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {frequencyOptions.map((option) => (
                <SelectItem key={option.value} value={`${option.value}`}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <Button onClick={() => storeFrequency(localFrequency)}>Save</Button>
      </CardFooter>
    </Card>
  );
};
