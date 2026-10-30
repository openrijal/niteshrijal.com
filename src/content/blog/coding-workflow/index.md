---
title: "My coding workflow is a stack of skills, and the rules between them matter more"
summary: "I use Matt Pocock's skills for grilling and the PRD, LID for specs and EARS requirements, and pstack for implementation and validation. Here's how they hand off, and the four rules I added so they don't fight each other."
date: "Oct 30 2026"
tags: ["ai", "agents", "workflow", "sdd", "tdd"]
draft: true
---

I've been putting together my coding workflow out of skills that other people wrote: [Matt Pocock's skills](https://github.com/mattpocock/skills), [LID](https://github.com/jszmajda/lid), and [pstack](https://github.com/cursor/plugins/tree/main/pstack). Each one is good at its own job. The part I didn't expect to spend time on was the space between them, where one skill's habits quietly undo what the previous skill set up.

So this post is less about the skills and more about the rules I wrote so they'd work together. If you've read my earlier posts on spec-driven development, this is where I've ended up for now.

## The stack

There are three pieces, and none of them are mine.

- **[Matt Pocock's skills](https://github.com/mattpocock/skills)** for grilling and the PRD, mainly `grill-me` and `to-prd`.
- **[LID](https://github.com/jszmajda/lid)** for specs and EARS requirements.
- **[pstack](https://github.com/cursor/plugins/tree/main/pstack)**, specifically `poteto-mode`, verification, and statechart, for implementation and validation.

On their own, each of these assumes it's running the show. That's fine when you use one at a time. When you chain them, you have to decide who owns what, or you get two tools politely redoing each other's work.

## The flow

Here's the order I run things in.

1. `grill-me` clarifies the product decisions. That means the audience, the experience, the constraints, the tradeoffs, and the open questions. It asks me things I'd rather not answer yet, which is the point.
2. `to-prd` records those decisions in `prd.md`. The PRD describes the product. It isn't the implementation plan. That comes later, and I like keeping those two apart.
3. LID develops the architecture, the detailed designs, and the EARS requirements for the next deliverable. I scope it to the next one on purpose, instead of trying to specify the whole product at once.
4. The execution plan goes in `.specs/plans/[plan-slug].md`. Each task references its requirements and names the evidence needed to finish it. So a task isn't done because the agent says so. It's done when the evidence it named exists.
5. `poteto-mode` implements the plan and uses the project's verification skill throughout.

The reason I keep the PRD and the plan in separate files is pretty simple. The PRD is about what I'm building and for whom, and those decisions shouldn't move every time the implementation gets tricky. The plan is allowed to change more often. If both live in one document, it's way too easy for an agent to edit a product decision while it's really just trying to rearrange tasks.

The evidence part matters for a similar reason. When a task names what proves it's finished, I don't have to argue with the agent about whether it's done. I just go look for the evidence.

Written out like that, it looks like a clean relay where each skill does its part and passes the baton. In practice the handoff from step 3 to step 5 is where things get interesting.

## LID doesn't stop at the EARS handoff

It's easy to think of LID as the thing that produces requirements, and once you have the requirements, you're done with it. That's not how LID is designed, and it's not how I want to use it.

LID's full method includes failing tests first, `@spec` links in the tests and in the code that owns the behavior, and checks that the design, the requirements, the tests, and the implementation all agree. LID lays out the [full workflow](https://github.com/jszmajda/lid#the-workflow) in its README.

So LID's requirements stay active after the handoff. Poteto can do that work while keeping those obligations. It just needs to be told, because left to its defaults, pstack has its own ideas about how a feature gets built. That's where the four rules come in.

## Rule 1: protect the @spec annotations

This is the one that's easiest to miss. Pstack has a [comment reviewer](https://github.com/cursor/plugins/blob/main/pstack/agents/comment-sicko.md), and it deletes comments outside a narrow exception list.

Honestly, I like that reviewer. Most comments agents write are noise. But that exception list doesn't explicitly include LID annotations. A `@spec` link is a comment, so a cleanup pass could remove the exact links that tie the code back to its requirements. Nothing would fail. The traceability would just quietly disappear.

So I add an explicit exception for LID annotations, plus a check for missing or broken requirement links. Without both, cleanup could erase traceability, and I wouldn't find out until I went looking for a link that wasn't there anymore.

## Rule 2: carry tests-first ordering into implementation

Pstack's [feature playbook](https://github.com/cursor/plugins/blob/main/pstack/skills/poteto-mode/playbooks/feature.md) includes runtime verification, which is great. But it doesn't itself require failing acceptance tests before feature code.

LID does require that ordering. If I hand the plan to poteto without saying anything, I get verification at the end, and I lose the tests-first step that LID cares about.

So the implementation brief has to keep LID's ordering, and it has to keep the testing boundary we already agreed on. In my case that's mainly the complete episode player, plus focused physics and content-validation tests. I put that in the brief in plain words, so it's part of the job and the agent can't treat it as a suggestion.

## Rule 3: one implementation coordinator

This is the rule that prevents the most confusing kind of mess. Both LID and pstack know how to think about architecture. If both are allowed to redesign a feature, they'll do it independently, and you end up with two designs and an agent trying to satisfy both.

So poteto runs the execution workflow, and it's the only coordinator. Its architecture exploration works within the approved design. If it finds evidence that the design should change, it surfaces that evidence instead of going ahead and changing it. That way two workflows never independently redesign the same feature.

## Rule 4: set the review policy once

LID calls for phase inspection by me or an inspector I name. Pstack normally proceeds on its own. Those two defaults clash. Either I get asked for permission at every step, or LID's reviews silently drop out because pstack never stopped to ask.

LID's [project instructions template](https://github.com/jszmajda/lid/blob/main/plugins/linked-intent-dev/skills/update-lid/references/agents-md-template.md) is where this is set.

So I specify it once, up front. I say which reviews can be delegated and which product decisions stay mine. That avoids the repeated permission questions, and it doesn't quietly throw away LID's reviews either. I'd rather write that down once than keep answering "should I continue?"

## What I made of it

None of these rules are clever. They're the kind of thing you only notice once two good tools step on each other. Each skill was written by someone thinking about their own workflow, which is exactly what you want from a skill. It also means nobody wrote down what happens when you combine them.

That part is my job. The skills do the grilling, the specs, and the building. The rules decide who owns the tests, who owns the design, whose comments survive cleanup, and when I get pulled in. Without them I'd still have three good tools. I just wouldn't trust what came out the other end as much.

It's early days, and I expect these rules to change as I hit more edges. If you're chaining skills like this, I'd really like to hear which handoff broke for you. Ping me on X @openrijal.
