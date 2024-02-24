import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react"; // Changed import to getByAltText
import Card, { CardProps } from "./Card";

describe("Unit test for Card:", () => {
  const cardProps: CardProps = {
    imageSrc: "https://images2.imgbox.com/94/f2/NN6Ph45r_o.png",
    flightNumber: 1,
    missionName: "Test Mission",
    rocketName: "Test Rocket",
    status: "Upcoming",
    launchpadName: "Test Launchpad",
    dateTimeUtc: "Mar 24, 2006, 23:30",
    wikipediaLink: "https://en.wikipedia.org/wiki/DemoSat",
    webcastLink: "https://www.youtube.com/watch?v=0a_00nJ_Y88",
  };

  beforeEach(() => {
    render(<Card {...cardProps} />);
  });

  test("renders image alt text correctly:", () => {
    const rocketImage = screen.getByAltText(
      `${cardProps.rocketName} - rocket photo`
    );
    expect(rocketImage).toBeInTheDocument();
  });

  test("renders image link correctly:", () => {
    const rocketImage = screen.getByAltText(
      `${cardProps.rocketName} - rocket photo`
    );
    expect(rocketImage).toHaveAttribute("src", `${cardProps.imageSrc}`);
  });

  test("renders image lazily:", () => {
    const rocketImage = screen.getByAltText(
      `${cardProps.rocketName} - rocket photo`
    );
    expect(rocketImage).toHaveAttribute("loading", "lazy");
  });

  test("renders Wikipedia link correctly", () => {
    const wikipediaLink = screen.getByText("Wikipedia");
    expect(wikipediaLink).toBeInTheDocument();
  });

  test("renders Wikipedia link href correctly", () => {
    const wikipediaLink = screen.getByText("Wikipedia");
    expect(wikipediaLink).toHaveAttribute("href", `${cardProps.wikipediaLink}`);
  });

  test("renders Wikipedia link in different tab", () => {
    const wikipediaLink = screen.getByText("Wikipedia");
    expect(wikipediaLink).toHaveAttribute("target", "_blank");
  });

  test("renders Webcast link correctly", () => {
    const webcastLink = screen.getByText("Webcast");
    expect(webcastLink).toBeInTheDocument();
  });

  test("renders Webcast link href correctly", () => {
    const webcastLink = screen.getByText("Webcast");
    expect(webcastLink).toHaveAttribute("href", `${cardProps.webcastLink}`);
  });

  test("renders Webcast link in different tab", () => {
    const webcastLink = screen.getByText("Webcast");
    expect(webcastLink).toHaveAttribute("target", "_blank");
  });

  test("renders Webcast link has a custom data attribute data-linktype as video", () => {
    const webcastLink = screen.getByText("Webcast");
    expect(webcastLink).toHaveAttribute("data-linktype", "video");
  });

  test("renders flight number correctly:", () => {
    const flightNumber = screen.getByText(`${cardProps.flightNumber}`);
    expect(flightNumber).toBeInTheDocument();
  });

  test("renders mission name correctly:", () => {
    const missionName = screen.getByText(`${cardProps.missionName}`);
    expect(missionName).toBeInTheDocument();
  });

  test("renders rocket name correctly:", () => {
    const rocketName = screen.getByText(`${cardProps.rocketName}`);
    expect(rocketName).toBeInTheDocument();
  });

  test("renders launchpad name correctly:", () => {
    const launchpadName = screen.getByText(`${cardProps.launchpadName}`);
    expect(launchpadName).toBeInTheDocument();
  });

  test("renders status correctly:", () => {
    const status = screen.getByText(`${cardProps.status}`);
    expect(status).toBeInTheDocument();
  });
});
