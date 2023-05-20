#!/usr/bin/python3
import random
import json
import math
import hashlib

N = 20
prompts = []
database = []
with open('config.js') as f:
    content = f.read()
    content = content[content.index('{'):]
    config = json.loads(content)
    for card in config['cards']:
        prompts.append(card['prompt'])
n = len(prompts)

def get_rank(a):
    rank = math.comb(n, 3)
    for i in range(3):
        rank -= math.comb(n - a[i] - 1, 3 - i)
    return rank - 1

def get_ans(keys, num):
    return '+'.join(keys) + '#' + num.__str__()

def check(ans):
    keys = []
    for i in ans: keys.append(prompts[i])
    answers = []
    for i in range(N):
        answers.append(get_ans(keys, i))
    database.append(answers)

def dfs(k, pre, ans):
    if (len(ans) == 3 or k >= n):
        if (len(ans) == 3): check(ans)
        return
    for i in range(pre+1, n):
        dfs(k + 1, i, ans + [i])
dfs(0, -1, [])
hashvalue = hashlib.md5(json.dumps(database, sort_keys=True).encode('utf-8')).hexdigest()
with open('version.js', 'w') as f:
    print("const db_version_ = \"%s\";" % (hashvalue), file=f)
with open('db.json', 'w') as f:
    print(json.dumps(database), file=f)