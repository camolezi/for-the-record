import { useEffect } from 'react';
import { useTypedDispatch } from '../Store';
import { loadInitialUserState } from './LoadInitialStateActions';
import OnPageLoadActions from './OnPageLoadActions';

function LoadInitialState(): void {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(loadInitialUserState());

    OnPageLoadActions.forEach((func) => func(dispatch));
  }, [dispatch]);
}

export default LoadInitialState;
