const loadLevel = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(response => response.json())
    .then(data => displayLevel(data.data))
}

const displayLevel =(lessons) =>{
    // get parent div
    const levelContainer = document.getElementById("lesson-container");
    levelContainer.innerHTML ="";
    
    // get lesson item 
    for(lesson of lessons ){
        // create child / lesson filed
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> lesson -${lesson.level_no}</button>
        `
        // append child
        levelContainer.append(btnDiv);
    }
}

loadLevel();