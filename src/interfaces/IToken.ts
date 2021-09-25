export default interface Token {
  id: number;
  username: string;
  role: string;
  iat?: number;
  exp: number;
  jti?: string;
}
