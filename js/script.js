//Where profile information will appear
const overview = document.querySelector(".overview");
//Github username
const username = "alana-nanz";
//Unordered list to display the repos list
const repoList = document.querySelector(".repo-list");

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
    displayRepoInfo(repoData);
};

const displayRepoInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3`;
        repoList.append(repoItem);
    }
};