import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const limit = 500;
const reviewThreshold = 350;
const sourcePattern = /\.(?:c|m)?[jt]sx?$/u;
const exemptPatterns = [
  /(^|\/)\.git\//u,
  /(^|\/)\.turbo\//u,
  /(^|\/)node_modules\//u,
  /(^|\/)dist\//u,
  /(^|\/)coverage\//u,
  /(^|\/)generated\//u,
  /(^|\/)__snapshots__\//u,
  /(^|\/)packages\/database\/drizzle\//u,
  /\.(?:generated|gen)\.(?:c|m)?[jt]sx?$/u,
  /\.snap$/u,
];

const root = process.cwd();

const collectSourceFiles = (directory) => {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = join(directory, entry.name);
    const file = relative(root, absolutePath).replaceAll("\\", "/");

    if (exemptPatterns.some((pattern) => pattern.test(file) || pattern.test(`${file}/`))) {
      continue;
    }
    if (entry.isDirectory()) files.push(...collectSourceFiles(absolutePath));
    else if (entry.isFile() && sourcePattern.test(file)) files.push(file);
  }

  return files;
};

const sourceFiles = collectSourceFiles(root);

const lineCount = (content) => {
  if (content.length === 0) return 0;
  const lines = content.split(/\r\n|\r|\n/u);
  return content.endsWith("\n") || content.endsWith("\r") ? lines.length - 1 : lines.length;
};

const results = sourceFiles
  .map((file) => ({ file, lines: lineCount(readFileSync(file, "utf8")) }))
  .sort((left, right) => right.lines - left.lines);

const failures = results.filter(({ lines }) => lines >= limit);
const reviewCandidates = results.filter(({ lines }) => lines >= reviewThreshold && lines < limit);

if (reviewCandidates.length > 0) {
  console.log("Source files requiring split evaluation:");
  for (const { file, lines } of reviewCandidates) {
    console.log(`  ${lines} ${file}`);
  }
}

if (failures.length > 0) {
  console.error(`Source files must remain below ${limit} physical lines:`);
  for (const { file, lines } of failures) {
    console.error(`  ${lines} ${file}`);
  }
  process.exitCode = 1;
} else {
  const largest = results[0];
  const detail = largest ? ` Largest: ${largest.file} (${largest.lines}).` : "";
  console.log(`Source size gate passed: ${results.length} files below ${limit} lines.${detail}`);
}
