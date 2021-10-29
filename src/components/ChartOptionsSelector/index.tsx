import React from 'react';

import './ChartOptionsSelector.css';

interface ChartOptionsSelectorProps {
  from: Date | string | undefined;
  setFrom: React.Dispatch<React.SetStateAction<Date | string | undefined>>;
  unit: 'day' | 'month' | 'year';
  setUnit: React.Dispatch<React.SetStateAction<'day' | 'month' | 'year'>>;
}

function ChartOptionsSelector({ from, setFrom, unit, setUnit }: ChartOptionsSelectorProps) {
  function handleFromChange(e: any) {
    const now = new Date();
    switch (e.target.value) {
      case '3monthago':
        now.setMonth(now.getMonth() - 3);
        setFrom(now.getFullYear() + '-' + (now.getMonth() + 1));
        break;
      case '6monthago':
        now.setMonth(now.getMonth() - 6);
        setFrom(now.getFullYear() + '-' + (now.getMonth() + 1));
        break;
      case '1yearago':
        setFrom((now.getFullYear() - 1).toString());
        break;
      case '2yearago':
        setFrom((now.getFullYear() - 2).toString());
        break;
      default:
        setFrom(undefined);
        return;
    }
  }

  return (
    <div className="ChannelTabs ChartOptionsSelector">
      <div className="ChartOptionsSelector-Item">
        <span className="ChartOptionsSelector-Label">Đơn vị: </span>
        <select
          className="App-TextInput"
          value={unit}
          onChange={(e) => setUnit(e.target.value as any)}
        >
          <option value="day">Ngày</option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
        </select>
      </div>
      <div className="ChartOptionsSelector-Item">
        <span className="ChartOptionsSelector-Label">Thời điểm: </span>
        <select className="App-TextInput" onChange={handleFromChange}>
          <option value="3monthago">3 tháng trước</option>
          <option value="6monthago">6 tháng trước</option>
          <option value="1yearago">1 năm trước</option>
          <option value="2yearago">2 năm trước </option>
          <option value="upload">Đăng tải</option>
        </select>
      </div>
    </div>
  );
}

export default ChartOptionsSelector;
