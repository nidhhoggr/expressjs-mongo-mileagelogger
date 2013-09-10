SML.TripActions = (function() {

    var cls = function() {}

    var _getSelectableRoutes = function(binding) 
    {

        cls.binding = binding;

        if(binding.selectionState === 'entity-active') {

            entities = binding.selected.val();
            data = 'l1=id:'+entities[0]+'&l2=id:'+entities[1];

        } else if(binding.selectionState === 'unlisted-active') {


            entity = binding.selected.val();
            ud = $('#supra_bundle_mileagebundle_trip_unlisted_address').val();            
            data = 'l1=id:'+entity+'&l2=address:'+encodeURIComponent(ud);

        } else {

            return;
        }

        $.ajax({
            type: 'POST',
            url: app_path + '/../../app_dev.php/mileage/trip/select_route_ajax',
            data: data,
            success: function(msg) {
           
                _displaySelectRoutes(data); 
                $('#frmSelectRoute').dialog('open');
                $('#frmSelectRoute').html(msg);
            }
        }); 

    }

    var _displaySelectRoutes = function(data)
    {

        $('#frmSelectRoute').dialog({
            autoOpen: false,
            height: 270,
            width: 450,
            modal: true,
            buttons: {
                "Select Route":function() {

                    var selected = $('input[name=selected_route]:checked').val();
                    _getDurationAndMileage(data + '&selected=' + selected); 
                    $(this).dialog("close");
                },
                Cancel: function() {
                    $(this).dialog("close");
                }
            }
        });
    }

    var _getDurationAndMileage = function(data) 
    {
        $.ajax({
            type: 'POST',
            url: app_path + '/../../app_dev.php/mileage/trip/calculate_distance_and_time_ajax',
            data: data,
            success: function(msg) {
                msg = $.parseJSON(msg);
                cls.binding.duration.val(msg.duration);
                cls.binding.mileage.val(msg.mileage);
            }
        });
    }

    return {
        getSelectableRoutes: function(binding) {
            _getSelectableRoutes(binding);
        }
    }
})();
