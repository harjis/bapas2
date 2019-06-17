import AuthError from "./AuthError";
import { verifier } from "./bootstrap";

export const authorize = async (authorization: string) => {
  try {
    const accessToken = authorization.trim().split(' ')[ 1 ];
    const { claims: { uid } } = await verifier.verifyAccessToken(accessToken);

    if (!uid) {
      throw new AuthError('No user with provided token was found');
    }

    return uid;
  } catch (error) {
    console.log(error);
    throw new AuthError(error);
  }
};

// const saveUser = async (id) => {
//   try {
//     if (!PEOPLE.has(id)) {
//       const { profile: { firstName, lastName } } = await okta.client.getUser(id)
//
//       PEOPLE.set(id, new Person({ id, firstName, lastName }))
//     }
//   } catch (ignore) { }
//
//   return PEOPLE.get(id)
// }

