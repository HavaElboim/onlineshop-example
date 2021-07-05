  /* When you have 'type: module' in the package.json file, your source code should use import syntax. When you do not have, you should use require syntax. */
// import userRoutes from './user';
const userRoutes = require('./user');


// syntactic sugar for { userRoutes: userRoutes }
/* for use of import and export syntax in backend, see:
https://stackoverflow.com/questions/38296667/getting-unexpected-token-export
& also:
https://stackoverflow.com/questions/31354559/using-node-js-require-vs-es6-import-export
*/

// export { userRoutes };
module.exports = userRoutes;