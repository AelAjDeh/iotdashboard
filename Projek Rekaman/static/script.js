// Toggle sidebar function
      document.getElementById('toggleBtn').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('collapsed');
      });

            // Mobile menu toggle
      document.getElementById('mobileToggle').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('mobile-visible');
        document.getElementById('mobileOverlay').classList.toggle('active');
      });

      // Close mobile menu when clicking overlay
      document.getElementById('mobileOverlay').addEventListener('click', function() {
        document.getElementById('sidebar').classList.remove('mobile-visible');
        document.getElementById('mobileOverlay').classList.remove('active');
      });

      // Function to toggle simple controls
      function toggleSimple(button) {
        if (button.classList.contains('off')) {
          button.classList.remove('off');
          button.classList.add('on');
          button.textContent = 'ON';
        } else {
          button.classList.remove('on');
          button.classList.add('off');
          button.textContent = 'OFF';
        }
      }

      // Initialize charts
      function initializeCharts() {
        const chartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: 'rgba(255, 255, 255, 0.7)'
              }
            },
            y: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: 'rgba(255, 255, 255, 0.7)'
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: 'rgba(255, 255, 255, 0.7)'
              }
            }
          }
        };

        const timeLabels = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

        // District A Chart
        const districtACtx = document.getElementById('districtAChart').getContext('2d');
        const districtAChart = new Chart(districtACtx, {
          type: 'line',
          data: {
            labels: timeLabels,
            datasets: [{
              label: 'Suhu (°C)',
              data: [30.2, 31.5, 32.8, 32.5, 31.9, 32.5],
              borderColor: '#3e95cd',
              tension: 0.3,
              fill: false
            }, {
              label: 'Kelembapan (%)',
              data: [60, 58, 62, 65, 67, 65],
              borderColor: '#8e5ea2',
              tension: 0.3,
              fill: false
            }]
          },
          options: chartOptions
        });

        // District B Chart
        const districtBCtx = document.getElementById('districtBChart').getContext('2d');
        const districtBChart = new Chart(districtBCtx, {
          type: 'line',
          data: {
            labels: timeLabels,
            datasets: [{
              label: 'Suhu (°C)',
              data: [28.5, 29.1, 29.8, 30.2, 29.7, 29.8],
              borderColor: '#3cba9f',
              tension: 0.3,
              fill: false
            }, {
              label: 'Kelembapan (%)',
              data: [70, 71, 73, 72, 75, 72],
              borderColor: '#e8c3b9',
              tension: 0.3,
              fill: false
            }]
          },
          options: chartOptions
        });

        // District C Chart
        const districtCCtx = document.getElementById('districtCChart').getContext('2d');
        const districtCChart = new Chart(districtCCtx, {
          type: 'line',
          data: {
            labels: timeLabels,
            datasets: [{
              label: 'Suhu (°C)',
              data: [30.5, 31.2, 31.8, 31.5, 30.9, 31.2],
              borderColor: '#c45850',
              tension: 0.3,
              fill: false
            }, {
              label: 'Kelembapan (%)',
              data: [55, 54, 56, 58, 60, 58],
              borderColor: '#f5ba42',
              tension: 0.3,
              fill: false
            }]
          },
          options: chartOptions
        });

        // District D Chart
        const districtDCtx = document.getElementById('districtDChart').getContext('2d');
        const districtDChart = new Chart(districtDCtx, {
          type: 'line',
          data: {
            labels: timeLabels,
            datasets: [{
              label: 'Suhu (°C)',
              data: [28.9, 29.2, 29.8, 30.1, 29.5, 29.8],
              borderColor: '#4bc0c0',
              tension: 0.3,
              fill: false
            }, {
              label: 'Kelembapan (%)',
              data: [69, 70, 73, 72, 74, 72],
              borderColor: '#9966ff',
              tension: 0.3,
              fill: false
            }]
          },
          options: chartOptions
        });
      }

      // Initialize notifications
      function initializeNotifications() {
        const notifications = [
          {
            type: 'warning',
            title: 'Suhu Tinggi Terdeteksi',
            message: 'Suhu di Distrik A melebihi ambang batas normal (>32°C).',
            time: '15 menit yang lalu'
          },
          {
            type: 'error',
            title: 'Sensor Terputus',
            message: 'Sensor #4 di Distrik D gagal merespons. Diperlukan pemeriksaan.',
            time: '35 menit yang lalu'
          },
          {
            type: 'info',
            title: 'Pembaruan Sistem',
            message: 'Pembaruan perangkat lunak dijadwalkan untuk malam ini pukul 02:00.',
            time: '1 jam yang lalu'
          },
          {
            type: 'warning',
            title: 'Gateway Status',
            message: 'Gateway #2 di Distrik B mengalami koneksi lambat.',
            time: '2 jam yang lalu'
          }
        ];

        const notificationContainer = document.getElementById('notificationContainer');
        notificationContainer.innerHTML = '';

        notifications.forEach(notification => {
          const notificationElement = document.createElement('div');
          notificationElement.className = `notification ${notification.type}`;

          notificationElement.innerHTML = `
            <div class="notification-icon">
              <i class="fas ${notification.type === 'warning' ? 'fa-exclamation-triangle' :
                            notification.type === 'error' ? 'fa-times-circle' :
                            'fa-info-circle'}"></i>
            </div>
            <div class="notification-content">
              <div class="notification-title">${notification.title}</div>
              <div class="notification-message">${notification.message}</div>
              <div class="notification-time">${notification.time}</div>
            </div>
            <button class="notification-close">
              <i class="fas fa-times"></i>
            </button>
          `;

          notificationContainer.appendChild(notificationElement);
        });

        // Add event listeners to close buttons
        document.querySelectorAll('.notification-close').forEach(button => {
          button.addEventListener('click', function() {
            this.closest('.notification').remove();
          });
        });
      }

      // Update last update time
      function updateLastUpdateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        document.getElementById('lastUpdate').textContent = `${hours}:${minutes}`;
      }

      // Loading bar animation
      function animateLoadingBar() {
        const loadingBar = document.getElementById('loadingBar');
        loadingBar.style.width = '100%';

        setTimeout(() => {
          loadingBar.style.width = '0';
        }, 2000);
      }

      // Event listeners for control panel buttons
      document.getElementById('refreshDevices').addEventListener('click', function() {
        alert('Refreshing devices...');
        // In a real application, this would trigger an API call to refresh device statuses
      });

      document.getElementById('resetSensors').addEventListener('click', function() {
        if(confirm('Are you sure you want to reset all sensors?')) {
          alert('Sensors reset initiated. This may take a few moments.');
          // In a real application, this would trigger an API call to reset sensors
        }
      });

      document.getElementById('exportData').addEventListener('click', function() {
        alert('Exporting data... A download will begin shortly.');
        // In a real application, this would trigger a data export process
      });

      // Refresh button event listener
      document.getElementById('refreshBtn').addEventListener('click', function() {
        initializeNotifications();
        updateLastUpdateTime();
        animateLoadingBar();
      });

      // Initialize the dashboard
      window.addEventListener('DOMContentLoaded', function() {
        initializeCharts();
        initializeNotifications();
        updateLastUpdateTime();
        animateLoadingBar();
      });