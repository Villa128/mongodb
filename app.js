const express = require("express");
//const multer  = require("multer");
const http = require("http");
const fs = require("fs");
const EventEmitter = require("events");
const emit = new EventEmitter()
const writeableStream = fs.createWriteStream("result.html");


const MongoClient = require("mongodb").MongoClient
const url = "mongodb://127.0.0.1:27017/";
// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient(url);


async function run() {
    try {
        // Подключаемся к серверу
        await mongoClient.connect();
        // обращаемся к базе данных admin
        const db = mongoClient.db("new");
        const collection = db.collection("users");
        const user = {name: "Tom", age: 28};
        //const result = await collection.insertOne(user);
        console.log(result);
        console.log(user);
        // выполняем пинг для проверки подключения
        //const result = await db.command({ ping: 1 });
        //console.log("Подключение с сервером успешно установлено");
        //console.log(result);
    }catch(err) {
        console.log("Возникла ошибка");
        console.log(err);
    } finally {
        // Закрываем подключение при завершении работы или при ошибке
        await mongoClient.close();
        console.log("Подключение закрыто");
    }
}

async function printData() {
    try {
        await mongoClient.connect();
        const database = mongoClient.db("new"); // Replace with your database name
        const collection = database.collection("tasks"); // Replace with your collection name

        // Find all documents in the collection
        const cursor = collection.find({}); //  `{}` matches all documents

        // Iterate over the cursor and print each document
        await cursor.forEach(doc => {
            //console.log(doc); // Print the entire document
            // Alternatively, print specific fields:
            
            writeableStream.write(`<br>name: ${doc.taskName}, expire: ${doc.taskExpire},</br> `);
            console.log(`name: ${doc.taskName}, expire: ${doc.taskExpire}`);
            
            
            
            

        });

        console.log("Finished printing data.");

    } catch (err) {
        console.error("Error:", err);
    } finally {
        // Ensures that the client will close when you finish/error
        await mongoClient.close();
    }
}

printData().catch(console.dir);

http.createServer(async (request, response) => {

    



    if (request.url === "/user") {}   // буфер для получаемых данных
        
         


run().catch(console.error);
}).listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));
