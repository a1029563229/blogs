#include <stdio.h>

int main() {
  int c;

  while((c = getchar()) != EOF) {
    putchar(EOF);
    putchar(c == EOF);
    putchar(c);
  }
}