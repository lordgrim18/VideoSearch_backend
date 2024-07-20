const { dynamoDB } = require('./dbConnection');

const createTables = () => {
    const paramsUser = {
        TableName: 'User',
        KeySchema: [
            { AttributeName: 'userId', KeyType: 'HASH' }  // Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: 'userId', AttributeType: 'S' }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    const paramsVideo = {
        TableName: 'Video',
        KeySchema: [
            { AttributeName: 'videoId', KeyType: 'HASH' }  // Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: 'videoId', AttributeType: 'S' }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    const paramsSubtitle = {
        TableName: 'Subtitle',
        KeySchema: [
            { AttributeName: 'videoId', KeyType: 'HASH' },  // Partition key
            { AttributeName: 'startTime', KeyType: 'RANGE'}
        ],
        AttributeDefinitions: [
            { AttributeName: 'videoId', AttributeType: 'S' },
            { AttributeName: 'startTime', AttributeType: 'N' }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    dynamoDB.createTable(paramsUser, (err, data) => {
        if (err) {
            console.error("Error creating User table:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created User table:", JSON.stringify(data, null, 2));
        }
    });

    dynamoDB.createTable(paramsVideo, (err, data) => {
        if (err) {
            console.error("Error creating Video table:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created Video table:", JSON.stringify(data, null, 2));
        }
    });

    dynamoDB.createTable(paramsSubtitle, (err, data) => {
        if (err) {
            console.error("Error creating Subtitle table:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created Subtitle table:", JSON.stringify(data, null, 2));
        }
    });
};

createTables();