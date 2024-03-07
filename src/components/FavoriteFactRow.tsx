import { Trash2 } from 'lucide-react';
import { CatFact } from '../types/CatFact';

interface Props {
  fact: CatFact;
  onRemove: (id: string) => void;
}

export const FavoriteFactRow = ({ fact, onRemove }: Props) => {
  return (
    <div
      className={`group flex items-center justify-between py-3 border-b last:pb-0 last:border-0`}
      tabIndex={0}
    >
      <p className="flex-1 line-clamp-5" key={fact._id}>
        {fact.text}
      </p>
      <div className="invisible group-hover:visible group-focus-within:visible">
        <button className="ml-1" onClick={() => onRemove(fact._id)}>
          <Trash2 strokeWidth={1.5} size={16} />
        </button>
      </div>
    </div>
  );
};
