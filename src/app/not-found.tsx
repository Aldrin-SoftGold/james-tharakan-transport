import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-[80svh] bg-offwhite flex items-center">
      <div className="site-grid py-32">
        <p className="label">404</p>
        <h1 className="display text-[clamp(2.55rem,6vw,5.1rem)] mt-4">
          This road
          <br />
          doesn’t go here.
        </h1>
        <p className="lede mt-6">The page you asked for isn’t on this site.</p>
        <div className="mt-10">
          <Button href="/" variant="ghost">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
