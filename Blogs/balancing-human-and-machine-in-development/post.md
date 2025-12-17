# Balancing Human and Machine in Development

By Bart Van der Auweraert — 11 min read — Apr 1, 2025

*[Click here to read it on Medium](https://medium.com/@bart.codeware/balancing-human-and-machine-in-development-c3fc7ce626ef)*

![Header image](./images/extracted/intro-image.png)

When ChatGPT first emerged about two years ago and created waves across the tech industry, I immediately recognized its potential beyond the novelty factor. While many colleagues were using it to write poems about cats or solve puzzles, I began methodically exploring how it could enhance my daily work as a Technical Architect.

As a Technical Architect and Full Stack Developer focused on AI-driven solutions, finding the right workflow has been crucial to handling the complexity of modern development. Over the past two years, I’ve crafted what I call my **AI‑enhanced productivity stack** — a collection of tools that helps me ship code faster without sacrificing quality.

In this article, I’ll break down how I organize my daily work using **VS Code**, **Roo Code**, **Gemini 2.5**, **Perplexity**, and **Claude** — and why this specific combination has been a game-changer for my .NET development and architecture work.

## My AI Journey: From Early Experiments to a Complete System

My journey with AI tools began when ChatGPT first appeared. While many were debating whether it would replace developers, I was quietly figuring out how to make it enhance my capabilities.

In those early days, I was among the first wave of GitHub Copilot users, amazed at how it could complete code blocks but often frustrated by its limitations. I then moved on to Cline (of which Roo Code is actually a fork) and used it heavily for daily coding tasks. My experimentation extended to using Claude desktop with an MCP server to read and edit my files directly, which was revolutionary for my workflow at the time.

As these tools evolved, I carefully evaluated each one:

- Claude Sonnet 3.5 and now 3.7 have been incredibly powerful, but their cost made me selective about when to use them.
- Gemini became a game-changer once version 2.5 arrived with its large context window, which proved invaluable for working with complex codebases.

I experimented with various combinations until I found my current sweet spot: **Roo Code for coding assistance with Gemini 2.5**, and **Claude Desktop for most other tasks**.

What started with simple code snippet generation and debugging assistance has evolved into a comprehensive system that touches every aspect of my development process.

This early adoption gave me a significant advantage: by the time most developers were just starting to experiment with AI assistants, I had already worked through many of the integration challenges and developed effective patterns for collaboration with these tools.

This combination has dramatically improved how I organize tasks, write code, and collaborate with my team. Let me break down how each component works in my daily workflow.

## VS Code: The Foundation of My Development Environment

I’ve experimented with plenty of editors over the years, but VS Code has become my home base. Running on my Dell EliteBook with Windows 11, it gives me exactly what I need for my daily workflow:

- Responsive even when multiple projects are open
- A rich extension ecosystem
- Git integration that saves me countless command line trips
- Consistent performance whether I’m on an external monitor or on the go

I don’t get caught up in editor wars. For my work style and the projects I handle, VS Code hits the sweet spot.

But what really sealed the deal was how seamlessly it integrates with AI tools like Roo Code, which has fundamentally changed how I approach development.

## Roo Code: My AI Pair Programmer

I was skeptical about AI coding tools at first. My initial experiences with Copilot felt like having an intern who’d only skimmed the documentation — occasionally brilliant but mostly suggesting code that wouldn’t compile or solutions that missed the business requirements entirely.

The real game-changer for me was Cline, which I adopted early in my AI journey. Cline showed me what was truly possible with an AI coding assistant, addressing many of the limitations I’d experienced with earlier tools.

More recently, I’ve switched to Roo Code (which is actually a fork of Cline) and found it builds nicely on what I valued in Cline.

These more sophisticated coding assistants offer:

- Context-aware code suggestions
- Code completion that goes beyond the obvious
- Bug detection that catches embarrassing errors before PR time
- Documentation generation that doesn’t just restate the function name as a sentence
- Architectural assistance for designing complex systems and components
- The ability to analyze existing large codebases and understand their structure

But the killer feature? After using Cline for about a year, I noticed it had thoroughly learned my coding style — not just syntactically, but architecturally. It picked up on patterns I didn’t even realize I was using consistently.

Just last week, I was implementing a particularly complex and challenging flow, and Roo suggested an elegant solution using a pattern I’d used in a completely different part of the codebase. That’s when it clicked for me — this isn’t just a simple surface-level trick; it’s actually understanding my code.

## Gemini 2.5: My Swiss Army Knife for Development Tasks

In my work with Azure, DevOps, and various .NET environments (C#, .NET Core, ASP.NET, AKS, CI/CD, Dotnet Aspire, ArgoCD…), I often need a versatile assistant for complex technical challenges.

After trying multiple options including the powerful but expensive Claude Sonnet 3.7, I’ve found that Gemini 2.5 offers the best combination of capabilities and value:

- Large context window for complex codebases and architectural documents
- Brainstorming implementation approaches for Kubernetes (particularly AKS), Docker, and Dapr/Aspire architectures
- Researching best practices for API Management and microservices
- Debugging complex issues in distributed systems
- A cost-performance ratio that makes it practical for daily use

What I particularly value about Gemini is its ability to understand the nuances of modern cloud-native architecture.

Recently, I was designing a multi-tenant solution using Azure Kubernetes Service (AKS) with custom resource definitions, and Gemini helped me evaluate several approaches for resource isolation and namespace management. It’s like having a second brain to bounce ideas off when tackling complex architectural decisions.

## Perplexity: My AI-Powered Research Assistant

Remember when Stack Overflow was the go-to for all coding questions? Those were simpler times.

Now we have 12 different ways to configure Kubernetes ingress controllers, Azure documentation that varies between portal versions, and GitHub issues with 200+ comments where the solution is buried somewhere on page 4.

Enter Perplexity.

I discovered it after rage-quitting a particularly frustrating search for “best practices for multi-tenant AKS clusters with custom resource definitions” that led me down a three-hour rabbit hole. A colleague mentioned Perplexity in our team Discord, and I’ve been hooked ever since.

Here’s where it shines:

- It finds actual, relevant documentation instead of SEO-optimized blog posts that don’t answer my question
- When I’m debugging an obscure error, it pulls solutions from across GitHub issues, docs, and Stack Overflow
- It keeps me updated on API changes without having to subscribe to 50 different newsletters
- It surfaces community discussions I would never have found otherwise
- It helps me validate approaches before I waste hours implementing something that won’t work

The difference between Perplexity and standard Google searches became painfully obvious during a recent Dapr sidecars integration project. Google kept sending me to outdated tutorials, while Perplexity immediately pointed out that the component model had evolved and suggested modern approaches with migration strategies.

That single tip probably saved me a week of work.

Is it perfect? No. Sometimes it still gives me that “I’ve summarized five different approaches but won’t tell you which one is best” AI wishy-washiness.

But it’s become my first stop for any technical research, and it’s probably saved me hundreds of hours of documentation diving.

## User Story Management with Claude and Azure DevOps

As a Technical Architect, I need to ensure that requirements are crystal clear before coding begins. This is where my setup with Claude and Azure DevOps has made the biggest difference:

1. I use the Claude desktop app (specifically Claude Sonnet 3.7) to craft detailed user stories, breaking down complex features into well-defined requirements.
2. These stories are then integrated into Azure DevOps via a custom MCP server I developed using Roo Code.
3. The MCP server continuously syncs with Azure DevOps, allowing me to track user story status, manage comments and feedback, and prioritize work based on team input.

What makes this approach particularly effective is how it bridges the gap between high-level architecture and practical implementation details.

Claude excels at helping me articulate technical requirements in a way that makes sense to both business stakeholders and developers.

For example, when we were implementing a complex flow for a microservices architecture, I used Claude to break down the requirements into discrete user stories that covered both the functional needs and the technical implementation details.

The result was a set of user stories that served as both documentation and a development roadmap, significantly reducing misunderstandings and mid-sprint scope changes.

## My Custom MCP Server: The Glue That Holds It All Together

As someone who works extensively with Azure and DevOps, I wanted to create a seamless integration between my AI tools and our development pipeline.

The MCP server I developed deserves special mention:

- Reads and synchronizes Azure DevOps user stories and comments
- Provides a streamlined interface for reviewing and updating stories
- Notifies me of new comments or status changes
- Helps prioritize work based on project timelines

Under the hood, the server leverages TypeScript for the backend in Node.js.

I’ve also experimented with integrating Semantic Kernel into the MCP server to enhance its capabilities. This allows for more intelligent processing of user stories and better alignment with our architectural standards and patterns.

## The Power of Shared Learning: My AI Sounding Board

Throughout my AI journey, there’s been one crucial element I haven’t mentioned yet: collaboration.

While I was experimenting with these tools, I kept my close friend and colleague Erwin (who works on a different project) in the loop about my findings and approaches.

In the early days when AI tools were still being met with skepticism, having someone to share discoveries with — someone who wouldn’t dismiss them outright or overreact with “the robots are taking our jobs” rhetoric — created a safe space for exploration.

My colleague became my feedback loop. I would implement a new workflow with Cline or experiment with Claude’s capabilities, and then share what worked and what didn’t. He would try some of my approaches in his own context, often finding different pain points or unexpected benefits.

Our regular conversations helped me refine my thinking and avoid getting caught in my own echo chamber.

If you’re starting your own AI journey, my advice is to find your own “AI buddy” — someone you can share discoveries with openly, without either hype or cynicism getting in the way.

## Key Insights from Two Years of AI-Enhanced Development

After integrating AI tools into my daily workflow for the past two years, I’ve gained several valuable insights:

- Integration is an evolution, not a revolution — my MCP server didn’t emerge fully formed. It started as a simple proof of concept and gradually evolved as I better understood the integration points between Azure DevOps and my AI tools.
- The right prompt is everything — precise, structured prompts with clear context yield dramatically better results.
- AI tools complement rather than replace domain expertise — they work best when guided by someone who understands the underlying principles.
- Different tools for different contexts — no single tool excels at everything. Learning when to use each tool has been key to maintaining productivity.

My next focus is expanding this system to better support team collaboration. The individual productivity gains have been substantial, but I believe the real potential lies in creating AI-enhanced workflows that entire development teams can leverage together.

## Final Thoughts: From Early Adopter to Productivity Strategist

I’m often asked if these tools will eventually replace developers. After working closely with these technologies since their early days, my answer is “not yet, and the future is more about evolution than replacement.”

What I’ve witnessed is the beginning of a symbiotic relationship between developers and AI tools.

Each advance in AI capability prompts us to elevate our thinking — moving from implementation details to higher-level architectural and business concerns.

As AI handles more routine coding tasks, our value increasingly comes from domain knowledge, architectural vision, and the ability to connect technical solutions to business needs.

The journey from those first experimental prompts to my current integrated workflow has taught me that AI tools aren’t about automation — they’re about amplification and augmentation.

They’ve enhanced my capabilities in creating robust, scalable, and future-proof solutions. I’m solving the same complex problems in Azure, Kubernetes, and .NET environments, but I’m doing it with less friction and cognitive overhead.

The result is more time to focus on architecture decisions that truly matter and less time spent on routine tasks.

After testing numerous LLMs and coding assistants, I settled on Roo Code with Gemini 2.5 as its underlying model — a combination that offers both powerful coding capabilities and extensive knowledge of technical concepts.

Your ideal stack might look completely different based on your technical focus. The important thing is to approach these tools with an experimental mindset and be willing to abandon what doesn’t work for you.

If you’ve read this far, I’d love to hear about your developer workflow in the comments. When did you start incorporating AI tools into your workflow? What tools have actually improved your productivity (not just promised to), and which ones fell flat? Have you built any custom integration tools that made a difference? Let’s share notes.
