"use strict";(self.rspackChunkpushy_site=self.rspackChunkpushy_site||[]).push([["y"],{Ba(e,t,l){var r=l("JP");l.d(t,{},{H:function(e,t){var l=e.append("foreignObject").attr("width","100000"),a=l.append("xhtml:div");a.attr("xmlns","http://www.w3.org/1999/xhtml");var o=t.label;switch(typeof o){case"function":a.insert(o);break;case"object":a.insert(function(){return o});break;default:a.html(o)}r.AV(a,t.labelStyle),a.style("display","inline-block"),a.style("white-space","nowrap");var n=a.node().getBoundingClientRect();return l.attr("width",n.width).attr("height",n.height),l}})},JP(e,t,l){var r=l("ON"),a=l("UR"),o=/:/g;function n(e){return e?String(e).replace(o,"\\:"):""}l.d(t,{},{AV:function(e,t){t&&e.attr("style",t)},De:function(e,t){return!!e.children(t).length},c$:function(e,t){var l=t.graph();if(r.A(l)){var o=l.transition;if(a.A(o))return o(e)}return e},gh:function(e){return n(e.v)+":"+n(e.w)+":"+n(e.name)},nh:function(e,t,l){t&&e.attr("class",t).attr("class",l+" "+e.attr("class"))}})},gjz(e,t,l){var r=l("Wq"),a=l("ja");t.A=(e,t)=>r.A.lang.round(a.A.parse(e)[t])},w3(e,t,l){l.d(t,{diagram:()=>f});var r=l("w7"),a=l("NK"),o=l("xC"),n=l("MI"),i=l("oZ"),s=l("JP"),d=l("Ba");l("Km"),l("BZ");l("OJ");o.lU;l("v2u");var c=l("Yo"),p=l("Ev");l("h0"),l("tP"),l("Lu"),l("tD");let b={},w=function(e){for(let t of Object.keys(e))b[t]=e[t]},f={parser:r.p,db:r.f,renderer:p.f,styles:p.a,init:e=>{e.flowchart||(e.flowchart={}),e.flowchart.arrowMarkerAbsolute=e.arrowMarkerAbsolute,w(e.flowchart),r.f.clear(),r.f.setGen("gen-1")}}},Ev(e,t,l){var r=l("xC"),a=l("NK"),o=l("Ba"),n=l("v2u"),i=l("FK"),s=l("Yo"),d=l("gjz"),c=l("Cv");let p={},b=async function(e,t,l,r,a,n){let i=r.select(`[id="${l}"]`);for(let l of Object.keys(e)){let r,d=e[l],c="default";d.classes.length>0&&(c=d.classes.join(" ")),c+=" flowchart-label";let p=(0,s.k)(d.styles),b=void 0!==d.text?d.text:d.id;if(s.l.info("vertex",d,d.labelType),"markdown"===d.labelType)s.l.info("vertex",d,d.labelType);else if((0,s.m)((0,s.c)().flowchart.htmlLabels)){let e={label:b};(r=(0,o.H)(i,e).node()).parentNode.removeChild(r)}else{let e=a.createElementNS("http://www.w3.org/2000/svg","text");for(let t of(e.setAttribute("style",p.labelStyle.replace("color:","fill:")),b.split(s.e.lineBreakRegex))){let l=a.createElementNS("http://www.w3.org/2000/svg","tspan");l.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),l.setAttribute("dy","1em"),l.setAttribute("x","1"),l.textContent=t,e.appendChild(l)}r=e}let w=0,f="";switch(d.type){case"round":w=5,f="rect";break;case"square":case"group":default:f="rect";break;case"diamond":f="question";break;case"hexagon":f="hexagon";break;case"odd":case"odd_right":f="rect_left_inv_arrow";break;case"lean_right":f="lean_right";break;case"lean_left":f="lean_left";break;case"trapezoid":f="trapezoid";break;case"inv_trapezoid":f="inv_trapezoid";break;case"circle":f="circle";break;case"ellipse":f="ellipse";break;case"stadium":f="stadium";break;case"subroutine":f="subroutine";break;case"cylinder":f="cylinder";break;case"doublecircle":f="doublecircle"}let u=await (0,s.r)(b,(0,s.c)());t.setNode(d.id,{labelStyle:p.labelStyle,shape:f,labelText:u,labelType:d.labelType,rx:w,ry:w,class:c,style:p.style,id:d.id,link:d.link,linkTarget:d.linkTarget,tooltip:n.db.getTooltip(d.id)||"",domId:n.db.lookUpDomId(d.id),haveCallback:d.haveCallback,width:"group"===d.type?500:void 0,dir:d.dir,type:d.type,props:d.props,padding:(0,s.c)().flowchart.padding}),s.l.info("setNode",{labelStyle:p.labelStyle,labelType:d.labelType,shape:f,labelText:u,rx:w,ry:w,class:c,style:p.style,id:d.id,domId:n.db.lookUpDomId(d.id),width:"group"===d.type?500:void 0,type:d.type,dir:d.dir,props:d.props,padding:(0,s.c)().flowchart.padding})}},w=async function(e,t,l){let a,o;s.l.info("abc78 edges = ",e);let n=0,i={};if(void 0!==e.defaultStyle){let t=(0,s.k)(e.defaultStyle);a=t.style,o=t.labelStyle}for(let l of e){n++;let d="L-"+l.start+"-"+l.end;void 0===i[d]?i[d]=0:i[d]++,s.l.info("abc78 new entry",d,i[d]);let c=d+"-"+i[d];s.l.info("abc78 new link id to be used is",d,c,i[d]);let b="LS-"+l.start,w="LE-"+l.end,f={style:"",labelStyle:""};switch(f.minlen=l.length||1,"arrow_open"===l.type?f.arrowhead="none":f.arrowhead="normal",f.arrowTypeStart="arrow_open",f.arrowTypeEnd="arrow_open",l.type){case"double_arrow_cross":f.arrowTypeStart="arrow_cross";case"arrow_cross":f.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":f.arrowTypeStart="arrow_point";case"arrow_point":f.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":f.arrowTypeStart="arrow_circle";case"arrow_circle":f.arrowTypeEnd="arrow_circle"}let u="",h="";switch(l.stroke){case"normal":u="fill:none;",void 0!==a&&(u=a),void 0!==o&&(h=o),f.thickness="normal",f.pattern="solid";break;case"dotted":f.thickness="normal",f.pattern="dotted",f.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":f.thickness="thick",f.pattern="solid",f.style="stroke-width: 3.5px;fill:none;";break;case"invisible":f.thickness="invisible",f.pattern="solid",f.style="stroke-width: 0;fill:none;"}if(void 0!==l.style){let e=(0,s.k)(l.style);u=e.style,h=e.labelStyle}f.style=f.style+=u,f.labelStyle=f.labelStyle+=h,void 0!==l.interpolate?f.curve=(0,s.n)(l.interpolate,r.lU):void 0!==e.defaultInterpolate?f.curve=(0,s.n)(e.defaultInterpolate,r.lU):f.curve=(0,s.n)(p.curve,r.lU),void 0===l.text?void 0!==l.style&&(f.arrowheadStyle="fill: #333"):(f.arrowheadStyle="fill: #333",f.labelpos="c"),f.labelType=l.labelType,f.label=await (0,s.r)(l.text.replace(s.e.lineBreakRegex,"\n"),(0,s.c)()),void 0===l.style&&(f.style=f.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),f.labelStyle=f.labelStyle.replace("color:","fill:"),f.id=c,f.classes="flowchart-link "+b+" "+w,t.setEdge(l.start,l.end,f,n)}};l.d(t,{},{a:e=>{var t;let l,r,a,o;return`.label {
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
    background-color: ${t=e.edgeLabelBackground,r=(l=d.A)(t,"r"),a=l(t,"g"),o=l(t,"b"),c.A(r,a,o,.5)};
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
`},f:{setConf:function(e){for(let t of Object.keys(e))p[t]=e[t]},addVertices:b,addEdges:w,getClasses:function(e,t){return t.db.getClasses()},draw:async function(e,t,l,r){let o,d;s.l.info("Drawing flowchart");let c=r.db.getDirection();void 0===c&&(c="TD");let{securityLevel:p,flowchart:f}=(0,s.c)(),u=f.nodeSpacing||50,h=f.rankSpacing||50;"sandbox"===p&&(o=(0,a.Lt)("#i"+t));let g="sandbox"===p?(0,a.Lt)(o.nodes()[0].contentDocument.body):(0,a.Lt)("body"),y="sandbox"===p?o.nodes()[0].contentDocument:document,k=new n.T({multigraph:!0,compound:!0}).setGraph({rankdir:c,nodesep:u,ranksep:h,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}}),x=r.db.getSubGraphs();s.l.info("Subgraphs - ",x);for(let e=x.length-1;e>=0;e--)d=x[e],s.l.info("Subgraph - ",d),r.db.addVertex(d.id,{text:d.title,type:d.labelType},"group",void 0,d.classes,d.dir);let v=r.db.getVertices(),m=r.db.getEdges();s.l.info("Edges",m);let S=0;for(S=x.length-1;S>=0;S--){d=x[S],(0,a.Ub)("cluster").append("text");for(let e=0;e<d.nodes.length;e++)s.l.info("Setting up subgraphs",d.nodes[e],d.id),k.setParent(d.nodes[e],d.id)}await b(v,k,t,g,y,r),await w(m,k);let T=g.select(`[id="${t}"]`),C=g.select("#"+t+" g");if(await (0,i.r)(C,k,["point","circle","cross"],"flowchart",t),s.u.insertTitle(T,"flowchartTitleText",f.titleTopMargin,r.db.getDiagramTitle()),(0,s.o)(k,T,f.diagramPadding,f.useMaxWidth),r.db.indexNodes("subGraph"+S),!f.htmlLabels)for(let e of y.querySelectorAll('[id="'+t+'"] .edgeLabel .label')){let t=e.getBBox(),l=y.createElementNS("http://www.w3.org/2000/svg","rect");l.setAttribute("rx",0),l.setAttribute("ry",0),l.setAttribute("width",t.width),l.setAttribute("height",t.height),e.insertBefore(l,e.firstChild)}Object.keys(v).forEach(function(e){let l=v[e];if(l.link){let r=(0,a.Lt)("#"+t+' [id="'+e+'"]');if(r){let e=y.createElementNS("http://www.w3.org/2000/svg","a");e.setAttributeNS("http://www.w3.org/2000/svg","class",l.classes.join(" ")),e.setAttributeNS("http://www.w3.org/2000/svg","href",l.link),e.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),"sandbox"===p?e.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):l.linkTarget&&e.setAttributeNS("http://www.w3.org/2000/svg","target",l.linkTarget);let t=r.insert(function(){return e},":first-child"),a=r.select(".label-container");a&&t.append(function(){return a.node()});let o=r.select(".label");o&&t.append(function(){return o.node()})}}})}}})}}]);