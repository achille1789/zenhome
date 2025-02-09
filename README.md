# ZenHome
Smart home automation app

## Useful Python Commands

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

To See the coverage report, run the following command:

```bash
coverage report -m
```

### Behave Tests
*NOTE: This is a work in progress. Behave tests are not fully implemented. Server needs restarting between runs as no set up/tear down of the DB is implemented*

First, start the app.

Then either run the feature file directly, or right-click on the behave folder and click run.
