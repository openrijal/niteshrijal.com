---
title: "AI Design Showdown: Why Process Matters More Than the Output"
summary: "I pitted Antigravity, Claude, Codex, and OpenCode against each other with a simple design prompt. While the outputs differed, the real differentiator was the execution process—and how Claude treated the task like a professional designer."
date: "Jul 08 2026"
tags: ["ai", "design", "claude", "antigravity", "codex", "opencode", "developer-tools", "ux", "process"]
draft: false
---

I am absolutely, catastrophically bad at design, totally at the last stage :D 

Web designs, app designs, anything with a UI/UX component basically, if it requires aesthetic judgment, I’m out. For the past 15 years, my workflow has been exactly the same: I build something barebones with a basic, functional, and frankly boring UI, and then I immediately call for reinforcements. That means hiring professional designers or hunting down pre-made themes and templates to dress up my skeleton code.

But now, with AI, things are different. 

So, I decided to test this promise on one of my new projects. I selected four major contenders: **Antigravity**, **Claude**, **Codex**, and **OpenCode**, and gave them all the exact same prompt to see how they would handle a real design brainstorming task. 

One clear winner emerged. But the *reason* they won (at least in my eyes) had less to do with the final output and more to do with **how** they executed the task.

---

## The Prompt

The test project is a developer/product-owner tool I’ve been building locally. I gave each AI assistant the following prompt:

> "give me 3 different modern designs for the project, has to have dark and light mode. this is a developer/product-owner tool, it has to be inviting and easy to navigate"

Pretty basic, right? No overly detailed specifications, just a request for three distinct visual directions that look modern and feel welcoming to developers and product owners, so that covers the more technical and not so technical users.

---

## How a Human Designer Does It

If I hired a human designer and gave them this prompt, I would expect a structured, thoughtful approach. They wouldn't just throw paint at my existing codebase immediately, their workflow would *(and this is just my personal opinion)* look something like this:

1. **Run the project locally** to see it in action.
2. **Navigate the app** and interact with the pages to feel the user flow.
3. **Take notes** and try to understand the core product intent.
4. **Read the specs** (if available) and look through the codebase to understand the technical structure.
5. **Create a separate artifact** (Figma link, static HTML preview, etc.) to share the design proposals before changing a single line of code.

This process is critical. It keeps the development environment clean and gives the owner a safe sandbox to evaluate options, provide feedback, or merge ideas.

---

## The Eager Developer: Antigravity, Codex, and OpenCode

Unfortunately, three of our contestants completely missed the memo on process. 

**Antigravity** (running Gemini Flash 3.5), **Codex** (running GPT-5.5), and **OpenCode** (running Big-Pickle) all took the exact same shortcut: they went straight into my source code and tried to modify the exact same active file. 

Instead of creating separate visual directions, they simply changed the styling variables (colors, fonts, etc.) of the existing layout. The result? They gave me three "designs" that looked different from each other in color palette, but were structurally identical. 

Here is what they proposed:

### 1. Antigravity (Gemini Flash 3.5)
*   **Command Desk**: A clean layout featuring a Sky-blue accent.
*   **Product Studio**: A darker variation emphasizing an Emerald theme.
*   **Review Flow**: A high-contrast option with Rose accents.

![Antigravity Design](/images/ai-design-process-over-output/antigravity.png)

### 2. OpenCode (Big-Pickle)
*   **Tunnel**: Deep focus, minimal chrome, heavily inspired by Linear and Raycast.
*   **Workshop**: A warm, collaborative, and inviting theme inspired by Notion and Basecamp.
*   **Pipeline**: A workflow-forward, structured style inspired by GitHub Projects.

![OpenCode Design](/images/ai-design-process-over-output/opencode.png)

### 3. Codex (GPT-5.5)
*   **Command Center**: A futuristic dashboard look.
*   **Spec Studio**: A content-focused typography layout.
*   **Delivery Graph**: A heavily structured layout aimed at status tracking.

![Codex Design](/images/ai-design-process-over-output/codex.png)

While the conceptual themes for Antigravity, OpenCode and Codex sounded great on paper, experiencing them was frustrating because they were bound to the exact same layout. It was a paint job, not a design exploration.

---

## The Winner: Claude

Then there was Claude. 

Claude did exactly what I hoped a smart assistant would do. Instead of immediately hacking away at my source code, it stepped back and treated the task like a professional designer.

First, it analyzed the structure and intent. Then, it generated **three completely distinct designs**. These weren't just color swaps-they had different layouts, different component placements, and unique styling for each persona. 

![Claude Design](/images/ai-design-process-over-output/claude.png)

But the real magic was the delivery. Claude didn't touch a single line of my local codebase. Instead:
- It explained the UX thoughts behind each of the three layouts.
- It generated a **public URL** containing interactive previews of all three designs.
- It allowed me to toggle between light/dark mode and switch layouts dynamically in the browser.

This approach was exactly what my expecation was before I gave the prompt. I could view the designs, click around, and figure out what worked and what didn't. I still had the complete freedom to iterate, give feedback, or decide on a hybrid design *before* committing any changes to my code. 

The output itself was visually superior to the others, but it was the **process and the artifact-based approach** that I admired the most.

---

## The Takeaway

As AI coding tools become more agentic, we need to talk more about *how* they do the work, not just *what* they produce. 

An agent that blindly edits your source files to show you "options" is a hazard. It creates code noise, makes reverting difficult, and forces you into a destructive review cycle. On the other hand, an agent that knows how to present its ideas in isolated, interactive artifacts is an actual collaborator.

For now, Claude has set the bar for how design and many other tasks should be handled. Let's hope the other models take notes.
