// Wait for the data to be fully loaded from contenttype.js
window.addEventListener('DOMContentLoaded', () => {
    // A small interval to ensure global data_story array is ready
    let checkData = setInterval(() => {
        if(typeof data_story !== 'undefined' && data_story.length > 0) {
            clearInterval(checkData);
            loadCreatorPage();
        }
    }, 50);
});

function loadCreatorPage() {
    // 1. Get the creator name from the URL (?creator=NAME)
    const urlParams = new URLSearchParams(window.location.search);
    const creatorParam = urlParams.get('creator');

    const displayHeader = document.getElementById('creator-name-display');
    const displayCount = document.getElementById('creator-count');
    const container = document.getElementById('content');

    // If no parameter is found, stop and warn the user
    if(!creatorParam) {
        displayHeader.innerText = "No Creator Specified";
        displayHeader.style.color = "gray";
        container.innerHTML = "Please provide a valid creator name in the URL (e.g., ?creator=Name).";
        return;
    }

    // Decode URL formatting (e.g., %20 becomes space)
    const creatorName = decodeURIComponent(creatorParam);
    displayHeader.innerText = creatorName;
    
    // 2. Performance Batching
    let fragment = document.createDocumentFragment();
    let titleCount = 0;

    // 3. Loop through all stories and find matches
    for(let i = 0; i < data_story.length; i++) {
        // If Newtoki matches the creator name, build a card
        if(String(data_story[i].Newtoki).trim().includes(creatorName.trim())) {
            titleCount++;
            
            let cardSpan = document.createElement('span');
            // Reusing your existing .card UI but keeping it perfectly clean
            cardSpan.innerHTML = `
                <div class="card" style="width: 150px; margin-bottom: 10px; text-align: left;">
                    <img class="imgcard" src="${data_story[i].Cover}" style="width: 150px; height: 200px; border-radius: 5px; object-fit: cover;" loading="lazy">
                    <div class="container" style="padding: 5px;">
                        <a href="/manhtia/content/${data_story[i].Name}" style="font-weight: bold; font-size: 15px; text-decoration: none;">${data_story[i].Name}</a><br>
                        <label class="meta" style="font-size: 11px;">Status: ${data_story[i].Status}</label>
                    </div>
                </div>
            `;
            fragment.appendChild(cardSpan);
        }
    }

    // 4. Render to screen
    if(titleCount === 0) {
        container.innerHTML = "<h3>No titles found.</h3>";
    } else {
        container.innerHTML = ""; // Clear loading state
        container.appendChild(fragment); // Inject batched cards
        displayCount.innerText = `(${titleCount} Works)`;
    }
}
