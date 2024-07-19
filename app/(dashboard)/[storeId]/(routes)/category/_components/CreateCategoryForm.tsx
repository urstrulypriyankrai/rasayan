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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { BillBoard, Category } from "@prisma/client";
import PageHeading from "@/components/PageHeading";
import DeleteButton from "@/components/ui/custom/DeleteButton";
import ImageUpload from "@/components/ui/Image-upload";
import { useEffect, useState } from "react";
import { revalidatePath } from "next/cache";

const billboardSchema = z.object({
  label: z.string().min(3).max(50),
  name: z.string().min(3).max(50),
});

type Props = {
  category: Category | BillBoard | null;
};

function CreateCategoryForm({ category }: Props) {
  const { storeId, billboardId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  let headingPageProps = {
    heading: "Create Category",
    description: "Create a category",
    toastMessage: "Category Created",
    action: "Create",
  };
  if (category) {
    headingPageProps.heading = "Edit Category";
    headingPageProps.description = "Edit a Category";
    headingPageProps.toastMessage = "Category Updated";
    headingPageProps.action = "Edit Category";
  }

  const form = useForm<z.infer<typeof billboardSchema>>({
    resolver: zodResolver(billboardSchema),
    defaultValues: {
      label: category?.label || "",
      name: category?.name || "",
    },
  });

  async function onSubmit(values: z.infer<typeof billboardSchema>) {
    try {
      let response = null;
      setLoading(true);

      if (billboard) {
        response = await fetch(`/api/${storeId}/billboard/${billboardId}`, {
          method: "PATCH",
          body: JSON.stringify({
            label: values.label,
            imageUrl: values.imageUrl,
          }),
        });
      } else {
        response = await fetch(`/api/${storeId}/billboard`, {
          method: "POST",
          body: JSON.stringify({
            label: values.label,
            imageUrl: values.imageUrl,
          }),
        });
      }
      if (response.status === 200) {
        toast.success(headingPageProps.toastMessage);
        revalidatePath(`/${storeId}/billboard`);
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      const res = await new Promise((resolve, reject) => {
        // @ts-ignore
        const isRouted: boolean = router.push(`/${storeId}/billboard`);
        if (isRouted) {
          router.refresh();
          resolve("resolved");
        } else {
          reject();
        }
      });
    }
  }
  async function onDelete() {
    try {
      setLoading(true);
      const response = await fetch(`/api/${storeId}/billboard/${billboardId}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        router.push(`/${storeId}/billboard`);
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      toast.error("Make Sure you remove all the categories first");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        {!category ? (
          <PageHeading
            title={headingPageProps.heading}
            description={headingPageProps.description}
          />
        ) : (
          <PageHeading
            title={headingPageProps.heading}
            description={headingPageProps.description}
            ButtonComponent={<DeleteButton onDelete={onDelete} />}
          />
        )}
      </div>
      <div className="px-2 md:px-6 lg:px-10 mt-6 bg-secondary md:mx-6 mx-2 my-2 rounded-md p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" ">
            <div
              id="formContainer"
              className=" border border-red-700 m-2 mt-0 p-4 grid grid-cols-3 gap-2"
            >
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-nowrap font-semibold ml-2">
                      Enter Category Name
                    </FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Billboard" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            
                            <SelectItem value="light">Light</SelectItem>
                            
                            }
                        
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem className="md:w-[50%] w-full flex flex-col">
                    <FormLabel className="text-nowrap font-semibold ml-2">
                      Enter Category Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={category?.name || "Enter Category Name"}
                        {...field}
                        className="rounded-sm "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant={"default"}
                className="border border-input"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

export default CreateCategoryForm;
