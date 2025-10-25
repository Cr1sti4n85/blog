import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
  user: SessionUser;
  accessToken: string;
};

export type SessionUser = {
  id?: string;
  name?: string;
  avatar?: string;
};

const secretKey = process.env.SESSION_SECRET_KEY;

const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: Session) {
  //sign jwt with provided payload
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //7 days

  //store jwt as an httpOnly cookie
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });

  //   return jwt;
}

export async function getSession() {
  const cookie = await cookies();
  const session = cookie.get("session")?.value;

  if (!session) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (error) {
    console.error("Failed to verify the session: ", error);
    redirect("/auth/signin");
  }
}

export async function destroySession() {
  (await cookies()).delete("session");
}
