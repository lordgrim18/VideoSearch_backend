const { dynamoDB } = require('./dbConnection');

const deleteTables = () => {
    const paramsUser = {
        TableName: 'User'
    };

    const paramsVideo = {
        TableName: 'Video'
    };

    const paramsSubtitle = {
        TableName: 'Subtitle'
    };

    dynamoDB.deleteTable(paramsUser, (err, data) => {
        if (err) {
            console.error("Error deleting User table:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted User table:", JSON.stringify(data, null, 2));
        }
    });

    dynamoDB.deleteTable(paramsVideo, (err, data) => {
        if (err) {
            console.error("Error deleting Video table:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted Video table:", JSON.stringify(data, null, 2));
        }
    });

    dynamoDB.deleteTable(paramsSubtitle, (err, data) => {
        if (err) {
            console.error("Error deleting Subtitle table:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted Subtitle table:", JSON.stringify(data, null, 2));
        }
    });
}

deleteTables();