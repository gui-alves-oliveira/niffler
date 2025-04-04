"use client";

import { useQueryState, parseAsInteger } from "nuqs";
import { trpc } from "@/lib/trpc";
import { CreateTransactionDialog } from "./create-transaction-dialog";
import { Header } from "@/components/header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarDateRangePicker } from "@/components/ui/calendar-date-range-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const currencyFromatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR");

export default function Transactions() {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(20));

  const transactions = trpc.transactions.getAll.useQuery({
    page,
    pageSize,
  });

  return (
    <main className="p-6">
      <div className="mb-6 flex justify-end gap-6">
        <div className="flex gap-2">
          <CalendarDateRangePicker className="w-[180px]" />
          <Select>
            <SelectTrigger className="w-[190px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="income">Entrada</SelectItem>
                <SelectItem value="expense">Saída</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[190px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="income">Entrada</SelectItem>
                <SelectItem value="expense">Saída</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <CreateTransactionDialog />
      </div>

      <Table className="mb-6">
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.data?.transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                {currencyFromatter.format(Number(transaction.amount))}
              </TableCell>
              <TableCell>
                {transaction.type === "income" ? (
                  <Badge variant="secondary">Entrada</Badge>
                ) : (
                  <Badge variant="outline">Saída</Badge>
                )}
              </TableCell>
              <TableCell>{transaction.category.name}</TableCell>
              <TableCell>{transaction.user.name}</TableCell>
              <TableCell>
                {dateFormatter.format(new Date(transaction.date))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
