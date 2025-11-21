---
title: "Embracing Specification-Driven Development with Speckit"
summary: "A guide to understanding and implementing Specification Driven Development (SDD) using Speckit, focusing on core principles and commands for a more robust development process, agentic or not."
date: "2025-11-20"
tags: ["software-development", "methodology", "sdd", "speckit", "ai", "agents", "spec-driven", "llm"]
draft: false
---

In my [earlier blog](https://niteshrijal.com/blog/pitfalls-deadline-resume-driven-development/) I briefly touched upon the idea of Specification Driven Development (SDD) that promises greater efficiency, higher quality, and better alignment between stakeholders and developers. While Test Driven Development (TDD) has long been a cornerstone of quality engineering, a new paradigm, especially in the context of AI and agent driven development: **Specification Driven Development (SDD)** is making headlines recently.

This post will explore the principles of SDD and introduce a practical tool, `speckit`, that can help you adopt this methodology. We'll focus on the foundational commands that embody the spirit of SDD, moving beyond just planning and implementation to a deeper level of understanding and clarification.

## What is Specification Driven Development?

At its core, SDD is about writing detailed, unambiguous specifications *before* writing any implementation code. It's a "spec first" approach that extends the principles of TDD to the entire development lifecycle.

The speckit documentation has the [core principles](https://github.com/github/spec-kit/blob/main/spec-driven.md#core-principles) of Spec Driven Development really well defined, which will help with understanding the workflow better.

The process looks something like this:

1.  **Specify**: Define what you want to build (requirements and user stories).
2.  **Clarify**: Refine the specification, removing ambiguity, clarify underspecified areas and defining clear acceptance criteria.
3.  **Plan**: Create technical implementation plans with your chosen tech stack.
4.  **Tasks**: Generate actionable task lists for implementation.
5.  **Implement**: Execute all tasks to build the feature according to the plan.

By front-loading the effort on creating robust specifications, SDD aims to reduce rework, improve communication, and ensure that the final product is what the stakeholders actually wanted.

## Introducing Speckit

[SpecKit](https://github.com/github/spec-kit) is an open source tool, created by Github, that provides a structured framework for practically implementing Specification Driven Development. While it is designed with AI agents in mind and needs an agentic development tool to even initialize, its principles and commands are incredibly valuable for human developers as well. 

It helps formalize the process of creating and refining specifications, ensuring that nothing gets lost in translation. It is also really useful even if you don't want to use full end-to-end agentic development. As a solo developer, I was able to leverage speckit to quickly iterate and brainstorm my ideas, get better clarity myself as well as be able to define steps for implementation.

After this, I may choose to offload some tasks to AI Coder, and do some of it myself, truly AI assisted planning and coding in that sense.

### Installation

Getting started with `speckit` is straightforward. You can install it via `uv`:

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

Once installed, you can use the [core commands](https://github.com/github/spec-kit?tab=readme-ov-file#core-commands) in your terminal.

If you do not have `uv` installed, you may follow [the official guide](https://docs.astral.sh/uv/getting-started/installation/) to get it installed. On Mac, you can easily install it via `homebrew`:

```bash
brew install uv
```

### Initialization of Speckit

After installation, to be able to use speckit, you first need to initialize it in the project you want to use. There are [several flags](https://github.com/github/spec-kit/tree/main?tab=readme-ov-file#specify-init-arguments--options) you can use to further customize the initialization process.

#### using `--here`

This flag helps to initialize speckit inside an existing project. Run the command in terminal from inside a folder. If the folder is empty it will initialize fresh, but if the folder already has been initalized earlier, it may overwrite existing files.

```bash
specify init --here
```

#### using `--ai`

This flag lets you specify a default ai tool to use for the process. If you don't pass the flag, after running the init command, it will ask you.

```bash
specify init --here --ai claude
```

## Core Principles and Commands in Speckit

While `speckit` has commands for the entire AI/LLM driven development workflow (like `plan`, `tasks`, and `implement`), in my opinion the true power of SDD lies in the initial stages of specification and clarification. Let's dive into the core commands that facilitate this.

### `speckit.constitution`: Establishing the Ground Rules

The `constitution` command is the starting point for any project that uses speckit. It helps you define the high level principles, constraints, and goals of your project. Think of it as the guiding philosophy that will inform all future development.

This is particularly useful in exisiting projects that have some language or framework already defined. 

#### How it works

When you run `speckit.constitution`, you're prompted to define these core tenets. This isn't about implementation details; it's about the "why" behind the project.

Let's say we're building a new blogging platform. Our constitution might include principles like:

*   **Content first:** The reading experience is paramount. The design should be clean, minimal, and fast-loading.
*   **Markdown based:** All content should be written in plain Markdown for portability and ease of use.
*   **Extensible:** The platform should be easily extensible with a plugin architecture.
*   **Secure:** Security is a top priority. All user data must be handled with care.

By establishing this constitution, you create a shared understanding of the project's values. Every subsequent specification and implementation decision can be measured against these principles.

#### Example

You may generate a constitution as follows:

```bash
/speckit.constitution I am building a markdown based blogging platform. Create elaborate principles focused on markdown content, code quality, testing standards, user experience consistency, and performance requirements.
```

### `speckit.specify`: Defining the "What"

Once you have a constitution, the `specify` command is used to create a detailed specification for a particular feature. This is where you move from high-level principles to concrete requirements.

#### How it works

You'll then run the `speckit.specify` to define what you wanna build. The goal is to describe the feature's behavior, inputs, and outputs in as much detail as possible.

#### Example

You generate the specification as follows:

```bash
/speckit.specify Create the ability to toggle between light and dark modes.
```

This the generates a markdown file, with details of the feature. You'll see a section in the generated markdown that has user stories defined as:

```gherkin
Feature: Theme Toggle

As a user, I want to toggle between light and dark modes.

Scenario: Toggling dark mode
  Given the user is on any page of the blog
  When the user clicks the "Theme" toggle button
  Then the website's color scheme should switch to the opposite mode (light to dark, or dark to light)
  And the user's preference should be saved for future visits.
```

### `speckit.clarify`: Refining and Removing Ambiguity

The `clarify` command is perhaps the most crucial and often overlooked step in the SDD process. It is described as "optional" in the documentation, but I think it is really useful. Its purpose is to take a specification and refine it, asking probing questions to uncover edge cases and ambiguities.

#### How it works

You would run `speckit.clarify` which would update/modify your specification file that was generated earlier. This is often a collaborative process, involving developers, product managers, and QA. The goal is to challenge the specification and make it as robust as possible.

#### Example

You can iterate using `clarify` as follows:

```bash
/speckit.clarify Make sure accessibility requirements are considered for dark mode
```

Applying `clarify` to our dark mode specification might raise questions like:

*   What is the default theme if the user has never visited before? Should it be based on their system preference?
*   How is the theme preference stored? (e.g., `localStorage`)
*   What happens if the user's browser doesn't support `localStorage`?
*   Are there any specific elements that should *not* change color in dark mode (e.g., brand logos)?
*   How should the toggle button's state be represented visually in each mode?

By asking these questions *before* implementation begins, you can address potential issues proactively. The output of the `clarify` command is a more refined specification that accounts for these edge cases.

> TIP: My suggestion for solo developers and teams are to iteratively run the specify and clarify commands until you are satisfied with the specification.

## Why Focus on These Commands?

Commands like `plan`, `tasks`, and `implement` are about the "how" of development. But without a solid foundation of "what" and "why," the "how" can easily go astray.

If you want to take this forward with AI Coding, the `plan`, `tasks` and `implement` commands are your friends. Different AI Coding Tools already handle this part pretty well, in my opinion. With these commands from speckit, you're leveraging what other tools provide, but with the guardrails and templates that are defined by speckit. There are already [some scripts](https://github.com/github/spec-kit/tree/main/scripts/bash) as well as the [templates](https://github.com/github/spec-kit/tree/main/templates) that are in speckit which is run when you run those commands.

By emphasizing `constitution`, `specify`, and `clarify`, you invest in a deep, shared understanding of the problem you're trying to solve. This leads to:

*   **Reduced Rework:** Fewer "oops, that's not what I meant" moments.
*   **Better Alignment:** Everyone is on the same page from the start.
*   **Higher Quality:** Edge cases are handled thoughtfully, not as afterthoughts.
*   **Improved Maintainability:** Clear specifications serve as excellent documentation.

## Conclusion

Specification Driven Development, facilitated by tools like `speckit`, offers a powerful way to build better software. By shifting our focus to the early stages of a project's lifecycle and investing time in creating clear, unambiguous specifications, we can build more robust, maintainable, and successful products.

While the allure of jumping straight into code is strong, the discipline of SDD pays dividends in the long run. So next time you start a new project or feature, give `speckit` a try. Start with the `constitution`, `specify` your features, and `clarify` them until they are crystal clear. You might be surprised at how much smoother the rest of the development process becomes.
