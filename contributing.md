# Contributing
Contributions to Windows CMD Extensions are welcome! If you would like to add a custom command to the application, follow these steps:

Fork the Windows CMD Extensions repository to your GitHub account.

Clone the forked repository to your local machine:

```bash
git clone https://github.com/your-username/Windows-cmd-extensions.git
Navigate to the bats folder inside the windows-cmd-extensions folder.
```

Create a new .bat file with your custom command logic. For example, if your command is "mycommand", create a file named mycommand.bat.


Save your custom .bat file in the bats folder.

Now, navigate to the data folder inside the windows-cmd-extensions folder.

Open the commands.json file.

Add an entry for your custom command in the following format:

```json
{
    "name": "mycommand",
    "description": "Description of your custom command",
    "author":"bashamega",
    "batfile": "mycommand.bat",
    "bashfile": "mycommand.sh",
    "command": [{
      "title": "command title",
      "code": "command1"
    },{
      "title": "command title",
      "code": "command2"
    }]
}
```
Replace "mycommand" with the name of your command (without the .bat extension), and provide a brief description of what the command does.
And provide the bash file name if you have a basha file for your extension, if not then just delete it.
Also provide in the command section the list of commands You use, and replace the author with you github username.

Save the commands.json file.

Commit your changes with a descriptive commit message:

```bash
git add bats/mycommand.bat data/commands.json
git commit -m "Add custom command: mycommand"
```
Push your changes to your forked repository:

```bash
git push origin main
```
Open a pull request from your forked repository to the original Windows CMD Extensions repository. Describe your changes and why you think your custom command would be a valuable addition to the project.

Once your pull request is reviewed and approved, your custom command will be added to the Windows CMD Extensions application, and users will be able to benefit from your contribution.

If you have any questions or need assistance with the contributing process, don't hesitate to reach out by creating an issue on this repository.

We appreciate your contributions to make Windows CMD Extensions even more powerful and versatile! Thank you for your support!
