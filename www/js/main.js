var tabs = document.querySelector('paper-tabs');
var list = document.querySelector('post-list');
var content = document.querySelector('dynamic-content');

tabs.addEventListener('core-select', function(eventObject) {
    if(eventObject.detail.isSelected) {
        if(tabs.selected === 'content') {
            list.hidden = true;
            content.hidden = false;
        } else {
            content.hidden = true;
            list.hidden = false;
            list.show = tabs.selected;
        }
    }
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
