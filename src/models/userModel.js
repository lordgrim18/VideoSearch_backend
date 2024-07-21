const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = 'User';

const User = {
    create: async (user) => {
        const params = {
            TableName: tableName,
            Item: user
        };
        return docClient.put(params).promise();
    },
    getById: async (userId) => {
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

module.exports = User;
