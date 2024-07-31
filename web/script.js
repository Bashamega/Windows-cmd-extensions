const url = new URL(window.location.href); // Use a new URL object to work with URL components
const hasParams = url.search.length > 0; // Simplified condition to check for query parameters
const searchInput = document.getElementById("searchInput");
if (hasParams) {
    const params = new URLSearchParams(url.search);
    const name = decodeURI(params.get("name"))
    const bugs = [];
    searchInput.parentNode.removeChild(searchInput);
    fetch(`https://api.github.com/search/issues?q=repo:bashamega/windows-cmd-extensions%20%22[${name}]%22%20in:title%20is:issue`)

    .then(res=>res.json())
    .then(data=>{
        const item = data.items
        item.forEach(bug => {
            bugs.push(bug)
        });
        fetch("https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/data/commands.json")
        .then(res => res.json())
        .then(data => {
            const command = data.find(command => command.title === name);

            if (command) {
                const container = document.createElement("div");
                container.classList.add("middle");
                container.id = "details"; // Use '=' instead of '()' for setting id
                container.innerHTML = `
                    <h1 id="titledet">${name}</h1>
                    <p>${command.author}</p><br>
                    <p>${command.description}</p>

                    <br><br>
                    <a href="https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/bats/${command.batfile}" target="_blank">
                        <button>Download batch file</button>
                    </a>
                    <br><br>
                    ${command.bashfile ? `<a href="https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/bash/${command.bashfile}" target="_blank"><button>Download bash file</button></a>` : ''}
                    
                    <h2>Commands</h2>
                    ${command.command.map(c => `
                        <br><br>
                        <h3>${c.title}</h3>
                        <br>
                        <code>${c.code}</code>
                    `).join('')}
                    <br><br>
                    <h2>Issues</h2>
                    <div id="bugs">
                    ${bugs.map(bug=>`
                    <div  class="bug">
                    <a href="${bug.html_url}">
                    <h1>${bug.title}</h1>
                    <div><p>${bug.user.login}</p><img src="${bug.user.avatar_url}"></div>
                    </a>
                    </div>
                    `).join('')}
                    </div>
                    <br/>
                    <a href="https://github.com/Bashamega/Windows-cmd-extensions/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5B${name}%5D"><button>Report issue</button></a>
                `;

                document.body.append(container);
            } else {
                window.location.href = "https://bashamega.github.io/Windows-cmd-extensions/web/";
            }
        });
    })

    

} else {
    fetch("https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/data/commands.json")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("container");

        function renderCommands(commands) {
            container.innerHTML = "";
            commands.forEach(command => {
                const atag = document.createElement("a");
                const title = command.title;
                atag.classList.add("command-card");
                atag.href = "?name=" + encodeURIComponent(command.title); // Encode the parameter value
                atag.innerHTML = `<h1>${title}</h1>
                <br><p>${command.description}</p>
                <a href="https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/bats/${command.batfile}" target="_blank">
                <button>Download batch file</button></a><br><br>${command.bashfile ? `<a href="https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/bash/${command.bashfile}" target="_blank"><button>Download bash file</button></a>` : ''}`;
                container.appendChild(atag);
            });
        }

        renderCommands(data);

        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredCommands = data.filter(command => command.title.toLowerCase().includes(searchTerm));
            renderCommands(filteredCommands);
        });

        // Sort the items alphabetically by title
        data.sort((a, b) => a.title.localeCompare(b.title));
    });
}
