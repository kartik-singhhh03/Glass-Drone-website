import urllib.request
import os

images = {
    'Office Buildings.png': 'https://images.pexels.com/photos/18710790/pexels-photo-18710790.jpeg?auto=compress&cs=tinysrgb&w=2560',
    'Hotels & Resorts.png': 'https://images.pexels.com/photos/17619969/pexels-photo-17619969.jpeg?auto=compress&cs=tinysrgb&w=2560',
    'Shopping Centers.png': 'https://images.pexels.com/photos/16133567/pexels-photo-16133567.jpeg?auto=compress&cs=tinysrgb&w=2560',
    'Residential Complexes.png': 'https://images.pexels.com/photos/15021809/pexels-photo-15021809.jpeg?auto=compress&cs=tinysrgb&w=2560',
    'Industrial Facilities.png': 'https://images.pexels.com/photos/2224898/pexels-photo-2224898.jpeg?auto=compress&cs=tinysrgb&w=2560',
    'Modern Glass Structures.png': 'https://images.pexels.com/photos/5253207/pexels-photo-5253207.jpeg?auto=compress&cs=tinysrgb&w=2560',
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
}

for name, url in images.items():
    print(f'Downloading: {name}')
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            data = response.read()
            with open(name, 'wb') as f:
                f.write(data)
        size = os.path.getsize(name)
        print(f'  Done! Size: {size/1024:.1f} KB')
    except Exception as e:
        print(f'  ERROR: {e}')

print('All downloads complete!')
