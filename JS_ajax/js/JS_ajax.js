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
		}
		//封装一个js的get的请求方式
		function get(callback){
			//创建ajax请求
			var xhr = createXHR();
			//设置请求内容
			xhr.open("GET","http://localhost:8888/select",true);
			//发送请求
			xhr.send(null);
			xhr.onreadystatechange = function(){
				if(xhr.readyState==4 && xhr.status ==200){
					//JSON解析
					var dataList = JSON.parse(xhr.responseText);
					console.log(dataList.news);
					callback(dataList.news);
				}else{
					console.log("请求失败！"+xhr.status+","+xhr.statusText);
				}
				
			};
		}
		
		
		
		
		
			//js的ajax请求
			var bnt=document.getElementById("submit");
			var oList=document.getElementById("oList");
			var gx=document.getElementById("gx");
			
			//get请求获取商品
			bnt.onclick=function(){
				bnt.style.display='none';
				gx.style.display='block';
				get(ul);
				
			};
			
			//post请求添加并更新商品
			gx.onclick=function(){
				//获取商品信息
				var name=document.getElementById("name");
				var pri=document.getElementById("pri");
				var time=document.getElementById("time");
				var content=document.getElementById("content");
				var goodscol=document.getElementById("goodscol");
				
				var n=name.value;
				var p=pri.value;
				var t=time.value;
				var c=content.value;
				var g=goodscol.value;
				//创建ajax请求
				var xhr = createXHR();
				//设置请求内容
				xhr.open("post","http://localhost:8888/insert",true);
				//发送请求
				xhr.send("name="+n+"&pri="+p+"&time="+t+"&content="+c+"&goodscol="+g);
				xhr.onreadystatechange = function(){
					if(xhr.readyState==4 && xhr.status ==200){
						//JSON解析
						var dataList1 = JSON.parse(xhr.responseText);
						console.log(dataList1);
						//清空之前的列表
						var list=document.getElementsByTagName("ul")[0];
						list.innerHTML=null;
						//清空输入框
						name.value=null;
						pri.value=null;
						time.value=null;
						content.value=null;
						goodscol.value=null;
						//更新列表
						get(ul);
						
					}else{
						console.log("请求失败！"+xhr.status+","+xhr.statusText);
					}
					
				};
				
			};
		