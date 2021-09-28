const fetch = require("node-fetch");

exports.handler = async function (event) {
  const body = JSON.parse(event.body);
  const genre = body.genre;
  const pageState = body.pageState;
  const url = `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com/api/graphql/${process.env.ASTRA_DB_KEYSPACE}`;
  const query = `
  query {
    sag_movies_by_genre (
      value: { genre: ${JSON.stringify(genre)}},
      orderBy: [year_DESC],
      options: { pageSize: 6, pageState: ${JSON.stringify(pageState)} }
    ) {
      values {
        year,
        title,
        duration,
        synopsis,
        thumbnail
      }
      pageState
    }
  }
  `;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-cassandra-token": process.env.ASTRA_DB_APPLICATION_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  try {
    const responseBody = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
