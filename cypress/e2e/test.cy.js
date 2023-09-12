describe("test", () => {
  it("tests test", () => {
    cy.viewport(898, 931);
    cy.visit("https://admin-booking-silk.vercel.app/");
    cy.get("button").click();
    cy.location("href").should("eq", "https://admin-booking-silk.vercel.app/api/auth/signin");
    cy.get("#input-username-for-credentials-provider").click();
    cy.get("#input-username-for-credentials-provider").type("123");
    cy.get("#input-password-for-credentials-provider").click();
    cy.get("#input-password-for-credentials-provider").type("123");
    cy.get("button").click();
    cy.location("href").should("eq", "https://admin-booking-silk.vercel.app/");
    cy.get("[data-testid='MenuIcon']").click();
    cy.get("li:nth-of-type(3) > p").click();
    cy.get("div:nth-of-type(3) > button:nth-of-type(3)").click();
    cy.get("div.text-center button").click();
    cy.get("a.MuiTypography-h5").click();
    cy.location("href").should("eq", "https://admin-booking-silk.vercel.app/");
    cy.get("div.css-2uchni > button").click();
    cy.visit("https://admin-booking-silk.vercel.app/");
    cy.get("div.css-2uchni > button").click();
    cy.visit("https://admin-booking-silk.vercel.app/");
  });
});
