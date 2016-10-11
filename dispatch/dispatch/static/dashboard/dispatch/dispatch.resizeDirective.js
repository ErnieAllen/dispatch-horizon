/*
 *    (c) Copyright 2015 Rackspace US, Inc
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {
  'use strict';

  angular
    .module('horizon.dashboard.dispatch')
    .directive('resizer', paneresize);

    paneresize.$inject = ['$document'];

  function paneresize($document) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {

        $element.on('mousedown', function(event) {
          event.preventDefault();
          var origLeft = $element.prop('offsetLeft')

          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);

          function mouseup() {
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
          };

          function mousemove (event) {
            var x = event.pageX - origLeft;

            if ($attrs.resizerMax && x > $attrs.resizerMax) {
              x = parseInt($attrs.resizerMax);
            }

            if ($attrs.resizerMin && x < $attrs.resizerMin) {
              x = parseInt($attrs.resizerMin);
            }

            $element.css({
              left: x + 'px'
            });

            $($attrs.resizerLeft).css({
              width: x + 'px'
            });
            $($attrs.resizerRight).css({
              left: (x + parseInt($attrs.resizerWidth)) + 'px'
            });
          };
        });
      }
    }
	}
})();
