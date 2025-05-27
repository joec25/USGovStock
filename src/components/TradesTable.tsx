import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface Trade {
  id: string;
  politician: string;
  ticker: string;
  companyName: string;
  transactionDate: string;
  transactionType: "buy" | "sell";
  amount: string;
  performance: number;
}

interface TradesTableProps {
  trades?: Trade[];
  onRowClick?: (trade: Trade) => void;
  onSort?: (column: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function TradesTable({
  trades = defaultTrades,
  onRowClick = () => {},
  onSort = () => {},
  currentPage = 1,
  totalPages = 5,
  onPageChange = () => {},
}: TradesTableProps) {
  const [sortColumn, setSortColumn] = React.useState<string>("transactionDate");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "desc",
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    onSort(column);
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <div className="w-full bg-background rounded-lg border border-border p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Recent Trades</h2>
        <div className="flex gap-2">
          <Input placeholder="Search trades..." className="max-w-xs" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>
            A list of recent trades by government officials
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("politician")}
              >
                Politician
                <SortIcon column="politician" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("ticker")}
              >
                Ticker
                <SortIcon column="ticker" />
              </TableHead>
              <TableHead>Company</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("transactionDate")}
              >
                Date
                <SortIcon column="transactionDate" />
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                Amount
                <SortIcon column="amount" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("performance")}
              >
                Performance
                <SortIcon column="performance" />
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <TableRow
                key={trade.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onRowClick(trade)}
              >
                <TableCell className="font-medium">
                  {trade.politician}
                </TableCell>
                <TableCell>{trade.ticker}</TableCell>
                <TableCell>{trade.companyName}</TableCell>
                <TableCell>{trade.transactionDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      trade.transactionType === "buy" ? "default" : "secondary"
                    }
                  >
                    {trade.transactionType.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{trade.amount}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {trade.performance > 0 ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-green-500">
                          +{trade.performance}%
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-red-500">
                          {trade.performance}%
                        </span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRowClick(trade);
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) onPageChange(currentPage - 1);
                }}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) onPageChange(currentPage + 1);
                }}
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

// Sample data for default display
const defaultTrades: Trade[] = [
  {
    id: "1",
    politician: "Nancy Pelosi",
    ticker: "AAPL",
    companyName: "Apple Inc.",
    transactionDate: "2023-06-15",
    transactionType: "buy",
    amount: "$100,000 - $250,000",
    performance: 12.5,
  },
  {
    id: "2",
    politician: "Mitch McConnell",
    ticker: "MSFT",
    companyName: "Microsoft Corporation",
    transactionDate: "2023-06-10",
    transactionType: "buy",
    amount: "$50,000 - $100,000",
    performance: 8.3,
  },
  {
    id: "3",
    politician: "Elizabeth Warren",
    ticker: "AMZN",
    companyName: "Amazon.com Inc.",
    transactionDate: "2023-06-05",
    transactionType: "sell",
    amount: "$250,000 - $500,000",
    performance: -3.2,
  },
  {
    id: "4",
    politician: "Ted Cruz",
    ticker: "TSLA",
    companyName: "Tesla, Inc.",
    transactionDate: "2023-06-01",
    transactionType: "buy",
    amount: "$15,000 - $50,000",
    performance: 22.7,
  },
  {
    id: "5",
    politician: "Bernie Sanders",
    ticker: "GOOGL",
    companyName: "Alphabet Inc.",
    transactionDate: "2023-05-28",
    transactionType: "sell",
    amount: "$100,000 - $250,000",
    performance: -1.8,
  },
  {
    id: "6",
    politician: "Marco Rubio",
    ticker: "NFLX",
    companyName: "Netflix, Inc.",
    transactionDate: "2023-05-25",
    transactionType: "buy",
    amount: "$50,000 - $100,000",
    performance: 15.4,
  },
  {
    id: "7",
    politician: "Alexandria Ocasio-Cortez",
    ticker: "DIS",
    companyName: "The Walt Disney Company",
    transactionDate: "2023-05-20",
    transactionType: "buy",
    amount: "$15,000 - $50,000",
    performance: 5.2,
  },
];
