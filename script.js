document.getElementById('configForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the owner name
    const ownerName = document.getElementById('ownerId').value;

    // Create an array to store the assets
    const assets = [];

    // Get all the asset entries
    const assetEntries = document.querySelectorAll('.asset-entry');

    // Loop through each asset entry and extract the data
    assetEntries.forEach(assetEntry => {
        const assetType = assetEntry.querySelector('.assetType').value;
        const assetName = assetEntry.querySelector('.assetName').value;

        // Create an object for each asset
        const asset = {
            assetType: assetType,
            assetName: assetName,
            // Add more fields here if needed
        };

        assets.push(asset);
    });

    // Create the configuration object
    const configuration = {
        ownerName: ownerName,
        assets: assets,
    };

    // Convert the configuration object to JSON format
    const jsonData = JSON.stringify(configuration);

    // Save the JSON data to a file (You can adapt this part based on your specific use case)
    saveToFile('config.json', jsonData);

    alert('Configuration saved successfully!');
});

document.getElementById('addAsset').addEventListener('click', function() {
    // Create a new asset entry
    const newAssetEntry = document.createElement('div');
    newAssetEntry.classList.add('asset-entry');

    // Add input fields for the new asset entry
    newAssetEntry.innerHTML = `
        <label for="assetType">Asset Type:</label>
        <input type="text" class="assetType" required>
        <label for="assetName">Asset Name:</label>
        <input type="text" class="assetName" required>
        <button type="button" class="removeAsset">Remove</button>
    `;

    // Add the new asset entry to the assets container
    document.getElementById('assetsContainer').appendChild(newAssetEntry);

    // Attach an event listener to the "Remove" button of the new asset entry
    newAssetEntry.querySelector('.removeAsset').addEventListener('click', function() {
        newAssetEntry.remove();
    });
});

// Function to save data to a file (For demonstration purposes only)
function saveToFile(filename, data) {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}