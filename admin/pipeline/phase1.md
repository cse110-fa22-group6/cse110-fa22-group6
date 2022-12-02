# Phase 1 Status Update On CI/CD Pipeline

For our CI/CD Pipeline, we plan to mainly utilize the automated
actions on GitHub to help us with keeping our code well maintained.
There are currently six GitHub actions we want to utilize, HTML
Validation for validating our front-end pages, ESLint for our JS pages,
in addition to Jest for Unit Testing, CSSLint for our CSS styles. We
are also using JSDocs to generate documentation. We hope to automatically
deploy those pages to GitHub pages when that is fully implemented. Lastly,
we are using

## Diagram

![image](phase1.drawio.png)

## Status of Each Part

- HTML Validation - Implemented on pipeline branch
- ESLint - Implemented on pipeline branch
- Jest - Still being implemented (JC)
- CSSLint - Implemented on sub-branch of pipeline, waiting on merge
- JSDocs - Implemented on pipeline branch
- Prettier - Implemented on pipeline branch

## Next Steps

- Need to finish Unit Testing and Implementing Jest
- Merge the Pipeline with main so everyone
  can start pushing/merging code and have it pass tests
