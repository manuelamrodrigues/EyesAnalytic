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
    
    cpu = psutil.cpu_percent(interval=None, percpu=False)
    ram = psutil.virtual_memory()[2]
    packet = psutil.net_io_counters(pernic=False, nowrap=True)[6]
    
    print('--------------------')
    print(f"Uso da CPU: {cpu}%")
    print(f"Uso da RAM: {ram}%")
    print(f"Packet loss: {packet}")

    
    mydb = connect(**config)
    if mydb.is_connected():

        mycursor = mydb.cursor()
        sql_query = f"INSERT INTO dadoHw VALUES (null, current_timestamp(), {cpu}, {ram}, {packet})"
        mycursor.execute(sql_query)
        mydb.commit()
        print(mycursor.rowcount, "registro inserido")


        if(mydb.is_connected()):
            mycursor.close()
            mydb.close()
    i += 1
    time.sleep(5)
