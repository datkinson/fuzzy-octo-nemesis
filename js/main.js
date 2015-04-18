var tabs = document.querySelector('paper-tabs');
var list = document.querySelector('post-list');

tabs.addEventListener('core-select', function() {
    list.show = tabs.selected;
});

function updateList() {
    $.ajax({
        url: "json/generated.json",
        cache: false
    }).done(function(json) {
        document.querySelector('post-list').posts = json;
    });
}
