import React, { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { sync_with_db } from '../store/actions/mainActions';

interface OwnProps {}

type Props = OwnProps;

const DBSync: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(sync_with_db());
  }, []);

  return <></>;
};

export default DBSync;
