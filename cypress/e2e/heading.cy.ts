describe(
  "application e2e test:",
  {
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
  () => {
    beforeEach(() => {
      cy.visit("/"); // the localhost URL is configured in the cypress.config.ts
    });

    it("Contains the correct heading", () => {
      cy.contains("SpaceX Launches Dashboard");
    });

    it('Contains the initial sub-header as "all launches 🚀"', () => {
      cy.get("h2").should("have.text", "all launches 🚀");
    });
  }
);
