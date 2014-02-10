(function() {
  var WidgetTV;

  WidgetTV = (function() {
    var self;

    self = void 0;

    function WidgetTV(el) {
      self = this;
      self.$el = el;
      self.$options = $('.options a', el);
      this.log.add('notification', 'Widget module constructed.', this);
      self.binds();
      self.initPlayers();
    }

    WidgetTV.prototype.log = new LogHandler('WidgetTV');

    WidgetTV.prototype.binds = function() {
      this.$options.bind('click', self.changePrime);
      return PubSub.subscribe('resize', self.resizeEvent);
    };

    WidgetTV.prototype.changePrime = function(e) {
      var $embed, $param, $placeholder, type, url, value;
      e.preventDefault();
      url = $(this).data('embedurl');
      $placeholder = $('.prime', $(this).closest('.widget-tv'));
      $embed = $('.embed', $placeholder);
      type = $embed.prop('tagName').toLowerCase();
      if (type === 'iframe') {
        $embed.attr('src', url);
        self.log.add('notification', 'Prime video changed.', $embed);
      }
      if (type === 'object') {
        $param = $('param[name="flashVars"]', $embed);
        value = window.query2object($param.attr('value'));
        value.mediaId = url;
        value = decodeURIComponent($.param(value));
        $param.attr('value', value);
        $embed.detach();
        $placeholder.append($embed);
        return self.limeLightInit($embed.attr('id'));
      } else {
        return self.log.add('error', 'Embed element type not accounted for.', $embed);
      }
    };

    WidgetTV.prototype.initPlayers = function() {
      var $players;
      $players = $('object', self.$el);
      return $players.each(function() {
        self.setDimensions($(this));
        return self.limeLightInit($(this).attr('id'));
      });
    };

    WidgetTV.prototype.setDimensions = function($obj) {
      var $parent, newHeight, newWidth;
      $parent = $obj.parent('.prime');
      newWidth = $parent.width();
      newHeight = $parent.innerHeight();
      return $obj.attr('width', newWidth).attr('height', newHeight).css('width', newWidth).css('height', newHeight);
    };

    WidgetTV.prototype.limeLightInit = function(id) {
      if (id == null) {
        return false;
      }
      self.log.add('notification', 'Limelight player initialized.', id);
      return LimelightPlayerUtil.initEmbed(id);
    };

    WidgetTV.prototype.resizeEvent = function(e) {
      var $footprint;
      $footprint = $('.limelight-player-footprint', self.$el);
      if ($footprint.length < 1) {
        return false;
      }
      self.log.add('notification', 'Resize event: modifying limelight footprint.', $footprint);
      return $footprint.each(function() {
        return self.setDimensions($(this));
      });
    };

    return WidgetTV;

  })();

  define(function() {
    return WidgetTV;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHYuanMiLCJzb3VyY2VzIjpbInR2LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtDQUFBLEtBQUEsRUFBQTs7Q0FBQSxDQUFNO0NBQ0osR0FBQSxJQUFBOztDQUFBLEVBQU8sQ0FBUCxFQUFBOztDQUVhLENBQUEsQ0FBQSxDQUFBLGNBQUM7Q0FFWixFQUFPLENBQVAsRUFBQTtDQUFBLENBQUEsQ0FHQSxDQUFJLEVBQUo7Q0FIQSxDQUlnQyxDQUFoQixDQUFaLEVBQUosRUFBQSxJQUFnQjtDQUpoQixDQU15QixDQUFyQixDQUFILEVBQUQsUUFBQSxjQUFBO0NBTkEsR0FTSSxDQUFKLENBQUE7Q0FUQSxHQVlJLEVBQUosS0FBQTtDQWhCRixJQUVhOztDQUZiLEVBc0JBLENBQVMsTUFBQTs7Q0F0QlQsRUEwQk8sRUFBUCxJQUFPO0NBQ0wsQ0FBeUIsRUFBeEIsRUFBRCxDQUFBLENBQVUsR0FBVjtDQUVPLENBQW9CLEVBQUksRUFBekIsRUFBTixDQUFBLEVBQUEsRUFBQTtDQTdCRixJQTBCTzs7Q0ExQlAsRUFrQ2EsTUFBQyxFQUFkO0NBQ0UsU0FBQSxvQ0FBQTtDQUFBLEtBQUEsUUFBQTtDQUFBLEVBR0EsQ0FBTSxFQUFOLElBQU07Q0FITixDQUkyQixDQUFaLENBQVksRUFBM0IsQ0FBMkIsQ0FBWixJQUFmO0NBSkEsQ0FLcUIsQ0FBWixHQUFULEVBQVMsSUFBQTtDQUxULEVBUU8sQ0FBUCxFQUFBLEdBQU8sRUFBQTtDQUdQLEdBQUcsQ0FBUSxDQUFYLEVBQUE7Q0FDRSxDQUFtQixDQUFuQixDQUFBLENBQUEsQ0FBTSxFQUFOO0NBQUEsQ0FDNkIsQ0FBckIsQ0FBSixFQUFKLEVBQUEsTUFBQSxRQUFBO1FBYkY7Q0FjQSxHQUFHLENBQVEsQ0FBWCxFQUFBO0NBRUUsQ0FBc0MsQ0FBN0IsR0FBVCxFQUFBLGlCQUFTO0NBQVQsRUFHUSxDQUFvQixDQUE1QixDQUFjLENBQWMsQ0FBNUIsSUFBUTtDQUhSLEVBSWdCLEVBQVgsRUFBTCxDQUFBO0NBSkEsRUFLUSxFQUFSLEdBQUEsVUFBUTtDQUxSLENBTXFCLEVBQXJCLENBQUEsQ0FBTSxDQUFOLENBQUE7Q0FOQSxLQVNNLEVBQU47Q0FUQSxLQVVBLEVBQUEsSUFBWTtDQUdQLEdBQUQsRUFBcUIsT0FBekIsRUFBQTtNQWZGLEVBQUE7Q0FpQk8sQ0FBaUIsQ0FBZCxDQUFKLEVBQUosQ0FBQSxRQUFBLHdCQUFBO1FBaENTO0NBbENiLElBa0NhOztDQWxDYixFQXVFYSxNQUFBLEVBQWI7Q0FDRSxPQUFBLEVBQUE7Q0FBQSxDQUF1QixDQUFaLENBQWdCLEVBQTNCLEVBQUE7Q0FFUyxFQUFLLENBQWQsSUFBUSxDQUFNLElBQWQ7Q0FDRSxHQUFJLElBQUosS0FBQTtDQUNLLEdBQUQsU0FBSixFQUFBO0NBRkYsTUFBYztDQTFFaEIsSUF1RWE7O0NBdkViLEVBaUZlLENBQUEsS0FBQyxJQUFoQjtDQUNFLFNBQUEsa0JBQUE7Q0FBQSxFQUFVLENBQUksRUFBZCxDQUFBLENBQVU7Q0FBVixFQUNXLEVBQUEsQ0FBWCxDQUFrQixDQUFsQjtDQURBLEVBRVksR0FBWixDQUFtQixFQUFuQixFQUFZO0NBQ1AsQ0FBYyxDQUFuQixDQUFJLEdBQUosQ0FBQSxDQUFBLElBQUE7Q0FyRkYsSUFpRmU7O0NBakZmLENBNEZlLENBQUEsTUFBQyxJQUFoQjtDQUNFLEdBQW9CLEVBQXBCLElBQUE7Q0FBQSxJQUFBLFVBQU87UUFBUDtDQUFBLENBRTZCLENBQXJCLENBQUosRUFBSixRQUFBLGlCQUFBO0NBR29CLENBQXBCLE9BQUEsSUFBQSxNQUFtQjtDQWxHckIsSUE0RmU7O0NBNUZmLEVBdUdhLE1BQUMsRUFBZDtDQUNFLFNBQUE7Q0FBQSxDQUE4QyxDQUFqQyxDQUFxQyxFQUFsRCxJQUFBLG1CQUFhO0NBR2IsRUFBb0MsQ0FBcEIsRUFBaEIsSUFBMEI7Q0FBMUIsSUFBQSxVQUFPO1FBSFA7Q0FBQSxDQU02QixDQUFyQixDQUFKLEVBQUosSUFBQSxJQUFBLGdDQUFBO0NBR1csRUFBSyxDQUFoQixLQUFnQixDQUFOLEdBQVY7Q0FDTyxHQUFELFNBQUosRUFBQTtDQURGLE1BQWdCO0NBakhsQixJQXVHYTs7Q0F2R2I7O0NBREY7O0NBQUEsQ0F1SEEsQ0FBTyxHQUFQLEdBQU87Q0FDTCxPQUFBLEdBQU87Q0FEVCxFQUFPO0NBdkhQIn0=