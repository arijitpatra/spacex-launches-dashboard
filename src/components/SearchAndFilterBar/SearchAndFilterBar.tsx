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
    <section className={`${styles.searchAndFilterBar}`}>
      <h2>{status} launches 🚀</h2>

      <div className={`${styles.controls}`}>
        <Filter
          label="⚡️Filter by status"
          options={STATUS}
          value={status}
          onFilterChange={onStatusChange}
        />
        <div className={`${styles.searchBox}`}>
          <input
            aria-description="search box"
            tabIndex={0}
            type="text"
            placeholder="🔍 Type a mission or rocket name to search..."
            value={searchText}
            onChange={onSearchChange}
          />
        </div>
      </div>
    </section>
  );
};

export default SearchAndFilterBar;
