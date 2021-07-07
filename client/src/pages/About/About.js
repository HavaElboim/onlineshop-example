import React from "react";

const About = () => {
  return (
    <div>
      <h2>About</h2>
      <div>
        Welcome to the new online shop. Choose your products category to
        display.

        This is a test project displaying the use of react with express and mongoDB to create an online shop.
        The site is hosted on Heroku, with the repository lying on Github.

        Login uses react-redux technology, with bcrypt to hash passwords.
        The project is still work-in-progress - the next stages of development are:
        <ul>
          <li>to add the use of jwt to acquire a token from the server on login, and to serve subsequent requests to the server using authentication with the token.
</li>
<li>to offer to store a user's shipping address for future purchases</li>
<li>to store past purchases for review by the user</li>
<li>set up of end-of-sale date and further development of sale options</li>
        </ul>
         
        The site may be accessed by non-logged-in users to display products and order from the shop.
        Users may register to the site with email and password, in which case the password is stored as a hash, and they are automatically allocated the role of "customer".
        The server on start up automatically checks for the existence of an Admin user and a Test Admin user; if either is missing, it is automatically created in the database.
        The email and password of the Admin user, together with access password to the database, is stored in a .env file, which is not uploaded to the github repository.

        The site uses a Router to navigate between pages; Admin and Test Admin users are automatically directed to pages relevant to admin users.

        The site displays email and password of the Test Admin users, to allow visitors to see the Admin version of the site in action, with the exception that the Test Admin user is not able to delete or change vital information from the database, not to add new products (for obvious reasons).

    

      </div>

    </div>
  );
};

export default About;
