<!--- STARTEXCLUDE --->
# Netflix Clone using Astra DB and GraphQL
*10 minutes, Beginner, [Start Building](https://github.com/DataStax-Examples/astra-netflix#quick-start), [View Demo](https://sag-astra-netflix.netlify.app)*

Let's code a Netflix Clone with GraphQL Pagination! 
<!--- ENDEXCLUDE --->

![image](https://raw.githubusercontent.com/DataStax-Examples/astra-netflix/master/hero.png)

## Quick Start
<!--- STARTEXCLUDE --->
* [Signup for DataStax Astra](https://dtsx.io/3sYwYUL), or login to your already existing account. 
* [Create an Astra DB Database](https://github.com/DataStax-Examples/sample-app-template/blob/master/GETTING_STARTED.md#create-an-astra-db) if you don't already have one.
<!--- ENDEXCLUDE --->
* [Create an Astra DB Keyspace](https://github.com/DataStax-Examples/sample-app-template/blob/master/GETTING_STARTED.md#create-an-astra-db-keyspace) called `sag_netflix` in your database.
* [Generate an Application Token](https://github.com/DataStax-Examples/sample-app-template/blob/master/GETTING_STARTED.md#create-an-application-token) with the role of `Database Administrator` for the Organization that your Astra DB is in.
* Click the 'Open in Gitpod' link: [![Open in IDE](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/DataStax-Examples/astra-netflix)
* Once the app is finished launching in the Gitpod IDE, copy the `env.example` file to a file named `.env` and fill the required values in from your Application Token and [Astra DB connection settings](https://github.com/DataStax-Examples/sample-app-template/blob/master/GETTING_STARTED.md#get-your-astra-db-connection-settings).
* Start the example by running `npm run dev` in the Gitpod console.

## Objectives
* Build a Netflix clone using GraphQL
  
## How this works
Opening and running the app will populate the database you specify in your `.env` file with the required data, allowing you to explore the astra-netflix app. You can view a demo of the running app [here](https://sag-astra-netflix.netlify.app).

Follow along with Ania's [walkthrough video](https://www.youtube.com/watch?v=g8COh40v2jU). 

Additionally, there is a workshop repository for this sample app [located here](https://github.com/datastaxdevs/appdev-week3-graphql).
