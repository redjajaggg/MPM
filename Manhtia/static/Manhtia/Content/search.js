var is_logged_in = document.getElementById("usernamecheck").innerHTML;
if(is_logged_in === "True"){
    console.log("Logged in.");
}
else{
    document.body.innerHTML = "<h3>Not Logged in yet. Please login <a href='/manhtia/login'>here</a></h3>";
}
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

        }catch(error){
            for(var i = min; i < max; i++){
                choosetype(main, indexes[i]);
            }
        }

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

