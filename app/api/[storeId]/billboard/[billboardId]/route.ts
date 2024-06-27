import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const { userId } = auth();


        if (!userId) return NextResponse.json({ errorMsg: "Unauthorized user " }, {
            status: 401
        })
        if (!params.billboardId) return NextResponse.json({ errorMsg: "billboardId is Required " }, {
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



        const data = await prismadb.billBoard.findMany({
            where: {
                id: params.billboardId,
                storeId: params.storeId

            }
        })
        if (data) {
            return NextResponse.json(
                {
                    message: "Billboard Deleted Sucessfully",
                    data
                },
                {
                    status: 200,
                }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                errorMsg: "Unable to delete billboard",
            },
            {
                status: 500,
            }
        );
    }
    finally {
        revalidateTag("getBillBoards")
    }

}
export async function DELETE(
    req: NextRequest,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const { userId } = auth();


        if (!userId) return NextResponse.json({ errorMsg: "Unauthorized user " }, {
            status: 401
        })
        if (!params.billboardId) return NextResponse.json({ errorMsg: "billboardId is Required " }, {
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
        }, {
            status: 401
        })



        const data = await prismadb.billBoard.deleteMany({
            where: {
                id: params.billboardId,
                storeId: params.storeId

            }
        })

        if (data) {
            return NextResponse.json(
                {
                    message: "Billboard Deleted Sucessfully",
                },
                {
                    status: 200,
                }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                errorMsg: "Unable to delete billboard",
            },
            {
                status: 500,
            }
        );
    }
    finally {
        revalidateTag("getBillBoards")
    }

}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { label, imageUrl }: {
            label: string, imageUrl: string
        } = body;

        if (!userId) return NextResponse.json({ errorMsg: "Unauthorized user " }, {
            status: 401
        })
        if (!label) return NextResponse.json({ errorMsg: "label is Required " }, {
            status: 401
        })
        if (!imageUrl) return NextResponse.json({ errorMsg: "Image Url is Required " }, {
            status: 401
        })
        if (!params.billboardId) return NextResponse.json({ errorMsg: "billboardId is Required " }, {
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



        const data = await prismadb.billBoard.updateMany({
            where: {
                id: params.billboardId,
                storeId: params.storeId
            },
            data: {
                label,
                imageUrl
            }
        })

        if (data) {
            return NextResponse.json(
                {
                    message: "Billboard Updated Sucessfully",
                },
                {
                    status: 200,
                }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                errorMsg: "unable to update billboard",
            },
            {
                status: 500,
            }
        );
    }
    finally {
        revalidateTag("getBillBoards")
    }

}
