import { Router } from "express";
import path from "path";
import { anonService } from "../modules/anon/anon.service";
import { ua } from "../utils/ua";

const router = Router();

router.get("/", (req, res) => {
  const { browser, os, device } = ua(req.headers["user-agent"]);

  const deviceInfo = {
    browser: browser,
    os: os,
    device: device,
  };
  const fingerprint = {
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    carrier: req.headers["x-carrier"],
    acceptLanguage: req.headers["accept-language"],
    platform: req.headers["sec-ch-ua-platform"] || "unknown",
    cookiesEnabled: req.headers["cookie"] !== undefined,
  };

  console.log("Device Info:", deviceInfo);

  // Ask browser to include platform in future requests
  res.set("Accept-CH", "Sec-CH-UA-Platform");

  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.post("/fingerprint", (req, res) => {
  // console.log("Client fingerprint:", req.body);
  res.status(200).json({ status: "received" });
});

router.get("/anon", async (req, res) => {
  const anonData = await anonService.getOrCreateAnon(req, res);
  res.json(anonData);
});

export default router;
