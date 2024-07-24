/// <reference types="cypress" />

describe("Todo-Task Application", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("/todo");
  });

  
  it("As a user, I can create a new task and the task is displayed in a task list ", () => {
    // Define the new task item
    const newItem = "Feed the cat";

    // Select the input field locator for a new task
    cy.get(".new-todo").type(`${newItem}{enter}`);

    // Check that the last item in the todo list has the text of the new item
    cy.get(".todo-list li:last").should("have.text", newItem);
  });


  it('As a user, I can modify task and check that change is displayed', () => {
    const newItem = 'Feed the cat'

    //Select the input field locator for the updating task
    cy.get('.todo-list li:first').within(() => {    
      
      //Activate the editing mode for the updating task
      cy.get('label').dblclick();                  
      cy.get('input.edit').clear();    

      //Updating the activated task field             
      cy.get('input.edit').type(`${newItem}{enter}`);

    })
    //Checking that changes are correctly saved and displayed.
    cy.get('.todo-list li:first').should('have.text', newItem);
  })



  it('As a user, I can mark a tasks as completed and updates the remaining items count', () => {
    // Initial check of the remaining items count
    cy.get('.todo-count').should('contain.text', '2 items left'); 

    // Select the first element within the .todo-list and mark it as completed
    cy.get('.todo-list li:first').within(() => {
      cy.get('.toggle').check(); // Mark the task as completed
    });
    
    // Verify that the task is marked as completed 
    cy.get('.todo-list li:first').should('have.class', 'completed');
    
    // Check the updated remaining items count
    cy.get('.todo-count').should('contain.text', '1 item left'); 
    
    // Mark another task as completed
    cy.get('.todo-list li:nth-child(2)').within(() => {
      cy.get('.toggle').check(); // Mark the task as completed
    });
    
    // Verify that the second task is marked as completed
    cy.get('.todo-list li:nth-child(2)').should('have.class', 'completed');
    
    // Check the updated remaining items count again
    cy.get('.todo-count').should('contain.text', '0 items left');  


  })
});
