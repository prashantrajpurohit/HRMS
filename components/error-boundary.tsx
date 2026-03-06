"use client";

import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { AlertTriangle } from "lucide-react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-md shadow-xl border-red-500">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <AlertTriangle className="text-red-500" size={40} />
          </div>
          <CardTitle className="text-red-600">Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            {error.message || "An unexpected error occurred."}
          </p>
          <Button variant="destructive" onClick={resetErrorBoundary}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset logic (e.g. router.reload())
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
