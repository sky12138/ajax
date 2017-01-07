*本库中的ajax请求是基于node.js和mysql数据为基础进行编写的
##1.ajax简介
AJAX即“Asynchronous Javascript And XML”（异步JavaScript和XML），是指一种创建交互式网页应用的网页开发技术。
AJAX = 异步 JavaScript和XML（标准通用标记语言的子集）。
AJAX 是一种用于创建快速动态网页的技术。
通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。
传统的网页（不使用 AJAX）如果需要更新内容，必须重载整个网页页面。

##2.ajax的几种跨域请求的解决方法

###出现跨域问题的情况
由于在工作中需要使用AJAX请求其他域名下的请求，但是会出现拒绝访问的情况，这是因为基于安全的考虑，AJAX只能访问本地的资源，而不能跨域访问。

比如说你的网站域名是aaa.com，想要通过AJAX请求bbb.com域名中的内容，浏览器就会认为是不安全的，所以拒绝访问。

###处理跨域的方法1 -- 代理
这种方式是通过后台(ASP、PHP、JAVA、ASP.NET)获取其他域名下的内容，然后再把获得内容返回到前端，这样因为在同一个域名下，所以就不会出现跨域的问题。

比如在北京（www.beijing.com/sever.php）和上海（www.shanghai.com/sever.php）各有一个服务器，北京的后端（www.beijing.com/sever.php）
直接访问上海的服务，然后把获取的响应值返回给前端。也就是北京的服务在后台做了一个代理，前端只需要访问北京的服务器也就相当与访问了上海的服务器。
这种代理属于后台的技术，所以不展开叙述。

###处理跨域的方法2 -- JSONP
假设在http://www.aaa.com/index.php这个页面中向http://www.bbb.com/getinfo.php提交GET请求，那么我们在www.aaa.com页面中添加如下代码：

`var eleScript= document.createElement("script");` //创建一个script元素
 
`eleScript.type = "text/javascript";` //声明类型、
 
`eleScript.src = "http://www.bbb.com/getinfo.php"; `//添加src属性 引入跨域访问的url
 
`document.getElementsByTagName("HEAD")[0].appendChild(eleScript);` //在页面中添加新创建的script元素

当GET请求从http://www.bbb.com/getinfo.php返回时，可以返回一段JavaScript代码，这段代码会自动执行，可以用来负责调用http://www.aaa.com/index.php页面中的一个callback函数。看下面一个列子：

在www.aaa.com页面中：
`<script>
 
　　function jsonp( json ){
 
　　　　document.write( json.name ); //输出周星驰
 
}
 
<script>
 
<script src="http://www.bbb.com/getinfo.php"></script>`
在www.bbb.com页面中：

　　`jsonp({ "name":"周星驰","age":45 });`

也就是在www.aaa.com页面中声明，在www.bbb.com页面中调用。*但是JSONP只支持 “GET” 请求，但不支持 “POST” 请求。*

###处理跨域的方法3 -- XHR2（推荐方法）
“XHR2” 全称 “XMLHttpRequest Level2” 是HTML5提供的方法，对跨域访问提供了很好的支持，并且还有一些新的功能。

* IE10一下的版本都不支持

* 只需要在服务器端头部加上下面两句代码：

　　header( "Access-Control-Allow-Origin:*" );

　　header( "Access-Control-Allow-Methods:POST,GET" );

具体用法可以查看本库中server.js的后台代码 或者点击——》https://github.com/sky12138/ajax/blob/master/server.js
***

##下面我们将讲讲各种框架的ajax请求

###js的ajax请求
####第一步
创建 XHR 对象可以直接实例化 XMLHttpRequest 。
`function createXHR() {
	if (window.XMLHttpRequest) { //IE7+, FF, 谷歌...
		return new XMLHttpRequest();
	}
	//IE6-
	return new ActiveXObject("Microsoft.XMLHTTP");
}
var xhr = new  createXHR() ；`

####第二步
open()方法:
它接受三个参数：要发送的请求类型(get、post)、请求的 URL 和表示是否异步
xhr.open('get', 'demo.json', false);  //对于demo.json 的 get 请求，false表示同步

####第三步
send()方法:
向服务器发送请求
open()方法并不会真正发送请求，而是准备好需要发送给服务器的内容。我们需要通过send()方法向服务器发送请求
send()方法接受一个参数，作为请求体发送的数据。如果是get方式请求则填 null。
`xhr.send(null); `

####第四步
设置回调函数
//监听状态改变
`xhr.onreadystatechange = function () {
     if(xhr.readyState==4 && xhr.status ==200){
//接受请求回来的数据
var dataList = JSON.parse(xhr.responseText);
      } else {
             alert('数据返回失败！状态代码：' + xhr.status + '状态信息：'+ xhr.statusText);
      }
      
};`

例题可以参考本库中的js—ajax文件夹，或者点击https://github.com/sky12138/ajax/tree/master/JS_ajax

###JQ的ajax请求
####1.load() 方法
Query load() 方法是简单但强大的 AJAX 方法。
load() 方法从服务器加载数据，并把返回的数据放入被选元素中。
语法：
$(selector).load(URL,data,callback);
必需的 URL 参数规定您希望加载的 URL。
可选的 data 参数规定与请求一同发送的查询字符串键/值对集合。
可选的 callback 参数是 load() 方法完成后所执行的函数名称。

也可以把 jQuery 选择器添加到 URL 参数。
下面的例子把 "demo_test.txt" 文件中 id="p1" 的元素的内容，加载到指定的 <div> 元素中：
实例
$("#div1").load("demo_test.txt #p1");

可选的 callback 参数规定当 load() 方法完成后所要允许的回调函数。回调函数可以设置不同的参数：
  ● responseTxt - 包含调用成功时的结果内容
  ● statusTXT - 包含调用的状态  success    error
  ● xhr - 包含 XMLHttpRequest 对象

####2.jQuery get() 和 post() 方法
HTTP 请求：GET vs. POST
两种在客户端和服务器端进行请求-响应的常用方法是：GET 和 POST。
  ● GET - 从指定的资源请求数据
  ● POST - 向指定的资源提交要处理的数据
GET 基本上用于从服务器获得（取回）数据。注释：GET 方法可能返回缓存数据。
POST 也可用于从服务器获取数据。不过，POST 方法不会缓存数据，并且常用于连同请求一起发送数据。


####jQuery $.get() 方法
$.get() 方法通过 HTTP GET 请求从服务器上请求数据。
语法：
$.get(URL,callback);
必需的 URL 参数规定您希望请求的 URL。
可选的 callback 参数是请求成功后所执行的函数名。callback(data,status)
下面的例子使用 $.get() 方法从服务器上的一个文件中取回数据：
实例
$("button").click(function(){
  $.get("demo_test.asp",function(data,status){
    alert("Data: " + data + "\nStatus: " + status);
  });
});


####jQuery $.post() 方法
$.post() 方法通过 HTTP POST 请求从服务器上请求数据。
语法：
$.post(URL,data,callback);
必需的 URL 参数规定您希望请求的 URL。
可选的 data 参数规定连同请求发送的数据。
可选的 callback 参数是请求成功后所执行的函数名。
下面的例子使用 $.post() 连同请求一起发送数据：
实例
$("button").click(function(){
  $.post("demo_test_post.asp",
  {
    name:"Donald Duck",
    city:"Duckburg"
  },
  function(data,status){
    alert("Data: " + data + "\nStatus: " + status);
  });
});
$.post() 的第一个参数是我们希望请求的 URL ("demo_test_post.asp")。
然后我们连同请求（name 和 city）一起发送数据。
"demo_test_post.asp" 中的 ASP 脚本读取这些参数，对它们进行处理，然后返回结果。
第三个参数是回调函数。第一个回调参数存有被请求页面的内容，而第二个参数存有请求的状态。


####3.ajax() 方法
语法
jQuery.ajax([settings])

eg:
$.ajax({
  url: url,                 //请求的地址
  type：“GET/POST”，//请求的方式
  dataType: 'json',  //预期服务器返回的数据类型
  data: data,           //发送到服务器的数据
  success: callback  //成功后的回掉函数
});
参数描述settings可选。用于配置 Ajax 请求的键值对集合。
可以通过 $.ajaxSetup() 设置任何选项的默认值。
