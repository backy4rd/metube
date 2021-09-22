import useForceUpdate from '@hooks/useForceUpdate';
import useWindowSize from '@hooks/useWindowSize';
import React, { useEffect, useRef, useState } from 'react';

import './Popup.css';

interface PopupProps {
  target: string;
  className?: string;
  children?: React.ReactNode;
}

function Popup(props: PopupProps) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState<HTMLElement | null>(document.getElementById(props.target));
  const ref = useRef<HTMLDivElement>(null);

  const forceUpdate = useForceUpdate();
  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    setTarget(document.getElementById(props.target));
  }, [props.target]);

  useEffect(() => {
    if (!target) return;
    target.style.position = target.style.position ? target.style.position : 'relative';
    target.onmouseenter = () => setShow(true);
    target.onmouseleave = () => setShow(false);
    return () => {
      target.onmouseenter = null;
      target.onmouseleave = null;
    };
  }, [target]);

  useEffect(() => {
    forceUpdate();
    // eslint-disable-next-line
  }, [show]);

  if (!target) return null;

  const { left = 0, right = 0 } = ref.current?.getBoundingClientRect() || {};
  let transform;
  let screenKeeper;
  if (right > windowWidth) {
    screenKeeper = -(right - windowWidth) - 12;
  } else if (left < 0) {
    screenKeeper = -left + 12;
  } else {
    screenKeeper = 0;
  }
  transform = `translate(calc(-50% + ${screenKeeper}px), 100%)`;

  return (
    <div
      className="PopupWrapper"
      style={{ display: show ? 'block' : 'none', opacity: left === 0 ? 0 : 1 }}
    >
      <div className="Popup-Arrow"></div>
      <div ref={ref} className={`Popup ${props.className || ''}`} style={{ transform }}>
        {props.children}
      </div>
    </div>
  );
}

export default React.memo(Popup);
