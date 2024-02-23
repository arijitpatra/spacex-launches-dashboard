// import "@testing-library/jest-dom";
// import { render, fireEvent } from "@testing-library/react";
// import Filter from "./Filter";

// const label = "industry";
// const options = ["tech", "finance", "medical"];
// const value = "tech";
// const onFilterChange = jest.fn();

// describe("Unit tests for Filter:", () => {
//   test("renders correctly:", () => {
//     const { getByText, getByLabelText } = render(
//       <Filter
//         label={label}
//         options={options}
//         value={value}
//         onFilterChange={onFilterChange}
//       />
//     );

//     expect(getByText("industry:")).toBeInTheDocument();
//     expect(getByLabelText("industry:")).toHaveValue("tech");
//     expect(getByText("tech")).toBeInTheDocument();
//     expect(getByText("finance")).toBeInTheDocument();
//     expect(getByText("medical")).toBeInTheDocument();
//   });

//   test("onFilterChange is called when clicked on filter:", () => {
//     const { getByLabelText } = render(
//       <Filter
//         label={label}
//         options={options}
//         value={value}
//         onFilterChange={onFilterChange}
//       />
//     );

//     fireEvent.change(getByLabelText("industry:"));
//     expect(onFilterChange).toHaveBeenCalledTimes(1);
//   });
// });
