        let interval;
        let running = false;
        let start = 0;
        let elapsed = 0;
        let lapCount = 0;

        const display = document.getElementById('display');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');
        const lapBtn = document.getElementById('lapBtn');
        const lapsSection = document.getElementById('lapsSection');
        const lapsList = document.getElementById('lapsList');

        function format(ms) {
            let total = Math.floor(ms / 1000);
            let h = Math.floor(total / 3600);
            let m = Math.floor((total % 3600) / 60);
            let s = total % 60;
            return pad(h) + ':' + pad(m) + ':' + pad(s);
        }

        function pad(n) {
            return n < 10 ? '0' + n : n;
        }

        function update() {
            let current = Date.now() - start + elapsed;
            display.textContent = format(current);
        }

        startBtn.onclick = function() {
            if (!running) {
                start = Date.now();
                interval = setInterval(update, 100);
                running = true;
            }
        };

        pauseBtn.onclick = function() {
            if (running) {
                clearInterval(interval);
                elapsed += Date.now() - start;
                running = false;
            }
        };

        resetBtn.onclick = function() {
            clearInterval(interval);
            running = false;
            start = 0;
            elapsed = 0;
            lapCount = 0;
            display.textContent = '00:00:00';
            lapsList.innerHTML = '';
            lapsSection.style.display = 'none';
        };

        lapBtn.onclick = function() {
            if (running || elapsed > 0) {
                lapCount++;
                let current = running ? Date.now() - start + elapsed : elapsed;
                
                lapsSection.style.display = 'block';
                
                let entry = document.createElement('div');
                entry.className = 'lap-entry';
                entry.innerHTML = '<span class="lap-label">Lap ' + lapCount + '</span><span>' + format(current) + '</span>';
                lapsList.appendChild(entry);
                
                lapsSection.scrollTop = lapsSection.scrollHeight;
            }
        };