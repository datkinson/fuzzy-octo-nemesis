Polymer({
    handleFavorite: function(event, detail, sender) {
        var post = sender.templateInstance.model.post;
        this.$.service.setFavorite(post.uid, post.favorite);
    }
});
