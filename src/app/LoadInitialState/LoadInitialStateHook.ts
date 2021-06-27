import { useEffect } from 'react';
import { useTypedDispatch } from '../Store';
import { loadInitialUserState } from './LoadInitialStateActions';

function LoadInitialState(): void {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(loadInitialUserState());
  }, [dispatch]);
}

export default LoadInitialState;
