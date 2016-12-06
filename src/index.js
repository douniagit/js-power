// console.log($)

// $.getJSON('http://search.twitter.com/search.json?q=%40bocoup&amp;callback=?', function(tweets){
//   console.log(tweets);
// });
var ban=document.getElementById("rouge");

ban.addEventListener("click", function(){
	ban.style.backgroundColor="blue";
})

var rond=document.getElementById("rond");
var ctx=rond.getContext("2d");
    ctx.beginPath();
    ctx.arc(600,150,100,0,Math.PI*2,true);
    ctx.strokeStyle="pink";
    ctx.lineWidth=40;
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle="yellow";
    ctx.fill();
