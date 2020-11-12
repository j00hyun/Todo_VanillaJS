const clockContainer = document.querySelector(".js-clock"), //<div class="js-clock">
                                                            //<h1>00:00</h1>
                                                            //</div>
 clockTitle = clockContainer.querySelector("h1"); //<h1>00:00</h1>

function getTime() { //날짜 생성후 출력 함수
    const date = new Date(); //Date 객체 생성
    const minutes = date.getMinutes(); //현재 분 저장
    const hours = date.getHours(); //현재 시 저장
    const seconds = date.getSeconds(); //현재 초 저장
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${ //00:00에 시간출력 -> 00:00:00
        minutes < 10 ? `0${minutes}` : minutes 
        }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() { //1000ms마다 시간 생성후 출력 함수
    getTime(); 
    setInterval(getTime, 1000); 
}

init(); //함수 실행