import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { HOUR, MINUTE } from '../constants/time';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const frequencyOptions = [
  { label: '5 minutes', value: `${5 * MINUTE}` },
  { label: '10 minutes', value: `${10 * MINUTE}` },
  { label: '30 minutes', value: `${30 * MINUTE}` },
  { label: '1 hour', value: `${1 * HOUR}` },
  { label: '6 hours', value: `${6 * HOUR}` },
];

export const SettingsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Notifications frequency</CardTitle>
        <CardDescription>Change your notifications frequency here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 p-5">
        <Select value={frequencyOptions[0].value}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {frequencyOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  );
};
