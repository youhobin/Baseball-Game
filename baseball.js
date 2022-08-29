const $input = document.querySelector("#input");
const $form = document.querySelector("#form");
const $logs = document.querySelector("#logs");

const numbers = [];  // [1 2 3 4 5 6 7 8 9]
for (let n=0; n<9; n += 1) {
    numbers.push(n+1);
};

const answer = [];    // [3, 1, 4, 6]
for (let n = 0; n < 4; n += 1) {
    const index = Math.floor(Math.random() * (numbers.length));
    answer.push(numbers[index]);
    numbers.splice(index, 1);
};
console.log(answer);

const tries = [];  
function checkInput(input){         //검사하는 코드
    if (input.length !== 4) {
        return alert("4자리 숫자를 입력해 주세요.");
    }
    if (new Set(input).size !== 4) {//중복되면 size가 줄어듬
        return alert("중복되지 않게 입력해 주세요.");   
    }
    if (tries.includes(input)) { //tries 안에 있는 값 쓰면 true가 됨.
        return alert("이미 시도한 값입니다.");
    }
    return true;
}      

function defeated() {
    const message = document.createTextNode(`패배! 정답은 ${answer.join("")}`);
    $logs.appendChild(message);
}

let out = 0;
$form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = $input.value;
    $input.value = "";
    if (!checkInput(value)) {
        return;
    }
    if (answer.join("") === value) {//join 쓰면 [3, 1, 4, 6]  -> "3146"
        $logs.textContent = "홈런!";
        return;
    }
    if (tries.length >= 9) {
        defeated();
        return;
    }
    // 몇 스트라이크 몇볼인지 알려주기
    //answer = 3146 ,  value = 1234
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < answer.length; i++) {
        const index = value.indexOf(answer[i]);
        if (index > -1) {   //일치하는 숫자 위의 예시는 index값 2;
            if (index === i) {
                strike += 1;
            } else {
                ball += 1;
            }
        }
    }

    if (strike === 0 && ball === 0) {
        out ++;
        $logs.append(`${value}:아웃`, document.createElement("br"));
    } else {
        $logs.append(`${value}: ${strike} 스트라이크 ${ball} 볼`, document.createElement("br"));
    }
    if (out === 3) {
        defeated();
        return;
    }
    tries.push(value);
});
