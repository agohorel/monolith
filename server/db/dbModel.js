const db = require("./connections.js");

function find(table) {
  return db(table);
}

function findBy(table, filter) {
  return db(table)
    .where(filter)
    .first();
}

async function insert(table, data, returnFields) {
  const [id] = await db(table)
    .returning(returnFields)
    .insert(data);

  return await findBy(table, { id });
}

function remove(table, filter) {
  return db(table)
    .where(filter)
    .delete();
}

function closeConnection() {
  return db.destroy();
}

module.exports = { find, findBy, insert, remove, closeConnection };
