describe(
  "filters e2e test:",
  {
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
  () => {
    beforeEach(() => {
      cy.intercept("POST", "/v5/launches/query").as("postData");
      cy.visit("/"); // Assuming this is your localhost URL configured in cypress.config.ts
    });

    it("Filters data based on dropdown selection - success", () => {
      cy.get("select").select("success");
      cy.get("h2").should("have.text", "success launches 🚀");

      cy.wait("@postData").then(({ request, response }) => {
        expect(request.method).to.eq("POST");
        expect(response?.statusCode).to.eq(200);
        expect(response?.body.docs).to.have.length.above(0);
      });
      cy.contains("Success");
      cy.contains("Upcoming").should("not.exist");
      cy.contains("Failed").should("not.exist");
    });

    it("Filters data based on dropdown selection - failed", () => {
      cy.get("select").select("failed");
      cy.get("h2").should("have.text", "failed launches 🚀");

      cy.wait("@postData").then(({ request, response }) => {
        expect(request.method).to.eq("POST");
        expect(response?.statusCode).to.eq(200);
        expect(response?.body.docs).to.have.length.above(0);
      });
      cy.contains("Failed");
      cy.contains("Upcoming").should("not.exist");
      cy.contains("Success").should("not.exist");
    });

    it("Filters data based on dropdown selection - upcoming", () => {
      cy.get("select").select("upcoming");
      cy.get("h2").should("have.text", "upcoming launches 🚀");

      cy.wait("@postData").then(({ request, response }) => {
        expect(request.method).to.eq("POST");
        expect(response?.statusCode).to.eq(200);
        expect(response?.body.docs).to.have.length.above(0);
      });
      cy.contains("Upcoming");
      cy.contains("Failed").should("not.exist");
      cy.contains("Success").should("not.exist");
    });
  }
);
