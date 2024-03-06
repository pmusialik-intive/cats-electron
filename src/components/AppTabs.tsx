import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TAB_ID } from '../constants/tabs';
import { DailyFactCard } from './DailyFactCard';
import { FavoritesCard } from './FavoritesCard';
import { SettingsCard } from './SettingsCard';

const tabs = [
  {
    id: TAB_ID.dailyFact,
    label: 'Daily Fact',
    content: <DailyFactCard />,
  },
  {
    id: TAB_ID.favorites,
    label: 'Favorites',
    content: <FavoritesCard />,
  },
  {
    id: TAB_ID.settings,
    label: 'Settings',
    content: <SettingsCard />,
  },
];

export const AppTabs = () => {
  return (
    <main>
      <Tabs defaultValue={TAB_ID.dailyFact} className="w-[800px] mt-5 mx-auto">
        <TabsList className={`grid w-full grid-cols-3`}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
};
