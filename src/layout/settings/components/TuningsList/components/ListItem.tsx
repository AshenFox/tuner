import { useAppSelector } from '@store/hooks';
import { Tuning } from '@store/types/state';
import { memo } from 'react';
import Controls from './Controls';

type ListItemProps = {
  number: number;
  data: Tuning;
};

const ListItem = ({ number, data }: ListItemProps) => {
  const language = useAppSelector(s => s.main.settings.language);

  const { name, is_default, default_key } = data;

  const listName = is_default ? language.tunings.default[default_key] : name;

  return (
    <div className="tunings-list__item">
      <div className="tunings-list__info">
        <span className="tunings-list__number">{`${number}.`}</span>
        <span className="tunings-list__name">
          {name ? listName : language.tunings.title_placeholder}
        </span>
      </div>
      <div className="tunings-list__line" />
      <Controls data={data} />
    </div>
  );
};

export default memo(ListItem);
