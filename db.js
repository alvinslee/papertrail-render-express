require('dotenv').config()
const faker = require('faker')

const { Client } = require('pg')
const client = new Client()
client.connect()

const getAll = async () => {
  const result = await client.query('select name, email from users')
  return result.rows
}

const insert = async () => {
  const result = await client.query('insert into users(name, email) values($1, $2)', 
                                    [`${faker.name.firstName()} ${faker.name.lastName()}`, faker.internet.email()])
  return result.rows
}

const deleteRecords = async (count = 1) => {
  await client.query('delete from users where id in (select id from users limit $1)', [count])
}

const getCount = async () => {
  const result = await client.query('select count(*) as count from users')
  return result.rows[0]['count']
}

module.exports = {
  getAll,
  insert,
  deleteRecords,
  getCount
}
