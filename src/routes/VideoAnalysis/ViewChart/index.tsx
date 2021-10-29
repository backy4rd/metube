import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { IVideoAnalysis } from '@interfaces/IVideo';

import './ViewChart.css';

interface ViewChartProps {
  data: IVideoAnalysis['views'];
  className?: string;
}

function ViewChart({ data, className = '' }: ViewChartProps) {
  return (
    <div className={'ViewChart ' + className}>
      <ResponsiveContainer width="99%" height="100%">
        <LineChart data={data} margin={{ left: 20, right: 5, top: 5, bottom: 5 }}>
          <XAxis dataKey="date" stroke="var(--main-grey-2)" />
          <YAxis dataKey="views" stroke="var(--main-grey-2)" />
          <Tooltip
            contentStyle={{ color: 'var(--main-dark-5)', borderRadius: 4 }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            name="Lượt xem"
            dataKey="views"
            stroke="var(--main-green-1)"
            fill="var(--main-dark-1)"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ViewChart;
