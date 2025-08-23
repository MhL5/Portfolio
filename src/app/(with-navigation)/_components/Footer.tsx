import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-border/50 flex h-13 items-center border-t px-5">
      <div className="mx-auto w-full max-w-7xl text-center text-sm sm:text-start">
        Built by
        <Button asChild variant="link" className="h-fit px-1 underline">
          <Link href="https://github.com/MhL5">Mohammad Lashani</Link>
        </Button>{" "}
      </div>
    </footer>
  );
}
