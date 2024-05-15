var count_today = 0;
var count_yesterday = 0;

function main(data){
    
    if(window.innerWidth < 900){document.getElementById("update").style.overflow = "auto";}

    statistic_main(data);
    statistic_more();
    for(var i = 0; i < data.length; i++){

        create_up(data, i);

    }
    random(data);
    changetime();
    window.setInterval(function(){
        random(data);
        changetime();
      }, 10000);
}

//random recommend
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

//statistics of website
function statistic_main(datamain){

    const todayd = new Date();
    var getday = getday_korea()[0];
    if(getday == 0){getday = 6;}

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

//create for main page
//create update today
function normalcreatetoday(data, i){

    var main_link = document.createElement("a");
    var main_span = document.createElement("img");
    main_span.className = "normalspan";

    main_link.appendChild(main_span);
    main_link.href = "content/" + data[i].Name + "/";

    main_span.setAttribute('src', data[i].Cover);

    document.getElementById("today").appendChild(main_link);

}
//create yesterday update
function normalcreateyesterday(data, i){

    var main_link = document.createElement("a");
    var main_span = document.createElement("img");
    main_span.className = "normalspan";

    main_link.appendChild(main_span);
    main_link.href = "content/" + data[i].Name + "/";

    main_span.setAttribute('src', data[i].Cover);

    document.getElementById("yesterday").appendChild(main_link);

}
//create developer
function create_up(data, i){
    
    var upd = "";
    const today = new Date();
    var getday = getday_korea()[0];

    //today
    if(getday == data[i].Date && data[i].Status !== "end"){

        normalcreatetoday(data, i);

    }

    //yesterday
    if(getday == 0){getday = 6;}
    if(getday == data[i].Date - 1 && data[i].Status != "end"){

        normalcreateyesterday(data, i);

    }
    
}

//to show statistics
function stats(){
    var link = "https://redjajaggg.github.io/My-Private-Manhwa/statistics.html";
    var contrainer = document.createElement("div");
    var info = document.createElement("iframe");
    var label = document.createElement("label");
    var more = document.createElement("a");
    label.innerHTML = "Statistics of Manhtia";
    label.style.fontWeight = "bold";
    contrainer.id = "process";
    contrainer.style.zIndex = 10;
    info.setAttribute('src', link);
    info.style.width = "29em";
    info.style.height = "14em";
    more.innerHTML = "Explore...";
    more.href = link;

    var close = document.createElement("button");
    close.innerHTML = "X";
    close.style.fontWeight = "bold";
    close.style.float = "right";
    close.onclick = () => {
        contrainer.remove();
    }
    contrainer.appendChild(label);
    contrainer.appendChild(close);
    contrainer.appendChild(info);
    contrainer.appendChild(more);
    document.body.appendChild(contrainer);
}
