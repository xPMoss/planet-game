import os

# Konfiguration
project_dir = "."  # Punkt betyder nuvarande mapp
output_file = "planet-game.txt"

# Mappar som ska ignoreras helt
ignored_dirs = {'.git', 'node_modules', '__pycache__', 'venv', 'dist', 'build', '.next', '.idea', '.vscode', 'docs', 'temp', 'old'}

# Konfigurationsfiler som alltid ska prioriteras och tas med (även om de har udda ändelser)
config_files = {
    'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts', 
    'tailwind.config.js', 'postcss.config.js',
    'README.md'
}

# Tillåtna filändelser för kodfiler
allowed_extensions = {
    '.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss', 
    '.json', '.yaml', '.yml', '.env.example', '.md'
}

def generate_tree(dir_path, prefix=""):
    """Genererar en visuell trädkarta av projektet."""
    tree_str = ""
    try:
        entries = sorted(os.listdir(dir_path))
        # Filtrera bort ignorerade mappar
        entries = [e for e in entries if e not in ignored_dirs and not e.startswith('.')]
        
        for i, entry in enumerate(entries):
            path = os.path.join(dir_path, entry)
            is_last = (i == len(entries) - 1)
            connector = "└── " if is_last else "├── "
            
            tree_str += f"{prefix}{connector}{entry}\n"
            
            if os.path.isdir(path):
                indent = "    " if is_last else "│   "
                tree_str += generate_tree(path, prefix + indent)
    except Exception:
        pass
    return tree_str

# Starta insamlingen
with open(output_file, 'w', encoding='utf-8') as outfile:
    # 1. Skriv ut den visuella projektstrukturen först
    outfile.write(f"{'='*50}\n")
    outfile.write("📂 PROJEKTSTRUKTUR (TRÄDKARTA)\n")
    outfile.write(f"{'='*50}\n\n")
    outfile.write(f"{os.path.basename(os.path.abspath(project_dir))}/\n")
    outfile.write(generate_tree(project_dir))
    outfile.write("\n" + "="*50 + "\n\n")

    # Listor för att hålla koll på filer vi hittar
    configs_to_read = []
    source_files_to_read = []

    # Gå igenom alla filer i projektet
    for root, dirs, files in os.walk(project_dir):
        dirs[:] = [d for d in dirs if d not in ignored_dirs and not d.startswith('.')]
        
        for file in files:
            if file == output_file or file.startswith('.'):
                continue
                
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, project_dir)
            _, ext = os.path.splitext(file.lower())

            # Sortera i konfiguration vs vanlig källkod
            if file.lower() in config_files:
                configs_to_read.append((file_path, rel_path, "KONFIGURATION / PAKETHANTERING"))
            elif ext in allowed_extensions:
                source_files_to_read.append((file_path, rel_path, "KÄLLKOD"))

    # 2. Skriv först ut alla konfigurationsfiler (Viktigt för Gemini!)
    # 3. Skriv sedan ut alla vanliga kodfiler
    all_files = configs_to_read + source_files_to_read

    for file_path, rel_path, file_type in all_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as infile:
                outfile.write(f"\n\n{'='*50}\n")
                outfile.write(f"📂 TYP: {file_type}\n")
                outfile.write(f"📄 FIL: {rel_path}\n")
                outfile.write(f"{'='*50}\n\n")
                outfile.write(infile.read())
        except Exception:
            # Hoppa över filer som inte går att läsa som text (t.ex. bilder/binärer)
            continue

print(f"Klart! Trädkarta, konfigurationer och källkod har sparats i: {output_file}")
