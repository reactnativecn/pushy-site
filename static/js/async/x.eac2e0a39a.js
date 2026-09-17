"use strict";(self.rspackChunkpushy_site=self.rspackChunkpushy_site||[]).push([["x"],{Ba(e,t,l){var r=l("JP");function a(e,t){var l=e.append("foreignObject").attr("width","100000"),a=l.append("xhtml:div");a.attr("xmlns","http://www.w3.org/1999/xhtml");var o=t.label;switch(typeof o){case"function":a.insert(o);break;case"object":a.insert(function(){return o});break;default:a.html(o)}r.AV(a,t.labelStyle),a.style("display","inline-block"),a.style("white-space","nowrap");var n=a.node().getBoundingClientRect();return l.attr("width",n.width).attr("height",n.height),l}l.d(t,{H:()=>a})},JP(e,t,l){var r=l("ON"),a=l("UR");function o(e,t){return!!e.children(t).length}function n(e){return s(e.v)+":"+s(e.w)+":"+s(e.name)}var i=/:/g;function s(e){return e?String(e).replace(i,"\\:"):""}function d(e,t){t&&e.attr("style",t)}function c(e,t,l){t&&e.attr("class",t).attr("class",l+" "+e.attr("class"))}function p(e,t){var l=t.graph();if(r.A(l)){var o=l.transition;if(a.A(o))return o(e)}return e}l.d(t,{AV:()=>d,De:()=>o,c$:()=>p,gh:()=>n,nh:()=>c})},gjz(e,t,l){var r=l("Wq"),a=l("ja");t.A=(e,t)=>r.A.lang.round(a.A.parse(e)[t])},Hr(e,t,l){var r=l("w7"),a=l("Ev"),o=l("Yo");l("my"),l("v2u"),l("oZ"),l("tD"),l("h0"),l("tP"),l("Lu");let n={parser:r.p,db:r.f,renderer:a.f,styles:a.a,init:e=>{e.flowchart||(e.flowchart={}),e.flowchart.arrowMarkerAbsolute=e.arrowMarkerAbsolute,(0,o.p)({flowchart:{arrowMarkerAbsolute:e.arrowMarkerAbsolute}}),a.f.setConf(e.flowchart),r.f.clear(),r.f.setGen("gen-2")}};l.d(t,{},{diagram:n})},Ev(e,t,l){var r=l("my"),a=l("Ba"),o=l("v2u"),n=l("FK"),i=l("Yo"),s=l("gjz"),d=l("Cv");let c={},p=async function(e,t,l,r,o,n){let s=r.select(`[id="${l}"]`);for(let l of Object.keys(e)){let r,d=e[l],c="default";d.classes.length>0&&(c=d.classes.join(" ")),c+=" flowchart-label";let p=(0,i.k)(d.styles),b=void 0!==d.text?d.text:d.id;if(i.l.info("vertex",d,d.labelType),"markdown"===d.labelType)i.l.info("vertex",d,d.labelType);else if((0,i.m)((0,i.c)().flowchart.htmlLabels)){let e={label:b};(r=(0,a.H)(s,e).node()).parentNode.removeChild(r)}else{let e=o.createElementNS("http://www.w3.org/2000/svg","text");for(let t of(e.setAttribute("style",p.labelStyle.replace("color:","fill:")),b.split(i.e.lineBreakRegex))){let l=o.createElementNS("http://www.w3.org/2000/svg","tspan");l.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),l.setAttribute("dy","1em"),l.setAttribute("x","1"),l.textContent=t,e.appendChild(l)}r=e}let w=0,u="";switch(d.type){case"round":w=5,u="rect";break;case"square":case"group":default:u="rect";break;case"diamond":u="question";break;case"hexagon":u="hexagon";break;case"odd":case"odd_right":u="rect_left_inv_arrow";break;case"lean_right":u="lean_right";break;case"lean_left":u="lean_left";break;case"trapezoid":u="trapezoid";break;case"inv_trapezoid":u="inv_trapezoid";break;case"circle":u="circle";break;case"ellipse":u="ellipse";break;case"stadium":u="stadium";break;case"subroutine":u="subroutine";break;case"cylinder":u="cylinder";break;case"doublecircle":u="doublecircle"}let f=await (0,i.r)(b,(0,i.c)());t.setNode(d.id,{labelStyle:p.labelStyle,shape:u,labelText:f,labelType:d.labelType,rx:w,ry:w,class:c,style:p.style,id:d.id,link:d.link,linkTarget:d.linkTarget,tooltip:n.db.getTooltip(d.id)||"",domId:n.db.lookUpDomId(d.id),haveCallback:d.haveCallback,width:"group"===d.type?500:void 0,dir:d.dir,type:d.type,props:d.props,padding:(0,i.c)().flowchart.padding}),i.l.info("setNode",{labelStyle:p.labelStyle,labelType:d.labelType,shape:u,labelText:f,rx:w,ry:w,class:c,style:p.style,id:d.id,domId:n.db.lookUpDomId(d.id),width:"group"===d.type?500:void 0,type:d.type,dir:d.dir,props:d.props,padding:(0,i.c)().flowchart.padding})}},b=async function(e,t,l){let a,o;i.l.info("abc78 edges = ",e);let n=0,s={};if(void 0!==e.defaultStyle){let t=(0,i.k)(e.defaultStyle);a=t.style,o=t.labelStyle}for(let l of e){n++;let d="L-"+l.start+"-"+l.end;void 0===s[d]?s[d]=0:s[d]++,i.l.info("abc78 new entry",d,s[d]);let p=d+"-"+s[d];i.l.info("abc78 new link id to be used is",d,p,s[d]);let b="LS-"+l.start,w="LE-"+l.end,u={style:"",labelStyle:""};switch(u.minlen=l.length||1,"arrow_open"===l.type?u.arrowhead="none":u.arrowhead="normal",u.arrowTypeStart="arrow_open",u.arrowTypeEnd="arrow_open",l.type){case"double_arrow_cross":u.arrowTypeStart="arrow_cross";case"arrow_cross":u.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":u.arrowTypeStart="arrow_point";case"arrow_point":u.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":u.arrowTypeStart="arrow_circle";case"arrow_circle":u.arrowTypeEnd="arrow_circle"}let f="",h="";switch(l.stroke){case"normal":f="fill:none;",void 0!==a&&(f=a),void 0!==o&&(h=o),u.thickness="normal",u.pattern="solid";break;case"dotted":u.thickness="normal",u.pattern="dotted",u.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":u.thickness="thick",u.pattern="solid",u.style="stroke-width: 3.5px;fill:none;";break;case"invisible":u.thickness="invisible",u.pattern="solid",u.style="stroke-width: 0;fill:none;"}if(void 0!==l.style){let e=(0,i.k)(l.style);f=e.style,h=e.labelStyle}u.style=u.style+=f,u.labelStyle=u.labelStyle+=h,void 0!==l.interpolate?u.curve=(0,i.n)(l.interpolate,r.lUB):void 0!==e.defaultInterpolate?u.curve=(0,i.n)(e.defaultInterpolate,r.lUB):u.curve=(0,i.n)(c.curve,r.lUB),void 0===l.text?void 0!==l.style&&(u.arrowheadStyle="fill: #333"):(u.arrowheadStyle="fill: #333",u.labelpos="c"),u.labelType=l.labelType,u.label=await (0,i.r)(l.text.replace(i.e.lineBreakRegex,"\n"),(0,i.c)()),void 0===l.style&&(u.style=u.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),u.labelStyle=u.labelStyle.replace("color:","fill:"),u.id=p,u.classes="flowchart-link "+b+" "+w,t.setEdge(l.start,l.end,u,n)}},w=async function(e,t,l,a){let s,d;i.l.info("Drawing flowchart");let c=a.db.getDirection();void 0===c&&(c="TD");let{securityLevel:w,flowchart:u}=(0,i.c)(),f=u.nodeSpacing||50,h=u.rankSpacing||50;"sandbox"===w&&(s=(0,r.Ltv)("#i"+t));let g="sandbox"===w?(0,r.Ltv)(s.nodes()[0].contentDocument.body):(0,r.Ltv)("body"),y="sandbox"===w?s.nodes()[0].contentDocument:document,k=new o.T({multigraph:!0,compound:!0}).setGraph({rankdir:c,nodesep:f,ranksep:h,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}}),x=a.db.getSubGraphs();i.l.info("Subgraphs - ",x);for(let e=x.length-1;e>=0;e--)d=x[e],i.l.info("Subgraph - ",d),a.db.addVertex(d.id,{text:d.title,type:d.labelType},"group",void 0,d.classes,d.dir);let v=a.db.getVertices(),m=a.db.getEdges();i.l.info("Edges",m);let S=0;for(S=x.length-1;S>=0;S--){d=x[S],(0,r.Ubm)("cluster").append("text");for(let e=0;e<d.nodes.length;e++)i.l.info("Setting up subgraphs",d.nodes[e],d.id),k.setParent(d.nodes[e],d.id)}await p(v,k,t,g,y,a),await b(m,k);let T=g.select(`[id="${t}"]`),_=g.select("#"+t+" g");if(await (0,n.r)(_,k,["point","circle","cross"],"flowchart",t),i.u.insertTitle(T,"flowchartTitleText",u.titleTopMargin,a.db.getDiagramTitle()),(0,i.o)(k,T,u.diagramPadding,u.useMaxWidth),a.db.indexNodes("subGraph"+S),!u.htmlLabels)for(let e of y.querySelectorAll('[id="'+t+'"] .edgeLabel .label')){let t=e.getBBox(),l=y.createElementNS("http://www.w3.org/2000/svg","rect");l.setAttribute("rx",0),l.setAttribute("ry",0),l.setAttribute("width",t.width),l.setAttribute("height",t.height),e.insertBefore(l,e.firstChild)}Object.keys(v).forEach(function(e){let l=v[e];if(l.link){let a=(0,r.Ltv)("#"+t+' [id="'+e+'"]');if(a){let e=y.createElementNS("http://www.w3.org/2000/svg","a");e.setAttributeNS("http://www.w3.org/2000/svg","class",l.classes.join(" ")),e.setAttributeNS("http://www.w3.org/2000/svg","href",l.link),e.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),"sandbox"===w?e.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):l.linkTarget&&e.setAttributeNS("http://www.w3.org/2000/svg","target",l.linkTarget);let t=a.insert(function(){return e},":first-child"),r=a.select(".label-container");r&&t.append(function(){return r.node()});let o=a.select(".label");o&&t.append(function(){return o.node()})}}})};l.d(t,{},{a:e=>{var t;let l,r,a,o;return`.label {
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

  .node .katex path {
    fill: #000;
    stroke: #000;
    stroke-width: 1px;
  }

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
    background-color: ${t=e.edgeLabelBackground,r=(l=s.A)(t,"r"),a=l(t,"g"),o=l(t,"b"),d.A(r,a,o,.5)};
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
`},f:{setConf:function(e){for(let t of Object.keys(e))c[t]=e[t]},addVertices:p,addEdges:b,getClasses:function(e,t){return t.db.getClasses()},draw:w}})}}]);