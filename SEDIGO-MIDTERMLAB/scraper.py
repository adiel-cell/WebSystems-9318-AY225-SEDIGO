import requests
from bs4 import BeautifulSoup
import json
import time
import re

def get_top_sellers_urls():
    """Get game URLs from Steam Top Sellers page"""
    base_url = "https://store.steampowered.com/search/?filter=topsellers"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    print(f"Fetching Top Sellers page...")
    response = requests.get(base_url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    game_urls = []
    # Find all game links in search results
    for link in soup.select('a.search_result_row'):
        href = link.get('href')
        if href and '/app/' in href:
            game_urls.append(href)
    
    print(f"Found {len(game_urls)} game URLs")
    return game_urls[:15]  # Get 15 URLs to ensure we get at least 10 good ones

def scrape_game_page(url):
    """Scrape individual game page for required fields"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract Game Title
        title_elem = soup.select_one('.apphub_AppName')
        title = title_elem.text.strip() if title_elem else "Not Available"
        
        # Extract Release Date
        release_elem = soup.select_one('.date')
        release_date = release_elem.text.strip() if release_elem else "Not Available"
        
        # Extract Key Features (from about section)
        about_section = soup.select_one('.game_area_description')
        if about_section:
            # Get first paragraph or first few sentences
            about_text = about_section.get_text(strip=True)
            key_features = about_text[:500] + "..." if len(about_text) > 500 else about_text
        else:
            key_features = "Not Available"
        
        # Extract Platform Availability
        platforms = []
        platform_elements = soup.select('.platform_img')
        for platform in platform_elements:
            class_name = platform.get('class', [])
            if 'win' in class_name:
                platforms.append('Windows')
            elif 'mac' in class_name:
                platforms.append('Mac')
            elif 'linux' in class_name:
                platforms.append('Linux')
        platform_availability = ', '.join(platforms) if platforms else "Not Available"
        
        # Extract Developer Information
        developer_elem = soup.select_one('.dev_row a')
        developer = developer_elem.text.strip() if developer_elem else "Not Available"
        
        # Extract Publisher Information
        publisher_elem = soup.select_one('.dev_row + .dev_row a')
        if not publisher_elem:
            publisher_elem = soup.select_one('.glance_details .dev_row:last-child a')
        publisher = publisher_elem.text.strip() if publisher_elem else "Not Available"
        
        # If publisher same as developer, try to find actual publisher
        if publisher == developer and publisher != "Not Available":
            publisher = f"{publisher} (also publisher)"
        
        return {
            'game_title': title,
            'release_date': release_date,
            'key_features': key_features,
            'platform_availability': platform_availability,
            'developer': developer,
            'publisher': publisher,
            'steam_url': url
        }
        
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return None

def main():
    """Main function to run the scraper"""
    print("=" * 50)
    print("Steam Top Sellers Web Scraper")
    print("=" * 50)
    
    # Get game URLs from Top Sellers page
    game_urls = get_top_sellers_urls()
    
    # Scrape each game page
    games_data = []
    for i, url in enumerate(game_urls, 1):
        print(f"\nScraping game {i}/{len(game_urls)}: {url}")
        game_info = scrape_game_page(url)
        
        if game_info:
            games_data.append(game_info)
            print(f"  ✓ {game_info['game_title']} - {game_info['release_date']}")
        else:
            print(f"  ✗ Failed to scrape")
        
        # Be respectful - wait between requests
        time.sleep(1)
    
    # Save to JSON file
    with open('games.json', 'w', encoding='utf-8') as f:
        json.dump(games_data, f, ensure_ascii=False, indent=2)
    
    print("\n" + "=" * 50)
    print(f"Scraping complete! Saved {len(games_data)} games to games.json")
    print("=" * 50)
    
    return games_data

if __name__ == "__main__":
    main()