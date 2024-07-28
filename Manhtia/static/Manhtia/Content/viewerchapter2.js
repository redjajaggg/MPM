/*
width, filter, p, t, q
 */
//Load data
const database = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=1R1e93BSQ-dVmHgZadcJmINP_qDJo65CZFBJ98hhzpvk&p=Sheet1";

const widthselect = document.getElementById('zoom');
//get width from url ?width=
const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const width = parseInt(parameters.get('width'));
for(var i = 0; i < widthselect.length; i++){
    if(widthselect.options[i].value <= width){
        widthselect.value = widthselect.options[i].value;
    }
}
//get width from window offsetwidth
const windowwidth = window.innerWidth;
for(var i = 0; i < widthselect.length; i++){
    if(widthselect.options[i].value < windowwidth && widthselect.options[i].value < 750 && isNaN(width)){
        widthselect.value = widthselect.options[i].value;
    }
}
//read need params
/*
    p=chapter name
    t=theme (0=auto, 1=light, 2=dark)
    q=quality (number of pixel)
*/

start();
function start(){
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

//reload images if error exists
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

    //filter from url filter?filter=
    var filter = "";
    const queryfilter = window.location.search;
    const parametersfilter = new URLSearchParams(queryfilter);
    filter = parametersfilter.get('filter');
    if(filter === undefined){filter = "";}
    fils = filter;

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

var datas;
//create img
function create(data, filter){

    datas= data;
    var chapter = parameters.get('p');
    var chapters = [];
    var descrips = [];
    //read each story database
    fetch(`https://script.google.com/macros/s/AKfycbwcDe7zIvjY5p4rVQ-4mBIw3OCnI_ntnHhcKhmjGMGAgbB3ghnZ6MhVecVS1uHKWxD1Gw/exec?nm=${document.getElementById("nameget").innerText}&bm=${chapter}&tp=auto`)

    //append data
    for(var i = 9; i < data.length; i++){

        if(!chapters.includes(data[i].Topic) && data[i].Topic.substring(data[i].Topic.length - 1) == "."){

            chapters.push(data[i].Topic);
            if(data[i].Status.trim().length === 1 && data[i].Status === 'n'){descrips.push("");}
            if(data[i].Status.trim().length !== 1 && data[i].Status !== 'n'){descrips.push(data[i].Status.trim());}

        }

    }

    //add chapter list to select
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

    }
    const se = document.querySelector('#allchapters');
    se.value = chapter;
    document.getElementById("prev").onclick = () => {
        se.value = document.getElementById("allchapters").options[document.getElementById("allchapters").selectedIndex - 1].value;
        goto();
    }
    document.getElementById("next").onclick = () => {
        se.value = document.getElementById("allchapters").options[document.getElementById("allchapters").selectedIndex + 1].value;
        goto();
    }

    changetheme();
    goto();
}

//build image
function buildImage(chapterName){

    //quality
    document.getElementById("quality").value = parameters.get("q");

    document.getElementById("show").innerHTML = "";
    for(var i = 9; i < datas.length; i++){

        if(datas[i].Topic == chapterName){

            var img = document.createElement('img');
            img.setAttribute('src', datas[i].Info1.replaceAll("=s6000", "=s" + document.getElementById("quality").value));
            img.addEventListener("error", tryAgain(this));//if error
            img.style.width = document.getElementById("zoom").value + "px";
            img.className = "chapterimage";        
            
            document.getElementById("show").style.width = (document.getElementById("zoom").value) + "px";
            document.getElementById("show").appendChild(img);

        }

    }

}

//Layout (to develope)
function layout(){
    if(document.getElementById("layout").value == "ver"){
        start();
    }else{
        document.getElementById("show").innerHTML = "";
        
    }
}

//quality
function changequality(){
    updateUrlParam("q", document.getElementById("quality").value);
    goto();
}

//theme
function changetheme(){
    updateUrlParam("t", document.getElementById("theme").value);
    theme();
}
function theme(){
    
    var type = document.getElementById("theme").value;
    if(type == 0){
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
    if(type == 1){
        document.body.style.backgroundColor = "white";
        document.getElementById("content").style.backgroundColor = "white";
        document.getElementById("content").style.color = "black";
        document.getElementById("nameget").style.color = "black";
    }
    if(type == 2){
        document.body.style.backgroundColor = "#121212";
        document.getElementById("content").style.backgroundColor = "#121212";
        document.getElementById("content").style.color = "white";
        document.getElementById("nameget").style.color = "white";
    }
    
}

//change chapter
function goto(){
    const se = document.querySelector('#allchapters');
    buildImage(se.value);
    updateUrlParam("p", se.value);
    fetch(`https://script.google.com/macros/s/AKfycbwcDe7zIvjY5p4rVQ-4mBIw3OCnI_ntnHhcKhmjGMGAgbB3ghnZ6MhVecVS1uHKWxD1Gw/exec?nm=${document.getElementById("nameget").innerText}&bm=${chapter}&tp=auto`)
}
//updateUrlParam
function updateUrlParam(key, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    history.pushState({}, "", url.toString());
}

function book_self(){
    fetch(`https://script.google.com/macros/s/AKfycbwcDe7zIvjY5p4rVQ-4mBIw3OCnI_ntnHhcKhmjGMGAgbB3ghnZ6MhVecVS1uHKWxD1Gw/exec?nm=${document.getElementById("nameget").innerText}&bm=${document.getElementById("allchapters").value}&tp=self`)
}
