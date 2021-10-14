import React  from 'react';
import { Slider } from '@material-ui/core';

import './ProgressBar.css';

interface ProgressBarProps {
  className?: string;
  progress: number;
  onChange?: (progress: number) => void;
}

function ProgressBar({
  className,
  progress,
  onChange = () => {},
}: ProgressBarProps) {

  return (
    <div className={`ProgressBar ${className || ''}`}>
      <Slider
        className="ProgressBar-Progress"
        max={100}
        min={0}
        step={0.00001}
        value={progress}
        onChange={(e, v) => onChange(+v)}
      />
    </div>
  );
}

export default ProgressBar;
