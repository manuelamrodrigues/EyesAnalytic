from mysql.connector import connect, Error
import psutil
import time
import os
from dotenv import load_dotenv

load_dotenv()

config = {
  "user": os.getenv("USER_LOGIN"),
  "password": os.getenv("DB_PASSWORD"),
  "host": os.getenv("HOST"),
  "database": os.getenv("DATABASE")
}


i = 0
while i < 10: 

    disk = psutil.disk_usage("/")[3]
    
    print(f"Espaço de disco disponível: {disk}%")

    
    mydb = connect(**config)
    if mydb.is_connected():

        mycursor = mydb.cursor()
        sql_query = f"INSERT INTO diskP VALUES (null, current_timestamp(), {disk})"
        mycursor.execute(sql_query)
        mydb.commit()
        print(mycursor.rowcount, "registro inserido")


        if(mydb.is_connected()):
            mycursor.close()
            mydb.close()
    i += 1
    time.sleep(60)
