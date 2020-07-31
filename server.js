let express = require('express'); 
let fetch = require('node-fetch');  
const { json } = require('express');
// let ejs = require('ejs');
var app = express();  
app.use(express.urlencoded({ extended: true}));
let studentTab = []
let groupTab = []
// let sortir = []


app.get('/students', async function (req, res){
   let studentLi = await dataStudents(true)
  
   res.render('index1.ejs', {studentTab : studentLi});

});

app.get('/groups', async function (req, res){
    let groupLi = await dataGroups()
    res.render('index2.ejs', {groupTab : groupLi});
 
 });

app.post('/students', async function (req, res){
    fetch('http://localhost:3000/students',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body :  JSON.stringify({name : req.body.name}),
    })
    .then(function (data) {  
        console.log('Request success: ', data);  
      })  
    .catch(function (error) {  
        console.log('Request failure: ', error);  
      });
    
   res.redirect('/students');
} ); 

app.post('/groups', async function (req, res){
    
    fetch('http://localhost:3000/groups',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body :  JSON.stringify({projet : req.body.projet, number : req.body.number, group : shuffle(req.body.number, await dataStudents(true))}),
    })
    
    .then(function (data) {  
        console.log('Request success: ', data);  
      })  
    .catch(function (error) {  
        console.log('Request failure: ', error);  
      });
    
   res.redirect('/groups');
} ); 


async function dataStudents(onlyName) {
    try {
        let studentTab = []
        let Students = await fetch('http://localhost:3000/students');
        let StudentsParse = await Students.json();
        for(let i = 0; i<StudentsParse.length; i++){
        studentTab.push(StudentsParse[i].name)
     
        }
        /* condition boolean */
        return  onlyName ? studentTab : StudentsParse /* renvoie les noms si True */
        /* renvoie tout l'objet si False */
    } catch (error) {
        console.log(error);
    }
 }

 async function dataGroups() {
     try { 
         let groupTab = []
        let groups = await fetch('http://localhost:3000/groups');
        let groupsParse = await groups.json();
  
        return groupsParse
     } catch (error) {
        console.log(error);
        return []
     }
     
 }





app.listen(8000, function() {
    console.log('hello');
});




  function shuffle(number, array) {
     
        let testtab = []
       
        array = array.sort(() => Math.random() - 0.5);
    
            while(array.length > 0){
         
               let studentSplice =  array.splice(0,number)
         
               testtab.push(studentSplice)
            }
   
        return testtab
      
    }
    
  
// async function randomGroup(number){
//     try {
//     let studentTab = await dataStudents(true);
//     console.log(studentTab);
//     let randomStudent = [];

//     console.log(studentTab);
    // for(let i = 0; i<studentTab.length; i++ ){

    //     for(let y = 0; y<number; y++){

    //     let nbrAlea =  studentTab[Math.floor(Math.random() * studentTab.length)];
    //     let sortir =  studentTab.splice(i,number)
    //     randomStudent.push( sortir)
        
        
    //     }

    // }
//     console.log( test);
//     } catch (error) {
//         console.log(error);
//     }
    

// }


// async function test(projectGroup){
//     for(let i = 0; i< projectGroup.length; i++){ 
//         for(let y = 0; y< projectGroup[i].group.length; y++){ 
//         await projectGroup[i].group[y];
//         console.log(projectGroup[i].group[y]);
//         }
//     }
// }
