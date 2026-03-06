const uploadBtn = document.getElementById("upload-btn");

uploadBtn.addEventListener("click", uploadFile);

async function uploadFile() {
    const fileInput = document.getElementById("pdfFile");
    const file = fileInput.files[0];

    // 1. Safety Check: Don't send anything if no file is selected
    if (!file) {
        alert("Please select a file first!");
        return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
        // 2. Use the full URL if your HTML isn't being served by Express
        const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            document.getElementById("output").innerText = data.text;
            alert("Uploaded and Processed!");
        } else {
            alert("Server Error: " + data.error);
        }
        
    } catch (error) {
        console.error("Connection error:", error);
        alert("Could not connect to the server. Make sure it is running!");
    }
}