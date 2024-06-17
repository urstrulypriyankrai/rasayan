import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { storeId: string } }
) {
    try {
        const body = await req.json();
        const { userId }: {
            userId: string
        } = body;


        if (!params.storeId)
            return NextResponse.json(
                {
                    errorMsg: "Unable to delete",
                },
                {
                    status: 400,
                }
            );


        const store = await prismadb.store.deleteMany({
            where: {
                userId,
                id: params.storeId,
            },
        });
        if (store) {
            return NextResponse.json(
                {
                    errorMsg: "Store Deleted Successfully",
                },
                {
                    status: 200,
                }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                errorMsg: "unable to delete store",
            },
            {
                status: 500,
            }
        );
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { storeId: string } }
) {
    try {
        const body = await req.json();
        const { userId, name }: {
            userId: string, name: string
        } = body;

        if (!params.storeId)
            return NextResponse.json(
                {
                    errorMsg: "Unable to delete",
                },
                {
                    status: 400,
                }
            );

        const data = prismadb.store.updateMany({
            where: { id: params.storeId, userId },
            data: {
                name
            }
        })

        if (true) {
            return NextResponse.json(
                {
                    errorMsg: "Store Deleted Successfully",
                },
                {
                    status: 200,
                }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                errorMsg: "unable to delete store",
            },
            {
                status: 500,
            }
        );
    }
}
