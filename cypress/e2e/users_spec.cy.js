/* eslint-disable cypress/no-unnecessary-waiting */
describe("Users", () => {
  beforeEach(() => {
    //Below commands are defined in commands folder
    cy.home();
  });

  it("should display list of users on button click", () => {
    cy.intercept("GET", "https://dummyjson.com/users", {
      statusCode: 200,
      body: {
        users: [
          {
            id: 1,
            firstName: "Murtaza",
            lastName: "saifee",
          },
        ],
      },
    }).as("success");

    cy.findByRole("button", { name: /get users/i }).click();

    cy.findByText(/Murtaza Saifee/i).should("exist");
  });

  it("should display error", () => {
    cy.intercept("GET", "https://dummyjson.com/users", {
      statusCode: 404,
    }).as("fail");

    cy.findByRole("button", { name: /get users/i }).click();

    cy.findByText(/Something went wrong/i).should("exist");
  });
});
