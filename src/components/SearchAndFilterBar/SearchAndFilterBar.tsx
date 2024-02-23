import { STATUS } from "../../constants";
import Filter from "../Filter";
import styles from "./SearchAndFilterBar.module.scss";

interface SearchAndFilterBarProps {
  status: string;
  searchText: string;
  onStatusChange: React.ChangeEventHandler<HTMLSelectElement>;
  onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchAndFilterBar = ({
  status,
  searchText,
  onStatusChange,
  onSearchChange,
}: SearchAndFilterBarProps) => {
  return (
    <section className={`${styles.filterAndSearchSection}`}>
      <h2>{status} launches 🚀</h2>
      <div className={`${styles.filterAndSearch}`}>
        <Filter
          label="⚡️Filter by status"
          options={STATUS}
          value={status}
          onFilterChange={onStatusChange}
        />
        <div className={`${styles.searchBox}`}>
          <input
            type="text"
            placeholder="🔍 Search for rocket/mission/launchpad..."
            value={searchText}
            onChange={onSearchChange}
          />
        </div>
      </div>
    </section>
  );
};

export default SearchAndFilterBar;
