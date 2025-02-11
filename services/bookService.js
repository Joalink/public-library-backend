require("dotenv").config();
const {
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");
const dynamoDB = require("@config/aws");

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;
//
async function getAllBooks() {
  const result = await dynamoDB.send(
    new ScanCommand({ TableName: TABLE_NAME })
  );
  return result.Items || [];
}

//
async function getBookById(id) {
  const result = await dynamoDB.send(new GetCommand({ TableName: TABLE_NAME, Key: { id: Number(id) } }));
  return result.Item || null;
}

//
async function createBook(book) {
  await dynamoDB.send(new PutCommand({ TableName: TABLE_NAME, Item: book }));
  return book;
}

async function updateBook(id, data) {
  await dynamoDB.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id: Number(id) },
      UpdateExpression: "set #title = :title, #isbn = :isbn, #st = :status",
      ExpressionAttributeNames: {
        "#title": "title",
        "#isbn": "isbn",
        "#st": "status",
      },
      ExpressionAttributeValues: {
        ":title": data.title,
        ":isbn": data.isbn,
        ":status": data.status,
      },
    })
  );
  return { id, ...data };
}

module.exports = { getAllBooks, getBookById, createBook, updateBook };
