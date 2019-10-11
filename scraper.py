import requests
import time
from bs4 import BeautifulSoup

url = "https://my.olin.edu/ICS/Course_Schedules.jnz"
response = requests.get(url, timeout=5)
soup = BeautifulSoup(response.text, 'html.parser')
print(soup)
# print(response.text)