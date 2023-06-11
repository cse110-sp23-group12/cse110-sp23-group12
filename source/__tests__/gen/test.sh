#!/usr/bin/bash
eval "make all"
for i in $(seq 1 1 1000)
do
    if [[ $(($i % 100)) -eq 0 ]]; then
        echo $i
    fi
    python3 gen.py > data.in
    ./data < data.in > data.out
    if [[ $? -ne 0 ]]; then
        echo "RE!!"
        break
    fi
    ./brute < data.in > data.ans
    diff data.out data.ans
    if [[ $? -ne 0 ]]; then
        break
    fi
done
