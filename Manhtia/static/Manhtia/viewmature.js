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
        se.value = document.getElementById("allchapters").options[document.getElementById("allchapters").selectedIndex - 1].text;
        goto();
    }
    document.getElementById("next").onclick = () => {
        const se = document.querySelector('#allchapters');
        se.value = document.getElementById("allchapters").options[document.getElementById("allchapters").selectedIndex + 1].text;
        goto();
    }

}

function goto(){
    location.href = document.getElementById("allchapters").value;
}