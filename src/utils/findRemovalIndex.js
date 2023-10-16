function findRemovalIndexForPalindrome(s) {
  let start = 0;
  let end = s.length - 1;

  while (start < end) {
    if (s[start] !== s[end]) {
      if (isPalindrome(s, start + 1, end)) {
        return start;
      }
      if (isPalindrome(s, start, end - 1)) {
        return end;
      }
      return -1;
    }
    start++;
    end--;
  }
  return -1;
}

function isPalindrome(s, start, end) {
  while (start < end) {
    if (s[start] !== s[end]) {
      return false;
    }
    start++;
    end--;
  }
  return true;
}

export default findRemovalIndexForPalindrome;
