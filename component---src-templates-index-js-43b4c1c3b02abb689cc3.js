(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{261:function(e,t,a){"use strict";a.r(t);a(20);var r=a(0),n=a.n(r),l=a(25),o=a.n(l),c=a(287),s=a(273),m=a(288),i=(a(262),function(e){var t=e.color,a=e.text;return n.a.createElement("div",{className:"navlink",style:{color:t}},a)}),u=function(e){var t=e.test,a=e.url,r=e.text;return t?n.a.createElement(o.a,{to:""+a},n.a.createElement(i,{color:"#66ccff",text:r})):n.a.createElement(i,{color:"#7d7d7d",text:r})};t.default=function(e){var t=e.pageContext,a=e.location,r=t.group,l=t.index,o=t.first,i=t.last,f=t.pathPrefix,d=l-1==1?"":"/"+f+"/"+(l-1),g="/"+f+"/"+(l+1);return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"row homepage",style:{marginTop:20}},n.a.createElement(s.a,null),n.a.createElement("div",{className:"col-xl-6 col-lg-7 col-md-12 col-xs-12 order-2"},r.map((function(e){var t=e.node;return n.a.createElement(c.a,Object.assign({},t.frontmatter,{url:t.frontmatter.slug?t.frontmatter.slug:t.fields.slug,key:t.fields.slug}))})),n.a.createElement("div",{className:"row",style:{justifyContent:"space-around",marginBottom:"20px"}},n.a.createElement("div",{className:"previousLink"},n.a.createElement(u,{test:!o,url:d,text:"Previous"})),n.a.createElement("div",{className:"nextLink"},n.a.createElement(u,{test:!i,url:g,text:"Next"})))),n.a.createElement("div",{className:"col-xl-2 col-lg-1 order-3"})),n.a.createElement(m.a,{url:a.href,hasCommentBox:!1}))}},272:function(e){e.exports=JSON.parse('{"data":{"all":{"totalCount":3},"limited":{"latestPosts":[{"node":{"fields":{"slug":"/2019/05/17/README"},"frontmatter":{"id":"README","title":"gatsby-starter-calpa-blog README","url":"/2019/05/17/README","date":"2019-05-17T03:48:03.125Z","tags":["閱讀"],"description":"關於這個 Starter","headerImage":"https://i.imgur.com/mich3dS.jpg"}}},{"node":{"fields":{"slug":"/2018/05/01/about-calpa-liu/"},"frontmatter":{"id":"c192eaba9fefc632acf87ed636593475","title":"關於作者","url":"/2018/05/01/about-calpa-liu/","date":"2018-05-01T03:48:03.125Z","tags":["閱讀"],"description":"你好，歡迎來到我的博客。我是 Calpa，一個喜歡寫技術文章的前端程序員。","headerImage":"https://i.imgur.com/mich3dS.jpg"}}},{"node":{"fields":{"slug":"/guestbook"},"frontmatter":{"id":"https://calpa.me/guestbook/","title":"留言簿","url":"/guestbook","date":"2017-01-01T03:48:03.125Z","tags":["閱讀"],"description":"","headerImage":null}}}]}}}')},273:function(e,t,a){"use strict";a(20);var r=a(272),n=a(0),l=a.n(n),o=a(54),c=a(122),s=a(6),m=a(58),i=(a(254),s.config.friends),u=void 0===i?[]:i,f=function(){return l.a.createElement("div",{className:"friend"},l.a.createElement("p",null,"友情鏈接"),u.map((function(e){return l.a.createElement(m.a,{href:e.href,title:e.title,key:e.title,rel:"noopener"})})))},d=(a(255),function(e){var t=e.posts;return l.a.createElement("div",{className:"latest-post"},l.a.createElement("p",null,"最新文章"),t.map((function(e){var t=e.node;return l.a.createElement(o.Link,{to:t.frontmatter.url||t.frontmatter.slug||t.fields.slug,key:t.frontmatter.url||t.frontmatter.slug||t.fields.slug,href:t.frontmatter.url||t.frontmatter.slug||t.fields.slug},t.frontmatter.title)})))}),g=(a(256),function(e){var t=e.totalCount,a=e.posts;return l.a.createElement("div",{className:"d-none d-lg-block information my-2"},l.a.createElement("hr",null),l.a.createElement("p",null,"共 ",t," 篇文章"),l.a.createElement("hr",null),l.a.createElement(d,{posts:a}),l.a.createElement("hr",null),l.a.createElement(f,null))});g.defaultProps={posts:[]};var h=g,p=(a(257),s.config.wordings),E=void 0===p?[]:p,v=s.config.githubUsername,b=s.config.zhihuUsername,k=s.config.email,N=s.config.iconUrl,x=s.config.about,y=s.config.facebook,C=function(e){var t=e.href,a=e.icon;return l.a.createElement("a",{target:"_blank",href:t,rel:"external nofollow noopener noreferrer",className:"custom-icon"},l.a.createElement("span",{className:"fa-layers fa-fw fa-2x"},l.a.createElement(c.a,{icon:a})))},w=function(e){var t=e.totalCount,a=e.latestPosts;return l.a.createElement("header",{className:"intro-header site-heading text-center col-xl-2 col-lg-3 col-xs-12 order-lg-1"},l.a.createElement("div",{className:"about-me"},l.a.createElement(o.Link,{to:x,href:x,className:"name"},l.a.createElement("img",{className:"avatar",src:N,alt:"Calpa"}),l.a.createElement("h4",null,"Calpa")),l.a.createElement("p",{className:"mb-1"},E[0]),l.a.createElement("p",{className:"mb-3"},E[1]),l.a.createElement(C,{href:"https://www.zhihu.com/people/"+b,icon:["fab","zhihu"]}),l.a.createElement(C,{href:"https://github.com/"+v,icon:["fab","github"]}),l.a.createElement(C,{href:"mailto:"+k,icon:["far","envelope"]}),y&&l.a.createElement(C,{href:"https://www.facebook.com/"+y+"/",icon:["fab","facebook"]}),l.a.createElement(h,{totalCount:t,posts:a})))};w.defaultProps={totalCount:0,latestPosts:[]};t.a=function(){return l.a.createElement(o.StaticQuery,{query:"1307080370",render:function(e){return l.a.createElement(w,Object.assign({},e.all,e.limited))},data:r})}},277:function(e,t,a){"use strict";a(34);var r=a(0),n=a.n(r),l=function(e){var t=e.name,a=e.count;return n.a.createElement("a",{href:"/tag/"+t,className:"header-tag"},t," ",a)};l.defaultProps={count:""},t.a=l},278:function(e,t,a){a(8),a(60);var r=function(e,t){if(void 0===t&&(t="large"),!e)return"https://i.imgur.com/M795H8A.jpg";if(e.match("(png)|(gif)"))return e.match("http")?e:"https://i.imgur.com/"+e;var a=e.replace(/(.*)\.(.*)/,"$1"+{"small-square":"s","big-square":"b",small:"t",medium:"m",large:"l",huge:"h"}[t]+".$2");return a.match("http")?a:"https://i.imgur.com/"+a},n=function(e){var t=e.href,a=e.title,n=e.text;return'<img class="lozad d-block mx-auto" data-src='+r(t,"large")+" "+function(e,t){return'title="'+(e||t)+'"'}(a,n)+" />"};e.exports={parseImgur:r,parseImageTag:n,getGalleryImage:function(e){var t=e.href,a=e.title,l=e.text;return'<a data-fancybox="gallery" href="'+r(t,"huge")+'">'+n({href:t,title:a,text:l})+"</a>"}}},287:function(e,t,a){"use strict";a(32);var r=a(0),n=a.n(r),l=a(54),o=a(277),c=a(278),s=(a(258),function(e){var t,a,r=e.url,o=e.image,s=e.backgroundColor;return n.a.createElement(l.Link,{to:r,href:r},n.a.createElement("div",{className:"wrapper",style:(t=o,a=s,{backgroundColor:"#"+a,backgroundImage:" url("+Object(c.parseImgur)(t,"large")+")"})}))}),m=function(e){var t=e.title,a=e.date,r=e.url,c=e.headerImage,m=e.headerBackgroundColor,i=e.description,u=e.tags,f=void 0===u?[]:u;return n.a.createElement("div",{className:"col-sm-12 pb-4"},n.a.createElement("div",{className:"custom-card"},c&&n.a.createElement(s,{url:r,image:c,backgroundColor:m}),n.a.createElement("div",{className:"data"},n.a.createElement("div",{className:"content"},n.a.createElement("div",{className:"stats"},n.a.createElement("span",{className:"date"},a.split("T")[0]),f.map((function(e){return n.a.createElement(o.a,{name:e,key:e})}))),n.a.createElement(l.Link,{to:r,href:r},n.a.createElement("h4",{className:"title"},t)),n.a.createElement("p",null,i),n.a.createElement(l.Link,{to:r,href:r},"....繼續閱讀全文內容")))))};m.defaultProps={headerImage:"",tags:[],date:"",headerBackgroundColor:""},t.a=m},288:function(e,t,a){"use strict";var r=a(0),n=a.n(r),l=a(42),o=a(122),c=(a(259),function(){return n.a.createElement("a",{className:"share-button",style:{lineHeight:"1.7rem",color:"#337ab7",paddingLeft:"0.15rem"},href:"#gitalk-container",onClick:function(){return l.a.event({category:"User",action:"Goto Comment Box"})}},n.a.createElement(o.a,{icon:["far","comment"]}))}),s=function(e){var t=e.url,a=e.hasCommentBox;return n.a.createElement("div",{className:"m-share-box"},n.a.createElement("a",{href:"https://www.facebook.com/sharer/sharer.php?u="+t,title:"",className:"share-button",onClick:function(){return l.a.event({category:"Share",action:"Facebook Share"})}},n.a.createElement(o.a,{icon:["fab","facebook-f"]})),a&&n.a.createElement(c,null),n.a.createElement("a",{className:"share-button",href:"#header",onClick:function(){l.a.event({category:"User",action:"Scroll to Top"})},style:{lineHeight:"1.7rem",paddingLeft:"0.1rem"}},n.a.createElement(o.a,{icon:["fas","chevron-up"]})))};s.defaultProps={hasCommentBox:!0},t.a=s}}]);
//# sourceMappingURL=component---src-templates-index-js-43b4c1c3b02abb689cc3.js.map