(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{268:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",(function(){return i}));a(5),a(4),a(3),a(10),a(63),a(82),a(160);var n=a(0),r=a.n(n),l=a(273),o=a(277),c=a(279);t.default=function(e){var t=e.data.allMarkdownRemark,a={};t.edges.forEach((function(e){e.node.frontmatter.tags.forEach((function(e){a[e]?a[e]+=1:a[e]=1}))}));var n=Array.from(Object.keys(a)).sort((function(e,t){return a[t]-a[e]}));return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row",style:{margin:15}},r.a.createElement(l.a,null),r.a.createElement("div",{className:"col order-2"},n.map((function(e){return r.a.createElement(o.a,{name:e,key:e,count:a[e]})})))),r.a.createElement(c.a,{title:"標籤",url:"/tags/",siteTitleAlt:"Calpa's Blog",isPost:!1,description:"Tags Page",image:"https://i.imgur.com/M795H8A.jpg"}))};var i="3215885689"},272:function(e){e.exports=JSON.parse('{"data":{"all":{"totalCount":3},"limited":{"latestPosts":[{"node":{"fields":{"slug":"/2019/05/17/README"},"frontmatter":{"id":"README","title":"gatsby-starter-calpa-blog README","url":"/2019/05/17/README","date":"2019-05-17T03:48:03.125Z","tags":["閱讀"],"description":"關於這個 Starter","headerImage":"https://i.imgur.com/mich3dS.jpg"}}},{"node":{"fields":{"slug":"/2018/05/01/about-calpa-liu/"},"frontmatter":{"id":"c192eaba9fefc632acf87ed636593475","title":"關於作者","url":"/2018/05/01/about-calpa-liu/","date":"2018-05-01T03:48:03.125Z","tags":["閱讀"],"description":"你好，歡迎來到我的博客。我是 Calpa，一個喜歡寫技術文章的前端程序員。","headerImage":"https://i.imgur.com/mich3dS.jpg"}}},{"node":{"fields":{"slug":"/guestbook"},"frontmatter":{"id":"https://calpa.me/guestbook/","title":"留言簿","url":"/guestbook","date":"2017-01-01T03:48:03.125Z","tags":["閱讀"],"description":"","headerImage":null}}}]}}}')},273:function(e,t,a){"use strict";a(20);var n=a(272),r=a(0),l=a.n(r),o=a(54),c=a(122),i=a(6),m=a(58),s=(a(254),i.config.friends),u=void 0===s?[]:s,p=function(){return l.a.createElement("div",{className:"friend"},l.a.createElement("p",null,"友情鏈接"),u.map((function(e){return l.a.createElement(m.a,{href:e.href,title:e.title,key:e.title,rel:"noopener"})})))},f=(a(255),function(e){var t=e.posts;return l.a.createElement("div",{className:"latest-post"},l.a.createElement("p",null,"最新文章"),t.map((function(e){var t=e.node;return l.a.createElement(o.Link,{to:t.frontmatter.url||t.frontmatter.slug||t.fields.slug,key:t.frontmatter.url||t.frontmatter.slug||t.fields.slug,href:t.frontmatter.url||t.frontmatter.slug||t.fields.slug},t.frontmatter.title)})))}),g=(a(256),function(e){var t=e.totalCount,a=e.posts;return l.a.createElement("div",{className:"d-none d-lg-block information my-2"},l.a.createElement("hr",null),l.a.createElement("p",null,"共 ",t," 篇文章"),l.a.createElement("hr",null),l.a.createElement(f,{posts:a}),l.a.createElement("hr",null),l.a.createElement(p,null))});g.defaultProps={posts:[]};var d=g,E=(a(257),i.config.wordings),h=void 0===E?[]:E,b=i.config.githubUsername,y=i.config.zhihuUsername,v=i.config.email,w=i.config.iconUrl,N=i.config.about,k=i.config.facebook,P=function(e){var t=e.href,a=e.icon;return l.a.createElement("a",{target:"_blank",href:t,rel:"external nofollow noopener noreferrer",className:"custom-icon"},l.a.createElement("span",{className:"fa-layers fa-fw fa-2x"},l.a.createElement(c.a,{icon:a})))},A=function(e){var t=e.totalCount,a=e.latestPosts;return l.a.createElement("header",{className:"intro-header site-heading text-center col-xl-2 col-lg-3 col-xs-12 order-lg-1"},l.a.createElement("div",{className:"about-me"},l.a.createElement(o.Link,{to:N,href:N,className:"name"},l.a.createElement("img",{className:"avatar",src:w,alt:"Calpa"}),l.a.createElement("h4",null,"Calpa")),l.a.createElement("p",{className:"mb-1"},h[0]),l.a.createElement("p",{className:"mb-3"},h[1]),l.a.createElement(P,{href:"https://www.zhihu.com/people/"+y,icon:["fab","zhihu"]}),l.a.createElement(P,{href:"https://github.com/"+b,icon:["fab","github"]}),l.a.createElement(P,{href:"mailto:"+v,icon:["far","envelope"]}),k&&l.a.createElement(P,{href:"https://www.facebook.com/"+k+"/",icon:["fab","facebook"]}),l.a.createElement(d,{totalCount:t,posts:a})))};A.defaultProps={totalCount:0,latestPosts:[]};t.a=function(){return l.a.createElement(o.StaticQuery,{query:"1307080370",render:function(e){return l.a.createElement(A,Object.assign({},e.all,e.limited))},data:n})}},277:function(e,t,a){"use strict";a(34);var n=a(0),r=a.n(n),l=function(e){var t=e.name,a=e.count;return r.a.createElement("a",{href:"/tag/"+t,className:"header-tag"},t," ",a)};l.defaultProps={count:""},t.a=l},279:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(127),o=a.n(l),c=a(6),i=a.n(c),m=function(e){var t=e.url,a=e.title,n=e.description,l=e.image,c=(e.siteTitleAlt,e.isPost);return r.a.createElement(o.a,null,r.a.createElement("title",null,a),r.a.createElement("meta",{name:"description",content:n}),r.a.createElement("meta",{name:"image",content:l}),r.a.createElement("script",{type:"application/ld+json"},JSON.stringify(function(e){var t=e.url,a=e.title,n=e.siteTitleAlt,r=e.isPost,l=e.image,o=e.description;return[{"@context":"http://schema.org","@type":"WebSite",url:t,name:a,alternateName:n||""},r?{"@context":"http://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,item:{"@id":t,name:a,image:l}}]}:"",r?{"@context":"http://schema.org","@type":"BlogPosting",url:t,name:a,alternateName:n||"",headline:a,image:{"@type":"ImageObject",url:l},description:o}:""]}(t))),r.a.createElement("meta",{property:"og:url",content:t}),c?r.a.createElement("meta",{property:"og:type",content:"article"}):r.a.createElement("meta",{property:"og:type",content:"website"}),r.a.createElement("meta",{property:"og:title",content:a}),r.a.createElement("meta",{property:"og:description",content:n}),r.a.createElement("meta",{property:"og:image",content:l}),r.a.createElement("meta",{property:"fb:app_id",content:i.a.siteFBAppID?i.a.siteFBAppID:""}),r.a.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),r.a.createElement("meta",{name:"twitter:creator",content:i.a.twitter_username?i.a.twitter_username:""}),r.a.createElement("meta",{name:"twitter:title",content:a}),r.a.createElement("meta",{name:"twitter:description",content:n}),r.a.createElement("meta",{name:"twitter:image",content:l}))};m.defaultProps={title:i.a.title},t.a=m}}]);
//# sourceMappingURL=component---src-pages-tags-js-20152a77fe2037577858.js.map