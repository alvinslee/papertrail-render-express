require('dotenv').config()
const faker = require('faker')
const { createClient } = require('redis')
const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
})

client.on('error', err => console.log('Redis Client Error', err));
client.connect()

const HASH_NAME = 'ip_addresses'

const getAll = async () => {
  const result = await client.hGetAll(HASH_NAME)
  return result
}

const insert = async () => {
  await client.HSET(HASH_NAME, faker.datatype.uuid(), faker.internet.ip())
}

const deleteRecords = async (count = 1) => {
  const keys = await client.hKeys(HASH_NAME)
  for (let i = 0; i < count && i < keys.length; i++) {
    await client.hDel(HASH_NAME, keys[i])
  }
}

const getCount = async () => {
  const result = await client.hKeys(HASH_NAME)
  return result.length
}

module.exports = {
  getAll,
  insert,
  deleteRecords,
  getCount
}
