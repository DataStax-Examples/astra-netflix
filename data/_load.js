require("dotenv").config();
const fetch = require("node-fetch");
const { loadFilesSync } = require("@graphql-tools/load-files");

// don't continue without env settings
if (!process.env.ASTRA_DB_APPLICATION_TOKEN) {
  console.error(
    `A .env file with your ASTRA_DB_APPLICATION_TOKEN is required.`
  );
  process.exit(1);
}

const existsQuery = `
query getAllGenres {
  sag_reference_list (
    value: { label: "genre"},
    options: { limit: 20 }
  ) {
    values {
      value
    }
  }
}
`;

const schemaEndpoint = `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com/api/graphql-schema`;
const keyspaceEndpoint = `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com/api/graphql/${process.env.ASTRA_DB_KEYSPACE}`;

const schemaFiles = loadFilesSync(__dirname + "/tables/**.gql");
const datasetFiles = loadFilesSync(__dirname + "/datasets/**.gql");

const sendGql = async (files, endpoint) => {
  try {
    for (let i = 0, ilen = files.length; i < ilen; i++) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-cassandra-token": process.env.ASTRA_DB_APPLICATION_TOKEN,
        },
        body: JSON.stringify({ query: files[i] }),
      });
      const responseJson = await response.json();
      console.log(responseJson);
    }
  } catch (e) {
    console.error(e);
  }
};

(async () => {
  try {
    const response = await fetch(keyspaceEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-cassandra-token": process.env.ASTRA_DB_APPLICATION_TOKEN,
      },
      body: JSON.stringify({ query: existsQuery }),
    });
    const responseJson = await response.json();
    if (responseJson.data.sag_reference_list.values.length) {
      console.log("Data already loaded");
      process.exit();
    }
  } catch (e) {
    console.error(e);
  }
  console.log("Loading Schema...");
  await sendGql(schemaFiles, schemaEndpoint);
  console.log("\nLoading Data...");
  await sendGql(datasetFiles, keyspaceEndpoint);
})();
