import styles from "./Filter.module.scss";
import { generateOptions } from "../../utils";

export interface FilterProps {
  label: string;
  options: string[];
  value: string;
  onFilterChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const Filter = ({ label, options, value, onFilterChange }: FilterProps) => {
  return (
    <div className={`${styles.filter}`}>
      <label htmlFor={label} aria-label={label}>
        {label}:{" "}
      </label>
      <select
        tabIndex={0}
        id={label}
        onChange={onFilterChange}
        value={value}
        aria-description="status filter dropdown"
      >
        {generateOptions(options)}
      </select>
    </div>
  );
};

export default Filter;
