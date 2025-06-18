🚀 Cypress E2E Automation

This project contains end-to-end automated tests using [Cypress](https://www.cypress.io/), integrated with [GitHub Actions](https://docs.github.com/actions) to automatically run tests on each push via Continuous Integration (CI).

-

📋 About the Project

The main goal of this repository is to demonstrate how to use Cypress for E2E test automation and how to integrate it with GitHub Actions to create a basic CI pipeline.

Whenever new code is pushed to the repository, the test suite runs automatically through GitHub Actions.

-

🧪 Technologies Used

- [Cypress]
- [JavaScript]
- [GitHub Actions]
- [cypress-file-upload]

-

▶️ Running the Tests Locally

1. Clone the repository:
   [git clone https://github.com/Leozolthar/Cypress-Automation.git]

2. Install dependencies:
  [npm install]

3. Install file upload dependency (required for some tests):
  [npm install --save-dev cypress-file-upload]

4. Run the tests:
  [npx cypress open  OR   npx cypress run]

-

⚙️ GitHub Actions
Tests run automatically on every push or pull request using GitHub Actions.
The configuration is defined in the workflow file:
  .github/workflows/cypress.yml



