---
layout: post
title: "Eerste stappen met AI-agents en RAG"
date: 2024-11-05 09:00:00 +0200
image: /images/posts/agent-workflow-placeholder.svg
image_alt: "Schematische AI agent workflow"
---

De voorbije maanden hebben we meerdere AI-agenten live gezet bij klanten. We startten klein, met één taak en een duidelijke bron van waarheid, en breidden daarna uit met orchestratie en monitoring. Deze post geeft een kort overzicht van de aanpak.

![Agent workflow placeholder](/images/posts/agent-workflow-placeholder.svg)

## Waarom agenten + RAG?

Een agent kan zelfstandig stappen nemen, maar zonder RAG blijft hij blind. Door retrieval, validatie en tool-calls te combineren vermijden we hallucinaties en maken we acties traceerbaar voor auditors.

```csharp
var response = await agent.InvokeAsync(new AgentRequest
{
    Intent = "Maak een migratieplan voor de CRM-data",
    KnowledgeBase = rag.Index("crm-archief"),
    Tools = new[] { MigrationPlanner, RiskScorer }
});

Console.WriteLine(response.Steps.Last().Summary);
```

## Wat we geleerd hebben

- Begin met een klein domein en een duidelijke bron van waarheid.
- Log elke stap die de agent neemt: prompt, retrieval, tool output.
- Gebruik metriek (fouten, latency, hallucination checks) vanaf dag één.
- Visualiseer de flow zodat business stakeholders kunnen volgen.

We delen later meer detail over observability en hoe we onze Azure-infra gekoppeld hebben. Voor nu volstaat deze mini-case om de stijlgids van het blog te tonen.
