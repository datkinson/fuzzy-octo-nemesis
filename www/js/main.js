var tabs = document.querySelector('paper-tabs');
var list = document.querySelector('post-list');

tabs.addEventListener('core-select', function() {
    list.show = tabs.selected;
});

function updateList(list) {
    if(typeof list === 'undefined') {
        console.log('it was undefined');
        $.ajax({
            url: "json/generated.json",
            cache: false,
            dataType: "json"
        }).done(function(json) {
            document.querySelector('post-list').posts = json;
        });
    } else {
        document.querySelector('post-list').posts = list;
    }
}
