const data_csv_normal = "https://docs.google.com/spreadsheets/d/1Mn2FDBvSjufDqNNxBn1SHVHFaCF0EnXnFDuwiS-Nbpg/export?format=csv";
const data_csv_main = "https://docs.google.com/spreadsheets/d/12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY/export?format=csv";
fetch(data_csv_normal).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){readdomain(csv); clicks(); c();});
fetch(data_csv_main).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){mains = csv; main(csv); clicks(); c();});
const data_csv_mores = "https://docs.google.com/spreadsheets/d/1vAmEFn17c6kJMQwJ5JPYlvtWnRRweM8O-uk1mwn5xgU/export?format=csv";

var mains = [];
var mores = [];

window.setInterval(function(){
    var date = new Date();
    var options = {timeZone: 'Asia/Seoul', hour12: true};
    var eastCoastTime = date.toLocaleString('en-UK', options);
    document.getElementById("time").innerHTML = "S.Korea: " + eastCoastTime + " Almost Chapters will update 10.00PM everyday.";
}, 1000);

fetch(data_csv_mores).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(datamore){
    mores = datamore; clicks(); c();
});
document.getElementById("opensearch").onclick = () => {

    if(document.getElementById("searchdiv").style.display == "block"){
        document.getElementById("searchdiv").style.display = "none";
    }
    else{
        document.getElementById("searchdiv").style.display = "block";
    }

};


document.getElementById('miniclose').onclick = () => {
    document.getElementById("opensearch").click();
}

function c(){
    try{
        const queryfilter = window.location.search;
        const parametersfilter = new URLSearchParams(queryfilter);
        var develope = parametersfilter.get('developer');
        var common = parametersfilter.get('common');
        var nation = parametersfilter.get('nation');
        var rate = parametersfilter.get('rate');
        var mark = parametersfilter.get('mark');
        var overall = parametersfilter.get('overall');
        var purchase = parametersfilter.get('purchase');
        var genre = parametersfilter.get('genre');
        var read = parametersfilter.get('read');
        var page = parametersfilter.get('page');

        if(develope == "allow"){document.getElementById("developer").checked = true;}

        //common
        
        if(common !== null){document.getElementById("filter").value = common; filters();}
        if(nation !== null){document.getElementById("nationst").value = nation; nationsts();}
        if(rate !== null){document.getElementById("rates").value = rate; rates();}
        if(mark !== null){document.getElementById("marked").value = mark; markeds();}
        if(overall !== null){document.getElementById("overall").value = overall; overalls();}
        if(purchase !== null){document.getElementById("purchase").value = purchase; purchases();}
        if(genre !== null){document.getElementById("genre").value = genre; genres();}
        if(read !== null){document.getElementById("read").value = read; reads();}
        if(page !== null){document.getElementById("page").value = page; clicks();}

    }catch(error){}
}
function nationsts(){
    document.getElementById("content").innerHTML = "";
    for(var o = 0; o < mains.length; o++){
        if(mores[o].Nation == document.getElementById("nationst").value){
            create(mains, o);
        }
    }
}
function rates(){
    document.getElementById("content").innerHTML = "";
    for(var o = 0; o < mains.length; o++){
        if(mores[o].Rate == document.getElementById("rates").value){
            create(mains, o);
        }
    }
}
function markeds(){
    document.getElementById("content").innerHTML = "";
    for(var o = 0; o < mains.length; o++){
        if(mores[o].Spoil.includes(document.getElementById("marked").value)){
            create(mains, o);
        }
    }
}
function genres(){
    document.getElementById("content").innerHTML = "";
    for(var o = 0; o < mains.length; o++){
        if(mores[o].Type.includes(document.getElementById("genre").value)){
            create(mains, o);
        }
    }
}
function overalls(){
    document.getElementById("content").innerHTML = "";
    for(var o = 0; o < mains.length; o++){
        if(mores[o].Notificate == document.getElementById("overall").value){
            create(mains, o);
        }
    }
}
function purchases(){
    document.getElementById("content").innerHTML = "";
        for(var o = 0; o < mains.length; o++){
            if(mores[o].Purchase == document.getElementById("purchase").value){
                create(mains, o);
            }
        }
}
function reads(){
    document.getElementById("content").innerHTML = "";
    for(var o = 0; o < mains.length; o++){
        if(mores[o].Read == document.getElementById("read").value){
            create(mains, o);
        }
    }
}
function filters(){
    document.getElementById("content").innerHTML = "";
        var value = document.getElementById("filter").value;
        if(value == "none"){
            clicks();
        }
        if(value == "yes"){
            for(var i = 0; i < mains.length; i++){
                if(mains[i].Website == value){create(mains, i);}
            }
        }
        if(value == "no"){
            for(var i = 0; i < mains.length; i++){
                if(mains[i].Website == value){create(mains, i);}
            }
        }
        if(value == "ongoing"){
            for(var i = 0; i < mains.length; i++){
                if(mains[i].Status == value){create(mains, i);}
            }
        }
        if(value == "end"){
            for(var i = 0; i < mains.length; i++){
                if(mains[i].Status == value){create(mains, i);}
            }
        }
        if(value == "uptoday"){
            for(var i = 0; i < mains.length; i++){
                const today = new Date();
                var getday = today.getDay();
                var getdate = today.getDate();
                if(getday == 0){getday = 7;}
                if(mains[i].Date.includes(getday) && mains[i].Status != "end"){create(mains, i);}//for weekly update
                
                //for date update
                if(mains[i].Date == "n"){
                    var dates = mores[i].Spoil.split(" ");
                    for(var j = 0; j < dates.length; j++){
                        if(dates[j].includes("UpdateEvery")){
                            
                            if((dates[j].includes(getdate) || dates[j].includes(getdate + 1) || dates[j].includes(getdate - 1)) && mains[i].Status != "end"){
                                create(mains, i);
                            }

                        }
                    }
                }
            }
        }
        if(value == "upyesterday"){
            for(var i = 0; i < mains.length; i++){
                const today = new Date();
                var getday = today.getDay();
                if(getday == 0){getday = 7;}
                if(getday - 1 == mains[i].Date && mains[i].Status != "end"){create(mains, i);}
            }
        }
        if(value == "n"){
            for(var i = 0; i < mains.length; i++){
                if(mains[i].Date == value){create(mains, i);}
            }
        }
        if(value == "1"){
            for(var i = 0; i < mains.length; i++){
                if(mains[i].Date == value){create(mains, i);}
            }
        }
        if(value == "2"){
            for(var i = 0; i < mains.length; i++){
                if(mains[i].Date == value){create(mains, i);}
            }
        }
        if(value == "3"){
            for(var i = 0; i < mains.length; i++){
                if(mains[i].Date == value){create(mains, i);}
            }
        }
        if(value == "4"){
            for(var i = 0; i < mains.length; i++){
                if(mains[i].Date == value){create(mains, i);}
            }
        }
        if(value == "5"){
            for(var i = 0; i < mains.length; i++){
                if(mains[i].Date == value){create(mains, i);}
            }
        }
        if(value == "6"){
            for(var i = 0; i < mains.length; i++){
                if(mains[i].Date == value){create(mains, i);}
            }
        }
        if(value == "7"){
            for(var i = 0; i < mains.length; i++){
                if(mains[i].Date == value){create(mains, i);}
            }
        }
}

function main(data){

    mains = data;
    var datalist = document.getElementById("namestm");

    for(var o = 0; o < mains.length; o++){
        const option = document.createElement('option');
        option.text = data[o].Name;
        option.value = data[o].Name;
        datalist.appendChild(option);
    }

    document.getElementById("names").oninput = () => {

        document.getElementById("content").innerHTML = "";
        for(var o = 0; o < data.length; o++){
            if(data[o].Name.toLowerCase().includes(document.getElementById("names").value.toLowerCase())){
                create(data, o);
            }
        }

    };
    document.getElementById("filter").onchange = () => {
        
        filters();
        
    }
    document.getElementById("nationst").onchange = () => {

        nationsts();

    };
    document.getElementById("rates").onchange = () => {

        rates();

    };
    document.getElementById("marked").onchange = () => {

        markeds();

    };
    document.getElementById("genre").onchange = () => {

        genres();

    };
    document.getElementById("overall").onchange = () => {

        overalls();

    };
    document.getElementById("purchase").onchange = () => {

        purchases();

    };
    document.getElementById("read").onchange = () => {

        reads();

    };

    var numcontPerpage = 50;
    if(window.innerWidth < 900){document.getElementById("content").style.overflow = "auto";}
    var num_page = data.length / numcontPerpage;
    var page = 1;
    for (var a = 1; a <= num_page + 1; a++){
        var opt = document.createElement('option');
        opt.value = a;
        opt.innerHTML = a;
        document.getElementById("page").appendChild(opt);
    }
    
    document.getElementById("go").onclick = () => {
        try {
            document.getElementById("content").innerHTML = "";
        } catch(error){
            document.getElementById("normalcontent").innerHTML = "";
        }
        num_page = document.getElementById("page").options[document.getElementById("page").selectedIndex].text;
        max = (num_page * numcontPerpage);
        min = max - numcontPerpage;
        for(var i = min; i < max; i++){
            choosetype(data, i);
        }

    }
    document.getElementById("next").onclick = () => {
        const se = document.querySelector('#page');
        se.value = document.getElementById("page").options[document.getElementById("page").selectedIndex + 1].text;
        clicks();
    }
    document.getElementById("prev").onclick = () => {
        const se = document.querySelector('#page');
        se.value = document.getElementById("page").options[document.getElementById("page").selectedIndex - 1].text;
        clicks();
    }
    //clicks();
}

//Reset common search
function research(){
    document.getElementById("filter").value = "none";
    document.getElementById("names").value = "";
    document.getElementById("genre").value = "none";
    document.getElementById("rates").value = "none";
    document.getElementById("nationst").value = "none";
    document.getElementById("marked").value = "none";
    document.getElementById("overall").value = "none";
    document.getElementById("purchase").value = "none";
    document.getElementById("read").value = "none";
    clicks();
}

//Click go button
function clicks(){
    document.getElementById("go").click();
}
//choose type
function choosetype(data, i){

    var develope = (document.getElementById("developer").checked == true) ? create(data, i) : normalcreate(data, i);
}

var domain_newtoki = "";
//Developer create

//Read newtoki domain
function readdomain(data){

    for(var i = 0; i < data.length; i++){

        if(data[i].Status == "yes"){

            if(data[i].Name == "Newtoki"){

                domain_newtoki = data[i].Info;
                //document.getElementById("go").click();

            }

        }

    }

}

