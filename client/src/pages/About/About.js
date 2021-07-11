import React from "react";
import "./About.css";

const About = () => {
  return (
    <div>
      <h1>About this site</h1>
      <div className="aboutDiv">
        Welcome to the react-redux online garden shop. Choose products category / price range / search keyword to display products of your choice.
	      Click on an individual product to see more details.
        </div>
        <div className="aboutDiv">

        This is a test project displaying the use of react with express and mongoDB to create an online shop.
        The site is hosted on Heroku, with the repository lying on Github.
</div>
<div className="aboutDiv">
        Login uses react-redux technology, with bcrypt to hash passwords.
        </div>
        The project is still work-in-progress - the next stages of development are:
        <ul className="noBullet">
          <li className="leafIcon">to add the use of jwt to acquire a token from the server on login, and to serve subsequent requests to the server using authentication with the token.
</li>
<li className="leafIcon">to offer to store a user's shipping address for future purchases</li>
<li className="leafIcon">to store past purchases for review by the user</li>
<li className="leafIcon">set up of end-of-sale date and further development of sale options</li>
        </ul>
         
         <div className="aboutDiv">
        The site may be accessed by non-logged-in users to display products and order from the shop.
        Users may register to the site with email and password, in which case the password is stored as a hash, and they are automatically allocated the role of "customer".
        The server on start up automatically checks for the existence of an Admin user and a Test Admin user; if either is missing, it is automatically created in the database.
        The email and password of the Admin user, together with access password to the database, is stored in a .env file, which is not uploaded to the github repository.
</div>
<div className="aboutDiv">
        The site uses a Router to navigate between pages; Admin and Test Admin users are automatically directed to pages relevant to admin users.
        </div>
<div className="aboutDiv">
        The site displays email and password of the Test Admin users, to allow visitors to see the Admin version of the site in action, with the exception that the Test Admin user is not able to delete or change vital information from the database, not to add new products (for obvious reasons).
</div>
 

    </div>
  );
};

export default About;
