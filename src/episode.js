const params = new URLSearchParams(window.location.search);

const animeName = params.get("anime");
const EpNo = params.get("episode");

const episodeApi = `  https://api.abhishekshivale45.workers.dev/episode/${animeName}-episode-${EpNo}`;

async function fetchData() {
    try {
        const res = await fetch(episodeApi);
        const data = await res.json();
        runVideo(data);
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();

function runVideo(data) {
    const anime = data?.results?.stream?.sources[0]?.file;
    console.log(anime)
    if (!anime) {
        console.error("No valid anime URL found.");
        return;
    }
        const video = document.getElementById('video');
        if (Hls.isSupported()) {
            const hls = new Hls();
            const streamUrl = anime;

            hls.loadSource(streamUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = anime;
            video.addEventListener('loadedmetadata', function () {
                video.play();
            });
        } else {
            console.error('HLS is not supported in this browser.');
        }
      };

    function nextEpisode() {
        const params = new URLSearchParams(window.location.search);
        let animeName = params.get("anime");
        let episodeNo = params.get("episode");
    
        episodeNo = parseInt(episodeNo);
    
        episodeNo++;
    
        params.set("episode", episodeNo);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
    
        window.location.href = newUrl;
    }
    

