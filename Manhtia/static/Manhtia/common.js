//Main Javascript use for every page that is a gate.
const data_csv_normal = "https://docs.google.com/spreadsheets/d/1Mn2FDBvSjufDqNNxBn1SHVHFaCF0EnXnFDuwiS-Nbpg/export?format=csv";
fetch(data_csv_normal).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){normal(csv);});

var domain_newtoki = "";

function normal(data){

    window.setInterval(function(){
        var date = new Date();
        var options = {timeZone: 'Asia/Seoul', hour12: true};
        var eastCoastTime = date.toLocaleString('en-UK', options);
        document.getElementById("time").innerHTML = "S.Korea: " + eastCoastTime + " <label id='information_notice' onclick='times()'>(i)</label>";
    }, 1000);
    
    //version
    document.getElementById("version").innerHTML = " Version " + data[0].Piclink;

    //Notificate
    if(data[0].Status == "yes"){document.getElementById("notificate").style.display = "block"; document.getElementById("notificate").innerHTML = data[0].Info;}
    for(var i = 0; i < data.length; i++){

        if(data[1].Status == "no"){
            var e = document.getElementsByTagName('html')[0];
            e.removeChild(document.body);
            e.innerHTML = "<img style='width: 200px;' src='https://i.pinimg.com/564x/68/b3/6d/68b36d7bab2ce5db6f27f1df36367d64.jpg'> <img style='width: 200px;' src='https://i.pinimg.com/564x/6f/b1/fa/6fb1fa3c16a2aa37a4ab3d7e192b7c2d.jpg'> Manhtia | Manhtia Team. <h1 style='text-align: center;'>Maintenance</h1><h2 style='text-align: center;'>Manhtia is now fixing. Will open soon.<br>(Manhwa Manager)</h2>";
        }

        if(data[i].Status == "yes"){

            var a = document.createElement("label");
            var app = document.getElementById("app");

            if(data[i].Group == "kr"){

                a.innerHTML = "<a href='" + data[i].Info + "'><img id='slink' src='" + data[i].Piclink + "'></a>";
                app.appendChild(a);

            }

            if(data[i].Group == "en"){

                a.innerHTML = "<a href='" + data[i].Info + "'><img id='slink' src='" + data[i].Piclink + "'></a> ";
                app.appendChild(a);

            }

            if(data[i].Group == "th"){

                a.innerHTML = "<a href='" + data[i].Info + "'><img id='slink' src='" + data[i].Piclink + "'></a>";
                app.appendChild(a);

            }

            if(data[i].Group == "fantrans"){

                a.innerHTML = "<a href='" + data[i].Info + "'>" + data[i].Name + "</a>";
                app.appendChild(a);

            }

            a.style.width = " 400px";

            if(data[i].Name == "Newtoki"){

                domain_newtoki = data[i].Info;
                var element = document.getElementById('newtoki_todomain');

                if (element !== null) {
                    document.getElementById('newtoki_todomain').innerHTML = data[i].Info;
                }

            }

        }

    }

}

function convert_date(date){
    var day = "";
    switch(date){
        case "1": day = "Mon-Tue"; break;
        case "2": day = "Tue-Wed"; break;
        case "3": day = "Wed-Thu"; break;
        case "4": day = "Thu-Fri"; break;
        case "5": day = "Fri-Sat"; break;
        case "6": day = "Sat-Sun"; break;
        case "7": day = "Sun-Mon"; break;
        case "n": day = "Unknown"; break;
    }
    return day;
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
function times(){
    process("This time is Korean standard, Story will update on 10pm each day.<br>But, some story might update every 10 days.<br><br><br>");
}