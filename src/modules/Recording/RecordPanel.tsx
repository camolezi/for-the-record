/* eslint-disable no-nested-ternary */
import React from 'react';
import { Box, Center, SlideFade, VisuallyHidden } from '@chakra-ui/react';

import { motion } from 'framer-motion';
import { recordButtonClicked } from './RecordActions';
import { useTypedDispatch, useTypedSelector } from '../../app/Store';
import {
  selectIsMicAvailable,
  selectIsRecording,
} from './state/RecordSelectors';
import RecordingCounter from './RecordingCounter';

function RecordPanel(): JSX.Element {
  const dispatch = useTypedDispatch();
  const isRecording = useTypedSelector(selectIsRecording);
  const isMicAvailable = useTypedSelector(selectIsMicAvailable);
  const redRecording = '#ff524d';
  const recordingIcon = (
    <button type="button">
      <VisuallyHidden>End Recording</VisuallyHidden>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="ionicon"
        viewBox="0 0 512 512"
        width="100%"
        role="presentation"
      >
        <motion.path
          d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
          fill="none"
          stroke={redRecording}
          strokeMiterlimit="10"
          strokeWidth="32"
          strokeLinecap="round"
        />
        <motion.circle
          initial={{ opacity: 0, pathLength: 0, r: 0 }}
          animate={{ pathLength: 1, opacity: 1, r: 144 }}
          transition={{ ease: 'easeInOut', duration: 0.5 }}
          fill={redRecording}
          cx="256"
          cy="256"
          r="144"
        />
      </motion.svg>
    </button>
  );

  const micNotAvailableIcon = (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      fill="none"
      viewBox="0 0 512 512"
      stroke="currentColor"
    >
      <title>microphone not authorized or available</title>
      <motion.path
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 1.5 }}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
        stroke={redRecording}
        d="M432 400L96 64"
      />
      <motion.path
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 1.5 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        fill="currentColor"
        stroke={redRecording}
        d="M400 240v-31.55c0-8.61-6.62-16-15.23-16.43A16 16 0 00368 208v32a111.58 111.58 0 01-2.45 23.31 4.05 4.05 0 001.07 3.69l21.82 21.81a2 2 0 003.29-.72A143.27 143.27 0 00400 240zM256 352a112.36 112.36 0 01-112-112v-31.55c0-8.61-6.62-16-15.23-16.43A16 16 0 00112 208v32c0 74 56.1 135.12 128 143.11V432h-47.55c-8.61 0-16 6.62-16.43 15.23A16 16 0 00192 464h127.55c8.61 0 16-6.62 16.43-15.23A16 16 0 00320 432h-48v-48.89a143.08 143.08 0 0052-16.22 4 4 0 00.91-6.35L307 342.63a4 4 0 00-4.51-.78A110.78 110.78 0 01256 352zM256 80a47.18 47.18 0 0148 48v74.72a4 4 0 001.17 2.82L332.59 233a2 2 0 003.41-1.42V128.91C336 85 301 48.6 257.14 48a79.66 79.66 0 00-68.47 36.57 4 4 0 00.54 5l19.54 19.54a2 2 0 003.25-.63A47.44 47.44 0 01256 80z"
      />
      <motion.path
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 1.5 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        fill="currentColor"
        stroke={redRecording}
        d="M207.27 242.9L179.41 215a2 2 0 00-3.41 1.42V239a80.89 80.89 0 0023.45 56.9 78.55 78.55 0 0077.8 21.19 2 2 0 00.86-3.35l-24.91-24.91a4.08 4.08 0 00-2.42-1.15c-21.65-2.52-39.48-20.44-42.37-42.43a4 4 0 00-1.14-2.35z"
      />
    </motion.svg>
  );

  const micAvailableIcon = (
    <button type="button">
      <VisuallyHidden>Start Recording</VisuallyHidden>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        stroke="currentColor"
        width="100%"
        role="presentation"
      >
        <motion.path
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 1.5 }}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
          d="M192 448h128M384 208v32c0 70.4-57.6 128-128 128h0c-70.4 0-128-57.6-128-128v-32M256 368v80"
        />
        <motion.path
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 1.5 }}
          d="M256 64a63.68 63.68 0 00-64 64v111c0 35.2 29 65 64 65s64-29 64-65V128c0-36-28-64-64-64z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
      </motion.svg>
    </button>
  );

  const icons = (
    <>
      {isRecording
        ? recordingIcon
        : isMicAvailable
        ? micAvailableIcon
        : micNotAvailableIcon}
    </>
  );

  return (
    <>
      <Center m={10} width={['80%', '80%', '70%', '50%', '30%']}>
        <Box onClick={() => dispatch(recordButtonClicked())}>{icons}</Box>
      </Center>

      <Center>
        <SlideFade in={isRecording} offsetY="20px">
          {isRecording && <RecordingCounter />}
        </SlideFade>
      </Center>
    </>
  );
}

export default RecordPanel;
