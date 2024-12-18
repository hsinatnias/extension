document.addEventListener("DOMContentLoaded", () => {
    const logsList = document.getElementById("logs");

    // Fetch logs from storage
    chrome.storage.local.get("websiteLogs", (data) => {
        const logs = data.websiteLogs || [];
        logs.forEach(log => {
            const li = document.createElement("li");
            li.textContent = `${log.url} - ${log.timestamp}`;
            logsList.appendChild(li);
        });
    });
});
