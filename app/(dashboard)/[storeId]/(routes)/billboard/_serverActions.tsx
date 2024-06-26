"use server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";

export async function handleDelete(storeId: string, billboardId: string) {
  try {
    const { userId } = auth();

    if (!userId)
      return {
        errorMsg: "billboardId is Required ",
      };

    if (!billboardId)
      return {
        errorMsg: "billboardId is Required ",
      };
    const storeByUser = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId: userId,
      },
    });
    if (!storeByUser)
      return {
        errorMsg: "Store Not FOund! ",
      };

    const data = await prismadb.billBoard.deleteMany({
      where: {
        id: billboardId,
        storeId: storeId,
      },
    });
    return {
      message: "ok",
    };
  } catch (error: any) {
    console.log("Someting went wrong", error.message);
  } finally {
    revalidateTag("getBillBoards");
  }
}
