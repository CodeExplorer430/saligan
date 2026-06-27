export const nodeVersion = "24";
export const packageManager = "pnpm@11.0.0";
export const sourceFileLineLimit = 500;

export const toolingNotes = {
  eslint: "Root eslint.config.js is canonical.",
  prettier: "Root prettier.config.cjs is canonical.",
  typescript: "Extend root tsconfig.base.json and keep strict mode enabled.",
} as const;
