import prismadb from "@/lib/prismadb";
import BillboardForm from "../_components/Billboard-form";

type Props = {
  params: {
    billboardId: string;
  };
};
export default async function SettingPage({ params }: Props) {
  const billboard = await prismadb.billBoard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return <BillboardForm billboard={billboard} />;
}
