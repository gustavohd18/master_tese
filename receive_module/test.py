import requests
import json
import csv
from requests.auth import HTTPBasicAuth
import gzip
from  zipfile import ZipFile
from  io import BytesIO
# Set up API parameters
api_key = 'e68807658f4e722c1dcc83f3d62207c7'
secret_key = 'f81a7b9c083f83470a9827f3c9edcfea'
start_date = '20230318'
end_date = '20230325'
event_type = 'notification_echo54'
#ZTY4ODA3NjU4ZjRlNzIyYzFkY2M4M2YzZDYyMjA3Yzc6ZjgxYTdiOWMwODNmODM0NzBhOTgyN2YzYzllZGNmZWE=
# Make API call to retrieve data
url = f'https://amplitude.com/api/2/export?start={start_date}&end={end_date}&event_type={event_type}&api_key={api_key}&secret_key={secret_key}'
response = requests.get(url, auth=HTTPBasicAuth('e68807658f4e722c1dcc83f3d62207c7','f81a7b9c083f83470a9827f3c9edcfea'))
print(response.text)

zip = ZipFile(BytesIO(response.content))




# with open('arquivo_descomprimido.txt', 'wb') as f:
#     # Descomprime o conteúdo da resposta e salva no arquivo
#     f.write(gzip.decompress(response.content))
#talvez salvar o dado que vem do amplitude e abrir ele para configurar o json
# Convert response to JSON
#print(response.text)
#data = json.loads(response.text)
#print(data)

# # #Save data to CSV file
# with open('amplitude_data.csv', mode='w', newline='') as file:
#     writer = csv.writer(file)
#     writer.writerow(data['data'][0].keys())
#     for row in data['data']:
#         writer.writerow(row.values())
