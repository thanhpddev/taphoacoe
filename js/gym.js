document.addEventListener("DOMContentLoaded", function () {
  const allButtons = document.querySelectorAll(".btn-acc");

  allButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const currentContent = this.nextElementSibling;
      const isOpen = this.classList.contains("open");

      // --- BƯỚC 1: ĐÓNG CÁC CÁI ĐANG MỞ ---
      allButtons.forEach((otherBtn) => {
        if (otherBtn.classList.contains("open")) {
          const otherContent = otherBtn.nextElementSibling;

          // Lấy chiều cao hiện tại (thay vì auto) để transition có điểm bắt đầu
          otherContent.style.height = otherContent.scrollHeight + "px";

          // Force Reflow: Ép trình duyệt ghi nhận chiều cao trước khi đóng
          otherContent.offsetHeight;

          otherContent.style.height = "0px";
          otherBtn.classList.remove("open");

          // Ẩn display sau khi animation kết thúc
          setTimeout(() => {
            if (otherContent.style.height === "0px") {
              otherContent.style.display = "none";
            }
          }, 400);
        }
      });

      // --- BƯỚC 2: MỞ CÁI ĐƯỢC CLICK (Nếu lúc đầu nó đang đóng) ---
      if (!isOpen) {
        currentContent.style.display = "block";
        const fullHeight = currentContent.scrollHeight + "px";

        // Đảm bảo bắt đầu từ 0
        currentContent.style.height = "0px";

        // Force Reflow
        currentContent.offsetHeight;

        this.classList.add("open");
        currentContent.style.height = fullHeight;

        // Sau khi mở xong, trả về auto để nội dung linh hoạt
        setTimeout(() => {
          if (this.classList.contains("open")) {
            currentContent.style.height = "auto";
          }
        }, 400);
      }
    });
  });
});

//video
// Chỉ cho phép 1 video chạy cùng lúc
document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".video video");
  let currentPlaying = null; // Video đang chạy

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          // Nếu có video khác đang chạy → tắt nó
          if (currentPlaying && currentPlaying !== video) {
            currentPlaying.pause();
          }

          // Play video hiện tại
          video.play().catch(() => {});
          currentPlaying = video;
        } else {
          // Nếu video đang chạy mà ra khỏi viewport → pause
          if (currentPlaying === video) {
            video.pause();
            currentPlaying = null;
          }
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "0px 0px -100px 0px",
    },
  );

  videos.forEach((video) => {
    observer.observe(video);

    // Click / Touch để play/pause thủ công
    const togglePlay = () => {
      if (video.paused) {
        // Tắt video đang chạy khác
        if (currentPlaying && currentPlaying !== video) {
          currentPlaying.pause();
        }
        video.play();
        currentPlaying = video;
      } else {
        video.pause();
        if (currentPlaying === video) currentPlaying = null;
      }
    };

    video.addEventListener("click", togglePlay);
    video.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        togglePlay();
      },
      { passive: false },
    );
  });
});
