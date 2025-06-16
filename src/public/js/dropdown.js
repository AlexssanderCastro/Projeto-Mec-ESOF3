
document.addEventListener("DOMContentLoaded", () => {
    const userIcon = document.getElementById("userIcon");
    const dropdownMenu = document.getElementById("dropdownMenu");

    userIcon.addEventListener("click", () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Fechar dropdown ao clicar fora
    document.addEventListener("click", (e) => {
        if (!userIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});

