var AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const dotenv = require('dotenv').config();

const dynamoDBConfig = {
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_DDB_URL,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const dynamoDB = new AWS.DynamoDB(dynamoDBConfig);
const docClient = new AWS.DynamoDB.DocumentClient(dynamoDBConfig);

const checkConnection = async () => {
    try {
        const tables = await dynamoDB.listTables().promise();
        console.log('Tables:', tables.TableNames);
        console.log('DynamoDB connection established successfully');
    } catch (error) {
        console.error('Error connecting to DynamoDB:', error.message);
        process.exit(1);
    }
};

module.exports = { dynamoDB, docClient, checkConnection };