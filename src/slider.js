let currentSlide = 0;

async function slider() {
  try {
    const api = '  https://api.abhishekshivale45.workers.dev/home';
    const res = await fetch(api);
    const result = await res.json();
    const data = result['results']['anilistTrending'];

    sliderImage(data);
  } catch (error) {
    console.error(error);
  }
}

function sliderImage(data) {
  let slidesHTML = '';
  let dotsHTML = '';

  for (let i = 0; i < data.length; i++) {
    const anime = data[i];
    const title = anime['title']['userPreferred'];
    const id = anime['id'];
    let url = "./anime.html?anime=" + title;
    let bannerImage = anime['bannerImage'];
    if (bannerImage == null) {
      bannerImage = anime['coverImage']['extraLarge'] || 'default_image.jpg';
    }

    slidesHTML += `<img src="${bannerImage}" alt="${title}" onclick="window.location.href='${url}'" >`;
   // dotsHTML += '<span class="dot"></span>';

    const slidesContainer = document.querySelector('.slides');
    slidesContainer.innerHTML = slidesHTML;

    // const dotsContainer = document.querySelector('.dots');
    // dotsContainer.innerHTML = dotsHTML;
  }
  const slides = document.querySelectorAll('.slides img');
  const dots = document.querySelectorAll('.dot');
  function showSlide(index){
    slides.forEach((slide, slideIndex)=>{
      if(slideIndex === index){
        slide.style.display = 'block';
       // dots[slideIndex].classList.add('active');
      }else{
        slide.style.display = 'none'; 
        //dots[slideIndex].classList.remove('active');
      }
    })
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  let interval = setInterval(nextSlide, 3000);
  const slidesContainerDiv = document.querySelector('.slides-container');
  slidesContainerDiv.addEventListener('mouseenter', () => {
    clearInterval(interval);
  });
  slidesContainerDiv.addEventListener('mouseleave', () => {
    interval = setInterval(nextSlide, 3000);
  });

  // dots.forEach((dot, index) => {
  //   dot.addEventListener('click', () => {
  //     currentSlide = index;
  //     showSlide(currentSlide);
  //     clearInterval(interval);
  //   });
  // });
}

slider();
async function trending(page) {
  try {
    const api = `  https://api.abhishekshivale45.workers.dev/gogoPopular/${page}`;
    const res = await fetch(api);
    const result = await res.json();
    const data = result['results'];
    console.log(data)

    trandingAnime(data);
  } catch (error) {
    console.error(error);
  }
}

function trandingAnime(data) {
  let popularAnimeHtml = '';
  for (let i = 0; i < 14; i++) {
    const anime = data[i];
    const title = anime['title'];
    const id = anime['id'];
    let url = "./anime.html?anime=" + id;
    const bannerImage = anime['image'];

    popularAnimeHtml += `
    <a href="${url}">
    <div class="mainText">
      <div class="mostpopular-i">
          <img src="${bannerImage}" alt="${title}">
        </div>
      </div>
    <div class="info">
      <div class="animeNo">
      <p>${i + 1}</p>
      </div>
      <div class="p-title">
        <p>${title}</p>
      </div>
     
    </div>
    </a>
   `;
  }

  const popularAnimeContainer = document.querySelector('.divmostpopular');
  popularAnimeContainer.innerHTML = popularAnimeHtml;
}


trending('1')


async function recent(page) {
  try {
    const api = `  https://api.abhishekshivale45.workers.dev/recent/${page}`;
    const res = await fetch(api);
    const result = await res.json();
    const data = result['results'];
    return recentAnime(data)
  } catch (error) {
    console.error(error);
  }
}
let recentHTML = '';
function recentAnime(data){
  console.log(data)

  for (let i = 0; i < 20; i++) {
    const anime = data[i];
    const title = anime['title'];
    const id = anime['id'];

    let url = "./anime.html?anime=" + title;

    // const episode = anime['episode']
    // <div class="epNo"><p>${episode}</p></div>
    const bannerImage = anime['image'];

    recentHTML += `
    <a href="${url}">
    <div class="mainText">
      <div class="mostpopular-i">
          <img src="${bannerImage}" alt="${title}">
        </div>
      </div>
    <div class="info">
      <div class="animeNo">
      <p></p>
      </div>
      <div class="p-title">
        <p>${title}</p>
      </div>
     
    </div>
    </a>
   `;
  }

  const recentAnimeContainer = document.querySelector('.divrecent');
  recentAnimeContainer.innerHTML = recentHTML;
}

function isScrollAtBottom() {
  const scrollTop = document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  return documentHeight - (scrollTop + windowHeight) < 100; // Adjust the threshold as needed
}
let currentPage = 1;
window.addEventListener('scroll', async () => {
  if (isScrollAtBottom()) {
    currentPage++; 
    await recent(currentPage.toString()); 
   }
});
recent(currentPage.toString());function isScrollAtBottom() {
  const scrollTop = document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  return documentHeight - (scrollTop + windowHeight) < 100; 
}

window.addEventListener('scroll', async () => {
  if (isScrollAtBottom()) {
    currentPage++; 
    await recent(currentPage.toString()); 
  }
});
recent(currentPage.toString());
