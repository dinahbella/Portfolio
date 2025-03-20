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
import { Button } from "./ui/button";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function BlogTable() {
  return (
    <div className="rounded-xl border shadow-2xl p-3 bg-white dark:bg-gray-800 overflow-x-auto">
      <Table className="min-w-[600px] w-full">
        <TableCaption className="text-lg font-medium mb-4 dark:text-gray-200">
          A list of your recent invoices.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-blue-300 hover:bg-blue-600 dark:bg-blue-700">
            <TableHead className="w-[100px] font-bold text-xl text-gray-800 dark:text-gray-200 p-5">
              #
            </TableHead>
            <TableHead className="font-bold text-xl text-gray-800 dark:text-gray-200">
              Title
            </TableHead>
            <TableHead className="font-bold text-xl text-gray-800 dark:text-gray-200">
              Image
            </TableHead>
            <TableHead className="font-bold text-xl text-gray-800 dark:text-gray-200">
              Edit
            </TableHead>
            <TableHead className="text-right font-bold text-xl text-gray-800 dark:text-gray-200">
              Delete
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow
              key={invoice.invoice}
              className="hover:bg-blue-300 dark:hover:bg-blue-600"
            >
              <TableCell className="font-medium p-4 text-gray-800 dark:text-gray-200">
                {invoice.invoice}
              </TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">
                {invoice.paymentStatus}
              </TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">
                {invoice.paymentMethod}
              </TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">
                <Button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                  <MdEdit className="mr-2" />
                  Edit
                </Button>
              </TableCell>
              <TableCell className="text-right text-gray-800 dark:text-gray-200">
                <Button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  <MdDelete className="mr-2" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-blue-300 dark:bg-blue-700">
            <TableCell
              colSpan={4}
              className="font-bold p-4 text-xl text-gray-800 dark:text-gray-200"
            >
              Total
            </TableCell>
            <TableCell className="text-xl text-right font-bold text-gray-800 dark:text-gray-200">
              $2,500.00
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
