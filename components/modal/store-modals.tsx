"use client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const router = useRouter();
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSumbit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await fetch("/api/store", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.status == 200) {
        toast.success("Store Created!");
        router.push(`/${data.id}`);
      } else toast.error(data.errorMsg);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
      storeModal.onClose();
    }
  };

  return (
    <Modal
      title={"Create Store"}
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onOpen}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSumbit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E-commerce"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6 space-x-2 flex items-center justify-end">
              <Button
                variant={"outline"}
                onClick={storeModal.onClose}
                disabled={loading}
                type="reset"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
