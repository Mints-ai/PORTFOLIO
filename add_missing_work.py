import json
import re

with open("c:/Users/anand/Downloads/PORTFLIO/studio-site/src/sections/Work.jsx", "r", encoding="utf-8") as f:
    code = f.read()

missing_projects = [
  {
    "id": 140,
    "title": "NUX",
    "category": "Branding",
    "image": "/images/projects/nux.webp",
    "year": "2026",
    "description": "Jewelry studio branding.",
    "tags": ["Branding", "Jewelry"]
  },
  {
    "id": 141,
    "title": "CLOTHS",
    "category": "Product Photography",
    "image": "/images/projects/cloths.webp",
    "year": "2026",
    "description": "Outerwear clothing product photography.",
    "tags": ["Photography", "Fashion"]
  },
  {
    "id": 142,
    "title": "OUD COLLECTION",
    "category": "Product Photography",
    "image": "/images/projects/oud2.webp",
    "year": "2026",
    "description": "Perfume bottles photography (Zahari, Phantom, Amber).",
    "tags": ["Photography", "Luxury"]
  },
  {
    "id": 143,
    "title": "LOGO AND MOCKUPS",
    "category": "Branding",
    "image": "/images/projects/logo.webp",
    "year": "2025",
    "description": "Mostrador branding and mockups.",
    "tags": ["Branding", "Mockups"]
  },
  {
    "id": 144,
    "title": "POSTERS",
    "category": "Designs",
    "image": "/images/projects/posters.webp",
    "year": "2025",
    "description": "Digital marketing posters.",
    "tags": ["Digital Marketing", "Posters"]
  }
]

missing_projects_str = ",\n".join("  " + json.dumps(p) for p in missing_projects)

# Find the end of the projects array
code = re.sub(r'}\n\]', '},\n' + missing_projects_str + '\n]', code, count=1)

with open("c:/Users/anand/Downloads/PORTFLIO/studio-site/src/sections/Work.jsx", "w", encoding="utf-8") as f:
    f.write(code)

print("Work.jsx updated with missing items.")
