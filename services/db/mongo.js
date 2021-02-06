const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const config = require('../config/db.config');

const mongoConfig = config.mongo.config;

const url = `mongodb://${mongoConfig.host + ':' + mongoConfig.port}`;
const dbName = mongoConfig.dbName;

function createDocument(documentName) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, client) {
      if (err === null) {
        const db = client.db(dbName);
        db.createCollection(documentName).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        }).finally(() => {
          client.close()
        })
      } else {
        console.log(JSON.stringify(err))
      }
    });

  });
}

function getAllDocument() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, client) {
      if (err === null) {
        const db = client.db(dbName);
        db.listCollections().toArray().then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        }).finally(() => {
          client.close()
        })
      } else {
        console.log(JSON.stringify(err))
      }
    });

  });
}
// 增
function insert(documentName, data) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, client) {
      if (err === null) {
        const db = client.db(dbName);
        db.collection(documentName).insertOne(data).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        }).finally(() => {
          client.close()
        })
      } else {
        console.log(JSON.stringify(err))
      }
    });

  });
}

// 查
function find(documentName, data) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, client) {
      if (err === null) {
        const db = client.db(dbName);
        let ops = JSON.stringify(data) === "{}" ? {} : (data._id ? {
          ...data,
          _id: ObjectId(data._id)
        } : data);
        db.collection(documentName).find(ops).toArray().then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        }).finally(() => {
          client.close()
        })
      } else {
        console.log(JSON.stringify(err))
      }
    });

  });
}
// 改
function update(documentName, oldData, newData) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, client) {
      if (err === null) {
        const db = client.db(dbName);
        db.collection(documentName).updateOne(oldData, {
          $set: {
            ...newData
          }
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        }).finally(() => {
          client.close()
        })
      } else {
        console.log(JSON.stringify(err))
      }
    });

  });
}


// deleteOne
function deleteOne(documentName, data) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, client) {
      if (err === null) {
        const db = client.db(dbName);
        if (!data._id) {
          reject(new Error('no _id'))
        }
        db.collection(documentName).deleteOne({
          ...data,
          _id: ObjectId(data._id)
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        }).finally(() => {
          client.close()
        })
      } else {
        console.log(JSON.stringify(err))
      }
    });

  });
}
// 分页查询

function findSkip(documentName, data, page = 0, size = 20) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, client) {
      if (err === null) {
        const db = client.db(dbName);
        let ops = JSON.stringify(data) === "{}" ? {} : data;
        db.collection(documentName).find(ops).skip(page * size).limit(parseInt(size)).toArray().then(res => {
          db.collection(documentName).find({}).toArray().then(len => {
            resolve({ data: res, total: len.length });
          }).catch(err => {
            reject(err);
          })
        }).catch(err => {
          reject(err);
        }).finally(() => {
          client.close()
        })
      } else {
        console.log(JSON.stringify(err))
      }
    });

  });
}

module.exports = {
  createDocument,
  getAllDocument,
  insert,
  find,
  update,
  deleteOne,
  findSkip
}

/***
 * ```
 *  let allDocument = await mongon.getAllDocument();
 *  let insertResult = await mongon.insert('test', { a: 1, b: 2 });
 *  let findResult = await mongon.find('test', { _id: "5fe9ac8ab906e943097a3389" });
 *  let updateFindResult = await mongon.update('test', findResult[0], { a: 1, b: 2, c: 3 });
 *  let allData = await mongon.find('test', {});
 *  let delResult = await mongon.deleteOne("test",{ _id: "5fea8e5925a1136c1c3ad442", })
 * ```
 */