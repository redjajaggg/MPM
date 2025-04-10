/*
// use for check username
const api = "https://script.google.com/macros/s/AKfycbwKSeNj0s7UftD-1JisvD62sBb-gA8fPLfktNlAtJBdHj6jw9XyolhMP2ltXSfU74w/exec";
fetch(api + "?username=" + document.getElementById("usernamecheck").innerHTML + "&type=check").then(datalog => datalog.json()).then(datalog => { 
    if(datalog.userStatus === 1){
        console.log("Logged in.");
    }
    else if(datalog.userStatus === 0){
        document.body.innerHTML = "Please wait for checking, Make sure user sent <a href=''>NEEDED</a>. (" + document.getElementById("usernamecheck").innerHTML + ")";
    }
    else if(datalog.userStatus === 2){
        document.body.innerHTML = "This account cannot access to Manhtia. (" + document.getElementById("usernamecheck").innerHTML + ")";
    }
    else{
        document.body.innerHTML = "No account (" + document.getElementById("usernamecheck").innerHTML + "). Please sign up below.";
    }
}
)*/
var is_logged_in = document.getElementById("usernamecheck").innerHTML;
if(is_logged_in === "True"){
    console.log("Logged in.");
}
else{
    document.body.innerHTML = "<h3>Not Logged in yet. Please login <a href='/manhtia/login'>here</a></h3>";
}

var data_lastest = [];
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
    //changetime();
    window.setInterval(function(){
        random(data);
        //changetime();
      }, 10000);

    //lastest upload chapter by admin
    reloadRecent();

}

//random recommend
function random(data){
    document.getElementById("recomend").innerHTML = "";
    var num = 18;
    if(window.innerWidth < 1500){num = 10;}
    for(var i = 0; i < num; i++){

        var random = Math.floor(Math.random() * data.length);
        var pane = document.createElement('span');
        pane.innerHTML = `
            <div class="card">
                <img class="imgcard" src="${data[random].Cover}" style="width:150px; height: 200px;">
                <div class="container">
                    <a href="/manhtia/content/${data[random].Name}" style="font-weight: bold;">${data[random].Name}</a><br>
                    <label class="meta">(${n_to_unknown(data_more[random].AssName)})</label>
                </div>
            </div>
        `;
        document.getElementById("recomend").appendChild(pane);
      
    }

}
function changetime(){
    /*var pros = document.createElement('div');
    document.getElementById("recomend").appendChild(pros);
    var count = 0;
    window.setInterval(function(){
        count++;
        pros.innerHTML = "Preview!";
        pros.style.backgroundColor = "red";
        pros.style.borderRadius = "30px";
        pros.style.width = count * 0.1 + "%";
      }, 10);*/
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
    
    var value1 = document.getElementById("value1");
    var value2 = document.getElementById("value2"); 
    var value3 = document.getElementById("value3"); 
    var value4 = document.getElementById("value4");
    
    var cn = document.getElementById("number");

    var all_num = datamain.length;
    var progresswidth = today.offsetWidth;

    var today_up = 0;
    var offline = 0;
    var endstatus = 0;
    var unkdate = 0;
    
    for(var i = 0; i < all_num; i++){

        if(getday == datamain[i].Date && datamain[i].Status !== "end"){today_up++;}
        if(datamain[i].Website == "yes"){offline++;}
        if(datamain[i].Status == "end"){endstatus++;}
        if(datamain[i].Date == "n"){unkdate++;}
    
        value1.innerHTML = percent(today_up, all_num).toFixed(2) + "%";
        value2.innerHTML = percent(offline, all_num).toFixed(2) + "%";
        value3.innerHTML = percent(endstatus, all_num).toFixed(2) + "%";
        value4.innerHTML = percent(all_num - unkdate, all_num).toFixed(2) + "%";
        cn.innerHTML = "Story Count: " + datamain[i].Number + " (Total)";

    }
    today.style.width = perc_size(percent(today_up, all_num), progresswidth) + "px";
    has.style.width = perc_size(percent(offline, all_num), progresswidth) + "px";
    end.style.width = perc_size(percent(endstatus, all_num), progresswidth) + "px";
    unknown.style.width = perc_size(percent(all_num - unkdate, all_num), progresswidth) + "px";
        
}
function statistic_more(){

    const data_csv_mores = "https://docs.google.com/spreadsheets/d/1vAmEFn17c6kJMQwJ5JPYlvtWnRRweM8O-uk1mwn5xgU/export?format=csv";
    fetch(data_csv_mores).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(datamore){

        var mature = document.getElementById("rmature");
        var complete = document.getElementById("complete");
        var histo = document.getElementById("history"); //finish
        var value5 = document.getElementById("value5");
        var value6 = document.getElementById("value6");
        var value7 = document.getElementById("value7");

        var all_num = datamore.length;
        var progresswidth = mature.offsetWidth;

        var matcount = 0;
        var comcount = 0;
        var hiscount = 0;

        for(var i = 0; i < all_num; i++){

            if(datamore[i].Rate != "n"){matcount++;}
            if(datamore[i].Notificate == "c"){comcount++;}
            if(datamore[i].Read == "y"){hiscount++;}

            value5.innerHTML = percent(matcount, all_num).toFixed(2) + "%";
            value6.innerHTML = percent(comcount, all_num).toFixed(2) + "%";
            value7.innerHTML = percent(hiscount, all_num).toFixed(2) + "%";

        }
        mature.style.width = perc_size(percent(matcount, all_num), progresswidth) + "px";
        complete.style.width = perc_size(percent(comcount, all_num), progresswidth) + "px";
        histo.style.width = perc_size(percent(hiscount, all_num), progresswidth) + "px";
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

    var pane = document.createElement('span');
    pane.innerHTML = `
        <div class="card">
            <img id='verify${i}' style='display: none; width: 25px; position: absolute; border-bottom-right-radius: 10px;' src='https://i.pinimg.com/736x/c1/b1/39/c1b1393272d4ff7bb4ffebf6a20061b8.jpg'>
            <img class="imgcard" src="${data[i].Cover}" style="width:150px; height: 200px;">
            <div class="container">
                <a href="/manhtia/content/${data[i].Name}" style="font-weight: bold;">${data[i].Name}</a><br>
                <label class="meta">(${n_to_unknown(data_more[i].AssName)})</label>
            </div>
        </div>
    `;
    document.getElementById("today").appendChild(pane);
    if(data_more[i].Purchase == "y"){document.getElementById("verify" + i).style.display = "block";}

}
//create yesterday update
function normalcreateyesterday(data, i){

    var pane = document.createElement('span');
    pane.innerHTML = `
        <div class="card">
            <img id='verify${i}' style='display: none; width: 25px; position: absolute; border-bottom-right-radius: 10px;' src='https://i.pinimg.com/736x/c1/b1/39/c1b1393272d4ff7bb4ffebf6a20061b8.jpg'>
            <img class="imgcard" src="${data[i].Cover}" style="width:150px; height: 200px;">
            <div class="container">
                <a href="/manhtia/content/${data[i].Name}" style="font-weight: bold;">${data[i].Name}</a><br>
                <label class="meta">(${n_to_unknown(data_more[i].AssName)})</label>
            </div>
        </div>
    `;
    document.getElementById("yesterday").appendChild(pane);
    if(data_more[i].Purchase == "y"){document.getElementById("verify" + i).style.display = "block";}

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
    if(getday == 0){getday = 7;}
    if(getday - 1 == data[i].Date && data[i].Status != "end"){

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
function lastestupload(){

    for(var i = 0; i < data_story.length; i++){
        
        if(data_lastest.includes(data_story[i].Name)){
            
            var pane = document.createElement('span');
            pane.innerHTML = `
                <div class="card">
                    <img id='verify${i}' style='display: none; width: 25px; position: absolute; border-bottom-right-radius: 10px;' src='https://i.pinimg.com/736x/c1/b1/39/c1b1393272d4ff7bb4ffebf6a20061b8.jpg'>
                    <img class="imgcard" src="${data_story[i].Cover}" style="width:150px; height: 200px;">
                    <div class="container">
                        <a href="/manhtia/content/${data_story[i].Name}" style="font-weight: bold;">${data_story[i].Name}</a><br>
                        <label class="meta">(${n_to_unknown(data_more[i].AssName)})</label>
                    </div>
                </div>
            `;
            document.getElementById("lastestupload").appendChild(pane);
            if(data_more[i].Purchase == "y"){document.getElementById("verify" + i).style.display = "block";}

        }

    }
    
}
function reloadRecent(){
    document.getElementById("lastestupload").innerHTML = "Loading...";
    const lastestit = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=1dcvmFgJUDy7joDstWCOJpWlDffn5MTN2Tkh_ES6P80E&p=Sheet1";
    fetch(lastestit).then(data => data.json()).then(data => {
        document.getElementById("lastestupload").innerHTML = "";
        for(var i = 0; i < data.length; i++){
            data_lastest.push(data[i].Name);
        }
        lastestupload(); 
    })
}
