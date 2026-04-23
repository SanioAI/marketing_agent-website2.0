import type { BlogBlock } from "@/lib/blog-types";

function Block({ b }: { b: BlogBlock }) {
  switch (b.t) {
    case "h2":
      return (
        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-900 first:mt-0">{b.text}</h2>
      );
    case "h3":
      return <h3 className="mt-8 text-lg font-semibold text-slate-900 first:mt-0">{b.text}</h3>;
    case "p":
      return <p className="mt-4 text-pretty text-base leading-relaxed text-slate-600 first:mt-0">{b.text}</p>;
    case "ul":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 first:mt-0">
          {b.items.map((item) => (
            <li key={item} className="text-pretty leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export function BlogBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div>
      {blocks.map((b, i) => (
        <Block key={i} b={b} />
      ))}
    </div>
  );
}
