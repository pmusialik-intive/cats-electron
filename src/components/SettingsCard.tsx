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
import { useCallback, useState } from 'react';
import { useToast } from './ui/use-toast';
import { useFetchingFrequencyContext } from '../hooks/useFetchingFrequencyContext';
import { frequencyOptions } from '../constants/frequency';
import { Label } from './ui/label';

export const SettingsCard = () => {
  const { fetchingFrequency, setFetchingFrequency } = useFetchingFrequencyContext();
  const [localFrequency, setLocalFrequency] = useState<string>(`${fetchingFrequency}`);
  const { toast } = useToast();

  const handleSave = useCallback(() => {
    setFetchingFrequency(+localFrequency);

    toast({
      title: 'Success!',
      description: 'New frequency has been saved.',
    });
  }, [localFrequency, toast]);

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Frequencies</CardTitle>
        <CardDescription>Change your fetching and notifications frequency here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 p-5">
        <Label>Fetching frequency</Label>
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
        <Button onClick={handleSave}>Save</Button>
      </CardFooter>
    </Card>
  );
};
