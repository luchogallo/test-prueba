(function ($) {
  var $traineeGrid = $(".trainee-grid"),
      $trainees = $traineeGrid.find(".grid-item"),
      $dept = $('select[name="dept"]'),
      $location = $('select[name="location"]'),
      $status = $('select[name="status"]'),
      $select = $(".trainee-filter select"),
      $viewAll = $("#rf-view-all");

  var $departments = [],
      $locations = [];

  function showAll() {
      $dept.prop("selectedIndex", 0);
      $location.prop("selectedIndex", 0);
      $status.prop("selectedIndex", 0);
      $trainees.show().removeClass('selected third');
      $traineeGrid.removeClass('filtered');
  }
  function filterItems() {
      var $activeClass = "";

      if ($location.val() !== "*") {
          $activeClass += $location.val();
      }
      if ($dept.val() !== "*") {
          $activeClass += $dept.val();
      }
      if ($status.val() !== "*") {
          $activeClass += $status.val();
      }

      if ($activeClass !== "") {
          $trainees.hide().removeClass('selected').removeClass('third');
          $traineeGrid.addClass('filtered').find($activeClass).show().addClass('selected').filter(function (index, element) {
              return index % 3 == 2;
          }).addClass("third");
      } else {
          showAll();
      }
  }

  // Build array of items to generate options for Select Menus
  $.each($trainees, function () {
      var $d = $(this).attr("data-dept"),
          $l = $(this).attr("data-location");

      if (!$(this).hasClass('.current-trainee')) {
          $(this).addClass('alumni');
      }
      if ($.inArray($d, $departments) === -1 && $d !== "") {
          $departments.push($d);
      }
      if ($.inArray($l, $locations) === -1 && $l !== "") {
          $locations.push($l);
      }
  });

  // Order Items Alphabetically within array
  $departments.sort();
  $locations.sort();

  // Build Department/Subpeciality options
  for (var z = 0; z < $departments.length; z++) {
      var $class = $departments[z].toLowerCase();
      $class = $class.replace(/\s/g, "-").replace("-&-", "-");

      $dept.append(
          '<option value=".dept-' + $class + '">' + $departments[z] + "</option>"
      );
  }

  // Build Locations Options
  for (var l = 0; l < $locations.length; l++) {
      var $loc = $locations[l]
          .toLowerCase()
          .replace(",", "")
          .replace(/(\s)/g, "-");

      $location.append(
          '<option value=".loc-' + $loc + '">' + $locations[l] + "</option>"
      );
  }

  // Trigger Changes
  $select.on("change", function () {
      filterItems();
  });

  $viewAll.on("click", function (e) {
      e.preventDefault();
      showAll();
  });
})(jQuery);