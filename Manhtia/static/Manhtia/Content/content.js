const data_csv_normal = "https://docs.google.com/spreadsheets/d/1Mn2FDBvSjufDqNNxBn1SHVHFaCF0EnXnFDuwiS-Nbpg/export?format=csv";
const data_csv_main = "https://docs.google.com/spreadsheets/d/12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY/export?format=csv";
fetch(data_csv_normal).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){readdomain(csv); clicks(); c();});
fetch(data_csv_main).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){mains = csv; main(csv); clicks(); c();});
const data_csv_mores = "https://docs.google.com/spreadsheets/d/1vAmEFn17c6kJMQwJ5JPYlvtWnRRweM8O-uk1mwn5xgU/export?format=csv";
var mores = "";
var mains;

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
                if(getday == 0){getday = 7;}
                if(getday == mains[i].Date && mains[i].Status != "end"){create(mains, i);}
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

    var datalist = document.getElementById("namestm");

    for(var o = 0; o < data.length; o++){
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

//normal create
function normalcreate(data, i){

    try {
        document.getElementById("content").id = "normalcontent";
        var win_width = window.innerWidth;
    } 
    catch (error) {}

    var main_link = document.createElement("a");
    var main_span = document.createElement("img");
    //var name_div = document.createElement("lable");
    main_span.className = "normalspan";
    //name_div.className = "namenormal";

    main_link.appendChild(main_span);
    main_link.href = data[i].Name + "/";

    //name_div.innerHTML = data[i].Name;
    main_span.setAttribute('src', data[i].Cover);

    //main_span.appendChild(name_div);
    document.getElementById("normalcontent").appendChild(main_link);

}

var domain_newtoki = "";
//Developer create
function create(data, i){

    try {
        document.getElementById("normalcontent").id = "content";
    } 
    catch (error) {}
    
    var main_div = document.createElement("div");
    var up_div = document.createElement("div");
    var name_div = document.createElement("div");
    var name_link = document.createElement("a");
    var web_check = document.createElement("div");
    var data_div = document.createElement("div");
    var cove_div = document.createElement("div");
    var cove_img = document.createElement("img");
    var more_div = document.createElement("div");
    var pro_div = document.createElement("div");
    var pro_bar = document.createElement("div");
    var pro_span = document.createElement("span");
    var alte_div = document.createElement("div");
    var genr_div = document.createElement("div");
    var part_div = document.createElement("div");
    var more_but = document.createElement("button");

    var upd = "";
    const today = new Date();
    var getday = today.getDay();
    if(getday == 0){getday = 7;}
    if(getday == data[i].Date && data[i].Status !== "end"){upd = "<img id='more_told' src='https://i.pinimg.com/564x/48/63/be/4863be978d4b93227aeb215e6bdf0739.jpg'>";}
    if(getday - 1 == data[i].Date && data[i].Status != "end"){upd = "<img id='more_told' src='https://i.pinimg.com/564x/22/04/cc/2204cc955737d2ec1d8250a5d10d248d.jpg'>";}
    up_div.style.borderRadius = "22px";
    up_div.style.fontSize = "20px";

    up_div.innerHTML = upd;
    web_check.innerHTML = "<img id='more_told' src='https://i.pinimg.com/564x/70/04/79/700479c6e38c5cdf852a6f8ae2a61aa5.jpg'>";
    web_check.style.float = "right";

    main_div.style.width = "320px";
    var linkText = document.createTextNode(data[i].Name);
    name_link.style.fontWeight = "700";
    name_link.appendChild(linkText);
    name_link.title = data[i].Name;
    name_link.href = data[i].Name;
    name_link.style.width = "250px";
    name_div.setAttribute("id", "name");
    name_div.appendChild(name_link);
    name_div.style.padding = "10px";

    var newtokilink = data[i].Newtoki + "";
    var newnewtokilink = domain_newtoki + newtokilink.substring(23);
    
    var link1 = "";
    var link2 = "";
    var link3 = "";
    var link4 = "";
    var status = "";
    if(data[i].Status == "end"){status = "<br>Status: <img style='width: 17px;' id='more_told' src='https://i.pinimg.com/564x/f2/ef/15/f2ef15f64d2724857a6093175a72c8d8.jpg'>";}
    if(data[i].Rawweb != "n"){link1 = "<a class='modernlink' href='" + data[i].Rawweb + "'>RawM</a>"}
    if(data[i].Newtoki != "n"){link2 = "<a class='modernlink' href='" + newnewtokilink + "'>RawL</a>"}
    if(data[i].Translate != "n"){link3 = "<a class='modernlink' href='" + data[i].Translate + "'>English</a>"}
    if(data[i].Otherweb != "n"){link4 = "<a class='modernlink' href='" + data[i].Otherweb + "'>Other</a>"}
    data_div.innerHTML = "Part: " + data[i].Part + "<br>Date: " + convert_date(data[i].Date) + " " + status + "<br>Number: " + data[i].Number + "<br>" + link1 + link2 + link3 + link4;
    data_div.style.width = "150px";
    data_div.style.float = "left";
    data_div.style.textAlign = "left";

    cove_img.setAttribute("src", data[i].Cover);
    cove_img.style.width = "100px";
    cove_img.style.borderRadius = "5px";
    cove_img.setAttribute("class", "coverimg");
    
    cove_div.style.width = "101px";
    cove_div.style.float = "right";
    cove_div.appendChild(cove_img);

    more_but.innerHTML = "More...";
    more_but.onclick = () => {

        if(more_but.innerText == "More..."){
            more_but.innerText = "Hide";
            more_div.style.display = "block";
        }
        else{
            more_but.innerText = "More...";
            more_div.style.display = "none";
        }
    };
    pro_bar.setAttribute("id", "pro");
    pro_div.style.width = "80px";
    pro_div.style.marginLeft = "auto";
    pro_div.style.marginRight = "auto";
    pro_span.setAttribute("id", "value");
    pro_span.innerHTML = "Unknown";
    alte_div.innerHTML = "";
    genr_div.innerHTML = "Genre: ";

    //progress
    var percent_ = percent_to_up(parseInt(getday), parseInt(data[i].Date));
    pro_span.textContent = percent_.toFixed(1) + "%";
    if(data[i].Date == "n"){pro_span.textContent = "Unknown";}
    if(data[i].Status == "end"){pro_span.textContent = "END"; percent_ = 100;}
    if(percent_.toFixed(1) == "0.0"){pro_span.textContent = "Atteint!";}
    var random_result = Math.random() * 30;
    random_result = Math.round(random_result);
    var colors = "gold";
    if(random_result % 3 == 1){colors = "red";}
    if(random_result % 3 == 2){colors = "#7457f7";}
    pro_bar.style.background = `conic-gradient(${colors} ${3.6 * percent_}deg, white 0deg)`;

    more_div.style.display = "none";
    data_div.appendChild(more_but);
    pro_bar.appendChild(pro_span);
    pro_div.appendChild(pro_bar);
    more_div.appendChild(pro_div);
    more_div.appendChild(alte_div);
    more_div.appendChild(genr_div);
    var types = mores[i].Type;
    types = types.trim();
    types = types.replaceAll("rf", "RomanceFantacy");
    types = types.replaceAll("mt", "Adult");
    types = types.replaceAll("bl", "BL");
    types = types.replaceAll("rm", "Romance");
    types = types.replaceAll("ft", "Fantacy");
    types = types.replaceAll("dm", "Drama");
    types = types.replaceAll("ov", "OmegaVerse");
    types = types.replaceAll("cm", "Comedy");
    types = types.replaceAll("ir", "Isekai-Reverse time");
    types = types.replaceAll("sf", "Sci-Fi");
    types = types.replaceAll("at", "Action");
    types = types.replaceAll("fm", "Family");
    types = types.replaceAll("cv", "CakeVerse");
    types = types.replaceAll("gv", "GuideVerse");
    types = types.replaceAll("nv", "NameVerse");
    types = types.replaceAll("av", "AnimalVerse");
    types = types.replaceAll("ot", "OtherVerse");
    types = types.replaceAll("mp", "Male Pregnancy");
    genr_div.innerHTML += types;
    var rate;
    if(mores[i].Rate == "n"){rate = "All age";}
    if(mores[i].Rate == "15"){rate = "R15";}
    if(mores[i].Rate == "18"){rate = "R18";}
    if(mores[i].AssName == "n"){mores[i].AssName = "Unknown";}
    var national;
    if(mores[i].Nation == "kr"){national = "<img src='https://i.pinimg.com/564x/26/16/8c/26168cddf75348cc28299de4daddcb5b.jpg' style='width: 30px;'>";}
    if(mores[i].Nation == "cn"){national = "<img src='https://i.pinimg.com/564x/d0/96/c0/d096c0d511574bb41a18ed61deb5a06e.jpg' style='width: 30px;'>";}
    if(mores[i].Nation == "th"){national = "<img src='https://i.pinimg.com/564x/ca/bc/d3/cabcd397c3831d374df02e52d127b9f1.jpg' style='width: 30px;'>";}
    var overall;
    if(mores[i].Notificate == "n"){overall = "Ongoing";}
    if(mores[i].Notificate == "c"){overall = "Completed";}
    var morelink1 = "";
    var morelink2 = "";
    var morelink3 = "";
    if(mores[i].Morelink1 != "n"){morelink1 = "<a href='" + mores[i].Morelink1 + "'>(Other I)</a>";}
    if(mores[i].Morelink2 != "n"){morelink2 = "<a href='" + mores[i].Morelink2 + "'>(Other II)</a>";}
    if(mores[i].Morelink3 != "n"){morelink3 = "<a href='" + mores[i].Morelink3 + "'>(Other III)</a>";}

    alte_div.innerHTML += morelink1 + morelink2 + morelink3 + "<br>Associate: " +  mores[i].AssName + " " + national + "<br>Rate: " + rate + "<a href='https://www.google.com/search?q=" + data[i].Name.replaceAll(" ", "+").replaceAll("'", "") + "+spoiler'>(Spoiler)</a> " + "<a href='https://www.google.com/search?q=" + data[i].Name.replaceAll(" ", "+").replaceAll("'", "") + "+baka'>(Detail)</a>" + "<br>";
    alte_div.innerHTML += "Overall in Manhtia: " + overall;

    if(i % 5 == 0){part_div.innerHTML = "Part " + data[i].Part; document.getElementById("content").appendChild(part_div); part_div.style.gridColumn = "1 / span 3"; part_div.style.marginLeft = "auto"; part_div.style.marginRight = "auto"; part_div.setAttribute("class", "moderndiv");}
    if(window.innerWidth < 900){part_div.style.marginLeft = "3px";}
    cove_img.onclick = () => {

        if(cove_img.offsetWidth == 100){
            cove_img.style.width = "320px";
            data_div.style.display = "none";
            more_div.style.display = "none";
            cove_div.style.float = "left";
        }else{
            cove_img.style.width = "100px";
            data_div.style.display = "block";
            cove_div.style.float = "right";
            more_but.innerText = "More...";
        }

    };

    //Moredata for website = yes
    var each_data = document.createElement("button");
    each_data.innerHTML = "Other";
    if(data[i].Website == "yes"){more_div.appendChild(each_data);}
    each_data.onclick = () => {
        const data_csv_main_ = "https://docs.google.com/spreadsheets/d/1R1e93BSQ-dVmHgZadcJmINP_qDJo65CZFBJ98hhzpvk/export?format=csv";
        fetch(data_csv_main_).then(resultw=>resultw.text()).then(function (csvtextw){return csv().fromString(csvtextw);}).then(function(data_each_main){
            for(var o = 0; o < data_each_main.length; o++){

                if(data_each_main[o].Name == data[i].Name){
                    var link = data_each_main[o].DataStoreLocation;
                    var read_link = link.replace("edit?usp=sharing", "export?format=csv");
                    fetch(read_link).then(resultwy=>resultwy.text()).then(function (csvtextwy){return csv().fromString(csvtextwy);}).then(function(data_each_sub){

                        var main_data_div = document.createElement("div");
                        var cove_manh_img = document.createElement("img");
                        var cove_nove_img = document.createElement("img");
                        var capt_data_div = document.createElement("div");
                        var chap_data_div = document.createElement("div");
                        var eachi = document.createElement("div");

                        if(data_each_sub[3].Info1 != "n"){
                            cove_manh_img.setAttribute("src", data_each_sub[3].Info1);
                            cove_manh_img.style.width = "150px";
                            cove_manh_img.style.borderRadius = "5px";
                            cove_manh_img.setAttribute("class", "coverimg");
                            main_data_div.appendChild(cove_manh_img);
                            main_data_div.style.borderTop = "solid 2px";
                        }
                        
                        cove_nove_img.setAttribute("src", data_each_sub[4].Info1);
                        cove_nove_img.style.width = "150px";
                        cove_nove_img.style.borderRadius = "5px";
                        cove_nove_img.setAttribute("class", "coverimg");
                        capt_data_div.innerHTML = "Caption<br>" + /*data_each_sub[5].Info1*/ "-Explore in detail-";
                        chap_data_div.innerHTML = "Chapter RoadMap<br>";
                        chap_data_div.style.borderTop = "solid 2px";

                        var cggdrive1 = document.createElement("div")
                        var cggdrive2 = document.createElement("div")
                        var cggdrive3 = document.createElement("div")
                        var cggdrive4 = document.createElement("div")
                        var cggdrive5 = document.createElement("div")
                        var cggdrive6 = document.createElement("div")
                        var piczip = document.createElement("div");
                        var picRzip = document.createElement("div");
                        var pdfRzip = document.createElement("div");
                        eachi.appendChild(cggdrive1);
                        cggdrive1.innerHTML = "<br><a href=" + data_each_sub[6].Info1 + ">Google Drive I</a><br><br>";
                        if(data_each_sub[7].Info1 != "n"){
                            cggdrive2.innerHTML = "<a href=" + data_each_sub[7].Info1 + ">Google Drive II</a><br><br>";
                            eachi.appendChild(cggdrive2);
                        }
                        if(data_each_sub[8].Info1 != "n"){
                            cggdrive3.innerHTML = "<a href=" + data_each_sub[8].Info1 + ">Google Drive III</a><br><br>";
                            eachi.appendChild(cggdrive3);
                        }
                        if(data_each_sub[6].Info2 != "n"){
                            cggdrive4.innerHTML = "<a href=" + data_each_sub[6].Info2 + ">Google Drive IV</a><br><br>";
                            eachi.appendChild(cggdrive4);
                        }
                        if(data_each_sub[7].Info2 != "n"){
                            cggdrive5.innerHTML = "<a href=" + data_each_sub[7].Info2 + ">Google Drive V</a><br><br>";
                            eachi.appendChild(cggdrive5);
                        }
                        if(data_each_sub[8].Info2 != "n"){
                            cggdrive6.innerHTML = "<a href=" + data_each_subdata_each_sub[8].Info2 + ">Google Drive VI</a><br><br>";
                            eachi.appendChild(cggdrive6);
                        }
                        if(data_each_sub[0].Info2 != "n"){
                            piczip.innerHTML = "<a href=" + data_each_sub[0].Info2 + ">Download All Chapter(.jpg in .zip file)</a><br><br>";
                            eachi.appendChild(piczip);
                        }
                        if(data_each_sub[1].Info2 != "n"){
                            picRzip.innerHTML = "<a href=" + data_each_sub[1].Info2 + ">Download R19 Moment(.jpg in .zip file)</a><br><br>";
                            eachi.appendChild(picRzip);
                        }
                        if(data_each_sub[1].Status != "n"){
                            pdfRzip.innerHTML = "<a href=" + data_each_sub[1].Status + ">Download R19 Moment(.pdf in .zip file)</a><br><br>";
                            eachi.appendChild(pdfRzip);
                        }

                        if(data_each_sub[5].Info2 == "n"){

                            for(var c = 9; c < data_each_sub.length; c++){
                                var cd = document.createElement("div");
                                var status_c = data_each_sub[c].Status;
                                if(status_c == "n"){status_c = "";}
                                if(data_each_sub[c].Info2 != "n"){cd.innerHTML = "<a href='" + data_each_sub[c].Info1 + "'>" + data_each_sub[c].Topic + "</a> <a href='" + data_each_sub[c].Info2 + "'>" + data_each_sub[c].Topic + " Part II</a> " + status_c;}
                                else{cd.innerHTML = "<a href='" + data_each_sub[c].Info1 + "'>" + data_each_sub[c].Topic + "</a> " + status_c;}
                                
                                chap_data_div.appendChild(cd);
                            }

                        }
                        var cdcheck = document.createElement("div");
                        for(var c = 9; c < data_each_sub.length; c++){

                            var add_status = document.createElement("div");
                            if(data_each_sub[c].Topic.substring(data_each_sub[c].Topic.length - 1) == "."){

                                if(data_each_sub[5].Info2 == "yes"){
                                    cdcheck.innerHTML = "Currently is " + data_each_sub[c].Topic + " Count: " + c;
                                    if(data_each_sub[c].Status != "n"){add_status.innerHTML = data_each_sub[c].Topic + data_each_sub[c].Status;}
                                    chap_data_div.appendChild(cdcheck);
                                    chap_data_div.appendChild(add_status);
                                }

                            }
                            if(data_each_sub[c].Topic.substring(data_each_sub[c].Topic.length - 1) != "." && data_each_sub[5].Info2 == "yes"){

                                var cd = document.createElement("div");
                                var status_c = data_each_sub[c].Status;
                                if(status_c == "n"){status_c = "";}
                                if(data_each_sub[c].Info2 != "n"){cd.innerHTML = "<a href='" + data_each_sub[c].Info1 + "'>" + data_each_sub[c].Topic + "</a> <a href='" + data_each_sub[c].Info2 + "'>" + data_each_sub[c].Topic + " Part II</a> " + status_c;}
                                else{cd.innerHTML = "<a href='" + data_each_sub[c].Info1 + "'>" + data_each_sub[c].Topic + "</a> " + status_c;}
                                
                                chap_data_div.appendChild(cd);

                            }
                            
                        }
                        var esfr = document.createElement('label');
                        esfr.innerHTML = "*Some story might has other language version. Check in each page.";                                          
                        main_data_div.appendChild(cove_nove_img);
                        main_data_div.appendChild(capt_data_div);
                        main_data_div.appendChild(eachi);
                        main_data_div.appendChild(chap_data_div);
                        main_data_div.appendChild(esfr);
                        more_div.appendChild(main_data_div);

                    });
                }

            }
        });
    };
    

    main_div.appendChild(up_div);
    main_div.appendChild(name_div);
    main_div.appendChild(data_div);
    main_div.appendChild(cove_div);
    main_div.appendChild(more_div);
    more_div.style.textAlign = "left";
    main_div.setAttribute("class", "moderndiv");
    if(data[i].Website == "yes"){name_div.appendChild(web_check);}
    document.getElementById("content").appendChild(main_div);

}

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

//Count down to percent days
function percent_to_up(today, date_up){

    var cal = Math.abs((100 / 7) * (date_up - today));
    if(today > date_up){cal = 100 - cal;}
    return cal;

}