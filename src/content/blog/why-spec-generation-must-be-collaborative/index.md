---
title: "Why Spec Generation Must Be a Collaborative Process"
summary: "SDD works, but locking it inside a local CLI keeps product, design, and other stakeholders out of the most important phase. A Git-backed, framework-agnostic web platform can fix that."
date: "Jul 16 2026"
tags: ["software-development", "methodology", "sdd", "spec-driven", "collaboration", "ai", "agents", "product-management", "llm"]
draft: true
---

Today's software teams develop code and ship software faster than ever. However, absent a clear plan and structure, broken code gets reused, scope creeps, and software products become more distant from what was originally intended.

In earlier posts, I covered how [Specification-Driven Development (SDD)](https://niteshrijal.com/blog/spec-driven-development-with-speckit/) approaches that objective by establishing a comprehensive definition of architecture up-front and making this blueprint an integral part of the development process, even before writing the first line of code. Also, how tools such as SpecKit can help expedite this process further, by automatically generating the technical plans and tasks for both human and AI developers alike.

But as I push to fully embrace SDD and agentic AI capabilities, a new bottleneck has emerged. Local CLI-based workflows isolate non-engineering stakeholders and prevent effective collaboration during the specification phase, which is exactly the phase where their input matters most. Our shared understanding ends up trapped in silos.

In this article, we will make the case for why we should remove SDD from a local terminal and bring it in a collaborative, centralized system, and why this can solely be achieved with a Git-backed, integrated approach that ensures continuous context.

## The Current Mess: Fragmented Context and Architectural Drift

Context is lost at every transfer when idea goes to production. Manual process of converting PRDs into Jira tickets creates architectural drift and missed requirements.

A major part of this disconnect stems from fragmented documentation. Product and design teams lack a common workspace where they can collaboratively view and polish technical specifications before development kicks into gear. With fragmented formats (Google docs, PDFs, markdown files hidden throughout folders) and AI tools residing locally in silos, creating a single source of truth is virtually unachievable.

## The Vision: A Framework-Agnostic, Git-Native Hub

To treat product and engineering specs as machine-readable, "compilable" sources of truth, we need a centralized web application. By bringing spec work into a shared UI, we build persistent context over time rather than having it scattered across laptops and chat threads.

My recommendation for a platform is completely framework agnostic. If our team is relying on an open source tool like SpecKit, OpenSpec, or BMAD or even a custom workflow like Grill-Me, this web platform will act as a hub for us to consolidate these tools.

The code repository is the single source of truth:

* All specifications exist as version-controlled files.
* Feedback and discussions are captured as Git-native comments.
* The lifecycle concludes with a formal Pull Request, so documentation stays tightly coupled with code.

## The 5-Phase Locked Workflow

Shift is unavoidable, but even shift in requirement must not bring spec drift. A sequential approval process defined by the platform will ensure the change works at the spec level first and only then at the next level.

### Phase 1: PRD Refinement

Stakeholders align on the first draft PRD with edge cases explained via inline comments and such built-in well-known workflows as `/speckit.clarify` and `/grill-me`.

### Phase 2: PRD Lock and Approval

The PRD is iteratively regenerated until consensus is reached. It is then finalized by freezing it, and an optional Pull Request is opened for formal approval and merge.

### Phase 3: ERD Mapping and Review

Subsequently, the tool produces the Engineering Requirements Document (ERD) which is further aligned with the approved PRD. Based on the context of existing code and documents, the engineer validates the ERD to ascertain whether the architecture is in line with constraints in the PRD. Any technical changes are decided.

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
