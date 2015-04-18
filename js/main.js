// Attach event listener to the tabs
var tabs = document.querySelector('paper-tabs');
tabs.addEventListener('core-select', function(item) {
    console.log("Selected: " + tabs.selected);
    console.log(item);
});
