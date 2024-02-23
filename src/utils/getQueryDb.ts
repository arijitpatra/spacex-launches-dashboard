export const getQueryDb = (status: string, text: string) => {
  const textSearch = text ? {$text: { $search: text}} : {} // TODO: make it full text search/substsring

  switch (status) {
    case "successful":
      return {
        $and: [
            { success: true },
            {
              $or: [
                {...textSearch},
              ]
            }
          ]
      };
    case "failed":
      return {
        $and: [
            { success: false },
            {
                $or: [
                {...textSearch},
                ]
            }
          ]
      };
    case "upcoming":
      return {
        $and: [
            { upcoming: true },
            {
                $or: [
                {...textSearch},
                ]
            }
          ]
      };
    default:
      return {
        $and: [
            {
                $or: [
                {...textSearch},
                ]
            }
          ]
      };
  }
};

