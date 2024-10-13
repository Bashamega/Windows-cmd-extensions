def display_extensions():
    global checkbox_vars
    canvas_extensions = Canvas(extensions_tab)
    canvas_extensions.pack(side=LEFT, fill=BOTH, expand=True)

    save_button = Button(extensions_tab, text="Save", command=save_selected_items)
    save_button.pack(side=BOTTOM, fill='x', pady=5)  # Full width, padding on y-axis

    open_system_button = Button(extensions_tab, text="Open system", command=opensys)
    open_system_button.pack(side=BOTTOM, fill='x', pady=5)  # Full width, padding on y-axis

    scrollbar_extensions = Scrollbar(extensions_tab, command=canvas_extensions.yview)
    scrollbar_extensions.pack(side=RIGHT, fill='y')

    canvas_extensions.configure(yscrollcommand=scrollbar_extensions.set)

    # Frame to hold checkboxes and descriptions
    frame_extensions = Frame(canvas_extensions)
    canvas_extensions.create_window((0, 0), window=frame_extensions, anchor='nw')

    # Iterate over 'data' items safely
    for item in data:
        # **Fix:** Use `.get()` to avoid KeyError if 'title' or 'description' is missing
        title = item.get("title", "No Title")  
        description = item.get("description", "No Description Available")

        # Create variable to store checkbox state
        var = IntVar()
        checkbox_vars.append(var)

        # Create checkbox and label
        chk = Checkbutton(frame_extensions, text=title, variable=var, wraplength=400, anchor=W, justify=LEFT)
        lbl = Label(frame_extensions, text=description, wraplength=400, anchor=W, justify=LEFT)

        # Pack checkbox and label
        chk.pack(fill='both', expand=True)
        lbl.pack(fill='both', expand=True)

    # Update scroll region to fit content
    frame_extensions.update_idletasks()
    canvas_extensions.config(scrollregion=canvas_extensions.bbox("all"))

# Fetch bat files data
res = requests.get('https://bashamega.github.io/Windows-cmd-extensions/windows-cmd-extensions/data/commands.json')
data = json.loads(res.text)


