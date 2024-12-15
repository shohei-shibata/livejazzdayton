import type { Config } from '@netlify/functions';
import { schedule } from '@netlify/functions';
import fetch from 'node-fetch';

const REBUILD_URL = process.env.REBUILD_URL;
const REBUILD_URL_STAGING = process.env.REBUILD_URL_STAGING;

// To learn about scheduled functions and supported cron extensions,
// see: https://ntl.fyi/sched-func
export default async (req: Request) => {
  const { next_run } = await req.json();
  console.log('Running function: rebuild.js');
  console.log(`Next function run at ${next_run}.`);

  REBUILD_URL && await fetch(REBUILD_URL, { method: 'POST' });
  //REBUILD_URL_STAGING && await fetch(REBUILD_URL_STAGING, { method: 'POST' });
    
  return {
    statusCode: 200,
  };
};

export const config: Config = {
  schedule: '0 5 * * *'
}
