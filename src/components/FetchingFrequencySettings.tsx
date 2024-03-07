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
import { Label } from './ui/label';
import { fetchingFrequencyOptions } from '../constants/fetching-frequency';

export const FetchingFrequencySettings = () => {
  const { toast } = useToast();
  const { fetchingFrequency, setFetchingFrequency } = useFetchingFrequencyContext();
  const [localFrequency, setLocalFrequency] = useState<string>(`${fetchingFrequency}`);

  const handleSave = useCallback(() => {
    setFetchingFrequency(+localFrequency);

    toast({
      title: 'Success!',
      description: 'Fetching frequency saved.',
    });
  }, [localFrequency, toast]);

  return (
    <div className="py-5">
      <Label>Fetching frequency</Label>
      <div className="flex items-center">
        <Select value={`${localFrequency}`} onValueChange={(value) => setLocalFrequency(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Fetching frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {fetchingFrequencyOptions.map((option) => (
                <SelectItem key={option.value} value={`${option.value}`}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className="ml-5" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};
