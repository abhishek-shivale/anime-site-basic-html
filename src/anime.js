const animeapi = "  https://api.abhishekshivale45.workers.dev/anime/";
const recommendationsapi = "  https://api.abhishekshivale45.workers.dev/recommendations/";
const params = new URLSearchParams(window.location.search);
const animeName =  params.get("anime")
const url = animeapi + animeName
async function animeInfo(){
    const res = await fetch(url)
    const result = await res.json()
    const data = result['results'];
   
    return animeEp(data)
}
animeInfo()
async function animeEp(data){
    let animeHTMl = '';
    const anime = data
    const name = anime['name'];
    const id = anime['id'];
    const urlEp = "./episode.html?anime="+id+"&episode=1";
    const image = anime['image']
    const summary = anime['plot_summary']
    const released = anime['released']
    const status = anime['status']
    const ep = anime['episodes']
    const genre = anime['genre']
    
    animeHTMl = `
    <div class="banner">
            <img src="${image}" alt="">
        </div>
        <div class="animeInfo">
            <div class="name">
                <p><span>Title</span>${name}</p>
            </div>
            <div class="plotSummary">
                <p><span>Plot Summary</span>${summary}</p>
            </div>
            <div class="genre">
                <p><span>Genre</span>${genre}</p>
            </div>
            <div class="released">
                <p><span>Released</span>${released}</p>
            </div>
            <div class="type">
                <p><span>Status</span>${status}</p>
            </div>
            <div class="watchBtn">
               <a href="${urlEp}">Watch Now</a> 
            </div>
        </div>
    </div>
    <div class="animeEp">
        <div class="singlebtn">

        </div>
    `
    const animeInfoContainers = document.querySelectorAll('.anime'); // Use querySelectorAll for multiple elements
animeInfoContainers.forEach(container => {
  container.innerHTML = animeHTMl;
});

}