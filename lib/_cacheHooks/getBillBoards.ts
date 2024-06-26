import 'server-only'
import { unstable_cache } from "next/cache";
import prismadb from "../prismadb";
import { format } from "date-fns";

type BillboardType = {
    id: string;
    label: string;
    imageUrl: string;
    createdAt: Date | string;
} | null;

export const getBillBoards = unstable_cache(
    async (storeId: string): Promise<BillboardType[] | null> => {
        try {
            const billboard = await prismadb.billBoard.findMany({
                where: {
                    storeId: storeId,
                },
            });
            const filteredData = billboard.map((item) => {
                return {
                    id: item.id,
                    label: item.label,
                    imageUrl: item.imageUrl,
                    createdAt: format(new Date(item.updateAt), "do MMM, yyyy"),
                };
            });
            return filteredData;
        } catch (error) {
            console.log(`[getBillBoards] something went wrong`);
        }
        return null;
    },
    ["getBillBoards"],
    {
        tags: ["getBillBoards"],
    }
);