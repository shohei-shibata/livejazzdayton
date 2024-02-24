new ClipboardJS('.btn-copy-to-clipboard');

const bctc = document.getElementsByClassName('btn-copy-to-clipboard');

bctc[0].addEventListener('click', function handleClick() {
  bctc[0].textContent = 'Copied!';
  setTimeout(function resetText() {
    bctc[0].textContent = 'Copy Link';
  }, 3000)
})