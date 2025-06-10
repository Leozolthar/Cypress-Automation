describe('Automation Exercise - Automated Tests', () => {

    let email;
    let name;
    let password;

      before(() => {
    const random = Math.random().toString(36).substring(2, 8)
    email = `qa_${random}@test.com`; //creating a random email before starting the tests
    password = `${random}'@qa`  //creating a random password with @qa in the end
    name = `user_${random}` //creating a random user name, starting with user_

    });

beforeEach(() => {
    cy.visit('https://automationexercise.com/');

})


  it('Should visit the website', () => {
    
    cy.title().should('contain', 'Automation Exercise') 

  })

  it('Register a new user', () => {
    
       
    cy.contains('Signup / Login').click()
    cy.location('pathname').should('eq', '/login') //verify if the URL's final changed to /login
    cy.contains('New User Signup!').should('be.visible')  
    cy.get('[data-qa="signup-name"]').type(name)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()
    cy.title().should('contain', 'Automation Exercise - Signup')
    cy.location('pathname').should('eq', '/signup') //verify if the URL's final changed to   /signup

    cy.contains('Enter Account Information').should('be.visible')
    cy.get('#name').should('have.value', name)
    cy.get('#email').should('have.value', email)

    cy.get('#id_gender2').check()
        cy.get('#id_gender2').should('be.checked')
    cy.get('#id_gender1').check()
        cy.get('#id_gender1').should('be.checked')

    cy.get('#password').type(password).should('have.value', password).and('have.attr', 'type', 'password') //validates if the password is hidden, not displaying its value

    cy.get('#days').select('20')
        cy.get('#days').should('have.value', '20')
    cy.get('#months').select('11')
        cy.get('#months').should('have.value', '11')
    cy.get('#years').select('1996')
        cy.get('#years').should('have.value', '1996')

     
    cy.get('#newsletter').check().should('be.checked')   
    cy.get('#optin').check().should('be.checked')

    cy.get('#first_name').type('firstname')
        .should('have.value', 'firstname')
    cy.get('#last_name').type('lastname')
        .should('have.value', 'lastname')
    cy.get('#company').type('testcompany')
        .should('have.value', 'testcompany')
    cy.get('#address1').type('testadress1')
        .should('have.value', 'testadress1')
    cy.get('#address2').type('testadress2')
        .should('have.value', 'testadress2')

    cy.get('#country').select('Canada')
        .should('have.value', 'Canada')
    
    cy.get('#state').type('teststate')
        .should('have.value', 'teststate')
    cy.get('#city').type('testcity')
        .should('have.value', 'testcity')
    cy.get('#zipcode').type('102030')
        .should('have.value', '102030')
    cy.get('#mobile_number').type('40028922')
        .should('have.value', '40028922')

    cy.get('[data-qa="create-account"]').click()
    cy.location('pathname').should('eq', '/account_created') //verifica se o final da URL mudou para /account_created

    cy.contains('Account Created!').should('be.visible')
    cy.contains('Congratulations! Your new account has been successfully created!').should('be.visible')
    cy.contains('You can now take advantage of member privileges to enhance your online shopping experience with us.').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
    
    cy.contains(`Logged in as ${name}`).should('be.visible')

    cy.contains('Delete Account').click()
    cy.location('pathname').should('eq', '/delete_account') //verifica se o final da URL mudou para /delete_account
    cy.contains('Account Deleted!').should('be.visible')
    cy.contains('Your account has been permanently deleted!').should('be.visible')
    cy.contains('You can create new account to take advantage of member privileges to enhance your online shopping experience with us.').should('be.visible')

    cy.get('[data-qa="continue-button"]').click()
    cy.title().should('contain', 'Automation Exercise') 

  })

  it('Login using a correct Email and password', () => { //test user: zolthar_test . email: zolthar_test@test.com . password: zolthar1234

    cy.contains('Signup / Login').click()
    cy.location('pathname').should('eq', '/login')
    cy.contains('Login to your account').should('be.visible')

    cy.get('[data-qa="login-email"]').type('zolthar_test@test.com')
    cy.get('[data-qa="login-password"]').type('zolthar1234')
    cy.get('[data-qa="login-button"]').click()
    cy.contains('Logged in as zolthar_test').should('be.visible')

    cy.contains('Logout').click()
    cy.location('pathname').should('eq', '/login')

  })

  it('Login using an incorrect Email and password', () => {

    cy.contains('Signup / Login').click()
    cy.location('pathname').should('eq', '/login')
    cy.contains('Login to your account').should('be.visible')

    cy.get('[data-qa="login-email"]').type('wromgemail@test.com')
    cy.get('[data-qa="login-password"]').type('wromgpassword')
    cy.get('[data-qa="login-button"]').click()
    cy.contains('Your email or password is incorrect').should('be.visible')

  })

  it('Using an existing e-mail to create a new account', () => {

    cy.contains('Signup / Login').click()
    cy.location('pathname').should('eq', '/login') 
    cy.contains('New User Signup!').should('be.visible')  
    cy.get('[data-qa="signup-name"]').type(name)
    cy.get('[data-qa="signup-email"]').type('zolthar_test@test.com')
    cy.get('[data-qa="signup-button"]').click()
    cy.contains('Email Address already exist!').should('be.visible')

  })

  it('Filling the Contact Us form', () => {

    cy.contains('Contact us').click();
    cy.url().should('include', '/contact_us')
    cy.contains('Get In Touch').should('be.visible')

    cy.contains('Feedback For Us').should('be.visible')
    cy.contains('We really appreciate your response to our website.').should('be.visible')
    cy.contains('Kindly share your feedback with us at feedback@automationexercise.com.').should('be.visible')
    cy.contains('If you have any suggestion areas or improvements, do let us know. We will definitely work on it.').should('be.visible')
    cy.contains('Thank you').should('be.visible')

    cy.get('input[data-qa="name"]').type(name)
        .should('have.value', name)
    cy.get('input[data-qa="email"]').type(email)
        .should('have.value', email)
    cy.get('input[data-qa="subject"]').type('Drink water')
        .should('have.value', 'Drink water')
    cy.get('textarea[data-qa="message"]').type('We better drink water')
        .should('have.value', 'We better drink water')

    cy.get('input[name="upload_file"]').attachFile('drinkwater.txt')
    cy.get('input[data-qa="submit-button"]').click()

    cy.contains('Success! Your details have been submitted successfully.').should('be.visible')

  })

  it('Verify the Test Cases page', () => {

    cy.contains('Test Cases').click()
    cy.url().should('include', '/test_cases')

  })


  it('Verify Products and Product detail page', () => {

    cy.contains('Products').click()
    cy.url().should('include', '/products')
    cy.contains('All Products').should('be.visible')
    cy.contains('Category').should('be.visible')
    cy.contains('Brands').should('be.visible')

    cy.get('.features_items').should('be.visible') //indicates that the class for the products container is visible

    cy.get('.features_items .col-sm-4').first().contains('View Product').click();
    cy.contains('Blue Top').should('be.visible')
    cy.contains('Availability: In Stock').should('be.visible')
    cy.contains('Condition: New').should('be.visible')
    cy.contains('Brand: Polo').should('be.visible')

  })


  it('Search a Product', () => { //in this case we will use the 'Premium Polo T-Shirts'


    cy.contains('Products').click()
    cy.url().should('include', '/products')
    cy.get('#search_product').should('have.attr', 'placeholder', 'Search Product')
    cy.get('#search_product').type('Premium Polo T-Shirts')
    cy.get('#submit_search').click()
    cy.get('#search_product').clear()
    cy.contains('Premium Polo T-Shirts').should('be.visible')
    cy.contains('Rs. 1500').should('be.visible')

  })

  it.only('Send a subscription at home page', () => {

    cy.scrollTo('bottom')
    cy.contains('Subscription').should('be.visible')
    cy.get('#susbscribe_email').should('have.attr', 'placeholder', 'Your email address')
    cy.contains('Get the most recent updates from our site and be updated your self...').should('be.visible')
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
    cy.contains('You have been successfully subscribed!').should('be.visible')


  })

})