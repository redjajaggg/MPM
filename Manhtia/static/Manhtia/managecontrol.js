document.getElementById("logbut").onclick = () => {

    var password = document.getElementById("check").value;

    if(password == "112523"){
        document.getElementById("choose").style.display = "block";
        document.getElementById("iframe").style.display = "block";
        document.getElementById("loginform").innerHTML = "Access Successfully.";
    }
    else{
        var label = document.createElement('div');
        label.innerHTML = "Incorrect";
        document.getElementById("loginform").appendChild(label);
    }
};
var link_addnewmanhwa = "https://script.google.com/macros/s/AKfycbyjXlxulQSuKGrx13Uj7sD410mkOKUiliRsLV76ULgafntFXdeBLg3I1U65ed1G4yUg/exec";
var link_addchapter = "https://script.google.com/macros/s/AKfycbzIB-AHzNGbovLXCqDtdCUhwGOjYp2A_Vvtsfq1TonRyClyr4eAN0fcaprVHsXGW5Bu-w/exec";
var link_addportra = "https://script.google.com/macros/s/AKfycbxe-UwltBf-6KidfxiEpycQdasLgoZhZFFOudQUUsTuVopxa-Gfj7oTtSid07A8fy9nrg/exec";
var link_mature = "https://docs.google.com/spreadsheets/d/1ccgb2RTmSqblYdbqCSP6kyByCfYkKy7fX56eqldgzaA/edit#gid=0";
var link_main = "https://docs.google.com/spreadsheets/d/12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY/edit#gid=1960619729";
var link_more = "https://docs.google.com/spreadsheets/d/1vAmEFn17c6kJMQwJ5JPYlvtWnRRweM8O-uk1mwn5xgU/edit#gid=0";
var link_alllink = "https://docs.google.com/spreadsheets/d/1R1e93BSQ-dVmHgZadcJmINP_qDJo65CZFBJ98hhzpvk/edit#gid=0";
var link_sheetdrive = "https://drive.google.com/drive/u/9/folders/1_rZZiCUxKO7CYpr_sLq-GfRurgTOxL37";
var link_edit = "https://script.google.com/macros/s/AKfycbwl8K6IYxw2HILIxtBlOjFG1mXPWbftlJp2h72NIQ3imlFCZ8v2y_kXQ4jK57CXh7vvqQ/exec";
var link_allmature = "https://docs.google.com/spreadsheets/d/1LGJg6Jl3qV2IQfknt2xOvmvJuKtUaVWMSOcN1HrnHuc/edit?usp=sharing";
var link_allmaturesheet = "https://drive.google.com/drive/folders/1asS9TDsAvJZESrw0qu9YMdChTWRr1C0s?usp=drive_link";

function iframeLoaded(link) {
    var iframe = document.getElementById('iframe');
     iframe.setAttribute('src', link);
}
function golink(link){
    location.href = link;
}

document.getElementById("manhwa").onclick = () => {
    iframeLoaded(link_addnewmanhwa);
};
document.getElementById("chapter").onclick = () => {
    iframeLoaded(link_addchapter);
};
document.getElementById("portrayal").onclick = () => {
    iframeLoaded(link_addportra);
};
document.getElementById("mature").onclick = () => {
    golink(link_mature);
};
document.getElementById("change").onclick = () => {
    iframeLoaded(link_edit);
};
document.getElementById("maindata").onclick = () => {
    golink(link_main);
};
document.getElementById("moredata").onclick = () => {
    golink(link_more);
};
document.getElementById("eachpage").onclick = () => {
    golink(link_alllink);
};
document.getElementById("drive").onclick = () => {
    golink(link_sheetdrive);
};
document.getElementById("eachma").onclick = () => {
    golink(link_allmature);
};
document.getElementById("eachmadrive").onclick = () => {
    golink(link_allmaturesheet);
};
