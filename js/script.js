const createElement=(arr) =>{
    const htmlElement = arr.map(item => `<span class="btn bg-base-300">${item}</span>`);
    return htmlElement.join(" ");
}

const loading =(status) =>{
    if(status == true){
        document.getElementById("spiner-container").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }else{
        document.getElementById("spiner-container").classList.add("hidden");        
        document.getElementById("word-container").classList.remove("hidden");        
    }
}

const pronounceWord = (word) => {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const loadLevel = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(response => response.json())
        .then(data => displayLevel(data.data))
}

const loadWord = (id) => {
    loading(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive() // active class remove
            const lessonBtn = document.getElementById(`lesson-btn-${id}`)
            lessonBtn.classList.add("active") // add active class
            displayWord(data.data)
        })
    
}

const loadWordDetails =async (id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayWordDetails(data.data);
}

const removeActive = () =>{
    const allActiveClass = document.querySelectorAll(".active-btn");
    allActiveClass.forEach(btn => {
        btn.classList.remove("active")
    })
}

const displayLevel = (lessons) => {
    // get parent div
    const levelContainer = document.getElementById("lesson-container");
    levelContainer.innerHTML = "";

    // get lesson item 
    for (lesson of lessons) {
        // create child / lesson filed
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary active-btn"><i class="fa-solid fa-book-open"></i> lesson -${lesson.level_no}</button>
        `
        // append child
        levelContainer.append(btnDiv);
    }
}

const displayWord = (words) => {
    const WordContainer = document.getElementById("word-container");
    WordContainer.innerHTML = "";

    if(words.length == 0){
        WordContainer.innerHTML =`
            <div class="col-span-full text-center py-20 font-bangla space-y-5">
                <img class="mx-auto" src="./assets/alert-error.png"/>
                <p class="text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-4xl text-[#29252480] font-semibold">নেক্সট Lesson এ যান</h2>
            </div>
        `;
        loading(false)
        return;
    }

    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white text-center pt-14 pb-10 px-3 rounded-xl ">
                <h2 class="text-3xl font-bold mb-3">${word.word ? word.word : "শব্দ পাওয়া যাচ্ছে না" }</h2>
                <p class="text-xl font-medium mb-6">Meaning /Pronounciation</p>
                <h2 class="font-bangla text-3xl font-semibold text-[#58585c] mb-3">"${word.meaning ? word.meaning : "অর্থ পাওয়া যাচ্ছে না"} / ${word.pronunciation ? word.pronunciation: "pronunciation পাওয়া যাচ্ছে না"}"</h2>

                <div class="flex justify-between items-center">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `

        WordContainer.append(card)
    })
    loading(false)
}

const displayWordDetails = (details) =>{
    const wordDetailsContainer = document.getElementById("word-details-container");

    wordDetailsContainer.innerHTML = `
                <div>
                    <h2 class="text-3xl font-bold">${details.word} ( <i class="fa-solid fa-microphone-lines"></i> :${details.pronunciation})</h2>
                </div>
                <div>
                    <h2 class="text-2xl font-semibold mb-1">Meaning</h2>
                    <p class="font-bangla text-xl font-medium">${details.meaning ? details.meaning :"পাওয়া যায়নি"}</p>
                </div>
                <div>
                    <h2 class="text-2xl font-semibold mb-1">Example</h2>
                    <p class="text-xl font-medium">${details.sentence}</p>
                </div>
                <div>
                    <h2 class="text-2xl font-semibold mb-1 font-bangla">সমার্থক শব্দ গুলো</h2>
                    <div class = "">${createElement(details.synonyms)}</div>
                </div>
                

    `;

    document.getElementById("modal_container").showModal();
}

loadLevel();

document.getElementById("input-btn").addEventListener("click",() => {
    removeActive();
    const inputWord = document.getElementById("input-search");
    const searchWord = inputWord.value.trim().toLowerCase() ;
    
    // all word from API
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(response => response.json())
    .then(data => {
        const allWordList = data.data;
        const filterWord = allWordList.filter((word) => word.word.toLowerCase().includes(searchWord));
        displayWord(filterWord)
    })
    inputWord.value = "";
})
