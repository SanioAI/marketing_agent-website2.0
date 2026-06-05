import type { BlogBlock } from "@/lib/blog-types";

export function BlogBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === "h2") {
          return (
            <h2 key={i} className="heading-card mt-10 text-surface first:mt-0 sm:text-2xl">
              {b.text}
            </h2>
          );
        }
        if (b.t === "h3") {
          return (
            <h3 key={i} className="heading-card mt-8 text-surface first:mt-0">
              {b.text}
            </h3>
          );
        }
        if (b.t === "p") {
          return (
            <p key={i} className="mt-4 text-pretty text-base leading-relaxed text-surface-muted first:mt-0">
              {b.text}
            </p>
          );
        }
        if (b.t === "ul") {
          return (
            <ul key={i} className="mt-4 list-disc space-y-2 pl-5 text-surface-muted first:mt-0">
              {b.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </>
  );
}
