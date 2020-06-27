function linkrevive()
  {
   var nodes = document.getElementsByTagName("span");
   var tlist = parent.document.getElementById("list");
   var textnd;
   var linknd;
   var sx;
   var sl;
   var i;
   var b;
   var s,v;
   var enkle;
   var ier;

   for (s=nodes.length-1; s>=0; s--)
       { // bei span mit title="pvdlink id", "pvdlink url", "pvdlink title" und "pvdlink otitle" Verknüpfung basteln
        if (nodes[s].className=="pvdlink" && (nodes[s].title.length>13 && nodes[s].title.substring(8,10)=="id" || nodes[s].title.length>14 && nodes[s].title.substring(8,11)=="url" || nodes[s].title.length>16 && tlist && nodes[s].title.substring(8,13)=="title" || nodes[s].title.length>17 && tlist && nodes[s].title.substring(8,14)=="otitle"))
           {
            enkle = nodes[s].childNodes;
            ier = "";
            for (v=0; v<enkle.length; v++)
                {
                 if (enkle[v].nodeType==3) {ier += enkle[v].data;} // Text aus span zusammenfügen
                 v=0;
                }
            if (ier.length>0)
               {
                linknd = document.createElement("a");
                textnd = document.createTextNode(ier);
                if (nodes[s].title.charAt(8)=='i') //pvdlink id...
                {
                 ier = nodes[s].title.substring(12,nodes[s].title.length-1);
                 sl=tlist.getElementsByTagName("a");
                 b=false;
                 for (i=0; (i<sl.length && !b); i++) //link überprüfen...
                 {
                   v=sl[i].href.length-5;
                   if (v>ier.length && sl[i].href.substring(v-ier.length,v) == ier)
                   {b=true;}
                 }
                 if (b)
                 {
                   ier = "movie" + ier + ".html";
                 }
                 else
                 {ier="";}
                 v=0;
                }
                else if (nodes[s].title.charAt(8)=='t' || nodes[s].title.charAt(8)=='o') //pvdlink title/otitle...
                {
                 ier="";
                 if (nodes[s].title.charAt(8)=='t')
                 {i=15;}
                 else
                 {i=16;}
                 sx = nodes[s].title.substring(i,nodes[s].title.length-1);
                 sl=tlist.getElementsByTagName("span");
                 v=0;
                 if (nodes[s].title.charAt(8)=='t')
                 {b=true;}
                 else
                 {b=false;}
                 while (v<=1)
                 {
                   for (i=0; i<sl.length; i++)
                   {
                 	   if (sl[i].firstChild && (b && sl[i].className == "mtitle" && sl[i].firstChild.data==sx || !b && sl[i].className == "otitle" && sl[i].firstChild.data==(" ("+sx+")")))
                 	   {
                 	     if (sl[i].parentNode.href)
                 	     {ier = sl[i].parentNode.href;}
                         i=sl.length+1;
                 	   }
                   }
                   if (i==sl.length && v==0) // if nothing was found search title instead of origtitle, or vice versa...
                   {
                    v=1;
                    b=(!b);
                   }
                   else
                   {v=2;}
                 }
                 v=0;
                }
                else // pvdlink url...
                {
                 ier = nodes[s].title.substring(13,nodes[s].title.length-1);
                 if (ier.charAt(0)=='"')
                 {
                  v = ier.lastIndexOf('"');
                  if (v<=1) {v=ier.length();}
                  ier = "file:///" + ier.substring(1,v);
                 }
                 else if (ier.length>1 && (ier.charAt(1)==':' || ier.charAt(1)=='|'))
                 {ier = "file:///" + ier;}
                 ier = ier.replace(/\\/g, "/");
                 ier = ier.replace(/ /g, "%20");
                 v=1;
                }
                if (ier.length>0)
                {
                 linknd.setAttribute("href",ier);
                 if (v) {linknd.setAttribute("target","_parent");}
                 linknd.appendChild(textnd);
                 nodes[s].parentNode.replaceChild(linknd, nodes[s]);
                }
               }
           }
       }
  }

function removeemptyfields()
  {
   var nodes = document.getElementsByTagName("p");
   var i;
   for (i=0; i<nodes.length; i++)
   {
    if (!nodes[i].hasChildNodes() && nodes[i].previousSibling && nodes[i].previousSibling.nodeName.toLowerCase() == "h2")
    {
     nodes[i].previousSibling.style.display="none";
     nodes[i].style.display="none";
    }
	// Modified by DINO 08.03.2014 - begin
	if (nodes[i].hasChildNodes() && nodes[i].firstChild.nodeName.toLowerCase() == "b" && nodes[i].lastChild.nodeValue == null && nodes[i].lastChild.nodeName.toLowerCase() !== "a" && nodes[i].previousSibling && nodes[i].previousSibling.nodeName.toLowerCase() == "br")
	{
	 //nodes[i].lastChild.nodeValue = "Lastdino" //linie buna
	 //alert("1:" + nodes[i].childNodes[0].nodeValue + " 2:" + nodes[i].innerHTML + " 3:" + nodes[i].lastChild.nodeValue)
	 nodes[i].previousSibling.style.display="none";
	 nodes[i].style.display="none";
	}
	// Modified by DINO 08.03.2014 - end
   }
  }