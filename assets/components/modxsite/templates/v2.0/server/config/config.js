export const db = {
  client: 'mysql',
  connection: {
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE,
    prefix 		: process.env.MYSQL_TABLE_PREFIX,
  }
}

export const site_url = process.env.SITE_URL;

export default {
	db,
}