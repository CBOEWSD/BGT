/*
  # WidgetTV
  This is main code behind the TV widget module. The module will make
  use of the global LogHandler class.
*/


(function() {
  var WidgetTV;

  WidgetTV = (function() {
    var self;

    self = void 0;

    /*
      ## Constructor
    */


    function WidgetTV(el) {
      self = this;
      self.$el = el;
      self.$options = $('.options a', el);
      this.log.add('notification', 'Widget module constructed.', this);
      self.binds();
      self.initPlayers();
    }

    /*
      ## this.log
      Add local instance of logging to this module.
      Can be called with:
      ``` @log.add 'notification', 'message...', @ ```
    */


    WidgetTV.prototype.log = new LogHandler('WidgetTV');

    /*
      ## this.binds()
      Binds click events to thumbnail icons.
    */


    WidgetTV.prototype.binds = function() {
      this.$options.bind('click', self.changePrime);
      return PubSub.subscribe('resize', self.resizeEvent);
    };

    /*
      ## this.changePrime()
      Fired on click or touch event of thumbnail selector.
      Changes prime video based on data set embedurl.
    */


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

    /*
      ## this.initPlayers()
      Called by the constructor to set the initial view for
      mobile and tablet devices and other such requirements for player.
    */


    WidgetTV.prototype.initPlayers = function() {
      var $players;
      $players = $('object', self.$el);
      return $players.each(function() {
        self.setDimensions($(this));
        return self.limeLightInit($(this).attr('id'));
      });
    };

    /*
      ## this.setDimensions()
      Sets the width and height of the object placeholder
      for the limelight plugin to resolve.
    */


    WidgetTV.prototype.setDimensions = function($obj) {
      var $parent, newHeight, newWidth;
      $parent = $obj.parent('.prime');
      newWidth = $parent.width();
      newHeight = $parent.innerHeight();
      return $obj.attr('width', newWidth).attr('height', newHeight).css('width', newWidth).css('height', newHeight);
    };

    /*
      ## this.limeLightInit()
      Initialized the embed plugin for mobile embedding.
    */


    WidgetTV.prototype.limeLightInit = function(id) {
      if (id == null) {
        return false;
      }
      self.log.add('notification', 'Limelight player initialized.', id);
      return LimelightPlayerUtil.initEmbed(id);
    };

    /*
      ## this.resizeEvent
      On viewport resize event we check if the limelight wrapper is active
      for each we resize to the new appropriate size.
    */


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

  /*
    ## Module definition
    Called by require.
  */


  define(function() {
    return WidgetTV;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHYuanMiLCJzb3VyY2VzIjpbInR2LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Q0FBQTtDQUFBO0NBQUE7Q0FBQSxLQUFBLEVBQUE7O0NBQUEsQ0FNTTtDQUNKLEdBQUEsSUFBQTs7Q0FBQSxFQUFPLENBQVAsRUFBQTs7Q0FFQTs7O0NBRkE7O0NBS2EsQ0FBQSxDQUFBLENBQUEsY0FBQztDQUVaLEVBQU8sQ0FBUCxFQUFBO0NBQUEsQ0FBQSxDQUdBLENBQUksRUFBSjtDQUhBLENBSWdDLENBQWhCLENBQVosRUFBSixFQUFBLElBQWdCO0NBSmhCLENBTXlCLENBQXJCLENBQUgsRUFBRCxRQUFBLGNBQUE7Q0FOQSxHQVNJLENBQUosQ0FBQTtDQVRBLEdBWUksRUFBSixLQUFBO0NBbkJGLElBS2E7O0NBZ0JiOzs7Ozs7Q0FyQkE7O0NBQUEsRUEyQkEsQ0FBUyxNQUFBOztDQUVUOzs7O0NBN0JBOztDQUFBLEVBaUNPLEVBQVAsSUFBTztDQUNMLENBQXlCLEVBQXhCLEVBQUQsQ0FBQSxDQUFVLEdBQVY7Q0FFTyxDQUFvQixFQUFJLEVBQXpCLEVBQU4sQ0FBQSxFQUFBLEVBQUE7Q0FwQ0YsSUFpQ087O0NBS1A7Ozs7O0NBdENBOztDQUFBLEVBMkNhLE1BQUMsRUFBZDtDQUNFLFNBQUEsb0NBQUE7Q0FBQSxLQUFBLFFBQUE7Q0FBQSxFQUdBLENBQU0sRUFBTixJQUFNO0NBSE4sQ0FJMkIsQ0FBWixDQUFZLEVBQTNCLENBQTJCLENBQVosSUFBZjtDQUpBLENBS3FCLENBQVosR0FBVCxFQUFTLElBQUE7Q0FMVCxFQVFPLENBQVAsRUFBQSxHQUFPLEVBQUE7Q0FHUCxHQUFHLENBQVEsQ0FBWCxFQUFBO0NBQ0UsQ0FBbUIsQ0FBbkIsQ0FBQSxDQUFBLENBQU0sRUFBTjtDQUFBLENBQzZCLENBQXJCLENBQUosRUFBSixFQUFBLE1BQUEsUUFBQTtRQWJGO0NBY0EsR0FBRyxDQUFRLENBQVgsRUFBQTtDQUVFLENBQXNDLENBQTdCLEdBQVQsRUFBQSxpQkFBUztDQUFULEVBR1EsQ0FBb0IsQ0FBNUIsQ0FBYyxDQUFjLENBQTVCLElBQVE7Q0FIUixFQUlnQixFQUFYLEVBQUwsQ0FBQTtDQUpBLEVBS1EsRUFBUixHQUFBLFVBQVE7Q0FMUixDQU1xQixFQUFyQixDQUFBLENBQU0sQ0FBTixDQUFBO0NBTkEsS0FTTSxFQUFOO0NBVEEsS0FVQSxFQUFBLElBQVk7Q0FHUCxHQUFELEVBQXFCLE9BQXpCLEVBQUE7TUFmRixFQUFBO0NBaUJPLENBQWlCLENBQWQsQ0FBSixFQUFKLENBQUEsUUFBQSx3QkFBQTtRQWhDUztDQTNDYixJQTJDYTs7Q0FrQ2I7Ozs7O0NBN0VBOztDQUFBLEVBa0ZhLE1BQUEsRUFBYjtDQUNFLE9BQUEsRUFBQTtDQUFBLENBQXVCLENBQVosQ0FBZ0IsRUFBM0IsRUFBQTtDQUVTLEVBQUssQ0FBZCxJQUFRLENBQU0sSUFBZDtDQUNFLEdBQUksSUFBSixLQUFBO0NBQ0ssR0FBRCxTQUFKLEVBQUE7Q0FGRixNQUFjO0NBckZoQixJQWtGYTs7Q0FPYjs7Ozs7Q0F6RkE7O0NBQUEsRUE4RmUsQ0FBQSxLQUFDLElBQWhCO0NBQ0UsU0FBQSxrQkFBQTtDQUFBLEVBQVUsQ0FBSSxFQUFkLENBQUEsQ0FBVTtDQUFWLEVBQ1csRUFBQSxDQUFYLENBQWtCLENBQWxCO0NBREEsRUFFWSxHQUFaLENBQW1CLEVBQW5CLEVBQVk7Q0FDUCxDQUFjLENBQW5CLENBQUksR0FBSixDQUFBLENBQUEsSUFBQTtDQWxHRixJQThGZTs7Q0FTZjs7OztDQXZHQTs7Q0FBQSxDQTJHZSxDQUFBLE1BQUMsSUFBaEI7Q0FDRSxHQUFvQixFQUFwQixJQUFBO0NBQUEsSUFBQSxVQUFPO1FBQVA7Q0FBQSxDQUU2QixDQUFyQixDQUFKLEVBQUosUUFBQSxpQkFBQTtDQUdvQixDQUFwQixPQUFBLElBQUEsTUFBbUI7Q0FqSHJCLElBMkdlOztDQVFmOzs7OztDQW5IQTs7Q0FBQSxFQXdIYSxNQUFDLEVBQWQ7Q0FDRSxTQUFBO0NBQUEsQ0FBOEMsQ0FBakMsQ0FBcUMsRUFBbEQsSUFBQSxtQkFBYTtDQUdiLEVBQW9DLENBQXBCLEVBQWhCLElBQTBCO0NBQTFCLElBQUEsVUFBTztRQUhQO0NBQUEsQ0FNNkIsQ0FBckIsQ0FBSixFQUFKLElBQUEsSUFBQSxnQ0FBQTtDQUdXLEVBQUssQ0FBaEIsS0FBZ0IsQ0FBTixHQUFWO0NBQ08sR0FBRCxTQUFKLEVBQUE7Q0FERixNQUFnQjtDQWxJbEIsSUF3SGE7O0NBeEhiOztDQVBGOztDQTRJQTs7OztDQTVJQTs7Q0FBQSxDQWdKQSxDQUFPLEdBQVAsR0FBTztDQUNMLE9BQUEsR0FBTztDQURULEVBQU87Q0FoSlAifQ==