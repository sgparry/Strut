/*
@author Matt Crinklaw-Vogt
*/
define(["vendor/backbone", "./Templates", "css!./res/css/PictureGrabber.css", "common/Throttler"], function(Backbone, Templates, empty, Throttler) {
  return Backbone.View.extend({
    className: "pictureGrabber modal",
    events: {
      "click .ok": "okClicked",
      "keypress input[name='imageUrl']": "urlChanged",
      "paste input[name='imageUrl']": "urlChanged"
    },
    initialize: function() {
      return this.throttler = new Throttler(200, this);
    },
    show: function(cb) {
      this.cb = cb;
      return this.$el.modal('show');
    },
    okClicked: function() {
      this.cb(this.src);
      return this.$el.modal('hide');
    },
    urlChanged: function() {
      return this.throttler.submit(this.loadImage, {
        rejectionPolicy: "runLast"
      });
    },
    loadImage: function() {
      this.img.src = this.$input.val();
      return this.src = this.img.src;
    },
    render: function() {
      this.$el.html(Templates.PictureGrabber());
      this.$el.modal();
      this.$el.modal("hide");
      this.img = this.$el.find("img")[0];
      this.$input = this.$el.find("input[name='imageUrl']");
      return this.$el;
    },
    constructor: function PictureGrabber() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
  });
});