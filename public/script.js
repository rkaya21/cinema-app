const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie'); // 'movie' ID'sini seçeneğe doğru değiştirdim
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change', function (e) {
    calculateTotal();
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');
    const selectedSeatsArr = Array.from(selectedSeats);
    const seatsArr = Array.from(seats);

    // Local Storage [1,3,5]
    let selectedSeatIndexes = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat);
    });

    console.log(selectedSeatIndexes);

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexes);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(index) {
    localStorage.setItem('selectedSeats', JSON.stringify(index));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex); // 'seelctedMovieIndex' yazım hatasını düzelttim
}
