"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HomeIcon, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
          <div className="space-y-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="relative"
            >
              <h1 className="relative px-7 py-4 bg-background font-bold text-6xl sm:text-8xl">
                Oops!
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Something Went Wrong
              </h2>
              {/* <p className="mt-2 text-muted-foreground max-w-[500px]">
                We couldn&apos;t find the page you&apos;re looking for. The page
                might have been removed, renamed, or doesn&apos;t exist.
              </p> */}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg">
              <Link href="/">
                <HomeIcon className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => reset()}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </motion.div>

          {error.digest && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-muted-foreground"
            >
              Error digest: {error.digest}
            </motion.p>
          )}
        </div>
      </body>
    </html>
  );
}
