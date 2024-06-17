import NavBarLinks from "@/components/Navbar/NavBarLinks";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import StoreSwitcher from "./StoreSwitcher";
import prismadb from "@/lib/prismadb";
import { getUserId } from "@/lib/getUserId";

const Navbar = async () => {
  const userId = getUserId();
  const storeList = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  if (!storeList.length) return <div>No stores available.</div>;
  return (
    <div className="border border-b-border flex h-16 items-center px-4">
      <StoreSwitcher storeList={storeList} />
      <NavBarLinks className="md:mx-6" />
      <div className="ml-auto">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
