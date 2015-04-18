Polymer({
    publish: {
        favorite: {
            value: false,
            reflect: true
        }
    },
    favoriteTapped: function(event, detail, sender) {
    this.favorite = !this.favorite;
    this.fire('favorite-tap');
    }
});
