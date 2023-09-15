var i = 0;
for (i = 0; i < 100 ; i++) {  
describe("booking1", () => {
  it("tests booking", () => {
    cy.viewport(898, 931);
    cy.visit("https://admin-booking-silk.vercel.app/");
    cy.get("button").click();
    cy.location("href").should("eq", "https://admin-booking-silk.vercel.app/api/auth/signin");
    cy.get("#input-username-for-credentials-provider").click();
    cy.get("#input-username-for-credentials-provider").type("123");
    cy.get("#input-password-for-credentials-provider").click();
    cy.get("#input-password-for-credentials-provider").type("123");
    cy.get("button").click();
    cy.wait(1000)
    cy.location("href").should("eq", "https://admin-booking-silk.vercel.app/");
    cy.get("div.css-1lvtzne path").click();
    cy.get("li:nth-of-type(1)").click();
    cy.get("div:nth-of-type(5) > button:nth-of-type(5)").click();
    cy.get("#__next > div:nth-of-type(5) button").click();
    cy.get("div:nth-of-type(11) > button").click();
    cy.xpath('//*[@id="__next"]/div[4]/div[2]/div/div').click();
    cy.get("#menu- li:nth-of-type(2)").click();
    cy.get("div.py-10 input").click();
    cy.get("div.py-10 input").type("1111");
    cy.get("div.py-10 input").click();
    cy.get("div.py-10 input").type("1112");
    cy.xpath('//*[@id="__next"]/div[6]/button').click();
    // cy.get("div:nth-of-type(16) > button").click();
    cy.wait(3000)
    // cy.wait(5000)
    cy.get("div.css-1lvtzne path").click();
    cy.get("li:nth-of-type(3)").click();    
    // cy.get("div.text-center > button").click();
    // cy.get("[data-testid='MenuIcon']").click();
    // cy.get("li:nth-of-type(3) > p").click();
    cy.get("div:nth-of-type(5) > button:nth-of-type(5)").click();
    cy.get("div.text-center button").click();
    cy.get("tr:nth-of-type(24) button").click();

    
    cy.xpath('/html/body/div[3]/div[3]/div[2]/div/div/div').click();
    cy.get("#menu- li:nth-of-type(1)").click();
    // cy.wait(500)
    cy.get("button.MuiButton-containedSuccess").click();
    cy.wait(1000)
  });
});
} 
// ถ้า describe ใหม่ต้อง log in ใหม่
// var i = 0;
// for (i = 0; i < 5 ; i++) {     
//   describe("booking", () => {
//     it("tests booking", () => {
//       cy.viewport(898, 931);
//       cy.visit("https://admin-booking-silk.vercel.app/");
//       cy.wait(1000)
//       cy.location("href").should("eq", "https://admin-booking-silk.vercel.app/");
//       cy.get("div.css-1lvtzne path").click();
//       cy.get("li:nth-of-type(1)").click();
//       cy.get("div:nth-of-type(5) > button:nth-of-type(5)").click();
//       cy.get("#__next > div:nth-of-type(5) button").click();
//       cy.get("div:nth-of-type(11) > button").click();
//       cy.xpath('//*[@id="__next"]/div[4]/div[2]/div/div').click();
//       cy.get("#menu- li:nth-of-type(2)").click();
//       cy.get("div.py-10 input").click();
//       cy.get("div.py-10 input").type("1111");
//       cy.get("div.py-10 input").click();
//       cy.get("div.py-10 input").type("1112");
//       cy.xpath('//*[@id="__next"]/div[6]/button').click();
//       // cy.get("div:nth-of-type(16) > button").click();
//       cy.wait(3000)
//       // cy.wait(5000)
//       cy.get("div.css-1lvtzne path").click();
//       cy.get("li:nth-of-type(3)").click();    
//       // cy.get("div.text-center > button").click();
//       // cy.get("[data-testid='MenuIcon']").click();
//       // cy.get("li:nth-of-type(3) > p").click();
//       cy.get("div:nth-of-type(5) > button:nth-of-type(5)").click();
//       cy.get("div.text-center button").click();
//       cy.get("tr:nth-of-type(24) button").click();
  
      
//       cy.xpath('/html/body/div[3]/div[3]/div[2]/div/div/div').click();
//       cy.get("#menu- li:nth-of-type(1)").click();
//       // cy.wait(500)
//       cy.get("button.MuiButton-containedSuccess").click();
//       cy.wait(1000)
//     });
//   });
  
// } 
