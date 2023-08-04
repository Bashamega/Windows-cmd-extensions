const url = new URL(window.location.href); // Use a new URL object to work with URL components
const hasParams = url.search.length > 0; // Simplified condition to check for query parameters
const searchInput = document.getElementById("searchInput");

if (hasParams) {
    const params = new URLSearchParams(url.search);
    const name = params.get("name");
    const bugs = [];
    searchInput.parentNode.removeChild(searchInput);

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
            `;

            document.body.append(container);
        } else {
            window.location.href = "https://bashamega.github.io/Windows-cmd-extensions/web/";
        }
    });

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
