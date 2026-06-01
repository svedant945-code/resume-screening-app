import * as React from "react";

export function LoadingSpinner() {
  return (
    <div
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border-4 border-slate-700 border-t-slate-300"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
