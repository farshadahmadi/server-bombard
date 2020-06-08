// const axios = require ("axios");
const request = require("request-promise");
const _ = require("lodash");

const url = "http://localhost:8030/api/signup";

const usersId = _.range(401, 1400);
const users = usersId.map((id) => ({
  username: `Test${id}`,
  email: `Test${id}@gmail.com`,
  password: `Test123`,
}));

// console.log(users);
// const signupReqs = users.map (user => await axios.post(url, user));
const signupReqs = users.map((user) => {
  return request({
    uri: url,
    method: "POST",
    // time: true,
    body: user,
    json: true,
  });
});

// console.log(signupReqs);

console.time("signupAll");
Promise.all(signupReqs)
  .then((res) => {
    console.timeEnd("signupAll");
  })
  .catch((err) => {
    console.log(err);
  });
