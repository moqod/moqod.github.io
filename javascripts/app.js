"use strict";
var after, inCenter;

after = function(time, callback) {
  return setTimeout(callback, time);
};

inCenter = function(item, center, padding) {
  var in_center, item_center, item_rect;
  item_rect = item.getBoundingClientRect();
  item_center = item_rect.top + item_rect.height / 2;
  return in_center = item_center > (center - padding) && item_center < (center + padding);
};

$(document).ready(function(){
    (function() {
        var returnSlider, setSlider;
        setSlider = function(left, width) {
            var params;
            params = {
                width: "" + width + "px"
            };
            if (left && width) {
                params.left = "" + left + "px";
            }
            return $('#nav-slider').css(params);
        };
        returnSlider = function() {
            var active;
            active = $('#nav-slider-wrapper li.active');
            if (active.length > 0) {
                return setSlider(active.position().left, active.width());
            } else {
                return setSlider(0, 0);
            }
        };
        setTimeout(returnSlider,500);
        return $(function() {
            after(50, returnSlider);
            $('#nav-slider-wrapper li').on('mouseover', function() {
                return setSlider($(this).position().left, $(this).width());
            }).on('mouseleave', returnSlider).on('click', function() {
                    $('#nav-slider-wrapper li.active').removeClass('active');
                    return $(this).addClass('active');
                });
            return $('#social-panel .off a').on('click', function(e) {
                e.preventDefault();
                $('#social-panel').addClass('expanded');
                return after(500, function() {
                    return $(document).one('click', function() {
                        return $('#social-panel').removeClass('expanded');
                    });
                });
            });
        });
    })();

    (function() {
        return $(function() {
            var resizeBorders;
            (resizeBorders = function() {
                return $('.border').each(function() {
                    return $(this).width($(this).prev('.bordered').children().addBack().width());
                });
            })();
                       
            $(window).resize(function() {
                return resizeBorders();
            });
            $('.story').on('click', function(e) {
                e.preventDefault();
                return $('#stick-0').animatescroll({
                    scrollSpeed: 1400,
                    easing: 'easeInOutSine',
                    padding: 80
                });
            });
            return $('.service-block').on('click', function(e) {
                e.preventDefault();
                return $($(this).data('href')).animatescroll({
                    scrollSpeed: 1400,
                    easing: 'easeInOutSine'
                });
            });
        });
    })();

   
   (function() {
        var initializeMaps, loadMap, maps, offset, offsetCenter, resizeContanct,
            _this = this;
        if (window.google != null) {
            google.maps.visualRefresh = true;
            maps = [];
            offset = {
                x: 0,
                y: 100
            };
            (resizeContanct = function() {
                var height;
                height = $(window).height() - 64;
                $('#contact-header, #footer').each(function() {
                    return height -= this.getBoundingClientRect().height;
                });
                return $('#maps, #maps .map').height(height);
            })();
            offsetCenter = function(map, latlng) {
                var newCenter, nw, pixelOffset, scale, worldCoordinateCenter, worldCoordinateNewCenter;
                scale = Math.pow(2, map.getZoom());
                nw = new google.maps.LatLng(map.getBounds().getNorthEast().lat(), map.getBounds().getSouthWest().lng());
                worldCoordinateCenter = map.getProjection().fromLatLngToPoint(latlng);
                pixelOffset = new google.maps.Point((offset.x / scale) || 0, (offset.y / scale) || 0);
                worldCoordinateNewCenter = new google.maps.Point(worldCoordinateCenter.x - pixelOffset.x, worldCoordinateCenter.y + pixelOffset.y);
                return newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);
            };
            $(window).resize(function() {
                return resizeContanct();
            });
            $(function() {
                resizeContanct();
                return $('#maps .address').on('click', function() {
                    var id, map;
                    id = $(this).data('id');
                    $("#maps .address.colored").removeClass('colored');
                    $(this).addClass('colored');
                    $("#maps .map-wrapper.active").removeClass('active');
                    $("#map-wrapper-" + id).addClass('active');
                    map = maps[id - 1];
                    if (map != null) {
                        return map.map.panTo(offsetCenter(map.map, map.coords));
                    }
                });
            });
            loadMap = function(id, x, y, zoom) {
                var coords, map, mapOptions, marker;
                coords = new google.maps.LatLng(x, y);
                mapOptions = {
                    center: coords,
                    zoom: zoom || 16,
                    disableDefaultUI: true,
                    zoomControl: true,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL
                    },
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById(id), mapOptions);
                marker = new google.maps.Marker({
                    position: coords,
                    map: map
                });
                google.maps.event.addListenerOnce(map, 'bounds_changed', function(e, f) {
                    return map.setCenter(offsetCenter(map, coords));
                });
                return maps.push({
                    map: map,
                    marker: marker,
                    coords: coords
                });
            };
            initializeMaps = function() {
                loadMap('map-1', 52.373516, 4.935258);
                loadMap('map-2', 56.845724, 53.208408);
                return loadMap('map-3', 50.442105, 30.498245, 17);
            };
            return google.maps.event.addDomListener(window, 'load', initializeMaps);
        }
    })();

});
