document.addEventListener("DOMContentLoaded", () => {
    const trendsContainer = document.getElementById("trends");
    const refreshButton = document.getElementById("refreshData");
    const loader = document.querySelector(".loader");
    const categorySelect = document.getElementById("category");
    const darkModeToggle = document.getElementById("darkModeToggle");

    const fetchTrends = async () => {
        const category = categorySelect.value;
        loader.style.display = "block";
        trendsContainer.innerHTML = "";

        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=6d3f267c3bae41f5a406b0f282ba7bbc`);
            if (!response.ok) throw new Error("Failed to fetch news");

            const data = await response.json();
            loader.style.display = "none";
            trendsContainer.innerHTML = ""; // Clear old news

            if (data.articles.length > 0) {
                data.articles.forEach(article => {
                    const trendElement = document.createElement("div");
                    trendElement.classList.add("trend");
                    trendElement.innerHTML = `
                        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                        <p>${article.description || "No description available."}</p>
                    `;
                    trendsContainer.appendChild(trendElement);
                });
            } else {
                trendsContainer.innerHTML = "<p>No trending news found.</p>";
            }

        } catch (error) {
            loader.style.display = "none";
            trendsContainer.innerHTML = "<p>Error loading trends. Try again later.</p>";
            console.error("Error fetching trends:", error);
        }

        // Auto-refresh every 5 minutes (300,000ms)
        setTimeout(fetchTrends, 300000);
    };

    refreshButton.addEventListener("click", fetchTrends);
    categorySelect.addEventListener("change", fetchTrends);

    // Dark mode toggle
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            darkModeToggle.textContent = "☀️ Light Mode";
        } else {
            darkModeToggle.textContent = "🌙 Dark Mode";
        }
    });

    fetchTrends(); // Load trends on page load
});
