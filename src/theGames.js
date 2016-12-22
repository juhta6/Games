document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.notification);
}

tabris.ui.set("toolbarVisible", false);
var menu = new tabris.Page({
  topLevel: true
}).open();

var page = new tabris.Page({
  topLevel: true
}).on("appear", timer);
//---------------------------------------------------------------------------------------------------------------------------
var l,t,i,url,scale,time,hp,s,info,opened,livs;
s = 0;
hp = 5;
livs = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300];
info = "Welcome to the Games: Mobile edition. You shall get to know how the Games works and its goal in this introduction. First of all, you have 5 lives only and you need to be sharp and quick while playing the Games. You're supposed to collect coins by tapping them and beware bombs. The possibilty of a bomb to appear is 1 out of 10. Also there's 1 of 1000 chance to encounter a fake coin which is impossible to tell without touching a coin. You will lose 5 scores and a life each time you touch a bomb. Do not forget, you will gain one life every 10 scores up to 300 :)";
opened = false;

navigator.notification.confirm(info, null, "Welcome-introductions", ["I understand."])

new tabris.Button({
  layoutData: {top: "65%", centerX: 0, width: 240, height: 60},
  text: "Start",
  font: "24px"
}).on("select", open).appendTo(menu);

function open(){
  page.open()
}

new tabris.Button({
  layoutData: {top: "prev()", centerX: 0, width: 200, height: 55},
  text: "Introduction",
  font: "24px"
}).on("select", popup).appendTo(menu);

new tabris.Button({
  layoutData: {top: "prev()", centerX: 0, width: 240, height: 60},
  text: "Highscores",
  font: "24px"
}).on("select", highscoress).appendTo(menu);

var highscores = new tabris.Composite({
    id: "highscores",
    layoutData: {left: 10, right: 10, top: 10, bottom: "36%"},
    transform: {translationY: 1000},
    elevation: 3,
    cornerRadius: 5,
    background: "rgba(0,0,0,0.05)" 
  }).appendTo(menu);

var title = new tabris.TextView({
  centerX: 0, top: 10,
  text: "HIGHSCORES",
  font: "40px",
  opacity: 0
}).appendTo(highscores);

var list = new tabris.ScrollView({
  left: 0, right: 0, top: 55, bottom: 0
}).appendTo(highscores);


function highscoress(){
  if (opened == false){
  highscores.animate({transform: {translationY: 0}}, {duration: 1000})
  title.animate({opacity: 1}, {delay: 1000, duration: 500})
  list.animate({opacity: 1}, {delay: 1000, duration: 500})
  opened = true
  } else {
  highscores.animate({transform: {translationY: 1000}}, {delay: 500, duration: 1000})
  title.animate({opacity: 0}, {duration: 500})
  list.animate({opacity: 0}, {duration: 500})
  opened = false
  }
}

function popup(){
  navigator.notification.confirm(info, null, "Introductions", ["I understand."])
}

function timer(){
  time = setInterval(random, 1);
}

var health = new tabris.TextView({
  left: 5, bottom: 5,
  text: hp+" lives left",
  font: "18px"
}).appendTo(page);

var scores = new tabris.TextView({
  left: 5, top: 5,
  text: "Score: "+s
}).appendTo(page);

var coins = new tabris.TextView({
  right: 5, top: -20,
  text: i = 0,
  font: "0px"
}).appendTo(page);

function random(){
  l = Math.floor((Math.random() * 300) + 10);
  t = Math.floor((Math.random() * 400) + 10);
  i = Math.floor((Math.random() * 1000) + 1);
  coins.set("text",i)
  if (i <= 10 || i == 1000)  {
    if (i == 1){
      scale = Math.floor((Math.random() * 2.5) + 1);
      url = "http://vignette2.wikia.nocookie.net/transformice/images/e/ed/Bomb.gif/revision/latest?cb=20141209102424"
    } else {
      scale = 1
      url = "http://static.wixstatic.com/media/770b4f_24bf02e2036e4e589abeb25f9cde42a9~mv2.gif"
      if (i == 1000){
        var BOMB = true
    }
    }
  new tabris.WebView({
  id: "coin",
  left: l, top: t, width: 56,
  background: "rgba(255,255,255,0)",
  url: url,
  transform: {scaleX: scale, scaleY: scale}
  }).once("tap", function(){
    if (this.get("url") == "http://vignette2.wikia.nocookie.net/transformice/images/e/ed/Bomb.gif/revision/latest?cb=20141209102424" || BOMB == true){
    this.set("url", "http://www.clipartbest.com/cliparts/4T9/Ejk/4T9Ejkbjc.gif")
    this.animate({}, {delay: 900})
        if (s > 5){
      scores.set("text","Score: "+(s = s-5))
    } else {
      scores.set("text","Score: "+(s = 0))
      liv = 0
    }
    if (hp >= 1){
      health.set("text", (hp = hp - 1) + " lives left")
      } else {
       health.set("text", (hp = 0) + " lives left")
       page.find("#coin").set("enabled", false);
      gameover();
      clearInterval(time)
    }
    } else if (!BOMB == true){
      scores.set("text", "Score: "+(++s))
      for(var live of livs){
        if (s == live){
    health.set("text", (++hp)+" lives left")
        }
  }
    if (!this.isDisposed()){
    this.dispose()
    }
    }
  }).once("resize", function(widget){
      var b = new tabris.Composite({}).appendTo(page);
    b.animate({}, {delay: 2000})
    b.once("animationend", function(){
      if (!widget.isDisposed()){
          if (widget.get("url") == "http://vignette2.wikia.nocookie.net/transformice/images/e/ed/Bomb.gif/revision/latest?cb=20141209102424"){
      widget.set("url", "http://www.clipartbest.com/cliparts/4T9/Ejk/4T9Ejkbjc.gif")
      widget.set("enabled", false)
          }
      widget.animate({}, {delay: 920})
      }
    })
  }).once("animationend", function(){
    if (!this.isDisposed()){
    this.dispose()
    }
  }).appendTo(page);
}
}

function restart(){
  scores.set("text","Score: "+ (s = 0))
  health.set("text", (hp = 5) + " lives left")
  liv = 0
  coins.set("text", i = 0)
  menu.open()
  page.find("#gameover").dispose();
}

function gameover(){
          if (s == 0){
      scores.set("text","Score: "+ (s = 0))
      liv = 0
          }
  new tabris.TextView({
    id: "gameover",
    centerX: 0, centerY: 0,
    font: "bold 40px",
    text: "Game over! Your score: " + s,
    opacity: 0,
    alignment: "center",
    transform: {translationY: -500}
  }).on("resize", function(){
    this.animate({opacity: 1, transform: {translationY: 0}}, {duration: 5000, easing: "ease-in-out"})
    highscoress()
  }).on("tap", restart).appendTo(page);


new tabris.TextView({
  layoutData: {centerX: 0, top: "prev() 10"},
  alignment: "center",
  font: "22px sans-serif",
  text: s
}).appendTo(list);
}
