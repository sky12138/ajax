//封装一个动态创建列表的函数
function ul(data){
for(var i=0;i<data.length;i++){
		var obj = data[i];
				
		//创建li节点
		var liNode = document.createElement("li");
		
		//创建div节点
		var divNode1 = document.createElement("div");
		var divNode2 = document.createElement("div");
		var divNode3 = document.createElement("div");
		var divNode4 = document.createElement("div");
		var divNode5 = document.createElement("div");

		
		divNode1.innerHTML = obj.name;
		divNode2.innerHTML = obj.pri;
		divNode3.innerHTML = obj.time;
		divNode4.innerHTML = obj.content;
		divNode5.innerHTML = obj.goodscol;
		
		
		liNode.appendChild(divNode1);
		liNode.appendChild(divNode2);
		liNode.appendChild(divNode3);
		liNode.appendChild(divNode4);
		liNode.appendChild(divNode5);
	
		oList.appendChild(liNode);
	}
};
		
//get请求获取商品列表
function get(callback){
	$.get("http://localhost:8888/select",function(data,status){
		//请求成功
		if(status=="success"){
			//解析data
			var obj=JSON.parse(data).news;
			console.log(obj);
			callback(obj);
			
		}else{
			console.log("请求失败！")
		}
	})
}

//post请求添加数据
function post(n,p,t,c,g){
	$.post("http://localhost:8888/insert",
			{
			   name:n,
			   pri:p,
			   time:t,
			   content:c,
			   goodscol:g
			},
  			function(data,status){
  				//请求成功
  				if(status=="success"){
  					console.log(data);
  					//清除old列表
  					$("#oList").html("")
  					//更新列表
  					get(ul);
  				}
    			
	});
}




//点击获取按钮
$("#submit").click(function(){
	$("#submit").css({display:'none'});
	$("#gx").css({display:'block'});
	
	get(ul);
});

//点击添加并更新列表按钮
$("#gx").click(function(){
	//获取输入框的值
	var n=$("#name").val();
	var p=$("#pri").val();
	var t=$("#time").val();
	var c=$("#content").val();
	var g=$("#goodscol").val();
	
//	post(n,p,t,c,g);
 
    //ajax（）方法
	$.ajax({
	  url:"http://localhost:8888/insert",                 //请求的地址
	  type: 'POST',  //请求方式
	  data: {
			   name:n,
			   pri:p,
			   time:t,
			   content:c,
			   goodscol:g
			},           //发送到服务器的数据
	  success: function(data,status){
				//请求成功
				console.log(status)
				if(status=="success"){
					console.log(data);
					//清除old列表
					$("#oList").html("")
					//更新列表
					get(ul);
				} 
		}//成功后的回掉函数
	});

})