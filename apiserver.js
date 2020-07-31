const MongoClient = require("mongodb").MongoClient;       
const express = require('express'); 
const { Logger } = require("mongodb");
let app = express();
const url = 'mongodb://localhost:27017/';                  
const dbName = 'Groupe_data_base';                
let client;
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


async function database(){                    
    try{
        client = await MongoClient.connect(url, { useNewUrlParser: true , useUnifiedTopology: true });
        db = client.db(dbName);
        await db.createCollection("Students");
        await db.createCollection("Groups");
    }catch(e){
        console.log(e);
     }

}
database(); 

/*     ---- Students Functions ----      */
async function addStudent(student) {
    try { 
        await db.collection('Students').insertOne({name : student});
    }catch(e){

    }
}

async function getStudent(value) {
    try {
        let studentList = await db.collection('Students').find().toArray();
        
        return await studentList
    }catch(e){

    }
}

async function deleteStudent(value) {
    try {
        await db.collection('Students').deleteOne({name : value})
    }catch(e){

    }
}
/*     ---- Groups routes ----      */
async function deleteGroups(value) {
    try {
        await db.collection('Groups').deleteOne({projet : value})
    }catch(e){

    }
}



async function getGroups() {
    try {
        let groupsList = await db.collection('Groups').find().toArray();
        return await groupsList
    }catch(e){

    }
}

/*     ---- Students routes ----      */
app.post('/students', function(req, res) { 
    console.log(req.body);
     addStudent(req.body.name);
    
    res.status(200).send("aa");
});  


app.get('/students', async function(req, res) {
    res.status(200).send(await getStudent());
}); 

app.delete('/students/:name',async function (req, res) { 
    let studentList = await getStudent(req.params.name);
    
    if(studentList.length != 0){
        deleteStudent(req.params.name)
        res.status(200).send(req.params.name + " has been deleted")
    
    }else {
        res.status(404).send("This student " + req.params.name + " doesn't exist")
    }
});



/*     ---- Groups routes ----      */
app.post('/groups', async function (req, res) {
    addGroups(req.body)
    // console.log("aaaa" , req.body);
    res.status(200).send(req.body);
});
async function addGroups(name){
    try {
    let grouptab = await db.collection("Students").find().toArray();
    await db.collection('Groups').insertOne(name);
    } catch (error) {
        
    }
}
app.get('/groups/', async function (req, res) {
    res.status(200).send(await getGroups());
})


app.get("/groups/:name", async function (req, res) {
    let groupInfo = await db.collection("Groups").find({projet : req.params.name}).toArray();
    if(groupInfo.length != 0 ){
        res.status(200).send(groupInfo)
        
    } else {
        res.status(404).send("This group doesn't exist")
    }
});

app.delete("/groups/:name", async function (req,res) {
    let groupInfo = await db.collection("Groups").find({projet : req.params.name}).toArray();
    if(groupInfo.length != 0 ){
        let groupName = await deleteGroups(req.params.name);
        res.status(200).send('This group ' + req.params.name + ' has been deleted')
    }else{
        res.status(404).send("This group doesn't exist")
    }
})

app.listen(3000, function() {
    console.log('hello');
});
