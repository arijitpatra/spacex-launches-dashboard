describe(
  "search e2e test:",
  {
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
  () => {
    beforeEach(() => {
      cy.visit("/"); // Assuming this is your localhost URL configured in cypress.config.ts
    });

    it("Search for a mission name", () => {
      const searchText = "DemoSat";
      cy.get('input[type="text"]')
        .type(searchText)
        .should("have.value", searchText);

      cy.request("POST", "https://api.spacexdata.com/v5/launches/query", {
        query: {
          $and: [{ $or: [{ $text: { $search: searchText } }] }],
        },
        options: {
          limit: 5,
          page: 1,
          select: {
            flight_number: 1,
            name: 1,
            date_utc: 1,
            date_precision: 1,
            upcoming: 1,
            links: 1,
            success: 1,
          },
          populate: [
            { path: "rocket", select: { name: 1 } },
            { path: "launchpad", select: { name: 1 } },
          ],
        },
      }).then((response) => {
        expect(response?.body.docs).to.have.length.above(0);
      });

      cy.contains(searchText);
    });

    it("Search for a rocket name", () => {
      const searchText = "Falcon 9";
      cy.get('input[type="text"]')
        .type(searchText)
        .should("have.value", searchText);

      cy.request("POST", "https://api.spacexdata.com/v5/launches/query", {
        query: {
          $and: [{ $or: [{ $text: { $search: searchText } }] }],
        },
        options: {
          limit: 5,
          page: 1,
          select: {
            flight_number: 1,
            name: 1,
            date_utc: 1,
            date_precision: 1,
            upcoming: 1,
            links: 1,
            success: 1,
          },
          populate: [
            { path: "rocket", select: { name: 1 } },
            { path: "launchpad", select: { name: 1 } },
          ],
        },
      }).then((response) => {
        expect(response?.body.docs).to.have.length.above(0);
      });

      cy.contains(searchText);
    });

    it("A random invalid search text should not return anything", () => {
      const searchText = "@#$%*";
      cy.get('input[type="text"]')
        .type(searchText)
        .should("have.value", searchText);

      cy.request("POST", "https://api.spacexdata.com/v5/launches/query", {
        query: {
          $and: [{ $or: [{ $text: { $search: searchText } }] }],
        },
        options: {
          limit: 5,
          page: 1,
          select: {
            flight_number: 1,
            name: 1,
            date_utc: 1,
            date_precision: 1,
            upcoming: 1,
            links: 1,
            success: 1,
          },
          populate: [
            { path: "rocket", select: { name: 1 } },
            { path: "launchpad", select: { name: 1 } },
          ],
        },
      }).then((response) => {
        expect(response?.body.docs).to.have.length(0);
      });
    });
  }
);
