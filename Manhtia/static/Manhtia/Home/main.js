//Load data from API
const data_main = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY&p=Manhwa";

fetch(data_main)
    .then(d => d.json())
    .then(d => {
        main(d);
    })

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
//create update today
function normalcreatetoday(data, i){

    var main_link = document.createElement("a");
    var main_span = document.createElement("img");
    //var name_div = document.createElement("lable");
    main_span.className = "normalspan";
    //name_div.className = "namenormal";

    main_link.appendChild(main_span);
    main_link.href = "content/" + data[i].Name + "/";

    //name_div.innerHTML = data[i].Name;
    main_span.setAttribute('src', data[i].Cover);

    //main_span.appendChild(name_div);
    document.getElementById("today").appendChild(main_link);

}
//create yesterday update
function normalcreateyesterday(data, i){

    var main_link = document.createElement("a");
    var main_span = document.createElement("img");
    //var name_div = document.createElement("lable");
    main_span.className = "normalspan";
    //name_div.className = "namenormal";

    main_link.appendChild(main_span);
    main_link.href = "content/" + data[i].Name + "/";

    //name_div.innerHTML = data[i].Name;
    main_span.setAttribute('src', data[i].Cover);

    //main_span.appendChild(name_div);
    document.getElementById("yesterday").appendChild(main_link);

}
//create developer
function create_up(data, i){
    
    var upd = "";
    const today = new Date();
    var getday = today.getDay();
    if(getday == 0){getday = 7;}

    if(getday == data[i].Date && data[i].Status !== "end"){
        normalcreatetoday(data, i);
        /*count_today++;
        upd = "Update!";
        var main_div = document.createElement("div");
        var name_div = document.createElement("div");
        var data_div = document.createElement("div");
        var cove_div = document.createElement("div");
        var cove_img = document.createElement("img");
        var yes_div = document.createElement("div");

        yes_div.innerHTML = "<img src='https://i.pinimg.com/564x/70/04/79/700479c6e38c5cdf852a6f8ae2a61aa5.jpg' id='website_check'>";
        yes_div.style.width = "30px";
        yes_div.style.float = "right";

        main_div.style.width = "320px";
        name_div.innerHTML = "<div style='width: 250px; float: left;'>" + data[i].Name + "</div>";
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
        if(data[i].Website == "yes"){main_div.style.backgroundColor = "white"; name_div.appendChild(yes_div);}
        else{main_div.style.backgroundColor = "white";}
        document.getElementById("today").appendChild(main_div);*/

    }
    if(getday - 1 == data[i].Date && data[i].Status != "end"){

        normalcreateyesterday(data, i);

        /*count_yesterday++;
        upd = "Check Translate!";
        var main_div = document.createElement("div");
        var name_div = document.createElement("div");
        var data_div = document.createElement("div");
        var cove_div = document.createElement("div");
        var cove_img = document.createElement("img");
        var yes_div = document.createElement("div");

        yes_div.innerHTML = "<img src='https://i.pinimg.com/564x/70/04/79/700479c6e38c5cdf852a6f8ae2a61aa5.jpg' id='website_check'>";
        yes_div.style.width = "30px";
        yes_div.style.float = "right";

        main_div.style.width = "320px";
        name_div.innerHTML = "<div style='width: 250px; float: left;'>" + data[i].Name + "</div>";
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
        if(data[i].Website == "yes"){main_div.style.backgroundColor = "white"; name_div.appendChild(yes_div);}
        else{main_div.style.backgroundColor = "white";}
        document.getElementById("yesterday").appendChild(main_div);*/

    }
    
}
