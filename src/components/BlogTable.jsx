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
    <div className="rounded-xl border shadow-2xl p-3 bg-white dark:bg-gray-800">
      <Table className="p-4">
        <TableCaption className="text-lg font-medium mb-4 dark:text-gray-200 ">
          A list of your recent invoices.
        </TableCaption>
        <TableHeader className="p-4">
          <TableRow className="bg-blue-300 hover:bg-blue-600 p-4 dark:bg-blue-700">
            <TableHead className="w-[100px] font-bold text-xl text-gray-800 dark:text-gray-200 p-5">
              #
            </TableHead>
            <TableHead className="font-bold text-xl text-gray-800 dark:text-blue-200">
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
          {invoices.map((invoice, index) => (
            <TableRow key={invoice.invoice} className=" p-2  hover:bg-blue-300">
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
                {invoice.paymentMethod}
              </TableCell>
              <TableCell className="text-right text-gray-800 dark:text-gray-200">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-blue-300 dark:bg-blue-700">
            <TableCell
              colSpan={4}
              className="font-bold p-4 text-gray-800 dark:text-gray-200"
            >
              Total
            </TableCell>
            <TableCell className="text-right font-bold text-gray-800 dark:text-gray-200">
              $2,500.00
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
