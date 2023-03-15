var totalNodes = 0, oldTotalNodes = 0, maxLabelLength = 0;

var selectedNode = null, draggingNode = null;

var panSpeed = 200, panBoundary = 20;

var i = 0, duration = 750;

var viewerWidth,viewerHeight,tree,diagonal,svgGroup, baseSvg, root;

const CIRCLE_SIZE_PIXELS = 20;

var cocienteNodes = 0, oldCocienteNodes = 0, zoom_max = 3;
var zoom_current = 3;

function startD3Tree(){
    const container_tree = document.getElementById("tree-container").parentElement;
    viewerWidth = $(container_tree).width();
    viewerHeight = $(container_tree).height();    

    tree = d3.layout.tree()
        .size([viewerHeight, viewerWidth]);
    
    diagonal = d3.svg.diagonal()
        .projection(function(d) {
            return [d.y, d.x];
        });

    baseSvg = d3.select("#tree-container").append("svg")
        .attr("width", viewerWidth)
        .attr("height", viewerHeight)
        .attr("class", "overlay")
        .call(zoomListener);        
    svgGroup = baseSvg.append("g");
    zoomListener.scale(3);

    D3Tree(tree_mrp);
	
	d3buttonslisteners();
	window.addEventListener("resize", resetD3TreeOnResize, false);
}
function d3buttonslisteners(){
	/* BOTONES */
    document.querySelector("button[tree-download='true']").addEventListener("click",function(e){
        e.stopPropagation();

        var svgString = getSVGString(baseSvg.node());
        svgString2Image( svgString, 2*viewerWidth, 2*viewerHeight, 'png', save );
    
        function save( dataBlob, filesize ){
            saveAs( dataBlob, 'Archivo Grafo.png' );
        }

    }, false);

    document.querySelector("button[tree-reload='true']").addEventListener("click",function(e){
		e.stopPropagation();

		scale = zoomListener.scale();
		x = -root.y0 * scale + viewerWidth / 4;
		y = -root.x0 * scale + viewerHeight / 2;
		svgGroup.attr("transform", "translate(" + x+","+y + ")scale(" + 3 + ")");
		zoomListener.scale(3);
		zoomListener.translate([x, y]);

		// doble vez para corregir el bug de que a la 1era no se centra del todo
		scale = zoomListener.scale();
		x = -root.y0 * scale + viewerWidth / 4;
		y = -root.x0 * scale + viewerHeight / 2;
		svgGroup.attr("transform", "translate(" + x+","+y + ")scale(" + 3 + ")");
		zoomListener.scale(3);
		zoomListener.translate([x, y]);		
	}, false);
	
	
    document.querySelector("button[tree-plus='true']").addEventListener("click",function(e){
		e.stopPropagation();
		zoom_current = Math.clip(zoom_current + zoom_max/5, zoom_min, zoom_max); 	
		scale = zoomListener.scale();
		x = -root.y0 * scale + viewerWidth / 4;
		y = -root.x0 * scale + viewerHeight / 2;
		var t = [x, y]	
		svgGroup.attr("transform", "translate(" + t + ")scale(" + zoom_current + ")");
		zoomListener.scale(zoom_current);
		zoomListener.translate(t);
	}, false);	
	
    document.querySelector("button[tree-minus='true']").addEventListener("click",function(e){
		e.stopPropagation();
		zoom_current = Math.clip(zoom_current - zoom_max/5, zoom_min, zoom_max); 
		scale = zoomListener.scale();
		x = -root.y0 * scale + viewerWidth / 4;
		y = -root.x0 * scale + viewerHeight / 2;
		var t = [x, y]
		svgGroup.attr("transform", "translate(" + t + ")scale(" + zoom_current + ")");
		zoomListener.scale(zoom_current);	
		zoomListener.translate(t);
	}, false);
}
function resetD3TreeOnResize(){
	// CLEAN ALL THE CONTENT INSIDE
	document.getElementById("tree-container").innerHTML = "";
	
	const container_tree = document.getElementById("tree-container").parentElement;
    viewerWidth = $(container_tree).width();
    viewerHeight = $(container_tree).height();    

    tree = d3.layout.tree()
        .size([viewerHeight, viewerWidth]);
    
    diagonal = d3.svg.diagonal()
        .projection(function(d) {
            return [d.y, d.x];
        });

    baseSvg = d3.select("#tree-container").append("svg")
        .attr("width", viewerWidth)
        .attr("height", viewerHeight)
        .attr("class", "overlay")
        .call(zoomListener);        
    svgGroup = baseSvg.append("g");
    zoomListener.scale(3);

	D3Tree(tree_mrp);
	d3buttonslisteners();
}

function D3Tree(treeData){

    const copy_tree = JSON.parse(JSON.stringify(treeData));
 
    oldTotalNodes = totalNodes;

    visitD3Tree(copy_tree, function(d) {
        totalNodes++;
        maxLabelLength = Math.max(d.name.length, maxLabelLength);
    }, function(d) {
        return d.children && d.children.length > 0 ? d.children : null;
    });

    root = copy_tree;
    root.x0 = viewerHeight;
    root.y0 = 0;
    
    update(root);
    centerNode(root);
}


//window.addEventListener("load", startD3Tree, false);


/********************************************************************************************* */
// funcion para generar el download link, mismo codigo del else del de arriba
function downloadLink(filename, url){
        /* CODIGO VIEJO DENTRO DEL BOTON DE DESCARGAR
        const svg = e.target.parentElement.parentElement.children[1].children[0].children[0];
        const canvas = document.createElement('canvas');
        canvas.width = viewerWidth;
        canvas.height = viewerHeight;
        var data = (new XMLSerializer()).serializeToString(svg);    
          
        // usage:
        drawInlineSVG(canvas.getContext("2d"), data, function() {
            downloadLink("Archivo.png", canvas.toDataURL());
        });

        */
    const elem = window.document.createElement('a');
    elem.href = url;
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}
function drawInlineSVG(ctx, rawSVG, callback) {

    var svg = new Blob([rawSVG], {type:"image/svg+xml;charset=utf-8"}),
        domURL = self.URL || self.webkitURL || self,
        url = domURL.createObjectURL(svg),
        img = new Image;

    img.onload = function () {
        ctx.drawImage(this, 0, 0);     
        domURL.revokeObjectURL(url);
        callback(this);
    };

    img.src = url;
}





















// Below are the functions that handle actual exporting:
// getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
function getSVGString( svgNode ) {
	svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
	var cssStyleText = getCSSStyles( svgNode );
	appendCSS( cssStyleText, svgNode );

	var serializer = new XMLSerializer();
	var svgString = serializer.serializeToString(svgNode);
	svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
	svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

	return svgString;

	function getCSSStyles( parentElement ) {
		var selectorTextArr = [];

		// Add Parent element Id and Classes to the list
		selectorTextArr.push( '#'+parentElement.id );
		for (var c = 0; c < parentElement.classList.length; c++)
				if ( !contains('.'+parentElement.classList[c], selectorTextArr) )
					selectorTextArr.push( '.'+parentElement.classList[c] );

		// Add Children element Ids and Classes to the list
		var nodes = parentElement.getElementsByTagName("*");
		for (var i = 0; i < nodes.length; i++) {
			var id = nodes[i].id;
			if ( !contains('#'+id, selectorTextArr) )
				selectorTextArr.push( '#'+id );

			var classes = nodes[i].classList;
			for (var c = 0; c < classes.length; c++)
				if ( !contains('.'+classes[c], selectorTextArr) )
					selectorTextArr.push( '.'+classes[c] );
		}

		// Extract CSS Rules
		var extractedCSSText = "";
		for (var i = 0; i < document.styleSheets.length; i++) {
			var s = document.styleSheets[i];
			
			try {
			    if(!s.cssRules) continue;
			} catch( e ) {
		    		if(e.name !== 'SecurityError') throw e; // for Firefox
		    		continue;
		    	}

			var cssRules = s.cssRules;
			for (var r = 0; r < cssRules.length; r++) {
				if ( contains( cssRules[r].selectorText, selectorTextArr ) )
					extractedCSSText += cssRules[r].cssText;
			}
		}
		

		return extractedCSSText;

		function contains(str,arr) {
			return arr.indexOf( str ) === -1 ? false : true;
		}

	}

	function appendCSS( cssText, element ) {
		var styleElement = document.createElement("style");
		styleElement.setAttribute("type","text/css"); 
		styleElement.innerHTML = cssText;
		var refNode = element.hasChildNodes() ? element.children[0] : null;
		element.insertBefore( styleElement, refNode );
	}
}


function svgString2Image( svgString, width, height, format, callback ) {
	var format = format ? format : 'png';

	var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svgString ) ) ); // Convert SVG string to data URL

	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");

	canvas.width = width;
	canvas.height = height;

	var image = new Image();
	image.onload = function() {
		context.clearRect ( 0, 0, width, height );
		context.drawImage(image, 0, 0, width, height);

		canvas.toBlob( function(blob) {
			var filesize = Math.round( blob.length/1024 ) + ' KB';
			if ( callback ) callback( blob, filesize );
		});

		
	};

	image.src = imgsrc;
}
