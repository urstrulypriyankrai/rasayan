"use client";

import { PropsWithoutRef, useState } from "react";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";

type storeListProp = {
  name: string;
  id: string;
  userId?: string;
}[];

const StoreSwitcher = ({ storeList = [] }: { storeList: storeListProp }) => {
  const { storeId } = useParams();
  const [open, setOpen] = useState(false);
  const storeModal = useStoreModal();
  const router = useRouter();
  let selectedStore = {
    name: "Select Store",
    id: "",
  };

  const formatedItems = storeList?.map((item) => {
    if (item.id === storeId) {
      selectedStore = item;
    }
    return { label: item?.name, value: item?.id };
  });

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <StoreIcon />
          {selectedStore?.name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Store..." />
          <CommandEmpty>No Store found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {formatedItems?.map((item: { value: string; label: string }) => (
                <CommandItem
                  key={item?.value}
                  value={item?.value}
                  onSelect={() => onStoreSelect(item)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedStore?.id === item?.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item?.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 w-5 h-5 " />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;

// type PopoverTriggerProps = PropsWithoutRef<typeof PopoverTrigger>;
// interface storeSwticherProps extends PopoverTriggerProps {
//   storeList: Store[];
//   className: string;
// }

// export default function StoreSwitcher({
//   className,
//   storeList = [],
// }: storeSwticherProps) {
//   const storeModal = useStoreModal();
//   const { storeId } = useParams();
//   const router = useRouter();
//   const [open, setOpen] = useState(false);

//   const formattedItems = storeList.map((item) => ({
//     label: item.name,
//     value: item.id,
//   }));

//   const currentStore = formattedItems.find((item) => item.value === storeId);

//   const onStoreSelect = (store: { value: string; label: string }) => {
//     setOpen(false);
//     router.push(`/${store.value}`);
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-[200px] justify-between"
//         >
//           <StoreIcon />
//           {currentStore?.label}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandInput placeholder="Search Store..." />
//           <CommandEmpty>No Store found.</CommandEmpty>
//           <CommandGroup heading="Stores">
//             <CommandList>
//               {formattedItems?.map((store) => (
//                 <CommandItem
//                   key={store?.value}
//                   // value={store?.value}
//                   onSelect={() => onStoreSelect(store)}
//                 >
//                   <Check
//                     className={cn(
//                       "mr-2 h-4 w-4",
//                       currentStore?.value === store?.value
//                         ? "opacity-100"
//                         : "opacity-0"
//                     )}
//                   />
//                   {store?.label}
//                 </CommandItem>
//               ))}
//             </CommandList>
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }
