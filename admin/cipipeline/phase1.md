### Pros and Cons of Pipeline Tools (Factored into our pipeline architecture design choices)
| Pipeline Tool | Pros   | Cons     |
| :---          | :---   | :---     |
| Linting/Code style | <ul><li>Error prevention</li><li>Consistency</li></ul> | <ul><li>Can be strict (cares about number of spaces, etc.)</li><li>False positives</li><li>Learning curve to learn rules and conventions</li></ul>|
| Code quality via tools | <ul><li>Better maintainability</li><li>Increased performance, security, reliability</li></ul> | <ul><li>Can be time consuming</li><li>Requires more planning, testing, documentation</li></ul>|
| Code quality via human review | <ul><li>Better collaboration</li><li>Increased transparency and shared knowledge</li></ul> | <ul><li>Delays</li><li>Time consuming</li></ul>|
| Unit tests via automation | <ul><li>Improved code quality</li><li>Confidence in results</li><li>Faster feedback in trivial cases</li></ul> | <ul><li>False positives (passing easy tests) -> bugs going forward</li><li>Limited scope (can't cover every test case)</li></ul>|
| Documentation Generation | <ul><li>Improved code understanding</li><li>Time saving in group settings</li></ul> | <ul><li>Maintnence overhead</li><li>Limited context</li></ul>|

### Current Choices:
-  ✅ Automated Unit Tests
    - Done using Jest
-  ✅ Documentation generation
    - Done using JSDocs
-  ✅ Code quality via human review
    - Done during meetings
-  ❓ Code Quality/Style via tools 
    - Not sure

### Goals:
- Workflows running in parallel (split by task)

### Pipeline Status:
- In progress:
    - Trying to add code quality checks via ESLint, is proving to be
      unnecessarily difficult
- What we have:
    - One workflow with all tasks
    - Unit testing workflow via Jest
    - Document generation workflow via JSDocs
