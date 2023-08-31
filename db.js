require('dotenv').config()
const faker = require('faker')

const { Client } = require('pg')

const getAll = async () => {
  const client = new Client()
  client.connect()
  const result = await client.query('select name, email from users')
  client.end()
  return result.rows
}

const insert = async () => {
  const client = new Client()
  client.connect()
  const result = await client.query('insert into users(name, email) values($1, $2)', 
                                    [`${faker.name.firstName()} ${faker.name.lastName()}`, faker.internet.email()])
  client.end()
  return result.rows
}

const deleteRecords = async (count = 1) => {
  const client = new Client()
  client.connect()
  await client.query('delete from users where id in (select id from users limit $1)', [count])
  client.end()
}

const getCount = async () => {
  const client = new Client()
  client.connect()
  const result = await client.query('select count(*) as count from users')
  client.end()
  return result.rows[0]['count']
}

module.exports = {
  getAll,
  insert,
  deleteRecords,
  getCount
}
