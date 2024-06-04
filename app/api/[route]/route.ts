import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RouteParams {
  route: string;
}

export async function GET(request: NextRequest, { params }: { params: RouteParams }) {
  const { route } = params

  try {
    const data = await prisma.textbox.findFirst({
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
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest, { params }: { params: RouteParams }) {
  const { route } = params
  const body = await request.json()

  try {
    const newData = await prisma.textbox.upsert({
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
    await prisma.$disconnect();
  }
}