import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  //   const path = request.nextUrl.searchParams.get("path") || "/";
  revalidatePath("/article/[slug]");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
