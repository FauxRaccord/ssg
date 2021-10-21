/*
[vanilla drag n drop] by Nick Mitchell
from https://codepen.io/mitni455/pen/MWKrqpR
*/

const Models = [
]

const Ctrl = {
  onDrag: (el, top, left) => {
    const vm = Models.find(m => m.id === parseInt(el.dataset.id));

    console.log({vm});
  }
}

const droppable = (element, acceptElements) => {
  // const vm = Models.find(m => m.id === el.dataset.id);
  // vm.droppables = acceptElements;

}


const uuid = (()=>{
    var id = 0;
    return ()=>id++;
  })();


const dragndrop = function( elem, strictDrag, limitByParent ) {

  const id = uuid();
  elem.dataset.id = id;
  Models.push({id, el: elem});

	elem.addEventListener("mousedown", onMouseDown);
	elem.addEventListener("change", onChange);

	var startX;
	var startY;

	var startMouseX;
	var startMouseY;

	var parent;
	var limited;

	function refresh() {
		parent = elem.parentNode;
		limited = limitByParent;
		if (limited === undefined && parent) {
			limited = parent.classList.contains(dragndrop.dragndropLimiterClass);
		}
	}

	function setPos( x, y ) {
		if (limited) {
			var xMax = parent.offsetWidth - elem.offsetWidth;
			var yMax = parent.offsetHeight - elem.offsetHeight;

			x = (x > xMax) ? xMax : ((x < 0) ? 0 : x);
			y = (y > yMax) ? yMax : ((y < 0) ? 0 : y);
		}

		elem.style.left = x + "px";
		elem.style.top = y + "px";

    elem.dataset.title = `left: ${x}px, top: ${y}px`

    Ctrl.onDrag(elem, x, y)
	}


	function onMouseDown( e ) {
		if (strictDrag && e.target !== elem) {
			return;
		}

		e.stopPropagation();

		refresh();

		startX = elem.offsetLeft;
		startY = elem.offsetTop;

		startMouseX = e.screenX;
		startMouseY = e.screenY;

    if (window.innerWidth > 1279) {
      // innerWidth를 break point에 따라 변경  //
		document.addEventListener("mouseup", onMouseUp);
		document.addEventListener("mousemove", onMouseMove);
  }
	}

	function onMouseUp( e ) {
		onMouseMove(e);
		document.removeEventListener("mouseup", onMouseUp);
		document.removeEventListener("mousemove", onMouseMove);
	}

	function onMouseMove( e ) {
		var x = startX + e.screenX - startMouseX;
		var y = startY + e.screenY - startMouseY;
		setPos(x, y);
	}

	function onChange( e ) {
		refresh();
		setPos(elem.offsetLeft, elem.offsetTop);
	}
}



dragndrop.dragndropClass = "js-dragndrop";
dragndrop.dragndropLimiterClass = "js-dragndrop-limiter";


dragndrop.init = function() {
	var arr = document.querySelectorAll("." + dragndrop.dragndropClass);
	var i = -1;
	var l = arr.length;
	while (++i < l) {
		dragndrop(arr[i], true);
	}
}


dragndrop.initOnDocumentReady = function() {
	document.addEventListener("DOMContentLoaded", dragndrop.init);
}

/**
* @main run
**/
  dragndrop.initOnDocumentReady()
