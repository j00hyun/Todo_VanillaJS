const body = document.querySelector("body");

const IMG_NUMBER = 3; //이미지 개수

function paintImage(imgNumber) { //이미지 불러오기
    const image = new Image(); //Image 객체 생성
    image.src = `images/${imgNumber + 1}.jpg`; //1,2,3중 한개 이미지 가져오기
    image.classList.add("bgImage"); //class에 bgImage 추가
    body.prepend(image); //body tag 가장 앞에 코드 위치시킴
}

function genRandom() { //랜덤 숫자 생성
    const number = Math.floor(Math.random() * IMG_NUMBER); //floor: 내림, 0 or 1 or 2
    return number; //출력값
}

function init() {
    const randomNumber = genRandom(); //randomNumber = 0,1,2
    paintImage(randomNumber); //이미지 불러오기
}

init();