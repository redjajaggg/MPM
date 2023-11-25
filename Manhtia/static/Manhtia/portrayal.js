const data_csv_main = "https://docs.google.com/spreadsheets/d/1IYfYPLlBbq8Qw4Q7drtAH8stgHQpLqgfg_ZcWtK6U5M/export?format=csv";
const data_csv_normal = "https://docs.google.com/spreadsheets/d/1Mn2FDBvSjufDqNNxBn1SHVHFaCF0EnXnFDuwiS-Nbpg/export?format=csv";
fetch(data_csv_normal).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){normal(csv);});
fetch(data_csv_main).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){main(csv);});

window.setInterval(function(){
    var date = new Date();
    var options = {timeZone: 'Asia/Seoul', hour12: true};
    var eastCoastTime = date.toLocaleString('en-UK', options);
    document.getElementById("time").innerHTML = "S.Korea: " + eastCoastTime + " Almost Chapters will update 10.00PM everyday.";
}, 1000);

function main(data){

    var namepop = [];
    for(var i = 0; i < data.length; i++){

        if(!namepop.includes(data[i].Name)){
            namepop.push(data[i].Name);
        }

    }
    var datalist = document.getElementById("namest");
    for(const names of namepop){
        const option = document.createElement('option');
        option.text = names;
        option.value = names;
        datalist.appendChild(option);
    }
    document.getElementById("namest").onchange = () => {
        
        var win_width = window.innerWidth;
        if(win_width >= 1300){document.getElementById("content").style.columns = 4;}
        if(win_width < 1300 && win_width >= 1000){document.getElementById("content").style.columns = 3;}
        if(win_width < 1000 && win_width >= 700){document.getElementById("content").style.columns = 2;}
        if(win_width < 700){document.getElementById("content").style.columns = 1;}
        document.getElementById("content").innerHTML = "";
        var name = document.getElementById("namest").value;
        var filter = "";
        if(document.getElementById("filter").innerText == "Main"){filter = "n";}else{filter = "e";}
        for(var i = 0; i < data.length; i++){

            if(name == data[i].Name){

                create(data, i, filter);

            }

        }
        var ass = document.createElement('a');
        var moreText = document.createTextNode(name);
        ass.appendChild(moreText);
        ass.title = name;
        ass.href = name;
        document.getElementById("viewers").innerHTML = "Viewer: ";
        document.getElementById("viewers").appendChild(ass);

    };

    document.getElementById("searchs").onclick = () => {
        document.getElementById("content").innerHTML = "";
        var name = document.getElementById("namest").value;
        var filter = "";
        if(document.getElementById("filter").innerText == "Main"){filter = "n";}else{filter = "e";}

        for(var i = 0; i < data.length; i++){

            if(name == data[i].Name){

                create(data, i, filter);

            }

        }
        document.getElementById("viewers").innerHTML = "Viewer: <a href='" + name +"'>" + name + "</a>";
    };

    document.getElementById("filter").onclick = () => {
        if(document.getElementById("filter").innerText == "Main"){
            document.getElementById("filter").innerText = "Sub";
        }else{
            document.getElementById("filter").innerText = "Main";
        }
        document.getElementById("searchs").click();
    };

}

function create(data, i, filter){

    var name = document.createElement("div");
    var img = document.createElement("img");

    name.innerHTML = document.getElementById("namest").value;
    img.setAttribute("src", data[i].Link);
    img.setAttribute("class", "eachpic");

    if(data[i].Status == filter){
        document.getElementById("content").appendChild(img);
    }
}

function normal(data){

    //Notificate
    if(data[0].Status == "yes"){document.getElementById("notificate").style.display = "block"; document.getElementById("notificate").innerHTML = data[0].Info;}
    for(var i = 0; i < data.length; i++){

        if(data[1].Status == "no"){
            var e = document.getElementsByTagName('html')[0];
            e.removeChild(document.body);
            e.innerHTML = "<img style='width: 200px;' src='https://i.pinimg.com/564x/68/b3/6d/68b36d7bab2ce5db6f27f1df36367d64.jpg'><h1 style='text-align: center;'>Maintenance</h1><h2 style='text-align: center;'>Manhtia is now fixing. Will open soon.<br>(Manhwa Manager)</h2>";
        }

        if(data[i].Status == "yes"){

            var a = document.createElement("label");
            var app = document.getElementById("app");

            if(data[i].Group == "kr"){

                a.innerHTML = "<a href='" + data[i].Info + "'><img id='slink' src='" + data[i].Piclink + "'></a>";
                app.appendChild(a);

            }

            if(data[i].Group == "en"){

                a.innerHTML = "<a href='" + data[i].Info + "'><img id='slink' src='" + data[i].Piclink + "'></a>";
                app.appendChild(a);

            }

            if(data[i].Group == "th"){

                a.innerHTML = "<a href='" + data[i].Info + "'><img id='slink' src='" + data[i].Piclink + "'></a>";
                app.appendChild(a);

            }

            if(data[i].Group == "fantrans"){

                a.innerHTML = "<a href='" + data[i].Info + "'>(" + data[i].Name + ")</a>";
                app.appendChild(a);

            }

            a.style.width = " 300px";
            a.style.textAlign = "left";
            a.style.overflow = " hidden";
            a.style.marginRight = " auto";
            a.style.marginLeft = " auto";

            if(data[i].Name == "Newtoki"){

                domain_newtoki = data[i].Info;

            }

        }

    }

}