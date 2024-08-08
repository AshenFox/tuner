import { useAppSelector } from '@store/hooks';
import { Tuning } from '@store/types/state';
import Controls from './Controls';
import { memo } from 'react';

type ListItemProps = {
  number: number;
  data: Tuning;
};

const ListItem = ({ number, data }: ListItemProps) => {
  const language = useAppSelector(s => s.main.settings.language);

  const { name, is_default, default_key } = data;

  return (
    <div className="tunings-list__item">
      <div className="tunings-list__info">
        <span className="tunings-list__number">{number}.</span>
        <span className="tunings-list__name">
          {name
            ? is_default
              ? language.tunings.default[default_key]
              : name
            : language.tunings.title_placeholder}
        </span>
      </div>
      <div className="tunings-list__line"></div>
      <Controls data={data} />
    </div>
  );
};

export default memo(ListItem);
