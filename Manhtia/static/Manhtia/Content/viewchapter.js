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

function main(data){

    document.getElementById("show").innerHTML = "<br><br>Loading...";
    var name = document.getElementById("nameget").innerText;
    for(var i = 0; i < data.length; i++){

        if(data[i].Name == name){
            var link = data[i].DataStoreLocation;
            var linkget = link.replace("edit?usp=sharing", "export?format=csv")
            fetch(linkget).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){create(csv);});

            break;

        }

    }
}
function create(data){

    var chapter = document.getElementById("chapterget").innerText;
    var chapters = [];
    for(var i = 9; i < data.length; i++){

        if(data[i].Topic == chapter){

            var img = document.createElement('img');
            img.setAttribute('src', data[i].Info1.replaceAll("=s6000", "=s" + document.getElementById("quality").value));
            img.addEventListener("error", tryAgain(this));
            img.style.width = document.getElementById("zoom").value + "px";
        
            
            document.getElementById("show").style.width = (document.getElementById("zoom").value) + "px";
            document.getElementById("show").appendChild(img);

        }
        if(data[i].Topic == chapter && data[i].Status != "n"){
            document.getElementById("status").innerHTML = data[i].Status;
        }
        if(!chapters.includes(data[i].Topic) && data[i].Topic.substring(data[i].Topic.length - 1) == "."){

            chapters.push(data[i].Topic);

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
        se.value = document.getElementById("allchapters").options[document.getElementById("allchapters").selectedIndex - 1].text;
        goto();
    }
    document.getElementById("next").onclick = () => {
        const se = document.querySelector('#allchapters');
        se.value = document.getElementById("allchapters").options[document.getElementById("allchapters").selectedIndex + 1].text;
        goto();
    }

}

function layout(){
    if(document.getElementById("layout").value == "ver"){
        start();
    }else{
        document.getElementById("show").innerHTML = "";
        
    }
}

function goto(){
    location.href = document.getElementById("allchapters").value;
}