const apiKey = '2e6769723a97f46a4fc99a8242d0846b';
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        alert('กรุณากรอกชื่อจังหวัด');
    }
});

// อ่านข้อมูลจาก JSON ฐานข้อมูลชื่อจังหวัด
fetch('cities.json')
    .then(response => response.json())
    .then(cityData => {
        searchButton.addEventListener('click', () => {
            const cityNameInThai = cityInput.value;

            if (cityNameInThai) {
                // แปลงชื่อจังหวัดจากภาษาไทยเป็นภาษาอังกฤษ
                const cityNameInEnglish = cityData[cityNameInThai];

                if (cityNameInEnglish) {
                    getWeather(cityNameInEnglish);
                } else {
                    alert('ไม่พบชื่อจังหวัดนี้ในฐานข้อมูล');
                }
            } else {
                alert('กรุณากรอกชื่อจังหวัดในภาษาไทย');
            }
        });
    });

// แนบไฟล์ CSS ของ FontAwesome
const fontAwesomeCSS = document.createElement('link');
fontAwesomeCSS.rel = 'stylesheet';
fontAwesomeCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'; // ต้องติดตั้ง FontAwesome ก่อน
document.head.appendChild(fontAwesomeCSS);

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},TH&appid=${apiKey}&units=metric&lang=th`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;

                // สร้างรหัสไอคอนขึ้นมาตาม weatherDescription
                let weatherIconClass = 'fas fa-sun'; // ไอคอนเริ่มต้นเป็นแสงแดด

                if (weatherDescription.includes('ฝน')) {
                    weatherIconClass = 'fas fa-cloud-rain'; // ถ้ามีฝนตก
                } else if (weatherDescription.includes('เมฆ')) {
                    weatherIconClass = 'fas fa-cloud'; // ถ้ามีเมฆ
                }

                const weatherHTML = `
                    <p class="${weatherIconClass} weather-icon"></p>
                    <h2>${city}</h2>
                    <p>สภาพอากาศ: ${weatherDescription}</p>
                    <p>อุณหภูมิ: ${temperature}°C</p>
                    <p>ความชื้น: ${humidity}%</p>
                    <p>ความเร็วลม: ${windSpeed} m/s</p>
                `;

                weatherInfo.innerHTML = weatherHTML;
            } else {
                alert('ไม่พบข้อมูลสภาพอากาศสำหรับเมืองนี้');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p>เกิดข้อผิดพลาดในการดึงข้อมูลสภาพอากาศ</p>';
        });
}

// รับอ้างอิงไปยังปุ่มดาร์กโหมด
const darkModeButton = document.getElementById('darkModeButton');

// กำหนดการคลิกปุ่มดาร์กโหมด
darkModeButton.addEventListener('click', toggleDarkMode);

// ฟังก์ชันเปิด/ปิดดาร์กโหมด
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode'); // เปิด/ปิดคลาส 'dark-mode' บน body

    // ตรวจสอบสถานะปัจจุบันของดาร์กโหมดและเปลี่ยนข้อความปุ่ม
    if (body.classList.contains('dark-mode')) {
        darkModeButton.textContent = 'Turn Off Dark Mode';
    } else {
        darkModeButton.textContent = 'Turn On Dark Mode';
    }
}
