import { NextResponse } from "next/server";
import { courses } from "./data";

export async function GET() {
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newCourse = { id: Date.now(), ...body };
  courses.push(newCourse);
  return NextResponse.json(newCourse);
}
