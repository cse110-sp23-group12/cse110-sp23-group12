### Pros and Cons of Pipeline Tools (Factored into our pipeline architecture design choices)
| Pipeline Tool | Pros   | Cons     |
| :---          | :---   | :---     |
| Linting/Code style | <ul><li>Error prevention</li><li>Consistency</li></ul> | <ul><li>Can be strict (cares about number of spaces, etc.)</li><li>False positives</li><li>Learning curve to learn rules and conventions</li></ul>|
| Code quality via tools | <ul><li>Better maintainability</li><li>Increased performance, security, reliability</li></ul> | <ul><li>Can be time consuming</li><li>Requires more planning, testing, documentation</li></ul>|
| Code quality via human review | <ul><li>Better collaboration</li><li>Increased transparency and shared knowledge</li></ul> | <ul><li>Delays</li><li>Time consuming</li></ul>|
| Unit tests via automation | <ul><li>Improved code quality</li><li>Confidence in results</li><li>Faster feedback in trivial cases</li></ul> | <ul><li>False positives (passing easy tests) -> bugs going forward</li><li>Limited scope (can't cover every test case)</li></ul>|
| Documentation Generation | <ul><li>Improved code understanding</li><li>Time saving in group settings</li></ul> | <ul><li>Maintnence overhead</li><li>Limited context</li></ul>|

### Current Choices:
-  ✅ Code checks
    - Done using ESLint
-  ✅ Automated Unit Tests
    - Done using Jest
-  ✅ Documentation generation
    - Done using JSDocs
-  ✅ Code quality via human review
    - Done during meetings
-  ❓ Code Quality/Style via Prettier
    - Not sure

---

### Goals:
- Workflows running in parallel (split by task)

---

### Pipeline Status:
- In progress:
    - Trying to add more checks via Prettier
- What we have:
    - Three workflows
    - Unit tests with Jest
    - ESLint checks
    - Document generation workflow via JSDocs

---
### Diagram:

![phase1](https://github.com/cse110-sp23-group12/cse110-sp23-group12/assets/99768694/b0c2f992-57c6-4cca-9412-7d28459197c0)
---

### Philosophy:
Some general principles that we followed when choosing our CI/CD Pipeline tools
include the following:
- **Simplicity:** From lecture, we learned that introducing new tools is not
  always beneficial to the team. Decluttering the pipeline and focusing on core
  functionality will save our team time and effort spent on configuration,
  maintnence and troubleshooting.
- **Ease of Adoption:** We want to keep the complexity of
  our pipeline to a minimum to avoid sinking time into learning those tools
  rather than getting meaningful work done.
- **Only necessary features included:** Our pipline decisions stick to the
  basics: testing, document generation, and prettier code. The tools we choose
  should only exist to perform basic necessary tasks.

