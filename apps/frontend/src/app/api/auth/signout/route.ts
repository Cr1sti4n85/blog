import { destroySession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function GET() {
  await destroySession();
  console.log("holi");
  redirect("/");
}
