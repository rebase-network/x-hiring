import { grabAction } from "@/server/functions/grab";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!process.env.CRON_SECRET && process.env.NODE_ENV !== "development") {
    return Response.json(
      { success: false, message: "Cron validation failed" },
      { status: 500 },
    );
  }

  if (
    process.env.NODE_ENV !== "development" &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return Response.json({ success: false }, { status: 401 });
  }

  try {
    await grabAction();
  } catch (err) {
    console.log(err);
    return Response.json({ success: false }, { status: 500 });
  }

  return Response.json({ success: true });
}