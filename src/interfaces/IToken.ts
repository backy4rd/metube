export default interface Token {
  id: number;
  username: string;
  role: 'admin' | 'user';
  iat?: number;
  exp: number;
  jti?: string;
}
