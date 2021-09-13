export default interface Token {
  id: number;
  username: string;
  iat?: number;
  exp: number;
  jti?: string;
}
