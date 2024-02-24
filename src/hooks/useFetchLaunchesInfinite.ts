import { useInView } from "react-intersection-observer";
import { getQueryDb } from "../utils";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LAUNCHES_QUERY_ENDPOINT } from "../constants";

export const useFetchLaunchesInfinite = (
  currentStatus: string,
  deferredSearchText: string
) => {
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
            limit: 5,
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
      }).then((res) => res.json());

      return response;
    } catch (error) {
      console.log(error); // TODO: Show error in a component
    }
  };

  // we are doing infinite scroll to load the data
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

  // when our target is in view, fetch the next page for infinite scroll
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    ref,
  };
};
