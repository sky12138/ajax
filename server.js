
//引入相关的模块
var http=require("http");
var mysql = require('mysql');
var url = require('url');
var querystring = require('querystring');

//配置数据库
var connection = mysql.createConnection({
 	host: "127.0.0.1",// ip地址
    port: 3306,//端口号
    database: 'new',//数据库名
    user: 'root',//用户名
    password:'yang5201314tan'//密码
});
//链接数据库
connection.connect();

//创建服务器
http.createServer(function(request, response){
	//解决跨域问题
	response.setHeader('Access-Control-Allow-Origin', '*');
	
	//用于get请求
	var paramsStr = url.parse(request.url).query;
	var params = querystring.parse(paramsStr);    //接收客户端传过来的参数
	var pathname = url.parse(request.url).pathname;


	//增加商品（post）
	if(pathname == '/insert') {
		
		//post请求
		var post = '';
		request.on('data', function(data) {
			post += data
		})
		request.on('end', function(data) {
			post=querystring.parse(post)    //obj  接受客户端的参数
			console.log(post)
			//添加到数据库
			connection.query("insert into goods(name,pri,time,content,goodscol) values(?,?,?,?,?)", [post.name,post.pri,post.time,post.content,post.goodscol],function(err, data) {
		   		if(err){
		   			var obj = {
						status: '失败',
					};
		   		}else{
		   			var obj = {
						status: 'sucess',
					};
		   		}
				
				response.end(JSON.stringify(obj));	
			})
			
		})
		
	//获取商品（get）
	}else if(pathname == '/select') {
		connection.query("select * from goods", function(err, data) {
			//console.log(data)
			var obj = {
				status: 'sucess',
			};
			obj.news = data;
			response.end(JSON.stringify(obj));
		})
		
	//删除商品（get）
	} 
//	else if(pathname == '/delete') {
//		connection.query("DELETE FROM `news` WHERE id=" + params.id, function(err, data) {
//			connection.query("select * from news", function(err, data) {
//				//console.log(data)
//				var obj = {
//					status: 'sucess',
//				};
//				obj.news = data;
//				response.end(JSON.stringify(obj));
//			})
//		})
//	
	
	
	
	
	
	
	
	
	//设置端口号
}).listen(8888);
console.log('服务器开始运行！');