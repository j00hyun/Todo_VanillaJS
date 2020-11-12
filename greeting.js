const form = document.querySelector(".js-form"), //<<form class="js-form form">
                                                 //<input type="text" placeholder="What is your name?" />
                                                 //</form>
    input = form.querySelector("input"), //<input type="text" placeholder="What is your name?" />
    greeting = document.querySelector(".js-greetings"); //<h4 class="js-greetings greetings"></h4>

const USER_LS = "currentUser", //문자열 지정
    SHOWING_CN = "showing";

function saveName(text) { //입력값 localstorage에 저장
    localStorage.setItem(USER_LS, text); //currentUser에 이름 저장
}

function handleSubmit(event) { //이름 입력창에서 enter 누를때
    event.preventDefault(); //enter누를때 기본이벤트 삭제
    const currentValue = input.value; //입력값
    paintGreeting(currentValue); //입력값 저장 후 인사말 보여주기
    saveName(currentValue); //입력값 localstorage에 저장
}

function askForName() {
    form.classList.add(SHOWING_CN); //이름 입력창 보여주기
    form.addEventListener("submit", handleSubmit) //enter 누르면 이벤트 실행
}

function paintGreeting(text) { //현재 사용자가 존재할때 인사말 보여주기
    form.classList.remove(SHOWING_CN); //이름 입력창 숨김
    greeting.classList.add(SHOWING_CN); //인삿말 보여주기
    greeting.innerText = `Hello ${text}`; //인삿말 삽입
}

function loadName() { //사용자의 유무에 따라 다른 동작 실행
    const currentUser = localStorage.getItem(USER_LS); //localstorage에서 현재 사용자 가져오기
    if(currentUser === null) { //현재 사용자가 없을때
        askForName(); //이름 입력 후 저장
    } else { //현재 사용자가 존재할때
        paintGreeting(currentUser); //이름 입력창 숨기고 인사말 보여주기
    }
}
function init() { //사용자 탐색
    loadName();
}

init(); //실행