import React, { useMemo, useState } from 'react';

const ReportPopupContext = React.createContext<{
  showReportPopup: (videoId: string) => void;
  hideReportPopup: () => void;
}>({
  showReportPopup: () => {},
  hideReportPopup: () => {},
});

const ReportVideoIdContext = React.createContext<string | null>(null);

export function useReportPopup() {
  return React.useContext(ReportPopupContext);
}

export function useReportVideoId() {
  return React.useContext(ReportVideoIdContext);
}

interface ReportPopupProviderProps {
  children: React.ReactNode;
}

export function ReportPopupProvider(props: ReportPopupProviderProps) {
  const [videoId, setVideoId] = useState<string | null>(null);

  const popupValue = useMemo(
    () => ({
      showReportPopup: (_videoId: string) => setVideoId(_videoId),
      hideReportPopup: () => setVideoId(null),
    }),
    []
  );

  return (
    <ReportVideoIdContext.Provider value={videoId}>
      <ReportPopupContext.Provider value={popupValue}>
        {props.children}
      </ReportPopupContext.Provider>
    </ReportVideoIdContext.Provider>
  );
}
