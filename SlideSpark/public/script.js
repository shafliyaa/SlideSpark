const uploadBtn = document.getElementById("upload-btn");

uploadBtn.addEventListener("click", uploadFile);

async function uploadFile(){
    const fileInput = document.getElementById("pdfFile");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("pdf", file);

    const response = await fetch("/upload", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    console.log(data);

    document.getElementById("output").innerText = data.text;

    alert("Uploaded!");
}

