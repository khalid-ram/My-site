import { ButtonLink } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">This page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">It may have moved, or it isn&apos;t published yet.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" icon="arrow">Back home</ButtonLink>
        <ButtonLink href="/case-studies" variant="secondary">View case studies</ButtonLink>
      </div>
    </section>
  );
}
