from tkinter import *
from tkinter import ttk, messagebox
import requests
import json
import webbrowser
import os
import ctypes
from PIL import Image, ImageTk
from io import BytesIO
checkbox_vars = []
def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False
def check_admin_mode_and_close():
    if not is_admin():
        # Display an error message
        messagebox.showerror("Error", "You need to run the app as an administrator.")
        # Close the app
        root.destroy()
def save_selected_items():
    global checkbox_vars
    if all(var.get() == 0 for var in checkbox_vars):
        messagebox.showwarning("No Selection", "Please select at least one item.")
        return

    selected_items = [data[i] for i, var in enumerate(checkbox_vars) if var.get() == 1]

    # Display a warning dialog
    warning_message = "WARNING: Modifying system files can affect your computer and may cause serious issues. Are you sure you want to continue?"
    proceed = messagebox.askyesno("Warning", warning_message)

    if not proceed:
        return

    for item in selected_items:
        res = requests.get('https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/bats/' + item["batfile"])
        try:
            file_path = os.path.join(os.environ["SystemRoot"], "System32", item["batfile"])

            # Check if the file exists and prompt the user for replacement
            if os.path.exists(file_path):
                replace = messagebox.askyesno("File Exists", f"File {item['batfile']} already exists in system32 directory. Replace it?")
                if not replace:
                    continue

            # Write the data to the file
            with open(file_path, "wb") as file:
                file.write(res.content)
            messagebox.showinfo('Windows cmd extensions', 'File has been successfully added')
        except Exception as e:
            print(e)
            download_manually = messagebox.askyesno("Windows cmd commands", "An error has occurred. Do you want to download it manually?")

            if download_manually:
                webbrowser.open('https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/bats/' + item["batfile"])
    

    print("Selected Items:", [item["title"] for item in selected_items])
def opensys():
    os.startfile(os.path.join(os.environ["SystemRoot"], "System32"))
def display_extensions():
    global checkbox_vars
    canvas_extensions = Canvas(extensions_tab)
    canvas_extensions.pack(side=LEFT, fill=BOTH, expand=True)
    save_button = Button(extensions_tab, text="Save", command=save_selected_items)
    save_button.pack(side=BOTTOM, fill='x', pady=5)  # Full width, padding on y axis
    save_button = Button(extensions_tab, text="Open system", command=opensys)
    save_button.pack(side=BOTTOM, fill='x', pady=5)  # Full width, padding on y axis


    scrollbar_extensions = Scrollbar(extensions_tab, command=canvas_extensions.yview)
    scrollbar_extensions.pack(side=RIGHT, fill='y')

    canvas_extensions.configure(yscrollcommand=scrollbar_extensions.set)

    # Create a frame for the checkboxes and description labels in "Extensions" tab
    frame_extensions = Frame(canvas_extensions)

    canvas_extensions.create_window((0, 0), window=frame_extensions, anchor='nw')

    

    for item in data:
        title = item["title"]
        description = item["description"]

        # Create a variable to store checkbox state
        var = IntVar()
        checkbox_vars.append(var)

        # Create the checkbox and label
        chk = Checkbutton(frame_extensions, text=title, variable=var, wraplength=400, anchor=W, justify=LEFT)
        lbl = Label(frame_extensions, text=description, wraplength=400, anchor=W, justify=LEFT)

        # Pack checkbox and label
        chk.pack(fill='both', expand=True)
        lbl.pack(fill='both', expand=True)

    # Update scroll region
    frame_extensions.update_idletasks()
    canvas_extensions.config(scrollregion=canvas_extensions.bbox("all"))

    # Bind the function to checkbox changes



def display_bat_files():
    canvas_bat_files = Canvas(view_bat_files_tab)
    canvas_bat_files.pack(side=LEFT, fill=BOTH, expand=True)

    scrollbar_bat_files = Scrollbar(view_bat_files_tab, command=canvas_bat_files.yview)
    scrollbar_bat_files.pack(side=RIGHT, fill='y')

    canvas_bat_files.configure(yscrollcommand=scrollbar_bat_files.set)

    # Create a frame for the bat files in "View Bat Files" tab
    frame_bat_files = Frame(canvas_bat_files)

    canvas_bat_files.create_window((0, 0), window=frame_bat_files, anchor='nw')

    # Get bat files from the system32 directory
    bats = []
    files = os.listdir(os.path.join(os.environ["SystemRoot"], "System32"))
    for item in files:
        if item.endswith(".bat"):
            bats.append(item)

    for item in bats:
        lbl = Label(frame_bat_files, text=item, wraplength=400, anchor=W, justify=LEFT)
        lbl.pack(fill='both', expand=True)

    # Update scroll region
    frame_bat_files.update_idletasks()
    canvas_bat_files.config(scrollregion=canvas_bat_files.bbox("all"))









    


  




# Fetch bat files data
res = requests.get('https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/data/commands.json')
data = json.loads(res.text)

root = Tk()
root.title("Windows cmd commands")

# Get screen width and height
screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()

# Calculate the center position
x = (screen_width - 500) // 2
y = (screen_height - 400) // 2

# Set the window size and position
root.geometry(f"500x400+{x}+{y}")

# Create a Notebook (tabbed container)
notebook = ttk.Notebook(root)
notebook.pack(fill='both', expand=True)

# Create the "Extensions" tab
extensions_tab = Frame(notebook)
notebook.add(extensions_tab, text="Extensions")

# Display the list of bat files in "View Bat Files" tab
view_bat_files_tab = Frame(notebook)
notebook.add(view_bat_files_tab, text="View Bat Files")
display_bat_files()

# Display the extensions tab
display_extensions()
def set_window_icon_from_url(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            image = Image.open(BytesIO(response.content))
            icon = ImageTk.PhotoImage(image)
            root.iconphoto(True, icon)
    except Exception as e:
        print("Error while setting window icon:", e)
set_window_icon_from_url("https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/db/img/icon.png")
check_admin_mode_and_close()


root.mainloop()
