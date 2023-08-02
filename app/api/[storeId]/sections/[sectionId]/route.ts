import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { sectionId: string } }
) {
  try {
    if (!params.sectionId) {
      return new NextResponse("Section id is required", { status: 400 });
    }

    const section = await prismadb.section.findUnique({
      where: {
        id: params.sectionId
      },
      include: {

      }
    });
  
    return NextResponse.json(section);
  } catch (error) {
    console.log('[SECTION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { sectionId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.sectionId) {
      return new NextResponse("Section id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const section = await prismadb.section.delete({
      where: {
        id: params.sectionId,
      }
    });
  
    return NextResponse.json(section);
  } catch (error) {
    console.log('[SECTION_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { sectionId: string, storeId: string } }
) {
  try {   
    const { userId } = auth();

    const body = await req.json();
    
    const { name } = body;
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.sectionId) {
      return new NextResponse("section id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const section = await prismadb.section.update({
      where: {
        id: params.sectionId,
      },
      data: {
        name
      }
    });
  
    return NextResponse.json(section);
  } catch (error) {
    console.log('[SECTION_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
