import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface RouteParams {
  route: string;
}

export async function GET(request: NextRequest, { params }: { params: RouteParams }) {
  const { route } = params

  try {
    const data = await db.textbox.findFirst({
      where: {
        route,
      },
    });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}

export async function POST(request: NextRequest, { params }: { params: RouteParams }) {
  const { route } = params
  const body = await request.json()

  try {
    const newData = await db.textbox.upsert({
      where: {
        route
      },
      update: {
        text: body
      },
      create: {
        route,
        text: body
      }
    }
    )
    return NextResponse.json({ newData });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}