"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { BillBoard, Category } from "@prisma/client";
import PageHeading from "@/components/PageHeading";
import DeleteButton from "@/components/ui/custom/DeleteButton";
import { useEffect, useState } from "react";

const categorySchema = z.object({
  name: z.string().min(3).max(50),
  billboardId: z.string().optional(),
});

type Props = {
  category: Category | null;
};

function CreateCategoryForm({ category }: Props) {
  const { storeId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [billboards, setBillboards] = useState<BillBoard[]>([]);
  const [showBillboardForm, setShowBillboardForm] = useState(false);

  useEffect(() => {
    async function fetchBillboards() {
      try {
        const response = await fetch(`/api/${storeId}/billboard`);
        if (!response.ok) throw new Error("Network response was not ok");
        const { data } = await response.json();
        setBillboards(data);
        if (data.length === 0) setShowBillboardForm(true);
      } catch (error) {
        console.error("Error fetching billboards:", error);
        toast.error("Error fetching billboards");
      }
    }

    fetchBillboards();
  }, [storeId]);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      billboardId: category?.billboardId || "",
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { name, billboardId } = form.getValues();
    console.log("called");
    try {
      const response = await fetch(`/api/${storeId}/categories`, {
        method: "POST",
        body: JSON.stringify({ name, billboardId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success(category ? "Category Updated" : "Category Created");
        router.refresh();
      } else {
        throw new Error("Failed to create/update category");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/${storeId}/categories/${category?.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Category Deleted");
        router.push(`/${storeId}/categories`);
      } else {
        throw new Error("Failed to delete category");
      }
    } catch (error) {
      toast.error("Make sure you remove all the related entities first");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeading
        title={category ? "Edit Category" : "Create Category"}
        description={category ? "Edit a category" : "Create a new category"}
        ButtonComponent={category && <DeleteButton onDelete={onDelete} />}
      />
      <div className="px-2 md:px-6 lg:px-10 mt-6 bg-secondary md:mx-6 mx-2 my-2 rounded-md p-4">
        {/* @ts-ignore */}
        <Form {...form}>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Category Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Billboard</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Billboard" />
                      </SelectTrigger>
                      <SelectContent>
                        {billboards.map((billboard) => (
                          <SelectItem key={billboard.id} value={billboard.id}>
                            {billboard.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" h-full grid place-items-center">
              <Button
                type="submit"
                variant="default"
                className="md:col-span-1 border border-input grid place-items-center w-[80%]"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {showBillboardForm && (
        <div className="px-2 md:px-6 lg:px-10 mt-6 bg-secondary md:mx-6 mx-2 my-2 rounded-md p-4">
          <CreateBillboardForm onClose={() => setShowBillboardForm(false)} />
        </div>
      )}
    </>
  );
}

type CreateBillboardFormProps = {
  onClose: () => void;
};

const billboardSchema = z.object({
  label: z.string().min(3).max(50),
  imageUrl: z.string().url().optional(),
});

function CreateBillboardForm({ onClose }: CreateBillboardFormProps) {
  const { storeId } = useParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof billboardSchema>>({
    resolver: zodResolver(billboardSchema),
  });

  const onSubmit = async (values: z.infer<typeof billboardSchema>) => {
    try {
      const response = await fetch(`/api/${storeId}/billboards`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Billboard Created");
        router.refresh();
        onClose();
      } else {
        throw new Error("Failed to create billboard");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    // @ts-ignore
    <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
      <form>
        <FormItem>
          <FormLabel>Billboard Label</FormLabel>
          <FormControl>
            <Input {...form.register("label")} placeholder="Enter Label" />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Image URL</FormLabel>
          <FormControl>
            <Input
              {...form.register("imageUrl")}
              placeholder="Enter Image URL"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <div className="flex gap-4">
          <Button type="submit">Create Billboard</Button>
          <Button type="button" onClick={onClose} variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateCategoryForm;
