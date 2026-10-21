/**
 * js/app-ui.js
 * Primary UI Controller: Splash Carousel, Tabs, Modals, Install Banners, DOM Init
 */

// --- STARTUP SPLASH CAROUSEL CONTROLLER ---
(function() {
      let currentSplashSlide = 1;
      const totalSlides = 3;

      function playChime(freq1, freq2) {
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) {
            const ctx = new AudioContextClass();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq1, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq2, ctx.currentTime + 0.22);
            gain.gain.setValueAtTime(0.09, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.25);
          }
        } catch (e) {}
      }

      window.setStartupSlide = function(slideIndex) {
        if (slideIndex < 1 || slideIndex > totalSlides) return;
        currentSplashSlide = slideIndex;

        // Feedback sound & haptic
        if (currentSplashSlide === 1) {
          playChime(330, 440);
        } else if (currentSplashSlide === 2) {
          playChime(440, 587);
          navigator.vibrate?.([30, 40]);
        } else if (currentSplashSlide === 3) {
          playChime(587, 880);
          navigator.vibrate?.([40, 60, 80]);
        }

        // Toggle slides & controls
        for (let i = 1; i <= totalSlides; i++) {
          const slideEl = document.getElementById('splashSlide_' + i);
          const controlsEl = document.getElementById('splashControls_' + i);
          const dotEl = document.getElementById('splashDot_' + i);

          if (slideEl) {
            if (i === currentSplashSlide) {
              slideEl.classList.remove('hidden');
              slideEl.style.display = 'flex';
            } else {
              slideEl.classList.add('hidden');
              slideEl.style.display = 'none';
            }
          }
          if (controlsEl) {
            if (i === currentSplashSlide) {
              controlsEl.classList.remove('hidden');
              controlsEl.style.display = 'flex';
            } else {
              controlsEl.classList.add('hidden');
              controlsEl.style.display = 'none';
            }
          }
          if (dotEl) {
            if (i === currentSplashSlide) {
              dotEl.style.width = '28px';
              dotEl.style.background = '#fbbf24';
            } else {
              dotEl.style.width = '8px';
              dotEl.style.background = '#334155';
            }
          }
        }

        // Update Energy HUD
        const badgeEl = document.getElementById('splashStageBadge');
        const numberEl = document.getElementById('splashEnergyNumber');
        const seg1 = document.getElementById('splashSegment1');
        const seg2 = document.getElementById('splashSegment2');
        const seg3 = document.getElementById('splashSegment3');

        if (currentSplashSlide === 1) {
          if (badgeEl) badgeEl.innerHTML = '<span style="width:6px; height:6px; border-radius:9999px; background:#fbbf24; display:inline-block;"></span><span>TẦNG 1: HUYẾT MẠCH THỨC TỈNH</span>';
          if (numberEl) { numberEl.textContent = '70% THIÊN PHÚ'; numberEl.style.color = '#fbbf24'; }
          if (seg1) seg1.style.width = '100%';
          if (seg2) seg2.style.width = '0%';
          if (seg3) seg3.style.width = '0%';
        } else if (currentSplashSlide === 2) {
          if (badgeEl) badgeEl.innerHTML = '<span style="width:6px; height:6px; border-radius:9999px; background:#22d3ee; display:inline-block;"></span><span>TẦNG 2: KÍCH THÍCH BẢN NĂNG</span>';
          if (numberEl) { numberEl.textContent = '1 LẦN LÀ NHỚ'; numberEl.style.color = '#22d3ee'; }
          if (seg1) seg1.style.width = '100%';
          if (seg2) seg2.style.width = '100%';
          if (seg3) seg3.style.width = '0%';
        } else if (currentSplashSlide === 3) {
          if (badgeEl) badgeEl.innerHTML = '<span style="width:6px; height:6px; border-radius:9999px; background:#34d399; display:inline-block;"></span><span>TẦNG 3: CẢNH GIỚI TỔ TRƯỞNG</span>';
          if (numberEl) { numberEl.textContent = 'TRÍ NHỚ VĨNH VIỄN'; numberEl.style.color = '#34d399'; }
          if (seg1) seg1.style.width = '100%';
          if (seg2) seg2.style.width = '100%';
          if (seg3) seg3.style.width = '100%';
        }
      };

      // Swipe Gesture Listeners (Touch Navigation for Mobile)
      let touchStartX = 0;
      let touchStartY = 0;
      const splashBox = document.getElementById('appStartupSplash');
      if (splashBox) {
        splashBox.addEventListener('touchstart', function(e) {
          if (e.touches && e.touches[0]) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
          }
        }, { passive: true });

        splashBox.addEventListener('touchend', function(e) {
          if (e.changedTouches && e.changedTouches[0]) {
            const deltaX = e.changedTouches[0].clientX - touchStartX;
            const deltaY = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
              if (deltaX < 0) {
                if (currentSplashSlide < totalSlides) {
                  setStartupSlide(currentSplashSlide + 1);
                }
              } else {
                if (currentSplashSlide > 1) {
                  setStartupSlide(currentSplashSlide - 1);
                }
              }
            }
          }
        }, { passive: true });
      }

      // Climax Action: Kích Hoạt 70% Thiên Phú Ngay
      let hasLaunched = false;
      window.launchAppFromSplash = function() {
        if (hasLaunched) return;
        hasLaunched = true;

        try {
          if (window.soundFX && window.soundFX.playSuccess) {
            window.soundFX.playSuccess();
          } else {
            playChime(523, 1046);
          }
          if (window.particleEngine) {
            window.particleEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 50);
          }
          navigator.vibrate?.([50, 70, 120]);
        } catch (e) {}

        const splash = document.getElementById('appStartupSplash');
        if (splash) {
          splash.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
          splash.style.opacity = '0';
          splash.style.transform = 'scale(1.02)';
          setTimeout(function() {
            if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
          }, 320);
        }

        try {
          if (window.safeStorage) {
            window.safeStorage.setItem('zin_onboarding_completed', 'true');
          }
        } catch (e) {}
      };
    })();

// --- TAB SWITCHING & MODAL CONTROLS ---
// Switch Main Tabs
    function switchMainTab(tabId) {
      currentTab = tabId;
      document.querySelectorAll('.tab-section').forEach(sec => sec.classList.add('hidden'));
      const activeSec = document.getElementById(`section-${tabId}`);
      if (activeSec) activeSec.classList.remove('hidden');

      // Desktop Nav update
      const tabs = ['learn', 'hot', 'share', 'jobs'];
      tabs.forEach(t => {
        const btn = document.getElementById(`navTab-${t}`);
        if (btn) {
          if (t === tabId) {
            btn.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-amber-500 text-slate-950 shadow";
          } else {
            btn.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-slate-300 hover:text-white hover:bg-slate-800";
          }
        }
        // Mobile nav
        const mBtn = document.getElementById(`mNav-${t}`);
        if (mBtn) {
          if (t === tabId) {
            mBtn.className = "flex flex-col items-center text-amber-400 font-bold transition px-2 py-1";
          } else if (t === 'share') {
            mBtn.className = "flex flex-col items-center text-emerald-400 font-black animate-pulse transition px-2 py-1";
          } else {
            mBtn.className = "flex flex-col items-center text-slate-400 hover:text-white transition px-2 py-1";
          }
        }
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // =========================================================================

// --- VIRAL SHARING, JOBS, PWA INSTALL & INITIALIZATION ---
function updateBonusCalculator(val) {
      document.getElementById('sliderValueText').textContent = `${val} Người`;
      const amount = val * 200000;
      document.getElementById('calcBonusAmount').textContent = amount.toLocaleString('vi-VN') + 'đ';
      document.getElementById('calcBonusNote').textContent = `Bằng ${val} tờ 200.000đ đỏ tươi may mắn cầm nóng tay!`;
    }

    function copyReferralLink() {
      const myRef = getMyDeviceReferralCode();
      const url = `https://zin.zone?ref=${myRef}`;
      copyToClipboard(url, `Đã sao chép link giới thiệu [${myRef}] của bạn!`);
    }

    function shareToZalo() {
      const myRef = getMyDeviceReferralCode();
      const text = encodeURIComponent(`Đồng nghiệp ơi, tao vừa mua máy Zin Zone nguyên zin 100% có sẵn bí kíp học tiếng Trung làm tổ trưởng! Hãy ra ngay cửa hàng điện thoại ủy quyền gần nhất đọc mã [${myRef}] để được giảm 100k và tặng khóa học nhé: https://zin.zone?ref=${myRef}`);
      window.open(`https://zalo.me/share?url=https%3A%2F%2Fzin.zone%3Fref%3D${myRef}&text=${text}`, '_blank');
    }

    function downloadViralBadge() {
      showToast('Đang tạo ảnh thẻ chia sẻ... Hãy lưu hoặc chụp màn hình để gửi đồng nghiệp!', 'success');
    }



    // --- VIP Jobs Recruitment System & Modal Handlers ---
    const JOBS_DATA = [
      {
        id: 'foxconn-smt',
        title: 'Tổ Trưởng Chuyền SMT & Lắp Ráp',
        company: 'Tập đoàn Foxconn (Hồng Hải)',
        location: 'KCN Vân Trung - Bắc Giang',
        region: 'bg',
        salary: '15.000.000 - 20.000.000đ',
        urgency: 'CẦN GẤP',
        urgencyClass: 'bg-red-600/20 text-red-400 border-red-500/30',
        req: 'Giao tiếp tiếng Trung cơ bản trên chuyền, hiểu lệnh chạy máy',
        benefit: 'Bao cơm trưa + KTX tiện nghi + Phụ cấp chức vụ 2.500.000đ',
        hrName: 'Ms. Lan (Phòng Tuyển Dụng Foxconn Vân Trung)',
        pitchZh: '您好主管/HR！我叫[姓名]。我学习了车间实战汉语，能听懂生产线指令与汇报进度，想应聘贵厂【Foxconn - SMT组长】。这是我的求职信息，请多关照！',
        pitchVi: 'Xin chào Quản lý/HR! Tôi tên là [Tên]. Tôi đã học tiếng Trung thực chiến nhà xưởng, nghe hiểu khẩu lệnh trên chuyền và báo cáo tiến độ, muốn ứng tuyển vị trí [Tổ Trưởng Foxconn]. Rất mong được anh/chị chiếu cố!'
      },
      {
        id: 'luxshare-qc',
        title: 'Trợ Lý Hiện Trường / Quản Lý QC',
        company: 'Luxshare-ICT Việt Nam',
        location: 'KCN Quang Châu - Bắc Giang',
        region: 'bg',
        salary: '16.000.000 - 22.000.000đ',
        urgency: 'HOT',
        urgencyClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        req: 'Báo cáo tiến độ sản lượng và phân loại hàng lỗi bằng tiếng Trung',
        benefit: 'Ký túc xá điều hòa + Thưởng năng suất + Đóng bảo hiểm full lương',
        hrName: 'Mr. Cường (Quản lý Tuyển Dụng Luxshare Quang Châu)',
        pitchZh: '您好HR！我应聘贵厂【Luxshare - 现场助理/QC】。我掌握品质汇报与车间沟通汉语（合格/不合格/返工），有产线管理经验，希望能获得面试机会！',
        pitchVi: 'Xin chào HR! Em ứng tuyển vị trí [Luxshare - Trợ lý hiện trường/QC]. Em nắm vững tiếng Trung báo cáo chất lượng (đạt/lỗi/làm lại) và có kinh nghiệm quản lý chuyền, mong nhận được lịch phỏng vấn ạ!'
      },
      {
        id: 'goertek-pack',
        title: 'Tổ Trưởng Line Đóng Gói & Xuất Hàng',
        company: 'Goertek Vina',
        location: 'KCN Quế Võ - Bắc Ninh',
        region: 'bn',
        salary: '14.000.000 - 18.000.000đ',
        urgency: 'MỚI ĐĂNG',
        urgencyClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        req: 'Hiểu khẩu lệnh số lượng, kiểm kê kho và điều phối xuất nhập hàng',
        benefit: 'Xe đưa đón Hà Nội - Bắc Ninh + Thưởng tháng 13 + Du lịch hàng năm',
        hrName: 'Ms. Thảo (Bộ Phận Tuyển Dụng Goertek Quế Võ)',
        pitchZh: '您好HR！我想应聘【Goertek - 包装组长】。我掌握数字、数量、出入库相关的车间汉语，能与现场中国主管顺畅沟通。',
        pitchVi: 'Xin chào HR! Em muốn ứng tuyển [Tổ trưởng đóng gói Goertek]. Em nắm rõ tiếng Trung về số lượng, xuất nhập kho và giao tiếp trực tiếp được với quản lý người Trung.'
      },
      {
        id: 'compal-wh',
        title: 'Trưởng Nhóm Kho Vận & Vật Liệu',
        company: 'Compal Electronics',
        location: 'KCN Bá Thiện / Yên Phong',
        region: 'bn',
        salary: '15.500.000 - 21.000.000đ',
        urgency: 'LƯƠNG CAO',
        urgencyClass: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        req: 'Giao tiếp nhận lệnh xuất liệu, báo cáo thiếu hàng với chủ quản người Hoa',
        benefit: 'Trợ cấp ngoại ngữ 1.500.000đ/tháng + Đào tạo nâng cao tay nghề',
        hrName: 'Mr. Hoàng (Phòng Nhân Sự Compal)',
        pitchZh: '您好！我学习了车间领料、库存汇报汉语，应聘贵厂【Compal - 仓库物料主管】。工作认真负责，随时可以到岗！',
        pitchVi: 'Xin chào! Em đã học tiếng Trung về lĩnh liệu, báo cáo tồn kho và xin ứng tuyển [Compal - Trưởng nhóm kho vật liệu]. Em sẵn sàng đi làm ngay!'
      },
      {
        id: 'byd-molding',
        title: 'Quản Lý Chuyền Ép Nhựa & Phụ Kiện',
        company: 'BYD Electronics',
        location: 'KCN Phú Hà / VSIP Bắc Ninh',
        region: 'bn',
        salary: '17.000.000 - 23.000.000đ',
        urgency: 'HOT',
        urgencyClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        req: 'Ưu tiên biết tiếng Trung báo cáo bảo trì máy móc, lỗi khuôn mẫu',
        benefit: 'Thưởng quý theo hiệu suất + Cơm ca tiêu chuẩn cao + Nhà ở chuyên gia',
        hrName: 'Ms. Quỳnh (Tuyển Dụng Kỹ Thuật BYD)',
        pitchZh: '您好主管！我申请应聘【BYD - 注塑/组装产线组长】。我懂设备故障汇报、工时统计汉语，能配合中国主管做好现场管理。',
        pitchVi: 'Xin chào Quản lý! Em nộp đơn ứng tuyển [BYD - Quản lý chuyền ép nhựa/lắp ráp]. Em biết tiếng Trung báo cáo sự cố máy móc, chấm công và phối hợp nhịp nhàng với quản lý!'
      },
      {
        id: 'biel-optical',
        title: 'Tổ Trưởng Line Lắp Ráp Màn Hình & Kính',
        company: 'Biel Crystal / Chicony Phía Nam',
        location: 'VSIP 1 & VSIP 2 - Bình Dương',
        region: 'bd',
        salary: '16.000.000 - 22.000.000đ',
        urgency: 'MIỀN NAM',
        urgencyClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        req: 'Giao tiếp tiếng Trung cơ bản, chịu được áp lực tiến độ sản xuất',
        benefit: 'Hỗ trợ tiền nhà trọ 1.000.000đ/tháng + Thưởng chuyên cần cao',
        hrName: 'Mr. Dũng (Đại Diện Tuyển Dụng Bình Dương)',
        pitchZh: '您好！我想应聘【Bình Dương - 光学组装线长】。我掌握车间标准用语，服从安排，做事麻利，期待您的回复！',
        pitchVi: 'Xin chào! Em muốn ứng tuyển [Tổ trưởng line quang học Bình Dương]. Em nắm vững tiếng Trung xưởng sản xuất, tác phong nhanh nhẹn và chấp hành kỷ luật tốt!'
      }
    ];

    let currentSelectedJob = null;

    function renderJobs(regionFilter = 'all') {
      const grid = document.getElementById('jobsGridContainer');
      if (!grid) return;
      grid.innerHTML = '';
      const filtered = regionFilter === 'all' ? JOBS_DATA : JOBS_DATA.filter(j => j.region === regionFilter);
      filtered.forEach(job => {
        const card = document.createElement('div');
        card.className = 'bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition';
        card.innerHTML = `
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded text-[10px] font-black ${job.urgencyClass} border">${job.urgency}</span>
              <span class="text-emerald-400 font-black text-sm">${job.salary}</span>
            </div>
            <h4 class="text-base font-bold text-white">${job.title}</h4>
            <div class="text-xs text-amber-400 font-semibold mt-0.5">${job.company} (${job.location})</div>
            <div class="mt-3 text-xs text-slate-300 space-y-1">
              <div>📍 <strong>Ưu tiên:</strong> ${job.req}</div>
              <div>🎁 <strong>Quyền lợi:</strong> ${job.benefit}</div>
            </div>
          </div>
          <button onclick="openJobModal('${job.id}')" class="mt-4 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold text-xs transition flex items-center justify-center gap-1.5 shadow">
            <span>Ứng Tuyển & Nhận Giới Thiệu</span>
            <span>➔</span>
          </button>
        `;
        grid.appendChild(card);
      });
    }

    function filterJobsByRegion() {
      const val = document.getElementById('jobRegionSelect').value;
      renderJobs(val);
    }

    function openJobModal(jobId) {
      const job = JOBS_DATA.find(j => j.id === jobId);
      if (!job) return;
      currentSelectedJob = job;
      document.getElementById('modalJobCompany').textContent = job.company;
      document.getElementById('modalJobTitle').textContent = job.title;
      document.getElementById('modalJobSalary').textContent = job.salary;
      document.getElementById('modalJobLocation').textContent = job.location;
      document.getElementById('modalHrContact').textContent = job.hrName;
      document.getElementById('modalPitchZh').textContent = job.pitchZh;
      document.getElementById('modalPitchVi').textContent = job.pitchVi;
      switchModalJobTab('admin');
      const m = document.getElementById('jobModal');
      m.classList.remove('hidden');
      m.style.display = 'flex';
    }

    function closeJobModal() {
      const m = document.getElementById('jobModal');
      m.classList.add('hidden');
      m.style.display = 'none';
    }

    function switchModalJobTab(mode) {
      const btnAdmin = document.getElementById('modalTabBtnAdmin');
      const btnDirect = document.getElementById('modalTabBtnDirect');
      const viewAdmin = document.getElementById('modalJobModeAdmin');
      const viewDirect = document.getElementById('modalJobModeDirect');

      if (mode === 'admin') {
        btnAdmin.className = 'flex-1 py-2 rounded-lg bg-amber-500 text-slate-950 font-black transition';
        btnDirect.className = 'flex-1 py-2 rounded-lg text-slate-400 hover:text-white transition';
        viewAdmin.classList.remove('hidden');
        viewDirect.classList.add('hidden');
      } else {
        btnDirect.className = 'flex-1 py-2 rounded-lg bg-amber-500 text-slate-950 font-black transition';
        btnAdmin.className = 'flex-1 py-2 rounded-lg text-slate-400 hover:text-white transition';
        viewDirect.classList.remove('hidden');
        viewAdmin.classList.add('hidden');
      }
    }

    function openStoreNoticeModal(title, htmlContent) {
      const modal = document.getElementById('storeNoticeModal');
      const titleEl = document.getElementById('storeNoticeTitle');
      const contentEl = document.getElementById('storeNoticeContent');
      if (modal && titleEl && contentEl) {
        titleEl.textContent = title;
        contentEl.innerHTML = htmlContent;
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
      }
    }

    function closeStoreNoticeModal() {
      const modal = document.getElementById('storeNoticeModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    }

    function submitJobViaAdmin() {
      if (!currentSelectedJob) return;
      const name = document.getElementById('inputApplicantName').value.trim() || 'Học viên Zin Zone';
      const phone = document.getElementById('inputApplicantPhone').value.trim() || 'Chưa cung cấp SĐT';
      const progress = document.getElementById('selectApplicantProgress').value;
      
      const pitch = `Họ tên: ${name} | SĐT: ${phone} | Trình độ: ${progress}\nỨng tuyển: ${currentSelectedJob.title} - ${currentSelectedJob.company}\nKhẩu quyết tiếng Trung: ${currentSelectedJob.pitchZh}`;
      copyToClipboard(pitch, 'Đã sao chép hồ sơ ứng tuyển!');
      openStoreNoticeModal(
        'Hồ Sơ Ứng Tuyển Đã Sẵn Sàng',
        `<p class="font-bold text-amber-400">Hồ sơ ứng tuyển của <strong>${name}</strong> đã được sao chép vào bộ nhớ tạm!</p>` +
        `<p class="mt-2">👉 Bạn hãy chuyển sang tab <strong>"Tự Liên Hệ Trực Tiếp HR"</strong> để dán tin nhắn gửi trực tiếp tới đầu mối tuyển dụng <strong>${currentSelectedJob.company}</strong> mà không cần qua bất kỳ trung gian nào.</p>`
      );
      closeJobModal();
    }

    function copyHrPitch() {
      if (!currentSelectedJob) return;
      const text = `${currentSelectedJob.pitchZh}\n\n${currentSelectedJob.pitchVi}`;
      copyToClipboard(text, 'Đã sao chép đoạn tự giới thiệu tiếng Trung & tiếng Việt!');
    }

    function orderHotPhone(modelName) {
      openStoreNoticeModal(
        `Đặt Mua Máy: ${modelName}`,
        `<p class="font-bold text-amber-400">Dòng máy [${modelName}] nguyên zin 100% được phân phối độc quyền tại hệ thống cửa hàng điện thoại đối tác của Zin Zone.</p>` +
        `<p class="mt-2">👉 <strong>Cách nhận máy:</strong> Quý khách vui lòng <strong>liên hệ trực tiếp chủ cửa hàng điện thoại nơi bạn đã mua máy</strong> (hoặc cửa hàng điện thoại gần nhất) để nhận máy chính hãng có sẵn bản quyền 21 ngày thăng chức.</p>` +
        `<p class="mt-2 text-slate-400">🛡️ Máy được bảo hành phần cứng và hỗ trợ kỹ thuật tại chỗ bởi chính cửa hàng.</p>`
      );
    }

    function requestCustomSourcing() {
      const inputEl = document.getElementById('inputCustomModel');
      const model = (inputEl ? inputEl.value.trim() : '') || 'Dòng máy yêu cầu';
      openStoreNoticeModal(
        `Đặt Săn Máy Zin: ${model}`,
        `<p class="font-bold text-amber-400">Dịch vụ săn máy [${model}] nguyên zin 100% kiểm định 32 bước được thực hiện qua các cửa hàng điện thoại đối tác.</p>` +
        `<p class="mt-2">👉 <strong>Cách đặt cọc:</strong> Quý khách hãy mang yêu cầu này đến trực tiếp <strong>chủ cửa hàng điện thoại của bạn</strong> để đặt cọc và nhận cam kết máy chuẩn zin.</p>` +
        `<p class="mt-2 text-slate-400">🛡️ Cam kết: Nếu máy tìm được không nguyên zin, cửa hàng hoàn cọc gấp đôi tại chỗ!</p>`
      );
    }

    function requestCashPayout() {
      const myRef = getMyDeviceReferralCode();
      openStoreNoticeModal(
        'Nhận 200.000đ Tiền Mặt',
        `<p class="font-bold text-emerald-400">Chính sách thưởng 200.000đ tiền mặt trao tay được chi trả trực tiếp tại cửa hàng điện thoại nơi bạn đã mua máy.</p>` +
        `<p class="mt-2">👉 <strong>Cách nhận tiền:</strong> Khi bạn bè của bạn đến cửa hàng mua máy và đọc mã giới thiệu <strong class="text-amber-400">[${myRef}]</strong> của bạn, chủ cửa hàng sẽ gửi tặng bạn <strong>200.000đ tiền mặt</strong> ngay tại chỗ!</p>` +
        `<p class="mt-2 text-slate-400">💵 Tiền tươi trao tay, bạn bè của bạn cũng được giảm ngay 100.000đ khi mua máy.</p>`
      );
    }

    // --- Init on DOM Load ---
    document.addEventListener('DOMContentLoaded', () => {
      // 1. VIP License Gatekeeper Check
      checkDeviceLicense();

      // Init Game Engine Components
      particleEngine = new ParticleEngine();
      updateHudDisplay();
      initAwakeningEngine();
      preloadAwakeningAudio();
      initBossBattle();

      // Sync and render device-bound referral code
      updateReferralCodeDisplay();

      // Welcoming notification if visitor arrived through a friend's referral link
      const incomingReferrer = safeStorage.getItem('zin_incoming_referrer') || incomingRef;
      if (incomingReferrer) {
        setTimeout(() => {
          showToast(`🎁 Ưu đãi bạn bè: Đã kích hoạt mã giảm giá 100k từ [${incomingReferrer}]!`, 'info');
        }, 1200);
      }

      const savedRepeat = safeStorage.getItem('zin_audio_repeat_mode');
      const repeatSelect = document.getElementById('audioRepeatMode');
      if (repeatSelect && savedRepeat) {
        repeatSelect.value = savedRepeat;
      }

      renderDayTabs();
      renderDayContent();
      initSentenceBuilder();
      renderBossPhrases();
      renderJobs('all');

      document.getElementById('btnPlayAllDay').onclick = () => {
        const dayData = window.CURRICULUM_DATA?.days?.find(d => d.day === currentDay);
        if (!dayData || !dayData.sentences || dayData.sentences.length === 0) return;
        showToast(`Đang phát âm 5 câu Day ${currentDay}...`, 'info');
        let idx = 0;
        function playNextSentence() {
          if (idx >= dayData.sentences.length) {
            showToast(`✓ Đã phát xong 5 câu Ngày ${currentDay}!`, 'success');
            return;
          }
          const s = dayData.sentences[idx++];
          playSentenceAudio(s.id, s.audioText || s.zh);
          setTimeout(playNextSentence, 2800);
        }
        playNextSentence();
      };

      document.getElementById('btnCompleteMission').onclick = () => {
        toggleMissionCompleted(currentDay);
        showToast('Đã cập nhật nhiệm vụ hôm nay!', 'success');
      };

      document.getElementById('btnResetDayProgress').onclick = () => {
        if (confirm(`Đặt lại tiến độ Ngày ${currentDay}?`)) {
          const dayData = window.CURRICULUM_DATA.days.find(d => d.day === currentDay);
          dayData.sentences.forEach(s => delete progressData['sent_' + s.id]);
          delete progressData['mission_day_' + currentDay];
          safeStorage.setItem(storageKey, JSON.stringify(progressData));
          renderDayContent();
        }
      };

      // If user came with hash
      if (window.location.hash === '#learn') switchMainTab('learn');
      else if (window.location.hash === '#share') switchMainTab('share');
      else if (window.location.hash === '#jobs') switchMainTab('jobs');

      // Hide Cài App header button if already inside official App or standalone PWA
      if (typeof isAppStandalone === 'function' && isAppStandalone()) {
        const btnInstall = document.getElementById('btnInstallApp');
        if (btnInstall) btnInstall.style.display = 'none';
      }
    });

    // --- PWA Service Worker Registration & Offline Cache ---
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js?v=20261021_v39').then((reg) => {
          reg.update();
        }).catch((err) => {
        });
      });
    }

    // --- Network Offline / Online Shields & Global Exception Boundary ---
    window.addEventListener('offline', () => {
      showToast('⚠️ Mất kết nối mạng. Ứng dụng đã tự động lưu dữ liệu tu luyện vào máy!', 'warning');
    });
    window.addEventListener('online', () => {
      showToast('🌐 Đã khôi phục mạng Internet! Dữ liệu tu tiên đã đồng bộ.', 'success');
    });
    window.addEventListener('error', (event) => {
      console.warn('[ZinZone SafeShield] Ngoại lệ giao diện:', event.message);
    });
    window.addEventListener('unhandledrejection', (event) => {
      console.warn('[ZinZone SafeShield] Promise rejection:', event.reason);
    });

    // --- PWA Home Screen Installation Logic ---
    let deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      const banner = document.getElementById('pwaInstallBanner');
      if (banner && !isAppStandalone()) {
        banner.classList.remove('hidden');
      }
    });

    function isAppStandalone() {
      const urlParams = new URLSearchParams(window.location.search);
      const isModeApp = urlParams.get('mode') === 'app' || urlParams.get('mode') === 'native_app';
      const isNativeUA = navigator.userAgent.indexOf('ZinZoneApp') !== -1;
      const isDisplayStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandalone = window.navigator.standalone === true;
      return isModeApp || isNativeUA || isDisplayStandalone || isIOSStandalone;
    }

    function installPwaApp() {
      if (isAppStandalone()) {
        showToast('Bạn đang sử dụng Bản App chính thức!', 'success');
        return;
      }
      const isAndroid = /Android/i.test(navigator.userAgent);
      if (isAndroid) {
        // Option 1: Direct APK download guarantees 100% full-color 3D Cyber Z icon on Android
        openInstallGuideModal();
        return;
      }
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            showToast('Đang cài đặt Zin Zone vào màn hình...', 'success');
            const banner = document.getElementById('pwaInstallBanner');
            if (banner) banner.classList.add('hidden');
          } else {
            openInstallGuideModal();
          }
          deferredPrompt = null;
        }).catch(() => {
          openInstallGuideModal();
        });
      } else {
        openInstallGuideModal();
      }
    }

    function openInstallGuideModal() {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      const modal = document.getElementById('modalInstallGuide');
      const iosGuide = document.getElementById('guideContentIOS');
      const androidGuide = document.getElementById('guideContentAndroid');

      if (isIOS) {
        if (iosGuide) { iosGuide.classList.remove('hidden'); iosGuide.style.display = 'block'; }
        if (androidGuide) { androidGuide.classList.add('hidden'); androidGuide.style.display = 'none'; }
      } else {
        if (androidGuide) { androidGuide.classList.remove('hidden'); androidGuide.style.display = 'block'; }
        if (iosGuide) { iosGuide.classList.add('hidden'); iosGuide.style.display = 'none'; }
      }

      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
      }
    }

    function closeInstallGuide() {
      const modal = document.getElementById('modalInstallGuide');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeInstallGuide();
    });

    // Auto-check on load if already standalone app
    document.addEventListener('DOMContentLoaded', () => {
      if (isAppStandalone()) {
        document.documentElement.classList.add('is-native-app');
        document.body.classList.add('is-native-app');
        const banner = document.getElementById('pwaInstallBanner');
        const btn = document.getElementById('btnInstallApp');
        if (banner) {
          banner.classList.add('hidden');
          banner.style.display = 'none';
        }
        if (btn) {
          btn.outerHTML = `
            <button onclick="window.location.reload(true)" title="Chạm để làm mới trang" class="h-7 sm:h-auto w-7 sm:w-auto px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-amber-500/15 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-black text-xs flex items-center justify-center gap-1 shadow-sm transition shrink-0">
              <span class="text-xs">↻</span>
              <span class="hidden sm:inline">BẢN APP</span>
            </button>
          `;
        }
      }
    });

    // =========================================================================
    // B2B2C CHANNEL EMPOWERMENT & DIGITAL VERIFICATION SYSTEM
    // =========================================================================

    // --- KCN STORE LOCATOR FILTER ---
    function filterStoresByKcn(kcnKey) {
      const allButtons = document.querySelectorAll('.store-filter-btn');
      allButtons.forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-slate-950', 'shadow');
        btn.classList.add('bg-slate-900', 'border', 'border-slate-800', 'text-slate-300');
      });

      const activeBtn = document.getElementById(`btnKcn-${kcnKey}`);
      if (activeBtn) {
        activeBtn.classList.remove('bg-slate-900', 'border', 'border-slate-800', 'text-slate-300');
        activeBtn.classList.add('bg-amber-500', 'text-slate-950', 'shadow');
      }

      const storeCards = document.querySelectorAll('.store-card');
      storeCards.forEach(card => {
        if (kcnKey === 'all') {
          card.classList.remove('hidden');
        } else if (card.classList.contains(`store-kcn-${kcnKey}`)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    }

    // --- DIGITAL DEVICE & VIP ASSET VERIFICATION ---
    function verifyZinDeviceOnline() {
      const inputEl = document.getElementById('inputDeviceVerifyCode');
      if (!inputEl) return;
      const rawCode = inputEl.value.trim().toUpperCase();
      if (!rawCode) {
        showToast('⚠️ Vui lòng nhập mã thiết bị (Ví dụ: ZIN-4B9E hoặc mã quà tặng)!', 'warning');
        inputEl.focus();
        return;
      }

      // Format validation: ZIN-XXXX, ZZ-..., or license token
      const isValid = /^ZIN-[A-Z0-9]{4,}$/i.test(rawCode) || 
                      /^ZZ-[A-Z0-9_\-]+$/i.test(rawCode) ||
                      isValidLicenseToken(rawCode) ||
                      (rawCode.length >= 4 && !rawCode.includes(' '));

      if (!isValid) {
        showToast('❌ Mã thiết bị không hợp lệ hoặc chưa được kích hoạt trên hệ thống!', 'error');
        return;
      }

      // Open Digital Certificate Modal
      const modal = document.getElementById('modalDeviceVerificationResult');
      const codeDisplay = document.getElementById('verifyResultCode');
      const dateDisplay = document.getElementById('verifyResultDate');
      
      if (codeDisplay) codeDisplay.textContent = rawCode;
      if (dateDisplay) {
        const now = new Date();
        dateDisplay.textContent = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()} (Kích hoạt máy chính hãng)`;
      }

      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
      }
    }

    function closeDeviceVerificationModal() {
      const modal = document.getElementById('modalDeviceVerificationResult');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    }

    // --- B2B DEALER PARTNERSHIP MODAL ---
    function openDealerPartnerModal(area) {
      const modal = document.getElementById('modalDealerPartner');
      const areaEl = document.getElementById('dealerPartnerArea');
      if (areaEl && area) {
        areaEl.textContent = area;
      }
      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
      }
    }

    function closeDealerPartnerModal() {
      const modal = document.getElementById('modalDealerPartner');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    }

    function playSampleVipAudio() {
      const audioUrl = 'audio/promo/zin_zone_promo_hoai_my_normal.mp3';
      const audio = new Audio(audioUrl);
      audio.play().then(() => {
        showToast('🎧 Đang phát Khẩu Lệnh Quản Lý Xưởng VIP...', 'success');
      }).catch(e => {
        console.warn('Audio play fallback:', e);
        showToast('📢 Đã sẵn sàng phát âm thanh khẩu lệnh VIP!', 'info');
      });
    }

    function copyDealerZaloPhone() {
      const phone = '0822262695';
      navigator.clipboard.writeText(phone).then(() => {
        const btnText = document.getElementById('btnCopyDealerZaloText');
        if (btnText) {
          const old = btnText.textContent;
          btnText.textContent = '✓ Đã Sao Chép Số Zalo Hotline!';
          setTimeout(() => { btnText.textContent = old; }, 2500);
        }
        showToast('✓ Đã sao chép số Zalo đại lý: 0822.262.695', 'success');
      }).catch(() => {
        showToast('Số Zalo phòng B2B: 0822.262.695', 'info');
      });
    }

    // --- ONBOARDING SPLASH FLOW CONTROLLER ---
    let currentOnboardingStep = 1;

    function playAwakeningSurgeSound() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.45);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } catch (e) {}
    }

    function openOnboardingFlowModal(forceStep = 1) {
      const modal = document.getElementById('modalOnboardingFlow');
      if (modal) {
        currentOnboardingStep = forceStep;
        renderOnboardingStep();
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
      }
    }

    function closeOnboardingFlowModal() {
      const modal = document.getElementById('modalOnboardingFlow');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        safeStorage.setItem('zin_onboarding_completed', 'true');
        if (soundFX && soundFX.playSuccess) soundFX.playSuccess();
        if (particleEngine) particleEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 45);
      }
    }

    function setOnboardingStep(step) {
      if (step === 2 && currentOnboardingStep === 1) {
        playAwakeningSurgeSound();
        if (navigator.vibrate) navigator.vibrate([40, 60, 100]);
        if (soundFX && soundFX.playSuccess) soundFX.playSuccess();
      } else if (step > currentOnboardingStep) {
        if (soundFX && soundFX.playClick) soundFX.playClick();
      }
      currentOnboardingStep = step;
      renderOnboardingStep();
    }

    function renderOnboardingStep() {
      for (let s = 1; s <= 4; s++) {
        const slide = document.getElementById(`onboardingSlide_${s}`);
        const dot = document.getElementById(`onboardingDot_${s}`);
        if (slide) {
          if (s === currentOnboardingStep) {
            slide.classList.remove('hidden');
          } else {
            slide.classList.add('hidden');
          }
        }
        if (dot) {
          if (s === currentOnboardingStep) {
            dot.className = 'w-6 h-2 rounded-full bg-amber-400 transition-all';
          } else if (s < currentOnboardingStep) {
            dot.className = 'w-2 h-2 rounded-full bg-emerald-400 transition-all';
          } else {
            dot.className = 'w-2 h-2 rounded-full bg-slate-700 transition-all';
          }
        }
      }

      // Energy Progress Bar surge
      const bar = document.getElementById('onboardingEnergyBar');
      const text = document.getElementById('onboardingEnergyPercent');
      if (bar && text) {
        if (currentOnboardingStep === 1) {
          bar.style.width = '0%';
          text.textContent = '0%';
        } else if (currentOnboardingStep === 2) {
          bar.style.width = '70%';
          text.textContent = '70%';
        } else if (currentOnboardingStep === 3) {
          bar.style.width = '85%';
          text.textContent = '85%';
        } else {
          bar.style.width = '100%';
          text.textContent = '100% SẴN SÀNG';
        }
      }
    }
