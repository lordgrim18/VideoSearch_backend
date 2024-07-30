# Auth setup for the Video Subtitle Processing and Search Application

This project is the auth setup for the Video Subtitle Processing and Search Application. The project is built using Express.js and DynamoDB. The project is to be used in conjunction with the [Video Subtitle Processing and Search Application](https://github.com/lordgrim18/VideoSearch). The project is a REST API that provides endpoints for user registration, login, and logout. The project also provides endpoints for user profile management. 

This separation of concerns allows the Video Subtitle Processing and Search Application to focus on the core functionality of processing video subtitles and searching for videos based on the subtitles. This is important because the core of the Video Subtitle Processing and Search Application is to be made into a crome extension that can be used by anyone to search for videos based on the subtitles. 

The auth setup is set as a microservice that will be used for the website.