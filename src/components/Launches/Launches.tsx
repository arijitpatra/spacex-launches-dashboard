import { LAUNCHES_QUERY_ENDPOINT, STATUS } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import Card from "../Card";
import { useInView } from "react-intersection-observer";
import Filter from "../Filter";
import { useDeferredValue, useState } from "react";
import styles from "./Launches.module.scss";
import { getQueryDb } from "../../utils";

const Launches = () => {
  //   const queryClient = useQueryClient();
  const [currentStatus, setCurrentStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const deferredSearchText = useDeferredValue(searchText);
  const { ref, inView } = useInView(); // TODO

  const queryDb = getQueryDb(currentStatus, deferredSearchText);

  const query = useQuery({
    queryKey: ["launches", currentStatus, deferredSearchText],
    queryFn: () =>
      fetch(LAUNCHES_QUERY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryDb,
          options: {
            limit: 10,
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
      }).then((res) => res.json()), // data => data
  });

  return (
    <>
      <section className={`${styles.filterAndSearchSection}`}>
        <h2>{currentStatus} launches</h2>
        <div className={`${styles.filterAndSearch}`}>
          <Filter
            label="Filter by status"
            options={STATUS}
            value={currentStatus}
            onFilterChange={(e) => {
              setCurrentStatus(e.target.value);
            }}
          />
          <div>
            <input
              type="text"
              placeholder="Search for rocket/mission/launchpad..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </section>
      {query?.data?.docs?.length > 0
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          query.data.docs.map((item: any) => <Card key={item.id} data={item} />)
        : null}
    </>
  );
};

export default Launches;
