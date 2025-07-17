/// TREBA JE NAjTI "kc_kq", in "hm_bu", vsaki update
/*
  <div data-tticheck="true" class="hm_bu search-item-card-wrapper-gallery">
    <div class="kc_kq">
      <div class="kc_ke card-out-wrapper" style=""></div>


      Torej wrraper je hm_bu, klass pa je pod njim, najboljse bi blo to nardit dinamično 
*/

const debug = false; // Set to false to disable debug logging

function log(...args) {
  if (debug) console.log(...args);
}

function warn(...args) {
  if (debug) console.warn(...args);
}

log("Plugin script is running1!");

function runBundleFilter() {
  log('Plugin script is running2, searching for kc_kq');  // Confirm logic is running

  const cards = document.querySelectorAll('.kc_kq');
  log(`Found ${cards.length} cards.`);

  cards.forEach(card => {
    log("Iterating search for card ?");
    if (card.innerText.includes("Bundle deals")) {
      log("Found Bundle deals in a card");

      // Find the grandparent with specific classes
      const wrapper = card.closest('.hm_bu.search-item-card-wrapper-gallery');

      if (wrapper) {
        log("Removing wrapper:", wrapper);
        wrapper.remove();
      } else {
        warn("Wrapper not found for card:", card);
      }
    }
  });
}

// If the DOM is already loaded, run immediately
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runBundleFilter);
} else {
  runBundleFilter();
}

// Set up MutationObserver to detect changes in the product list
const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    for (let node of mutation.addedNodes) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue;

      if (node.matches?.('.kc_kq') || node.querySelector?.('.kc_kq')) {
        log("Relevant change detected, running filter...");
        runBundleFilter();
        return; // Only need to run once per relevant batch
      }
    }
  }
});

// Start observing the body or a specific container
const targetNode = document.body; // You can target a more specific container if needed
observer.observe(targetNode, {
  childList: true,
  subtree: true
});