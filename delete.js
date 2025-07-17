const express = require("express");
//const multer  = require("multer");
const http = require("http");
const fs = require("fs");

const MongoClient = require("mongodb").MongoClient
const url = "mongodb://127.0.0.1:27017/";
// создаем объект MongoClient и передаем ему строку подключения


async function deleteobj(objectN) 
{
    const client = new MongoClient(url);
  
    try {
      // Connect to the MongoDB server
      await client.connect();
  
      console.log("Connected successfully to server");
  
      const db = client.db("new");
      const collection = db.collection("tasks");
  
      // Delete a document that matches the provided Object ID.
      const query = { taskName:  objectN }; // Important:  Use ObjectId
      const result = await collection.deleteOne(query);
  
      console.log("Deleted " + result.deletedCount + " document(s)");
  
      if (result.deletedCount === 0) {
        console.log(`No document found with id: ${objectN}`);
      }
  
    } catch (err) {
      console.error("An error occurred:", err);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
      console.log("Connection closed");
    }
  }
  
  http.createServer(async (request, response) => {

    if (request.url === "/user") {
    let body = "";

    for await (const chunk of request) 
       {
       body += chunk;
       }


    const params = body.split("&");
       // проходим по всем параметрам и определяем их значения
       for(param of params){
           // разбиваем каждый параметр на имя и значение
           const [paramName, paramValue] = param.split("=");
           if(paramName === "taskname") taskName = paramValue;
           Task1 = taskName;
           deleteobj(Task1);
       }
    }
    else{
        fs.readFile("delete.html", (_, data) => response.write(data));
    }

  }).listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));

  
