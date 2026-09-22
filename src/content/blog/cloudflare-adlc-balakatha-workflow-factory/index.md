---
title: "Cloudflare named ADLC. I already had a Workflow factory for Balakatha."
summary: "Cloudflare's Agent Development Lifecycle is about software factories on Workflows. Balakatha is a kids mythology factory on four persist-and-end Workflows, and I refused the Agents SDK for that job on purpose."
date: "Sep 21 2026"
tags: ["ai", "agents", "cloudflare", "workflows", "balakatha"]
draft: false
---

Cloudflare just named the [Agent Development Lifecycle](https://blog.cloudflare.com/agent-development-lifecycle/), and [InfoQ covered it](https://www.infoq.com/news/2026/09/cloudflare-adlc-agents/). The short version is that agent-written code breaks the old SDLC assumptions, so the platform has to look more like a software factory: programmatic, scalable, event-driven, with Workflows doing more than a linear CI job.

I already run a factory. [Balakatha](https://balakatha.app) is a kids Hindu mythology story app in English, Nepali, and Hindi, built with Parents in Tech. People see the reader. The thing I keep staring at is the line behind it.

It isn't one long chat that spit out a story. It's four Cloudflare Workflows: ResearchWorkflow, GenerateWorkflow, NarrateWorkflow, and PublishWorkflow. Each stage persists and ends. There's no waitForEvent holding a run open while I think. I decide in admin, and each approval starts the next stage as a fresh instance.

Inside those stages, the model proposes. Topics, prose, images, TTS. Deterministic code owns publish, storage, distribution, the schemas, the R2 checkpoints, and D1. That split is the whole point. I want the model for the creative guess. I don't want it writing straight into a side effect.

Social distribute only fires when the MP4s already exist. Remotion encodes the YouTube and reel formats on Node, because Workers can't run that. The Workflow stages the specs and reports what's already on disk. No guessed URLs.

I also wrote down a refusal. I did not put the factory on the Cloudflare Agents SDK. Batch media needs a manufacturing DAG with retries and checkpoints, not an interactive durable agent session. That isn't a dig at the SDK. Interactive agent work and batch manufacturing are different shapes, and Balakatha is the second one.

Kids content keeps the gates. Story prose goes through human review before the public shelf. Generated images need an explicit approval. Gemini TTS has a daily request ceiling, and the counter increments per attempt, so a retried miss still spends quota. If narration isn't ready, the story can still publish with narration unavailable rather than fake the audio or block the whole line.

Cloudflare put the Workflow line cleanly: a CI/CD pipeline is just a Workflow, but a Workflow can be so much more than a CI/CD pipeline. Balakatha is that "more" for me. Not an agent babysitting a chat. A factory that proposes, waits for a human, and then lets deterministic code ship.

If you're wiring agents into something that has to finish when you're not staring at a terminal, ask which parts refuse to automate. For Balakatha, that's review, compliance, and anything that would let a model write straight into a side effect.
