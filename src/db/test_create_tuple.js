const { dynamoDB, docClient, checkConnection } = require('../db/dbConnection');

const { v4: uuidv4 } = require("uuid");

const params = {
  TableName: "User",
  Item: {
    userId: { S: uuidv4() },
    email: { S: "example@email.com" },
    name: { S: "name" },
    password: { S: "password" },
  },
};

// Call DynamoDB to add the item to the table
dynamoDB.putItem(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});