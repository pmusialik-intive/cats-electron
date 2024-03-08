import { CatFact } from '../../types/CatFact';
import { ListItem } from '../common/ListItem';
import { Icon } from '../common/Icon';

interface Props {
  fact: CatFact;
  onRemove: (id: string) => void;
}

export const FavoriteFactRow = ({ fact, onRemove }: Props) => {
  return (
    <ListItem text={fact.text}>
      <button className="ml-1" onClick={() => onRemove(fact._id)}>
        <Icon name="trash-2" />
      </button>
    </ListItem>
  );
};
