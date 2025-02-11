require("dotenv").config();
const {
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");
const dyanamoDB = require("@config/aws");

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;
//
async function getAllBooks() {
  const result = await dyanamoDB.send(
    new ScanCommand({ TableName: TABLE_NAME })
  );
  return result.Items || [];
}

//
async function getBookById(id) {
  const result = await dyanamoDB.send(
    new GetCommand({ TableName: TABLE_NAME, Key: { id } })
  );
  return result.Item || null;
}

//
async function createBook(book) {
  await dyanamoDB.send(new PutCommand({ TableName: TABLE_NAME, Item: book }));
  return book;
}

async function updateBook(id, data) {
  await dynamoDB.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: "set title = :title, isbn = :isbn, status = :status",
      ExpressionAttributeValues: {
        ":title": book.title,
        ":isbn": book.isbn,
        ":status": book.status,
      },
    })
  );
  return { id, ...data };
}

module.exports = { getAllBooks, getBookById, createBook, updateBook };
