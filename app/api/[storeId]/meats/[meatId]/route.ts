import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { meatId: string } }
) {
    try {
        if (!params.meatId) {
            return new NextResponse("meat id is required", { status: 400 });
        }

        const meat = await prismadb.meat.findUnique({
            where: {
                id: params.meatId
            }
        });

        return NextResponse.json(meat);
    } catch (error) {
        console.log('[MEAT_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE(
    req: Request,
    { params }: { params: { meatId: string, storeId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.meatId) {
            return new NextResponse("meat id is required", { status: 400 });
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

        const meat = await prismadb.meat.delete({
            where: {
                id: params.meatId
            }
        });

        return NextResponse.json(meat);
    } catch (error) {
        console.log('[MEAT_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};


export async function PATCH(
    req: Request,
    { params }: { params: { meatId: string, storeId: string } }
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

        if (!params.meatId) {
            return new NextResponse("meat id is required", { status: 400 });
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

        const meat = await prismadb.meat.update({
            where: {
                id: params.meatId
            },
            data: {
                name,
            }
        });

        return NextResponse.json(meat);
    } catch (error) {
        console.log('[MEAT_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};