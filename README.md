# WARBENCH Website

Official website for the WARBENCH research paper.

## Quick Start

### Local Development
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Deploy to GitHub Pages

1. Create a new repository on GitHub named `warbench-website`
2. Push all files to the repository
3. Go to Settings > Pages
4. Select source: `Deploy from a branch`
5. Select branch: `main` and folder: `/ (root)`
6. Click Save

Your site will be available at: `https://<your-username>.github.io/warbench-website/`

## Custom Domain (Optional)

1. Add a `CNAME` file with your domain name:
```
warbench.ai
```

2. Update your DNS records accordingly

## File Structure

```
warbench-website/
├── index.html          # Main HTML page
├── css/
│   └── style.css       # Military-themed styles
├── js/
│   └── main.js         # Interactive animations
└── README.md           # This file
```

## Features

- Military-style tactical design
- Radar scan animation
- Responsive layout
- 5 Key Findings from research
- Performance matrix table
- Paper abstract and download

## License

MIT

---

**WARBENCH Research Group** | 2026
