    const song= document.getElementById("song");
    const playBtn= document.querySelector(".play-inner");
    const nextBtn= document.querySelector("#play-next")
    const prevbtn= document. querySelector("#play-back");
    const durationTime = document.querySelector(".duration");
    const remainingTime = document.querySelector(".remaining");
    const rangebar = document.querySelector(".range");
    const musicname = document.querySelector(".music_name");
    const musicImage = document.querySelector(".music-thumb img");
    const musicthumbnail = document.querySelector(".music-thumb");
    const playRepeat = document.querySelector("#play-repeat")
    
    let isplaying= true;
    let indexsong= 0;
    let isRepeat= false; 
    // const musics = ["aoanh.mp3", "cuoithoi.mp3", "yeuduongkhoqua.mp3"]; 
    const musics = [

        {
            id:1,
            title: "Ảo ảnh",
            File: "aoanh.mp3",
            image: "https://gamek.mediacdn.vn/thumb_w/600/2018/11/16/httpgenknewsvcmediavnkthumbw6402015img20150716105858393luffy-thi-trien-gear-4-ba-dao-tren-tung-hat-gao-trong-hai-tac-truyen-ky-1542338595531276312142-crop-15423386054751053523317.jpg"
        },
        {
            id:2,
            title: "Cưới thôi",
            File: "cuoithoi.mp3",
            image: "https://i.ytimg.com/vi/wF0yKgvKoAs/maxresdefault.jpg"
        },
        {
            id:3,
            title: "Yêu đương khó quá chạy về khóc với anh",
            File: "yeuduongkhoqua.mp3",
            image: "https://s.meta.com.vn/img/thumb.ashx/Data/image/2021/10/08/hinh-anh-one-piece-an.jpg"
        }
    ]
    displayTimer();
    let timer ;
    playRepeat.addEventListener("click", function(){
        if (isRepeat) {
            isRepeat = false;
            playRepeat.style.color = "black";
        }
        else {
            isRepeat = true;
            playRepeat.style.color = "#c662ef";
        }
       
    });
    nextBtn.addEventListener("click", function(){
        changeSong(1);
    } );
    prevbtn.addEventListener("click", function(){
        changeSong(-1);
    } );
     song.addEventListener("ended", handlEndedSong);
     function handlEndedSong (){
        if (isRepeat){
            // handle repeat song 
            isplaying = true;
            playPause();
        }else{
             changeSong(1);
        }
     }
    function changeSong(dir){
        if (dir === 1){
            indexsong++;
            if (indexsong >= musics.length){
                indexsong = 0;
        }
         isplaying = true;
        }else if(dir===-1){
            indexsong--;
                if(indexsong < 0){
                indexsong = musics.length -1;
            }
        isplaying = true;
        }
        init(indexsong);
    // song.setAttribute("src", `./music/${musics[indexsong].File}`);
    playPause();
    }
    playBtn.addEventListener("click", playPause);
    function playPause(){
        if (isplaying){
            musicthumbnail.classList.add("is-playing");
            song.play();
                playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
            isplaying = false;
            timer = setInterval(displayTimer,500);
        }else {
            musicthumbnail.classList.remove("is-playing");
            song.pause();
                playBtn.innerHTML = '<i class="bi bi-play-fill" ></i>';
            isplaying = true;
            clearInterval(timer);
        }
    }
    function displayTimer (){
        const {duration, currentTime} = song;
        rangebar.max = duration;
        rangebar.value = currentTime;
        remainingTime.textContent = formatTimer(currentTime);
        if (!duration){
            durationTime.textContent = "00:00";
        }else{
            durationTime.textContent = formatTimer(duration);
        }

    }
    function formatTimer(Number){
        const minutes = Math.floor(Number/60);
        const seconds = Math.floor(Number-minutes *60);
        return `${minutes < 10 ? '0' + minutes: minutes}:
        ${seconds < 10 ? '0' + seconds: seconds}`;
    }
    rangebar.addEventListener("change", handleChangebar);
    function handleChangebar(){
          song.currentTime = rangebar.value;
    }
    function init(indexsong){
        displayTimer();
        song.setAttribute("src", `./music/${musics[indexsong].File}`);
        musicImage.setAttribute("src", musics[indexsong].image);
        musicname.textContent = musics[indexsong].title;
    }
   init(indexsong);