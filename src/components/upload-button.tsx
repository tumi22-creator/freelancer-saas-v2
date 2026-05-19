"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

type Props = {
  projectId: string;
  onUploaded?: () => void;
};

export default function FileUpload({
  projectId,
  onUploaded,
}: Props) {
  return (
    <div className="mt-3 max-w-xs">
      <UploadButton<OurFileRouter, "projectUploader">
        endpoint="projectUploader"

        appearance={{
          button:
            "bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-3 py-2 h-auto",

          container:
            "border border-gray-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-900 w-fit",

          allowedContent:
            "text-gray-500 dark:text-gray-400 text-xs mt-1",
        }}

        onClientUploadComplete={async (res) => {
          console.log(res);
          const fileUrl = res?.[0]?.ufsUrl;

          if (!fileUrl) return;

          await fetch("/api/projects/file", {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              projectId,
              fileUrl,
            }),
          });

          alert("Upload completed");

          onUploaded?.();
        }}

        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}