import json
import re

with open("c:/Users/anand/Downloads/PORTFLIO/studio-site/src/sections/Work.jsx", "r", encoding="utf-8") as f:
    code = f.read()

new_projects = [
  { "id": 101, "title": "SIRA", "category": "Branding", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392152/sira-02.jpg_vb4wpu.jpg", "year": "2026", "description": "Brand identity design.", "tags": ["Branding", "Identity"] },
  { "id": 102, "title": "VIOLET DREAMS", "category": "Branding", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392152/Violet-Dreams_plvgzf.jpg", "year": "2026", "description": "Brand identity design.", "tags": ["Branding", "Identity"] },
  { "id": 103, "title": "BRANDING 3", "category": "Branding", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392152/3_o5cu2h.jpg", "year": "2026", "description": "Brand identity design.", "tags": ["Branding", "Identity"] },
  { "id": 104, "title": "BERRY ROYALE", "category": "Branding", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392152/Berry-Royale_xo1bq9.jpg", "year": "2026", "description": "Brand identity design.", "tags": ["Branding", "Identity"] },
  { "id": 105, "title": "BERRY ROYALE 2", "category": "Branding", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392151/Berry-Royale-1_z4vyuw.jpg", "year": "2026", "description": "Brand identity design.", "tags": ["Branding", "Identity"] },
  { "id": 106, "title": "IDUKKI GOLD SPICES", "category": "Branding", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392151/idukki-gold-spices-logo_epne7e.jpg", "year": "2026", "description": "Brand identity design.", "tags": ["Branding", "Identity"] },
  { "id": 107, "title": "DESIGN 1", "category": "Designs", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392183/ai-9.1_i9b4yo.jpg", "year": "2026", "description": "Creative design project.", "tags": ["Design", "Art"] },
  { "id": 108, "title": "CAKE POST", "category": "Designs", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392180/cake_post_1_om2t4z.jpg", "year": "2026", "description": "Creative design project.", "tags": ["Design", "Art"] },
  { "id": 109, "title": "POST 33", "category": "Designs", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392178/post-33_vdzooh.jpg", "year": "2026", "description": "Creative design project.", "tags": ["Design", "Art"] },
  { "id": 110, "title": "POST 1", "category": "Designs", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392175/post_1_qhybgw.jpg", "year": "2026", "description": "Creative design project.", "tags": ["Design", "Art"] },
  { "id": 111, "title": "POST 1.2", "category": "Designs", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392174/post_1.2_griq2k.jpg", "year": "2026", "description": "Creative design project.", "tags": ["Design", "Art"] },
  { "id": 112, "title": "009", "category": "Product Photography", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392170/009_jk7tmz.jpg", "year": "2026", "description": "High-end product photography.", "tags": ["Photography"] },
  { "id": 113, "title": "FRENCH OUD", "category": "Product Photography", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392169/french_oud_1_vrgtgo.jpg", "year": "2026", "description": "High-end product photography.", "tags": ["Photography"] },
  { "id": 114, "title": "OUD DAHAB", "category": "Product Photography", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392169/oud_dahab_2_zxlihw.jpg", "year": "2026", "description": "High-end product photography.", "tags": ["Photography"] },
  { "id": 115, "title": "ROYAL", "category": "Product Photography", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392169/ROYAL_ssnggq.jpg", "year": "2026", "description": "High-end product photography.", "tags": ["Photography"] },
  { "id": 116, "title": "RANIYA", "category": "Product Photography", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392168/raniya_2_v7gtih.jpg", "year": "2026", "description": "High-end product photography.", "tags": ["Photography"] },
  { "id": 117, "title": "PERFORMANCE 1", "category": "Performance Marketing", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782394169/performance_marketing_fiq9dy.png", "year": "2026", "description": "Performance marketing campaign.", "tags": ["Marketing"] },
  { "id": 118, "title": "PERFORMANCE 2", "category": "Performance Marketing", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782394169/performance_marketing2_lomagc.png", "year": "2026", "description": "Performance marketing campaign.", "tags": ["Marketing"] },
  { "id": 119, "title": "PERFORMANCE 3", "category": "Performance Marketing", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782394168/performance_marketing3_nevcuk.png", "year": "2026", "description": "Performance marketing campaign.", "tags": ["Marketing"] }
]

new_projects_str = ",\n".join("  " + json.dumps(p) for p in new_projects) + "\n]"

# Inject into projects array
code = re.sub(r'}\n\]', '},\n' + new_projects_str, code, count=1)

new_clusters_str = """export const clusters = [
  { id: 'designs', title: 'Designs', projects: projects.filter(p => ['Designs', 'Posters & Editorial'].includes(p.category)) },
  { id: 'product-photography', title: 'Product Photography', projects: projects.filter(p => ['Product Photography', 'Interior Photography'].includes(p.category)) },
  { id: 'smm', title: 'Social Media Management', projects: projects.filter(p => ['Social Media Management', 'Social Media Marketing'].includes(p.category)) },
  { id: 'website', title: 'Website', projects: projects.filter(p => ['Website', 'Web Development', 'E-commerce'].includes(p.category)) },
  { id: 'branding', title: 'Branding', projects: projects.filter(p => ['Branding', 'Brand Identity', 'Print'].includes(p.category)) },
  { id: 'performance-marketing', title: 'Performance Marketing', projects: projects.filter(p => ['Performance Marketing', 'Commercial Ads', 'Commercial Ad'].includes(p.category)) }
]
"""

# Replace clusters definition
code = re.sub(r'export const clusters = \[\s*\{[\s\S]*?\]', new_clusters_str, code, count=1)

with open("c:/Users/anand/Downloads/PORTFLIO/studio-site/src/sections/Work.jsx", "w", encoding="utf-8") as f:
    f.write(code)

print("Work.jsx updated.")
