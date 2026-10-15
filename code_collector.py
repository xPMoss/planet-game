import os
import pathspec

# Konfiguration
project_dir = "."  
output_file = "planet-game-code.md"

# Mappar som ska ignoreras helt
ignored_dirs = {
    '.git', 'node_modules', '__pycache__', 'venv', 'dist', 
    'build', '.next', '.idea', '.vscode', 'docs', 'temp', 'old'
}

ignored_files = {'planet-game-code-old.md', 'planet-game-code.md', 'code-collect.py', 'package-lock.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'code-convert.md'}

config_files = {
    'package.json', 'tsconfig.json', 'vite.config.ts', 
    'tailwind.config.js', 'README.md'
}

allowed_extensions = {
    '.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss', 
    '.json', '.yaml', '.yml', '.env.example', '.md'
}

def load_gitignore(root_dir):
    gitignore_path = os.path.join(root_dir, '.gitignore')
    patterns = []
    if os.path.exists(gitignore_path):
        with open(gitignore_path, 'r', encoding='utf-8') as f:
            patterns = f.readlines()
    return pathspec.PathSpec.from_lines('gitwildmatch', patterns)

gitignore_spec = load_gitignore(project_dir)

def is_ignored(rel_path):
    """Kontrollerar om en fil eller mapp (eller dess föräldrar) är ignorerad."""
    if not rel_path or rel_path == ".":
        return False
        
    parts = os.path.normpath(rel_path).split(os.sep)
    
    # Om någon del av sökvägen matchar en ignorerad mapp -> ignorera direkt
    for part in parts:
        if part.lower() in ignored_dirs:
            return True
            
    filename = parts[-1]
    if filename.lower() in ignored_files:
        return True
        
    return gitignore_spec.match_file(rel_path)

def generate_tree(dir_path, prefix=""):
    tree_str = ""
    try:
        entries = sorted(os.listdir(dir_path))
        filtered_entries = []
        
        for e in entries:
            rel_path = os.path.relpath(os.path.join(dir_path, e), project_dir)
            if not is_ignored(rel_path) and not e.startswith('.'):
                filtered_entries.append(e)
        
        for i, entry in enumerate(filtered_entries):
            path = os.path.join(dir_path, entry)
            is_last = (i == len(filtered_entries) - 1)
            connector = "└── " if is_last else "├── "
            
            tree_str += prefix + connector + entry + "\n"
            
            if os.path.isdir(path):
                indent = "    " if is_last else "│   "
                tree_str += generate_tree(path, prefix + indent)
    except Exception:
        pass
    return tree_str

# Starta insamlingen (tömmer filen automatiskt med 'w')
with open(output_file, 'w', encoding='utf-8') as outfile:
    outfile.write("=" * 50 + "\n")
    outfile.write("PROJEKTSTRUKTUR (TRÄDKARTA)\n")
    outfile.write("=" * 50 + "\n\n")
    outfile.write(os.path.basename(os.path.abspath(project_dir)) + "/\n")
    outfile.write(generate_tree(project_dir))
    outfile.write("\n" + "=" * 50 + "\n\n")

    configs_to_read = []
    source_files_to_read = []

    for root, dirs, files in os.walk(project_dir):
        # Stoppa os.walk från att överhuvudtaget gå in i ignorerade mappar
        valid_dirs = []
        for d in dirs:
            rel_dir_path = os.path.relpath(os.path.join(root, d), project_dir)
            if not is_ignored(rel_dir_path) and not d.startswith('.'):
                valid_dirs.append(d)
        dirs[:] = valid_dirs
        
        for file in files:
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, project_dir)

            if file == output_file or file.startswith('.') or is_ignored(rel_path):
                continue

            _, ext = os.path.splitext(file.lower())

            if file.lower() in {c.lower() for c in config_files}:
                configs_to_read.append((file_path, rel_path, "KONFIGURATION / PAKETHANTERING"))
            elif ext in allowed_extensions:
                source_files_to_read.append((file_path, rel_path, "KÄLLKOD"))

    all_files = configs_to_read + source_files_to_read

    for file_path, rel_path, file_type in all_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as infile:
                outfile.write("\n\n" + "=" * 50 + "\n")
                outfile.write("TYP: " + file_type + "\n")
                outfile.write("FIL: " + rel_path + "\n")
                outfile.write("=" * 50 + "\n\n")
                outfile.write(infile.read())
        except Exception:
            continue

print("Klart! Trädkarta, konfigurationer och källkod har sparats i: " + output_file)