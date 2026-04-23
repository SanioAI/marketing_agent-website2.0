import type { BlogBlock } from "@/lib/blog-types";

/**
 * AEC blog post body. Replace paragraphs and headings with your final approved copy;
 * keep `t` as h2 | h3 | p | ul only.
 */
export const aecPostBlocks: BlogBlock[] = [
  {
    t: "p",
    text:
      "Architecture, engineering, and construction (AEC) projects do not fail because people lack models—they fail because the truth is scattered: drawings, specifications, addenda, submittals, and site photos each tell part of the story. The next wave of useful AI in AEC is not a general chat box. It is software that can read, route, and reconcile domain documents, then hand humans reviewable structure.",
  },
  {
    t: "h2",
    text: "Why “generic LLM” is not enough",
  },
  {
    t: "p",
    text:
      "Blueprints and specs mix graphics, tables, and references. A system that only sees “text on a page” will miss the relationships that matter: grid lines, callouts, revision clouds, and cross-discipline dependencies. Paladio AEC Agents are being built to respect that structure: page-level routing, extraction with evidence, and queues for human sign-off when confidence is not high enough to stamp a deliverable.",
  },
  {
    t: "p",
    text:
      "That is the product difference between a demo and a workflow. Agents should say what they read, where they read it, and what they are unsure about—so project teams can trust the output the same way they trust a submittal log with source links.",
  },
  {
    t: "h2",
    text: "What we are building",
  },
  {
    t: "ul",
    items: [
      "Document understanding that preserves context (not flattened OCR dumps).",
      "Structured outputs your downstream tools can consume: schedules, attributes, and references.",
      "Review surfaces for exceptions: conflicts, missing fields, and low-confidence extractions.",
      "Evaluation and iteration: the system should get better with your standards and your feedback.",
    ],
  },
  {
    t: "p",
    text:
      "If you are planning AEC agent work, start with one painful handoff: for example, spec sections to a takeoff, or drawing revisions to a transmittal. A narrow first workflow beats a platform slide deck. We will share more as AEC Agents move from roadmap to early access.",
  },
];
