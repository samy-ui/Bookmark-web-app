// Get references to input fields and table body
var siteNameInput = document.getElementById("bookmarkName");
var siteUrlInput = document.getElementById("bookmarkURL");
var dataWrapper = document.getElementById("tBody");

// Array to hold bookmarks
var allBookMarks = [];

// Function to initialize bookmarks from localStorage
function initializeBookmarks() {
    var savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
        allBookMarks = JSON.parse(savedBookmarks);
        displayData(allBookMarks);
    }
}

// Function to add a new bookmark
function addBookMark() {
    var siteName = siteNameInput.value.trim();
    var siteUrl = siteUrlInput.value.trim();

    // Validate input values
    if (siteName.length < 3) {
        alert("Site name should have at least 3 characters");
        return;
    }
    if (!isValidUrl(siteUrl)) {
        alert("Invalid site URL");
        return;
    }

    // Add bookmark to array
    var newBookMark = {
        siteName: siteName,
        siteUrl: siteUrl
    };
    allBookMarks.push(newBookMark);

    // Save bookmarks to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(allBookMarks));

    // Display bookmark in table
    displayData(allBookMarks);

    // Clear input fields
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

// Function to validate URL
function isValidUrl(url) {
    return url.startsWith("http://") || url.startsWith("https://");
}

// Function to display bookmarks
function displayData(arr) {
    var tableContent = "";
    for (var i = 0; i < arr.length; i++) {
        tableContent +=
            `<tr>
                <td>${i + 1}</td>
                <td>${arr[i].siteName}</td>
                <td><a class="btn btn-primary" href="${arr[i].siteUrl}" target="_blank">Visit</a></td>
                <td><button class="btn btn-success" onclick="preupdate(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick="deleteBookMark(${i})">Delete</button></td>
            </tr>`;
    }
    dataWrapper.innerHTML = tableContent;
}

// Function to prepare for update
function preupdate(index) {
    siteNameInput.value = allBookMarks[index].siteName;
    siteUrlInput.value = allBookMarks[index].siteUrl;
    document.getElementById("submitBtn").onclick = function() { updateBookMark(index); };
}

// Function to update a bookmark
function updateBookMark(index) {
    var siteName = siteNameInput.value.trim();
    var siteUrl = siteUrlInput.value.trim();

    // Validate input values
    if (siteName.length < 3) {
        alert("Site name should have at least 3 characters");
        return;
    }
    if (!isValidUrl(siteUrl)) {
        alert("Invalid site URL");
        return;
    }

    // Update bookmark in array
    allBookMarks[index] = {
        siteName: siteName,
        siteUrl: siteUrl
    };

    // Save updated bookmarks to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(allBookMarks));

    // Display updated bookmarks
    displayData(allBookMarks);

    // Clear input fields and reset submit button
    siteNameInput.value = "";
    siteUrlInput.value = "";
    document.getElementById("submitBtn").onclick = addBookMark;
}

// Function to delete a bookmark
function deleteBookMark(index) {
    allBookMarks.splice(index, 1);

    // Save updated bookmarks to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(allBookMarks));

    // Display updated bookmarks
    displayData(allBookMarks);
}

// Initialize bookmarks on page load
initializeBookmarks();
