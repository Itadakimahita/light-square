import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { placeId: string } }
) {
  try {
    if (!params.placeId) {
      return new NextResponse("Place id is required", { status: 400 });
    }

    const place = await prismadb.place.findUnique({
      where: {
        id: params.placeId
      },
      include: {
        images: true,
        section: true,
      }
    });
  
    return NextResponse.json(place);
  } catch (error) {
    console.log('[PLACE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { placeId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.placeId) {
      return new NextResponse("Place id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const place = await prismadb.place.delete({
      where: {
        id: params.placeId
      },
    });
  
    return NextResponse.json(place);
  } catch (error) {
    console.log('[PLACE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { placeId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, description, location, sectionId, images } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.placeId) {
      return new NextResponse("Place id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }
    if (!location) {
      return new NextResponse("Location is required", { status: 400 });
    }

    if (!sectionId) {
      return new NextResponse("section id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    await prismadb.place.update({
      where: {
        id: params.placeId
      },
      data: {
        name,
        description,
        location,
        sectionId,
        images: {
          deleteMany: {},
        },
      },
    });

    const place = await prismadb.place.update({
      where: {
        id: params.placeId
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    })
  
    return NextResponse.json(place);
  } catch (error) {
    console.log('[PLACE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
