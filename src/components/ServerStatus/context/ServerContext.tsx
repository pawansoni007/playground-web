'use client';

import { SERVER_STATUS_URL } from '@/shared/constants/apiEndpoints';
import { RESPONSE_CODES } from '@/shared/constants/ResponseCode';
import React,{ createContext, useContext, useState } from 'react';

interface ServerStatusContextType {
  serverStatus: string;
  responseStatusCode: number;
  checkServerStatus: () => Promise<boolean>;
}

export const ServerStatusContext = createContext<
  ServerStatusContextType | undefined
>(undefined);

export const ServerStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [serverStatus, setServerStatus] = useState<string>('Failed to connect');
  const [responseStatusCode, setResponseStatusCode] = useState<number>(0);


  const checkServerStatus = async () => {
    try {
      const response = await fetch(SERVER_STATUS_URL, {
        method: 'GET',
      });
      setResponseStatusCode(response.status);
      setServerStatus(
        response.status === RESPONSE_CODES.OK
          ? 'Connected'
          : 'Failed to connect',
      );
      return response.status === RESPONSE_CODES.OK;
    } catch (error) {
      console.error(`Error occurred at useServerStatus: ${error}`);
      setServerStatus('Failed to connect');
      setResponseStatusCode(RESPONSE_CODES.SERVICE_UNAVAILABLE);
      return false;
    }
  };

  return (
    <ServerStatusContext.Provider
      value={{ serverStatus, responseStatusCode, checkServerStatus }}
    >
      {children}
    </ServerStatusContext.Provider>
  );
};

export const useServerStatus = () => {
  const context = useContext(ServerStatusContext);
  if (!context) {
    throw new Error('useServerStatus must be used within a ServerStatusProvider');
  }
  return context;
};
