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
