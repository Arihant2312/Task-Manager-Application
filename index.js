const express=require('express')
const app=express();
const path=require("path")
const fs=require('fs')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')))

app.get("/",(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{

    
    res.render("index",{files:files});
    });
});

    
app.get("/files/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,data)=>{
        
       
        res.render("show",{filename:req.params.filename,filedata:data})
        
    })
})
app.get("/edit/:filename",(req,res)=>{
    res.render("edit",{filename:req.params.filename})
})
app.post("/create",(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (error) {
        if (error) {
            console.error("Error writing file:", error.message);
            return res.status(500).send("Error writing file.");
        }
        res.redirect("/");
    });
    
})
app.post("/edit",(req,res)=>{
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(err,data)=>{
        if (err) {
            console.error("Error reading file:", err.message);
            return res.status(404).send("File not found or cannot be read.");
        }
        res.redirect("/")

    })
})

app.listen(3000,()=>{
    console.log("server started ")
})
