describe(
  "filters in combination with search e2e test:",
  {
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
  () => {
    beforeEach(() => {
      cy.intercept("POST", "/v5/launches/query").as("postData");
      cy.visit("/");
    });

    it("Search for a specific rocket name with status success", () => {
      const searchText = "Falcon 1";
      cy.get('input[type="text"]')
        .type(searchText)
        .should("have.value", searchText);
      cy.get("select").select("success");

      cy.wait("@postData").then(({ request, response }) => {
        expect(request.method).to.eq("POST");
        expect(response?.statusCode).to.eq(200);
        expect(response?.body.docs).to.have.length.above(0);
        cy.contains("Ax-1");
      });
    });

    it("Search for a specific rocket name with status failed", () => {
      const searchText = "Falcon 1";
      cy.get('input[type="text"]')
        .type(searchText)
        .should("have.value", searchText);
      cy.get("select").select("failed");

      cy.wait("@postData").then(({ request, response }) => {
        expect(request.method).to.eq("POST");
        expect(response?.statusCode).to.eq(200);
        expect(response?.body.docs).to.have.length.above(0);
        cy.contains("Trailblazer");
      });
    });

    it("Search for a specific rocket name with status upcoming", () => {
      const searchText = "Falcon 1";
      cy.get('input[type="text"]')
        .type(searchText)
        .should("have.value", searchText);
      cy.get("select").select("upcoming");

      cy.wait("@postData").then(({ request, response }) => {
        expect(request.method).to.eq("POST");
        expect(response?.statusCode).to.eq(200);
        expect(response?.body.docs).to.have.length.above(0);
        cy.contains("TTL-1");
      });
    });
  }
);
