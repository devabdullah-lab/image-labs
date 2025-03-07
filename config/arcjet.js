import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

const aj = arcjet({
    key: ARCJET_KEY,
    characteristics: ["ip.src"], // Track requests by IP
    rules: [
      shield({ mode: "LIVE" }),
      detectBot({
        mode: "LIVE",
        allow: [ "CATEGORY:SEARCH_ENGINE" ],
      }),
      tokenBucket({
        mode: "LIVE",
        refillRate: 10, // 🔄 أسرع من السابق (10 بدلاً من 5)
        interval: 5, // ⏳ كل 5 ثواني (أسرع من 10)
        capacity: 25, // 🪣 سعة أكبر (20 بدلاً من 10)
      }),
    ],
});
  
export default aj;