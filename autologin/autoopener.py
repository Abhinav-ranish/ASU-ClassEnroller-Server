import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
# from twilio.rest import Client
import yaml
import os
import json

#to install pyinstaller --onefile --icon="asu.ico" autoopener.py

def save_credentials(username, password):
    data = {
        'account_sid': username,
        'auth_token': password,
    }
    with open('asu_credentials.yaml', 'w') as file:
        yaml.dump(data, file)

def load_credentials():
    with open('asu_credentials.yaml', 'r') as file:
        data = yaml.safe_load(file)
        return (
            data['account_sid'], 
            data['auth_token'], 
        )

def load_class_number():
    with open('file.txt', 'r') as file:
        class_number = file.read()
        return class_number
    
def load_duopushotp():
    with open('duopush.txt', 'r') as file1:
        duo_push = file1.read()
        return duo_push
    
def login():
    chrome_options = Options()
    # chrome_options.add_argument("--headless")  
    # chrome_options.add_argument("--window-size=10,10")
    chrome_options.add_argument("--disable-site-isolation-trials")
    service = Service('chromedriver.exe')  
    driver = webdriver.Chrome(service=service, options=chrome_options) 
    # driver.set_window_position(2000, 0)  
    try:
        account_sid, auth_token = load_credentials()
        class_number = load_class_number()
        duo_push = load_duopushotp()
        url = f"https://my.asu.edu/"
        driver.get(url)
        
        time.sleep(3)

        username_field = driver.find_element(By.CSS_SELECTOR, '#username')
        password_field = driver.find_element(By.CSS_SELECTOR, '#password')
        login_button = driver.find_element(By.CSS_SELECTOR, 'input[name="submit"]')

        username_field.send_keys(account_sid)
        password_field.send_keys(auth_token)
        login_button.click()

        time.sleep(5)

        driver.switch_to.frame(0)

        duo_passcode = driver.find_element(By.ID, "passcode")
        # webdriver.ActionChains(driver).move_to_element(passcode_field).perform()
        duo_passcode.click()

        # webdriver.ActionChains(driver).move_to_element_with_offset(passcode_field, 0, 0).perform()

        duo_textfield = driver.find_element(By.NAME, "passcode")
        duo_textfield.send_keys(duo_push)

        passcode_submit_button = driver.find_element(By.ID, "passcode")
        passcode_submit_button.click()

        time.sleep(5)

        url1 = f"https://www.asu.edu/go/addclass/?STRM=2247&ASU_CLASS_NBR={class_number}"

        driver.get(url1)

        time.sleep(5)

        addclass = driver.find_element(By.ID, "ASU_ADDCLAS_WRK_ADD_BTN")
        addclass.click()

        time.sleep(5)

        enroll = driver.find_element(By.ID, "DERIVED_SSR_FL_SSR_ENROLL_FL")
        enroll.click()

        time.sleep(2)

        
        driver.find_element(By.ID, "#ICYes").click()

        print("Class added successfully. Exiting browser.")

        ## add stuff here

        time.sleep(5)
    finally:
        driver.quit()


def main():
    while True:
        if os.path.exists('asu_credentials.yaml'):
            os.system('cls' if os.name == 'nt' else 'clear')
            print("\nASU credentials already exist. Loading from file.\n")   
            if os.path.exists('file.txt'):
                print("\nClass number already exists. Loading from file.\n")
                if os.path.exists('duopush.txt'):
                    print("\nDuo Push already exists. Loading from file.\n")
                    login()
                    return
                else:
                    duo_push = input("Enter Duo Push OTP: ")
                    with open('duopush.txt', 'w') as file1:
                        file1.write(duo_push)
                        print("Duo Push OTP saved to duopush.txt\n")
                        time.sleep(1)
                    login()
                    return
            else:
                print("\nClass number does not exist.\n")
                return
        else:
            account_sid = input("Enter ASU username: ")
            auth_token = input("Enter ASU password: ")
            save_credentials(account_sid, auth_token)
            print("Twilio credentials saved to twilio_credentials.yaml\n")
            time.sleep(1)

if __name__ == "__main__":
    main()
