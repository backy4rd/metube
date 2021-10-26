import client from './client';

type RegisterParams = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  female: '0' | '1';
};

class AuthApi {
  public login(username: string, password: string): Promise<any> {
    return client.post('/auth/login/', { username, password });
  }

  public register(params: RegisterParams): Promise<any> {
    return client.post('/auth/register', params);
  }

  public reset(oldPassword: string, newPassword: string): Promise<any> {
    return client.post('/auth/reset', { old_password: oldPassword, new_password: newPassword });
  }
}
export default new AuthApi();
