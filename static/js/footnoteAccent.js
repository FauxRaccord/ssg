/*

*/

footnoteAccent = function (){

  var fn = document.querySelectorAll('[role="doc-endnote"]')
  accentArr = new Array;

  for (let index = 0; index < fn.length; index++) {
      var test = fn[index].innerText.slice(1,5);
    if (test == "[강조]") {
      accentArr.push(index+1);
    }
  }

  for (let index = 0; index < accentArr.length; index++) {
    var accent = document.getElementById('lf-fnref:'+accentArr[index]);
    accent.classList.add("accent");
  }
}

footnoteAccent()
