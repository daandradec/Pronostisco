var totalNodes = 0, maxLabelLength = 0;

var selectedNode = null, draggingNode = null;

var panSpeed = 200, panBoundary = 20;

var i = 0, duration = 750;

var viewerWidth,viewerHeight,tree,diagonal,svgGroup, baseSvg, root;

const CIRCLE_SIZE_PIXELS = 20;

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

    document.querySelector("button[tree-download='true']").addEventListener("click",function(e){
        e.stopPropagation();
        const svg = e.target.parentElement.parentElement.children[1].children[0].children[0];
        const canvas = document.createElement('canvas');
        canvas.width = viewerWidth;
        canvas.height = viewerHeight;
        var data = (new XMLSerializer()).serializeToString(svg);    
        /* We can just create a canvas element inline so you don't even need one on the DOM. Cool!
        canvg(canvas, data, {
            renderCallback: function() {
              canvas.toBlob(function(blob) {
                  download('MyImageName.png', blob);
              });
            }
          });  */ 
          
        // usage:
        drawInlineSVG(canvas.getContext("2d"), data, function() {
            downloadLink("Archivo.png", canvas.toDataURL());
        });
    }, false);
}

function D3Tree(treeData){
    const copy_tree = JSON.parse(JSON.stringify(treeData));

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


//  VERSION 1 CON CANVG
function download(filename, /* string */ blob /* Blob*/) {
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
}

// funcion para generar el download link, mismo codigo del else del de arriba
function downloadLink(filename, url){
    const elem = window.document.createElement('a');
    elem.href = url;
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}
  


  // VERSION 2 SIN CANVG
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