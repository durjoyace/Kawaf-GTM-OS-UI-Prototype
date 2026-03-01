import { getDashboardData } from "@/lib/data/api";
import { json } from "@/lib/api/utils";

export async function GET() {
  const data = await getDashboardData();
  return json(data);
}
