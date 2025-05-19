document.addEventListener("DOMContentLoaded", function() {
  const img = document.getElementById('p2p-img');
  if (!img) return;

  function updateImage(e) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      img.src = 'img/pwn2play/P2Pinterface.png';
    } else {
      img.src = 'img/pwn2play/P2P.png';
    }
  }

  // Initial check
  updateImage();

  // Listen for changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateImage);
});