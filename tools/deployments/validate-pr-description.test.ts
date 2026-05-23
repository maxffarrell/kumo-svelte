import { describe, it } from "node:test";
import assert from "node:assert";
import { validateDescription } from "./validate-pr-description.ts";

const NO_LABELS = "[]";
const NO_FILES = "[]";
const WITH_CHANGESET = '[".changeset/some-change.md"]';

describe("validateDescription", () => {
  describe("Tests section", () => {
    it("passes when tests are included", () => {
      const body = `
- Tests
- [x] Tests included/updated
      `;
      const errors = validateDescription(
        "Test PR",
        body,
        NO_LABELS,
        WITH_CHANGESET,
      );
      assert.deepStrictEqual(errors, []);
    });

    it("passes when manual testing is described", () => {
      const body = `
- Tests
- [x] Automated tests not possible - manual testing has been completed as follows: tested in browser
      `;
      const errors = validateDescription(
        "Test PR",
        body,
        NO_LABELS,
        WITH_CHANGESET,
      );
      assert.deepStrictEqual(errors, []);
    });

    it("passes when testing is not necessary with justification", () => {
      const body = `
- Tests
- [x] Additional testing not necessary because: docs only change
      `;
      const errors = validateDescription(
        "Test PR",
        body,
        NO_LABELS,
        WITH_CHANGESET,
      );
      assert.deepStrictEqual(errors, []);
    });

    it("fails when manual testing description is empty", () => {
      const body = `
- Tests
- [x] Automated tests not possible - manual testing has been completed as follows:
      `;
      const errors = validateDescription(
        "Test PR",
        body,
        NO_LABELS,
        WITH_CHANGESET,
      );
      assert.ok(
        errors.some((e) => e.includes("tests") && e.includes("same line")),
      );
    });

    it("fails when testing not necessary justification is empty", () => {
      const body = `
- Tests
- [x] Additional testing not necessary because:
      `;
      const errors = validateDescription(
        "Test PR",
        body,
        NO_LABELS,
        WITH_CHANGESET,
      );
      assert.ok(
        errors.some((e) => e.includes("tests") && e.includes("same line")),
      );
    });

    it("fails when no test checkbox is checked", () => {
      const body = `
- Tests
- [ ] Tests included/updated
- [ ] Automated tests not possible - manual testing has been completed as follows:
- [ ] Additional testing not necessary because:
      `;
      const errors = validateDescription(
        "Test PR",
        body,
        NO_LABELS,
        WITH_CHANGESET,
      );
      assert.ok(errors.some((e) => e.includes("tests")));
    });
  });

  describe("Changesets", () => {
    it("passes when changeset is included", () => {
      const body = `
- Tests
- [x] Tests included/updated
      `;
      const errors = validateDescription(
        "Test PR",
        body,
        NO_LABELS,
        WITH_CHANGESET,
      );
      assert.deepStrictEqual(errors, []);
    });

    it("fails when changeset is missing", () => {
      const body = `
- Tests
- [x] Tests included/updated
      `;
      const errors = validateDescription("Test PR", body, NO_LABELS, NO_FILES);
      assert.ok(errors.some((e) => e.includes("changeset")));
    });

    it("passes when no-changeset-required label is applied", () => {
      const body = `
- Tests
- [x] Tests included/updated
      `;
      const labels = '["no-changeset-required"]';
      const errors = validateDescription("Test PR", body, labels, NO_FILES);
      assert.deepStrictEqual(errors, []);
    });
  });

  describe("skip-pr-description-validation label", () => {
    it("skips all validation when label is applied", () => {
      const body = "This PR has no checklist at all";
      const labels = '["skip-pr-description-validation"]';
      const errors = validateDescription("Test PR", body, labels, NO_FILES);
      assert.deepStrictEqual(errors, []);
    });
  });

  describe("real-world PR bodies", () => {
    it("handles GitHub-style nested checkboxes", () => {
      const body = `
## Summary
Some changes here.

---

- Tests
  - [ ] Tests included/updated
  - [ ] Automated tests not possible - manual testing has been completed as follows:
  - [x] Additional testing not necessary because: this is a type-only change
      `;
      const errors = validateDescription(
        "Test PR",
        body,
        NO_LABELS,
        WITH_CHANGESET,
      );
      assert.deepStrictEqual(errors, []);
    });

    it("handles Windows line endings", () => {
      const body = "- Tests\r\n- [x] Tests included/updated";
      const errors = validateDescription(
        "Test PR",
        body,
        NO_LABELS,
        WITH_CHANGESET,
      );
      assert.deepStrictEqual(errors, []);
    });
  });
});
