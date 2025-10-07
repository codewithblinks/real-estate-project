document.addEventListener("DOMContentLoaded", () => {
  let submenu = $("#subMenu");
  let isOpen = false;

  // Submenu toggle
  $("#subMenuView").click(function () {
    if (isOpen) {
      gsap.to(submenu, { 
        height: 0, opacity: 0, duration: 0.3, 
        onComplete: () => submenu.css("display", "none") 
      });
      $("#menu-icon").removeClass("open");
      isOpen = false;
    } else {
      submenu.css({ display: "block", height: "auto", opacity: 1 });
      let fullHeight = submenu[0].scrollHeight;
      submenu.css({ height: 0, opacity: 0 });

      gsap.to(submenu, { 
        height: fullHeight, opacity: 1, duration: 0.3, 
        clearProps: "height"
      });

      $("#menu-icon").addClass("open");
      isOpen = true;
    }
  });

  // Search modal toggle
  $("#searchTrigger").click(() => {
    $("#searchModal").removeClass("hidden").addClass("flex");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".modal-content, #searchTrigger").length) {
      $("#searchModal").addClass("hidden").removeClass("flex");
    }
  });

  // Tabs
  $(".tab-btn").on("click", function () {
    let index = $(this).parent().index();
    let widthPercent = 100 / $(".tab-btn").length;
    $("#tab-indicator").css("left", index * widthPercent + "%");

    $(".tab-btn").removeClass("active text-[rgb(234,139,97)]");
    $(this).addClass("active text-[rgb(234,139,97)]");

    $(".tab-content").addClass("hidden");
    $("#" + $(this).data("tab")).removeClass("hidden");
  });

  // Load more
  $('#loadMore').on('click', function () {
    $('.hiddenImage').removeClass('hidden');
    $('#loadMore').addClass('hidden');
  });

  // Clock
  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    document.getElementById("clock").textContent = time;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Lenis smooth scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
});
