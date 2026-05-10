export const FEATURES = {
  LATEX_EDITOR: true,
  VIDEO_CONVERTER: true,
  IMAGE_TOOLS: true,
  PDF_TOOLS: true,
  JSON_TOOLS: true,
  CALCULATORS: true,
  AUTH: false, // Future growth
  USER_HISTORY: false, // Future growth
  AI_TOOLS: false, // Future growth
};

export type FeatureKey = keyof typeof FEATURES;

export function isFeatureEnabled(key: FeatureKey): boolean {
  return FEATURES[key];
}
