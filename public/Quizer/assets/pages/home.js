var data = [{
        "id": 0,
        "Q": "What does CSS stands for?",
        "mcq": ["Fathy", "Moahmed", "Ali", "Momane"]
    },
    {
        "id": 1,
        "Q": "What Your Fev language",
        "mcq": ["Java", "CPP", "Python", "Rust"]
    },
    {
        "id": 2,
        "Q": "What Your position",
        "mcq": ["security", "devloper", "anlysis", "person"]
    }
];

const question = document.querySelector('#Q');
const ans = document.querySelectorAll('.ans');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const options = document.querySelectorAll('input[name="q_answer"]');
const labels = document.querySelectorAll('.quiz label');
const currentCount = document.querySelector('.now')
const totallCount =  document.querySelector('.total'); 

totallCount.textContent = data.length;




const warringMsg = document.querySelector('.warring');

const answersValue = [];
const answersIndex = [];

let currentIndex = 0;

currentCount.textContent = currentIndex + 1;

console.log(`current Index : ${currentIndex}`)

options.forEach(option => option.addEventListener('click', () => {
    warringMsg.style.display = "none";
}))


const getSelectedAnswer = () => {
    const selected = document.querySelector('input[name="q_answer"]:checked');

    if (selected) {
        return selected.value;
    } else {
        return null;
    }
}

const clearOptions = () => {
    options.forEach(option => option.checked = false);
    labels.forEach(label => label.classList.remove('active'));
}

const exchangeData = (Q, Ans) => {
    question.textContent = "Q. " + Q;
    for (let i = 0; i < 4; i++) {
        ans[i].textContent = Ans[i];
    }
}

const resetAnimation = () => {
    ans.forEach(a => {
        a.classList.remove("answer-animation");
        void a.offsetWidth;
        a.classList.add("answer-animation");
    })
}

const selectPreviousOptions = (previousIndex) => {
    if (previousIndex !== undefined) {
        labels[previousIndex].classList.add('active');
        options[previousIndex].checked = true;
    } else
        console.log("Undefined");
}

const updateButtons = () => {
   
    if (currentIndex === 0) {
        prevBtn.classList.add("disabled");
    } else {
        prevBtn.classList.remove("disabled");

    }

   
    if (currentIndex === data.length - 1) {
        document.querySelector('.btn-text').textContent = "Submit" ; 
    } else {
        document.querySelector('.btn-text').textContent = "Next" ; 
    }
};


// set first question
(function () {
    exchangeData(data[0].Q, data[0].mcq);
    updateButtons();
})();


nextBtn.addEventListener('click', () => {


    // get answer value 
    const answer = getSelectedAnswer();

    if (answer) {
        answersIndex[currentIndex] = parseInt(answer - 1);
        answersValue[currentIndex] = data[currentIndex].mcq[parseInt(answer) - 1];
    } else {
        warringMsg.style.display = "block";
        return;
    }

    if (currentIndex < data.length - 1) {

        currentIndex++;
        currentCount.textContent = currentIndex + 1;
        exchangeData(data[currentIndex].Q, data[currentIndex].mcq);
        console.log(`current Index : ${currentIndex}`)

        // reset animation 
        resetAnimation();

        // clear options 
        clearOptions();

        if (answersIndex[currentIndex] !== undefined) {
            selectPreviousOptions(answersIndex[currentIndex]);
        }

        if(currentIndex == 0){
            prevBtn.disabled = true;
        }else{
            prevBtn.disabled = false;

        }

        updateButtons();
    } else {
        console.log(`Quiz is Finished ${answersValue} ${answersIndex}`)
        return;
    }
})

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        currentCount.textContent = currentIndex + 1;
        // change data
        exchangeData(data[currentIndex].Q, data[currentIndex].mcq);

        // cleare options
        clearOptions();

        // select previous options 
        selectPreviousOptions(answersIndex[currentIndex]);
        console.log(`current Index : ${currentIndex}`)
        
        updateButtons();

    }
});