const url = window.location.href;
const hasParams = /\?.+=.+/.test(url);
const searchInput = document.getElementById("searchInput");

if (hasParams) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const name = params.get("name");
    const bugs = []
    searchInput.parentNode.removeChild(searchInput)
    

    fetch("https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/data/commands.json")
    .then(res=>res.json())
    .then(data=>{

    
       data.forEach(command => {
        console.log(command)

        if(command.title == name){
            const nametitle = decodeURI(name)
            const container = document.createElement("div")
            container.classList.add("middle")
            container.id("deatails")
            container.innerHTML = `
            <h1 id="titledet"> ${name}</h1>
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
                

                `;
            document.body.append(container)
    
        }
       });
    })
    if(!document.getElementById("titledet")){window.location.href = "https://bashamega.github.io/Windows-cmd-extensions/web/?"}

}else{
    fetch("https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/data/commands.json")
    .then(res=>res.json())
    .then(data=>{
        const container = document.getElementById("container");

        function renderCommands(commands) {
            container.innerHTML = "";
            commands.forEach(command => {
                const atag = document.createElement("a");
                const title = command.title
                atag.classList.add("command-card");
                atag.href = "?name=" + command.title
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
    })
}
