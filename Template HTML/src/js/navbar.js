document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("profileButton");
    const dropdown = document.getElementById("ProfileDropdown");

    button.addEventListener("click", function(event) {
        dropdown.classList.toggle("hidden");
        event.stopPropagation();
    });

    document.addEventListener("click", function(event) {
        const isClickInside = button.contains(event.target) || dropdown.contains(event.target);
        if (!isClickInside) {
            dropdown.classList.add("hidden");
        }
    });
});