function display_chapter(name, data){
    
    var chapter = document.getElementById("choose_chapter").value;
    document.getElementById("content").innerHTML = "<button onclick='location.reload(true)'>Back</button> View: " + chapter + "";
    document.getElementById("picture").innerHTML = "";
    var div = document.createElement('div');
    document.getElementById("chapter").style.position = "sticky";
    document.getElementById("chapter").style.top = "0px";

    for(var i = 9; i <= document.getElementById("chapter_count").innerText; i++){

        if(data[i].Topic == chapter){
            var img = document.createElement('img');
            img.setAttribute('src', data[i].Info1);
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
        console.log("fff");
        for(var j = 9; j < document.getElementById("chapter_count").innerText; j++){
    
            var each = document.createElement("div");
            each.innerHTML = data[j].Topic + "<a href='" + data[j].Info1 + "'>here</a>" + "<a href='" + data[j].Info2 + "'>here</a> " + data[j].Status;
            chap.appendChild(each);
    
        }
    
        document.getElementById("chapter").appendChild(chap);
    };

}
