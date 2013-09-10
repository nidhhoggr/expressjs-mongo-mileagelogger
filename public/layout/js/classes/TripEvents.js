SML.TripEvents = (function() {


    var cls = function() {} 
 
    var _init_ = function() { 

        bundle = "#supra_bundle_mileagebundle_trip_";

        cls.selected = $(bundle + "locations");
        cls.is_unlisted = $(bundle + "unlisted");
        cls.unlisted_address = $(bundle + "unlisted_address");
        cls.assume = $(bundle + "assume");
        cls.select_rt_btn = $('#select_route');
        cls.duration = $(bundle + "travelTime");
        cls.mileage = $(bundle + "mileage");
        cls.ActionHandler = SML.TripActions;

        _hideRouteSelectionButton();
        cls.unlisted_address.parent().hide();
    }

    var _toggleChooseRouteButton = function()
    {


        if(cls.selected.val() === null) return;
 
        if(cls.selected.val().length === 2) {

            cls.select_rt_btn.removeAttr("disabled");
            _hideUnlistedDestination();
            cls.selectionState = 'entity-active';

        } else if((cls.selected.val().length === 1 && cls.is_unlisted.is(':checked'))) {

            cls.select_rt_btn.removeAttr("disabled");
            _showUnlistedDestination();
            cls.selectionState = 'unlisted-active';

        } else {

            _hideRouteSelectionButton();
            _showUnlistedDestination();
            cls.selectionState = 'inactive';
        }
    }

    var _hideRouteSelectionButton = function() {

        cls.select_rt_btn.attr("disabled", true);
    }

    var _hideUnlistedDestination = function() {
        cls.is_unlisted.attr('checked', false);
        cls.is_unlisted.attr("disabled", true);
        cls.unlisted_address.parent().hide();
    }

    var _showUnlistedDestination = function() {
        cls.is_unlisted.removeAttr("disabled");

        if(cls.is_unlisted.is(':checked'))
            cls.unlisted_address.parent().show();
        else 
            cls.unlisted_address.parent().hide();
    }

    return {

        binding: function() {

            _init_();

            cls.select_rt_btn.live('click', function(e) {

                cls.ActionHandler.getSelectableRoutes(cls);
            });

            cls.selected.live('click',function(e) { 
 
                _toggleChooseRouteButton();
            });

            cls.is_unlisted.live('click',function(e) { 

                _toggleChooseRouteButton();

                _showUnlistedDestination();    
            });

            cls.assume.live('click',function(e) {

                if($(this).is(':checked')) {

                    cls.select_rt_btn.hide();

                } else {

                    cls.select_rt_btn.show();
                }

            });

        }
    }

})();
