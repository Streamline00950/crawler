# Crawler with functionality to export results into txt file

## Installation

We use `node` version `16.17.0`

```
nvm install 16.17.0
```

```
nvm use 16.17.0
```

In order to set up the project, you will need to run

```
npm install
```

Do not forget to run tests to check if everything works fine

```
npm run test
```

## How to use
```
import { fileWriter } from './src'

await fileWriter.writeToFile(url, filepath)

```

#### .writeToFile() method
| Property | Description                                  |
| -------- | -------------------------------------------- |
| url      | valid url that we are going to crawl         |
| filepath | path with filename, place where we write txt |

### Docker
Optionally you can use attached dockerfile in order to run tests

Build image using docker cli
```
docker build -t crawler ./
```