export default interface Token {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  iconPath: string;
  iat?: number;
  exp: number;
  jti?: string;
}
