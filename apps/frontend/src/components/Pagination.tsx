import { calculatePageNumbers } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  totalPages: number;
  currentPage: number;
  pageNeighbors?: number;
  className?: string;
};

const Pagination = ({
  totalPages,
  currentPage,
  pageNeighbors = 2,
  className = "",
}: Props) => {
  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    totalPages,
    currentPage,
  });
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {currentPage !== 1 && (
        <button className={cn("rounded-md bg-slate-200 py-2 px-2")}>
          <Link href={`?page=${currentPage - 1}`}>
            <ChevronLeftIcon className="w-4" />
          </Link>
        </button>
      )}
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          className={cn("px-3 py-1 transition hover:text-sky-600", {
            "bg-slate-200": currentPage !== page && page !== "...",
            "bg-blue-500 text-white": currentPage === page,
            "cursor-not-allowed": page === "...",
          })}
        >
          {page === "..." ? "..." : <Link href={`?page=${page}`}>{page}</Link>}
        </button>
      ))}
      {/*next-page button */}
      {currentPage !== totalPages && (
        <button className="rounded-md bg-slate-200 py-2 px-2">
          <Link href={`?page=${currentPage + 1}`}>
            <ChevronRightIcon className="w-4" />
          </Link>
        </button>
      )}
    </div>
  );
};

export default Pagination;
