import stall01 from "@/assets/stall/IMG-20240419-WA0082.jpg";
import stall02 from "@/assets/stall/IMG-20240419-WA0083.jpg";
import stall03 from "@/assets/stall/IMG-20240419-WA0088.jpg";
import stall04 from "@/assets/stall/IMG-20240419-WA0108.jpg";
import stall05 from "@/assets/stall/IMG-20250702-WA0053.jpg";
import stall06 from "@/assets/stall/IMG-20250702-WA0054.jpg";
import stall07 from "@/assets/stall/IMG_9125.PNG";
import stall08 from "@/assets/stall/IMG_9126.PNG";
import stall09 from "@/assets/stall/IMG_9127.PNG";
import stall10 from "@/assets/stall/IMG_9129.PNG";
import stall11 from "@/assets/stall/IMG_9130.PNG";
import stall12 from "@/assets/stall/Screenshot_20250704_220106.jpg";
import stall13 from "@/assets/stall/Screenshot_20250704_220131.jpg";
import stall14 from "@/assets/stall/Screenshot_20250704_222302.jpg";
import stall15 from "@/assets/stall/Screenshot_20250704_223741.jpg";
import stall16 from "@/assets/stall/Screenshot_20250704_223749.jpg";
import stall17 from "@/assets/stall/Screenshot_20250704_223758.jpg";
import stall18 from "@/assets/stall/Screenshot_20250704_224515.jpg";
import stall19 from "@/assets/stall/Screenshot_20250704_224556.jpg";

export const STALL_IMAGES_LIST = [
  stall01,
  stall02,
  stall03,
  stall04,
  stall05,
  stall06,
  stall07,
  stall08,
  stall09,
  stall10,
  stall11,
  stall12,
  stall13,
  stall14,
  stall15,
  stall16,
  stall17,
  stall18,
  stall19,
];

export const DEFAULT_STALL_IMAGES: Record<string, string> = {
  stall_1: stall01,
  stall_2: stall02,
  stall_3: stall03,
  stall_4: stall04,
  stall_5: stall05,
  stall_6: stall06,
  stall_7: stall07,
  stall_8: stall08,
  stall_9: stall09,
  stall_10: stall10,
  stall_11: stall11,
  stall_12: stall12,
  stall_13: stall13,
  stall_14: stall14,
  stall_15: stall15,
  stall_16: stall16,
  stall_17: stall17,
  stall_18: stall18,
  stall_19: stall19,
  "IMG-20240419-WA0082.jpg": stall01,
  "IMG-20240419-WA0083.jpg": stall02,
  "IMG-20240419-WA0088.jpg": stall03,
  "IMG-20240419-WA0108.jpg": stall04,
  "IMG-20250702-WA0053.jpg": stall05,
  "IMG-20250702-WA0054.jpg": stall06,
  "IMG_9125.PNG": stall07,
  "IMG_9126.PNG": stall08,
  "IMG_9127.PNG": stall09,
  "IMG_9129.PNG": stall10,
  "IMG_9130.PNG": stall11,
  "Screenshot_20250704_220106.jpg": stall12,
  "Screenshot_20250704_220131.jpg": stall13,
  "Screenshot_20250704_222302.jpg": stall14,
  "Screenshot_20250704_223741.jpg": stall15,
  "Screenshot_20250704_223749.jpg": stall16,
  "Screenshot_20250704_223758.jpg": stall17,
  "Screenshot_20250704_224515.jpg": stall18,
  "Screenshot_20250704_224556.jpg": stall19,
};

export function resolveStallImage(
  item?: { id?: string; image?: string; img?: string },
  index = 0
): string {
  if (!item) return STALL_IMAGES_LIST[0];

  const imgStr = item.image || item.img || "";

  // 1. If it's a user-uploaded image (data:image/... or http URL), return it directly
  if (imgStr.startsWith("data:") || imgStr.startsWith("http://") || imgStr.startsWith("https://")) {
    return imgStr;
  }

  // 2. If it matches by stall ID (e.g. stall_1 -> stall01)
  if (item.id && DEFAULT_STALL_IMAGES[item.id]) {
    return DEFAULT_STALL_IMAGES[item.id];
  }

  // 3. If it matches by filename in the path
  if (imgStr) {
    const filename = imgStr.split("/").pop() || "";
    if (DEFAULT_STALL_IMAGES[filename]) {
      return DEFAULT_STALL_IMAGES[filename];
    }
  }

  // 4. Default to index-based stall asset from src/assets/stall/
  return STALL_IMAGES_LIST[index % STALL_IMAGES_LIST.length];
}

