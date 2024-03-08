import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { FetchingFrequencySettings } from './FetchingFrequencySettings';
import { NotificationFrequencySettings } from './NotificationFrequencySettings';

export const SettingsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Frequencies</CardTitle>
        <CardDescription>
          <span className="block mb-1">
            The fetching frequency option allows you to set how often the system checks for new cat
            facts.
          </span>
          <span>
            The push notifications frequency setting controls how frequently you'll receive push
            notifications alerting you to new cat facts available.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FetchingFrequencySettings />
        <NotificationFrequencySettings />
      </CardContent>
    </Card>
  );
};
