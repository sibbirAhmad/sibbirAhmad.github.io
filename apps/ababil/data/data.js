async function fetchData(url){
    const response = await fetch(url);
    const data = response.json();
    return data;
}
var p = getURLParams();
var param = p.p;
const dataJson = {};
fetchData("data.json").then(data=>{
    if(param!=data.updateCode){
        console.log("Need to aupdate app");
        dataJson.appData = data;
    }else{
        console.log("App is Up to date");
       
    }
    console.log(data.appUpdate.versionCode);
});
fetchData("/../../news.json").then(data=>{
    dataJson.news = data;
    document.write(JSON.stringify(dataJson));
});
function getURLParams() {
    var params = new Object();
    var query = window.location.search.substring(1);
    var pairs = query.split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos > 0) {
            var key = pairs[i].substring(0, pos);
            var val = pairs[i].substring(pos + 1);
            params[key] = val;
        }
    }
    return params;
}