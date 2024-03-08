import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TAB_ID } from '../constants/tabs';
import { CatFactsCard } from './cat-facts/CatFactsCard';
import { FavoritesCard } from './favorites/FavoritesCard';
import { SettingsCard } from './settings/SettingsCard';

const tabs = [
  {
    id: TAB_ID.catFacts,
    label: 'Cat Facts',
    content: <CatFactsCard />,
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
    <Tabs defaultValue={TAB_ID.catFacts} className="mt-5">
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
  );
};
