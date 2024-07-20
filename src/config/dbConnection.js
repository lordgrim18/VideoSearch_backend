var AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const dotenv = require('dotenv').config();

const dynamoDBConfig = {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_DDB_ENDPOINT
};

const dynamoDB = new AWS.DynamoDB(dynamoDBConfig);
const docClient = new AWS.DynamoDB.DocumentClient(dynamoDBConfig);

module.exports = { dynamoDB, docClient };