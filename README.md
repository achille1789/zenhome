# ZenHome
Smart home automation app.

This repository contains the frontend and backend services for the ZenHome app, along with the pipeline configuration for CI/CD and the AWS CloudFormation template.<br>
The backend is built with Python, while the frontend uses HTML, CSS, and TypeScript.


## Useful Python Commands to work with the backend code

### Installing Requirements

To install the requirements, run the following command:

```bash
pip install -r requirements-dev.txt
```
This will install all requirements for the app and for testing. If you just want to install the app requirements, substitute `requirements-dev.txt` with `requirements.txt`.

### Running the App

Run the backend.backend.__init__.py file to start the app.

### Interacting with the API

fastAPI automatically builds interactive OpenAPI documentation. To access it, [click here](http://localhost:8000/docs).

### Running Tests

#### Unit Tests

To run unit tests, run the following command:

```bash     
coverage run -m pytest
```

To see the coverage report, run the following command:

```bash
coverage report -m
```

### Behave Tests
*NOTE: This is a work in progress. Behave tests are not fully implemented. Server needs restarting between runs as no set up/tear down of the DB is implemented*

First, start the app.

Then either run the feature file directly, or right-click on the behave folder and click run.

## Useful NPM Commands to work with the frontend code

### Installing Dependencies

To install the dependencies, run the following command:

```bash
npm install
```
This will install all the packages need to compile and test the TypeScript code.

To run the unit tests and see the coverage report, run the following command:

```bash
npm run test:frontend
```