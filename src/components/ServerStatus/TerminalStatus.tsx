import React, { useEffect } from 'react';
import { Wifi, WifiOff, Loader } from 'lucide-react';

import { RESPONSE_CODES } from '@/shared/constants/ResponseCode';
import { useServerStatus } from './context/ServerContext';

const TerminalStatus = () => {
  const { serverStatus, responseStatusCode, checkServerStatus } =
    useServerStatus();

  useEffect(() => {
    checkServerStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex items-center gap-2">
      {responseStatusCode === RESPONSE_CODES.OK ? (
        <Wifi className="text-green-500" />
      ) : (
        <WifiOff className="text-red-500" />
      )}
      <span
        className={`text-sm ${
          responseStatusCode === RESPONSE_CODES.OK
            ? 'text-green-400'
            : 'text-red-400'
        }`}
      >
        {serverStatus === 'Connected' ? (
          serverStatus
        ) : responseStatusCode === RESPONSE_CODES.SERVICE_UNAVAILABLE ? (
          'Failed to connect'
        ) : (
          <Loader className="animate-spin" />
        )}
      </span>
    </div>
  );
};

export default TerminalStatus;
