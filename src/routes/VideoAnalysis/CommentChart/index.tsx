import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { IVideoAnalysis } from '@interfaces/IVideo';

import './CommentChart.css';

interface CommentChartProps {
  data: IVideoAnalysis['comments'];
  className?: string;
}

function CommentChart({ data, className = '' }: CommentChartProps) {
  return (
    <div className={'CommentChart ' + className}>
      <ResponsiveContainer width="99%" aspect={2}>
        <LineChart data={data} margin={{ left: 5, right: 5, top: 5, bottom: 5 }}>
          <XAxis dataKey="date" stroke="var(--main-grey-2)" />
          <YAxis dataKey="comments" stroke="var(--main-grey-2)" />
          <Tooltip
            contentStyle={{ color: 'var(--main-dark-5)', borderRadius: 4 }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            name="Bình luận"
            dataKey="comments"
            stroke="var(--main-green-1)"
            fill="var(--main-dark-1)"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CommentChart;
