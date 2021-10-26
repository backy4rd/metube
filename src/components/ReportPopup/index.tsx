import React, { useEffect, useRef, useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import { Close } from '@mui/icons-material';

import videoApi from '@api/videoApi';
import { useSetLoading } from '@contexts/LoadingContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import { useReportPopup, useReportVideoId } from '@contexts/ReportPopupContext';

import './ReportPopup.css';

const reports = [
  {
    id: 1,
    reason: 'Nội dung gian lận/vi phạm hoặc gây hiểu lầm',
  },
  {
    id: 2,
    reason: 'Nội dung liên quan đến việc ngược đãi trẻ em',
  },
  {
    id: 3,
    reason: 'Quảng bá chủ nghĩa khủng bố',
  },
  {
    id: 4,
    reason: 'Hành động gây hại hoặc nguy hiểm',
  },
  {
    id: 5,
    reason: 'Quấy rối hoặc bắt nạt',
  },
  {
    id: 6,
    reason: 'Nội dung lăng mạ hoặc kích động thù hận',
  },
  {
    id: 7,
    reason: 'Nội dung bạo lực hoặc phản cảm',
  },
  {
    id: 8,
    reason: 'Nội dung khiêu dâm',
  },
  {
    id: 9,
    reason: 'Nội dung không phù hợp với pháp luật Việt Nam',
  },
];

function ReportPopup() {
  const [reasons, setReasons] = useState<Array<string>>([]);
  const [anotherReason, setAnotherReason] = useState('');

  const videoId = useReportVideoId();
  const { hideReportPopup } = useReportPopup();
  const pushMessage = usePushMessage();
  const setLoading = useSetLoading();

  const loading = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReasons([]);
    setAnotherReason('');
  }, [videoId]);

  async function handleReportVideo() {
    if (!videoId || loading.current) return;
    try {
      setLoading(true);
      loading.current = true;
      let r = [...reasons];
      if (anotherReason !== '') r.push(anotherReason);
      await videoApi.reportVideo(videoId, r.join(', '));
      pushMessage('Đã báo cáo video!');
      hideReportPopup();
    } catch (err) {
      pushMessage('Báo cáo thất bại!', 'error');
    } finally {
      setLoading(false);
      loading.current = false;
    }
  }

  const handleCheckReason = (reason: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setReasons((rs) => [...rs, reason]);
    } else {
      setReasons((rs) => rs.filter((r) => r !== reason));
    }
  };

  return (
    <CSSTransition
      nodeRef={ref}
      in={videoId !== null}
      timeout={200}
      classNames="ReportPopupWrapper"
      unmountOnExit
    >
      <div ref={ref} className="ReportPopupWrapper">
        <div className="ReportPopup">
          <div className="ReportPopup-Header">
            <div className="ReportPopup-Header-Text">Báo cáo video</div>
            <Close className="ReportPopup-Header-Close" onClick={hideReportPopup} />
          </div>
          <div className="ReportPopup-Main">
            <div className="ReportPopup-Reports">
              {reports.map((report) => (
                <div key={report.id} className="RPR-Item" onClick={undefined}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        onChange={handleCheckReason(report.reason)}
                        sx={{
                          color: 'var(--main-red-1)',
                          '&.Mui-checked': {
                            color: 'var(--main-red-2)',
                          },
                        }}
                      />
                    }
                    label={report.reason}
                  />
                </div>
              ))}
            </div>
            <div className="ReportPopup-Create">
              <div className="RPC-Label">Lý do khác:</div>
              <input
                className="RPC-ReportName App-TextInput"
                onChange={(e) => setAnotherReason(e.target.value)}
                value={anotherReason}
                type="text"
                placeholder="Tên Report"
              />
            </div>

            {(reasons.length > 0 || anotherReason !== '') && (
              <div className="ReportPopup-Buttons">
                <div className="RPB-Button App-GreenButton" onClick={handleReportVideo}>
                  Gửi báo cáo
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default ReportPopup;
