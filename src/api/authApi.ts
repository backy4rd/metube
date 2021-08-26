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
}
export default new AuthApi();
