"use strict";

/**
 *  description :  require data from baidu by JSONP
 */
(function() {
  var oText = document.getElementById("text");
  var oKeyword = document.getElementsByClassName("keywords")[0];
  oText.addEventListener('keyup', loadjsonp);

  function loadjsonp() {

    var val = this.value;
    oKeyword.style.display = "block";

    //删除其他多余script标签的函数
    var already_Script = document.getElementsByTagName("script");
    for (let i = 0, len = already_Script.length; i < len; i++) {
      var script_index = already_Script[i].getAttribute("data-index");
      if (script_index != 0) {
        document.body.removeChild(already_Script[i]);
      }
    }

    var oScript = document.createElement("script");
    oScript.setAttribute("data-index", "1");
    oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + val + "&cb=lzw";
    document.body.appendChild(oScript);
  }
}());

/* 回调函数 */
function lzw(data) {
  var key = data.s;
  document.querySelector("ul").innerText = " ";
  if (key.length) {
    key.forEach(function(content) {
      var oLi = document.createElement("li");
      oLi.innerText = content;
      oLi.onclick = function() {
        window.location.href = "http://www.baidu.com/s?wd=" + content;
      }
      document.querySelector("ul").appendChild(oLi);
    });
  } else {
    document.querySelector(".keywords").style.display = "none";
  }
}

document.documentElement.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});
document.querySelector(".main").addEventListener("wheel", function(e) {
  var target = document.querySelector(".something");
  if (e.deltaY < 0) {
    target.style.animationName = "upshow";
  } else {
    target.style.animationName = "bottomhide";
  }
});
document.querySelector(".add").addEventListener("keypress", function(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    var name = e.target.innerText;
    var url = window.prompt("url:", "http://www.baidu.com");
    var aTag = document.createElement("a");
    aTag.innerText = name;
    aTag.href = url;
    localStorage.setItem(name, url);
    aTag.className = "bk";
    this.parentNode.insertBefore(aTag, this);
  }
});

window.onload = function() {
  let frag = document.createDocumentFragment();
  let ending = document.querySelector('.add');
  for (var i = 0; i < localStorage.length; i++) {
    let aTag = document.createElement('a');
    let name = localStorage.key(i);
    let url = localStorage.getItem(name);
    aTag.innerText = name;
    aTag.href = url;
    aTag.className = 'bk';
    frag.appendChild(aTag);
  }
  ending.parentNode.insertBefore(frag, ending);
}