"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(3).max(50),
});
type Props = {
  name: string;
};
function SettingForm({ name }: Props) {
  const { storeId } = useParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`/api/store/${storeId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: values.name,
        }),
      });
      if (response.status === 200) {
        toast.success("Name Changed Sucessfully");
        router.refresh();
      }
    } catch (error) {
      toast.error("Name not changed! ");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input placeholder={name} {...field} className="rounded-sm " />
              </FormControl>
              <FormDescription>Save To Change Store Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"default"}
          className="border border-input "
        >
          Save
        </Button>
      </form>
    </Form>
  );
}

export default SettingForm;
