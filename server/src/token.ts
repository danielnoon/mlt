import { User } from "mlt-types";
import { SignJWT } from "jose/jwt/sign";
import { generateSecret } from "jose/util/generate_secret";
import { KeyLike } from "jose/types";
import { jwtVerify } from "jose/jwt/verify";
import { users } from "./data/store";

let s: KeyLike | null = null;

const JWT_SECRET = (async () =>
  s ? s : (s = await generateSecret("HS256")))();

export async function getToken(user: User) {
  return await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .sign(await JWT_SECRET);
}

export async function validateToken(token: string) {
  const { payload } = await jwtVerify(token, await JWT_SECRET);
  return users.get(payload.sub);
}
