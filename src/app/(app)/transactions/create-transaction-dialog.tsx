"use client";

import { trpc } from "@/lib/trpc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTitle,
  DialogPortal,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
// import { useMaskito } from "@maskito/react";
// import { maskitoNumberOptionsGenerator } from "@maskito/kit";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const createTransactionFromSchema = z.object({
  description: z.string(),
  amount: z.string().transform(Number),
  type: z.enum(["expense", "income"]),
  categoryId: z.string().uuid(),
});

export function CreateTransactionDialog() {
  const [createTransactionModalIsOpen, setCreateTransactionModalIsOpen] =
    useState(false);

  const trpcUtils = trpc.useUtils();

  const categories = trpc.categories.getAll.useQuery();

  const createTransaction = trpc.transactions.create.useMutation({
    onSuccess: () => {
      trpcUtils.transactions.getAll.invalidate();
      createTransactionForm.reset();
      setCreateTransactionModalIsOpen(false);
      toast("Transaction created");
    },
  });

  const createTransactionForm = useForm({
    resolver: zodResolver(createTransactionFromSchema),
    defaultValues: {
      type: "expense",
      amount: "",
    },
  });

  const handleCreateTransaction = (
    data: z.infer<typeof createTransactionFromSchema>,
  ) => {
    createTransaction.mutate({
      description: data.description,
      amount: data.amount,
      categoryId: data.categoryId,
      type: data.type,
    });
  };

  // const currencyMask = useMaskito({
  //   options: maskitoNumberOptionsGenerator({
  //     prefix: "R$ ",
  //     thousandSeparator: ".",
  //     decimalSeparator: ",",
  //     precision: 2,
  //   }),
  // });

  return (
    <Dialog
      open={createTransactionModalIsOpen}
      onOpenChange={setCreateTransactionModalIsOpen}
    >
      <DialogTrigger asChild>
        <Button>Nova transacao</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-4">
          <DialogTitle>Create transaction</DialogTitle>

          <Form {...createTransactionForm}>
            <form
              onSubmit={createTransactionForm.handleSubmit(
                handleCreateTransaction,
              )}
              className="grid gap-4"
            >
              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione tipo de despesa" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="income">Entrada</SelectItem>
                            <SelectItem value="expense">Saída</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione categoria" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            {categories.data?.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create</Button>
            </form>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
