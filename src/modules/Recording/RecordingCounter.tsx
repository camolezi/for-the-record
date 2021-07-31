import React, { useEffect, useState } from 'react';

import { Heading } from '@chakra-ui/react';
import { formatSecondsToCounter } from '../../utils/DateTime/WeekDays';

function RecordingCounter(): JSX.Element {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);
  }, [counter, setCounter]);

  return (
    <Heading as="h2" size="3xl" isTruncated>
      {formatSecondsToCounter(counter)}
    </Heading>
  );
}

export default RecordingCounter;
