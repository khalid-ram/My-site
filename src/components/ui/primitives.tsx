import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import type { DevStatus } from "@/lib/content/schemas";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full text-[0.95rem] font-medium transition-all duration-200 min-h-11 px-5 select-none";
const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-white hover:bg-accent-strong shadow-[0_8px_24px_-10px_rgba(23,44,66,0.55)] hover:shadow-[0_10px_28px_-10px_rgba(21,90,143,0.6)]",
  secondary: "bg-white text-ink border border-line hover:border-blue-300 hover:bg-blue-50",
  ghost: "text-accent hover:text-accent-strong px-0 min-h-0",
};

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  icon,
  download,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  icon?: "arrow" | "external" | "download";
  download?: string | boolean;
} & Omit<ComponentProps<"a">, "href">) {
  const Icon = icon === "arrow" ? ArrowRight : icon === "external" ? ArrowUpRight : icon === "download" ? Download : null;
  const content = (
    <>
      {children}
      {Icon && <Icon aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />}
    </>
  );
  const cls = cn("group", buttonBase, buttonVariants[variant], className);
  const isExternal = /^(https?:|mailto:)/.test(href);
  if (isExternal || download) {
    return (
      <a
        href={href}
        className={cls}
        download={download}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-semibold uppercase tracking-[0.16em] text-accent", className)}>{children}</p>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-white px-2.5 py-1 text-xs font-medium text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusStyles: Record<DevStatus, { dot: string; ring: string }> = {
  Live: { dot: "bg-emerald-500", ring: "border-emerald-200 bg-emerald-50 text-emerald-800" },
  "Working Prototype": { dot: "bg-accent", ring: "border-blue-300 bg-blue-100 text-accent-strong" },
  "In Progress": { dot: "bg-blue-400", ring: "border-blue-200 bg-blue-50 text-accent-strong" },
  Exploring: { dot: "bg-slate-400", ring: "border-line bg-white text-muted" },
};

export function StatusBadge({ status, className }: { status: DevStatus; className?: string }) {
  const s = statusStyles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        s.ring,
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", s.dot)} />
      <span className="sr-only">Status: </span>
      {status}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: { href: string; label: string };
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
        <Tag
          className={cn(
            "font-semibold tracking-[-0.03em] text-ink text-balance",
            Tag === "h1" ? "text-4xl sm:text-5xl md:text-6xl" : "text-3xl sm:text-4xl",
          )}
        >
          {title}
        </Tag>
        {description && <div className="mt-4 text-lg leading-relaxed text-muted text-pretty">{description}</div>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong"
        >
          {action.label}
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export function Section({
  children,
  className,
  tone = "white",
  id,
  labelledBy,
  spacing = "default",
}: {
  children: ReactNode;
  className?: string;
  spacing?: "default" | "compact" | "tight";
  tone?: "white" | "tint";
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        spacing === "compact" ? "py-10 md:py-14" : spacing === "tight" ? "py-2 md:py-4" : "py-20 md:py-28",
        tone === "tint" && "bg-blue-50",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
