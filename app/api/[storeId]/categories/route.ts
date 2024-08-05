import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// POST /api/:storeId/categories route to create a new category
export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      storeId: string;
    };
  }
) {
  try {
    console.log("api categories post");
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId)
      return NextResponse.json(
        { errorMsg: "Unauthorized user " },
        {
          status: 401,
        }
      );
    if (!name)
      return NextResponse.json(
        { errorMsg: "Category Name is Required " },
        {
          status: 401,
        }
      );
    if (!billboardId)
      return NextResponse.json(
        { errorMsg: "No Billboard Associated with the req " },
        {
          status: 401,
        }
      );
    if (!params.storeId)
      return NextResponse.json(
        { errorMsg: "Store is Required to create billboard" },
        {
          status: 401,
        }
      );

    const storeByUser = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });
    if (!storeByUser)
      return NextResponse.json({
        errorMsg: "[categories/post] Store Not Found ",
      });
    const newCategory = await prismadb.category.create({
      data: {
        name: name,
        billboardId: billboardId,
        storeId: params.storeId,
      },
    });

    if (newCategory) {
      return NextResponse.json(
        {
          data: newCategory,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("[billboard_post]", error);
    return NextResponse.json(
      { errorMsg: "Internal Server Error " },
      {
        status: 500,
      }
    );
  }
}

// GET /api/:storeId/categories route to get all categories
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      storeId: string;
    };
  }
) {
  try {
    if (!params.storeId)
      return NextResponse.json(
        { errorMsg: "Store is Required  " },
        {
          status: 401,
        }
      );

    const allCategories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    if (allCategories) {
      return NextResponse.json(
        {
          data: allCategories,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("[categories_get]", error);
    return NextResponse.json(
      { errorMsg: "Internal Server Error " },
      {
        status: 500,
      }
    );
  }
}
