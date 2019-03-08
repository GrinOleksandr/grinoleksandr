if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serviceWorker.js')
         .then(function(registration) {
            registration.addEventListener('updatefound', function() {
                // If updatefound is fired, it means that there's
                // a new service worker being installed.
                var installingWorker = registration.installing;
                console.log('A new service worker is being installed:',
                    installingWorker);

                // You can listen for changes to the installing service worker's
                // state via installingWorker.onstatechange
            });
        })
        .catch(function(error) {
            console.log('Service worker registration failed:', error);
        });
} else {
    console.log('Service workers are not supported.');
}









let myReposList = document.getElementById("myReposList");
myReposList.innerHTML = '<img src = "img/AjaxLoader.gif" class = "loader1" >';

fetch("https://api.github.com/users/GrinOleksandr/repos",{
    method: 'GET'
}).then(function(response){
    return response.json()})
    .then(function(json){
       setTimeout(function(){
            myReposList.innerHTML = "";
            [].forEach.call(json, repository => addRepositoryToList(repository));
        },1000);})
    .catch(error => console.log("Данные не получены: " + error ));

let aboutMeBlock = document.createElement("div");
aboutMeBlock.id = "about_me_block";

let loader3img = document.createElement("img");
loader3img.src = "img/AjaxLoader.gif";
loader3img.className = "loader3";

aboutMeBlock.appendChild(loader3img);
document.getElementById("content").appendChild(aboutMeBlock);

fetch("https://api.github.com/users/GrinOleksandr", {method:'GET'})
    .then(response => response.json())
    .then(function(jsonObject) {
        setTimeout(function () {
            let myAvatarImg = document.createElement("img");
            myAvatarImg.src = jsonObject.avatar_url;

            let createdAt = document.createElement("p");
            createdAt.innerText = "My github user was created on: " + createDateTimeStringFromGit(jsonObject.created_at);

            aboutMeBlock.getElementsByClassName("loader3")[0].remove();
            aboutMeBlock.appendChild(myAvatarImg);
            aboutMeBlock.appendChild(createdAt);
        }, 2000)})
    .catch(error => console.log("Данные не получены: " + error));

function addRepositoryToList(repo) {
    let myRepoListItem = document.createElement("li");
    myRepoListItem.className = "myRepoListItem";

    let myRepoItem = document.createElement("span");
    myRepoItem.innerText = repo.name;
    myRepoItem.dataset.isLastUpdatedInfoDisplayed = false;
    myRepoItem.addEventListener("click", showLastUpdated);

    myRepoListItem.appendChild(myRepoItem);
    myReposList.appendChild(myRepoListItem);

    function showLastUpdated(ev) {
        console.log("Last commit was: ", repo.updated_at);
        console.log("target: ", ev);
        let target = ev.target.parentElement;
        if (target.dataset.isLastUpdatedInfoDisplayed !== "true") {
            let loader2img = document.createElement("img");
            loader2img.src = "img/AjaxLoader.gif";
            loader2img.className = "loader2";

            let updatedAtSpan = document.createElement("span");
            updatedAtSpan.className = "last_commited_span";
            updatedAtSpan.appendChild(loader2img);

            target.appendChild(updatedAtSpan);

            let requestString = "https://api.github.com/repos/GrinOleksandr/" + repo.name + "/commits";
            fetch(requestString, {method: "GET"})
                .then(function (response) {
                    return response.json();
                })
                .then(function (jsonObj) {
                    setTimeout(function () {
                        updatedAtSpan.getElementsByClassName("loader2")[0].remove();
                        updatedAtSpan.innerText = "Last commited on: " + createDateTimeStringFromGit(jsonObj[0].commit.author.date);
                        updatedAtSpan.style.visibility = "visible";
                        updatedAtSpan.style.opacity = "1";

                        target.dataset.isLastUpdatedInfoDisplayed = true;
                    }, 2000);
                })
                .catch(error => console.log("Данные не получены: " + error))
        }

        else {
            target.getElementsByClassName("last_commited_span")[0].remove();
            target.dataset.isLastUpdatedInfoDisplayed = false;
        }
    }
}

function createDateTimeStringFromGit(rawString) {
    let firstSeparatorIndex = rawString.indexOf("T");
    let seccondSeparatorIndex = rawString.indexOf("Z");
    return rawString.slice(0, firstSeparatorIndex) + " at " + rawString.slice((firstSeparatorIndex + 1), seccondSeparatorIndex);
}

