import { execSync } from "node:child_process";
import fs from "node:fs";
import { Writable } from "node:stream";
import semanticRelease from "semantic-release";
import { analyzeCommits } from "@semantic-release/commit-analyzer";
import semver from "semver";

function getLatestStableTag() {
  try {
    const stdout = execSync('git describe --tags --match "v[0-9]*.[0-9]*.[0-9]*" --abbrev=0', {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();
    if (stdout) return stdout;
  } catch {}

  try {
    const rawTags = execSync('git tag -l "v[0-9]*.[0-9]*.[0-9]*"', {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();
    const tags = rawTags
      .split("\n")
      .map(t => t.trim())
      .filter(Boolean);
    if (tags.length > 0) {
      tags.sort((a, b) => semver.rcompare(a.replace(/^v/, ""), b.replace(/^v/, "")));
      return tags[0];
    }
  } catch {}

  return null;
}

function getLastReleaseRef(latestTag) {
  if (latestTag) {
    try {
      const commit = execSync(
        `git log ${latestTag}..HEAD --grep="^chore(release): v" -n 1 --format="%H"`,
        { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] }
      ).trim();
      if (commit) return commit;
    } catch {}
    return latestTag;
  }

  try {
    const commit = execSync(
      `git log --grep="^chore(release): v" -n 1 --format="%H"`,
      { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] }
    ).trim();
    if (commit) return commit;
  } catch {}

  return null;
}

function getCommits(fromRef) {
  const range = fromRef ? `${fromRef}..HEAD` : "HEAD";
  const rawCommits = execSync(`git log ${range} --format="%H%x1f%s%x1f%b%x1e"`, {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "ignore"],
  });

  return rawCommits
    .split("\x1e")
    .map(chunk => chunk.trim())
    .filter(Boolean)
    .map(chunk => {
      const [hash, subject, body = ""] = chunk.split("\x1f");
      const message = body ? `${subject}\n\n${body}` : subject;
      return { hash, message };
    });
}

const latestTag = getLatestStableTag();
const lastReleaseRef = getLastReleaseRef(latestTag);
const newCommits = getCommits(lastReleaseRef);

if (newCommits.length === 0) {
  console.log("No release needed");
  process.exit(0);
}

const releaseType = await analyzeCommits(
  { preset: "conventionalcommits" },
  { commits: newCommits, logger: { log: () => {} } }
);

if (!releaseType) {
  console.log("No release needed");
  process.exit(0);
}

const dummyStream = new Writable({
  write(chunk, enc, cb) {
    cb();
  },
});

let currentBranch = "dev";
try {
  currentBranch = execSync("git rev-parse --abbrev-ref HEAD", {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "ignore"],
  }).trim();
} catch {}

const branches = Array.from(new Set([currentBranch, "dev"]));

const result = await semanticRelease(
  {
    dryRun: true,
    ci: false,
    branches,
    plugins: [
      [
        "@semantic-release/commit-analyzer",
        {
          preset: "conventionalcommits",
        },
      ],
    ],
  },
  { stdout: dummyStream, stderr: dummyStream }
);

const nextStableVersion = result?.nextRelease?.version;
if (!nextStableVersion) {
  console.log("No release needed");
  process.exit(0);
}

const pkg = JSON.parse(
  fs.readFileSync(new URL("../package.json", import.meta.url), "utf8")
);
const currentVersion = pkg.version;
const latestTagVersion = latestTag ? latestTag.replace(/^v/, "") : "0.0.0";

let nextDevNum = 1;
const devMatch = currentVersion.match(/^(\d+\.\d+\.\d+)-dev\.(\d+)$/);

if (devMatch) {
  const [, currentBase, devNumStr] = devMatch;
  const currentDevNum = parseInt(devNumStr, 10);

  if (semver.lte(currentBase, latestTagVersion)) {
    nextDevNum = 1;
  } else {
    nextDevNum = currentDevNum + 1;
  }
} else {
  nextDevNum = 1;
}

const nextVersion = `${nextStableVersion}-dev.${nextDevNum}`;

if (currentVersion === nextVersion) {
  console.log("No release needed");
  process.exit(0);
}

console.log(nextVersion);
