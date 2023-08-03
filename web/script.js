fetch("https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/data/commands.json")
    .then(res=>res.json())
    .then(data=>{
        const container = document.getElementById("container");

        function renderCommands(commands) {
            container.innerHTML = "";
            commands.forEach(command => {
                const div = document.createElement("div");
                div.classList.add("command-card");
                div.innerHTML = `<h1>${command.title}</h1><br><p>${command.description}</p> <a href="https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/bats/${command.batfile}" target="_blank"><button>Download batch file</button></a><br><br>${command.bashfile ? `<a href="https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/bash/${command.bashfile}" target="_blank"><button>Download bash file</button></a>` : ''}`;
                container.appendChild(div);
            });
        }

        renderCommands(data);

        const searchInput = document.getElementById("searchInput");
        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredCommands = data.filter(command => command.title.toLowerCase().includes(searchTerm));
            renderCommands(filteredCommands);
        });

            // Sort the items alphabetically by title
        data.sort((a, b) => a.title.localeCompare(b.title));
    })