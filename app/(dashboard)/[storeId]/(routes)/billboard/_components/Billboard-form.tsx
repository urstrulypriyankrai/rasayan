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
import { BillBoard } from "@prisma/client";
import PageHeading from "@/components/PageHeading";
import DeleteButton from "@/components/ui/custom/DeleteButton";
import ImageUpload from "@/components/ui/Image-upload";
import { useEffect, useState } from "react";

const billboardSchema = z.object({
  label: z.string().min(3).max(50),
  imageUrl: z.string().url().optional(),
});

type Props = {
  billboard: BillBoard | null;
};

function BillboardForm({ billboard }: Props) {
  const { storeId, billboardId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  let headingPageProps = {
    heading: "Create Billboard",
    description: "Create a billboard",
    toastMessage: "Billboard Created",
    action: "Create",
  };
  if (billboard) {
    headingPageProps.heading = "Edit Billboard";
    headingPageProps.description = "Edit a billboard";
    headingPageProps.toastMessage = "Billboard Updated";
    headingPageProps.action = "Edit Billboard";
  }

  const form = useForm<z.infer<typeof billboardSchema>>({
    resolver: zodResolver(billboardSchema),
    defaultValues: {
      label: billboard?.label || "",
      imageUrl: billboard?.imageUrl || "",
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
        {!billboard ? (
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
      <div className="px-2 md:px-6 lg:px-10 mt-6 md:grid ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
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
                    Upload an image for the billboard
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div id="formContainer" className="grid grid-cols-5 gap-7 my-2 ">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={billboard?.label || "Enter Label Name"}
                        {...field}
                        className="rounded-sm "
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the label for the billboard
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              variant={"default"}
              className="border border-input"
            >
              Save
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default BillboardForm;
