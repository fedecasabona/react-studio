# 📝 Content Editing Guide

## How to Edit Project Content

You can now edit project content using simple text files! This makes it much easier to update your portfolio content.

### 📁 File Structure

```
content/
└── projects/
    ├── fede-casabona.txt
    ├── ninjas.txt
    ├── collective.txt
    ├── travel-assistant.txt
    ├── ai-brain.txt
    ├── sportify.txt
    ├── marine-chartering.txt
    ├── 11fs.txt
    ├── bytes.txt
    ├── greed.txt
    ├── enter.txt
    ├── observer.txt
    ├── casa.txt
    └── magic-places.txt
```

### ✏️ How to Edit Content

#### Method 1: Direct Text File Editing (Recommended)

1. **Open any text file** in the `content/projects/` folder
2. **Edit the content** using Markdown formatting
3. **Save the file**
4. **Run the update script:**
   ```bash
   node updateProjectContent.js [project-id] content/projects/[filename].txt
   ```

#### Method 2: Edit JSON Directly

1. **Open** `data/projectContent.json`
2. **Find the project** you want to edit
3. **Edit the content** (use `\n` for line breaks)
4. **Save the file**

### 🎯 Example: Editing NINJAS Project

1. **Edit the file:** `content/projects/ninjas.txt`
2. **Make your changes** (add sections, update text, etc.)
3. **Run the command:**
   ```bash
   node updateProjectContent.js ninjas content/projects/ninjas.txt
   ```
4. **Refresh your browser** to see changes

### 📝 Markdown Formatting

You can use these Markdown features in your content:

- `# Heading 1` - Main title
- `## Heading 2` - Subtitle
- `**Bold text**` - Bold formatting
- `- Bullet point` - Bullet lists
- `Line breaks` - Create new paragraphs

### 🔄 Available Projects

- `fede-casabona` - FEDE CASABONA
- `ninjas` - NINJAS
- `collective` - COLLECTIVE
- `travel-assistant` - TRAVEL ASSISTANT
- `ai-brain` - AI—BRAIN
- `sportify` - SPORTIFY
- `marine-chartering` - Marine Chartering Platform
- `11fs` - 11:FS / Content Hub
- `bytes` - BYTES
- `greed` - Greed
- `enter` - Enter
- `observer` - Observer
- `casa` - Casa
- `magic-places` - Magic Places

### 🚀 Quick Start

1. **Choose a project** to edit
2. **Open the text file** in your favorite editor
3. **Make your changes**
4. **Run the update command**
5. **Refresh your browser**

### 💡 Tips

- **Use a good text editor** (VS Code, Sublime Text, etc.)
- **Preview your Markdown** before updating
- **Test changes locally** before deploying
- **Keep backups** of your content files
- **Use consistent formatting** across all projects

### 🆘 Troubleshooting

- **Content not updating?** Make sure you ran the update script
- **Formatting issues?** Check your Markdown syntax
- **Can't find a project?** Check the project ID spelling
- **Still having issues?** Check the browser console for errors

---

**Happy editing! 🎉**
