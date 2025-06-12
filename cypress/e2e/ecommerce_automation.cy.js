describe('Automation Exercise - Automated Tests', () => {

    let email;
    let name;
    let password;
    let onetennumber;

      before(() => {

    const randomamount = Math.floor(Math.random() * 10) + 1 //it should generates a random number between 1 - 10
    onetennumber = randomamount
    

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
    cy.location('pathname').should('eq', '/account_created') //verify if the URL's final changed to /account_created

    cy.contains('Account Created!').should('be.visible')
    cy.contains('Congratulations! Your new account has been successfully created!').should('be.visible')
    cy.contains('You can now take advantage of member privileges to enhance your online shopping experience with us.').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
    
    cy.contains(`Logged in as ${name}`).should('be.visible')

    cy.contains('Delete Account').click()
    cy.location('pathname').should('eq', '/delete_account') //verify if the URL's final changed to  /delete_account
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

  it('Send a subscription at home page', () => {

    cy.scrollTo('bottom')
    cy.contains('Subscription').should('be.visible')
    cy.get('#susbscribe_email').should('have.attr', 'placeholder', 'Your email address')
    cy.contains('Get the most recent updates from our site and be updated your self...').should('be.visible')
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
    cy.contains('You have been successfully subscribed!').should('be.visible')

  })

  it('Send a subscription at Cart page', () => {

  cy.contains('Cart').click()
  cy.url().should('include', '/view_cart')
  cy.get('#susbscribe_email').should('have.attr', 'placeholder', 'Your email address')
  cy.contains('Get the most recent updates from our site and be updated your self...').should('be.visible')
  cy.get('#susbscribe_email').type(email)
  cy.get('#subscribe').click()
  cy.contains('You have been successfully subscribed!').should('be.visible')

  })

  it('Adding products in Cart', () => {

    cy.contains('Products').click()
    cy.url().should('include', '/products')
    cy.get('.features_items').should('be.visible')

    cy.get('.features_items .product-image-wrapper').eq(0).trigger('mouseover')
    cy.get('a[data-product-id="1"]').first().click()
    cy.get('.modal-content').should('be.visible')
    cy.contains('Added!').should('be.visible')
    cy.contains('Your product has been added to cart.').should('be.visible')
    cy.contains('Continue Shopping').click()

    cy.get('.features_items .product-image-wrapper').eq(1).trigger('mouseover')
    cy.get('a[data-product-id="2"]').first().click()
    cy.get('.modal-content').should('be.visible')
    cy.contains('Added!').should('be.visible')
    cy.contains('Your product has been added to cart.').should('be.visible')
    cy.contains('View Cart').click()
    cy.url().should('include', '/view_cart')


  cy.get('#cart_info_table tbody tr').eq(0).within(() => {
  cy.get('.cart_description h4 a').should('contain.text', 'Blue Top')
  cy.get('.cart_price p').should('contain.text', 'Rs. 500')
  cy.get('.cart_quantity button').should('contain.text', '1')
  cy.get('.cart_total p.cart_total_price').should('contain.text', 'Rs. 500')
})

  cy.get('#cart_info_table tbody tr').eq(1).within(() => {
  cy.get('.cart_description h4 a').should('contain.text', 'Men Tshirt')
  cy.get('.cart_price p').should('contain.text', 'Rs. 400')
  cy.get('.cart_quantity button').should('contain.text', '1')
  cy.get('.cart_total p.cart_total_price').should('contain.text', 'Rs. 400')
})

  cy.get('.cart_quantity_delete').each(($el) => {  //it will click every delete button each time
          cy.wrap($el).click()
})

  cy.get('#empty_cart').should('be.visible')
  cy.get('#empty_cart').should('contain.text', 'Cart is empty! Click here to buy products.')

  })


  it('Checking Product Quantity', () => {

  cy.get('.features_items .product-image-wrapper').eq(0).trigger('mouseover')
  cy.contains('View Product').eq(0).click()
  cy.url().should('include', '/product_details/1')
  cy.get('input[name="quantity"]').clear().type(onetennumber.toString())
  cy.contains('Add to cart').click()
  cy.get('.modal-content').should('be.visible')
  cy.contains('Added!').should('be.visible')
  cy.contains('Your product has been added to cart.').should('be.visible')
  cy.contains('View Cart').click()
  cy.get('.cart_quantity button').should('contain.text', onetennumber.toString())
  cy.get('.cart_quantity_delete').click()
  cy.get('#empty_cart').should('be.visible')
  cy.get('#empty_cart').should('contain.text', 'Cart is empty! Click here to buy products.')

  })


  it('Place Order: Register While Checkout', () => {

  cy.get('.features_items .product-image-wrapper').eq(0).trigger('mouseover')
  cy.contains('Add to cart').eq(0).click()
  cy.get('.modal-content').should('be.visible')
  cy.contains('Added!').should('be.visible')
  cy.contains('Your product has been added to cart.').should('be.visible')
  cy.contains('View Cart').click()
  cy.url().should('include', '/view_cart')
  cy.get('.btn.btn-default.check_out').click()

  cy.get('.modal-content').should('be.visible')
  cy.get('.modal-title').should('be.visible').and('have.text', 'Checkout')
  cy.get('.text-center').should('contain.text', 'Register / Login account to proceed on checkout.')
  cy.get('a[href="/login"]').eq(1).click()


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
    cy.location('pathname').should('eq', '/account_created')

    cy.contains('Account Created!').should('be.visible')
    cy.contains('Congratulations! Your new account has been successfully created!').should('be.visible')
    cy.contains('You can now take advantage of member privileges to enhance your online shopping experience with us.').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
    cy.contains(`Logged in as ${name}`).should('be.visible')

    cy.get('a[href="/view_cart"]').first().click()
    cy.location('pathname').should('eq', '/view_cart')
    cy.get('.btn.btn-default.check_out').click()
    cy.location('pathname').should('eq', '/checkout')

    cy.get('#address_delivery').should('be.visible') //this section validates the 'Your Deliver Adress' section
    cy.get('#address_delivery > .address_title > .page-subheading').should('have.text', 'Your delivery address')  
    cy.get('#address_delivery .address_firstname.address_lastname').should('contain.text', 'Mr. firstname lastname')
    cy.get('#address_delivery .address_address1.address_address2').eq(0).should('contain.text', 'testcompany')
    cy.get('#address_delivery .address_address1.address_address2').eq(1).should('contain.text', 'testadress1')
    cy.get('#address_delivery .address_address1.address_address2').eq(2).should('contain.text', 'testadress2')
    cy.get('#address_delivery .address_city.address_state_name.address_postcode').should('contain.text', 'testcity teststate').and('contain.text', '102030')
    cy.get('#address_delivery .address_country_name').should('contain.text', 'Canada')
    cy.get('#address_delivery .address_phone').should('contain.text', '40028922')


    cy.get('#address_invoice').should('be.visible') //this section validates the 'Your billing address' section
    cy.get('#address_invoice > .address_title > .page-subheading').should('have.text', 'Your billing address')  
    cy.get('#address_invoice .address_firstname.address_lastname').should('contain.text', 'Mr. firstname lastname')
    cy.get('#address_invoice .address_address1.address_address2').eq(0).should('contain.text', 'testcompany')
    cy.get('#address_invoice .address_address1.address_address2').eq(1).should('contain.text', 'testadress1')
    cy.get('#address_invoice .address_address1.address_address2').eq(2).should('contain.text', 'testadress2')
    cy.get('#address_invoice .address_city.address_state_name.address_postcode').should('contain.text', 'testcity teststate').and('contain.text', '102030')
    cy.get('#address_invoice .address_country_name').should('contain.text', 'Canada')
    cy.get('#address_invoice .address_phone').should('contain.text', '40028922')


    cy.get('.cart_total_price').eq(1).should('have.text', 'Rs. 500')

    cy.get('.form-control').should('be.visible').type('a random QA text')
    cy.get('a[href="/payment"]').first().click()
    cy.location('pathname').should('eq', '/payment')

    cy.get('[data-qa="name-on-card"]').should('be.visible').type(name)
    cy.get('[data-qa="card-number"]').should('be.visible').type(onetennumber)
    cy.get('[data-qa="cvc"]').should('be.visible').and('have.attr', 'placeholder', 'ex. 311').type(onetennumber)
    cy.get('[data-qa="expiry-month"]').should('be.visible').and('have.attr', 'placeholder', 'MM').type(onetennumber)
    cy.get('[data-qa="expiry-year"]').should('be.visible').and('have.attr', 'placeholder', 'YYYY').type(onetennumber)

    cy.get('#submit').click()
    
    cy.location('pathname').should('eq', '/payment_done/500')
    cy.get('[data-qa="order-placed"]').should('have.text', 'Order Placed!')
    cy.contains('Congratulations! Your order has been confirmed!')
    cy.get('[data-qa="continue-button"]').click()
    cy.contains('Delete Account').click()
    cy.location('pathname').should('eq', '/delete_account') 
    cy.contains('Account Deleted!').should('be.visible')
    cy.contains('Your account has been permanently deleted!').should('be.visible')
    cy.contains('You can create new account to take advantage of member privileges to enhance your online shopping experience with us.').should('be.visible')

    cy.get('[data-qa="continue-button"]').click()
    cy.title().should('contain', 'Automation Exercise') 
    
  })


  it('Place Order: Register Before Checkout', () => {

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
    cy.location('pathname').should('eq', '/account_created') //verify if the URL's final changed to /account_created

    cy.contains('Account Created!').should('be.visible')
    cy.contains('Congratulations! Your new account has been successfully created!').should('be.visible')
    cy.contains('You can now take advantage of member privileges to enhance your online shopping experience with us.').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
    
    cy.contains(`Logged in as ${name}`).should('be.visible')

    cy.get('.features_items .product-image-wrapper').eq(0).trigger('mouseover')
    cy.contains('Add to cart').eq(0).click()
    cy.get('.modal-content').should('be.visible')
    cy.contains('Added!').should('be.visible')
    cy.contains('Your product has been added to cart.').should('be.visible')
    cy.contains('View Cart').click()
    cy.url().should('include', '/view_cart')
    cy.get('.btn.btn-default.check_out').click()

    cy.get('.form-control').should('be.visible').type('a random QA text')
    cy.get('a[href="/payment"]').first().click()
    cy.location('pathname').should('eq', '/payment')

    cy.get('[data-qa="name-on-card"]').should('be.visible').type(name)
    cy.get('[data-qa="card-number"]').should('be.visible').type(onetennumber)
    cy.get('[data-qa="cvc"]').should('be.visible').and('have.attr', 'placeholder', 'ex. 311').type(onetennumber)
    cy.get('[data-qa="expiry-month"]').should('be.visible').and('have.attr', 'placeholder', 'MM').type(onetennumber)
    cy.get('[data-qa="expiry-year"]').should('be.visible').and('have.attr', 'placeholder', 'YYYY').type(onetennumber)

    cy.get('#submit').click()
    
    cy.location('pathname').should('eq', '/payment_done/500')
    cy.get('[data-qa="order-placed"]').should('have.text', 'Order Placed!')
    cy.contains('Congratulations! Your order has been confirmed!')
    cy.get('[data-qa="continue-button"]').click()
    cy.contains('Delete Account').click()
    cy.location('pathname').should('eq', '/delete_account') 
    cy.contains('Account Deleted!').should('be.visible')
    cy.contains('Your account has been permanently deleted!').should('be.visible')
    cy.contains('You can create new account to take advantage of member privileges to enhance your online shopping experience with us.').should('be.visible')

    cy.get('[data-qa="continue-button"]').click()
    cy.title().should('contain', 'Automation Exercise')


    })

  
  it('Place Order: Login Before Checkout', () => {

    cy.contains('Signup / Login').click()
    cy.location('pathname').should('eq', '/login')
    cy.contains('Login to your account').should('be.visible')

    cy.get('[data-qa="login-email"]').type('zolthar_test@test.com')
    cy.get('[data-qa="login-password"]').type('zolthar1234')
    cy.get('[data-qa="login-button"]').click()
    cy.contains('Logged in as zolthar_test').should('be.visible')

    cy.get('.features_items .product-image-wrapper').eq(0).trigger('mouseover')
    cy.contains('Add to cart').eq(0).click()
    cy.get('.modal-content').should('be.visible')
    cy.contains('Added!').should('be.visible')
    cy.contains('Your product has been added to cart.').should('be.visible')
    cy.contains('View Cart').click()
    cy.url().should('include', '/view_cart')
    cy.get('.btn.btn-default.check_out').click()

    cy.get('#address_delivery').should('be.visible') //this section validates the 'Your Deliver Adress' section
    cy.get('#address_delivery > .address_title > .page-subheading').should('have.text', 'Your delivery address')  
    cy.get('#address_delivery .address_firstname.address_lastname').should('contain.text', '. zolthar test')
    cy.get('#address_delivery .address_address1.address_address2').eq(0).should('contain.text', 'zoltharcompany')
    cy.get('#address_delivery .address_address1.address_address2').eq(1).should('contain.text', 'adress1')
    cy.get('#address_delivery .address_address1.address_address2').eq(2).should('contain.text', 'adress2')
    cy.get('#address_delivery .address_city.address_state_name.address_postcode').should('contain.text', 'Sao Paulo SP').and('contain.text', '1029040')
    cy.get('#address_delivery .address_country_name').should('contain.text', 'Canada')
    cy.get('#address_delivery .address_phone').should('contain.text', '12340987')

    cy.get('#address_invoice').should('be.visible') //this section validates the 'Your billing address' section
    cy.get('#address_invoice > .address_title > .page-subheading').should('have.text', 'Your billing address')  
    cy.get('#address_invoice .address_firstname.address_lastname').should('contain.text', '. zolthar test')
    cy.get('#address_invoice .address_address1.address_address2').eq(0).should('contain.text', 'zoltharcompany')
    cy.get('#address_invoice .address_address1.address_address2').eq(1).should('contain.text', 'adress1')
    cy.get('#address_invoice .address_address1.address_address2').eq(2).should('contain.text', 'adress2')
    cy.get('#address_invoice .address_city.address_state_name.address_postcode').should('contain.text', 'Sao Paulo SP').and('contain.text', '1029040')
    cy.get('#address_invoice .address_country_name').should('contain.text', 'Canada')
    cy.get('#address_invoice .address_phone').should('contain.text', '12340987')

    cy.get('.form-control').should('be.visible').type('a random QA text')
    cy.get('a[href="/payment"]').first().click()
    cy.location('pathname').should('eq', '/payment')

    cy.get('[data-qa="name-on-card"]').should('be.visible').type(name)
    cy.get('[data-qa="card-number"]').should('be.visible').type(onetennumber)
    cy.get('[data-qa="cvc"]').should('be.visible').and('have.attr', 'placeholder', 'ex. 311').type(onetennumber)
    cy.get('[data-qa="expiry-month"]').should('be.visible').and('have.attr', 'placeholder', 'MM').type(onetennumber)
    cy.get('[data-qa="expiry-year"]').should('be.visible').and('have.attr', 'placeholder', 'YYYY').type(onetennumber)

    cy.get('#submit').click()
    
    cy.get('[data-qa="order-placed"]').should('have.text', 'Order Placed!')
    cy.contains('Congratulations! Your order has been confirmed!')

    cy.contains('Logout').click()
    cy.location('pathname').should('eq', '/login')



  })  

  it('Check Products by Category', () => {

    cy.get('.panel-title a').contains('Women').click()
    cy.get('#Women').should('be.visible')
    cy.get('#Women ul li a').should('contain.text','Dress', 'Tops', 'Sarees')
    cy.get('#Women ul li a').contains('Dress').click()
      cy.url().should('include', '/category_products/1')
    cy.contains('Women - Dress Products').should('be.visible')
    cy.get('.features_items').should('contain.text', 'Sleeveless Dress')
    cy.get('.features_items').should('contain.text', 'Stylish Dress')
    cy.get('.features_items').should('contain.text', 'Rose Pink Embroidered Maxi Dress')

    cy.get('.panel-title a').contains('Women').click()
    cy.get('#Women ul li a').should('contain.text','Dress', 'Tops', 'Sarees')
    cy.get('#Women ul li a').contains('Tops').click()
      cy.url().should('include', '/category_products/2')
    cy.contains('Women - Tops Products').should('be.visible')
    cy.get('.features_items').should('contain.text', 'Blue Top')
    cy.get('.features_items').should('contain.text', 'Winter Top')
    cy.get('.features_items').should('contain.text', 'Summer White Top')
    cy.get('.features_items').should('contain.text', 'Madame Top For Women')
    cy.get('.features_items').should('contain.text', 'Fancy Green Top')
    cy.get('.features_items').should('contain.text', 'Lace Top For Women')

    cy.get('.panel-title a').contains('Women').click()
    cy.get('#Women').should('be.visible')
    cy.get('#Women ul li a').should('contain.text','Dress', 'Tops', 'Sarees')
    cy.get('#Women ul li a').contains('Saree').click()
      cy.url().should('include', '/category_products/7')
    cy.contains('Women - Saree Products').should('be.visible')
    cy.get('.features_items').should('contain.text', 'Cotton Silk Hand Block Print Saree')
    cy.get('.features_items').should('contain.text', 'Rust Red Linen Saree')
    cy.get('.features_items').should('contain.text', 'Beautiful Peacock Blue Cotton Linen Saree')


    cy.get('.panel-title a').contains('Men').click()
    cy.get('#Men').should('be.visible')
    cy.get('#Men ul li a').should('contain.text','Tshirts', 'Jeans')
    cy.get('#Men ul li a').contains('Tshirts').click()
      cy.url().should('include', '/category_products/3')
    cy.contains('Men - Tshirts Products').should('be.visible')
    cy.get('.features_items').should('contain.text', 'Men Tshirt')
    cy.get('.features_items').should('contain.text', 'Pure Cotton V-Neck T-Shirt')
    cy.get('.features_items').should('contain.text', 'Green Side Placket Detail T-Shirt')
    cy.get('.features_items').should('contain.text', 'Premium Polo T-Shirts')
    cy.get('.features_items').should('contain.text', 'Pure Cotton Neon Green Tshirt')
    cy.get('.features_items').should('contain.text', 'GRAPHIC DESIGN MEN T SHIRT - BLUE')


    cy.get('.panel-title a').contains('Men').click()
    cy.get('#Men').should('be.visible')
    cy.get('#Men ul li a').should('contain.text','Tshirts', 'Jeans')
    cy.get('#Men ul li a').contains('Jeans').click()
      cy.url().should('include', '/category_products/6')
    cy.contains('Men - Jeans Products').should('be.visible')
    cy.get('.features_items').should('contain.text', 'Soft Stretch Jeans')
    cy.get('.features_items').should('contain.text', 'Regular Fit Straight Jeans')
    cy.get('.features_items').should('contain.text', 'Grunt Blue Slim Fit Jeans')


    cy.get('.panel-title a').contains('Kids').click()
    cy.get('#Kids').should('be.visible')
    cy.get('#Kids ul li a').should('contain.text','Dress', 'Top & Shirts')
    cy.get('#Kids ul li a').contains('Dress').click()
      cy.url().should('include', '/category_products/4')
    cy.contains('Kids - Dress Products').should('be.visible')
    cy.get('.features_items').should('contain.text', 'Sleeves Top and Short - Blue & Pink')
    cy.get('.features_items').should('contain.text', 'Sleeveless Unicorn Patch Gown - Pink')
    cy.get('.features_items').should('contain.text', 'Cotton Mull Embroidered Dress')
    cy.get('.features_items').should('contain.text', 'Long Maxi Tulle Fancy Dress Up Outfits -Pink')
    cy.get('.features_items').should('contain.text', 'Sleeveless Unicorn Print Fit & Flare Net Dress - Multi')
    cy.get('.features_items').should('contain.text', 'Blue Cotton Indie Mickey Dress')


    cy.get('.panel-title a').contains('Kids').click()
    cy.get('#Kids').should('be.visible')
    cy.get('#Kids ul li a').should('contain.text','Dress', 'Top & Shirts')
    cy.get('#Kids ul li a').contains('Tops & Shirts').click()
      cy.url().should('include', '/category_products/5')
    cy.contains('Kids - Tops & Shirts Products').should('be.visible')
    cy.get('.features_items').should('contain.text', 'Sleeves Printed Top - White')
    cy.get('.features_items').should('contain.text', 'Half Sleeves Top Schiffli Detailing - Pink')
    cy.get('.features_items').should('contain.text', 'Frozen Tops For Kids')
    cy.get('.features_items').should('contain.text', 'Full Sleeves Top Cherry - Pink')
    cy.get('.features_items').should('contain.text', 'Printed Off Shoulder Top - White')
    cy.get('.features_items').should('contain.text', 'Little Girls Mr. Panda Shirt')
    cy.get('.features_items').should('contain.text', 'Colour Blocked Shirt – Sky Blue')



  })

  it('Check Products by Brand', () => {

    cy.get('.brands_products').contains('Polo').click();  
    cy.url().should('include', '/brand_products/Polo')
    cy.contains('Brand - Polo Products').should('be.visible')

    cy.get('.brands_products').contains('H&M').click();  
    cy.url().should('include', '/brand_products/H&M')
    cy.contains('Brand - H&M Products').should('be.visible')

    cy.get('.brands_products').contains('Madame').click();  
    cy.url().should('include', '/brand_products/Madame')
    cy.contains('Brand - Madame Products').should('be.visible')

    cy.get('.brands_products').contains('Mast & Harbour').click();  
    cy.url().should('include', '/brand_products/Mast%20&%20Harbour')
    cy.contains('Brand - Mast & Harbour Products').should('be.visible')

    cy.get('.brands_products').contains('Babyhug').click();  
    cy.url().should('include', '/brand_products/Babyhug')
    cy.contains('Brand - Babyhug Products').should('be.visible')

    cy.get('.brands_products').contains('Allen Solly Junior').click();  
    cy.url().should('include', '/brand_products/Allen%20Solly%20Junior')
    cy.contains('Brand - Allen Solly Junior Products').should('be.visible')

    cy.get('.brands_products').contains('Kookie Kids').click();  
    cy.url().should('include', '/brand_products/Kookie%20Kids')
    cy.contains('Brand - Kookie Kids Products').should('be.visible')

    cy.get('.brands_products').contains('Biba').click();  
    cy.url().should('include', '/brand_products/Biba')
    cy.contains('Brand - Biba Products').should('be.visible')

  })



      })

  

