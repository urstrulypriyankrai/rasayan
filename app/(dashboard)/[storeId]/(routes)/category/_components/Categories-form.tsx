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
import { category } from "@prisma/client";
import PageHeading from "@/components/PageHeading";
import DeleteButton from "@/components/ui/custom/DeleteButton";
import ImageUpload from "@/components/ui/Image-upload";
import { useEffect, useState } from "react";

const categorySchema = z.object({
  label: z.string().min(3).max(50),
  imageUrl: z.string().url().optional(),
});

type Props = {
  category: category | null;
};

function CategoriesForm({ category }: Props) {
  const { storeId, categoryId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  let headingPageProps = {
    heading: "Create category",
    description: "Create a category",
    toastMessage: "category Created",
    action: "Create",
  };
  if (category) {
    headingPageProps.heading = "Edit category";
    headingPageProps.description = "Edit a category";
    headingPageProps.toastMessage = "category Updated";
    headingPageProps.action = "Edit category";
  }

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      label: category?.label || "",
      imageUrl: category?.imageUrl || "",
    },
  });

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    try {
      let response = null;
      setLoading(true);

      if (category) {
        response = await fetch(`/api/${storeId}/category/${categoryId}`, {
          method: "PATCH",
          body: JSON.stringify({
            label: values.label,
            imageUrl: values.imageUrl,
          }),
        });
      } else {
        response = await fetch(`/api/${storeId}/category`, {
          method: "POST",
          body: JSON.stringify({
            label: values.label,
            imageUrl: values.imageUrl,
          }),
        });
      }
      if (response.status === 200) {
        toast.success(headingPageProps.toastMessage);
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }
  async function onDelete() {
    try {
      setLoading(true);
      const response = await fetch(`/api/${storeId}/category/${categoryId}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        router.push(`/${storeId}/category`);
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
        {categoryId && (
          <PageHeading
            title={headingPageProps.heading}
            description={headingPageProps.description}
            ButtonComponent={<DeleteButton onDelete={onDelete} />}
          />
        )}
      </div>
      <div className="px-2 md:px-6 lg:px-10 mt-6 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div
              id="formContainer"
              className="flex space-y-2 justify-around flex-col md:flex-row"
            >
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        disabled={loading}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload an image for the category
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={category?.label || "Enter Label Name"}
                        {...field}
                        className="rounded-sm "
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the label for the category
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid place-items-center w-full my-6">
              <Button
                type="submit"
                variant={"default"}
                size={"lg"}
                className="border border-input mx-auto"
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

export default CategoriesForm;
