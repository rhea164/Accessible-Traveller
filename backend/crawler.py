import requests
from bs4 import BeautifulSoup
import re

def getHTML(url): 
    response = requests.get(url)

    if response.status_code == 200:
        return response.text
    
    return None

def extractLink(url, keywords):
    content = getHTML(url)

    if content is None:
        print("Cannot retrieve content from", url)
        return []
    
    parsed = BeautifulSoup(content, 'html.parser')
    links = []

    for link in parsed.find_all('a', href=True):
        href = link['href']
        if any(re.search(keyword, link.text, re.IGNORECASE) for keyword in keywords):
            if not href.startswith('http'):
                href = url + href
            links.append(href)
    return links

def extractContent(url):
    content = getHTML(url)

    if content is None:
        print("Cannot retrieve content from", url)
        return None
    
    parsed = BeautifulSoup(content, 'html.parser')
    headers = []

    for i in range(1, 7):
        tag = 'h' + str(i)
        headers.extend(parsed.find_all(tag))
    
    articleContent = ' '.join([header.text for header in headers])
    return articleContent

def crawl(baseURL, keywords):
    articles = extractLink(baseURL, keywords)

    for article in articles:
        print(f"Fetching article: {article}")
        content = extractContent(article)
        if content:
            print(f"Article content: {content[:250]}...")
        else:
            print("Failed to retrieve article content.")

if __name__ == "__main__":
    tourism_url = "https://www.tripadvisor.com/Tourism-g191-United_States-Vacations.html"
    keywords = [
        "accessible", "accessibility", "wheelchair", "disability", "disabled",
        "barrier-free", "inclusive", "mobility", "handicap", "adapted", 
        "ADA compliant", "hearing impaired", "visually impaired", 
        "guide dog", "service dog", "accessible restroom", "accessible parking",
        "ramp", "elevator", "braille", "sign language", "assistive listening"
    ]
    crawl(tourism_url, keywords)
