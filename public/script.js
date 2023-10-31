// script.js

document.addEventListener('DOMContentLoaded', () => {
    const visitCountElement = document.getElementById('visit-count');
    const incrementButton = document.getElementById('increment-button');
  
    // Function to update the visit count on the page
    const updateVisitCount = () => {
      fetch('/getVisitCount')
        .then((response) => response.json())
        .then((data) => {
          document.body.style.fontSize = data.visitCount  + "px"
          visitCountElement.textContent = data.visitCount;
        })
        .catch((error) => {
          console.error('Error fetching visit count:', error);
        });
    };
  
    // Initial update of the visit count
    updateVisitCount();
  
    // Handle button click to increment the visit count
    incrementButton.addEventListener('click', () => {
      fetch('/incrementVisitCount')
        .then((response) => response.json())
        .then(() => {
          // Update the visit count after incrementing
          updateVisitCount();
        })
        .catch((error) => {
          console.error('Error incrementing visit count:', error);
        });
    });
  });
  