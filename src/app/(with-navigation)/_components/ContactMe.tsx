import Link from "next/link";
import { MessageSquare, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export default function ContactMe({
  className,
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return (
    <section id="contact" className={cn("py-20", className)} {...props}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-semibold tracking-tight sm:text-3xl md:text-6xl">
            Get in touch
          </h2>
          <p className="text-muted-foreground mt-3 text-base md:text-lg">
            Prefer Telegram or Discord? Reach me on either platform.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="https://t.me/mhl_5"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="transition-all hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="flex items-center gap-4 py-5">
                <span className="from-primary/20 to-primary/10 text-primary rounded-md bg-gradient-to-br p-2.5">
                  <Send className="h-5 w-5" />
                </span>
                <div className="text-left">
                  <div className="text-base font-medium">Telegram</div>
                  <div className="text-muted-foreground text-sm">@mhl_5</div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link
            href="https://discord.com/users/649998586154844160"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="transition-all hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="flex items-center gap-4 py-5">
                <span className="from-primary/20 to-primary/10 text-primary rounded-md bg-gradient-to-br p-2.5">
                  <MessageSquare className="h-5 w-5" />
                </span>
                <div className="text-left">
                  <div className="text-base font-medium">Discord</div>
                  <div className="text-muted-foreground text-sm">
                    User ID: 649998586154844160
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}
