document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('#github-form')
    const userInfoSection = document.createElement('div')
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const input = form.querySelector('#search').value;
        fetch(`https://api.github.com/search/users?q=${input}`)
            .then((resp)=>resp.json())
            .then(user => {
            const data = user.items
            data.forEach((element) => {
                const userInfo = document.createElement('div');
                const login = document.createElement('span');
                login.innerText = `Login: ${element.login}`;
                const avatar = document.createElement('span');
                avatar.innerText = `Avatar: ${element.avatar_url}`;
                const profile = document.createElement('span');
                profile.innerText = `Profile URL: ${element.html_url}`;

                userInfo.addEventListener('click',()=>{
                    fetch(`https://api.github.com/users/${element.login}/repos`)
                        .then((resp)=> resp.json())
                        .then((repos)=> {
                            const repoInfo = document.createElement('div')
                            repos.forEach((repo)=>{
                                const repoName = document.createElement('span');
                                repoName.innerText = `Repository: ${repo.name}`;
                                repoInfo.appendChild(repoName);
                                repoInfo.appendChild(document.createElement('br'));
                              });
                              userInfo.appendChild(repoInfo);
                        })
                })

                userInfo.appendChild(login);
                userInfo.appendChild(document.createElement('br'));
                userInfo.appendChild(avatar);
                userInfo.appendChild(document.createElement('br'));
                userInfo.appendChild(profile);
                userInfo.appendChild(document.createElement('br'));
                userInfo.appendChild(document.createElement('br'));
                document.body.appendChild(userInfo);
                form.reset()
            });
        })
    })
})