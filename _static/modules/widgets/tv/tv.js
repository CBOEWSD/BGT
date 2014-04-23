
/*
   * WidgetTV
  This is main code behind the TV widget module. The module will make
  use of the global LogHandler class.
 */

(function() {
  var WidgetTV;

  WidgetTV = (function() {
    var self;

    self = void 0;


    /*
       *# Constructor
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
       *# this.log
      Add local instance of logging to this module.
      Can be called with:
      ``` @log.add 'notification', 'message...', @ ```
     */

    WidgetTV.prototype.log = new LogHandler('WidgetTV');


    /*
       *# this.binds()
      Binds click events to thumbnail icons.
     */

    WidgetTV.prototype.binds = function() {
      this.$options.bind('click', self.changePrime);
      return PubSub.subscribe('resize', self.resizeEvent);
    };


    /*
       *# this.changePrime()
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
       *# this.initPlayers()
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
       *# this.setDimensions()
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
       *# this.limeLightInit()
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
       *# this.resizeEvent
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
     *# Module definition
    Called by require.
   */

  define(function() {
    return WidgetTV;
  });

}).call(this);

//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHYuanMiLCJzb3VyY2VzIjpbInR2LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBOzs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxRQUFBOztBQUFBLEVBTU07QUFDSixRQUFBLElBQUE7O0FBQUEsSUFBQSxJQUFBLEdBQU8sTUFBUCxDQUFBOztBQUVBO0FBQUE7O09BRkE7O0FBS2EsSUFBQSxrQkFBQyxFQUFELEdBQUE7QUFFWCxNQUFBLElBQUEsR0FBTyxJQUFQLENBQUE7QUFBQSxNQUdBLElBQUksQ0FBQyxHQUFMLEdBQVcsRUFIWCxDQUFBO0FBQUEsTUFJQSxJQUFJLENBQUMsUUFBTCxHQUFnQixDQUFBLENBQUUsWUFBRixFQUFnQixFQUFoQixDQUpoQixDQUFBO0FBQUEsTUFNQSxJQUFDLENBQUEsR0FBRyxDQUFDLEdBQUwsQ0FBUyxjQUFULEVBQXlCLDRCQUF6QixFQUF1RCxJQUF2RCxDQU5BLENBQUE7QUFBQSxNQVNBLElBQUksQ0FBQyxLQUFMLENBQUEsQ0FUQSxDQUFBO0FBQUEsTUFZQSxJQUFJLENBQUMsV0FBTCxDQUFBLENBWkEsQ0FGVztJQUFBLENBTGI7O0FBcUJBO0FBQUE7Ozs7O09BckJBOztBQUFBLHVCQTJCQSxHQUFBLEdBQVMsSUFBQSxVQUFBLENBQVcsVUFBWCxDQTNCVCxDQUFBOztBQTZCQTtBQUFBOzs7T0E3QkE7O0FBQUEsdUJBaUNBLEtBQUEsR0FBTyxTQUFBLEdBQUE7QUFDTCxNQUFBLElBQUMsQ0FBQyxRQUFRLENBQUMsSUFBWCxDQUFnQixPQUFoQixFQUF5QixJQUFJLENBQUMsV0FBOUIsQ0FBQSxDQUFBO2FBRUEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsUUFBakIsRUFBMkIsSUFBSSxDQUFDLFdBQWhDLEVBSEs7SUFBQSxDQWpDUCxDQUFBOztBQXNDQTtBQUFBOzs7O09BdENBOztBQUFBLHVCQTJDQSxXQUFBLEdBQWEsU0FBQyxDQUFELEdBQUE7QUFDWCxVQUFBLDhDQUFBO0FBQUEsTUFBQSxDQUFD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