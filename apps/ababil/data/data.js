async function fetchData(url){
    const response = await fetch(url);
    const data = response.json();
    return data;
}
var p = getURLParams();
var updateCode = p.updateCode;
var newsCount = p.newsCount;
var appVersion =p.appVersion

const dataJson = {};
fetchData("data.json").then(data=>{
    if(updateCode!=data.updateCode || appVersion< data.appUpdate.versionCode){
        console.log("Need to aupdate app");
        dataJson.appData = data;
    }
    if(newsCount!=null){
        fetchData("/../../news.json").then(data=>{
            var result;
            if(data.length<newsCount){
                result = data;
            }else{
                result = data.slice(newsCount>data.length?data.length:newsCount); //If length is overcome then send all to update
            }
            dataJson.news = result;
            document.write(JSON.stringify(dataJson));
        });
    }else{
        document.write(JSON.stringify(dataJson)); 
    }
    
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