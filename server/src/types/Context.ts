import ExtendedRequest from './ExtendedRequest';

export default interface Context {
  user: { userId: string };
  req: ExtendedRequest;
}
