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

  // Модальное окно
	function modal() {
		$('.modal-trigger').on('click', function(e) {
      e.preventDefault();
			var $this = $(this),
					data = $this.data('modal'),
					thisModal = $(data);
			modalShow(thisModal);
		});
	};
	// Открытие модального окна
	function modalShow(thisModal) {
		var modalClose = thisModal.find($('.modal__close'));
    thisModal.addClass('open');
		modalClose.on('click', function() {
			modalHide(thisModal);
		});
		thisModal.on('click', function(e) {
			if (thisModal.has(e.target).length === 0) {
				modalHide(thisModal);
			}
		});
	};
	// Закрытие модального окна
	function modalHide(thisModal) {
		thisModal.removeClass('open');
	};
	modal();

  // Maskedinput
  $("div[data-type=phone] input, div[plp-field=phone] input").mask("+9?999999999999", { placeholder: " " });
  $("div[data-type=phone] input").each(function () {
    if ($(this).attr('value')) $(this).attr('placeholder', $(this).attr('value'))
  })
  $("[plp-field=phone] input").change(function () {
    if ($(this).val() == '') $(this).closest('[plp-field=phone]').removeClass('is-filled'); else
      $(this).closest('[plp-field=phone]').addClass('is-filled')
  });
});