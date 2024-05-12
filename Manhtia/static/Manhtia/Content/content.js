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
    try{
        document.getElementById("content").innerHTML = "";
    }catch(error){
        document.getElementById("normalcontent").innerHTML = "";
    }
    
    for(var o = 0; o < data_story.length; o++){
        if(data_more[o].Nation == document.getElementById("nationst").value){
            if(document.getElementById("developer").checked == true){
                create(data_story, o);
            }else{
                normalcreate(data_story, o);
            }
            
        }
    }
}
function rates(){
    try{
        document.getElementById("content").innerHTML = "";
    }catch(error){
        document.getElementById("normalcontent").innerHTML = "";
    }
    for(var o = 0; o < data_story.length; o++){
        if(data_more[o].Rate == document.getElementById("rates").value){
            if(document.getElementById("developer").checked == true){
                create(data_story, o);
            }else{
                normalcreate(data_story, o);
            }
        }
    }
}
function markeds(){
    try{
        document.getElementById("content").innerHTML = "";
    }catch(error){
        document.getElementById("normalcontent").innerHTML = "";
    }
    for(var o = 0; o < data_story.length; o++){
        if(data_more[o].Spoil.includes(document.getElementById("marked").value)){
            if(document.getElementById("developer").checked == true){
                create(data_story, o);
            }else{
                normalcreate(data_story, o);
            }
        }
    }
}
function genres(){
    try{
        document.getElementById("content").innerHTML = "";
    }catch(error){
        document.getElementById("normalcontent").innerHTML = "";
    }
    for(var o = 0; o < data_story.length; o++){
        if(data_more[o].Type.includes(document.getElementById("genre").value)){
            if(document.getElementById("developer").checked == true){
                create(data_story, o);
            }else{
                normalcreate(data_story, o);
            }
        }
    }
}
function overalls(){
    try{
        document.getElementById("content").innerHTML = "";
    }catch(error){
        document.getElementById("normalcontent").innerHTML = "";
    }
    for(var o = 0; o < data_story.length; o++){
        if(data_more[o].Notificate == document.getElementById("overall").value){
            if(document.getElementById("developer").checked == true){
                create(data_story, o);
            }else{
                normalcreate(data_story, o);
            }
        }
    }
}
function purchases(){
    try{
        document.getElementById("content").innerHTML = "";
    }catch(error){
        document.getElementById("normalcontent").innerHTML = "";
    }
        for(var o = 0; o < data_story.length; o++){
            if(data_more[o].Purchase == document.getElementById("purchase").value){
                if(document.getElementById("developer").checked == true){
                    create(data_story, o);
                }else{
                    normalcreate(data_story, o);
                }
            }
        }
}
function reads(){
    try{
        document.getElementById("content").innerHTML = "";
    }catch(error){
        document.getElementById("normalcontent").innerHTML = "";
    }
    for(var o = 0; o < data_story.length; o++){
        if(data_more[o].Read == document.getElementById("read").value){
            if(document.getElementById("developer").checked == true){
                create(data_story, o);
            }else{
                normalcreate(data_story, o);
            }
        }
    }
}
function filters(){
    try{document.getElementById("content").innerHTML = "";}catch(error){document.getElementById("normalcontent").innerHTML = "";}
        var value = document.getElementById("filter").value;
        if(value == "none"){
            clicks();
        }
        if(value == "yes"){
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Website == value){create(data_story, i);}
            }
        }
        if(value == "no"){
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Website == value){create(data_story, i);}
            }
        }
        if(value == "ongoing"){
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Status == value){create(data_story, i);}
            }
        }
        if(value == "end"){
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Status == value){create(data_story, i);}
            }
        }
        if(value == "uptoday"){

            var getday = getday_korea()[0];
            var getdate = getday_korea()[1];

            for(var i = 0; i < data_story.length; i++){
                
                //for weekly update
                if(data_story[i].Date == getday && data_story[i].Status != "end"){
                    
                    if(document.getElementById("developer").checked == true){
                        
                        create(data_story, i);

                    }
                    else{
                        normalcreate(data_story, i);
                    }
                }
                
                //for date update
                if(data_story[i].Date == "n"){
                    var dates = data_more[i].Spoil.split(" ");
                    for(var j = 0; j < dates.length; j++){
                        if(dates[j].includes("UpdateEvery")){

                            var dates_sub = dates[j].substring(12).split("/");
                            getdate = getdate.toString();
                            
                            if((dates_sub.includes(getdate) || dates_sub.includes(getdate + 1) || dates_sub.includes(getdate - 1)) && data_story[i].Status != "end"){
                                if(document.getElementById("developer").checked == true){
                        
                                    create(data_story, i);
            
                                }
                                else{
                                    normalcreate(data_story, i);
                                }
                            }

                        }
                    }
                }
            }
        }
        if(value == "upyesterday"){
            var getday = getday_korea()[0];
            var getdate = getday_korea()[1];
            for(var i = 0; i < data_story.length; i++){
                if(getday == 0){getday = 7;}
                if(getday - 1 == data_story[i].Date && data_story[i].Status != "end"){
                    if(document.getElementById("developer").checked == true){
                        
                        create(data_story, i);

                    }
                    else{
                        normalcreate(data_story, i);
                    }
                }
            }
        }
        if(value == "n"){
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create(data_story, i);}
            }
        }
        if(value == "1"){
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create(data_story, i);}
            }
        }
        if(value == "2"){
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create(data_story, i);}
            }
        }
        if(value == "3"){
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create(data_story, i);}
            }
        }
        if(value == "4"){
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create(data_story, i);}
            }
        }
        if(value == "5"){
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create(data_story, i);}
            }
        }
        if(value == "6"){
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create(data_story, i);}
            }
        }
        if(value == "0"){
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create(data_story, i);}
            }
        }
}

function main(data){

    var datalist = document.getElementById("namestm");

    for(var o = 0; o < data_story.length; o++){
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

    //initial create
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

        //use parameter
        /*const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('page', num_page);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        history.pushState({}, '', newUrl);*/


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

    //to start page
    clicks();
    c();
    
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
    if(document.getElementById("developer").checked == true){

        //use parameter
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('developer', 'allow');
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        history.pushState({}, '', newUrl);

    }
}

