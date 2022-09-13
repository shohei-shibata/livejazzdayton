const { schedule } = require('@netlify/functions');
const fetch = require('node-fetch');

const REBUILD_URL = process.env.REBUILD_URL;

// To learn about scheduled functions and supported cron extensions,
// see: https://ntl.fyi/sched-func
module.exports.handler = schedule('0 5 * * *', async (event) => {
  const eventBody = JSON.parse(event.body);
    console.log('Running function: rebuild.js');
    console.log(`Next function run at ${eventBody.next_run}.`);

    await fetch(REBUILD_URL, { method: 'POST' });

  return {
    statusCode: 200,
  };
});
