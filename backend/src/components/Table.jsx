"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function TableDe({ items = [], type = "Blog" }) {
  // Loading state (when items is empty)
  if (items.length === 0) {
    return (
      <div className="bg-gray-400/10 rounded-2xl border p-5 shadow-xl">
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-400/10 rounded-2xl border p-5 shadow-xl">
      <Table>
        <TableCaption className="mb-4 text-lg font-medium">
          A list of your recent {type.toLowerCase()}s
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg p-3">Title</TableHead>
            <TableHead className="text-right text-lg p-3">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="p-3">{item.title || "Untitled"}</TableCell>
              <TableCell className="text-right p-3 capitalize">
                {item.status || "draft"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={1} className="text-lg p-3">
              Total {type}s
            </TableCell>
            <TableCell className="text-right text-lg p-3">
              {items.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
