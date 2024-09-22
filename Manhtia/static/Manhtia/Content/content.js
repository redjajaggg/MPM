//to start page(after loaded)
function c(){
    /*

        parameter(values) = meaning/process:

            developer(allow, clear) = developer using interface
            type(fav, favr) = convey style
            page() = page of story show each page max story showing is 50
            common() = common values in main database
            nation(kr, cn, th, n) = national of story
            rate(n, 15, 18) = rate of story
            mark() = mark content style of story
            overall(n, c) = overall status on Manhtia
            purchase(n, y, s, w) = purchase for chapters
            genre() = genre of story
            read(n, y) = read story

     */
    try{
        const queryfilter = window.location.search;
        const parametersfilter = new URLSearchParams(queryfilter);

        //parameter by using
        var develope = parametersfilter.get('developer');
        var type = parametersfilter.get('type');
        var page = parametersfilter.get('page');

        //parameter by type of story
        var common = parametersfilter.get('common');
        var nation = parametersfilter.get('nation');
        var rate = parametersfilter.get('rate');
        var mark = parametersfilter.get('mark');
        var overall = parametersfilter.get('overall');
        var purchase = parametersfilter.get('purchase');
        var genre = parametersfilter.get('genre');
        var read = parametersfilter.get('read');
        
        if(develope == "allow"){document.getElementById("developer").checked = true;}
        if(develope == "clear"){document.getElementById("ordinary").checked = true;}

        //common / set value in search pane
        if(page !== null){document.getElementById("page").value = page; clicks();}
        if(common !== null){document.getElementById("filter").value = common; filters();}
        if(nation !== null){document.getElementById("nationst").value = nation; nationsts();}
        if(rate !== null){document.getElementById("rates").value = rate; rates();}
        if(mark !== null){document.getElementById("marked").value = mark; markeds();}
        if(overall !== null){document.getElementById("overall").value = overall; overalls();}
        if(purchase !== null){document.getElementById("purchase").value = purchase; purchases();}
        if(genre !== null){document.getElementById("genre").value = genre; genres();}
        if(read !== null){document.getElementById("read").value = read; reads();}

        if(type !== null && type == "fav"){favorite_normal();}
        if(type !== null && type == "favr"){favorite_read();}

    }catch(error){}

}
//convey each type of chose
function filters(){
    clear_command();
    
    var value = document.getElementById("filter").value;
    switch(value){
        case "none": clicks(); break;
        case "yes": 
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Website == value){create_command(data_story, i);}
            }
            break;
        case "no": 
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Website == value){create_command(data_story, i);}
            }
            break;
        case "ongoing": 
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Status == value){create_command(data_story, i);}
            }
            break;
        case "end": 
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Status == value){create_command(data_story, i);}
            }
        break;
        case "uptoday":// update today 
            var getday = getday_korea()[0];
            var getdate = getday_korea()[1];

            for(var i = 0; i < data_story.length; i++){
                
                //for weekly update
                if(data_story[i].Date == getday && data_story[i].Status != "end"){
                    
                    create_command(data_story, i);

                }
                
                //for date update
                if(data_story[i].Date == "n"){
                    var dates = data_more[i].Spoil.split(" ");
                    for(var j = 0; j < dates.length; j++){
                        if(dates[j].includes("UpdateEvery")){

                            var dates_sub = dates[j].substring(12).split("/").map(Number);                        
                            getdate = parseInt(getdate);
                            
                            //includes a day before and after update date for accuracy
                            if((dates_sub.includes(getdate) || dates_sub.includes(getdate - 1) || dates_sub.includes(getdate + 1)) && data_story[i].Status != "end"){
                                create_command(data_story, i);
                            }
                        }
                    }
                }
            }
            break;
        case "upyesterday": 
            var getday = getday_korea()[0];
            var getdate = getday_korea()[1];
            for(var i = 0; i < data_story.length; i++){
                if(getday == 0){getday = 7;}
                if(getday - 1 == data_story[i].Date && data_story[i].Status != "end"){
                    create_command(data_story, i);
                }
            }
            break;
        case "n": 
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create_command(data_story, i);}
            }
        break;
        case "1": 
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create_command(data_story, i);}
            }
            break;
        case "2": 
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create_command(data_story, i);}
            }
            break;
        case "3": 
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create_command(data_story, i);}
            }
            break;
        case "4": 
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create_command(data_story, i);}
            }
            break;
        case "5": 
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create_command(data_story, i);}
            }
            break;
        case "6": 
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create_command(data_story, i);}
            }
            break;
        case "0": 
            for(var i = 0; i < data_story.length; i++){
                if(data_story[i].Date == value){create_command(data_story, i);}
            }
            break;
    }
}
function nationsts(){
    clear_command();
    
    for(var o = 0; o < data_story.length; o++){
        if(data_more[o].Nation == document.getElementById("nationst").value){
            create_command(data_story, o);
        }
    }
}
function rates(){
    clear_command();
    
    for(var o = 0; o < data_story.length; o++){
        if(data_more[o].Rate == document.getElementById("rates").value){
            create_command(data_story, o); 
        }
    }
}
function markeds(){
    clear_command();
    
    for(var o = 0; o < data_story.length; o++){
        if(data_more[o].Spoil.includes(document.getElementById("marked").value)){
            create_command(data_story, o); 
        }
    }
}
function genres(){
    clear_command();
     
    for(var o = 0; o < data_story.length; o++){
        if(data_more[o].Type.includes(document.getElementById("genre").value)){
            create_command(data_story, o); 
        }
    }
}
function overalls(){
    clear_command();
    
    for(var o = 0; o < data_story.length; o++){
        if(data_more[o].Notificate == document.getElementById("overall").value){
            create_command(data_story, o); 
        }
    }
}
function purchases(){
    clear_command();
    
    for(var o = 0; o < data_story.length; o++){
        if(data_more[o].Purchase == document.getElementById("purchase").value){
            create_command(data_story, o); 
        }
    }
}
function reads(){
    clear_command();
    
    for(var o = 0; o < data_story.length; o++){
        if(data_more[o].Read == document.getElementById("read").value){
            create_command(data_story, o); 
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

        clear_command();
        for(var o = 0; o < data.length; o++){
            if(data[o].Name.toLowerCase().includes(document.getElementById("names").value.toLowerCase())){
                create_command(data_story, o);
            }
        }

    };
    // csearch new after change value
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
        clear_command();
        num_page = document.getElementById("page").options[document.getElementById("page").selectedIndex].text;
        max = (num_page * numcontPerpage);
        var min = max - numcontPerpage;
        for(var i = min; i < max; i++){
            choosetype(data, i);
        }

        //use parameter
        /*const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('page', num_page);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        history.pushState({}, '', newUrl);*/


    }

    //change pages
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
//clear story
function clear_command(){

    try{

        document.getElementById("content").innerHTML = "";

    }catch(error){

        try{document.getElementById("normalcontent").innerHTML = "";}
        catch(error2){document.getElementById("normalcontent2").innerHTML = "";}

    }

}
//to create story
function create_command(data, i){

    if(document.getElementById("developer").checked == true){

        create(data, i);

    }else{

        normalcreate(data, i);

    }

}
//to open/close search pane
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