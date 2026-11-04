import Link from "next/link";
import { isValidElement, type ComponentProps, type ReactNode } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/content";
import { BeforeAfter, BeforeAfterImages, Callout, Embed, Figure, Gallery, ImpactChart, Quote, Video } from "./blocks";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

const baseComponents = {
  h2: (props: ComponentProps<"h2">) => <h2 id={slugify(textOf(props.children))} {...props} />,
  h3: (props: ComponentProps<"h3">) => <h3 id={slugify(textOf(props.children))} {...props} />,
  a: ({ href = "", ...props }: ComponentProps<"a">) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ),
  Callout,
  Quote,
  Figure,
  Gallery,
  BeforeAfter,
  BeforeAfterImages,
  ImpactChart,
  Video,
  Embed,
};

export async function RichContent({
  source,
  components,
}: {
  source: string;
  components?: Record<string, (props: never) => ReactNode>;
}) {
  const { content } = await compileMDX({
    source,
    components: { ...baseComponents, ...components },
    options: {
      // Content is authored locally (trusted). Allow JSX props like data={[...]}.
      blockJS: false,
      blockDangerousJS: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
  });
  return (
    <div className="prose prose-lg prose-portfolio max-w-none prose-headings:font-semibold prose-h2:text-[1.75rem] prose-h3:text-xl prose-p:leading-[1.75] prose-li:my-1.5">
      {content}
    </div>
  );
}
