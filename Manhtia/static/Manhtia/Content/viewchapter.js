//const chapterAllData = "https://docs.google.com/spreadsheets/d/1R1e93BSQ-dVmHgZadcJmINP_qDJo65CZFBJ98hhzpvk/export?format=csv";
//Load data
const database = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=1R1e93BSQ-dVmHgZadcJmINP_qDJo65CZFBJ98hhzpvk&p=Sheet1";
start();
function start(){
   //fetch(chapterAllData).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){main(csv);});
   fetch(database)
    .then(d => d.json())
    .then(d => {
        main(d);
    })
}

//turn off right click
document.addEventListener("contextmenu", function (e){
    e.preventDefault();
}, false);

function tryAgain(e){
    setTimeout(reloadImg, 1000, e);
}

function reloadImg(e){
    var source = e.src;
    e.src = source;
}
var fils = "";
var filterlist;
function main(data){

    filterlist = [];

    const widthselect = document.getElementById('zoom');
    //get width from window offsetwidth
    const windowwidth = window.innerWidth;
    for(var i = 0; i < widthselect.length; i++){
        if(widthselect.options[i].value < windowwidth && widthselect.options[i].value < 750){
            widthselect.value = widthselect.options[i].value;
        }
    }

    //get width from url ?width=
    const queryString = window.location.search;
    const parameters = new URLSearchParams(queryString);
    const width = parseInt(parameters.get('width'));
    for(var i = 0; i < widthselect.length; i++){
        if(widthselect.options[i].value < width){
            widthselect.value = widthselect.options[i].value;
        }
    }
    //filter from url filter?filter=
    var filter = "";
    const queryfilter = window.location.search;
    const parametersfilter = new URLSearchParams(queryString);
    filter = parameters.get('filter');
    if(filter === undefined){filter = "";}
    fils = filter;
    //if(filter.includes(" ")){filterlist = filter.split(" ");}

    //set title
    document.getElementById("show").innerHTML = "<br><br>Loading...";
    var name = document.getElementById("nameget").innerText;
    for(var i = 0; i < data.length; i++){

        //Read chapter
        if(data[i].Name == name){
            var link = data[i].DataStoreLocation;
            var linkget = link.replace("edit?usp=sharing", "export?format=csv")
            fetch(linkget).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){create(csv, filter);});

            break;

        }

    }
}

//create img
function create(data, filter){

    var chapter = document.getElementById("chapterget").innerText;
    var chapters = [];
    var descrips = [];
    for(var i = 9; i < data.length; i++){

        if(data[i].Topic == chapter){

            var img = document.createElement('img');
            img.setAttribute('src', data[i].Info1.replaceAll("=s6000", "=s" + document.getElementById("quality").value));
            img.addEventListener("error", tryAgain(this));
            img.style.width = document.getElementById("zoom").value + "px";
            img.className = "chapterimage";        
            
            document.getElementById("show").style.width = (document.getElementById("zoom").value) + "px";
            document.getElementById("show").appendChild(img);

        }
        if(data[i].Topic == chapter && data[i].Status != "n"){
            document.getElementById("status").innerHTML = data[i].Status;
        }
        if(!chapters.includes(data[i].Topic) && data[i].Topic.substring(data[i].Topic.length - 1) == "."){

            chapters.push(data[i].Topic);
            if(data[i].Status.trim().length === 1 && data[i].Status === 'n'){descrips.push("");}
            if(data[i].Status.trim().length !== 1 && data[i].Status !== 'n'){descrips.push(data[i].Status.trim());}

        }

    }

    //add chapter list
    document.getElementById("allchapters").innerHTML = "";
    for(var index = 0; index < chapters.length; index++){

        const option = document.createElement('option');
        option.text = chapters[index] + " " + descrips[index];
        option.value = chapters[index];

        //normal
        if(filter === null || filter === ""){
            document.getElementById("allchapters").appendChild(option);
        }
        //only condition
        if(filter !== null && descrips[index].includes(filter)){
            document.getElementById("allchapters").appendChild(option);
        }
        //multiple condition
        /*if(filter !== null && filterlist.includes(descrips[index])){
            document.getElementById("allchapters").appendChild(option);
        }*/

    }
    const se = document.querySelector('#allchapters');
    se.value = chapter;

    
    document.getElementById("prev").onclick = () => {
        const se = document.querySelector('#allchapters');
        se.value = document.getElementById("allchapters").options[document.getElementById("allchapters").selectedIndex - 1].value;
        goto(fils);
    }
    document.getElementById("next").onclick = () => {
        const se = document.querySelector('#allchapters');
        se.value = document.getElementById("allchapters").options[document.getElementById("allchapters").selectedIndex + 1].value;
        goto(fils);
    }

    theme();

}

function layout(){
    if(document.getElementById("layout").value == "ver"){
        start();
    }else{
        document.getElementById("show").innerHTML = "";
        
    }
}

function theme(){
    var type = document.getElementById("theme").value;
    if(type === "auto"){
        var hours = new Date().getHours();
        const isDayTime = hours > 6 && hours < 18;
        if(!isDayTime){
            document.body.style.backgroundColor = "#121212";
            document.getElementById("content").style.backgroundColor = "#121212";
            document.getElementById("content").style.color = "white";
            document.getElementById("nameget").style.color = "white";
        }
        if(isDayTime){
            document.body.style.backgroundColor = "white";
            document.getElementById("content").style.backgroundColor = "white";
            document.getElementById("content").style.color = "black";
            document.getElementById("nameget").style.color = "black";
        }
    }
    if(type === "light"){
        document.body.style.backgroundColor = "white";
        document.getElementById("content").style.backgroundColor = "white";
        document.getElementById("content").style.color = "black";
        document.getElementById("nameget").style.color = "black";
    }
    if(type === "dark"){
        document.body.style.backgroundColor = "#121212";
        document.getElementById("content").style.backgroundColor = "#121212";
        document.getElementById("content").style.color = "white";
        document.getElementById("nameget").style.color = "white";
    }
    
}

function goto(filter){
    var fils = "?filter=" + filter;
    if(filter === "undefined"){fils = "";}
    if(filter === undefined){fils = "";}
    if(filter === "null"){fils = "";}
    if(filter === null){fils = "";}
    if(filter === ""){fils = "";}
    if(isNaN(filter)){fils = "";}
    if(filter === "NaN"){fils = "";}
    location.href = document.getElementById("allchapters").value + fils;
}
