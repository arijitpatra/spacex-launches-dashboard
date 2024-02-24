import { getQueryDb } from "./getQueryDb";

describe("Unit test to test the getQueryDb util fn:", () => {
  test("generates query correctly when status is 'success' and searchText is '':", () => {
    const query = getQueryDb("all", "");
    expect(query).toEqual({
      $and: [
        {
          $or: [{}],
        },
      ],
    });
  });

  test("generates query correctly when status is 'success' and searchText is 'abc':", () => {
    const query = getQueryDb("success", "abc");
    expect(query).toEqual({
      $and: [
        { success: true },
        {
          $or: [{ $text: { $search: "abc" } }],
        },
      ],
    });
  });

  test("generates query correctly when status is 'failed' and searchText is 'abc':", () => {
    const query = getQueryDb("failed", "abc");
    expect(query).toEqual({
      $and: [
        { success: false },
        {
          $or: [{ $text: { $search: "abc" } }],
        },
      ],
    });
  });

  test("generates query correctly when status is 'upcoming' and searchText is 'abc':", () => {
    const query = getQueryDb("upcoming", "abc");
    expect(query).toEqual({
      $and: [
        { upcoming: true },
        {
          $or: [{ $text: { $search: "abc" } }],
        },
      ],
    });
  });

  test("does not generate this query when status is 'all' and searchText is 'abc':", () => {
    const query = getQueryDb("all", "abc");
    expect(query).not.toEqual({
      $and: [
        { success: true },
        {
          $or: [{ $text: { $search: "abc" } }],
        },
      ],
    });
  });
});
