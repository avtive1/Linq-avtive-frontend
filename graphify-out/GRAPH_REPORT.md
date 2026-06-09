# Graph Report - Linq-avtive-frontend  (2026-06-09)

## Corpus Check
- 87 files · ~41,360 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 341 nodes · 633 edges · 35 communities (24 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4b63fd93`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]

## God Nodes (most connected - your core abstractions)
1. `Button()` - 40 edges
2. `cn()` - 27 edges
3. `Label()` - 22 edges
4. `Input()` - 21 edges
5. `AvtiveLogo()` - 19 edges
6. `PersonPhoto()` - 19 edges
7. `BackButton()` - 17 edges
8. `compilerOptions` - 16 edges
9. `LanguageSelector()` - 15 edges
10. `LeftPanel()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `DialogFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/lib/utils.ts
- `Button()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/button.tsx → src/lib/utils.ts
- `CardHeader()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `CardTitle()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (35 total, 11 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (24): AvtiveLogo(), PersonPhoto(), PersonPhotoProps, menuItems, sidebarTools, menuItems, sidebarTools, menuItems (+16 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (8): BackButton(), LanguageSelector(), LeftPanel(), LeftPanelProps, SocialLoginButtons(), Button(), buttonVariants, Separator()

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (29): dependencies, class-variance-authority, clsx, lucide-react, next, radix-ui, react, react-dom (+21 more)

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (19): BadgeFields, BadgeType, menuItems, sidebarTools, QRCodeDialog(), QRCodeDialogProps, Checkbox(), DialogContent (+11 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.18
Nodes (10): ConnectionHistoryWidget(), days, meetings, DashboardHeader(), DashboardSidebar(), sidebarTools, FeatureGrid(), toolItems (+2 more)

### Community 7 - "Community 7"
Cohesion: 0.23
Nodes (11): cn(), UserType, Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader() (+3 more)

### Community 8 - "Community 8"
Cohesion: 0.22
Nodes (8): args, command, cwd, hooks, AfterTool, SessionStart, mcpServers, code-review-graph

### Community 9 - "Community 9"
Cohesion: 0.25
Nodes (7): args, command, cwd, env, type, mcpServers, code-review-graph

### Community 11 - "Community 11"
Cohesion: 0.40
Nodes (4): Key Tools, MCP Tools: code-review-graph, When to use graph tools FIRST, Workflow

### Community 12 - "Community 12"
Cohesion: 0.40
Nodes (4): Debug Issue, Steps, Tips, Token Efficiency Rules

### Community 13 - "Community 13"
Cohesion: 0.40
Nodes (4): Explore Codebase, Steps, Tips, Token Efficiency Rules

### Community 14 - "Community 14"
Cohesion: 0.40
Nodes (4): Refactor Safely, Safety Checks, Steps, Token Efficiency Rules

### Community 15 - "Community 15"
Cohesion: 0.40
Nodes (4): Output Format, Review Changes, Steps, Token Efficiency Rules

### Community 16 - "Community 16"
Cohesion: 0.40
Nodes (4): Debug Issue, Steps, Tips, Token Efficiency Rules

### Community 17 - "Community 17"
Cohesion: 0.40
Nodes (4): Explore Codebase, Steps, Tips, Token Efficiency Rules

### Community 18 - "Community 18"
Cohesion: 0.40
Nodes (4): Refactor Safely, Safety Checks, Steps, Token Efficiency Rules

### Community 19 - "Community 19"
Cohesion: 0.40
Nodes (4): Output Format, Review Changes, Steps, Token Efficiency Rules

### Community 21 - "Community 21"
Cohesion: 0.50
Nodes (3): hooks, PostToolUse, SessionStart

### Community 22 - "Community 22"
Cohesion: 0.50
Nodes (3): hooks, PostToolUse, SessionStart

### Community 23 - "Community 23"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **157 isolated node(s):** `PostToolUse`, `SessionStart`, `uvx`, `crg-session-start.sh script`, `crg-update.sh script` (+152 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Button()` connect `Community 1` to `Community 0`, `Community 3`, `Community 6`, `Community 7`, `Community 10`, `Community 24`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `cn()` connect `Community 7` to `Community 0`, `Community 1`, `Community 3`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `PersonPhoto()` connect `Community 0` to `Community 1`, `Community 3`, `Community 6`, `Community 10`, `Community 24`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `PostToolUse`, `SessionStart`, `uvx` to the rest of the system?**
  _157 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08897959183673469 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.12270531400966184 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._