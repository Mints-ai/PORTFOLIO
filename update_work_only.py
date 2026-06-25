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
  { "id": 119, "title": "PERFORMANCE 3", "category": "Performance Marketing", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782394168/performance_marketing3_nevcuk.png", "year": "2026", "description": "Performance marketing campaign.", "tags": ["Marketing"] },

  { "id": 120, "title": "FELLORA", "category": "Website", "image": "/images/projects/fellora.png", "websiteUrl": "https://fellora.ae/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"] },
  { "id": 121, "title": "GREENVEEL", "category": "Website", "image": "/images/projects/greenveel.png", "websiteUrl": "https://greenveel.com/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"] },
  { "id": 122, "title": "COMPASS QTR", "category": "Website", "image": "/images/projects/compassqtr.png", "websiteUrl": "https://compassqtr.com/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"] },
  { "id": 123, "title": "KERA CABS", "category": "Website", "image": "/images/projects/keracabs.png", "websiteUrl": "https://keracabs.com/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"] },
  { "id": 124, "title": "MARDOK", "category": "Website", "image": "/images/projects/mardok.png", "websiteUrl": "https://mardok.in/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"] },
  { "id": 125, "title": "SWIFT ENGLISH ACADEMY", "category": "Website", "image": "/images/projects/swiftenglish.png", "websiteUrl": "https://swiftenglishacademy.in/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"] },
  { "id": 126, "title": "INDIAN PRAVASI MOVEMENT", "category": "Website", "image": "/images/projects/indianpravasi.png", "websiteUrl": "https://www.indianpravasimovement.org", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"] },
  { "id": 127, "title": "GARDEN VILLE", "category": "Website", "image": "/images/projects/gardenville.png", "websiteUrl": "https://gardenville.ae/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"] },
  { "id": 128, "title": "ZODI", "category": "Website", "image": "/images/projects/zodi.png", "websiteUrl": "https://zodi.ae/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"] },
  { "id": 129, "title": "HDF BUSINESS", "category": "Website", "image": "/images/projects/hdfbusiness.png", "websiteUrl": "https://hdfbusiness.ae/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"] },
  { "id": 130, "title": "LEVOC", "category": "Website", "image": "/images/projects/levoc.png", "websiteUrl": "https://levoc.ae", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"] },
  { "id": 131, "title": "LAVESSIDE DESIGN", "category": "Website", "image": "/images/projects/lavesside.png", "websiteUrl": "https://lavessidesign.com/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"] },

  { "id": 132, "title": "TRIZONE", "category": "Social Media Management", "image": "/projects/selected-20260623T103901Z-3-001/selected/post-40.jpg", "websiteUrl": "https://www.instagram.com/trizone_business_solutions/", "year": "2026", "description": "Social Media Management.", "tags": ["SMM", "Instagram"] },
  { "id": 133, "title": "PEDAL", "category": "Social Media Management", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782335651/WhatsApp_Image_2023-11-27_at_20.47.32_54d19ed1_n7ca1i.jpg", "websiteUrl": "https://www.instagram.com/pedal.cc", "year": "2026", "description": "Social Media Management.", "tags": ["SMM", "Instagram"] },
  { "id": 134, "title": "GARDENVILLE UAE", "category": "Social Media Management", "image": "/images/projects/gardenville.png", "websiteUrl": "https://www.instagram.com/gardenville_uae", "year": "2026", "description": "Social Media Management.", "tags": ["SMM", "Instagram"] },
  { "id": 135, "title": "HAYA RESTAURANT", "category": "Social Media Management", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782335651/WhatsApp_Image_2024-01-05_at_19.35.18_2ceaf3bd_hj5kkt.jpg", "websiteUrl": "https://www.instagram.com/hayarestaurant__", "year": "2026", "description": "Social Media Management.", "tags": ["SMM", "Instagram"] }
]

new_projects_str = "export const projects = [\n" + ",\n".join("  " + json.dumps(p) for p in new_projects) + "\n]"

# Replace the entire projects array
code = re.sub(r'export const projects = \[[\s\S]*?\]\n\n// Group projects', new_projects_str + '\n\n// Group projects', code, count=1)

with open("c:/Users/anand/Downloads/PORTFLIO/studio-site/src/sections/Work.jsx", "w", encoding="utf-8") as f:
    f.write(code)

print("Work.jsx updated to ONLY include new items.")
