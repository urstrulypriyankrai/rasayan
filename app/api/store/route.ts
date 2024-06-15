import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name } = body;

        if (!userId) return new NextResponse("Unauthorized user ", {
            status: 401
        })
        if (!name) return new NextResponse("Name is Required ", {
            status: 401
        })

        const isUserExist = await prismadb.store.findFirst(
            {
                where: {
                    name: name,
                    userId: userId
                }
            }
        )
        if (isUserExist)
            return new NextResponse("Sotre Already Exist", {
                status: 401
            })
        const store = await prismadb.store.create(
            {
                data: {
                    name,
                    userId
                }
            }
        )
        if (store) {
            return NextResponse.json({
                data: store
            });

        }


    } catch (error) {

        console.log('[store_post]', error);
        return new NextResponse("Internal Server Error ", {
            status: 500
        })
    }


}