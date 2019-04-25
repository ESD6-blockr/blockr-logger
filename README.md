# blockr-logger
>The general logger used within typescript projects.

|**CI**|**SonarQube**|**Version**|
|:-:|:-:|:-:|
|[![Build Status](https://jenkins.naebers.me/buildStatus/icon?job=Blockr%2Fblockr-logger%2Fmaster)](https://jenkins.naebers.me/job/Blockr/job/blockr-logger/job/master/)|[![Quality Gate Status](https://sonarqube.naebers.me/api/project_badges/measure?project=blockr-logger&metric=alert_status)](https://sonarqube.naebers.me/dashboard?id=blockr-logger)|[![npm](https://img.shields.io/npm/v/@blockr/blockr-logger.svg)](https://www.npmjs.com/package/@blockr/blockr-logger)|

The logger is capable of the following log levels:

```ts
2019-04-25 17:53:21 [info]:     info logging
2019-04-25 17:53:21 [warn]:     warn logging
2019-04-25 17:53:21 [error]:    error logging
```

All levels are formated in the same way: &emsp; `date` `time` [`level`]:  `message`

 Each message will be presented to the console and written to their respective log files. These files will always be written to a folder called `logs` located in the root of the application folder. The logger will generate two separate log files. One named `full.log` that contains all messagesfrom all levels. And one named `error.log` containing only error level messages.


 ## Importing 

 **ES6**
 ```ts
 import logger from "@blockr/blockr-logger";
 ```

 **ES5**
 ```ts
 const logger = require("@blockr/blockr-logger");
 ```
 