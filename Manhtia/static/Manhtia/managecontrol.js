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
var link_edit = "https://script.google.com/macros/s/AKfycbw9sgILRuQzJdzRtF_SpeKfUQCoLR_ezaMYt0ONIcX0hjTCbIdpfql7SLTCvy9v_CBelQ/exec";
var link_allmature = "https://docs.google.com/spreadsheets/d/1LGJg6Jl3qV2IQfknt2xOvmvJuKtUaVWMSOcN1HrnHuc/edit?usp=sharing";
var link_allmaturesheet = "https://drive.google.com/drive/folders/1asS9TDsAvJZESrw0qu9YMdChTWRr1C0s?usp=drive_link";
var link_step = "https://redjajaggg.github.io/My-Private-Manhwa/step.html";
var link_convert = "https://script.google.com/macros/s/AKfycbwyBNcPK2YUmm_w24oD7yjTlPtQPqTKzNXW20rJ5G5ymgjqEBHAiyxQhlJ1ptFrePA/exec";
var link_folder = "https://script.google.com/macros/s/AKfycbxvFyvdEezHu23hMeB_lAdAl55EPKHCpi67y4AWEyJsB7Jgv9s2oKvDZxJqY8KRqymvMQ/exec";
var link_exchange = "https://redjajaggg.github.io/My-Private-Manhwa/ModernManhwaWeb/currency.html";
var link_provision = "https://redjajaggg.github.io/My-Private-Manhwa/provision.html";
var link_checker = "https://redjajaggg.github.io/My-Private-Manhwa/checker.html";
var link_append = "https://script.google.com/macros/s/AKfycbyG2edE1wsZUdHKZoI3iII-Gmp4IXMz80eQt97p_m7SS7lzTX_WodrfZO9NEwseLdkw/exec";
var link_appendbest = "https://script.google.com/macros/s/AKfycbzNBAt_4sHuKuR1QhBUGqFvTz-p2LHSePyZoB-VtSvwF5uPn96Orcal2SGhwjy3yp3OzA/exec";
var link_upload = "https://script.google.com/macros/s/AKfycbxzKf2_L6xSXf8bjgzn2TSYt1MgA9-63hQDmqfj1vZVXwOegMa1b3QVfHU7s-_kXIXjuQ/exec";
var link_upload2 = "https://script.google.com/macros/s/AKfycbw04HikVhHdusLfGbbMGxntz99mGy9K1N-cyvwHszY-Cqye2zeJ9LxtzubRkL9tzhVf/exec";
var link_checkerror = "https://script.google.com/macros/s/AKfycbylMInRC_cVolasNApkSusCZAlLvuCV_wWcDm_USIZ4tGLlV3fnv65USBcD82X5xdVFaQ/exec";
var link_console = "https://script.google.com/macros/s/AKfycbzJOq7K2SSpXIESnfeVgae7wonrqxFM-PcpOtiqKwd9RWcYKGIDWNwR31JKyuPz59q8/exec";

function iframeLoaded(link) {
    var iframe = document.getElementById('iframe');
     iframe.setAttribute('src', link);
}
function golink(link){
    location.href = link;
}

document.getElementById("consolewebsite").onclick = () => {
    iframeLoaded(link_console);
};
document.getElementById("manhwa").onclick = () => {
    iframeLoaded(link_addnewmanhwa);
};
document.getElementById("chapter").onclick = () => {
    iframeLoaded(link_addchapter);
};
document.getElementById("portrayal").onclick = () => {
    iframeLoaded(link_addportra);
};
document.getElementById("step").onclick = () => {
    iframeLoaded(link_step);
};
document.getElementById("error").onclick = () => {
    iframeLoaded(link_checkerror);
};
document.getElementById("uploadchaptermature").onclick = () => {
    iframeLoaded(link_upload);
};
document.getElementById("uploadchaptermature2").onclick = () => {
    iframeLoaded(link_upload2);
};
document.getElementById("convert").onclick = () => {
    iframeLoaded(link_convert);
};
document.getElementById("getandappend").onclick = () => {
    iframeLoaded(link_append);
};
document.getElementById("getandappendbest").onclick = () => {
    iframeLoaded(link_appendbest);
};
document.getElementById("folder").onclick = () => {
    iframeLoaded(link_folder);
};
document.getElementById("checker").onclick = () => {
    iframeLoaded(link_checker);
};
document.getElementById("exchanges").onclick = () => {
    iframeLoaded(link_exchange);
};
document.getElementById("provision").onclick = () => {
    iframeLoaded(link_provision);
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
