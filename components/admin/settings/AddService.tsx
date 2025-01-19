import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import
import { ServiceFormData, serviceFormSchema } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormFieldError } from "@/components/ui/form/FormFieldError";

interface AddServiceDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAdd?: (data: ServiceFormData) => void;
}

const AddServiceDialog = ({
  open,
  onOpenChange,
  onAdd,
}: AddServiceDialogProps) => {
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      serviceType: "",
      //   skillSet: "",
      averageRate: "",
    },
  });

  const onSubmit = (data: ServiceFormData) => {
    // onAdd(data);
    // form.reset();
    // onOpenChange(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Plus size={16} />
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add a new service category</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Service Type</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12"
                      placeholder="Enter service type"
                    />
                  </FormControl>
                  <FormMessage />
                  {/* <FormFieldError error={form} /> */}
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="skillSet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Skills Set
                    <span className="text-gray-400 text-xs italic ml-1">
                      (Add up to 5 skills lorem ipsum lorem)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter required skills" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="averageRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    Set Average Service Rate
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12"
                      placeholder="Enter rate (e.g., 10.99)"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex-center">
              <Button type="submit" className="p-5 w-2/3">
                Add
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceDialog;
