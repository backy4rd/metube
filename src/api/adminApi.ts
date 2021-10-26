import client from './client';

import User from '../interfaces/IUser';
import Video from '../interfaces/IVideo';
import Range from '../interfaces/IRange';
import ApiMessage from '@interfaces/IApiMessage';
import Report from '@interfaces/IReport';

class UserApi {
  public getBlockedVideos(range?: Range): Promise<Video[]> {
    return client.get(`/admin/videos`, { params: { ...range, status: 'banned' } });
  }

  public getBlockedUsers(range?: Range): Promise<User[]> {
    return client.get(`/admin/users`, { params: { ...range, status: 'banned' } });
  }

  public modifyUser(username: string, action: 'ban' | 'unban'): Promise<ApiMessage> {
    return client.patch(`/admin/users/${username}`, { action });
  }

  public modifyVideo(videoId: string, action: 'ban' | 'unban'): Promise<ApiMessage> {
    return client.patch(`/admin/videos/${videoId}`, { action });
  }

  public getReportedVideos(range?: Range): Promise<Video[]> {
    return client.get(`/reports/videos`, { params: { ...range } });
  }

  public modifyReport(reportId: number, isResolved: boolean): Promise<Report> {
    return client.patch(`/reports/${reportId}`, { resolved: isResolved ? '1' : '0' });
  }
}

export default new UserApi();
