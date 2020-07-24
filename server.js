const MongoClient = require("mongodb").MongoClient;       /* Module MongoDb */
const url = 'mongodb://localhost:27017/'                  /* Url MongoDB */
const dbName = 'Groupe_data_base'                         /* Data base name*/
let db;
let client;

async function database(){                    
    try{
        client = await MongoClient.connect(url, { useNewUrlParser: true , useUnifiedTopology: true });
        db = client.db(dbName);
        await db.createCollection("Students");
        await db.createCollection("Groups");    

    }catch(e){
        console.log(e);

    }finally{
        client.close();
    }
}

database();
