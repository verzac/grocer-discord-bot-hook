[![Build Status](https://travis-ci.org/verzac/news-neutrality-scraper.svg?branch=master)](https://travis-ci.org/verzac/news-neutrality-scraper)

```
NOTE: Keep in mind that this project is a work in progress. Things may change drastically as the project stabilises.
```

# Nodescrape (unofficial name)

Aggregates the sentiment analysis score of news articles from various news sources and exposes these scores in an API.

# How to run

## Prerequisites

- Python (pip)
  - AWS CLI and AWS SAM CLI.
- Node 10+ (npm)
- Docker

```
# Installing AWS SAM CLI and AWS CLI
pip install awscli aws-sam-cli

# Running a local version of DynamoDB (which is the main datastore of this service)
docker run -p 8000:8000 -d amazon/dynamodb-local

# Dependency install
npm install

# Copy .env.sample to .env
cp .env.sample .env
```

### Configuration

The `.env` file contains all you need to configure this application, so feel free to edit that. Locally, the app loads the `.env` file from the root project directory, but not when doing a single build (as is the case in `./.ci/deploy.sh`).

Probably the most important thing that you can edit is where the app can access your local DynamoDB instance:

```
...
NODESCRAPE_LOCAL_ENDPOINT=http://192.168.99.100:8000  # or http://localhost:8000 if you're lucky enough to have a UNIX-based machine
...
```

## Running the application

```
npm start
```

# Available APIs

`GET /news-scores` - returns a list of news sources along with their average sentiment score.

`GET /calculate` - (this should be a PUT, but made it a GET for easy debugging for now) triggers the news sentiment calculation and stores the result in DynamoDB, which is exposed through `GET /news-scores` .

# Deploying the application

See [https://github.com/verzac/news-neutrality-scraper/blob/master/.travis.yml](.travis.yml). All commits to master are pushed to production immediately by Travis CI. Please make sure you've linted/tested/built the project before deploying.

# Contributing

Contributions are currently locked for now while I get the project up and running. However, feel free to shoot me a message or open an issue should you want to contribute! Feedbacks are always appreciated :)
