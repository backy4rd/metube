import React from 'react';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { IVideoAnalysis } from '@interfaces/IVideo';

import './ReactionChart.css';

interface ReactionChartProps {
  data: IVideoAnalysis['videoReactions'];
  className?: string;
}

function ReactionChart({ data, className = '' }: ReactionChartProps) {
  return (
    <div className={'ViewChart ' + className}>
      <ResponsiveContainer width="99%" aspect={2}>
        <LineChart data={data} margin={{ left: 5, right: 5, top: 5, bottom: 5 }}>
          <XAxis dataKey="date" stroke="var(--main-grey-2)" />
          <YAxis stroke="var(--main-grey-2)" />
          <Tooltip
            contentStyle={{ color: 'var(--main-dark-5)', borderRadius: 4 }}
            isAnimationActive={false}
          />
          <Legend />
          <Line
            type="monotone"
            name="Lượt thích"
            dataKey="likes"
            stroke="var(--main-green-1)"
            fill="var(--main-dark-1)"
            dot={false}
          />
          <Line
            type="monotone"
            name="Lượt không thích"
            dataKey="dislikes"
            stroke="var(--main-red-1)"
            fill="var(--main-dark-1)"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ReactionChart;
