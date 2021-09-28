import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { WarningRounded, Close } from '@material-ui/icons';

import { useConfirm, useShowConfirm } from '@contexts/ConfirmContext';

import Spinner from '@components/Spinner';

import './Confirm.css';

function Confirm() {
  const confirm = useConfirm();
  const [message, setMessage] = useState<string>(confirm ? confirm.message : '');
  const [confirming, setConfirming] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const { closeConfirm } = useShowConfirm();

  useEffect(() => {
    if (!confirm) return;
    setMessage(confirm.message);
  }, [confirm]);

  useEffect(() => {
    if (!confirm) return;

    function exitWhenPressEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeConfirm();
      }
    }
    window.addEventListener('keydown', exitWhenPressEsc);
    return () => window.removeEventListener('keydown', exitWhenPressEsc);
  }, [closeConfirm, confirm]);

  async function handleConfirm() {
    setConfirming(true);
    await confirm?.handler?.();
    setConfirming(false);
    closeConfirm();
  }

  return (
    <CSSTransition
      nodeRef={ref}
      in={confirm !== null}
      timeout={200}
      classNames="ConfirmWrapper"
      unmountOnExit
    >
      <div ref={ref} className="ConfirmWrapper">
        <div className="Confirm">
          <div className="Confirm-Header">
            <WarningRounded />
            <div className="Confirm-Header-Text">Thông Báo</div>
            <Close className="Confirm-Header-Close" onClick={closeConfirm} />
          </div>
          <div className="Confirm__Main">
            <div className="Confirm__Main-Message">{message}</div>
            <div className="Confirm__Main-Buttons">
              <div className="CMB-Confirm" onClick={handleConfirm}>
                Xác Nhận
              </div>
              <div className="CMB-Cancel" onClick={closeConfirm}>
                Hủy
              </div>
              <Spinner className="CMB-Spinner" loading={confirming} />
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default Confirm;
