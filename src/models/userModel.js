const { dynamoDB, docClient, checkConnection } = require('../db/dbConnection');
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
        const data = await docClient.update(params).promise();
        return data.Attributes;
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

const newUser = User.create({
    name: 'John Doe',
    email: 'john@email.com',
    password: 'password'
}).then((user) => {
    console.log('User created:', user);
}).catch((err) => {
    console.error('Error creating user:', err);
});

module.exports = User;
