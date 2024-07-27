const e = require('cors');
const { docClient } = require('../db/dbConnection');
const { v4: uuidv4 } = require("uuid");

const tableName = 'User';

const User = {
    create: async (user) => {
        const userId = uuidv4();
        const params = {
            TableName: tableName,
            Item: {
                userId: userId,
                name: user.name,
                email: user.email,
                password: user.password
            }
        };
        return new Promise((resolve, reject) => {
            docClient.put(params, (err) => {
                if (err) {
                    return reject(err);
                }
                // Retrieve the newly created item
                const getParams = {
                    TableName: tableName,
                    Key: { userId }
                };

                docClient.get(getParams, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(data.Item);
                });
            });
        });
    },

    findOne: async (userId) => {
        const params = {
            TableName: tableName,
            Key: { userId }
        };
        const data = await docClient.get(params).promise();
        return data.Item;
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

        return new Promise((resolve, reject) => {
            docClient.update(params, (err) => {
                if (err) {
                    return reject(err);
                }
                console.log("Success: Item updated");

                // Retrieve the updated item
                const getParams = {
                    TableName: tableName,
                    Key: { userId }
                };

                docClient.get(getParams, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(data.Item);
                });
            });
        });
    },
    
    delete: async (userId) => {
        const params = {
            TableName: tableName,
            Key: { userId }
        };
        const data = await docClient.delete(params).promise();
        return data;
    }
};

const newUser = User.update('294dab12-dcc6-4f64-839f-92115836ae05', { name: 'wat wayne', email: 'wat@rmail.com' });
newUser.then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});
module.exports = User;
