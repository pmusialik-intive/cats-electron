import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TAB_ID } from '../constants/tabs';
import { DailyFactCard } from './DailyFactCard';

const tabs = [
  {
    id: TAB_ID.dailyFact,
    label: 'Daily Fact',
    content: <DailyFactCard />,
  },
];

export const App = () => {
  return (
    <main>
      <Tabs defaultValue={TAB_ID.dailyFact} className="w-[800px] mt-5 mx-auto">
        <TabsList className={`grid w-full grid-cols-${tabs.length + 1}`}>
          {tabs.map((tab) => (
            <TabsTrigger value={tab.id}>{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent value={tab.id}>{tab.content}</TabsContent>
        ))}
      </Tabs>
    </main>
  );
};
