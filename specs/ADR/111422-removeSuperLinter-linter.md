# Remove super linter and switch to separate ESLint and CSSLint

## Context and Problem Statement

Having conflicts with Prettier and Super Linter with how they want files to be styled.

Which aspect of the pipeline would be easier to remove or change to fix this issue while not compromising pipeline?

## Considered Options

* Remove prettier and find a different compatible code formatting option

* Remove Super Linter and replace with seperate ESLint and CSSLint workflows

## Decision Outcome

Chosen Option: "Remove Super Linter and replace with seperate ESLint and CSSLint workflows"

### Consquences

* Will get rid of conflicts with Prettier with configuration
* Will be easier to configure/customize in the future if needed
* Need to set up two new workflows and make sure they do work

## Pros and Cons of Options

### Replacing Super Linter

* Good, can configure ESLint to turn off rules that conflict with Prettier
* Good, can have better customization with linter overall
* Good, don't need to find replacement for Prettier
* Good, we don't really like some of Super Linter's style/formatting rules
* Bad, need to create two new workflows for pipeline + configuration

### Replacing Prettier

* Good, only need to replace one workflow/code formatting
* Bad, don't have an idea yet of what else we would do
* Bad, Super Linter rules and configuration is more annoying
