console.log("Home script is ready")
var script = document.createElement("script");  // create a script DOM node
var url = "https://www.gstatic.com/charts/loader.js"
script.src = url;  // set its src to the provided URL
console.log(script)
document.head.appendChild(script);
script.onload = googleCallback;// add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)

function googleCallback(){
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
}

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Mon', 20, 28, 38, 45],
    ['Tue', 31, 38, 55, 66],
    ['Wed', 50, 55, 77, 80],
    ['Thu', 77, 77, 66, 50],
    ['Fri', 68, 66, 22, 15]
    // Treat first row as data as well.
  ], true);

  var options = {
    legend:'none'
  };

  var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));

  chart.draw(data, options);
}




function autocomplete(inp){
  console.log("autocomplete started");

  var currentFocus;
  inp.addEventListener("input", function(e){
    var a, b , i, val = this.value;
    closeAllLists();
    if (!val){
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id+ "autocomplete-list");
    a.setAttribute("class","autocomplete-items");
    this.parentNode.appendChild(a);
    $.ajax({url: "https://ticker-2e1ica8b9.now.sh/keyword/"+val, success: function(arr){
      console.log("incoming suggestion!")
      console.log(arr);
      for (i=0;i<arr.length; i++){
        b = document.createElement("DIV");

        b.innerHTML = "<strong>" + arr[i].name + "</strong>"
        b.innerHTML += "<input type = 'hidden' value ='"+arr[i].symbol+"'>"
        b.addEventListener("click", function(e){
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();

        });
        a.appendChild(b);
      }
    }});
  });

  inp.addEventListener("keydown",function(e){
    var x = document.getElementById(this.id+"autocomplete-list");
    if (x){
      x = x.getElementsByTagName("div");
    }
    if (e.keyCode == 40){
      currentFocus++;
      addActive(x);
    }
    else if(e.keyCode == 13){
      e.preventDefault();
      if(currentFocus>-1){
        if (x){
          x[currentFocus].click();
        }
      }
    }
  });


  function addActive(x){
    if (!x){
      return false;
    }
    removeActive(x);
    if (currentFocus>=x.length){
      currentFocus = 0;
    }
    if (currentFocus<0){
      currentFocus = (x.length-1);
    }

    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x){
    for (var i =0; i<x.length;i++){
      x[i].classList.remove("autocomplete-active")
    }
  }

  function closeAllLists(elmnt){
    var x = document.getElementsByClassName("autocomplete-items")
    for (var i=0;i<x.length;i++){
      if(elmnt != x[i] && elmnt != inp){
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function(e){
    closeAllLists(e.target);
  });
  
}


$("btn-draw-stock").click(function(){
  $.ajax({url: "/", success: function(result){
    $("#div1").html(result);
  }});
});


$(document).ready(function() {
  console.log( "ready!" );
  console.log("ticker_symbol"+document.getElementById("chart_div"));
  autocomplete(document.getElementById('ticker_symbol'));
});