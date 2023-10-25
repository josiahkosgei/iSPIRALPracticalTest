# iSPIRAL Practical Test

The Project root directory contains Backend and FrontEnd directories

## Environment Requirements

* .NET 7 SDK
* MS SQL Server v15
* Angular CLI v16.2.7
* Node v18.18.2

## iSPIRAL Practical Test Api

Working Directory is
```Backend/iSPIRALPracticalTest.API```

```Backend/iSPIRALPracticalTest.Data``` Is the data layer for this project and it contains DBContext and Repository definitions

### Follow the steps to setup the project

* Open `appsettings.Development.json` in the `iSPIRALPracticalTest.Api` directory and replace `{ServerName}` in the connection string with your ms sql server name. Check sample below

```json
    "ApiConnectionString": "Server={ServerName};Database=practicalteststore;Integrated Security=true;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=true;Connection Timeout=30;"


```

* Create sql database called ```practicalteststore```
* Build and Run the API Service

## iSPIRAL Practical Test App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.7.

Working Directory
```cd FrontEnd/iSPIRALPracticalTest.App```

* Run `npm install` to install the dependancies

### Development server

* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Running unit tests

* Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

* Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
