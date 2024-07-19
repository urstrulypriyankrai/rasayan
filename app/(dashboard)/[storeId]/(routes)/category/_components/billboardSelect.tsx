import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const billboardSelect = async () => {
    const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },);
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Billboard" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        {}
      </SelectContent>
    </Select>
  );
};

export default billboardSelect;
