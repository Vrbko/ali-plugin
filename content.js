console.log("Plugin script is running1!");

function runBundleFilter() {
  console.log('Plugin script is running2');  // Confirm logic is running

  const cards = document.querySelectorAll('.l5_ae');
  console.log(`Found ${cards.length} cards.`);

  cards.forEach(card => {
    if (card.innerText.includes("Bundle deals")) {
        // Find the grandparent with specific classes
        const wrapper = card.closest('.hm_bl.search-item-card-wrapper-gallery');
        
        if (wrapper) {
          console.log("Removing wrapper:", wrapper);
          wrapper.remove();
        } else {
          console.warn("Wrapper not found for card:", card);
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
const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.addedNodes.length > 0) {
      console.log("DOM changed, running filter again...");
      runBundleFilter();
      break;
    }
  }
});

// Start observing the body or a specific container
const targetNode = document.body; // You can target a more specific container if needed
observer.observe(targetNode, {
  childList: true,
  subtree: true
});