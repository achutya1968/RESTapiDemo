const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/cats',(req,res)=>{
    console.log(req.body)
   res.send(req.body)
})





const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});