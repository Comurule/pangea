# Pangea Pubsub API
This API allows you to subscribe to topics and publish

## Table of Contents
1. <a href="#application-features">Application Features</a>
2. <a href="#how-to-use">How To Use</a>
3. <a href="#author">Author</a>
4. <a href="#license">License</a>

## Tech Stack Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Typscript](https://www.typescriptlang.org/)


## Application Features

*  Subscribe to a topic by providing the topic and your URL
*  Publish to all subcribers in a topic by providing the topic and the message data


## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/julietezekwe/pangea.git

# Go into the repository
$ cd pangea

# Install dependencies
$ npm install or yarn install

# Create .env file for environmental variables in your root directory like the sample.env file and provide the keys


# Run the app
$ npm start or yarn start
```

## API endpoints
```
POST Request -> localhost:9000/v1/subscribe/userUpdate
body:
  url: http://myurl.com


response:
{
    "success": true,
    "message": "Successfully subscribes to topic",
    "data": {
        "topic": "user",
        "url": "http://myurl.com"
    }
}

POST Request -> localhost:9000/v1/publish/userUpdate
body:
  message: {
      "user": {
          "name": "juliet",
          "age": 25
      },
      "status": "active
  }

response:
{
    "success": true,
    "message": "Successfully publishes to bar subscribers",
    "topic": "userUpdate",
    "data": {
      "user": {
          "name": "juliet",
          "age": 25
      },
      "status": "active
  }
}

```
## Recommended improvements
* More input valdation and Error handling
* API unit and integration testing
* More type interfaces and type guards
## Author

Chidimma Juliet Ezekwe

## License

MIT

---
