function openModal() {
    document.getElementById("overlay").classList.remove("hidden");
    document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("modal").classList.add("hidden");
}

// close when clicking overlay
document.getElementById("overlay").addEventListener("click", closeModal);