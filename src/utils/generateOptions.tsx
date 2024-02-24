export const generateOptions = (list: string[]): JSX.Element[] =>
  list.map((item) => (
    <option value={item} key={item}>
      {item}
    </option>
  ));
