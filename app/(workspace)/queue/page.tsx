import { publishingFixtures } from "@/features/publishing/fixtures";
import { PublishingWorkspace } from "@/features/publishing/publishing-workspace";

export default function PublishingPage() {
  return <PublishingWorkspace initialJobs={publishingFixtures} />;
}
