import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import Pagination from "@/app/ui/invoices/pagination";
import Table from '@/app/ui/invoices/table';
import Search from "@/app/ui/search";

import { Suspense } from "react";

import { fetchInvoicesPages } from '@/app/lib/data';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Invoice</h1>
      </div>
      <div className="md:mt-8 mt-4 flex items-center justify-between gap-2">
        <Search placeholder="Search Invoice" />
        <CreateInvoice />
      </div>
        query: {query ? query: ""}
        <br />
        currentPage: {currentPage}
        <br />
        totalPages: {totalPages}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
