// script.js
window.onload = function() {
    const dancers = document.querySelectorAll('.dancer');
    
    // Function to place dancers randomly on the stage
    dancers.forEach(dancer => {
        const x = Math.random() * (document.getElementById('stage').offsetWidth - 50);
        const y = Math.random() * (document.getElementById('stage').offsetHeight - 50);
        
        dancer.style.left = `${x}px`;
        dancer.style.top = `${y}px`;
    });
};
