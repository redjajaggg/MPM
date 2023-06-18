const data_csv_main = "https://docs.google.com/spreadsheets/d/12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY/export?format=csv";
const data_csv_normal = "https://docs.google.com/spreadsheets/d/1Mn2FDBvSjufDqNNxBn1SHVHFaCF0EnXnFDuwiS-Nbpg/export?format=csv";
fetch(data_csv_normal).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){normal(csv);});
fetch(data_csv_main).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){main(csv);});


var count_today = 0;
var count_yesterday = 0;

function main(data){
    
    if(window.innerWidth < 900){document.getElementById("update").style.width = "340px"; document.getElementById("update").style.overflow = "auto";}

    statistic_main(data);
    statistic_more();
    for(var i = 0; i < data.length; i++){

        create_up(data, i);

    }
    document.getElementById("data").innerHTML = "Today's Update (Expected): " + count_today + " story(s) and Translate (Expected): " + count_yesterday + " story(s). From Client's time zone.";
    
    random(data);
    changetime();
    window.setInterval(function(){
        random(data);
        changetime();
      }, 10000);
}

function random(data){
    document.getElementById("recomend").innerHTML = "";
    var num = 5;
    if(window.innerWidth < 1500){num = 4;}
    for(var i = 0; i < num; i++){

        var random = Math.floor(Math.random() * data.length);
        var img = document.createElement('img');
        

        img.setAttribute('src', data[random].Cover);
        img.setAttribute('width', 290);
        img.setAttribute('height', 410);img.setAttribute('id', "rec");
        img.style.borderRadius = "20px";
        document.getElementById("recomend").appendChild(img);

    }

}
function changetime(){
    var pros = document.createElement('div');
    document.getElementById("recomend").appendChild(pros);
    var count = 0;
    window.setInterval(function(){
        count++;
        pros.innerHTML = "Recommend";
        pros.style.backgroundColor = "red";
        pros.style.borderRadius = "30px";
        pros.style.width = count * 0.1 + "%";
      }, 10);
}

function statistic_main(datamain){

    const todayd = new Date();
    var getday = todayd.getDay();
    if(getday == 0){getday = 7;}

    var today = document.getElementById("todaysup");
    var has = document.getElementById("hasoffline");
    var end = document.getElementById("endstatus");
    var unknown = document.getElementById("unknowndate");
    var histo = document.getElementById("history");
    var value1 = document.getElementById("value1");
    var value2 = document.getElementById("value2"); 
    var value3 = document.getElementById("value3"); 
    var value4 = document.getElementById("value4");
    var value7 = document.getElementById("value7");
    var cp = document.getElementById("parts"); 
    var cn = document.getElementById("number");

    var all_num = datamain.length;
    var progresswidth = today.offsetWidth;

    var today_up = 0;
    var offline = 0;
    var endstatus = 0;
    var unkdate = 0;
    var hiscount = 0;
    for(var i = 0; i < all_num; i++){

        if(getday == datamain[i].Date && datamain[i].Status !== "end"){today_up++;}
        if(datamain[i].Website == "yes"){offline++;}
        if(datamain[i].Status == "end"){endstatus++;}
        if(datamain[i].Date == "n"){unkdate++;}
        if(datamain[i].Histotime == "H"){hiscount++;}

        value1.innerHTML = percent(today_up, all_num).toFixed(2) + "%";
        value2.innerHTML = percent(offline, all_num).toFixed(2) + "%";
        value3.innerHTML = percent(endstatus, all_num).toFixed(2) + "%";
        value4.innerHTML = percent(unkdate, all_num).toFixed(2) + "%";
        value7.innerHTML = percent(hiscount, all_num).toFixed(2) + "%";
        cp.innerHTML = "Current Part: " + datamain[i].Part;
        cn.innerHTML = "Current Number: " + datamain[i].Number;

    }
    today.style.width = perc_size(percent(today_up, all_num), progresswidth) + "px";
    has.style.width = perc_size(percent(offline, all_num), progresswidth) + "px";
    end.style.width = perc_size(percent(endstatus, all_num), progresswidth) + "px";
    unknown.style.width = perc_size(percent(unkdate, all_num), progresswidth) + "px";
    histo.style.width = perc_size(percent(hiscount, all_num), progresswidth) + "px";
    
}

function statistic_more(){

    const data_csv_mores = "https://docs.google.com/spreadsheets/d/1vAmEFn17c6kJMQwJ5JPYlvtWnRRweM8O-uk1mwn5xgU/export?format=csv";
    fetch(data_csv_mores).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(datamore){

        var mature = document.getElementById("rmature");
        var complete = document.getElementById("complete");
        var value5 = document.getElementById("value5");
        var value6 = document.getElementById("value6");
        var all_num = datamore.length;
        var progresswidth = mature.offsetWidth;

        var matcount = 0;
        var comcount = 0;

        for(var i = 0; i < all_num; i++){

            if(datamore[i].Rate != "n"){matcount++;}
            if(datamore[i].Notificate == "c"){comcount++;}

            value5.innerHTML = percent(matcount, all_num).toFixed(2) + "%";
            value6.innerHTML = percent(comcount, all_num).toFixed(2) + "%";

        }
        mature.style.width = perc_size(percent(matcount, all_num), progresswidth) + "px";
        complete.style.width = perc_size(percent(comcount, all_num), progresswidth) + "px";
    });

}

function percent(count, of){

    return (count / of) * 100

}

function perc_size(percent, max_size){

    return (max_size) * (percent / 100);

}

var domain_newtoki = "";
function create_up(data, i){
    
    var upd = "";
    const today = new Date();
    var getday = today.getDay();
    if(getday == 0){getday = 7;}

    if(getday == data[i].Date && data[i].Status !== "end"){

        count_today++;
        upd = "Update!";
        var main_div = document.createElement("div");
        var name_div = document.createElement("div");
        var data_div = document.createElement("div");
        var cove_div = document.createElement("div");
        var cove_img = document.createElement("img");

        main_div.style.width = "320px";
        name_div.innerHTML = data[i].Name;
        name_div.style.fontWeight = "700";
        name_div.setAttribute("id", "name");

        var newtokilink = data[i].Newtoki + "";
        var newnewtokilink = domain_newtoki + newtokilink.substring(23);
        
        var link1 = "";
        var link2 = "";
        var link3 = "";
        var link4 = "";
        if(data[i].Rawweb != "n"){link1 = "<a class='modernlink' href='" + data[i].Rawweb + "'>RawM</a>"}
        if(data[i].Newtoki != "n"){link2 = "<a class='modernlink' href='" + newnewtokilink + "'>RawL</a>"}
        if(data[i].Translate != "n"){link3 = "<a class='modernlink' href='" + data[i].Translate + "'>English</a>"}
        if(data[i].Otherweb != "n"){link4 = "<a class='modernlink' href='" + data[i].Otherweb + "'>Other</a>"}
        data_div.innerHTML = "Part: " + data[i].Part + "<br>Date: " + convert_date(data[i].Date) + "<br>Number: " + data[i].Number + "<br>" + link1 + link2 + link3 + link4;
        data_div.style.width = "190px";
        data_div.style.float = "left";
        data_div.style.textAlign = "left";

        cove_img.setAttribute("src", data[i].Cover);
        cove_img.style.width = "100px";
        cove_img.style.borderRadius = "5px";
        cove_div.style.width = "101px";
        cove_div.style.float = "right";
        cove_div.appendChild(cove_img);

        main_div.appendChild(name_div);
        main_div.appendChild(data_div);
        main_div.appendChild(cove_div);
        main_div.setAttribute("class", "moderndiv");
        main_div.setAttribute("id", "eachstorydiv");
        if(data[i].Website == "yes"){main_div.style.backgroundColor = "#f7b7e2";}
        else{main_div.style.backgroundColor = "#a5faa6";}
        document.getElementById("today").appendChild(main_div);

    }
    if(getday - 1 == data[i].Date && data[i].Status != "end"){

        count_yesterday++;
        upd = "Check Translate!";
        var main_div = document.createElement("div");
        var name_div = document.createElement("div");
        var data_div = document.createElement("div");
        var cove_div = document.createElement("div");
        var cove_img = document.createElement("img");

        main_div.style.width = "320px";
        name_div.innerHTML = data[i].Name;
        name_div.style.fontWeight = "700";
        name_div.setAttribute("id", "name");

        var newtokilink = data[i].Newtoki + "";
        var newnewtokilink = domain_newtoki + newtokilink.substring(23);

        var link1 = "";
        var link2 = "";
        var link3 = "";
        var link4 = "";
        if(data[i].Rawweb != "n"){link1 = "<a class='modernlink' href='" + data[i].Rawweb + "'>RawM</a>"}
        if(data[i].Newtoki != "n"){link2 = "<a class='modernlink' href='" + newnewtokilink + "'>RawL</a>"}
        if(data[i].Translate != "n"){link3 = "<a class='modernlink' href='" + data[i].Translate + "'>English</a>"}
        if(data[i].Otherweb != "n"){link4 = "<a class='modernlink' href='" + data[i].Rawweb + "'>Other</a>"}
        data_div.innerHTML = "Part: " + data[i].Part + "<br>Date: " + convert_date(data[i].Date) + "<br>Number: " + data[i].Number + "<br>" + link1 + link2 + link3 + link4;
        data_div.style.width = "190px";
        data_div.style.float = "left";
        data_div.style.textAlign = "left";

        cove_img.setAttribute("src", data[i].Cover);
        cove_img.style.width = "100px";
        cove_img.style.borderRadius = "5px";
        cove_div.style.width = "101px";
        cove_div.style.float = "right";
        cove_div.appendChild(cove_img);

        main_div.appendChild(name_div);
        main_div.appendChild(data_div);
        main_div.appendChild(cove_div);
        main_div.setAttribute("class", "moderndiv");
        main_div.setAttribute("id", "eachstorydiv");
        if(data[i].Website == "yes"){main_div.style.backgroundColor = "#f7b7e2";}
        else{main_div.style.backgroundColor = "#a5faa6";}
        document.getElementById("yesterday").appendChild(main_div);

    }
    
}

function normal(data){

    //Notificate
    if(data[0].Status == "yes"){document.getElementById("notificate").style.display = "block"; document.getElementById("notificate").innerHTML = "Notification: " + data[0].Info;}
    for(var i = 0; i < data.length; i++){

        if(data[1].Status == "no"){
            var e = document.getElementsByTagName('html')[0];
            e.removeChild(document.body);
            e.innerHTML = "<h1 style='text-align: center;'>Manhtia is now fixing. Will open soon.</h1>";
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

            a.style.width = " 300px";
            a.style.textAlign = "left";
            a.style.overflow = " hidden";
            a.style.marginRight = " auto";
            a.style.marginLeft = " auto";

            if(data[i].Name == "Newtoki"){

                domain_newtoki = data[i].Info;

            }

            if(data[i].Group == "domain"){

                var s = document.createElement("div");
                s.innerHTML = "<a href='" + data[i].Info + "'>" + data[i].Name + "</a>";
                s.style.width = "30px";
                document.getElementById("s").appendChild(s);

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

