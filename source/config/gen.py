#!/usr/bin/python3
import random
import json
import math
import hashlib
import grequests
import gevent.monkey
gevent.monkey.patch_all()
from requests.packages.urllib3.util.ssl_ import create_urllib3_context
create_urllib3_context()

N = 20
prompts = ['emperor', 'empress', 'fool', 'hierophant', 'high priestess', 'magician']
database = []
n = len(prompts)
urls = []
def get_rank(a):
    rank = math.comb(n, 3)
    for i in range(3):
        rank -= math.comb(n - a[i] - 1, 3 - i)
    return rank - 1

def get_ans(keys):
    return 'https://team12.jyh.sb/tarot?first={}&second={}&third={}'.format(keys[0], keys[1], keys[2])

def check(ans):
    keys = []
    for i in ans: keys.append(prompts[i])
    urls = []
    for i in range(N):
        urls.append(get_ans(keys))
    answers = []
    rs = (grequests.get(u) for u in urls)
    res = grequests.map(rs)
    for i in range(len(res)):
        answers.append(res[i].json().get('answer'))
    print(answers)
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
    print("const dbVersion = \"%s\";" % (hashvalue), file=f)
with open('db.json', 'w') as f:
    print(json.dumps(database), file=f)