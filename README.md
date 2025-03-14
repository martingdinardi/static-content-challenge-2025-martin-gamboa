# Acme Co Marketing Documentation Site  
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) that renders Markdown files as HTML pages.  

## 🚀 Getting Started  
##### 1. Clone the Repository   
```bash  
git clone https://github.com/martingdinardi/static-content-challenge-2025-martin-gamboa
```
##### 2. Navigate to the Project Folder
```
cd project-folder-name 
```
##### 3. Start the Development Server
```bash  
npm run dev  
# or  
yarn dev  
# or  
pnpm dev  
# or  
bun dev  
```
#### 4. Open http://localhost:3000 in your browser to see the result.



# 📖 Documentation

## 01. How It Works
The system reads Markdown files from the `content` folder and generates HTML pages following the folder structure:  
- Each folder becomes a route  
- `index.md` files represent main content pages  
- Subfolders create nested navigation paths  

## 02. Content Structure

```content/
├─ category/
│  └─ subcategory/    # Nested content
│     └─ index.md     # Your Markdown!
```

## Rules:
- Only folders containing `.md` files appear in navigation  
- Use subfolders to organize related content  
- File names become URL slugs  

## 03. Routing & Navigation  
- Folders → Website routes (e.g.: `content/guides/` → `/guides`)  
- Automatic navbar generation from top-level folders  
- Breadcrumb navigation for subcategories  

## 04. Content Editing  
1. Create a new folder in `/content`  
2. Add `index.md` with:  
```markdown
---
title: Your Article Title
description: Article summary
recommended:
  - /related-article-path
# Markdown content here
---
```

3. Add subfolders for nested content  

## 🛠 Tools Recommendation  
Use [Markdown Live Preview](https://markdownlivepreview.com/) to:  
- Preview content in real-time  
- Validate Markdown syntax  
- Test formatting before deployment  

## 🌟 Features  
- **Dark Mode**: Toggle via UI button  
- **Recommended Articles**: Configure in YAML metadata  
- **Automatic Routing**: Instant updates when adding content  
- **Responsive Design**: Mobile-first approach  

## 🧪 Testing  
Run unit tests with:  
```bash
npm test
```

## 🏆 Best Practices
Keep folder names lowercase with dashes (how-to-guides)

Use descriptive frontmatter titles

Maintain consistent metadata structure

Organize related content in subfolders

---

#### For support contact: github.com/martingdinardi

# ¡Happy content creation! 🎉