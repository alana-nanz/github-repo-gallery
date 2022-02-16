//Where profile information will appear
const overview = document.querySelector(".overview");
//Github username
const username = "alana-nanz";
//Unordered list to display the repos list
const repoList = document.querySelector(".repo-list");
//Section where all repo info appears
const repoContainer = document.querySelector(".repos");
//Section where individual repo data appears
const repoData = document.querySelector(".repo-data");
//Back button to return to repo gallery
const backButton = document.querySelector(".view-repos");
//Input to search by name
const filterInput = document.querySelector(".filter-repos");

const gitUserInfo = async function () {
    const userInfo = await fetch (`http://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log(data);
    displayUserInfo(data);
};
gitUserInfo();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
    `;
    overview.append(div);
    displayUserRepos();
};

const displayUserRepos = async function () {
    const userRepos = await fetch (`http://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await userRepos.json();
    //console.log(repoData);
    displayRepos(repoData);
};

const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    //console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    //console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
    repoData.classList.remove("hide");
    repoContainer.classList.add("hide");
    backButton.classList.remove("hide");
};

backButton.addEventListener("click", function () {
    repoContainer.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchTextLower = searchText.toLowerCase();
    for (const repo of repos) {
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(searchTextLower)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});