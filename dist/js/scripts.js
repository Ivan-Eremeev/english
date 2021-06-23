$(document).ready(function () {
  // Анимация увеличения значения числа
	function countNumber(block) {
		block.each(function () {
			var scrollTop = false,
				countNumberStatus = true,
				$this = $(this),
				blockPosition = $this.position().top,
				valUp = $this.data('val-up'),
				valTo = $this.data('val-to'),
				valDuration = $this.data('duration');
			$this.html(0);
      gofunc();
			$(window).scroll(function () {
        gofunc();
			});
      function gofunc() {
        scrollTop = $(window).scrollTop() + $(window).height();
        if (scrollTop > blockPosition && countNumberStatus) {
          $({ numberValue: valUp }).animate({ numberValue: valTo }, {
            duration: valDuration,
            easing: "swing",
            step: function (val) {
              $this.html(Math.ceil(val));
            }
          });
          countNumberStatus = false;
        }
      }
		});
	};
	countNumber($(".count-number"));
});