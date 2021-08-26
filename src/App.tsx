import React from 'react';

import { ShowAuthFormProvider } from '@contexts/ShowAuthFormContext';
import { AuthProvider } from '@contexts/AuthContext';
import { ShowSidebarProvider } from '@contexts/ShowSidebarContext';
import { LoadingProvider } from '@contexts/LoadingContext';
import { SubscriptionsProvider } from '@contexts/SubscriptionsContext';

import Header from '@components/Header';
import PopupWrapper from '@components/PopupWrapper';
import Sidebar from '@components/Sidebar';
import Main from '@components/Main';

import './App.css';

function App() {
  /* return ( */
  /*   <div className="App"> */
  /*     <Header /> */
  /*     <div className="App__Container"> */
  /*       <Sidebar /> */
  /*       <Main /> */
  /*     </div> */

  /*     <PopupWrapper /> */
  /*   </div> */
  /* ); */

  return (
    <AuthProvider>
      <ShowAuthFormProvider>
        <ShowSidebarProvider>
          <LoadingProvider>
            <SubscriptionsProvider>
              <div className="App">
                <Header />
                <div className="App__Container">
                  <Sidebar />
                  <Main />
                </div>

                <PopupWrapper />
              </div>
            </SubscriptionsProvider>
          </LoadingProvider>
        </ShowSidebarProvider>
      </ShowAuthFormProvider>
    </AuthProvider>
  );
}

export default App;
