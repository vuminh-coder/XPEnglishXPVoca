import dynamic from "next/dynamic";
import AiTutorLoading from "./loading";

const AiTutorWorkspace = dynamic(
  () => import("@/features/ai-tutor/components/AiTutorWorkspace"),
  {
    ssr: false,
    loading: () => <AiTutorLoading />,
  }
);

export default function VoiceTutorPage() {
  return <AiTutorWorkspace />;
}
