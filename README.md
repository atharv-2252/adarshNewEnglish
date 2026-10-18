# Multi Purpose Engineering School, Gaudgaon

College website with student registration form.

## Structure
```
/
├── index.html          # Home page
├── about.html         # About
├── admissions.html    # Admissions
├── register.html      # Registration form
├── css/style.css      # Styling
├── js/main.js         # JavaScript
└── README.md
```

## Deploy to GitHub Pages

```bash
git clone https://github.com/atharv-2252/mp-engineering-school.git
cd mp-engineering-school
git add .
git commit -m "Add college website"
git push origin main
```

Then: Settings → Pages → Source: main / (root) → Save.

## Registration

Form posts to Formspree: `https://formspree.io/f/xzedowzv`

Configure in Formspree dashboard → add admin email for submissions.

## TODO (before launch)
- [x] Replace contact placeholders (+91-XXXXXXXXXX, info@mpeschool.org)
- [x] Add school logo SVG/PNG
- [x] Fill real About/Admissions content
- [x] Update Formspree admin email

## Deploy to Zoho Catalyst

Zoho Catalyst provides serverless hosting for static websites.

### Prerequisites
- Node.js 16+ (verify with `node --version`)
- npm (comes with Node.js)
- Zoho account

### Installation

**Method 1: Download CLI directly (recommended)**
```bash
# Download from Zoho Marketplace releases
# https://github.com/zoho/catalyst-cli/releases

# Or use curl (Windows PowerShell):
curl -L -o zc.exe https://github.com/zoho/catalyst-cli/releases/latest/download/zc-win-x64.exe
# Move to PATH:
-move zc.exe $env:USERPROFILE\AppData\Local\Programs\zoho-catalyst-cli\
```

**Method 2: Using npm (if available)**
```bash
npm install -g @zoho/catalyst-cli
```

### Setup and Deploy

```bash
cd /path/to/tmp-college-site

# Login to Zoho
zc login

# Initialize project (if not already done)
zc init

# Configure project name
echo '{"project_name": "mp-engineering-school"}' > .catalyst

# Deploy
npm run deploy
# or
./deploy-zoho.sh
```

### After Deployment

1. Go to [Zoho Catalyst Console](https://console.catalyst.zoho.com)
2. Select project: `mp-engineering-school`
3. Navigate to **Website** → **Site Settings**
4. Your site will be deployed automatically

### Environment Variables (optional)

Configure in `.catalyst` file:
```json
{
  "env_vars": {
    "FORM_ENDPOINT": "https://formspree.io/f/xzedowzv"
  }
}
```

### Domain Configuration

Add custom domain in Zoho:
1. Go to **Website** → **Custom Domain**
2. Add your domain (e.g., `www.mpeschool.org`)
3. Update DNS CNAME record to Zoho's provided value

## Project Files

```
/tmp-college-site/
├── index.html          # Home page with hero section
├── about.html          # About page with vision and history
├── admissions.html     # Admissions with class streams and fees
├── register.html       # Student registration form
├── css/
│   └── style.css       # Main stylesheet (brand colors)
├── js/
│   └── main.js         # Form validation and interactivity
├── assets/
│   └── logo-placeholder.svg
├── deploy-zoho.sh      # Zoho deployment script
├── .catalyst           # Zoho project config
├── package.json        # Project metadata
└── README.md
```

## Live Demo (GitHub Pages)

The site can also be deployed to GitHub Pages:

```bash
git clone https://github.com/atharvtg2252/mp-engineering-school.git
cd mp-engineering-school
git add .
git commit -m "Add college website"
git push origin main
```

Then in GitHub: Settings → Pages → Source: `main / (root)` → Save