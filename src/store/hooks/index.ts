import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mainActions from '@store/actions/mainActions';
import { AppDispatch, RootState } from '@store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch = useAppDispatch();

  const boundActions = useMemo(
    () => bindActionCreators(mainActions, dispatch),
    [dispatch]
  );

  return boundActions;
};
