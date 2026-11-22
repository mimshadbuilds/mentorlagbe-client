import MyTuitions from "@/components/dashboard/tutor/my-tuitions";
import { getMyTuitions } from "@/lib/actions/tutor-query";

/** docx line 104: CRUD + Active/Closed toggle for the tutor's tuitions. */
export default async function MyTuitionsPage() {
  const tuitions = await getMyTuitions();

  return <MyTuitions tuitions={tuitions} />;
}
