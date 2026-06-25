import json
import re

with open("c:/Users/anand/Downloads/PORTFLIO/studio-site/src/sections/Work.jsx", "r", encoding="utf-8") as f:
    code = f.read()

new_videos = [
  {
    "id": 146,
    "title": "VIDEO SHOWCASE 1",
    "category": "Video & Motion",
    "video": "https://r2.fivemanage.com/a4pdsZOQMmCMFV6BoxOUW/mmim.HQmp4.mp4",
    "year": "2026",
    "description": "Video production and motion graphics.",
    "tags": ["Motion Graphics", "Video"]
  },
  {
    "id": 147,
    "title": "VIDEO SHOWCASE 2",
    "category": "Video & Motion",
    "video": "https://r2.fivemanage.com/a4pdsZOQMmCMFV6BoxOUW/reeel_HQ1.mp4",
    "year": "2026",
    "description": "Video production and motion graphics.",
    "tags": ["Motion Graphics", "Video"]
  }
]

new_videos_str = ",\n".join("  " + json.dumps(p) for p in new_videos)

# Add to projects array
code = re.sub(r'}\n\]', '},\n' + new_videos_str + '\n]', code, count=1)

with open("c:/Users/anand/Downloads/PORTFLIO/studio-site/src/sections/Work.jsx", "w", encoding="utf-8") as f:
    f.write(code)

print("Work.jsx updated with 2 new videos.")
