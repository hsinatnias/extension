document.addEventListener("DOMContentLoaded", () => {
    const logsList = document.getElementById("logs");
    const downloadBtn = document.getElementById("download");

    // Fetch logs from storage
    chrome.storage.local.get("websiteLogs", (data) => {
        const logs = data.websiteLogs || [];
        logs.forEach(log => {
            const li = document.createElement("li");
            li.textContent = `${log.url} - ${log.timestamp}`;
            logsList.appendChild(li);
        });
    });

    downloadBtn.addEventListener("click", ()=>{
        chrome.storage.local.get("websiteLogs", (data) => {
            const logs = data.websiteLogs || [];
            downloadCSV(logs);
        });
    });

});

function downloadCSV(logs) {
    const header = "URL,Timestamp\n";
    const csvData = logs.map(log => `"${log.url}","${log.timestamp}"`).join("\n");
    const blob = new Blob([header + csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Create a download link
    const link = document.createElement("a");
    link.href = url;
    link.download = "browser_logs.csv";
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Purge storage
    chrome.storage.local.remove("websiteLogs", () => {
        console.log("Logs purged from storage after download.");
    });
}
