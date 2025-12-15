"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[892],{91584:function(e,t,r){r.d(t,{a:function(){return a}});var l=r(17521);function a(e,t){var r=e.append("foreignObject").attr("width","100000"),a=r.append("xhtml:div");a.attr("xmlns","http://www.w3.org/1999/xhtml");var o=t.label;switch(typeof o){case"function":a.insert(o);break;case"object":a.insert(function(){return o});break;default:a.html(o)}l.bg(a,t.labelStyle),a.style("display","inline-block"),a.style("white-space","nowrap");var n=a.node().getBoundingClientRect();return r.attr("width",n.width).attr("height",n.height),r}},17521:function(e,t,r){r.d(t,{$p:function(){return d},O1:function(){return n},WR:function(){return p},bF:function(){return o},bg:function(){return c}});var l=r(51218),a=r(26947);function o(e,t){return!!e.children(t).length}function n(e){return s(e.v)+":"+s(e.w)+":"+s(e.name)}var i=/:/g;function s(e){return e?String(e).replace(i,"\\:"):""}function c(e,t){t&&e.attr("style",t)}function d(e,t,r){t&&e.attr("class",t).attr("class",r+" "+e.attr("class"))}function p(e,t){var r=t.graph();if(l.Z(r)){var o=r.transition;if(a.Z(o))return o(e)}return e}},50892:function(e,t,r){r.d(t,{diagram:function(){return v}});var l=r(43410),a=(r(42521),r(27509)),o=(r(71421),r(48885)),n=(r(37202),r(8152),r(47052),r(17521)),i=r(91584);function s(e,t,r){var l,a=t.label,o=e.append("g");"svg"===t.labelType?(o.node().appendChild(t.label),n.bg(o,t.labelStyle)):"string"!=typeof a||"html"===t.labelType?(0,i.a)(o,t):function(e,t){for(var r=e.append("text"),l=(function(e){for(var t,r="",l=!1,a=0;a<e.length;++a)(t=e[a],l)?("n"===t?r+="\n":r+=t,l=!1):"\\"===t?l=!0:r+=t;return r})(t.label).split("\n"),a=0;a<l.length;a++)r.append("tspan").attr("xml:space","preserve").attr("dy","1em").attr("x","1").text(l[a]);return n.bg(r,t.labelStyle),r}(o,t);var s=o.node().getBBox();switch(r){case"top":l=-t.height/2;break;case"bottom":l=t.height/2-s.height;break;default:l=-s.height/2}return o.attr("transform","translate("+-s.width/2+","+l+")"),o}var c=r(36135),d=r(27179);function p(e,t){return e.intersect(t)}function u(e,t){var r=(a.jvg||a.YPS.line)().x(function(e){return e.x}).y(function(e){return e.y});return(r.curve||r.interpolate)(e.curve),r(t)}var b=r(50339);function f(e,t,r,l){var a=e.x,o=e.y,n=a-l.x,i=o-l.y,s=Math.sqrt(t*t*i*i+r*r*n*n),c=Math.abs(t*r*n/s);l.x<a&&(c=-c);var d=Math.abs(t*r*i/s);return l.y<o&&(d=-d),{x:a+c,y:o+d}}function h(e,t,r){var l=e.x,a=e.y,o=[],n=Number.POSITIVE_INFINITY,i=Number.POSITIVE_INFINITY;t.forEach(function(e){n=Math.min(n,e.x),i=Math.min(i,e.y)});for(var s=l-e.width/2-n,c=a-e.height/2-i,d=0;d<t.length;d++){var p=t[d],u=t[d<t.length-1?d+1:0],b=function(e,t,r,l){var a,o,n,i,s,c,d,p,u,b,f,h,g;if(a=t.y-e.y,n=e.x-t.x,s=t.x*e.y-e.x*t.y,u=a*r.x+n*r.y+s,b=a*l.x+n*l.y+s,(0===u||0===b||!(u*b>0))&&(o=l.y-r.y,i=r.x-l.x,c=l.x*r.y-r.x*l.y,d=o*e.x+i*e.y+c,p=o*t.x+i*t.y+c,!(0!==d&&0!==p&&d*p>0)&&0!=(f=a*i-o*n)))return h=Math.abs(f/2),{x:(g=n*c-i*s)<0?(g-h)/f:(g+h)/f,y:(g=o*s-a*c)<0?(g-h)/f:(g+h)/f}}(e,r,{x:s+p.x,y:c+p.y},{x:s+u.x,y:c+u.y});b&&o.push(b)}return o.length?(o.length>1&&o.sort(function(e,t){var l=e.x-r.x,a=e.y-r.y,o=Math.sqrt(l*l+a*a),n=t.x-r.x,i=t.y-r.y,s=Math.sqrt(n*n+i*i);return o<s?-1:o===s?0:1}),o[0]):(console.log("NO INTERSECTION FOUND, RETURN NODE CENTER",e),e)}function g(e,t){var r,l,a=e.x,o=e.y,n=t.x-a,i=t.y-o,s=e.width/2,c=e.height/2;return Math.abs(i)*s>Math.abs(n)*c?(i<0&&(c=-c),r=0===i?0:c*n/i,l=c):(n<0&&(s=-s),r=s,l=0===n?0:s*i/n),{x:a+r,y:o+l}}a.c_6;var y=r(92887);function w(e,t,r,l){return e.insert("polygon",":first-child").attr("points",l.map(function(e){return e.x+","+e.y}).join(" ")).attr("transform","translate("+-t/2+","+r/2+")")}r(5726),r(91088),r(95591),r(61601);let x={},k=function(e){for(let t of Object.keys(e))x[t]=e[t]},v={parser:l.p,db:l.f,renderer:y.f,styles:y.a,init:e=>{e.flowchart||(e.flowchart={}),e.flowchart.arrowMarkerAbsolute=e.arrowMarkerAbsolute,k(e.flowchart),l.f.clear(),l.f.setGen("gen-1")}}},92887:function(e,t,r){r.d(t,{a:function(){return w},f:function(){return g}});var l=r(42521),a=r(27509),o=r(71421),n=r(83880),i=r(91584),s=r(19324),c=r(73660),d=(e,t)=>s.Z.lang.round(c.Z.parse(e)[t]),p=r(78139);let u={},b=function(e,t,r,l,a,n){let s=l.select(`[id="${r}"]`);Object.keys(e).forEach(function(r){let l;let c=e[r],d="default";c.classes.length>0&&(d=c.classes.join(" ")),d+=" flowchart-label";let p=(0,o.k)(c.styles),u=void 0!==c.text?c.text:c.id;if(o.l.info("vertex",c,c.labelType),"markdown"===c.labelType)o.l.info("vertex",c,c.labelType);else if((0,o.m)((0,o.c)().flowchart.htmlLabels)){let e={label:u.replace(/fa[blrs]?:fa-[\w-]+/g,e=>`<i class='${e.replace(":"," ")}'></i>`)};(l=(0,i.a)(s,e).node()).parentNode.removeChild(l)}else{let e=a.createElementNS("http://www.w3.org/2000/svg","text");for(let t of(e.setAttribute("style",p.labelStyle.replace("color:","fill:")),u.split(o.e.lineBreakRegex))){let r=a.createElementNS("http://www.w3.org/2000/svg","tspan");r.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),r.setAttribute("dy","1em"),r.setAttribute("x","1"),r.textContent=t,e.appendChild(r)}l=e}let b=0,f="";switch(c.type){case"round":b=5,f="rect";break;case"square":case"group":default:f="rect";break;case"diamond":f="question";break;case"hexagon":f="hexagon";break;case"odd":case"odd_right":f="rect_left_inv_arrow";break;case"lean_right":f="lean_right";break;case"lean_left":f="lean_left";break;case"trapezoid":f="trapezoid";break;case"inv_trapezoid":f="inv_trapezoid";break;case"circle":f="circle";break;case"ellipse":f="ellipse";break;case"stadium":f="stadium";break;case"subroutine":f="subroutine";break;case"cylinder":f="cylinder";break;case"doublecircle":f="doublecircle"}t.setNode(c.id,{labelStyle:p.labelStyle,shape:f,labelText:u,labelType:c.labelType,rx:b,ry:b,class:d,style:p.style,id:c.id,link:c.link,linkTarget:c.linkTarget,tooltip:n.db.getTooltip(c.id)||"",domId:n.db.lookUpDomId(c.id),haveCallback:c.haveCallback,width:"group"===c.type?500:void 0,dir:c.dir,type:c.type,props:c.props,padding:(0,o.c)().flowchart.padding}),o.l.info("setNode",{labelStyle:p.labelStyle,labelType:c.labelType,shape:f,labelText:u,rx:b,ry:b,class:d,style:p.style,id:c.id,domId:n.db.lookUpDomId(c.id),width:"group"===c.type?500:void 0,type:c.type,dir:c.dir,props:c.props,padding:(0,o.c)().flowchart.padding})})},f=function(e,t,r){let l,n;o.l.info("abc78 edges = ",e);let i=0,s={};if(void 0!==e.defaultStyle){let t=(0,o.k)(e.defaultStyle);l=t.style,n=t.labelStyle}e.forEach(function(r){i++;let c="L-"+r.start+"-"+r.end;void 0===s[c]?s[c]=0:s[c]++,o.l.info("abc78 new entry",c,s[c]);let d=c+"-"+s[c];o.l.info("abc78 new link id to be used is",c,d,s[c]);let p="LS-"+r.start,b="LE-"+r.end,f={style:"",labelStyle:""};switch(f.minlen=r.length||1,"arrow_open"===r.type?f.arrowhead="none":f.arrowhead="normal",f.arrowTypeStart="arrow_open",f.arrowTypeEnd="arrow_open",r.type){case"double_arrow_cross":f.arrowTypeStart="arrow_cross";case"arrow_cross":f.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":f.arrowTypeStart="arrow_point";case"arrow_point":f.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":f.arrowTypeStart="arrow_circle";case"arrow_circle":f.arrowTypeEnd="arrow_circle"}let h="",g="";switch(r.stroke){case"normal":h="fill:none;",void 0!==l&&(h=l),void 0!==n&&(g=n),f.thickness="normal",f.pattern="solid";break;case"dotted":f.thickness="normal",f.pattern="dotted",f.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":f.thickness="thick",f.pattern="solid",f.style="stroke-width: 3.5px;fill:none;";break;case"invisible":f.thickness="invisible",f.pattern="solid",f.style="stroke-width: 0;fill:none;"}if(void 0!==r.style){let e=(0,o.k)(r.style);h=e.style,g=e.labelStyle}f.style=f.style+=h,f.labelStyle=f.labelStyle+=g,void 0!==r.interpolate?f.curve=(0,o.n)(r.interpolate,a.c_6):void 0!==e.defaultInterpolate?f.curve=(0,o.n)(e.defaultInterpolate,a.c_6):f.curve=(0,o.n)(u.curve,a.c_6),void 0===r.text?void 0!==r.style&&(f.arrowheadStyle="fill: #333"):(f.arrowheadStyle="fill: #333",f.labelpos="c"),f.labelType=r.labelType,f.label=r.text.replace(o.e.lineBreakRegex,"\n"),void 0===r.style&&(f.style=f.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),f.labelStyle=f.labelStyle.replace("color:","fill:"),f.id=d,f.classes="flowchart-link "+p+" "+b,t.setEdge(r.start,r.end,f,i)})},h=async function(e,t,r,i){let s,c;o.l.info("Drawing flowchart");let d=i.db.getDirection();void 0===d&&(d="TD");let{securityLevel:p,flowchart:u}=(0,o.c)(),h=u.nodeSpacing||50,g=u.rankSpacing||50;"sandbox"===p&&(s=(0,a.Ys)("#i"+t));let y="sandbox"===p?(0,a.Ys)(s.nodes()[0].contentDocument.body):(0,a.Ys)("body"),w="sandbox"===p?s.nodes()[0].contentDocument:document,x=new l.k({multigraph:!0,compound:!0}).setGraph({rankdir:d,nodesep:h,ranksep:g,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}}),k=i.db.getSubGraphs();o.l.info("Subgraphs - ",k);for(let e=k.length-1;e>=0;e--)c=k[e],o.l.info("Subgraph - ",c),i.db.addVertex(c.id,{text:c.title,type:c.labelType},"group",void 0,c.classes,c.dir);let v=i.db.getVertices(),m=i.db.getEdges();o.l.info("Edges",m);let T=0;for(T=k.length-1;T>=0;T--){c=k[T],(0,a.td_)("cluster").append("text");for(let e=0;e<c.nodes.length;e++)o.l.info("Setting up subgraphs",c.nodes[e],c.id),x.setParent(c.nodes[e],c.id)}b(v,x,t,y,w,i),f(m,x);let S=y.select(`[id="${t}"]`),_=y.select("#"+t+" g");if(await (0,n.r)(_,x,["point","circle","cross"],"flowchart",t),o.u.insertTitle(S,"flowchartTitleText",u.titleTopMargin,i.db.getDiagramTitle()),(0,o.o)(x,S,u.diagramPadding,u.useMaxWidth),i.db.indexNodes("subGraph"+T),!u.htmlLabels)for(let e of w.querySelectorAll('[id="'+t+'"] .edgeLabel .label')){let t=e.getBBox(),r=w.createElementNS("http://www.w3.org/2000/svg","rect");r.setAttribute("rx",0),r.setAttribute("ry",0),r.setAttribute("width",t.width),r.setAttribute("height",t.height),e.insertBefore(r,e.firstChild)}Object.keys(v).forEach(function(e){let r=v[e];if(r.link){let l=(0,a.Ys)("#"+t+' [id="'+e+'"]');if(l){let e=w.createElementNS("http://www.w3.org/2000/svg","a");e.setAttributeNS("http://www.w3.org/2000/svg","class",r.classes.join(" ")),e.setAttributeNS("http://www.w3.org/2000/svg","href",r.link),e.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),"sandbox"===p?e.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):r.linkTarget&&e.setAttributeNS("http://www.w3.org/2000/svg","target",r.linkTarget);let t=l.insert(function(){return e},":first-child"),a=l.select(".label-container");a&&t.append(function(){return a.node()});let o=l.select(".label");o&&t.append(function(){return o.node()})}}})},g={setConf:function(e){for(let t of Object.keys(e))u[t]=e[t]},addVertices:b,addEdges:f,getClasses:function(e,t){return t.db.getClasses()},draw:h},y=(e,t)=>{let r=d(e,"r"),l=d(e,"g"),a=d(e,"b");return p.Z(r,l,a,t)},w=e=>`.label {
    font-family: ${e.fontFamily};
    color: ${e.nodeTextColor||e.textColor};
  }
  .cluster-label text {
    fill: ${e.titleColor};
  }
  .cluster-label span,p {
    color: ${e.titleColor};
  }

  .label text,span,p {
    fill: ${e.nodeTextColor||e.textColor};
    color: ${e.nodeTextColor||e.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${e.mainBkg};
    stroke: ${e.nodeBorder};
    stroke-width: 1px;
  }
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${e.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${e.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${e.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${e.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${e.edgeLabelBackground};
      fill: ${e.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${y(e.edgeLabelBackground,.5)};
    // background-color: 
  }

  .cluster rect {
    fill: ${e.clusterBkg};
    stroke: ${e.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${e.titleColor};
  }

  .cluster span,p {
    color: ${e.titleColor};
  }
  /* .cluster div {
    color: ${e.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${e.fontFamily};
    font-size: 12px;
    background: ${e.tertiaryColor};
    border: 1px solid ${e.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.textColor};
  }
`}}]);