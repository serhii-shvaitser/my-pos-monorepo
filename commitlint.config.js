export default {
  extends: ["@commitlint/config-conventional"],
  helpUrl:
    "\n💡 Allowed commit types:\n" +
    "  feat:     A new feature / functionality\n" +
    "  fix:      A bug fix\n" +
    "  docs:     Documentation changes only (e.g., README)\n" +
    "  style:    Code formatting changes (spaces, commas, Prettier - no logic changes)\n" +
    "  refactor: Code restructuring (no new features, no bug fixes)\n" +
    "  perf:     Code changes that improve performance\n" +
    "  test:     Adding or correcting tests\n" +
    "  chore:    Routine tasks, build tools, config updates, husky, pnpm packages\n" +
    "  build:    Changes affecting the build system (e.g., turborepo, vite)\n" +
    "  ci:       CI/CD configuration updates (e.g., GitHub Actions)\n\n" +
    "📌 Example: feat(web): add order button\n",
};
