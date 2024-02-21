import {
  ALL_LAUNCHES_ENDPOINT,
  LAUNCHES_QUERY_ENDPOINT,
} from "../../constants";
import styles from "./List.module.scss";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const List = () => {
  //   const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["allLaunches"],
    // queryFn: () => fetch(ALL_LAUNCHES_ENDPOINT).then((res) => res.json()),
    queryFn: () =>
      fetch(LAUNCHES_QUERY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: {},
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
      }).then((res) => res.json()),
  });

  console.log(query.data);

  return <>List:</>;
};

export default List;
