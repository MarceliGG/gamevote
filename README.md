Aby uruchomić aplikację należy uruchomić bazę danych postgresql i zmienić ustawienia w pliku app/api/settings.js

Bazę danych można  uruchomić np na docker uruchamiając w terminalu poniższy kod:
```
docker run --name postgres postgres:latest -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_USER=gamevote
```

strona dla firm będzie dostępna na endpoinsie /gamedev
