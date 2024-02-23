import { LAUNCHES_QUERY_ENDPOINT } from "../../constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import Card from "../Card";
import { useInView } from "react-intersection-observer";
import { useDeferredValue, useEffect, useState } from "react";
import { getQueryDb } from "../../utils";
import SearchAndFilterBar from "../SearchAndFilterBar";

const Launches = () => {
  const [currentStatus, setCurrentStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const deferredSearchText = useDeferredValue(searchText);
  const { ref, inView } = useInView();

  const queryDb = getQueryDb(currentStatus, deferredSearchText);

  const fetchLaunches = async ({ pageParam }: { pageParam: number }) => {
    try {
      const response = await fetch(LAUNCHES_QUERY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryDb,
          options: {
            limit: 10,
            page: pageParam,
            select: {
              flight_number: 1,
              name: 1,
              date_utc: 1,
              date_precision: 1,
              upcoming: 1,
              links: 1,
              success: 1,
            },
            populate: [
              { path: "rocket", select: { name: 1 } },
              { path: "launchpad", select: { name: 1 } },
            ],
          },
        }),
      }).then((res) => res.json()); //data => data

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // const query = useQuery({
  //   queryKey: ["launches", currentStatus, deferredSearchText],
  //   queryFn: fetchLaunches,
  // });

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["launches", currentStatus, deferredSearchText],
    queryFn: fetchLaunches,
    initialPageParam: 1,
    getNextPageParam: (metaData) => {
      return metaData.nextPage;
    },
  });

  console.log(hasNextPage);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <SearchAndFilterBar
        status={currentStatus}
        searchText={searchText}
        onStatusChange={(e) => setCurrentStatus(e.target.value)}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      {status === "pending" ? <p>Loading...</p> : null}
      {status === "error" ? <p>Error: {error.message}</p> : null}

      {data?.pages.map((page) =>
        page.docs.map((item, index) => {
          if (page.docs.length === index + 1) {
            return <Card key={item.id} innerRef={ref} data={item} />;
          }
          return <Card key={item.id} data={item} />;
        })
      )}

      {isFetchingNextPage && <p>Loading more launches...</p>}
      {hasNextPage === false && status !== "pending" && (
        <p>Nothing more to load!</p>
      )}
    </>
  );
};

export default Launches;
