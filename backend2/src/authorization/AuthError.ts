export default class AuthError extends Error {
  constructor(message: string) {
    super('Authorization error: ' + message);
  }
}
