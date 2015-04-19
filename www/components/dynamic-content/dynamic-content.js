Polymer({
    hidden: true,
    currentContent: {
        'title': 'No Content',
        'description': 'There is currently no content.  To add new content please register a node to the relevant content location.'
    },
    contentLibrary: [
        {
            'uid': 'default',
            'content': {
                'title': 'No Content',
                'description': 'There is currently no content.  To add new content please register a node to the relevant content location.'
            }
        },
        {
            'uid': '88:0F:10:53:D5:35',
            'threshold': -60,
            'content': {'title': 'Mi Band', 'description': 'A fitness tracking device that also has the cappability to track sleeping patterns.  This device is currently also being used as a proximity test.'}
        }
    ],
    htmlContent: "<h2>Test</h2><p>This is just some example content</p>",
    newHtmlContent: "",
    contentChanged: function() {
        if(this.htmlContent != this.newHtmlContent) {
            this.htmlContent = this.newHtmlContent;
            this.$.current_content.innerHTML = this.htmlContent;
        }
    }
});
