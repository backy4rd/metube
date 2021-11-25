export default interface ILoginLog {
  id: number;
  browser: string | null;
  os: string | null;
  device: string | null;
  cpu: string | null;
  loggedInAt: Date;
  loggedOutAt: Date | null;
  expireAt: Date;
}
