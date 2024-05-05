const chapterAllData = "https://docs.google.com/spreadsheets/d/1LGJg6Jl3qV2IQfknt2xOvmvJuKtUaVWMSOcN1HrnHuc/export?format=csv";

start();
function start(){
   fetch(chapterAllData).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){main(csv);});
}

function tryAgain(e){
    setTimeout(reloadImg, 1000, e);
}

function reloadImg(e){
    var source = e.src;
    e.src = source;
}

function main(data){

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

    //set title
    var name = document.getElementById("nameget").innerText;
    for(var i = 0; i < data.length; i++){

        if(data[i].Name == name){
            var link = data[i].Link;
            var linkget = link.replace("edit?usp=sharing", "export?format=csv")
            fetch(linkget).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){create(csv);});
            
            break;

        }

    }
}
function create(data){

    var chapter = document.getElementById("chapterget").innerText;
    document.getElementById("show").innerHTML = "Loading...";
    var chapters = [];
    for(var i = 0; i < data.length; i++){

        if(data[i].Part == chapter){

            var img = document.createElement('img');
            img.setAttribute('src', data[i].Link3.replaceAll("=s6000", "=s" + document.getElementById("quality").value));
            img.addEventListener("error", tryAgain(this));
            img.style.width = document.getElementById("zoom").value + "px";
            document.getElementById("show").style.width = document.getElementById("zoom").value + "px";
            document.getElementById("show").appendChild(img);

        }
        if(data[i].Topic == chapter && data[i].Status != "n"){
            document.getElementById("status").innerHTML = data[i].Status;
        }
        if(!chapters.includes(data[i].Part)){

            chapters.push(data[i].Part);

        }

    }

    for(const chapter of chapters){

        const option = document.createElement('option');
        option.text = chapter;
        option.value = chapter;
        document.getElementById("allchapters").appendChild(option);

    }
    const se = document.querySelector('#allchapters');
    se.value = chapter;
    document.getElementById("prev").onclick = () => {
        const se = document.querySelector('#allchapters');
        se.value = document.getElementById("allchapters").options[document.getElementById("allchapters").selectedIndex - 1].value;
        goto();
    }
    document.getElementById("next").onclick = () => {
        const se = document.querySelector('#allchapters');
        se.value = document.getElementById("allchapters").options[document.getElementById("allchapters").selectedIndex + 1].value;
        goto();
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

function goto(){
    location.href = document.getElementById("allchapters").value;
}