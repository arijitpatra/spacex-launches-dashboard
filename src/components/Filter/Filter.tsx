import styles from "./Filter.module.scss";
// import { MdFilterAlt } from "react-icons/md";
import { generateOptions } from "../../utils";

interface FilterProps {
  label: string;
  options: string[];
  value: string;
  onFilterChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const Filter = ({ label, options, value, onFilterChange }: FilterProps) => {
  return (
    <div className={`${styles.filter}`}>
      {/* <MdFilterAlt className="react-icons" /> */}
      <label htmlFor={label}>{label}: </label>
      <select id={label} onChange={onFilterChange} value={value}>
        {generateOptions(options)}
      </select>
    </div>
  );
};

export default Filter;
