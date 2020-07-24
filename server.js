const MongoClient = require("mongodb").MongoClient;       
const express = require('express'); 
let app = express();
const url = 'mongodb://localhost:27017/';                  
const dbName = 'Groupe_data_base';                
let client;
app.use(express.urlencoded({ extended: true}));


async function database(){                    
    try{
        client = await MongoClient.connect(url, { useNewUrlParser: true , useUnifiedTopology: true });
        db = client.db(dbName);
        await db.createCollection("Students");
        await db.createCollection("Groups");
    }catch(e){
        console.log(e);
     }
    //  finally{
    //     client.close();
    // } 

}
database(); 

async function addStudent(student) {
    try { 
        await db.collection('Students').insertOne({name : student});
    }catch(e){

    }
}

async function getStudent() {
    try {
        let studentList = await db.collection('Students').find().toArray();
        return await studentList
    }catch(e){

    }
}

app.post('/students', function(req, res) { 
 
    addStudent(req.body.name);
    console.log(req.body);
    res.status(200).send("aa");
});  


app.get('/student', function(req, res) {
    
    res.status(200).send(getStudent());
}); 

app.delete('/student/:name',async function(req, res) { 

    let studentList = await getStudent();   
    for (let i = 0; i < studentList.length; i++){
        if (req.params.name.toUpperCase() === studentList[i].name.toUpperCase()){
            await db.collection('Students').deleteOne({name : req.params.name})
        }
    }
    res.status(200).send(req.params.name + " has been deleted")
});

app.listen(3000, function() {
    console.log('hello');
});
