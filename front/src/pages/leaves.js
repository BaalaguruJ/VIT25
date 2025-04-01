document.addEventListener("DOMContentLoaded", function () {
    const numLeaves = 10; // Adjust the number of leaves
  
    for (let i = 0; i < numLeaves; i++) {
      createLeaf();
    }
  
    function createLeaf() {
      const leaf = document.createElement("div");
      leaf.classList.add("falling-leaf");
  
      // Random position and delay
      leaf.style.left = `${Math.random() * 100}vw`;
      leaf.style.animationDelay = `${Math.random() * 5}s`;
      leaf.style.animationDuration = `${Math.random() * 5 + 5}s`; // Randomize falling speed
  
      document.body.appendChild(leaf);
  
      // Remove leaf after animation ends
      leaf.addEventListener("animationiteration", () => {
        leaf.remove();
        createLeaf(); // Generate a new leaf after the previous one disappears
      });
    }
  });
  