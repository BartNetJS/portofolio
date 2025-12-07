---
layout: post
title: "First steps with AI agents and RAG"
date: 2024-11-05 09:00:00 +0200
image: /images/posts/agent-workflow-placeholder.svg
image_alt: "Schematic AI agent workflow"
---

Over the past few months we have deployed multiple AI agents for clients. We started small with a single task and a clear source of truth, then scaled out with orchestration and monitoring. This post gives a short overview of the approach.

![Agent workflow placeholder](/images/posts/agent-workflow-placeholder.svg)

## Why agents + RAG?

An agent can take steps on its own, but without RAG it stays blind. By combining retrieval, validation, and tool calls we avoid hallucinations and keep every action traceable for auditors.

```csharp
var response = await agent.InvokeAsync(new AgentRequest
{
    Intent = "Create a migration plan for the CRM data",
    KnowledgeBase = rag.Index("crm-archive"),
    Tools = new[] { MigrationPlanner, RiskScorer }
});

Console.WriteLine(response.Steps.Last().Summary);
```

## What we learned

- Start with a small domain and a single source of truth.
- Log every step the agent takes: prompt, retrieval, tool output.
- Track metrics (errors, latency, hallucination checks) from day one.
- Visualize the flow so business stakeholders can follow along.

We will share more detail later about observability and how we connected our Azure infrastructure. For now this mini case is enough to demonstrate the blog style guide.
