# City Suggestions

REST API endpoint that provides auto-complete suggestions for large cities

## Description

- The endpoint is exposed at `/suggestions`
- The partial (or complete) search term is passed as a query string parameter `q`
- The caller's location can optionally be supplied via query string parameters `latitude` and `longitude`
- The endpoint returns a JSON response with an array of scored suggested matches

Request example

```
/suggestions?q=san&latitude=44.9477&longitude=-93.104
```

Response example

```
{
  "suggestions": [
    {
      "name": "San Antonio",
      "latitude": "29.4722",
      "longitude": "-98.5247",
      "score": 1,
      "distance": 1689610.518055552
    },
    {
      "name": "San Diego",
      "latitude": "32.8312",
      "longitude": "-117.1226",
      "score": 1,
      "distance": 2430352.201463017
    },
    {
      "name": "San Jose",
      "latitude": "37.3018",
      "longitude": "-121.8485",
      "score": 1,
      "distance": 2533140.952935412
    }
  ]
}

```

## Technology stack

- NodeJS
- Typescript
- Jest
- Supertest
- Fuzzy search
- Haversine formula

## Architecture

Express application. Exposed REST endpoint. Cities suggestion based on Fuzzy search algorithm and Haversine formula to calculate distance to city.

### Folder structure

```
root
├── __tests__ (unit and integration tests)
├── .env (configuration: port and data sorce url)
├── index.ts (express app start point)
└── src
    ├── city (suggestion logic)
    ├── utils (usefull code to reuse)
    ├── app.ts (main express app)
    └── routes.ts (api routes)
```

## Prerequisites

Install (node)[https://nodejs.org/en], (npm)[https://www.npmjs.com]. You should be able to run the following commands.

```bash
node --version
npm --version
```

## Installation

Run the following commands before proceeding to the sections below.

### Setup backend

```bash
cd city-suggestions
npm install
npm run start
```

## Tests

In order to manually run tests, follow the instructions below.

### Unit and Integration

```bash
cd city-suggestions
npm run test
```
