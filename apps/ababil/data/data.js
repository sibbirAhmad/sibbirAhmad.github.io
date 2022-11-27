async function fetchData(){
    const response = await fetch("/../../news.json");
    const data = response.json();
    return data;
}
fetchData().then(data=>{
    document.write(JSON.stringify(data));
});