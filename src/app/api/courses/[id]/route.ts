import { NextResponse } from "next/server";
import { courses } from "../data";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const body = await req.json();

  const index = courses.findIndex(c => c.id === id);
  if (index === -1)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  courses[index] = { ...courses[index], ...body };
  return NextResponse.json(courses[index]);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const index = courses.findIndex(c => c.id === id);
  courses.splice(index, 1);
  return NextResponse.json({ success: true });
}
