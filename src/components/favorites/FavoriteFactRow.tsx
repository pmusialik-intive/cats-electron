import { Trash2 } from 'lucide-react';
import { CatFact } from '../../types/CatFact';
import { ListItem } from '../common/ListItem';

interface Props {
  fact: CatFact;
  onRemove: (id: string) => void;
}

export const FavoriteFactRow = ({ fact, onRemove }: Props) => {
  return (
    <ListItem text={fact.text}>
      <button className="ml-1" onClick={() => onRemove(fact._id)}>
        <Trash2 strokeWidth={1.5} size={16} />
      </button>
    </ListItem>
  );
};
