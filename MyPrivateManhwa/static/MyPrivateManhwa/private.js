const dataget = "https://docs.google.com/spreadsheets/d/1HsH40yVrlcWrSLXn0qEG06BR7X_YS4YUQyFbEzaEf7Y/edit?usp=sharing";
const datause = "https://docs.google.com/spreadsheets/d/1HsH40yVrlcWrSLXn0qEG06BR7X_YS4YUQyFbEzaEf7Y/export?format=csv";
fetch(datause).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){appenddata(csv);});

function appenddata(data){
    var name = [];
    var piclink = [];
    var translink = [];
    var rawlink = [];
    var newtoki = [];
    var status = [];
    var videolink = [];
    var storelink = [];

    var namepop = [];
    var stop = [];
    for(var i = 0; i < data.length; i++){
        name.push(data[i].Name);
        piclink.push(data[i].PictureLink);
        translink.push(data[i].TransLink);
        rawlink.push(data[i].RawLink);
        newtoki.push(data[i].Newtoki);
        status.push(data[i].Status);
        videolink.push(data[i].VideoLink);
        storelink.push(data[i].StoreLink);
        if(data[i].TransLink == "n" && data[i].Name != "forbidden"){
            if(!stop.includes(data[i].Name)){
                stop.push(data[i].Name);
            }
        }

        create(data[i].Name, data[i].PictureLink, data[i].StoreLink, data[i].TransLink, data[i].RawLink, data[i].Newtoki, data[i].Status, data[i].VideoLink, i + 1);
    }
    var datalist = document.getElementById("names");
    for(const names of stop){
        const option = document.createElement('option');
        option.value = names;
        datalist.appendChild(option);
    }
    if(window.innerWidth > 1000){
        document.getElementById("website").style.float = "left";
        document.getElementById("website").style.display = "block";
    }
    document.getElementById("allname").onclick = () => {
        document.getElementById("picvdo").innerHTML = "";
        document.getElementById("picvdoshow").innerHTML = "";
        name = [];
        piclink = [];
        translink = [];
        rawlink = [];
        newtoki = [];
        status = [];
        videolink = [];
        storelink = [];

        namepop = [];
        stop = [];
        for(var i = 0; i < data.length; i++){
            create2(data[i].Name, data[i].PictureLink, data[i].StoreLink, data[i].TransLink, data[i].RawLink, data[i].Newtoki, data[i].Status, data[i].VideoLink, i + 1);
        }
    }
    document.getElementById("picvdo").innerHTML = "Choose or All";
    document.getElementById("clearname").onclick = () => {document.getElementById("name").value = ""; document.getElementById("picvdo").innerHTML = "Choose or All";}
    document.getElementById("search").onclick = () => {
        document.getElementById("picvdo").innerHTML = "";
        document.getElementById("picvdoshow").innerHTML = "";
        consolw.log("dd")
        for(var i = 0; i < data.length; i++){
            create2(document.getElementById("name").value, data[i].PictureLink, data[i].StoreLink, data[i].TransLink, data[i].RawLink, data[i].Newtoki, data[i].Status, data[i].VideoLink, i + 1);
        }
    }
    function create(nameget, piclink, store, trans, raw, newtoki, status, vdo, i){

        var div = document.createElement("div");
        var but = document.createElement("button");
        var br = document.createElement("br");

        const content = document.getElementById("privatemanhwa");
        const private = document.getElementById("picvdo");
        const privateshow = document.getElementById("picvdoshow");
        const forbidshow = document.getElementById("forbid");

        //Content
        document.getElementById("fff").style.display = "none";
        if(piclink == "n" && vdo == "n"){
            div.innerHTML = nameget + " : <a href=" + translink + ">English ::</a> <a href=" + raw + ">Raw ::</a> <a href=" + newtoki + ">Newtoki</a>";

            div.style.fontFamily = "Brush Script MT";
            content.appendChild(div);
        }

    }
    function create2(nameget, piclink, store, trans, raw, newtoki, status, vdo, i){

        var div = document.createElement("div");
        var but = document.createElement("button");
        var br = document.createElement("br");

        const private = document.getElementById("picvdo");
        const privateshow = document.getElementById("picvdoshow");
        const forbidshow = document.getElementById("forbid");

        //Picture of manhwa
        if(trans == "n" && nameget != "forbidden"){
            if(!namepop.includes(nameget)){
                but.innerHTML = i + ". " + nameget;
                namepop.push(nameget);

                private.appendChild(div);
                but.addEventListener("click", function(){
                    privateshow.innerHTML = "";
                    for(var j = 0; j < data.length; j++){
                        if(data[j].Name == nameget){
                            var img = document.createElement("img");
                            img.setAttribute('src', data[j].PictureLink);
                            img.setAttribute('width', 300);
                            privateshow.style.textAlign = "center";
                            privateshow.appendChild(img);
                            
                        }
                    }
                });
                but.style.backgroundColor = "#49eb34";
                but.style.borderRadius = "10px";
                private.appendChild(but);
                private.appendChild(br);

            }
        }       

    }
    document.getElementById("clear1").onclick = () => {document.getElementById("picvdoshow").innerHTML = ""; document.getElementById("real").innerHTML = "";}
    document.getElementById("edit").onclick = () => {
        let ans = window.prompt("Type password");
        if(ans == "admin" || ans == "Admin"){
            alert("For cartoon status is cartoon");
            window.location.href = dataget;
        }
    }
    document.getElementById("reals").onclick = () => {
        let ans = window.prompt("Type password");
        var shower = document.getElementById("real");
        if(ans == "admin" || ans == "Admin"){
            let ans2 = window.prompt("1 for Real picture 2 for Real video 3 for Real Cartoon 4 for Real link");
            if(ans2 == "1"){
                var count = document.createElement("label");
                var co = 0;
                shower.innerHTML = "";
                for(var o = 0; o < data.length; o++){
                    if(data[o].Status == "picture"){
                        
                        var pic = document.createElement("img");
                        pic.setAttribute('src', data[o].PictureLink);
                        pic.setAttribute('width', 315);
                        shower.appendChild(pic);
                        co++;
                    }
                }
                count.innerHTML = "Has Picture: "+ co;
                shower.appendChild(count);
            }
            if(ans2 == "2"){
                var count = document.createElement("label");
                var co = 0;
                shower.innerHTML = "";
                for(var o = 0; o < data.length; o++){
                    if(data[o].Status == "video"){
                        
                        var vdo = document.createElement("iframe");
                        vdo.setAttribute('src', data[o].PictureLink);
                        vdo.setAttribute('width', 315);
                        vdo.setAttribute('allow', 'fullscreen');
                        shower.appendChild(vdo);
                        co++;
                    }
                }
                count.innerHTML = "Has Video: "+ co;
                shower.appendChild(count);
            }
            if(ans2 == "3"){
                var count = document.createElement("label");
                var co = 0;
                shower.innerHTML = "";
                for(var o = 0; o < data.length; o++){
                    if(data[o].Status == "cartoon"){
                        var ss = document.createElement("img");
                        ss.setAttribute('src', data[o].PictureLink);
                        ss.setAttribute('width', 315);
                        shower.appendChild(ss);
                        co++;
                    }
                }
                count.innerHTML = "Has Cartoon Real: "+ co;
                shower.appendChild(count);
            }
            if(ans2 == "4"){
                var co = 0;
                shower.innerHTML = "";
                for(var o = 0; o < data.length; o++){
                    if(data[o].Status == "link"){
                        co++;
                        var count = document.createElement("label");
                        count.innerHTML = ">> " + "<a href=" + data[o].VideoLink + ">here</a> : " + co + " " + data[o].StoreLink + "<br>";
                        shower.appendChild(count);
                    }
                }
                
            }
        }
        else{alert("Wrong Password");}
    }
}

