/* using Joi for validations of input in login/register form: */
import Joi from 'joi';

/* define validations for email, username: */
const email = Joi.string().email().required();
const firstName = Joi.string();
const lastName = Joi.string();

// const username = Joi.string().alphanum().min(3).max(30).required();
const message = 'must be between 6-16 characters, ' +
  'have at least one capital letter, ' +
  'one lowercase letter, one digit, ' +
  'and one special character';
const password = Joi.string()
  .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  .options({
    language: {
      string: {
        regex: {
          base: message
        }
      }
    }
});

/*
we use our email and password to create and export 
two Joi objects. We will be using these to validate a user’s input.
*/
export const signUp = Joi.object().keys({
  email,
  password
});
export const signIn = Joi.object().keys({
  email,
  password
});

/* old version:
export const signUp = Joi.object().keys({
    email,
    username,
    password
  });
  export const signIn = Joi.object().keys({
    email,
    password
  });
  */