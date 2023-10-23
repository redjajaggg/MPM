window.addEventListener("DOMContentLoaded", (event) => {
    const sheetDataHandler = (sheetData) => {

      var datalist = document.getElementById("namestm");

      for(var o = 0; o < sheetData.length; o++){
          const option = document.createElement('option');
          option.text = sheetData[o].Name;
          option.value = sheetData[o].Name;
          datalist.appendChild(option);
      }

      document.getElementById("sname").onchange = () => {

        document.getElementById("convey").innerHTML = "";
        for(var o = 0; o < sheetData.length; o++){
            if(sheetData[o].Name == document.getElementById("sname").value){
                create(sheetData, o);
                break;
            }
        }

      };
      const today = new Date();
      document.getElementById("datest").value = today.getDay();
      document.getElementById("datest").onchange = () => {

        document.getElementById("convey").innerHTML = "";
        for(var o = 0; o < sheetData.length; o++){
            if(sheetData[o].Date == document.getElementById("datest").value){
                create(sheetData, o);
            }
        }

      };
      document.getElementById("statusst").onchange = () => {

        document.getElementById("convey").innerHTML = "";
        for(var o = 0; o < sheetData.length; o++){
            if(sheetData[o].Status == document.getElementById("statusst").value){
                create(sheetData, o);
            }
        }

      };
      document.getElementById("nationst").onchange = () => {

        document.getElementById("convey").innerHTML = "";
        for(var o = 0; o < sheetData.length; o++){
            if(sheetData[o].Nation == document.getElementById("nationst").value){
                create(sheetData, o);
            }
        }

      };
      document.getElementById("rates").onchange = () => {

        document.getElementById("convey").innerHTML = "";
        for(var o = 0; o < sheetData.length; o++){
            if(sheetData[o].Rate == document.getElementById("rates").value){
                create(sheetData, o);
            }
        }

    };
    document.getElementById("marked").onchange = () => {

      document.getElementById("convey").innerHTML = "";
      for(var o = 0; o < sheetData.length; o++){
          if(sheetData[o].Detail.includes(document.getElementById("marked").value)){
              create(sheetData, o);
          }
      }

    };
    document.getElementById("genre").onchange = () => {

      document.getElementById("convey").innerHTML = "";
      for(var o = 0; o < sheetData.length; o++){
          if(sheetData[o].Type.includes(document.getElementById("genre").value)){
              create(sheetData, o);
          }
      }

    };
    document.getElementById("overallst").onchange = () => {

      document.getElementById("convey").innerHTML = "";
      for(var o = 0; o < sheetData.length; o++){
          if(sheetData[o].Overall == document.getElementById("overallst").value){
              create(sheetData, o);
          }
      }

    };
    document.getElementById("purchase").onchange = () => {

      document.getElementById("convey").innerHTML = "";
      for(var o = 0; o < sheetData.length; o++){
          if(sheetData[o].Purchase == document.getElementById("purchase").value){
              create(sheetData, o);
          }
      }

    };
    document.getElementById("read").onchange = () => {

      document.getElementById("convey").innerHTML = "";
      for(var o = 0; o < sheetData.length; o++){
          if(sheetData[o].Read == document.getElementById("read").value){
              create(sheetData, o);
          }
      }

    };

      page_count(sheetData);
      send(sheetData);
      document.getElementById("pages").onchange = () => {
        document.getElementById("go").click();
      }
      document.getElementById("next").onclick = () => {
        const se = document.querySelector('#pages');
        se.value = document.getElementById("pages").options[document.getElementById("pages").selectedIndex + 1].text - 1;
        document.getElementById("go").click();
      }
      document.getElementById("prev").onclick = () => {
        const se = document.querySelector('#pages');
        se.value = document.getElementById("pages").options[document.getElementById("pages").selectedIndex - 1].text - 1;
        document.getElementById("go").click();
      }
      document.getElementById("go").onclick = () => {
        send(sheetData);
      }
    };
  
  getSheetData({
    sheetID: "1U0F2QEFHx1vDufEJhb4_Pg_li0QgQHp6JtPRzlKOAAE",
    sheetName: "Main",
    query: "SELECT *",
    callback: sheetDataHandler,
  });
});


function page_count(data){

  //count page
  const length = data.length;
  const numberperpage = 50;
  const countpage = Math.ceil(length / numberperpage);
  for(var page = 0; page < countpage; page++){

    var opt = document.createElement('option');
    opt.value = page;
    opt.innerHTML = page + 1;
    document.getElementById("pages").appendChild(opt);

  }

}

function send(data){

  document.getElementById("convey").innerHTML = "";
  var page = document.getElementById("pages").value;
  var start = page * 50;
  var end = start + 50;

  for(var i = start; i < end; i++){

    create(data, i);

  }

}


function create(data, i){

  var contrainer = document.createElement("div");
  var name_div = document.createElement("div");
  var name_link = document.createElement("a");
  var data_div = document.createElement("div");
  var cover_div = document.createElement("div");

  var website_logo = document.createElement("img");
  var cover_link = document.createElement("img");

  var raws = document.createElement("a");
  var engs = document.createElement("a");
  var news = document.createElement("a");
  var oths = document.createElement("a");
  var oth1 = document.createElement("a");
  var oth2 = document.createElement("a");
  var oth3 = document.createElement("a");
  var br1 = document.createElement("br");

  //assign
  var moreText = document.createTextNode(data[i].Name);
  name_link.appendChild(moreText);
  name_link.title = data[i].Name;
  name_link.href = "/manhtia/content-v2/" + data[i].Name;
  data_div.innerHTML = "Part: " + data[i].Part + " | Number: " + data[i].Number + " | Date: " + convert_date(data[i].Date) + "<br>";

  cover_link.setAttribute("src", data[i].Cover);
  cover_div.appendChild(cover_link);

  //process

  //id
  contrainer.id = "contrainer";
  name_div.id = "name";
  cover_link.id = "cover";
  cover_div.id = "coverdiv";

  //append
  contrainer.appendChild(cover_div);
  name_div.appendChild(name_link);
  contrainer.appendChild(name_div);
  contrainer.appendChild(data_div);
  document.getElementById("convey").appendChild(contrainer);
  if(data[i].Convey == "false"){contrainer.innerHTML = data[i].Name + " Not Availiable.";}

}

function fils(){
    document.getElementById("filters").style.display = "none";
}
function fols(){
  document.getElementById("filters").style.display = "block";
}
function reset(){

  const se = document.querySelector('#pages');
  se.value = document.getElementById("pages").options[0].text - 1;
  document.getElementById("go").click();

  document.getElementById("sql").value = "SELECT *";
  document.getElementById("sname").value = "";
  document.getElementById("genre").value = "none";
  document.getElementById("datest").value = "-";
  document.getElementById("statusst").value = "-";
  document.getElementById("rates").value = "none";
  document.getElementById("nationst").value = "none";
  document.getElementById("marked").value = "none";
  document.getElementById("overallst").value = "none";
  document.getElementById("purchase").value = "none";
  document.getElementById("read").value = "none";
  clicks();

}

function sendsql(data){

  document.getElementById("convey").innerHTML = "";
  var page = document.getElementById("pages").value;
  var start = page * 50;
  var end = start + 50;

  for(var i = start; i < end; i++){
    
    create(data, i);

  }

}

function sql(){
  const searchsheetDataHandler = (sheetData) => {
    sendsql(sheetData);
  };

  getSheetData({
    sheetID: "1U0F2QEFHx1vDufEJhb4_Pg_li0QgQHp6JtPRzlKOAAE",
    sheetName: "Main",
    query: document.getElementById("sql").value.toUpperCase(),
    callback: searchsheetDataHandler,
  });
}
function convert_date(date){
  var day = "";
  switch(date){
      case 1: day = "Mon-Tue"; break;
      case 2: day = "Tue-Wed"; break;
      case 3: day = "Wed-Thu"; break;
      case 4: day = "Thu-Fri"; break;
      case 5: day = "Fri-Sat"; break;
      case 6: day = "Sat-Sun"; break;
      case 7: day = "Sun-Mon"; break;
      default: day = "Unknown"; break;
  }
  return day;
}

