var is_logged_in = document.getElementById("usernamecheck").innerHTML;
if(is_logged_in === "True"){
    console.log("Logged in.");
} else {
    document.body.innerHTML = "<h3>Not Logged in yet. Please login <a href='/manhtia/login'>here</a></h3>";
}

// ==========================================
// GLOBALS & CACHES
// ==========================================
var main_story = [];
var main_more = [];
var current_story = []; // Used to power pagination for filters
var current_more = []; 
let cached_main_csv = null; // Performance Cache for "Other" button

function c(){
    try{
        const queryfilter = window.location.search;
        const parametersfilter = new URLSearchParams(queryfilter);

        var develope = parametersfilter.get('developer');
        var type = parametersfilter.get('type');
        var page = parametersfilter.get('page');
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

// ==========================================
// PERFORMANCE FIX: BATCHED FILTERS
// ==========================================
function setup_pagination(total_items) {
    var numcontPerpage = 50;
    var num_page = Math.ceil(total_items / numcontPerpage);
    if(num_page === 0) num_page = 1;
    var page_select = document.getElementById("page");
    page_select.innerHTML = ""; 
    for (var a = 1; a <= num_page; a++){
        var opt = document.createElement('option');
        opt.value = a;
        opt.innerHTML = a;
        page_select.appendChild(opt);
    }
}

function apply_filter_logic(match_function) {
    current_story = [];
    current_more = [];
    for(var i = 0; i < main_story.length; i++){
        if(match_function(main_story[i], main_more[i], i)) {
            current_story.push(main_story[i]);
            current_more.push(main_more[i]);
        }
    }
    setup_pagination(current_story.length);
    clicks(); 
}

function filters(){
    var value = document.getElementById("filter").value;
    if(value === "none"){
        apply_filter_logic(() => true);
        return;
    }
    var getday = getday_korea()[0];
    var getdate = parseInt(getday_korea()[1]);
    if(getday == 0) getday = 7;

    apply_filter_logic((story, more, idx) => {
        if(value === "yes" || value === "no") return story.Website == value;
        if(value === "ongoing" || value === "end") return story.Status == value;
        if(value === "uptoday") {
            if(story.Date == getday && story.Status !== "end") return true;
            if(story.Date == "n"){
                var dates = more.Spoil.split(" ");
                for(var j = 0; j < dates.length; j++){
                    if(dates[j].includes("UpdateEvery")){
                        var dates_sub = dates[j].substring(12).split("/").map(Number);
                        if((dates_sub.includes(getdate) || dates_sub.includes(getdate - 1) || dates_sub.includes(getdate + 1)) && story.Status != "end") return true;
                    }
                }
            }
            return false;
        }
        if(value === "upyesterday") return (getday - 1 == story.Date && story.Status != "end");
        return story.Date == value;
    });
}

function nationsts(){ apply_filter_logic((s, m) => m.Nation === document.getElementById("nationst").value); }
function rates(){ apply_filter_logic((s, m) => m.Rate === document.getElementById("rates").value); }
function markeds(){ apply_filter_logic((s, m) => m.Spoil.includes(document.getElementById("marked").value)); }
function genres(){ apply_filter_logic((s, m) => m.Type.includes(document.getElementById("genre").value)); }
function overalls(){ apply_filter_logic((s, m) => m.Notificate === document.getElementById("overall").value); }
function purchases(){ apply_filter_logic((s, m) => m.Purchase === document.getElementById("purchase").value); }
function reads(){ apply_filter_logic((s, m) => m.Read === document.getElementById("read").value); }

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
    filters();
}

function clicks(){ document.getElementById("go").click(); }

function clear_command(){
    try{ document.getElementById("content").innerHTML = ""; }catch(error){
        try{document.getElementById("normalcontent").innerHTML = "";}
        catch(error2){document.getElementById("normalcontent2").innerHTML = "";}
    }
}

// ==========================================
// MAIN INITIALIZATION
// ==========================================
function main(data){
    main_story = [];
    main_more = [];
    
    // 1. FILTER FOR MAIN LIBRARY (Part == 0)
    for(var i = 0; i < data_story.length; i++){
        if(String(data_story[i].Part).trim() === "0"){
            main_story.push(data_story[i]);
            main_more.push(data_more[i]);
        }
    }
    
    // Safety Fallback (In case contenttype.js relies on global data_story)
    // We rewrite the global arrays to match the part 0 list.
    data_story.length = 0;
    data_more.length = 0;
    data.length = 0;
    for(var j = 0; j < main_story.length; j++){
        data_story.push(main_story[j]);
        data_more.push(main_more[j]);
        data.push(main_story[j]);
    }
    
    current_story = main_story.slice();
    current_more = main_more.slice();

    var datalist = document.getElementById("namestm");
    for(var o = 0; o < main_story.length; o++){
        const option = document.createElement('option');
        option.text = main_story[o].Name;
        option.value = main_story[o].Name;
        datalist.appendChild(option);
    }

    document.getElementById("names").oninput = () => {
        var search_val = document.getElementById("names").value.toLowerCase();
        apply_filter_logic((s) => s.Name.toLowerCase().includes(search_val));
    };

    document.getElementById("filter").onchange = () => { filters(); }
    document.getElementById("nationst").onchange = () => { nationsts(); };
    document.getElementById("rates").onchange = () => { rates(); };
    document.getElementById("marked").onchange = () => { markeds(); };
    document.getElementById("genre").onchange = () => { genres(); };
    document.getElementById("overall").onchange = () => { overalls(); };
    document.getElementById("purchase").onchange = () => { purchases(); };
    document.getElementById("read").onchange = () => { reads(); };

    setup_pagination(current_story.length);
    if(window.innerWidth < 900){document.getElementById("content").style.overflow = "auto";}
    
    // PERFORMANCE FIX: BATCH DOM APPENDS
    document.getElementById("go").onclick = () => {
        clear_command();
        var numcontPerpage = 50;
        var num_page = parseInt(document.getElementById("page").value) || 1;
        var max = (num_page * numcontPerpage);
        var min = max - numcontPerpage;
        
        var fragment = document.createDocumentFragment(); 
        
        for(var i = min; i < max; i++){
            if(i < current_story.length) {
                choosetype(current_story, i, current_more, fragment);
            }
        }
        
        if(document.getElementById("developer").checked == true){
            document.getElementById("content").appendChild(fragment);
        } else if(document.getElementById("ordinary").checked == true){
            document.getElementById("normalcontent2").appendChild(fragment);
        } else {
            document.getElementById("normalcontent").appendChild(fragment);
        }
    }

    document.getElementById("next").onclick = () => {
        var select = document.getElementById("page");
        if(select.selectedIndex + 1 < select.options.length){
            select.selectedIndex += 1;
            clicks();
        }
    }
    document.getElementById("prev").onclick = () => {
        var select = document.getElementById("page");
        if(select.selectedIndex - 1 >= 0){
            select.selectedIndex -= 1;
            clicks();
        }
    }

    clicks();
    c();
}

function choosetype(data, i, more_data, fragment){
    if(document.getElementById("developer").checked == true){
        create(data, i, more_data, fragment);
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('developer', 'allow');
        history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    } else {
        normalcreate(data, i, more_data, fragment);
    }
}

document.getElementById("opensearch").onclick = () => {
    document.getElementById("searchdiv").style.display = (document.getElementById("searchdiv").style.display == "block") ? "none" : "block";
};
document.getElementById('miniclose').onclick = () => { document.getElementById("opensearch").click(); }

// ==========================================
// DOM CREATION (WITH LAZY LOADING)
// ==========================================
function create(data, i, more_data, fragment){
    try {
        if(document.getElementById("developer").checked == true){ document.getElementById("normalcontent").id = "content"; } 
        if(document.getElementById("developer").checked == true){ document.getElementById("normalcontent2").id = "content"; } 
    } catch (error) {}
    
    var main_div = document.createElement("div");
    var up_div = document.createElement("div");
    var name_div = document.createElement("div");
    var name_link = document.createElement("a");
    var web_check = document.createElement("div");
    var data_div = document.createElement("div");
    var cove_div = document.createElement("div");
    var cove_img = document.createElement("img");
    var more_div = document.createElement("div");
    var alte_div = document.createElement("div");
    var genr_div = document.createElement("div");
    var part_div = document.createElement("div");
    var more_but = document.createElement("button");

    var upd = "";
    var getday = getday_korea()[0];
    var getdate = parseInt(getday_korea()[1]);
    
    if(getday == data[i].Date && data[i].Status !== "end"){upd = "<img id='more_told' src='https://i.pinimg.com/564x/48/63/be/4863be978d4b93227aeb215e6bdf0739.jpg'>";}
    if(getday == 0){getday = 7;}
    if(getday - 1 == data[i].Date && data[i].Status != "end"){upd = "<img id='more_told' src='https://i.pinimg.com/564x/22/04/cc/2204cc955737d2ec1d8250a5d10d248d.jpg'>";}
    
    up_div.style.borderRadius = "22px";
    up_div.style.fontSize = "20px";
    up_div.innerHTML = upd;
    web_check.innerHTML = "<img id='more_told' src='https://i.pinimg.com/564x/70/04/79/700479c6e38c5cdf852a6f8ae2a61aa5.jpg'>";
    web_check.style.float = "right";

    main_div.style.width = "320px";
    name_link.style.fontWeight = "700";
    name_link.appendChild(document.createTextNode(data[i].Name));
    name_link.title = data[i].Name;
    name_link.href = "/manhtia/content/" + data[i].Name;
    name_link.style.width = "250px";
    name_div.setAttribute("id", "name");
    name_div.appendChild(name_link);
    name_div.style.padding = "10px";

    var link1 = ""; var link2 = ""; var link3 = ""; var link4 = ""; var status = "";
    if(data[i].Status == "end"){status = "<br>Status: <img style='width: 17px;' id='more_told' src='https://i.pinimg.com/564x/f2/ef/15/f2ef15f64d2724857a6093175a72c8d8.jpg'>";}
    if(data[i].Rawweb != "n"){link1 = "<a class='modernlink' href='" + data[i].Rawweb + "'>RawM</a>"}
    if(data[i].Newtoki != "n"){link2 = "<a class='modernlink' href='" + data[i].Newtoki + "'>RawL</a>"}
    if(data[i].Translate != "n"){link3 = "<a class='modernlink' href='" + data[i].Translate + "'>Translation</a>"}
    if(data[i].Otherweb != "n"){link4 = "<a class='modernlink' href='" + data[i].Otherweb + "'>Other</a>"}
    data_div.innerHTML = "Date: <label id='date_check_it'>" + convert_date(data[i].Date) + "</label> " + status + "<br>Number: " + data[i].Number + "<br>" + link1 + link2 + link3 + link4;
    data_div.style.width = "150px";
    data_div.style.float = "left";
    data_div.style.textAlign = "left";

    // PERFORMANCE FIX: LAZY LOAD
    cove_img.setAttribute("src", data[i].Cover);
    cove_img.setAttribute("loading", "lazy");
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
        } else {
            more_but.innerText = "More...";
            more_div.style.display = "none";
        }
    };

    try{
        alte_div.innerHTML = "";
        genr_div.innerHTML = "Genre: ";
        more_div.style.display = "none";
        data_div.appendChild(more_but);
        more_div.appendChild(alte_div);
        more_div.appendChild(genr_div);

        var types = more_data[i].Type.trim();
        types = types.replaceAll("rf", "RomanceFantacy").replaceAll("mt", "Adult").replaceAll("bl", "BL").replaceAll("rm", "Romance").replaceAll("ft", "Fantacy").replaceAll("dm", "Drama").replaceAll("ov", "OmegaVerse").replaceAll("cm", "Comedy").replaceAll("ir", "Isekai-Reverse time").replaceAll("sf", "Sci-Fi").replaceAll("at", "Action").replaceAll("fm", "Family").replaceAll("cv", "CakeVerse").replaceAll("gv", "GuideVerse").replaceAll("nv", "NameVerse").replaceAll("av", "AnimalVerse").replaceAll("ot", "OtherVerse").replaceAll("mp", "Male Pregnancy");
        genr_div.innerHTML += types;
        
        var rate = (more_data[i].Rate == "n") ? "All age" : "R" + more_data[i].Rate;
        if(more_data[i].AssName == "n") more_data[i].AssName = "Unknown";
        
        var national = nation_of_story(more_data[i].Nation);
        if(national.includes("http")) national = "<img src='" + national + "' style='width: 30px;'>";
        
        var overall = (more_data[i].Notificate == "n") ? "Ongoing" : "Completed";
        
        var morelink1 = (more_data[i].Morelink1 != "n") ? "<a href='" + more_data[i].Morelink1 + "'>(Other I)</a>" : "";
        var morelink2 = (more_data[i].Morelink2 != "n") ? "<a href='" + more_data[i].Morelink2 + "'>(Other II)</a>" : "";
        var morelink3 = (more_data[i].Morelink3 != "n") ? "<a href='" + more_data[i].Morelink3 + "'>(Other III)</a>" : "";

        var detail_it = more_data[i].Spoil.split(" ");
        for(var di = 0; di < detail_it.length; di++){
            if(detail_it[di].includes("UpdateEvery")){
                data_div.innerHTML = "Date: <label id='date_check_it'>" + detail_it[di].substring(12) + "</label> " + status + "<br>Number: " + data[i].Number + "<br>" + link1 + link2 + link3 + link4;
                data_div.appendChild(more_but);
                if((detail_it[di].includes(getdate) || detail_it[di].includes(getdate + 1) || detail_it[di].includes(getdate - 1)) && data[i].Status != "end"){
                    upd = "<img id='more_told' src='https://i.pinimg.com/564x/48/63/be/4863be978d4b93227aeb215e6bdf0739.jpg'>";
                    up_div.innerHTML = upd;
                }
            }
        }

        alte_div.innerHTML += morelink1 + morelink2 + morelink3 + "<label style='overflow: hidden'><br>Associate: " +  more_data[i].AssName + "</label> " + national + "<br>Rate: " + rate + "<a href='https://www.google.com/search?q=" + data[i].Name.replaceAll(" ", "+").replaceAll("'", "") + "+spoiler'>(Spoiler)</a> " + "<a href='https://www.google.com/search?q=" + data[i].Name.replaceAll(" ", "+").replaceAll("'", "") + "+baka'>(Detail)</a><br>";
        alte_div.innerHTML += "Overall in Manhtia: " + overall;
        alte_div.style.textAlign = "left";

        if(i % 5 == 0){
            part_div.innerHTML = "Section " + ((i / 5) + 1); 
            part_div.style.gridColumn = "1 / span 3"; 
            part_div.style.marginLeft = (window.innerWidth < 900) ? "3px" : "auto"; 
            part_div.style.marginRight = "auto"; 
            part_div.setAttribute("class", "moderndiv");
            if(fragment) fragment.appendChild(part_div);
            else document.getElementById("content").appendChild(part_div);
        }
        
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
    }catch(error){}
    
    // PERFORMANCE FIX: CACHED CSV FETCH
    var each_data = document.createElement("button");
    each_data.innerHTML = "Other";
    if(data[i].Website == "yes"){more_div.appendChild(each_data);}
    
    each_data.onclick = () => {
        if(cached_main_csv){
            processOtherData(cached_main_csv, data[i].Name, more_div);
        } else {
            const data_csv_main_ = "https://docs.google.com/spreadsheets/d/1R1e93BSQ-dVmHgZadcJmINP_qDJo65CZFBJ98hhzpvk/export?format=csv";
            fetch(data_csv_main_).then(r=>r.text()).then(t=>csv().fromString(t)).then(mainData=>{
                cached_main_csv = mainData;
                processOtherData(cached_main_csv, data[i].Name, more_div);
            });
        }
    };
    
    main_div.appendChild(up_div);
    main_div.appendChild(name_div);
    main_div.appendChild(data_div);
    main_div.appendChild(cove_div);
    main_div.appendChild(more_div);
    more_div.style.textAlign = "left";
    more_div.style.float = "left";
    main_div.setAttribute("class", "moderndiv");
    if(data[i].Website == "yes"){name_div.appendChild(web_check);}

    try{
        if(document.getElementById("normal_show_stories").style.display === "block"){
            if(fragment) fragment.appendChild(main_div);
            else document.getElementById("normal_each_content").appendChild(main_div);
        }else{
            if(fragment) fragment.appendChild(main_div);
            else document.getElementById("content").appendChild(main_div);
        }
    }catch(error){}
}

function processOtherData(mainData, storyName, more_div) {
    for(var o = 0; o < mainData.length; o++){
        if(mainData[o].Name == storyName){
            var link = mainData[o].DataStoreLocation;
            var read_link = link.replace("edit?usp=sharing", "export?format=csv");
            fetch(read_link).then(r=>r.text()).then(t=>csv().fromString(t)).then(data_each_sub=>{
                var main_data_div = document.createElement("div");
                var chap_data_div = document.createElement("div");
                var eachi = document.createElement("div");

                if(data_each_sub[3].Info1 != "n"){
                    var cove_manh_img = document.createElement("img");
                    cove_manh_img.setAttribute("src", data_each_sub[3].Info1);
                    cove_manh_img.setAttribute("loading", "lazy");
                    cove_manh_img.style.width = "150px";
                    cove_manh_img.style.borderRadius = "5px";
                    cove_manh_img.setAttribute("class", "coverimg");
                    main_data_div.appendChild(cove_manh_img);
                    main_data_div.style.borderTop = "solid 2px";
                }
                
                var cove_nove_img = document.createElement("img");
                cove_nove_img.setAttribute("src", data_each_sub[4].Info1);
                cove_nove_img.setAttribute("loading", "lazy");
                cove_nove_img.style.width = "150px";
                cove_nove_img.style.borderRadius = "5px";
                cove_nove_img.setAttribute("class", "coverimg");
                
                chap_data_div.innerHTML = "<label style='font-weight: bold;'>Chapter RoadMap</label><br>";
                chap_data_div.style.borderTop = "solid 2px";

                var cggdrive1 = document.createElement("div"); var cggdrive2 = document.createElement("div");
                var cggdrive3 = document.createElement("div"); var cggdrive4 = document.createElement("div");
                var cggdrive5 = document.createElement("div"); var cggdrive6 = document.createElement("div");
                
                eachi.appendChild(cggdrive1);
                cggdrive1.innerHTML = "<br><a href=" + data_each_sub[6].Info1 + ">Google Drive I</a><br><br>";
                if(data_each_sub[7].Info1 != "n"){ cggdrive2.innerHTML = "<a href=" + data_each_sub[7].Info1 + ">Google Drive II</a><br><br>"; eachi.appendChild(cggdrive2); }
                if(data_each_sub[8].Info1 != "n"){ cggdrive3.innerHTML = "<a href=" + data_each_sub[8].Info1 + ">Google Drive III</a><br><br>"; eachi.appendChild(cggdrive3); }
                if(data_each_sub[6].Info2 != "n"){ cggdrive4.innerHTML = "<a href=" + data_each_sub[6].Info2 + ">Google Drive IV</a><br><br>"; eachi.appendChild(cggdrive4); }
                if(data_each_sub[7].Info2 != "n"){ cggdrive5.innerHTML = "<a href=" + data_each_sub[7].Info2 + ">Google Drive V</a><br><br>"; eachi.appendChild(cggdrive5); }
                if(data_each_sub[8].Info2 != "n"){ cggdrive6.innerHTML = "<a href=" + data_each_sub[8].Info2 + ">Google Drive VI</a><br><br>"; eachi.appendChild(cggdrive6); }

                if(data_each_sub[5].Info2 == "n"){
                    for(var c = 9; c < data_each_sub.length; c++){
                        var cd = document.createElement("div");
                        var status_c = (data_each_sub[c].Status == "n") ? "" : data_each_sub[c].Status;
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
                            cdcheck.innerHTML = "Currently is <label style='font-weight: bold;'>" + data_each_sub[c].Topic + "</label> Count: " + c + "<br>Bookmark: " + data_each_sub[0].Info2 + "(Self)<br>Bookmark: " + data_each_sub[0].Status + "(Auto)";
                            if(data_each_sub[c].Status != "n"){add_status.innerHTML = data_each_sub[c].Topic + data_each_sub[c].Status;}
                            chap_data_div.appendChild(cdcheck);
                            chap_data_div.appendChild(add_status);
                        }
                    }
                    if(data_each_sub[c].Topic.substring(data_each_sub[c].Topic.length - 1) != "." && data_each_sub[5].Info2 == "yes"){
                        var cd = document.createElement("div");
                        var status_c = (data_each_sub[c].Status == "n") ? "" : data_each_sub[c].Status;
                        if(data_each_sub[c].Info2 != "n"){cd.innerHTML = "<a href='" + data_each_sub[c].Info1 + "'>" + data_each_sub[c].Topic + "</a> <a href='" + data_each_sub[c].Info2 + "'>" + data_each_sub[c].Topic + " Part II</a> " + status_c;}
                        else{cd.innerHTML = "<a href='" + data_each_sub[c].Info1 + "'>" + data_each_sub[c].Topic + "</a> " + status_c;}
                        chap_data_div.appendChild(cd);
                    }
                }
                main_data_div.appendChild(cove_nove_img);
                main_data_div.appendChild(eachi);
                main_data_div.appendChild(chap_data_div);
                more_div.appendChild(main_data_div);
            });
        }
    }
}

function normalcreate(data, i, more_data, fragment){
    try {
        document.getElementById("content").id = "normalcontent";
    } catch (error) {}

    // BUG FIX: Inject display style directly into HTML string instead of reading DOM
    var verifyDisplay = (more_data[i].Purchase == "y") ? "block" : "none";

    if(document.getElementById("ordinary").checked == true){
        try { document.getElementById("normalcontent").id = "normalcontent2"; } catch (error) {}

        var pane = document.createElement('span');
        pane.innerHTML = `
            <div class="card">
                <img id='verify${i}' style='display: ${verifyDisplay}; width: 25px; position: absolute; border-bottom-right-radius: 10px;' src='https://i.pinimg.com/736x/c1/b1/39/c1b1393272d4ff7bb4ffebf6a20061b8.jpg'>
                <img class="imgcard" src="${data[i].Cover}" style="width:150px; height: 200px;" loading="lazy">
                <div class="container">
                    <a href="/manhtia/content/${data[i].Name}" style="font-weight: bold;">${data[i].Name}</a><br>
                    <label class="meta">(${n_to_unknown(more_data[i].AssName)})</label>
                </div>
            </div>
        `;
        if(fragment) fragment.appendChild(pane);
        else document.getElementById("normalcontent2").appendChild(pane);
    }
    else{
        var console_all = document.createElement("div");
        console_all.style.borderBottom = "1px solid black";
        console_all.style.borderLeft = "10px solid black";
        console_all.style.textAlign = "left";
        console_all.style.padding = "5px";
        console_all.style.height = "fit-content";
        console_all.onmouseover = () => {
            console_all.style.borderLeft = "10px solid red";
            console_all.style.borderBottom = "1px solid red";
        }
        console_all.onmouseout = () => {
            console_all.style.borderLeft = "10px solid black";
            console_all.style.borderBottom = "1px solid black";
        }

        console_all.innerHTML = `
            <img id='verify${i}' style='display: ${verifyDisplay}; width: 25px; position: absolute; border-bottom-right-radius: 10px;' src='https://i.pinimg.com/736x/c1/b1/39/c1b1393272d4ff7bb4ffebf6a20061b8.jpg'>
            <img src='${data[i].Cover}' style='width: 120px; height: 170px; border-radius: 5px;' onclick="open_cover('${data[i].Cover}')" loading="lazy">
            <span style='vertical-align: top; float: right; border-left: 1px dashed; padding: 5px;'>
                <label>${update_of_story(i, data, more_data)}</label><br>
                <label><img src='${nation_of_story(more_data[i].Nation)}' id='more_told'></label><br>
                <label>${has_website_story(data[i].Website)}</label><br>
                <label>${rate_of_story(more_data[i].Rate)}</label><br>
            </span>
            <span style='vertical-align: top; display: inline-block;'>
                <a href="/manhtia/content/${data[i].Name}" style='font-weight: 700; font-size: 20px;'>${data[i].Name}</a><br>
                <label style='font-weight: 200; font-size: 11px;'>  ${n_to_unknown(more_data[i].AssName)}</label><br>
                <label style='font-weight: 700;'>  Date: </label>${check_unknown(data[i].Date, i, more_data)} | 
                <label style='font-weight: 700;'>  Status: </label>${status_of_story(data[i].Status)} <br><br>
                <label style='font-weight: 700;'>  Source: </label> <a href='${data[i].Rawweb}'>Official</a> <a href='${data[i].Translate}'>Translation</a> <a href='${data[i].Otherweb}'>Other</a><br>
                <button onclick="open_meta_pane(${data[i].Number})">More</button>
                <label style='font-weight: 200; font-size: 11px; margin-right: 2px;'>Release: ${check_release(n_to_unknown(data[i].Year)).replace(":", " until ")}</label>
            </span>
        `;
        if(fragment) fragment.appendChild(console_all);
        else document.getElementById("normalcontent").appendChild(console_all);
    }
}

function open_meta_pane(number){
    var index = number - 1;
    document.getElementById("normal_show_stories").style.display = "block";
    
    var meta_fragment = document.createDocumentFragment();
    create(current_story, index, current_more, meta_fragment);
    document.getElementById("normal_each_content").appendChild(meta_fragment);
    
    for(var i = 0; i < data_chapter.length; i++){
        if(data_chapter[i].Name.includes(current_story[index].Name)){
            var span = document.createElement("span");
            span.style.backgroundColor = "white";
            span.style.borderRadius = "5px";
            span.innerHTML = `<a href="/manhtia/content/${data_chapter[i].Name}">${data_chapter[i].Name}</a>`;
            document.getElementById("normal_each_content").appendChild(span);
        }
    }
}

// ==========================================
// HELPERS
// ==========================================
function n_to_unknown(data){ return (data == 'n') ? "Unknown" : data; }
function status_of_story(data){ return (data == 'end') ? "<img src='https://i.pinimg.com/564x/f2/ef/15/f2ef15f64d2724857a6093175a72c8d8.jpg' style='width: 17px; border-radius: 50%;'>" : data; }
function rate_of_story(data){ return (data == 'n') ? "" : "R" + data; }
function has_website_story(data){ return (data === "yes") ? "<img id='more_told' src='https://i.pinimg.com/564x/70/04/79/700479c6e38c5cdf852a6f8ae2a61aa5.jpg'>" : ""; }
function nation_of_story(nation){
    if(nation == "kr") return "https://i.pinimg.com/564x/26/16/8c/26168cddf75348cc28299de4daddcb5b.jpg";
    if(nation == "cn") return "https://i.pinimg.com/564x/d0/96/c0/d096c0d511574bb41a18ed61deb5a06e.jpg";
    if(nation == "th") return "https://i.pinimg.com/564x/ca/bc/d3/cabcd397c3831d374df02e52d127b9f1.jpg";
    return "https://i.pinimg.com/564x/6f/b1/fa/6fb1fa3c16a2aa37a4ab3d7e192b7c2d.jpg";
}
function check_release(data){ return (data.length < 12 && data != "Unknown") ? data + "xxx-xx-xx" : data; }

function update_of_story(i, data, more_data){
    var upd = "";
    var getday = getday_korea()[0];
    var getdate = getday_korea()[1];
    
    if(data[i].Date !== "n" && data[i].Status !== "end"){upd = percent_to_up(getday, data[i].Date);}
    if(getday == data[i].Date && data[i].Status !== "end"){upd = "<img id='more_told' src='https://i.pinimg.com/564x/48/63/be/4863be978d4b93227aeb215e6bdf0739.jpg'>";}
    if(getday == 0){getday = 7;}
    if(getday - 1 == data[i].Date && data[i].Status != "end"){upd = "<img id='more_told' src='https://i.pinimg.com/564x/22/04/cc/2204cc955737d2ec1d8250a5d10d248d.jpg'>";}
    
    if(more_data[i].Notificate === "c" && data[i].Status === "end"){upd = "<img id='more_told' src='https://i.pinimg.com/736x/b9/84/e2/b984e27c530a0efa40519e032390b591.jpg'>"}
    if(more_data[i].Notificate !== "c" && data[i].Status === "end"){upd = "<img id='more_told' src='https://i.pinimg.com/736x/cb/d6/71/cbd6711e4796946c3287f9171841e808.jpg'>"}
    return upd;
}

function open_cover(cover){
    document.getElementById("full_cover").src = cover;
    document.getElementById("normal_show_stories").style.display = "block";
}

function percent_to_up(today, date_up){
    var cal = Math.abs((100 / 7) * (date_up - today));
    return Math.round(cal) + "%";
}

function closestory(){
    document.getElementById("normal_show_stories").style.display = "none";
    document.getElementById("normal_each_content").innerHTML = "";
    document.getElementById("full_cover").src = "https://i.pinimg.com/564x/6f/b1/fa/6fb1fa3c16a2aa37a4ab3d7e192b7c2d.jpg";
}

function check_unknown(date, i, more_data){
    if(date !== 'n') return convert_date(date);
    return check10day(date, i, more_data);
}

function check10day(date, i, more_data){
    if(date === "n" && more_data[i].Spoil.includes("UpdateEvery")){
        var number_date = more_data[i].Spoil.split(" ");
        for(var o = 0; o < number_date.length; o++){
            if(number_date[o].includes("UpdateEvery")) return number_date[o].substring(12);
        }
    }
    return convert_date(date);
}

function convert_date(date){
    switch(String(date)){
        case "0": return "Sun-Mon";
        case "1": return "Mon-Tue";
        case "2": return "Tue-Wed";
        case "3": return "Wed-Thu";
        case "4": return "Thu-Fri";
        case "5": return "Fri-Sat";
        case "6": return "Sat-Sun";
        default: return "Unknown";
    }
}
