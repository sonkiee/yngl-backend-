import { eq } from "drizzle-orm";
import db from "../../config/db";
import { anonProfiles, anonProfileInfos } from "./anon.schema";
import type { NewAnonProfileInfo } from "./anon.schema";
import { generateFingerprint } from "../../utils/generate-fingerprint";

import { generateRandomAlias } from "../../utils/generate-random-alias";
import { Request, Response } from "express";
import { ua } from "../../utils/ua";

export class AnonService {
  async getOrCreateAnon(req: Request, res: Response) {
    const cookieId = req.cookies?.anon_id;
    const ip = req.ip || "unknown"; // Fallback if IP is not available
    const userAgent = req.headers["user-agent"] ?? "unknown";
    const acceptLanguage = req.headers["accept-language"] ?? "unknown";
    const dnt = (req.headers["dnt"] ?? "0") as string;

    // const {browser, os, } = ua()

    const deviceInfo = {
      browser: this.detectBrowser(userAgent),
      os: this.detectOS(userAgent),
      device: this.detectDevice(userAgent),
    };

    // You can enhance this with a real geo lookup (like ipdata or ipinfo)
    // const geoData = req.geo || null;
    // const carrier = req.headers["x-carrier"] || "unknown";

    // 1. Try cookie
    if (cookieId) {
      const anon = await this.findById(cookieId);
      if (anon) {
        this.setAnonCookie(res, anon.id);
        return anon;
      }
    }

    // 2. Fallback to fingerprint
    const fingerprint = generateFingerprint({
      ip,
      userAgent,
      acceptLanguage,
      dnt,
    });
    const existing = await this.findByFingerprint(fingerprint);

    if (existing) {
      await this.updateProfileInfo(existing.id, {
        ipAddress: ip,
        userAgent,
        fingerprint,
        ...deviceInfo,
        location: ip, // Placeholder for geoData
      });
      this.setAnonCookie(res, existing.id);
      return existing;
    }

    // 3. Create new
    const newProfile = await this.createProfile({
      ipAddress: ip,
      userAgent,
      fingerprint,
      ...deviceInfo,
      location: ip, // Placeholder for geoData
    });

    this.setAnonCookie(res, newProfile.id);
    return newProfile;
  }

  private setAnonCookie(res: Response, id: string) {
    res.cookie("anon_id", id, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    });
  }

  async findById(id: string) {
    const result = await db
      .select()
      .from(anonProfiles)
      .where(eq(anonProfiles.id, id));
    return result[0] ?? null;
  }

  async findByAnonId(anonId: string) {
    const result = await db
      .select()
      .from(anonProfiles)
      .where(eq(anonProfiles.id, anonId));
    return result[0] ?? null;
  }

  async findByFingerprint(fp: string) {
    const result = await db
      .select()
      .from(anonProfileInfos)
      .where(eq(anonProfileInfos.fingerprint, fp));

    if (!result[0]) return null;

    return this.findById(result[0].anonProfileId);
  }

  async createProfile(info: Omit<NewAnonProfileInfo, "anonProfileId">) {
    const alias = generateRandomAlias();

    const [profile] = await db
      .insert(anonProfiles)
      .values({ alias })
      .returning();

    await db.insert(anonProfileInfos).values({
      ...info,
      anonProfileId: profile.id,
    });

    return profile;
  }

  async updateProfileInfo(
    profileId: string,
    data: Partial<NewAnonProfileInfo>
  ) {
    await db
      .update(anonProfileInfos)
      .set({
        ...data,
        createdAt: new Date(), // optional: treat as updatedAt if you're not adding `updatedAt`
      })
      .where(eq(anonProfileInfos.anonProfileId, profileId));
  }

  // ---- Simple UA detection utils ----
  private detectBrowser(ua: string): string {
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Safari")) return "Safari";
    return "Other";
  }

  private detectOS(ua: string): string {
    if (ua.includes("Win")) return "Windows";
    if (ua.includes("Mac")) return "Mac";
    if (ua.includes("Linux")) return "Linux";
    return "Other";
  }

  private detectDevice(ua: string): string {
    if (ua.includes("Mobi")) return "Mobile";
    if (ua.includes("Tablet")) return "Tablet";
    return "Desktop";
  }
}

export const anonService = new AnonService();
