
//const Joi = require('@hapi/joi')
const { response, query } = require("express");
const express = require("express");
const { parse } = require("path");
const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//OR
//const bodyParser = require('body-parser')
//app.use(bodyParser.json())

app.set("view engine", "ejs");



//app.get("/", (req, res) => {
  //res.render("home.ejs");
//});



/*const user = {
  name:"paul",
  age:54,
  location:"Atlanta",
  hobby:"Gym"

}

app.get('/',(req,res)=>{
   res.send({"user":user})
})

app.put('/',(req,res)=>{
  user = req.body.user
  res.status(201).res.send({'user':user})
})*/



const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];
//       

app.get('/',(req,res)=>{
console.log(courses)
res.send({'courses':courses})
})


const posts =[
  {title:"My favorite car"},
   {title:"My favorite food"}
]

app.post('/posts',(req,res)=>{
  console.log(req.headers)
  const{authorization} = req.headers
  if(authorization && authorization ==="12345"){
    const post = req.body;
    console.log(post)
    posts.push(post);
    res.status(200).send(post);
  } else{res.status(400).send('Forbidden')
}
  
})

/*app.use((req, res) => {
  console.log("new request");
  res.send(`This is my webpage`);
});*/

//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

/*app.get("/search", (req, res) => {
  console.log(req.query);
  const { q } = req.query;
  res.send(`Search result for:${q}`);
  
});*/


app.post('/',(req,res,next)=>{
  console.log(req.body);
  res.send('I am post');
})


//app.get('/',(req,res)=>{
  //res.render('home.ejs')
//})


//app.get('/api/posts/:year/:month',(req,res)=>{
  //console.log(req.params)
  //res.send(req.params
  //)
//})


// query string parameters by Mosh 
app.get('/api/courses',(req,res)=>{
  
  res.send([1,2,3,4])
})
app.get('/api/courses/:id',(req,res)=>{
  res.send(req.params.id)
})

app.get("/api/posts/:year/:month", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

app.get('/api/posts/:Name/:Sex/:Age',(req,res)=>{
  console.log(req.params)
  res.send(req.params)
})


//app.post('/',(req,res)=>{
  //res.send({message:'All good.'})
//})

app.get('/rand',(req,res)=>{
  const num = Math.floor(Math.random() *10)+1;
  res.render('random',{num:num})
})


app.get('/cats',(req,res)=>{
  const cats = ['Konana','Oliver','Misha','Leo']
  res.render('cats',{cats})
})




app.get('/r/:subreddit',(req,res)=>{
const{subreddit} = req.params;
res.render('subreddit',{subreddit})
})

//app.use((req,res)=>{index.js
//console.log("new request")
//res.send(`<h1>This is my webpage</h1>`)
//})

//app.get('/', (req,res)=>{
//res.send('root path')

//})

app.get("/cats", (req, res) => {
  res.send("meeow!");
});

app.get("/dogs", (req, res) => {
  res.send("Woyuyuyuoof!");
});

//app.post("/cats", (req, res) => {
  //res.send("Fish");
//});

/*app.get('/r/:subreddit/:postId',(req,res)=>{
    //console.log(req.params)
   const{subreddit,postId} = req.params;
    res.send(` Viewing Post Id:${postId} on the ${subreddit} website!`)
})*/

/*app.get('/r/:subreddit/:postId', (req, res) => {
    console.log(req.params)
  const { subreddit, postId } = req.params;
  res.send(`Checking out Post Id: ${postId} on ${subreddit} website!`);
});

/*app.get('/r/:subreddit',(req,res)=>{
    const {subreddit} = req.params
    res.send(`checking out ${subreddit} on website`)
})

app.get("/search", (req, res) => {
  console.log(req.query);
  const { q } = req.query;
  res.send(`Search result for:${q}`);
});*/

/*app.get("*", (req, res) => {
  res.send("Sorry not available.");
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});*/


//app.set('view engine','ejs');

/*app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/rand',(req,res)=>{
    res.render('random')
})*/
 
/*const fs = require('fs')
fs.readFile("test.txt",'utf8',(err,data)=>{
  if(err)throw err;
  console.log(data)
})*/

/*app.get('/r/:subreddit',(req,res)=>{
   res.send('subreddit yoh')
})
app.get('/',(req,res)=>{
 res.send("Homepage")
})*/

/*app.get('/r/:subreddit',(req,res)=>{
    const {subreddit} = req.params
    res.send(`checking out ${subreddit} on website`)
})*/


/*app.get('/search',(req,res)=>{
  console.log(req.query)
  const {q} = req.query
     res.send(`Searching for: ${q}`)
     if(!q){
       res.send('Nothing found')
     }
})*/

app.get('/search',(req,res)=>{
  console.log(req.query)
  const {q} = req.query
  res.send(`Searching for: ${q}.`)
})

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course not found");
  res.send(course);
});




app.post('/api/courses',(req,res)=>{

const { error } = validateCourse(req.body);
if (error) {
  res.status(400).send(error.details[0].message);
  return;
}

/*const schema = Joi.object ({
  name: Joi.string().min(3).required()
});

const validation =schema.validate(req.body);
console.log(validation)

  if(validation.error){
    res.status(400).send(validation.error.details[0].message)
    return;
  }*/
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course)
});


app.put('/api/courses/:id',(req,res)=> {

  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course not found");
   

  const{ error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course)
  
});

function validateCourse(course){
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}



//port 
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}.`)
})

