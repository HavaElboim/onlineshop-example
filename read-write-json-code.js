const fs = require("fs");

// STEP 1: Reading JSON file and arguments
//const users = require("./users");
// 1. check number of args:
console.log("args are: ", process.argv);
if (process.argv.length < 6) {
  console.log("Usage: server.js filename username age languages");
  console.log("filename: must be of type .json");
  console.log(
    "you can supply more than one language; separate languages by spaces"
  );
} else {
  // 2. correct number of args. destruct into variables:
  let [filename, username, age] = [...process.argv.slice(2)];
  let languagesArray = [...process.argv.slice(5)];
  console.log(
    `name of file to write: ${filename}, username: ${username}, age: ${age}, languages: ${languagesArray}`
  );

  //3. construct user object
  let user = {};
  user.name = username;
  user.age = age;
  user.languages = languagesArray;

  //4. look for file of name filename,
  //if it exists, take users array from it, if it doesn't exist, create empty users array.
  let users;

  try {
    const str = fs.readFileSync(filename, "utf-8");
    users = JSON.parse(str);
    console.log(`current users in file: ${users}`);
  } catch {
    users = [];
  }

  console.log(`current contents of file: ${users}`);

  //5. add new user
  users.push(user);

  //6. write out new version of file
  try {
    fs.writeFile(filename, JSON.stringify(users), (error) => {
      if (error) throw error;
      console.log(`done writing to file ${filename}`);
    });
  } catch (e) {
    console.log(`error writing to file ${filename} : ${e}`);
  }
}
