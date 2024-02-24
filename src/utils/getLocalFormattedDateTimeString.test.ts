import { getLocaleFormattedDateTimeString } from "./getLocalFormattedDateTimeString";

describe("Unit test to test the getLocaleFormattedDateTimeString util fn:", () => {
  test("formats date time string into the format - Oct 08, 2012, 02:35:", () => {
    const formattedDateTime = getLocaleFormattedDateTimeString(
      "2006-03-24T22:30:00.000Z",
      "en-US"
    );

    expect(formattedDateTime).toEqual("Mar 24, 2006, 23:30");
  });
});
