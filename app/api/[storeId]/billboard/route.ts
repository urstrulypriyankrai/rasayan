import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: {
    params: {
        storeId: string
    }
}) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { label, imageUrl } = body;

        if (!userId) return NextResponse.json({ errorMsg: "Unauthorized user " }, {
            status: 401
        })
        if (!label) return NextResponse.json({ errorMsg: "label is Required " }, {
            status: 401
        })
        if (!imageUrl) return NextResponse.json({ errorMsg: "Image Url is Required " }, {
            status: 401
        })
        if (!params.storeId) return NextResponse.json({ errorMsg: "Store is Required " }, {
            status: 401
        })

        const storeByUser = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: userId
            }
        })
        if (!storeByUser) return NextResponse.json({
            errorMsg: "Store Not Found "
        })
        const billBoard = await prismadb.billBoard.create(
            {
                data: {
                    label,
                    imageUrl: imageUrl,
                    storeId: params.storeId
                }

            }
        )


        if (billBoard) {
            return NextResponse.json({
                data: billBoard,

            }, { status: 200 });

        }


    } catch (error) {

        console.log('[billboard_post]', error);
        return NextResponse.json({ errorMsg: "Internal Server Error " }, {
            status: 500
        })
    }


}
export async function GET(req: NextRequest, { params }: {
    params: {
        storeId: string
    }
}) {
    try {

        if (!params.storeId) return NextResponse.json({ errorMsg: "Store is Required " }, {
            status: 401
        })

        const billBoards = await prismadb.billBoard.findMany({
            where: {
                storeId: params.storeId
            }
        });


        if (billBoards) {
            return NextResponse.json({
                data: billBoards,

            }, { status: 200 });

        }


    } catch (error) {

        console.log('[billboard_get]', error);
        return NextResponse.json({ errorMsg: "Internal Server Error " }, {
            status: 500
        })
    }


}