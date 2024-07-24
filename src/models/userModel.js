const { dynamoDB, docClient, checkConnection } = require('../db/dbConnection');
const { v4: uuidv4 } = require("uuid");

const tableName = 'User';

// const params = {
//   TableName: "User",
//   Item: {
//     userId: { S: uuidv4() },
//     email: { S: "example@email.com" },
//     name: { S: "name" },
//     password: { S: "password" },
//   },
// };

// Call DynamoDB to add the item to the table
// dynamoDB.putItem(params, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data);
//   }
// });

var params = {
  TableName: "User",
  Item: {
    userId: uuidv4(),
    email: "example@email.com",
    name: "name",
    password: "password",
  },
};

// docClient.put(params, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data);
//   }
// });

const User = {
    create: async (user) => {
        const params = {
            TableName: tableName,
            Item: {
                userId: uuidv4(),
                name: user.name,
                email: user.email,
                password: user.password
            }
        };
        return docClient.put(params).promise();
    },
    findOne: async (userId) => {
        const params = {
            TableName: tableName,
            Key: { userId }
        };
        return docClient.get(params).promise();
    },
    update: async (userId, updates) => {
        const params = {
            TableName: tableName,
            Key: { userId },
            UpdateExpression: 'set #name = :name, #email = :email',
            ExpressionAttributeNames: {
                '#name': 'name',
                '#email': 'email'
            },
            ExpressionAttributeValues: {
                ':name': updates.name,
                ':email': updates.email
            },
            ReturnValues: 'UPDATED_NEW'
        };
        return docClient.update(params).promise();
    },
    delete: async (userId) => {
        const params = {
            TableName: tableName,
            Key: { userId }
        };
        return docClient.delete(params).promise();
    }
};

User.create({
    name: 'John Doe',
    email: 'john@email.com',
    password: 'password'
}).then(() => {
    console.log('User created');
});

module.exports = User;
