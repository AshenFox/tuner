import React, { memo, useEffect } from 'react';
import { useActions } from '@store/hooks';

interface OwnProps {}

type Props = OwnProps;

const DBSynchronizer: React.FC<Props> = () => {
  const { sync_with_db } = useActions();

  useEffect(() => {
    sync_with_db();
  }, [sync_with_db]);

  return <></>;
};

export default memo(DBSynchronizer);
