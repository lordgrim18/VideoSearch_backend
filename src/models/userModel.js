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
        return new Promise((resolve, reject) => {
            // Retrieve the item to be deleted
            const getParams = {
                TableName: tableName,
                Key: { userId }
            };

            docClient.get(getParams, (err, data) => {
                if (err) {
                    return reject(err);
                }
                if (!data.Item) {
                    return reject(new Error('User not found'));
                }

                // Store the item to return after deletion
                const deletedItem = data.Item;

                // Delete the item
                const deleteParams = {
                    TableName: tableName,
                    Key: { userId }
                };

                docClient.delete(deleteParams, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    console.log("Success: Item deleted");
                    resolve(deletedItem);
                });
            });
        });
    }
};

const newUser = User.delete('fabb2347-b6e3-4594-8bb9-a7b79a0174b4');
newUser.then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});
module.exports = User;
