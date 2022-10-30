URL=localhost:3000
npx autocannon $URL -m POST \
    --warmup [-c 1 -d 3] \
    --connection 500 \
    --pipeline 10 \
    --renderStatusCodes

# cat log.txt | grep 3871 | wc -l