const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
//889ac3ab9c931e487d01c34905586cb8-us12
//list ID:1f26b43c7f
const app=express();

app.use(express.static("public"));
app.use(body-parser.urlencoded({extended:true}))

app.get("/", function(req,res){
    res.sendFile(__dirname +"/signup.html")
})
app.post("/",function(req,res){
    const firstName=req.body.Fname;
    const lastName=req.body.Lname;
    const Email=req.body.Email;
   const data={
    members:[
        {
            email_address: email,
            status: "subscribed",
            merge_field:{
                FNAME: firstName,
                LNAME:lastName
            }
        }
    ]
   }
});
const jsonData=JSON.stringify(data);
url="https://us12.api.mailchimps.com/3.0/lists/1f26b43c7f"
const options={
    method:"POST",
    auth:"Charlie:889ac3ab9c931e487d01c34905586cb8-us12"
}
const request= https.request(url, options, function(response){
    if(response.statusCode===200){
        res.send(__dirname+ "/success.html")
    }else{
        res.send(__dirname+"/failure.html")
    }
    response.on("data",function(data){
        console.log(JSON.parse(data))

});
app.post("/failure", function(req,res){
res.redirect("/")
})
    
})
request.write(jsonData);
request.end();
app.listen(3000, function(){
    console.log("server is running on port 3000");
})