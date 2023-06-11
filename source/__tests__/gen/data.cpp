// compile: make data
// run: ./data
#include <bits/stdc++.h>
#include <boost/format.hpp>
using namespace std;
#pragma GCC optimize("O3,unroll-loops")
#pragma GCC target("avx2,bmi,bmi2,lzcnt,popcnt")
#ifdef LOCAL
#include <debug/codeforces.h>
#define debug(x...) _debug_print(#x, x);
#else
#define debug(x...) {};
#endif
template<typename...Args> void print_(Args...args){((cout<<args<<" "),...)<<endl;}
#define rep(i,a,b) for(int i=(a);i<(int)(b);++i)
#define sz(v) ((int)(v).size())
#define print(...) print_(__VA_ARGS__);
#define cmin(x,...) x=min({(x), __VA_ARGS__})
#define cmax(x,...) x=max({(x), __VA_ARGS__})
#define INTMAX (int)(9223372036854775807)
#define INF (int)(1152921504606846976)
#define double long double
#define int long long
#define MAXN 200010
using boost::format;

string tobe(string fn, vector<string> params, string result) {
    string output = "    expect(" + fn + "(";
    for (auto &s : params) output += s + ", ";
    output.pop_back(), output.pop_back(), output += ")).toBe(" + result + ");\n";
    return output;
}

void gen_getrank(int it) {
    string filename = "source/getrank.test.js";
    string js = "'../js/utils.js'";
    auto get_rank = [](vector<int> a, int N, int M) {
        sort(a.begin(), a.end(), less<int>());
        auto comb = [&](int n, int k) -> int {
            vector<int> fact = {1}; rep(i, 1, 18) fact.emplace_back(fact.back() * i);
            if (!k) return 1;
            if (!n || n < k) return 0;
            return fact[n] / fact[k] / fact[n - k];
        };
        int rank = comb(N, M);
        rep(i, 0, M) rank -= comb(N - a[i] - 1, M - i);
        return rank - 1;
    };
    mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
    vector<int> hashvalue; rep(_, 0, 40) hashvalue.emplace_back(rng());
    map<int, bool> mp;
    string output = "import { getRank } from " + js + ";\n\n";
    for (; it--; ) {
        debug(it);
        int N = 1 + rng() % 15;
        int M = 1 + rng() % N;
        auto gen_arr = [&](int n, int m) -> pair<vector<int>, int> {
            vector<int> arr(n); rep(i, 0, n) arr[i] = i;
            shuffle(arr.begin(), arr.end(), rng), arr.resize(m);
            int h = hashvalue[20+n] ^ hashvalue[20+m]; for (auto x : arr) h ^= hashvalue[x];
            return {arr, h};
        };
        auto [arr, h] = gen_arr(N, M);;
        for (; mp[h]; ) tie(arr, h) = gen_arr(N, M);
        mp[h] = 1;
        int ans = get_rank(arr, N, M);
        string arr_str = "["; for (auto x : arr) arr_str += to_string(x) + ", "; arr_str.pop_back(), arr_str.pop_back(), arr_str += "]";
        output += "test('C(" + to_string(N) + ", " + to_string(M) + "), " + arr_str + " = " + to_string(ans) + "', () => {\n";
        output += tobe("getRank", {arr_str, to_string(N), to_string(M)}, to_string(ans));
        output += "});\n\n";
    }
    ofstream of(filename); of << output; of.close();
}

void gen_randomchoose(int it) {
    string filename = "source/randomChoose.test.js";
    string js = "'../js/utils.js'";
    mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
    ofstream of(filename);
    of << "import { randomChoose } from " + js + ";\n\n";
    while (it--) {
        int N = (rng() % 15) + 3;
        int M = (rng() % N) + 1;
        of << format("test('random choose %1% from %2%', () => {\n") % M % N;
        of << format("    const ids = randomChoose(%1%, %2%);\n") % N % M;
        of << format("    expect(ids.length).toBe(%1%);\n") % M;
        of << format("    expect(Math.min(...ids)).toBeGreaterThanOrEqual(0)\n");
        of << format("    expect(Math.max(...ids)).toBeLessThan(%1%)\n") % N;
        of << format("    const uniqueSet = new Set(ids);\n");
        of << format("    expect(uniqueSet.size).toBe(ids.length);\n");
        of << format("});\n\n");
    }
    of.close();
}

int32_t main() {
    ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr);

    gen_getrank(10);
    gen_randomchoose(10);

    return 0;
}