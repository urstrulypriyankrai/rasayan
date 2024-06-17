import prismadb from "@/lib/prismadb";
import React from "react";

type Props = {
  params: {
    storeId: string;
  };
};

const DashBoardPage = async (props: Props) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: props.params.storeId,
    },
  });
  return (
    <div>
      <div>Active Store {store?.name}</div>
    </div>
  );
};

export default DashBoardPage;
