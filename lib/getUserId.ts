import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export function getUserId() {
    const { userId } = auth();
    if (!userId) redirect('/sign-in');
    else return userId

}