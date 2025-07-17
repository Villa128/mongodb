const express = require("express");
//const multer  = require("multer");
const http = require("http");
const fs = require("fs");

const MongoClient = require("mongodb").MongoClient
const url = "mongodb://127.0.0.1:27017/";
// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient(url);


http.createServer(async (request, response) => {
     
    if (request.url === "/user") {
        
       let body = "";   // буфер для получаемых данных
        // получаем данные из запроса в буфер
       for await (const chunk of request) 
       {
       body += chunk;
       }
       // для параметра name
       let userName = "";
       // для параметра age
       let userAge = 0;
       let userM = "";
       let userAd = "";
       // разбиваем запрос на параметры по символу &
       const params = body.split("&");
       // проходим по всем параметрам и определяем их значения
       for(param of params){
           // разбиваем каждый параметр на имя и значение
           const [paramName, paramValue] = param.split("=");
           if(paramName === "taskname") taskName = paramValue;
           if(paramName === "expire") taskExpire = paramValue;
           if(paramName === "taskdesc") taskDesc = paramValue;
           if(paramName === "tasktags") taskTags = paramValue;
           if(paramName === "prioryty") taskPr = paramValue;
       }

       Task = {taskName, taskExpire, taskDesc, taskTags, taskPr};

       response.end(`Task name: ${taskName}  Expire: ${taskExpire} Description: ${taskDesc} Tag: ${taskTags} Prior.: ${taskPr} `);
       
   }
   else{
       fs.readFile("index.html", (_, data) => response.write(data));
   }

   run().catch(console.error);

}).listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));

async function run() {
    try {
        // Подключаемся к серверу
        await mongoClient.connect();
        // обращаемся к базе данных admin
        const db = mongoClient.db("new");
        const collection = db.collection("tasks");
        //const Task1 = Task;
        const result = await collection.insertOne(Task);
        console.log(result);
        console.log(Task);
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
