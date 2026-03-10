const SIGNATURE_PREFIX = "v1:";

async function hmacSign(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  const hex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return SIGNATURE_PREFIX + hex;
}

export async function createAuthToken(): Promise<string> {
  const secret = process.env.SITE_PASSWORD;
  if (!secret) throw new Error("SITE_PASSWORD not set");
  return hmacSign(secret, "site_auth_token");
}

export async function verifyAuthToken(token: string): Promise<boolean> {
  const secret = process.env.SITE_PASSWORD;
  if (!secret || !token) return false;
  const expected = await hmacSign(secret, "site_auth_token");
  // Constant-time comparison
  if (token.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < token.length; i++) {
    mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}
