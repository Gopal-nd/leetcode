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



const Admin = () => {
const {data:session} = useSession();
const columns: ColumnDef<Problem>[] = [
  {
    header: "Solved",
    accessorKey: "problemSolved",
    cell: (info) => {
      const row = info.row.original as any
      const ref = row.problemSolved[0]?.problemId.includes(row.id) && row.problemSolved[0]?.userId ===session?.user.id
      return ref ? (
        <Checkbox checked disabled/>
      ) : (
        <Checkbox  disabled/>
      )
    },
  },
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
    header: "Save to Playlist",
    cell: (info) => (
      
          <SaveToPlayListModel id={info.row.original.id} />
        
      
    ),
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
  }
];
  const {
    getAllProblems,
    isProblemsLoading,
    problems,
  } = useProblemsStore();
  console.log(problems);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    getAllProblems();
  }, []);

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
      const matchesDifficulty =
        selectedDifficulty === "" || problem.difficulty === selectedDifficulty;
      const matchesTag =
        selectedTag === "" || problem.tags.includes(selectedTag);
      const matchesSearch =
        globalFilter === "" ||
        problem.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
        problem.description.toLowerCase().includes(globalFilter.toLowerCase());
      return matchesDifficulty && matchesTag && matchesSearch;
    });
  }, [problems, selectedDifficulty, selectedTag, globalFilter]);

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

      {isProblemsLoading && <p className="text-gray-500">Loading problems...</p>}
      <div className="flex justify-between items-center">

      <Input
        placeholder="Search problems..."
        onChange={(e) => handleSearch(e.target.value)}
        className="mb-4 w-full max-w-md"
        />

      
        <PlaylistModel />
        </div>

      <div className="flex gap-4 mb-4 flex-wrap">
        <Select
          value={selectedDifficulty}
          onValueChange={(e) => setSelectedDifficulty(e)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Difficulties" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="">All Difficulties</SelectItem> */}
            {difficulties.map((difficulty) => (
              <SelectItem key={difficulty} value={difficulty}>
                {difficulty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedTag} onValueChange={(e) => setSelectedTag(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Tags" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="">All Tags</SelectItem> */}
            {tags.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => {
            setSelectedDifficulty("");
            setSelectedTag("");
            setGlobalFilter("");
          }}
        >
          clear
        </Button>
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

export default Admin;
