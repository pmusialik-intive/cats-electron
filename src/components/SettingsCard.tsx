import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FetchingFrequencySettings } from './FetchingFrequencySettings';
import { NotificationFrequencySettings } from './NotificationFrequencySettings';

export const SettingsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Frequencies</CardTitle>
        <CardDescription>Change your fetching and notifications frequency here.</CardDescription>
      </CardHeader>
      <CardContent>
        <FetchingFrequencySettings />
        <NotificationFrequencySettings />
      </CardContent>
    </Card>
  );
};
