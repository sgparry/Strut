// Generated by CoffeeScript 1.3.3
/*
@author Tantaman
*/

define(["./ComponentView"], function(ComponentView) {
  var svgScale;
  svgScale = function(e, deltas) {
    var height, offset, width;
    offset = this.$el.offset();
    width = (deltas.x - offset.left) / this.dragScale;
    height = (deltas.y - offset.top) / this.dragScale;
    this.$el.css({
      width: width,
      height: height
    });
    return this.model.set("scale", {
      width: width,
      height: height
    });
  };
  return ComponentView.extend({
    className: "component imageView",
    tagName: "div",
    initialize: function() {
      ComponentView.prototype.initialize.apply(this, arguments);
      if (this.model.get("imageType") === "SVG") {
        return this.scale = svgScale;
      }
    },
    render: function() {
      var $img, naturalHeight, naturalWidth;
      ComponentView.prototype.render.call(this);
      $img = $("<img src=" + (this.model.get('src')) + "></img>");
      if (this.model.get("imageType") === "SVG") {
        $img.css({
          width: "100%",
          height: "100%"
        });
        naturalWidth = $img[0].naturalWidth;
        naturalHeight = $img[0].naturalHeight;
        this.$el.css({
          width: naturalWidth,
          height: naturalHeight
        });
        this.model.set("scale", {
          width: naturalWidth,
          height: naturalHeight
        });
      }
      $img.bind("dragstart", function(e) {
        e.preventDefault();
        return false;
      });
      this.$el.find(".content").append($img);
      this.$el.css({
        top: this.model.get("y"),
        left: this.model.get("x")
      });
      return this.$el;
    }
  });
});
