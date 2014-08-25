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
