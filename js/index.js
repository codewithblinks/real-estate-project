document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  let submenu = $("#subMenu");
  let isOpen = false; // track state

  $("#subMenuView").click(function () {
    if (isOpen) {
      // Animate closing
      gsap.to(submenu, { 
        height: 0, 
        opacity: 0, 
        duration: 0.3, 
        onComplete: () => submenu.css("display", "none") 
      });
      $("#menu-icon").removeClass("open");
      isOpen = false;
    } else {
      // Prepare submenu
      submenu.css({ display: "block", height: "auto", opacity: 1 });
      let fullHeight = submenu[0].scrollHeight;

      // Reset to collapsed before animating open
      submenu.css({ height: 0, opacity: 0 });

      gsap.to(submenu, { 
        height: fullHeight, 
        opacity: 1, 
        duration: 0.3, 
        clearProps: "height" // let it auto-adjust after animation
      });

      $("#menu-icon").addClass("open");
      isOpen = true;
    }
  });


  //Search modal toggle
  $("#searchTrigger").click(() => {
    $("#searchModal").removeClass("hidden").addClass('flex');
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".modal-content, #searchTrigger").length) {
      $("#searchModal").addClass("hidden");
    }
  });
  
  // tab
    $(".tab-btn").on("click", function () {
      let index = $(this).parent().index(); // which tab was clicked?
      let widthPercent = 100 / $(".tab-btn").length; // equally divide
  
      // Move indicator
      $("#tab-indicator").css("left", index * widthPercent + "%");
  
      // Update active tab styling
      $(".tab-btn").removeClass("active text-[rgb(234,139,97)]");
      $(this).addClass("active text-[rgb(234,139,97)]");
  
      // Toggle content
      $(".tab-content").addClass("hidden");
      $("#" + $(this).data("tab")).removeClass("hidden");
    });

    $('#loadMore').on('click', function () {
      $('.hiddenImage').removeClass('hidden');
      $('#loadMore').addClass('hidden');
    })

    function updateClock() {
      const now = new Date();
      const time = now.toLocaleTimeString(); // e.g. "9:35:22 AM"
      document.getElementById("clock").textContent = time;
    }

    setInterval(updateClock, 1000);
    updateClock();
});
