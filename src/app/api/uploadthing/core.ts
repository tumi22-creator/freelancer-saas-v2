import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  projectUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },

    pdf: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("UPLOAD COMPLETE");
    console.log(file.url);

    return {
      uploadedFileUrl: file.url,
    };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;