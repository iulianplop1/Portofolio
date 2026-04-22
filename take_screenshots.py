from playwright.sync_api import sync_playwright
import time
import os

urls = {
    "viacompass": "https://iulianplop1.github.io/VIA-ProjectMap/",
    "receipts": "https://iulianplop1.github.io/Receipts/",
    "shopping_list": "https://iulianplop1.github.io/Shopping-List/",
    "instastop": "https://iulianplop1.github.io/InstaStop/",
    "outfitt": "https://iulianplop1.github.io/Outfitt/",
    "scrapper": "https://iulianplop1.github.io/Scrapper/",
    "cloverville": "https://batorgabora.github.io/cloverville/"
}

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Set a standard desktop viewport
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()
        
        for name, url in urls.items():
            print(f"Navigating to {name} at {url}...")
            try:
                page.goto(url, wait_until="networkidle", timeout=30000)
                # Wait an extra 2 seconds to allow animations/fonts to load
                time.sleep(2)
                screenshot_path = os.path.join("screenshots", f"{name}.png")
                page.screenshot(path=screenshot_path)
                print(f"Saved {screenshot_path}")
            except Exception as e:
                print(f"Error screenshotting {name}: {e}")
        
        browser.close()

if __name__ == "__main__":
    run()
