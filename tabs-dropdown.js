(function($) {
    var methods = {
        init: function(options) {
            return this.each(function() {
                var $tabsDropdown = $(this);
                $tabsDropdown.tabs(options);
                let $tablist = $tabsDropdown.find('ul[role=tablist]');
                $tablist.addClass('tabs-dropdown-ul');
                var $dropdown = $('<select></select>');
                var count = 0;
                $tablist.find('li').each(function() {
                    let a = $(this).find('a');
                    let option = $('<option></option>');
                    option.attr('value', count);
                    option.html(a.html());
                    $dropdown.append(option);
                    count++;
                })
                $dropdown.insertAfter($tablist);
                $dropdown.selectmenu({
                    change: function(event) {
                        let tab = $(event.target).find(":selected").val();
                        $tabsDropdown.tabs( "option", "active", tab );
                    }
                }).selectmenu( "menuWidget" );
                $dropdown.selectmenu('widget').addClass('tabs-dropdown-dropdown');
                //initiate jQuery UI Tabs
                $tabsDropdown.on( "tabsactivate", function( event, ui ) {
                    $dropdown.val($tabsDropdown.tabs( "option", "active"));
                });
            });
        }
    };
    $.fn.tabsDropdown = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on $.tabsDropdown');
        }
    };
})(jQuery);
