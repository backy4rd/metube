import React from 'react';

import { ShowAuthFormProvider } from '@contexts/ShowAuthFormContext';
import { AuthProvider } from '@contexts/AuthContext';
import { ShowSidebarProvider } from '@contexts/ShowSidebarContext';
import { LoadingProvider } from '@contexts/LoadingContext';
import { SubscriptionsProvider } from '@contexts/SubscriptionsContext';
import { PlaylistsProvider } from '@contexts/PlaylistsContext';
import { MessageQueueProvider } from '@contexts/MessageQueueContext';

import Header from '@components/Header';
import PopupWrapper from '@components/PopupWrapper';
import Sidebar from '@components/Sidebar';
import Main from '@components/Main';

import './App.css';

function AppContextWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ShowAuthFormProvider>
        <ShowSidebarProvider>
          <LoadingProvider>
            <SubscriptionsProvider>
              <PlaylistsProvider>
                <MessageQueueProvider timeout={5000}>{children}</MessageQueueProvider>
              </PlaylistsProvider>
            </SubscriptionsProvider>
          </LoadingProvider>
        </ShowSidebarProvider>
      </ShowAuthFormProvider>
    </AuthProvider>
  );
}

function App() {
  return (
    <div className="App">
      <AppContextWrapper>
        <Header />
        <div className="App__Container">
          <Sidebar />
          <Main />
        </div>

        <PopupWrapper />
      </AppContextWrapper>
    </div>
  );
}

export default App;
