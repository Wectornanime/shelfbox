import semanticRelease from "semantic-release";

const result = await semanticRelease({
  dryRun: true,
  ci: false,
  branches: ["dev"],
  plugins: ["@semantic-release/commit-analyzer"],
});

if (!result?.nextRelease?.version) {
  console.log("No release needed");
  process.exit(0);
}

console.log(result.nextRelease.version);
