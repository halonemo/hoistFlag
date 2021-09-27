const express = require("express")
const app = express()
app.use(express.static("./"))
app.listen(8080,()=>{
	console.log("服务开启在8080端口")
	console.log("http://127.0.0.1:8080/")
})