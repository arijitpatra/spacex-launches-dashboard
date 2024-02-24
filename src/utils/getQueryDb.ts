export const getQueryDb = (status: string, text: string) => {
  const textSearch = text.trim() ? { $text: { $search: text.trim() } } : {};

  switch (status) {
    case "success":
      return {
        $and: [
          { success: true },
          {
            $or: [{ ...textSearch }],
          },
        ],
      };
    case "failed":
      return {
        $and: [
          { success: false },
          {
            $or: [{ ...textSearch }],
          },
        ],
      };
    case "upcoming":
      return {
        $and: [
          { upcoming: true },
          {
            $or: [{ ...textSearch }],
          },
        ],
      };
    default:
      return {
        $and: [
          {
            $or: [{ ...textSearch }],
          },
        ],
      };
  }
};
