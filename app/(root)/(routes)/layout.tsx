import { getUserId } from "@/lib/getUserId";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = getUserId();

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });
  if (store) redirect(`/${store.id}`);
  return <>{children}</>;
}
