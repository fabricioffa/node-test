// const id = new Promise((res, rej) => {
//     // Access database
//     setTimeout(() => {
//         rej(new Error('Deu ruim'));
//     }, 2000);
// });

// id.then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log('Message:', err.message);
// });

function getUser(id) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('Reading a user from the database...');
            res({ id, gitHubUserName: 'ffa'});
        }, 2000);
    })
}

function getRepositories(userName) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('Calling Github API for repos...');
            res(['repo1','repo2', 'repo3'])
        }, 2000);
    })
}

function getCommits(repo) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('Calling Github API for commits...');
            res(['commit'])
        }, 2000);
    })
}

// getUser(1)
//     .then(user => getRepositories(user.gitHubUserName))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log(commits))
//     .catch(err => console.log(err));

async function displayCommits() {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUserName);
    const commits = await getCommits(repos[0]);
    return console.log(commits);
}

displayCommits();

