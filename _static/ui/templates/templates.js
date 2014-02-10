this["JST"] = this["JST"] || {};

this["JST"]["modules/twitter/tweet.share.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"tweet\">\r\n  <div class=\"avatar\">\r\n    <img src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.profile_image_url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" alt=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.screen_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n  </div>\r\n  <p class=\"message\">\r\n    ";
  if (stack2 = helpers.text) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.text); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n  </p>\r\n</div>";
  return buffer;
  });