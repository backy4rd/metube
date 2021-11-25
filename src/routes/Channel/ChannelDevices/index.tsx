import React, { useEffect, useState } from 'react';

import authApi from '@api/authApi';
import ILoginLog from '@interfaces/ILoginLog';
import { useSetLoading } from '@contexts/LoadingContext';
import { usePushMessage } from '@contexts/MessageQueueContext';

import LoginDevice from './LoginDevice';

import './ChannelDevices.css';

function ChannelDevices() {
  const [devices, setDevices] = useState<Array<ILoginLog>>([]);
  const setLoading = useSetLoading();
  const pushMessage = usePushMessage();

  useEffect(() => {
    setLoading(true);
    authApi
      .getLoginLogs()
      .then(setDevices)
      .finally(() => setLoading(false));
  }, [setLoading]);

  async function handleRemoveDeviceClick(device: ILoginLog) {
    try {
      setLoading(true);
      await authApi.deleteDevice(device.id);
      setDevices(devices.filter((d) => d.id !== device.id));
    } catch (err) {
      if ((err as any).data?.fail?.message === "can't logout current device") {
        pushMessage('Thiết bị này đang được sử dụng', 'info');
      } else {
        pushMessage('Xóa thiết bị không thành công', 'error');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ChannelDevices">
      <div className="ChannelDevices__List">
        {devices.map((device) => (
          <LoginDevice
            key={device.id}
            className="ChannelDevices__List-Item"
            device={device}
            handleRemoveDeviceClick={handleRemoveDeviceClick}
          />
        ))}
      </div>
    </div>
  );
}

export default ChannelDevices;
