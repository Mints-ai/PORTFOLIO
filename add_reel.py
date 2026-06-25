import json
import re

with open("c:/Users/anand/Downloads/PORTFLIO/studio-site/src/sections/Work.jsx", "r", encoding="utf-8") as f:
    code = f.read()

new_reel = {
    "id": 145,
    "title": "MINTS BRAND REEL",
    "category": "Video & Motion",
    "video": "https://res.cloudinary.com/dr9iliszi/video/upload/v1782396482/MINTS_MG_1_1_sd5gm3.mp4",
    "year": "2026",
    "description": "An immersive brand experience video designed for Mints Global.",
    "tags": ["Motion Graphics", "Brand Film", "Video Editing"]
}

new_reel_str = ",\n  " + json.dumps(new_reel)

# Add to projects array
code = re.sub(r'}\n\]', '}' + new_reel_str + '\n]', code, count=1)

# Add new cluster Video & Motion
new_cluster_str = """  { id: 'video-motion', title: 'Video & Motion', projects: projects.filter(p => ['Video & Motion', 'Video Editing'].includes(p.category)) },\n"""

# Add it after 'performance-marketing' cluster
code = re.sub(
    r"\{ id: 'performance-marketing', title: 'Performance Marketing', projects: projects\.filter\(p => \['Performance Marketing', 'Commercial Ads', 'Commercial Ad'\]\.includes\(p\.category\)\) \}",
    "{ id: 'performance-marketing', title: 'Performance Marketing', projects: projects.filter(p => ['Performance Marketing', 'Commercial Ads', 'Commercial Ad'].includes(p.category)) },\n" + new_cluster_str.strip('\n'),
    code,
    count=1
)

with open("c:/Users/anand/Downloads/PORTFLIO/studio-site/src/sections/Work.jsx", "w", encoding="utf-8") as f:
    f.write(code)

print("Work.jsx updated with Brand Reel.")
