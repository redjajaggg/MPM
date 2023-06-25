function tryAgain(e){
    setTimeout(reloadImg, 1000, e);
}

function reloadImg(e){
    var source = e.src;
    e.src = source;
}
function display_chapter(name, data){
    
    var chapter = document.getElementById("choose_chapter").value;
    var status = "";
    for(var i = 9; i <= document.getElementById("chapter_count").innerText; i++){
        if(data[i].Topic == chapter && data[i].Status != "n"){
            status = data[i].Status;
        }
    }
    document.getElementById("content").innerHTML = "<button onclick='location.reload(true)'>Back</button> View: " + chapter + " " + status;
    document.getElementById("picture").innerHTML = "";
    var div = document.createElement('div');
    document.getElementById("chapter").style.position = "sticky";
    document.getElementById("chapter").style.top = "0px";

    for(var i = 9; i <= document.getElementById("chapter_count").innerText; i++){

        if(data[i].Topic == chapter){
            var img = document.createElement('img');
            img.setAttribute('src', data[i].Info1);
            img.addEventListener("error", tryAgain(this));
            img.style.width = "400px";
            div.appendChild(img);
            div.style.fontSize = "0px";
            div.style.width = "420px";
            div.style.marginLeft = "auto";
            div.style.marginRight = "auto";
            document.getElementById("picture").appendChild(div);

        }

    }
    document.getElementById("more").onclick = () => {
        var chap = document.createElement("div");
        for(var j = 9; j < document.getElementById("chapter_count").innerText; j++){

            if(data[j].Topic.substring(data[j].Topic.length - 1) != "."){

                var chapt = document.createElement("div");
                var chap2 = document.createElement("div");
                var stae = document.createElement("div");
                chapt.innerHTML = "<a href='" + data[j].Info1 + "'>"+ data[j].Topic +"</a>";
                if(data[j].Info2 != "n"){chap2.innerHTML = "<a href='" + data[j].Info2 + "'>" + data[j].Topic + " Part II</a>";}
                if(data[j].Status != "n"){chapt.innerHTML = "<a href='" + data[j].Info1 + "'>"+ data[j].Topic +"</a> " + data[j].Status;}
                chap.appendChild(chapt);
                chap.appendChild(chap2);

            }
        
        }
    
        document.getElementById("chapter").appendChild(chap);
    };

}
