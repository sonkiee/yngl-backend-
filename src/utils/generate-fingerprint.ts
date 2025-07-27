import crypto from "crypto";

interface Fingerprint {
  ip: string;
  userAgent: string;
  acceptLanguage?: string;
  dnt?: string;
}

export function generateFingerprint(data: Fingerprint): string {
  const { ip, userAgent, acceptLanguage, dnt } = data;

  const uniqueString = [ip, userAgent, acceptLanguage, dnt]
    .filter(Boolean)
    .join("|")
    .toLowerCase();

  return crypto.createHash("sha256").update(uniqueString).digest("hex");
}
