import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useCallback, useState } from 'react';
import { useToast } from '../ui/use-toast';
import { useNotificationFrequencyContext } from '../../hooks/useNotificationFrequencyContext';
import { Label } from '../ui/label';
import { notificationFrequencyOptions } from '../../constants/notification-frequency';

export const NotificationFrequencySettings = () => {
  const { toast } = useToast();
  const { notificationFrequency, setNotificationFrequency } = useNotificationFrequencyContext();
  const [localFrequency, setLocalFrequency] = useState<string>(`${notificationFrequency}`);

  const handleSave = useCallback(() => {
    setNotificationFrequency(+localFrequency);

    toast({
      title: 'Success!',
      description: 'Push notification frequency saved.',
    });
  }, [localFrequency, toast]);

  return (
    <div className="py-5">
      <Label>Push notification frequency</Label>
      <div className="flex items-center">
        <Select value={`${localFrequency}`} onValueChange={(value) => setLocalFrequency(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Notification frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {notificationFrequencyOptions.map((option) => (
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
