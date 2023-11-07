## Coding Challenge

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 18.13.0

# Getting started

- Clone the repository

```
git clone  git@github.com:ataponp/BlockheadTest.git blockhead-test
```

- Install dependencies

```
cd blockhead-test
npm install
```

- run the project in development mode

```
npm run dev
```

- Build and run the project

```
npm run build
npm start
```

Navigate to `http://localhost:3000`

## Testing

The tests are written in Jest

### Running tests using NPM Scripts

```
npm run test
```

Test files are created under test folder.

### Note

This project use Next.js for run both server and client.

#### Frontend

This frontend represent UI to edit Original and Production data, and view Actual data from Backend API.

#### Backend

This backend use rest api for apply production rule with original data and return actual data.

#### My Opinion

I din't use database for this project but in real world it should store Orginal and Production rule in database.  
This project still can improve performance and refactor code.  
In fronend can do client validation input and add feature for add and remove data.  
In backend can do store data in database, add user authentication for use this app.

#### Time using

- Core process logic and refactor code 1 round ==> 3 hours
- Test script ==> 2 hours
- UI ==> 4 hours
