import CustomerSearch from "./CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";
import * as Sentry from "@sentry/nextjs";
import CustomerTable from "./CustomerTable";

export const metadata = {
    title: "Customers Search",
};

export default async function Customers({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { searchText } = await searchParams;

    if (!searchText) return <CustomerSearch />;

    // measure query performance
    const span = Sentry.startInactiveSpan({
        name: "getCustomerSearchResults-2",
    });

    const results = await getCustomerSearchResults(searchText);

    span.end();

    // throw new Error("test");

    return (
        <>
            <CustomerSearch />
            {results.length ? (
                <CustomerTable data={results} />
            ) : (
                <p className="mt-4">No results found</p>
            )}
        </>
    );
}
