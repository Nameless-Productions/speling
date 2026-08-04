# Contributing to speling

Thanks for your interest in contributing! This document outlines how to get set up, propose changes, and submit contributions.

## Getting Started

1. Fork the repository and clone your fork locally.
2. Install dependencies according to the project's README.
3. Create a new branch for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

- Keep changes focused — one feature or fix per pull request.
- Write clear, descriptive commit messages (e.g. `fix: correct typo detection for compound words`).
- Add or update tests for any behavior you change.
- Run the existing test suite before opening a PR to make sure nothing is broken.
- Follow the existing code style; run any configured linter/formatter before committing. (format code is in pre-commit with husky, run `pnpm format` if that doesn't work)

## Submitting a Pull Request

1. Push your branch to your fork.
2. Open a pull request against the `main` branch.
3. In the PR description, explain:
   - What the change does
   - Why it's needed
   - How you tested it
4. Link any related issues (e.g. `Closes #12`).
5. Be responsive to review feedback — small follow-up commits are fine.

## Reporting Bugs

When filing a bug report, please include:
- Steps to reproduce
- Expected vs. actual behavior
- Environment details (Browser)
- Any relevant logs or screenshots

## Suggesting Features

Open an issue describing:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

## Code of Conduct

Be respectful and constructive. Assume good intent, and keep discussions focused on the technical merits of a contribution.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
