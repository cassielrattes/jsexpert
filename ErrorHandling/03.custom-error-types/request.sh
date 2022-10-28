echo $'\n\n[requesting: normal request]'
curl -i localhost:3000 -X POST -d '{"name": "Vingador", "age": 80}'

echo $'\n\n[requesting: wrong age]'
curl -i localhost:3000 -X POST -d '{"name": "Vingador", "age": 19}'

echo $'\n\n[requesting: wrong name]'
curl -i localhost:3000 -X POST -d '{"name": "Arr", "age": 80}'

echo $'\n\n[requesting: connection error]'
curl -i localhost:3000 -X POST -d '{"connectionError": "Arr", "age": 80}'