# William Elias — Personal Portfolio

Personal portfolio website for William Elias, Systems Engineering student at UIUC.  
Live at: **[willelias7.github.io](https://willelias7.github.io)**

---

## Run locally

No build step required — it's plain HTML, CSS, and JS.

```bash
# Option 1: Python (most machines have this)
python -m http.server 8080
# then open http://localhost:8080

# Option 2: Node (if you have npx)
npx serve .
# then open the URL it prints

# Option 3: VS Code
# Install the "Live Server" extension, right-click index.html → Open with Live Server
```

---

## Adding a new project

Open **`projects.js`** and add a new object to the `projects` array:

```js
{
  title: "My New Project",
  description: "One to three sentences describing what you built and why it matters.",
  tags: ["Python", "CAD", "Electronics"],   // tech stack pills
  github: "https://github.com/willelias7/your-repo",  // or "" if none
  demo: "https://your-live-demo.com",                 // or "" if none
  date: "Jan 2026 – Mar 2026",
}
```

That's it. The card renders automatically — no HTML edits needed.

---

## Dropping in your headshot

Replace the placeholder with your photo:

```
assets/headshot.png
```

The image is displayed as a circle (300 × 300 px display size).  
Any square or portrait crop works — it's centered on the top by default.

---

## File structure

```
willelias7.github.io/
├── index.html      ← markup & section structure
├── style.css       ← all styling (design tokens at the top)
├── script.js       ← fade-in observer, nav, project card renderer
├── projects.js     ← ← ← edit this to add/update projects
├── assets/
│   └── headshot.png
└── README.md
```

---

## Deploy to GitHub Pages

1. **Create the repo** (name must match exactly):
   ```bash
   gh repo create willelias7/willelias7.github.io --public
   ```

2. **Push the code**:
   ```bash
   cd ~/willelias7.github.io
   git init
   git add .
   git commit -m "Initial portfolio launch"
   git branch -M main
   git remote add origin https://github.com/willelias7/willelias7.github.io.git
   git push -u origin main
   ```

3. **GitHub Pages is automatic** for `<username>.github.io` repos.  
   Your site will be live at `https://willelias7.github.io` within ~2 minutes.

---

© 2026 William Elias
