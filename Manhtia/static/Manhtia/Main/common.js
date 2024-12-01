//Main Javascript use for every page that is a gate.
/*
    (global)
    -Variable: main_database, story_database, more_database, chapter_database, mature_database, meta_database
    -Function: normal(one time using)

 */
//Manhtia's api(main)
const main_database = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=1Mn2FDBvSjufDqNNxBn1SHVHFaCF0EnXnFDuwiS-Nbpg&p=Sheet1";
const story_database = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY&p=Manhwa";
const more_database = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=1vAmEFn17c6kJMQwJ5JPYlvtWnRRweM8O-uk1mwn5xgU&p=Sheet1";
const chapter_database = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=1R1e93BSQ-dVmHgZadcJmINP_qDJo65CZFBJ98hhzpvk&p=Sheet1";
const mature_database = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=1LGJg6Jl3qV2IQfknt2xOvmvJuKtUaVWMSOcN1HrnHuc&p=Sheet1";
const meta_database = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=16WcmbU1GhKq1E0UvrQ7HsIPHwy5ZYxQxJlpZFG3sszM&p=Sheet1";
//Third party's api
const main_data_export = "https://docs.google.com/spreadsheets/d/1Mn2FDBvSjufDqNNxBn1SHVHFaCF0EnXnFDuwiS-Nbpg/export?format=csv";
const story_data_export = "https://docs.google.com/spreadsheets/d/12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY/export?format=csv";
const more_data_export = "https://docs.google.com/spreadsheets/d/1vAmEFn17c6kJMQwJ5JPYlvtWnRRweM8O-uk1mwn5xgU/export?format=csv";
const chapter_data_export = "https://docs.google.com/spreadsheets/d/1R1e93BSQ-dVmHgZadcJmINP_qDJo65CZFBJ98hhzpvk/export?format=csv";
const mature_data_export = "https://docs.google.com/spreadsheets/d/1LGJg6Jl3qV2IQfknt2xOvmvJuKtUaVWMSOcN1HrnHuc/export?format=csv";
const meta_data_export = "https://docs.google.com/spreadsheets/d/16WcmbU1GhKq1E0UvrQ7HsIPHwy5ZYxQxJlpZFG3sszM/export?format=csv";

//list stored
var data_index = [];
var data_story = [];
var data_more = [];
var data_chapter = [];
var data_mature = [];
var data_meta = [];

//fetch database
try{
    //normal fetch
    fetch(main_database).then(data => data.json()).then(data => {data_index = data; 
        normal(data_index);})
    fetch(story_database).then(data => data.json()).then(data => {data_story = data;
        try{
            main(data_story);
        }catch(errors){console.log("not normal page.");} 
        }) //main function is the main function to start each page
    fetch(more_database).then(data => data.json()).then(data => {data_more = data;
        try{
            clicks();
            c();
        }catch(errors){console.log("not content page.");}
    })
    fetch(chapter_database).then(data => data.json()).then(data => {data_chapter = data;})
    fetch(mature_database).then(data => data.json()).then(data => {data_mature = data;})
    fetch(meta_database).then(data => data.json()).then(data => {data_meta = data;})

    console.log("Fetch data from Manhtia's api");

}catch(error){
    //if normal fetch is error
    fetch(main_data_export).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(data){data_index = data; normal(data_index);});
    fetch(story_data_export).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(data){data_story = data; main(data_story);});
    fetch(more_data_export).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(data){data_more = data;});
    fetch(chapter_data_export).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(data){data_chapter = data;});
    fetch(mature_data_export).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(data){data_mature = data;});
    fetch(meta_data_export).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(data){data_meta = data;});

    console.log("Fetch data from Third party's api");

}

//newtoki domain
var newtoki_domain;
//start website
function normal(data){

    //Notificate
    if(data[0].Status == "yes"){document.getElementById("notificate").style.display = "block"; document.getElementById("notificate").innerHTML = data[0].Info;}
    if(data[0].Info == "n"){document.getElementById("notificate_pane").style.display = "none";}

    //other elements
    for(var i = 0; i < data.length; i++){

        //emergency stop website accessing
        if(data[1].Status == "no" && !window.location.pathname.includes("manager")){
            var e = document.getElementsByTagName('html')[0];
            e.removeChild(document.body);
            e.style.backgroundColor = "#121212";
            e.style.color = "white";
            e.innerHTML = "<h1 style='text-align: center; font-family: Tahoma;'><img style='width: 100px; border-radius: 10px;' src='https://i.pinimg.com/736x/58/8f/75/588f75cdd0b80e674421edd1b587ed89.jpg'><br>Maintenance</h1><h2 style='text-align: center; font-family: Tahoma;'>Manhtia is now fixing. Will open soon.<br>(Manhtia Manager)</h2>";
        }

        //for allow to convey elements
        if(data[i].Status == "yes"){

            var a = document.createElement("label");
            var app = document.getElementById("app");
            
            //official website convey
            if(data[i].Piclink !== "n" && data[i].Group == "source"){
                    
                a.innerHTML = "<a href='" + data[i].Info + "'><img id='slink' src='" + data[i].Piclink + "'></a>";
                app.appendChild(a);

            }
            //other website convey
            if(data[i].Piclink === "n" && data[i].Group == "source"){
                a.innerHTML = "<a href='" + data[i].Info + "'>" +  data[i].Name + "</a>";
                app.appendChild(a);
            }

            a.style.width = " 300px";
            a.style.textAlign = "left";
            a.style.overflow = " hidden";
            a.style.marginRight = " auto";
            a.style.marginLeft = " auto";

            //specific website domain
            if(data[i].Name == "Newtoki"){

                domain_newtoki = data[i].Info;
                newtoki_domain = data[i].Info;

            }

        }
        if(data[i].Status == "no" && data[i].Name == "Manhtia Lite"){
            document.getElementById("lite").href = "http://" + data[i].Piclink;
        }

    }

}

//korean time
setInterval(korean_time, 1000);
function korean_time(){
    var date = new Date();
    var options = {timeZone: 'Asia/Seoul', hour12: true};
    var eastCoastTime = date.toLocaleString('en-UK', options);
    document.getElementById("time").innerHTML = `
        <labeL style='font-weight: bold;'>S.Korea:</labeL> ${eastCoastTime} <label onclick="process('Almost Chapters will update 10.00PM everyday, but updates time to show is Bangkok time.')">(i)</label>
    `;
}
//getday in Thailand function
//return (day of week, date)
function getday_korea(){

    const timeZone = 'Asia/Bangkok';
    const currentDate = new Date().toLocaleString('en-US', { timeZone });
    const dayOfWeekNumeric = new Date(currentDate).getDay();
    const dayOfMonth = new Date(currentDate).getDate();

    return [dayOfWeekNumeric, dayOfMonth];
}
//Notice / Information shower
function process(text_to_convey){
    
    var contrainer = document.createElement("div");
    var info = document.createElement("div");
    var label = document.createElement("h4");
    label.innerHTML = "Notice! | Information";
    contrainer.id = "process";
    contrainer.style.zIndex = 10;
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

//count down to 08.00pm of korea
setInterval(count_down, 1000);
function count_down(){
    var date = new Date();
    var options = {timeZone: 'Asia/Seoul', hour12: false};
    var eastCoastTime = date.toLocaleString('en-UK', options);
    var time = eastCoastTime.slice(-8).split(':');
    if(time[0] >= 22){
        document.getElementById("word").innerHTML = "Congratulation!";
    }
    if(time[0] >= 0 && time[0] <= 7){
        document.getElementById("word").innerHTML = "Let's check for Reading!";
    }
    if(time[0] >= 8 && time[0] <= 21){
        try{
            var hourset = 22 * 60;
            var hour = time[0] * 60;
            var min = time[1] * 1;
            var times = hour + min;
            document.getElementById("countdown").innerHTML = Math.floor(Math.abs(hourset - times) / 60) + ":" + Math.abs(min - 59) + ":" + Math.abs(time[2] - 59);
            document.getElementById("word").innerHTML = "until Updates.";
        }catch(error){}
        
    }
}
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

//off-topics eq.cartoon anime.
function offtopic(){
    var contrainer = document.createElement("div");
    var info = document.createElement("div");
    var label = document.createElement("h4");
    label.innerHTML = "More";
    contrainer.id = "process";
    contrainer.style.zIndex = 10;
    info.innerHTML = `
        <a href='https://a21acjuz391nyjljvyif1q.on.drv.tw/www.myprivatelove.com/'>My Private Manhwa(ManhtiaV1)[closed]</a>
        <a href='https://redjajaggg.github.io/My-Private-Manhwa/index.html'>My Private Manhwa(ManhtiaV2)[stopped]</a>
        <a href='https://redjajaggg.github.io/My-Private-Manhwa/offtopic.html'>Anime / Cartoon</a>
        <a href='https://redjajaggg.github.io/My-Private-Manhwa/loveanddeepspace.html'>Love and Deepspace(Game)</a>
        <a href='https://redjajaggg.github.io/My-Private-Manhwa/bookmark.html'>Story's bookmark</a>

        <br><br>
        <a href='https://t.co/MmxQ1apVMr'>Release calendar</a><label style="font-size:9px;">Cr: candy</label>
        `;

    var close = document.createElement("button");
    close.innerHTML = "X";
    close.style.fontWeight = "bold";
    close.style.float = "right";
    close.onclick = () => {
        contrainer.remove();
    }
    contrainer.appendChild(close);
    contrainer.appendChild(label);
    contrainer.appendChild(info);
    document.body.appendChild(contrainer);
}

//floating searcher
//Open quick search pane
function search_floater(){

    var datalist_eng = document.getElementById("eng_name");
    var datalist_ass = document.getElementById("ass_name");   

    for(var i = 0; i < data_story.length; i++){

        const option = document.createElement('option');
        option.text = data_story[i].Name;
        option.value = data_story[i].Name;
        datalist_eng.appendChild(option);

    }
    for(var i = 0; i < data_more.length; i++){

        const option = document.createElement('option');
        option.text = data_more[i].AssName;
        option.value = data_more[i].AssName;
        datalist_ass.appendChild(option);

    }
    
    document.getElementById("quicksearch").style.display = "block";

}
function reset_float_name(){
    document.getElementById("name_quicks").value = "";
    document.getElementById("assname_quicks").value = "";
}
function eng_name(){
    document.getElementById("assname_quicks").value = "";
    for(var i = 0; i < data_story.length; i++){

        if(data_story[i].Name.includes(document.getElementById("name_quicks").value)){

            document.getElementById("name_shows").innerHTML = `
                <div>
                    <a href="/manhtia/content/${data_story[i].Name}">
                        <img style="width: 100px; border-radius: 5px;" src=${data_story[i].Cover}><br>
                        <label style='font-weight: bold;'>${data_story[i].Name}</label><br>
                        ${data_more[i].AssName}<br>
                        Part: ${data_story[i].Part}<br>
                        Number: ${data_story[i].Number}<br>
                        Status: ${data_story[i].Status}<br>
                        Website: ${data_story[i].Website}
                    </a>
                </div>
            `;

        }

    }
}
function ass_name(){
    document.getElementById("name_quicks").value = "";
    for(var i = 0; i < data_more.length; i++){

        if(data_more[i].AssName.includes(document.getElementById("assname_quicks").value)){

            document.getElementById("name_shows").innerHTML = `
                <div>
                    <a href="/manhtia/content/${data_story[i].Name}">
                        <img style="width: 100px; border-radius: 5px;" src=${data_story[i].Cover}><br>
                        <label style='font-weight: bold;'>${data_story[i].Name}</label><br>
                        ${data_more[i].AssName}<br>
                        Part: ${data_story[i].Part}<br>
                        Number: ${data_story[i].Number}<br>
                        Status: ${data_story[i].Status}<br>
                        Website: ${data_story[i].Website}
                    </a>
                </div>
            `;

        }

    }
}
//Close quick search pane
function closesearch(){
    document.getElementById("eng_name").innerHTML = "";
    document.getElementById("ass_name").innerHTML = "";
    document.getElementById("quicksearch").style.display = "none";
}

