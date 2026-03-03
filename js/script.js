const loadLevel = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(response => response.json())
        .then(data => displayLevel(data.data))
}

const loadWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayWord(data.data))
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
            <button onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> lesson -${lesson.level_no}</button>
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
        return;
    }

    words.forEach(word => {
        console.log(word)
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white text-center pt-14 pb-10 px-3 rounded-xl ">
                <h2 class="text-3xl font-bold mb-3">${word.word ? word.word : "শব্দ পাওয়া যাচ্ছে না" }</h2>
                <p class="text-xl font-medium mb-6">Meaning /Pronounciation</p>
                <h2 class="font-bangla text-3xl font-semibold text-[#58585c] mb-3">"${word.meaning ? word.meaning : "অর্থ পাওয়া যাচ্ছে না"} / ${word.pronunciation ? word.pronunciation: "pronunciation পাওয়া যাচ্ছে না"}"</h2>

                <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `

        WordContainer.append(card)
    })
}

loadLevel();