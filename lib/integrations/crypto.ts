import { EncryptJWT, jwtDecrypt } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET?.slice(0, 32) ?? "default-key-for-development-only"
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
