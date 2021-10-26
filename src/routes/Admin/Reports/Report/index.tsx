import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import IReport from '@interfaces/IReport';
import { timeDifference } from '@utils/time';

import Avatar from '@components/Avatar';

import './Report.css';
import { Checkbox, Tooltip } from '@mui/material';
import adminApi from '@api/adminApi';

interface ReportProps {
  report: IReport;
}

function Report({ report }: ReportProps) {
  const [isResolved, setIsResolved] = useState(report.isResolved);

  async function handleResolveCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setIsResolved(e.target.checked);
      await adminApi.modifyReport(report.id, e.target.checked);
    } catch {
      setIsResolved(isResolved);
    }
  }

  return (
    <div className="Report">
      <Link className="Report__Left" to={'/channel/' + report.user.username}>
        <Avatar user={report.user} size="32px" />
      </Link>
      <div className="Report__Center">
        <div className="Report__Center-Reason">{report.reason}</div>
        <div className="Report__Center-Info">
          {report.user.username} - {timeDifference(new Date(), report.createdAt)}
        </div>
      </div>
      <div className="Report__Right">
        <Tooltip title={isResolved ? 'Đã xem xét' : 'Chưa xem xét'}>
          <Checkbox
            checked={isResolved}
            size="small"
            onChange={handleResolveCheckboxChange}
            sx={{
              color: 'var(--main-red-1)',
              '&.Mui-checked': {
                color: 'var(--main-red-2)',
              },
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default Report;
