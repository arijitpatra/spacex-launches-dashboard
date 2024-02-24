import Card from "../Card";
import { useDeferredValue, useState } from "react";
import SearchAndFilterBar from "../SearchAndFilterBar";
import { useFetchLaunchesInfinite } from "../../hooks";
import { getLocaleFormattedDateTimeString } from "../../utils";

const Launches = () => {
  const [currentStatus, setCurrentStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const deferredSearchText = useDeferredValue(searchText);

  // using useFetchLaunchesInfinite custom hook to fetch launches data infinitely
  const { data, status, error, isFetchingNextPage, hasNextPage, ref } =
    useFetchLaunchesInfinite(currentStatus, deferredSearchText);

  return (
    <>
      <SearchAndFilterBar
        status={currentStatus}
        searchText={searchText}
        onStatusChange={(e) => setCurrentStatus(e.target.value)}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />

      {status === "pending" ? <p>Loading...</p> : null}

      {status === "error" ? <p>Error: {error?.message}</p> : null}

      {data?.pages.map((page: ResponseData) =>
        page.docs.map((item: Doc, index: number) => {
          // passing the ref to the last element in the list, so that the intersecton observer can trigger the infinite scroll
          let innerRef = null;
          if (page.docs.length === index + 1) {
            innerRef = ref;
          }

          return (
            <Card
              key={item.id}
              innerRef={innerRef}
              imageSrc={item.links.patch.small}
              flightNumber={item.flight_number}
              missionName={item.name}
              rocketName={item.rocket.name}
              status={
                item.upcoming ? "Upcoming" : item.success ? "Success" : "Failed"
              }
              launchpadName={item.launchpad.name}
              dateTimeUtc={getLocaleFormattedDateTimeString(item.date_utc)}
              wikipediaLink={item.links.wikipedia}
              webcastLink={item.links.webcast}
            />
          );
        })
      )}

      {isFetchingNextPage && <p>Loading more...</p>}

      {hasNextPage === false && status !== "pending" && (
        <p>Nothing more to load!</p>
      )}
    </>
  );
};

export default Launches;
