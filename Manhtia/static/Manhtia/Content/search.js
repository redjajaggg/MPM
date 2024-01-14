const normaldatabase = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=1Mn2FDBvSjufDqNNxBn1SHVHFaCF0EnXnFDuwiS-Nbpg&p=Sheet1";
const maindatabase = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY&p=Manhwa";
const moredatabase = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=1vAmEFn17c6kJMQwJ5JPYlvtWnRRweM8O-uk1mwn5xgU&p=Sheet1";
const chapterdatabase = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=1R1e93BSQ-dVmHgZadcJmINP_qDJo65CZFBJ98hhzpvk&p=Sheet1";
const maturedatabase = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=1LGJg6Jl3qV2IQfknt2xOvmvJuKtUaVWMSOcN1HrnHuc&p=Sheet1";

var main, more, chapter, mature;
var indexes = [];
var indexmain = [];
var indexmore = [];
var indexchapter = [];
var indexmature = [];
var domain_newtoki = "";

//fetch data
fetch(normaldatabase)
.then(d => d.json())
.then(d => {
    normalappendoptions(d);
})
fetch(maindatabase)
.then(d => d.json())
.then(d => {
    main = d;
    mainappendoptions(d);
})
fetch(moredatabase)
.then(d => d.json())
.then(d => {
    more = d;
    moreappendoptions(d);
})
fetch(chapterdatabase)
.then(d => d.json())
.then(d => {
    chapter = d;
})
fetch(maturedatabase)
.then(d => d.json())
.then(d => {
    mature = d;
})

//append options
function normalappendoptions(data){

    try{
        const queryfilter = window.location.search;
        const parametersfilter = new URLSearchParams(queryfilter);
        filter = parametersfilter.get('developer');
        if(filter == "allow"){document.getElementById("package").disabled = false; document.getElementById("developer").checked = true;}
    }catch(error){}

    const each = ["Status", "Date", "Histotime", "Genre", "Nation", "Mark", "Overall", "Rate"];
    for(var k = 0; k < each.length; k++){
        
        for(var i = 0; i < data.length; i++){
            
            if(data[i].Name == "Newtoki"){

                domain_newtoki = data[i].Info;

            }

            if(data[i].Name === each[k]){
                var values = data[i].Info.split('\\');
                var meanings = data[i].Piclink.split('\\');
    
                for(var j = 0; j < values.length; j++){
                    var opt = document.createElement('option');
                    opt.value = values[j];
                    opt.innerHTML = meanings[j];
                    document.getElementById("s" + each[k].toLowerCase()).appendChild(opt);
                }
    
            }
    
        }

    }

}
function mainappendoptions(data){
    //name
    for(var i = 0; i < data.length; i++){
    document.getElementById("number").innerHTML = data[i].Number;
        const option = document.createElement('option');
        option.text = data[i].Name;
        option.value = data[i].Name;
        document.getElementById("ssname").appendChild(option);
    }
    //part
    var gotpart = [];
    for(var i = 0; i < data.length; i++){

        if(!gotpart.includes(data[i].Part)){
            var opt = document.createElement('option');
            opt.value = data[i].Part;
            opt.innerHTML = data[i].Part;
            document.getElementById("spart").appendChild(opt);
            gotpart.push(data[i].Part);
        }

    }
    
}
function moreappendoptions(data){
    //assname
    for(var i = 0; i < data.length; i++){
        const option = document.createElement('option');
        option.text = data[i].AssName;
        option.value = data[i].AssName;
        document.getElementById("ssassname").appendChild(option);
    }
}

//name / assname search
document.getElementById("sname").oninput = () => {

    var count = 0;
    try {
        document.getElementById("content").innerHTML = "";
    } 
    catch (error) {
        document.getElementById("normalcontent").innerHTML = "";
    }
    for(var o = 0; o < main.length; o++){
        
        if(main[o].Name.toLowerCase().includes(document.getElementById("sname").value.toLowerCase())){
            create(main, o);
            count++;
        }
        if(document.getElementById("sname").value == ""){
            count = 0;
            try {
                document.getElementById("content").innerHTML = "Waiting to Convey...";
            } 
            catch (error) {
                document.getElementById("normalcontent").innerHTML = "Waiting to Convey...";
            }
        }
        document.getElementById('found').innerHTML = count;
        document.getElementById('percent').innerHTML = (count / document.getElementById('number').innerHTML * 100).toFixed(0);

    }

};
document.getElementById("sassname").oninput = () => {

    var count = 0;
    try {
        document.getElementById("content").innerHTML = "";
    } 
    catch (error) {
        document.getElementById("normalcontent").innerHTML = "";
    }
    for(var o = 0; o < main.length; o++){
        
        if(more[o].AssName.toLowerCase().includes(document.getElementById("sassname").value.toLowerCase())){
            create(main, o);
            count++;
        }
        if(document.getElementById("sassname").value == ""){
            count = 0;
            try {
                document.getElementById("content").innerHTML = "Waiting to Convey...";
            } 
            catch (error) {
                document.getElementById("normalcontent").innerHTML = "Waiting to Convey...";
            }
        }
        document.getElementById('found').innerHTML = count;
        document.getElementById('percent').innerHTML = (count / document.getElementById('number').innerHTML * 100).toFixed(0);

    }

};

//press reset
function reset(){

    try {
        document.getElementById("content").innerHTML = "Waiting to Convey...";
    } 
    catch (error) {
        document.getElementById("normalcontent").innerHTML = "Waiting to Convey...";
    }
    const select = document.querySelectorAll(".s");
    select.forEach((sel) => {
        sel.value = "none";
    });
    const input = document.querySelectorAll("input");
    input.forEach((inp) => {
        inp.value = "";
    });
    const logic = document.querySelectorAll(".logic");
    logic.forEach((inp) => {
        inp.checked = false;
    });
    document.getElementById('found').innerHTML = 0;
    document.getElementById('percent').innerHTML = 0;
    document.getElementById("page").innerHTML = "";
    document.getElementById("sname").value = "";

}

//press search
function search(){
    try {
        document.getElementById("content").innerHTML = "";
    } 
    catch (error) {
        document.getElementById("normalcontent").innerHTML = "";
    }

    indexes = [];
    
    checklogic();

}
//check
function checklogic(){

    indexmain = [];
    indexmore = [];
    indexchapter = [];
    indexmature = [];

    var mainallow = (document.getElementById("includecommon").checked == true) ? true : false;
    var moreallow = (document.getElementById("includeaddtional").checked == true) ? true : false;
    var chapterallow = (document.getElementById("includechapter").checked == true) ? true : false;
    var matureallow = (document.getElementById("includemature").checked == true) ? true : false;

    const each = ["Part", "Status", "Date", "Website", "Histotime", "Genre", "Nation", "Mark", "Overall", "Rate", "chapexist", "chapstatus", "matureexist", "maturestatus"];
    const mainfil = ["Part", "Status", "Date", "Website", "Histotime"];
    const morefil = ["Genre", "Nation", "Mark", "Overall", "Rate"];
    const chapterfil = ["chapexist", "chapstatus"];
    const maturefil = ["matureexist", "maturestatus"];
    for(var k = 0; k < each.length; k++){
        
        //mainallow
        if(document.getElementById("s" + each[k].toLowerCase()).value !== "none" && mainallow && mainfil.includes(each[k])){
            for(var i = 0; i < main.length; i++){

                var choose = each[k];
                var maindatafilter;
                switch(choose){
                    case 'Part': maindatafilter = main[i].Part; break;
                    case 'Status': maindatafilter = main[i].Status; break;
                    case 'Date': maindatafilter = main[i].Date; break;
                    case 'Website': maindatafilter = main[i].Website; break;
                    case 'Histotime': maindatafilter = main[i].Histotime; break;
                }

                if(document.getElementById("s" + each[k].toLowerCase()).value == maindatafilter){indexmain.push(i);}

            }

        }
        //moreallow
        if(document.getElementById("s" + each[k].toLowerCase()).value !== "none" && moreallow && morefil.includes(each[k])){
            for(var i = 0; i < more.length; i++){

                var choose = each[k];
                var moredatafilter;
                switch(choose){
                    case 'Nation': moredatafilter = more[i].Nation; break;
                    case 'Overall': moredatafilter = more[i].Notificate; break;
                    case 'Rate': moredatafilter = more[i].Rate.toString(); break;
                    case 'Genre': moredatafilter = more[i].Type; break;
                    case 'Mark': moredatafilter = more[i].Spoil; break;
                }
                
                if(moredatafilter.includes(document.getElementById("s" + each[k].toLowerCase()).value)){indexmore.push(i);}

            }

        }
        //chapterallow
        if(document.getElementById("s" + each[k].toLowerCase()).value !== "none" && chapterallow && chapterfil.includes(each[k])){
            var names_list = [];
            var status_list = [];
            for(var i = 0; i < chapter.length; i++){names_list.push(chapter[i].Name); status_list.push(chapter[i].Status);}
            for(var i = 0; i < main.length; i++){

                var choose = each[k];
                var chapterdatafilter;
                switch(choose){
                    case 'chapexist': 
                        chapterdatafilter = main[i].Name;

                        if(main[i].Website === "yes" && names_list.includes(main[i].Name) && document.getElementById("s" + each[k].toLowerCase()).value === "checkchapterexist"){
                            indexchapter.push(i);
                        }
                        if(main[i].Website === "yes" && !names_list.includes(main[i].Name) && document.getElementById("s" + each[k].toLowerCase()).value === "checkchapternotexist"){
                            indexchapter.push(i);
                        }

                        break;
                    case 'chapstatus': 
                        chapterdatafilter = main[i].Name;
                        var index = names_list.indexOf(chapterdatafilter);
                        if(status_list[index] === document.getElementById("s" + each[k].toLowerCase()).value){
                            indexchapter.push(i);
                        }
                        break;
                }
                
            }

        }
        //matureallow
        if(document.getElementById("s" + each[k].toLowerCase()).value !== "none" && matureallow && maturefil.includes(each[k])){
            var names_list = [];
            var status_list = [];
            for(var i = 0; i < mature.length; i++){names_list.push(mature[i].Name); status_list.push(mature[i].Status);}
            for(var i = 0; i < more.length; i++){

                var choose = each[k];
                switch(choose){
                    case 'matureexist': 

                        if(more[i].Spoil.includes("mark as mature content") && names_list.includes(main[i].Name) && document.getElementById("s" + each[k].toLowerCase()).value === "checkmatureexist"){
                            indexmature.push(i);
                        }
                        if(more[i].Spoil.includes("mark as mature content") && !names_list.includes(main[i].Name) && document.getElementById("s" + each[k].toLowerCase()).value === "checkmaturenotexist"){
                            indexmature.push(i);
                        }

                        break;
                    case 'maturestatus': 
                        var index = names_list.indexOf(main[i].Name);
                        if(status_list[index] === document.getElementById("s" + each[k].toLowerCase()).value){
                            indexmature.push(i);
                        }
                        break;
                }
                
            }

        }

    }

    //check if...
    //and
    if(document.getElementById("logical").value === "and"){
        
        var allowmaincheck = (document.getElementById('includecommon').checked === true) ? true : false;
        var allowmorecheck = (document.getElementById('includeaddtional').checked === true) ? true : false;
        var allowchaptercheck = (document.getElementById('includechapter').checked === true) ? true : false;
        var allowmaturecheck = (document.getElementById('includemature').checked === true) ? true : false;

        var maincheck = indexmain.length;
        var morecheck = indexmore.length;
        var chaptercheck = indexchapter.length;
        var maturecheck = indexmature.length;
        //lost 1
        if(maincheck === 0){

            const filteredArray = intersect(indexmore, indexchapter);
            const filteredArray2 = intersect(filteredArray, indexmature);
            indexes = filteredArray2;

        }
        if(morecheck === 0){

            const filteredArray = intersect(indexmain, indexchapter);
            const filteredArray2 = intersect(filteredArray, indexmature);
            indexes = filteredArray2;

        }
        if(chaptercheck === 0){

            const filteredArray = intersect(indexmain, indexmore);
            const filteredArray2 = intersect(filteredArray, indexmature);
            indexes = filteredArray2;

        }
        if(maturecheck === 0){

            const filteredArray = intersect(indexmain, indexmore);
            const filteredArray2 = intersect(filteredArray, indexchapter);
            indexes = filteredArray2;

        }
        //lost2
        if(maincheck === 0 && morecheck === 0){

            const filteredArray2 = intersect(indexchapter, indexmature);
            indexes = filteredArray2;

        }
        if(maincheck === 0 && chaptercheck === 0){

            const filteredArray2 = intersect(indexmore, indexmature);
            indexes = filteredArray2;

        }
        if(maincheck === 0 && maturecheck === 0){

            const filteredArray2 = intersect(indexmore, indexchapter);
            indexes = filteredArray2;

        }
        if(morecheck === 0 && chaptercheck === 0){

            const filteredArray2 = intersect(indexmain, indexmature);
            indexes = filteredArray2;

        }
        if(morecheck === 0 && maturecheck === 0){

            const filteredArray2 = intersect(indexmain, indexchapter);
            indexes = filteredArray2;

        }
        if(chaptercheck === 0 && maturecheck === 0){

            const filteredArray2 = intersect(indexmain, indexmore);
            indexes = filteredArray2;

        }
        //has all
        if(maincheck !== 0 && morecheck !== 0 && chaptercheck !== 0 && maturecheck !== 0){

            const filteredArray = intersect(indexmain, indexmore);
            const filteredArray2 = intersect(filteredArray, indexchapter);
            const filteredArray3 = intersect(filteredArray2, indexmain);
            indexes = filteredArray3;

        }

        command();

    }
    //or
    if(document.getElementById("logical").value === "or"){

        for(var i = 0; i < main.length; i++){

            if(indexmain.includes(i) || indexmore.includes(i) || indexchapter.includes(i) || indexmature.includes(i)){
                indexes.push(i);
            }

        }

        command();

    }
    //defalt
    if(document.getElementById("logical").value === "none"){

        try {
            document.getElementById("content").innerHTML = "Please choose logic. For only Search type choose Or.";
        } 
        catch (error) {
            document.getElementById("normalcontent").innerHTML = "Please choose logic. For only Search type choose Or.";
        }

    }

}
function intersect(a, b) {
    return a.filter(Set.prototype.has, new Set(b));
}

//package search
function packages(){

    var type = document.getElementById("package").value;

    if(type === "none"){
        document.getElementById("reset").click();
    }
    if(type === "upchapter"){
        document.getElementById("reset").click();
        document.getElementById("swebsite").value = "yes";
        document.getElementById("soverall").value = "n";
        document.getElementById("schapexist").value = "checkchapterexist";
        document.getElementById("includecommon").checked = true;
        document.getElementById("includeaddtional").checked = true;
        document.getElementById("includechapter").checked = true;
        document.getElementById("logical").value = "and";
        try {
            document.getElementById("content").innerHTML = "Press search...";
        } 
        catch (error) {
            document.getElementById("normalcontent").innerHTML = "Press search...";
        }
    }
    if(type === "completed?"){

        var template = `
            <div style='text-align: left;'>
                Check if <input id='completedcheckname' list='ssname' placeholder='Name...'> can Completed?<br>
                Status Ended? = <label id='statuscheckit'>-</label><br>
                Website? = <label id='haswebsitecheck'>-</label><br>
                Mark as Mature? = <label id='markasmaturecheck'>-</label><br>
                Chapter Finished? = <label id='chaptercheck'>-</label><br>
                Mature Finished? = <label id='maturecheck'>-</label><br>
                Still not Completed? = <label id='completedcheckit'>-</label><br>
                <button onclick='checkcompleted()'>Examine</button> | Result: <label style='font-weight: bold;' id='resultcheck'>-</label><br>
                <img id='completedcover' style='width: 150px; border-radius: 10px;' src='https://i.pinimg.com/564x/20/84/d5/2084d52de67b409823d500f04f7f15c3.jpg'><br>
                Powered by Manhwa Manager 2023
            </div>
        `;

        try {
            document.getElementById("content").innerHTML = template;
        } 
        catch (error) {
            document.getElementById("normalcontent").innerHTML = template;
        }
        
    }
    if(type === "shouldaddchapter"){
        document.getElementById("reset").click();
        document.getElementById("swebsite").value = "yes";
        document.getElementById("soverall").value = "n";
        document.getElementById("schapexist").value = "checkchapternotexist";
        document.getElementById("includecommon").checked = true;
        document.getElementById("includeaddtional").checked = true;
        document.getElementById("includechapter").checked = true;
        document.getElementById("logical").value = "and";
        try {
            document.getElementById("content").innerHTML = "Press search...";
        } 
        catch (error) {
            document.getElementById("normalcontent").innerHTML = "Press search...";
        }
    }
    if(type === "shouldaddmature"){
        document.getElementById("reset").click();
        document.getElementById("smark").value = "mark as mature";
        document.getElementById("smatureexist").value = "checkmaturenotexist";
        document.getElementById("includeaddtional").checked = true;
        document.getElementById("includemature").checked = true;
        document.getElementById("logical").value = "and";
        try {
            document.getElementById("content").innerHTML = "Press search...";
        } 
        catch (error) {
            document.getElementById("normalcontent").innerHTML = "Press search...";
        }
    }
    if(type === "shouldfinishchapter"){
        document.getElementById("reset").click();
        document.getElementById("swebsite").value = "yes";
        document.getElementById("schapstatus").value = "n";
        document.getElementById("includecommon").checked = true;
        document.getElementById("includechapter").checked = true;
        document.getElementById("logical").value = "and";
        try {
            document.getElementById("content").innerHTML = "Press search...";
        } 
        catch (error) {
            document.getElementById("normalcontent").innerHTML = "Press search...";
        }
    }
    if(type === "shouldfinishmature"){
        document.getElementById("reset").click();
        document.getElementById("smark").value = "mark as mature";
        document.getElementById("smaturestatus").value = "n";
        document.getElementById("includeaddtional").checked = true;
        document.getElementById("includemature").checked = true;
        document.getElementById("logical").value = "and";
        try {
            document.getElementById("content").innerHTML = "Press search...";
        } 
        catch (error) {
            document.getElementById("normalcontent").innerHTML = "Press search...";
        }
    }

}

function checkcompleted(){

    var nameget = document.getElementById("completedcheckname").value;
    var status, website, completed, markasmature, chapterfinish, maturefinish;

    for(var i = 0; i < main.length; i++){
        if(main[i].Name === nameget){
            website = (main[i].Website === "yes") ? true : false;
            completed = (more[i].Notificate === "n") ? true : false;
            status = (main[i].Status === "end") ? true : false;
            document.getElementById("haswebsitecheck").innerHTML = website;
            document.getElementById("completedcheckit").innerHTML = completed;
            document.getElementById("statuscheckit").innerHTML = status;
            document.getElementById("completedcover").src = main[i].Cover;
            break;
        }
    }
    for(var i = 0; i < more.length; i++){
        if(more[i].Name === nameget){
            markasmature = (more[i].Spoil.includes("mark as mature content")) ? true : false;
            document.getElementById("markasmaturecheck").innerHTML = markasmature;
            break;
        }
    }
    for(var i = 0; i < chapter.length; i++){
        if(chapter[i].Name === nameget){
            chapterfinish = (chapter[i].Status === "Finish" || chapter[i].Status === "Cancelled") ? true : false;
            document.getElementById("chaptercheck").innerHTML = chapterfinish;
            break;
        }
    }
    for(var i = 0; i < mature.length; i++){
        if(mature[i].Name === nameget){
            maturefinish = (mature[i].Status === "Finish") ? true : false;
            document.getElementById("maturecheck").innerHTML = maturefinish;
            break;
        }
    }

    if(completed){

        if(status){

            if(website){
                if(chapterfinish){
                    if(markasmature){
                        if(maturefinish){
                            document.getElementById("resultcheck").innerHTML = "Allow."
                        }else{document.getElementById("resultcheck").innerHTML = "Not Allow, Story Mature content hasn't done yet."}
                    }else{
                        document.getElementById("resultcheck").innerHTML = "Allow."
                    }
                }else{document.getElementById("resultcheck").innerHTML = "Not Allow, Story Chapter hasn't done yet."}
            }else{
                if(markasmature){
                    if(maturefinish){
                        document.getElementById("resultcheck").innerHTML = "Allow."
                    }else{document.getElementById("resultcheck").innerHTML = "Not Allow, Story Mature hasn't done yet."}
                }else{
                    document.getElementById("resultcheck").innerHTML = "Allow."
                }
            }

        }else{
            document.getElementById("resultcheck").innerHTML = "Not Allow, Story hasn't ended yet."
        }

    }else{
        document.getElementById("resultcheck").innerHTML = "Story Already completed."
    }

}

//create
function command(){

    document.getElementById("page").innerHTML = "";
    //create page select
    var numcontPerpage = 50;
    var num_page = indexes.length / numcontPerpage;
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
        } 
        catch (error) {
            document.getElementById("normalcontent").innerHTML = "";
        }
        num_page = document.getElementById("page").options[document.getElementById("page").selectedIndex].text;
        var max = (num_page * numcontPerpage);
        var min = max - numcontPerpage;
        try{

            for(var i = min; i < max; i++){
                choosetype(main, indexes[i]);
            }

        }catch(error){}

    }
    document.getElementById("next").onclick = () => {
        const se = document.querySelector('#page');
        se.value = document.getElementById("page").options[document.getElementById("page").selectedIndex + 1].text;
        document.getElementById("go").click();
    }
    document.getElementById("prev").onclick = () => {
        const se = document.querySelector('#page');
        se.value = document.getElementById("page").options[document.getElementById("page").selectedIndex - 1].text;
        document.getElementById("go").click();
    }

    document.getElementById("go").click();

    document.getElementById('found').innerHTML = indexes.length;
    document.getElementById('percent').innerHTML = (indexes.length / document.getElementById('number').innerHTML * 100).toFixed(0);
}
function choosetype(data, i){

    var develope = (document.getElementById("developer").checked == true) ? create(data, i) : normalcreate(data, i);
}
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
    main_link.href = "content/" + data[i].Name + "/";

    //name_div.innerHTML = data[i].Name;
    main_span.setAttribute('src', data[i].Cover);

    //main_span.appendChild(name_div);
    document.getElementById("normalcontent").appendChild(main_link);

}
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
    name_link.href = "content/" + data[i].Name;
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
    var types = more[i].Type;
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
    if(more[i].Rate == "n"){rate = "All age";}
    if(more[i].Rate == "15"){rate = "R15";}
    if(more[i].Rate == "18"){rate = "R18";}
    if(more[i].AssName == "n"){more[i].AssName = "Unknown";}
    var national;
    if(more[i].Nation == "kr"){national = "<img src='https://i.pinimg.com/564x/26/16/8c/26168cddf75348cc28299de4daddcb5b.jpg' style='width: 30px;'>";}
    if(more[i].Nation == "cn"){national = "<img src='https://i.pinimg.com/564x/d0/96/c0/d096c0d511574bb41a18ed61deb5a06e.jpg' style='width: 30px;'>";}
    if(more[i].Nation == "th"){national = "<img src='https://i.pinimg.com/564x/ca/bc/d3/cabcd397c3831d374df02e52d127b9f1.jpg' style='width: 30px;'>";}
    var overall;
    if(more[i].Notificate == "n"){overall = "Ongoing";}
    if(more[i].Notificate == "c"){overall = "Completed";}
    var morelink1 = "";
    var morelink2 = "";
    var morelink3 = "";
    if(more[i].Morelink1 != "n"){morelink1 = "<a href='" + more[i].Morelink1 + "'>(Other I)</a>";}
    if(more[i].Morelink2 != "n"){morelink2 = "<a href='" + more[i].Morelink2 + "'>(Other II)</a>";}
    if(more[i].Morelink3 != "n"){morelink3 = "<a href='" + more[i].Morelink3 + "'>(Other III)</a>";}

    alte_div.innerHTML += morelink1 + morelink2 + morelink3 + "<br>Associate: " +  more[i].AssName + " " + national + "<br>Rate: " + rate + "<a href='https://www.google.com/search?q=" + data[i].Name.replaceAll(" ", "+").replaceAll("'", "") + "+spoiler'>(Spoiler)</a> " + "<a href='https://www.google.com/search?q=" + data[i].Name.replaceAll(" ", "+").replaceAll("'", "") + "+baka'>(Detail)</a>" + "<br>";
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
//Count down to percent days
function percent_to_up(today, date_up){

    var cal = Math.abs((100 / 7) * (date_up - today));
    if(today > date_up){cal = 100 - cal;}
    return cal;

}



    
