export default {
  options: {
    preset: {
      name: "conventionalcommits",
      types: [
        {
          type: "feat",
          section: "Features",
        },
        {
          type: "fix",
          section: "Bug Fixes",
        },
        {
          type: "perf",
          section: "Performance",
        },
        {
          type: "refactor",
          section: "Refactoring",
        },
        {
          type: "test",
          section: "Tests",
        },
        {
          type: "docs",
          section: "Documentation",
        },
        {
          type: "ci",
          section: "CI",
        },
        {
          type: "build",
          section: "Build",
        },
        {
          type: "revert",
          section: "Reverts",
        },
        {
          type: "chore",
          hidden: true,
        },
        {
          type: "style",
          hidden: true,
        },
      ],
    },
  },
};
