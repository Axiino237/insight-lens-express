import defaultRenderImg from "@/assets/eppinger-stall.png";
import defaultExecutedImg from "@/assets/stall/IMG-20240419-WA0083.jpg";

export interface StallComparisonConfig {
  title: string;
  subtitle: string;
  client: string;
  venue: string;
  renderImage: string;
  executedImage: string;
}

export const DEFAULT_STALL_COMPARISON: StallComparisonConfig = {
  title: "Precision Engineering Expo Pavilion",
  subtitle: "3D CAD Visualization vs. Physical On-Ground Fabrication",
  client: "Precision Systems India (Demo Expo)",
  venue: "Chennai Trade Centre, Nandambakkam",
  renderImage: "default_render",
  executedImage: "default_executed",
};

export function resolveComparisonRender(imageStr?: string): string {
  if (!imageStr || imageStr === "default_render") {
    return defaultRenderImg;
  }
  return imageStr;
}

export function resolveComparisonExecuted(imageStr?: string): string {
  if (!imageStr || imageStr === "default_executed") {
    return defaultExecutedImg;
  }
  return imageStr;
}

