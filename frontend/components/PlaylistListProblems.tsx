"use client";

import { useEffect, useState, useMemo } from "react";
import { useProblemsStore } from "@/store/useProblemsStore";
import { Input } from "@/components/ui/input";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "lodash";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import PlaylistModel from "@/components/PlayListModel";
import { Bookmark, Save, SaveIcon } from "lucide-react";
import SaveToPlayListModel from "@/components/SaveToPlayList";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

type Problem = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  problemSolved: {
    userId: string;
    problemId: string;
  };
};

const columnHelper = createColumnHelper<Problem>();
const PlayListProblems = ({
  problems,
  mutate,
}: {
  problems: Problem[];
  mutate: (data: string) => void;
}) => {
  const columns: ColumnDef<Problem>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            info.getValue() === "EASY"
              ? "bg-green-100 text-green-800"
              : info.getValue() === "MEDIUM"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: (info) => {
        const row = info.row.original;
        return row.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block text-xs bg-muted px-2 py-1 rounded mr-1"
          >
            {tag}
          </span>
        ));
      },
    },
    {
      header: "Actions",
      cell: (info) => (
        <Link href={`/dashboard/${info.row.original.id}`}>
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Solve
          </Button>
        </Link>
      ),
    },
    {
      header: "Remove",
      cell: (info) => (
        <Button
          onClick={() => mutate(info.row.original.id)}
          className="bg-red-500  text-white font-bold py-2 px-4 rounded"
        >
          Remove
        </Button>
      ),
    },
  ];

  // const { data: session, isPending } = useSession();
  const [globalFilter, setGlobalFilter] = useState("");

  const difficulties = useMemo(
    () => Array.from(new Set(problems.map((p) => p.difficulty))).sort(),
    [problems]
  );

  const tags = useMemo(
    () => Array.from(new Set(problems.flatMap((p) => p.tags))).sort(),
    [problems]
  );

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setGlobalFilter(value);
      }, 300),
    []
  );

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch =
        globalFilter === "" ||
        problem.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
        problem.description.toLowerCase().includes(globalFilter.toLowerCase());
      return matchesSearch;
    });
  }, [problems, globalFilter]);

  const table = useReactTable({
    data: filteredProblems as any,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-6 max-w-full">
      <h1 className="text-xl font-semibold mb-4">Problems </h1>

      {/* {isProblemsLoading && <p className="text-gray-500">Loading problems...</p>} */}
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search problems..."
          onChange={(e) => handleSearch(e.target.value)}
          className=" w-full max-w-md"
        />

        <Link href={`/dashboard`}>
          <Button>Add Problem</Button>
        </Link>
      </div>

      <div className="overflow-auto rounded-md border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer px-4 py-2 font-medium"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 align-top">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        {/* Previous / Next */}
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-muted rounded disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 bg-muted rounded disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>

        {/* Page info */}
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        {/* Page size selector */}
        <select
          className="px-2 py-1 text-sm bg-muted rounded"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PlayListProblems;
