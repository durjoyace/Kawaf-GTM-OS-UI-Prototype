import { EncryptJWT, jwtDecrypt } from "jose";

const rawKey = process.env.AUTH_SECRET?.slice(0, 32);
if (!rawKey || rawKey.length < 32) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be at least 32 characters for encryption");
  }
}
const SECRET_KEY = new TextEncoder().encode(
  rawKey ?? "dev-only-key-not-for-production!"
);

export async function encryptTokens(tokens: Record<string, string>): Promise<string> {
  return new EncryptJWT(tokens as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .encrypt(SECRET_KEY);
}

export async function decryptTokens(encrypted: string): Promise<Record<string, string>> {
  const { payload } = await jwtDecrypt(encrypted, SECRET_KEY);
  return payload as unknown as Record<string, string>;
}
