//Main Javascript use for every page that is a gate.
const data_csv_normal = "https://docs.google.com/spreadsheets/d/1Mn2FDBvSjufDqNNxBn1SHVHFaCF0EnXnFDuwiS-Nbpg/export?format=csv";
fetch(data_csv_normal).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){normal(csv);});
function normal(data){

    window.setInterval(function(){
        var date = new Date();
        var options = {timeZone: 'Asia/Seoul', hour12: true};
        var eastCoastTime = date.toLocaleString('en-UK', options);
        document.getElementById("time").innerHTML = "S.Korea: " + eastCoastTime + " Almost Chapters will update 10.00PM everyday.";
    }, 1000);

    //Notificate
    if(data[0].Status == "yes"){document.getElementById("notificate").style.display = "block"; document.getElementById("notificate").innerHTML = data[0].Info;}
    for(var i = 0; i < data.length; i++){

        if(data[1].Status == "no"){
            var e = document.getElementsByTagName('html')[0];
            e.removeChild(document.body);
            e.innerHTML = "<img style='width: 200px;' src='https://i.pinimg.com/564x/68/b3/6d/68b36d7bab2ce5db6f27f1df36367d64.jpg'><h1 style='text-align: center;'>Maintenance</h1><h2 style='text-align: center;'>Manhtia is now fixing. Will open soon.<br>(Manhwa Manager)</h2>";
        }

        if(data[i].Status == "yes"){

            var a = document.createElement("div");
            var app = document.getElementById("app");

            if(data[i].Group == "kr"){

                a.innerHTML = "<a href='" + data[i].Info + "'><img id='slink' src='" + data[i].Piclink + "'></a>" + data[i].Name;
                app.appendChild(a);

            }

            if(data[i].Group == "en"){

                a.innerHTML = "<a href='" + data[i].Info + "'><img id='slink' src='" + data[i].Piclink + "'></a> " + data[i].Name;
                app.appendChild(a);

            }

            if(data[i].Group == "th"){

                a.innerHTML = "<a href='" + data[i].Info + "'><img id='slink' src='" + data[i].Piclink + "'></a>" + data[i].Name;
                app.appendChild(a);

            }

            if(data[i].Group == "fantrans"){

                a.innerHTML = "<a href='" + data[i].Info + "'><img id='slink' src='" + data[i].Piclink + "'></a>" + data[i].Name;
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

            /*if(data[i].Group == "domain"){

                var s = document.createElement("div");
                s.innerHTML = "<a href='" + data[i].Info + "'>" + data[i].Name + "</a>";
                s.style.width = "30px";
                document.getElementById("s").appendChild(s);

            }*/

        }

    }

}
function process(text_to_convey){
    
    var contrainer = document.createElement("div");
    var info = document.createElement("div");
    var label = document.createElement("h4");
    label.innerHTML = "Notice!";
    contrainer.id = "process";
    info.innerHTML = text_to_convey;

    var close = document.createElement("button");
    close.innerHTML = "OK, I understand.";
    close.onclick = () => {
        contrainer.remove();
    }
    contrainer.appendChild(label);
    contrainer.appendChild(info);
    contrainer.appendChild(close);
    document.body.appendChild(contrainer);
}