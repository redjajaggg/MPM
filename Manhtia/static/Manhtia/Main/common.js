//Main Javascript use for every page that is a gate.
const database = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=1Mn2FDBvSjufDqNNxBn1SHVHFaCF0EnXnFDuwiS-Nbpg&p=Sheet1";

fetch(database)
    .then(d => d.json())
    .then(d => {
        normal(d);
    })

function normal(data){

    //Time Korean zone
    window.setInterval(function(){
        var date = new Date();
        var options = {timeZone: 'Asia/Seoul', hour12: true};
        var eastCoastTime = date.toLocaleString('en-UK', options);
        document.getElementById("time").innerHTML = "S.Korea: " + eastCoastTime + " Almost Chapters will update 10.00PM everyday.";
    }, 1000);

    //Notificate
    if(data[0].Status == "yes"){document.getElementById("notificate").style.display = "block"; document.getElementById("notificate").innerHTML = data[0].Info;}
    for(var i = 0; i < data.length; i++){

        if(data[1].Status == "no"){
            var e = document.getElementsByTagName('html')[0];
            e.removeChild(document.body);
            e.innerHTML = "<img style='width: 200px;' src='https://i.pinimg.com/564x/68/b3/6d/68b36d7bab2ce5db6f27f1df36367d64.jpg'><h1 style='text-align: center;'>Maintenance</h1><h2 style='text-align: center;'>Manhtia is now fixing. Will open soon.<br>(Manhwa Manager)</h2>";
        }

        if(data[i].Status == "yes"){

            var a = document.createElement("label");
            var app = document.getElementById("app");
            
            if(data[i].Piclink !== "n" && data[i].Group == "source"){
                    
                a.innerHTML = "<a href='" + data[i].Info + "'><img id='slink' src='" + data[i].Piclink + "'></a>";
                app.appendChild(a);

            }
            if(data[i].Piclink === "n" && data[i].Group == "source"){
                a.innerHTML = "<a href='" + data[i].Info + "'>" +  data[i].Name + "</a>";
                app.appendChild(a);
            }

            a.style.width = " 300px";
            a.style.textAlign = "left";
            a.style.overflow = " hidden";
            a.style.marginRight = " auto";
            a.style.marginLeft = " auto";

            if(data[i].Name == "Newtoki"){

                domain_newtoki = data[i].Info;

            }

        }

    }

}


//Open quick search pane
function openadvsearch(){
    document.getElementById("quicksearch").style.display = "block";
    document.getElementById("qsearchbutton").style.display = "none";
}
//Close quick search pane
function closesearch(){
    document.getElementById("quicksearch").style.display = "none";
    document.getElementById("qsearchbutton").style.display = "block";
}

//Create command
function filtername(){

    var name = document.getElementById("advname").value;

}
function filterpart(){

}
function filterdate(){

}
function filterreading(){

}

//Create element in adv
function create_adv(){

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

function offtopic(){
    var contrainer = document.createElement("div");
    var info = document.createElement("div");
    var label = document.createElement("h4");
    label.innerHTML = "Other Topic...";
    contrainer.id = "process";
    contrainer.style.zIndex = 10;
    info.innerHTML = `
        <a href='https://redjajaggg.github.io/My-Private-Manhwa/offtopic.html'>Anime / Cartoon</a>
        <a href='https://redjajaggg.github.io/My-Private-Manhwa/loveanddeepspace.html'>Love and Deepspace(Game)</a>
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

