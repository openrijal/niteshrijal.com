---
title: "Why Spec Generation Must Be a Collaborative Process"
summary: "SDD works, but locking it inside a local CLI keeps product, design, and other stakeholders out of the most important phase. A Git-backed, framework-agnostic web platform can fix that."
date: "Jul 16 2026"
tags: ["software-development", "methodology", "sdd", "spec-driven", "collaboration", "ai", "agents", "product-management", "llm"]
draft: true
---

Software teams ship faster than ever, but speed without structure leads to rework, scope creep, and implementations that drift from what was actually needed.

In my previous posts, I explored how [Specification-Driven Development (SDD)](https://niteshrijal.com/blog/spec-driven-development-with-speckit/) solves this by putting a detailed blueprint at the center of the development process before a single line of code is written. We looked at how tools like SpecKit can accelerate this workflow by generating technical plans and tasks for human and AI developers.

But as I push to fully embrace SDD and agentic AI capabilities, a new bottleneck has emerged. Local CLI-based workflows isolate non-engineering stakeholders and prevent effective collaboration during the specification phase, which is exactly the phase where their input matters most. Our shared understanding ends up trapped in silos.

This post makes the case for moving SDD out of the local terminal and into a centralized, collaborative hub, and why a Git-backed, integrated approach is the only way to build lasting context.

## The Current Mess: Fragmented Context and Architectural Drift

Getting an idea into production usually means losing context at every handoff. Manual translation from PRDs to Jira tickets inevitably leads to architectural drift and lost requirements.

A huge driver behind this friction is fragmented documentation. Product and design teams lack a collaborative interface to review and refine technical specs before development begins. When you combine format fragmentation (Google Docs, PDFs, scattered Markdown files) with isolated local AI tools, establishing a single source of truth becomes nearly impossible.

## The Vision: A Framework-Agnostic, Git-Native Hub

To treat product and engineering specs as machine-readable, "compilable" sources of truth, we need a centralized web application. Bringing spec work into a shared UI builds persistent context over time instead of scattering it across laptops and chat threads.

The platform I am proposing is entirely framework-agnostic. Whether your team uses open source tools like SpecKit, OpenSpec, or BMAD, internal tools like Wave, LID, or UncleDev, or even custom workflows like Grill-Me, the web platform simply acts as the centralized environment to plug them into.

While collaboration happens in a friendly web portal, the ultimate source of truth resides directly in the code repository:

* All specifications exist as version-controlled files.
* Feedback and discussions are captured as Git-native comments.
* The lifecycle concludes with a formal Pull Request, so documentation stays tightly coupled with code.

## The 5-Phase Locked Workflow

Change is inevitable, but shifting requirements should not cause spec drift. The platform enforces a sequential approval process where all changes must happen at the specification level before proceeding.

### Phase 1: PRD Refinement

Stakeholders collaborate on the initial PRD, clarifying edge cases via inline comments and built-in, well-known workflows like `/speckit.clarify` or `/grill-me`.

### Phase 2: PRD Lock and Approval

The PRD is iteratively regenerated until consensus is reached. It is then finalized by freezing it, and an optional Pull Request is opened for formal approval and merge.

### Phase 3: ERD Mapping and Review

The system generates an Engineering Requirements Document (ERD) mapped directly to the approved PRD. Using context from existing code and documentation, engineering reviews the ERD to ensure the architecture satisfies the PRD constraints. Technical adjustments are finalized here.

### Phase 4: ERD Lock and Approval

The finalized ERD is pushed to GitHub as actionable tasks, complete with defined API contracts and technical documentation. Just like the PRD, this is optionally reviewed, approved, and merged via a PR.

### Phase 5: PRD to Stories Mapping and Jira Integration

Finally, the finalized ERD is automatically converted into Jira Epics and Stories using the standardized Jira workflow defined by the teams.

## The Integration Dispatch

Once the PRD and ERD are frozen and finalized, there is one more job to do: the specs must live where the teams actually work. The platform automatically triggers a suite of integrations.

### Google Drive and Confluence

* **What gets synced:** Finalized PRDs and high-level ERDs.
* **Why it matters:** Keeps business stakeholders and non-technical teams aligned in the tools they already use.

### GitHub and Source Control

* **What gets synced:** Markdown versions of the PRD/ERD and global context files.
* **Why it matters:** Gives developers and coding agents immediate, local context directly inside the code repository.

### Architecture and Documentation Portal

* **What gets synced:** AI-generated architecture and system boundary diagrams.
* **Why it matters:** Maintains live, up-to-date documentation of the enterprise architecture.

### Jira

* **What gets synced:** Epics, Stories, and highly detailed technical tasks.
* **Why it matters:** Translates the plan into actionable workloads, creating the necessary parent-child links automatically using the standardized Jira workflow defined by the teams.

## Upgrading the Entire Team

Centralizing Spec-Driven Development into a Git-backed web platform eliminates tooling fragmentation and reduces massive context loss. It ensures that engineering effort stays aligned with business requirements, and it finally gives product, design, and engineering one shared place to agree on what we are building before anyone builds it.

If you like the idea, I would love to hear your thoughts. Run the [PoC](https://github.com/worldofpasa/specpasa) locally and tell me what breaks.
