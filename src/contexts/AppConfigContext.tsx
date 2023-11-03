import React, { useEffect, useState } from 'react';

import { IAppConfig } from '@interfaces/IAppConfig';
import client from '@api/client';

const AppConfigContext = React.createContext<IAppConfig>(null as any);

export function useAppConfig() {
  return React.useContext(AppConfigContext);
}

interface AppConfigProviderProps {
  children: React.ReactNode;
}

export function AppConfigProvider(props: AppConfigProviderProps) {
  const [appConfig, setAppConfig] = useState<IAppConfig>(null as any);

  useEffect(() => {
    async function initAppConfig() {
      const res = await fetch('/app.json')
      const appConfig = await res.json() as IAppConfig

      client.defaults.baseURL = appConfig.apiHost

      setAppConfig(appConfig)
    }

    initAppConfig()
  }, []);

  return (
    <AppConfigContext.Provider value={appConfig}>
      {appConfig && props.children}
    </AppConfigContext.Provider>
  );
}

