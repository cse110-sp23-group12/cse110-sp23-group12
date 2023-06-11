THIS_DIR := $(dir $(abspath $(firstword $(MAKEFILE_LIST))))
CFLAGS = -O3 -std=gnu++20 -Wall -Wextra -Wshadow -D_GLIBCXX_ASSERTIONS -ggdb3 -fmax-errors=2 -DLOCAL
 
.PHONY: all gen test atcoder clean
 
%: ~/.hash/%.cpp.md5
	g++ -o $@ $@.cpp ${CFLAGS}
 
all:
	updatemd5 ${THIS_DIR}data.cpp
	updatemd5 ${THIS_DIR}brute.cpp
	make data
	make brute
 
gen:
	python3 gen.py > data.in
 
test:
	bash test.sh
 
atcoder:
	bash atcoder.sh
 
clean:
	rm data brute
