var totalNodes = 0, maxLabelLength = 0;

var selectedNode = null, draggingNode = null;

var panSpeed = 200, panBoundary = 20;

var i = 0, duration = 750;

var viewerWidth,viewerHeight,tree,diagonal,svgGroup, baseSvg, root;

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
    zoomListener.scale(2);

    D3Tree(tree_mrp);
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
    root.x0 = viewerHeight / 2;
    root.y0 = 0;
    
    update(root);
    centerNode(root);
}


//window.addEventListener("load", startD3Tree, false);